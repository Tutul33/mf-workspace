# Angular 20 + Native Federation (Microfrontend) — Step-by-Step Guide

This guide explains how to build a **Host + Customer-App + Orders-App** microfrontend setup using **Angular 20** and **@angular-architects/native-federation**.

---

## 🚀 Step 1: Create Angular Workspace
```bash
ng new mf-workspace --create-application false
cd mf-workspace
```
✔ Creates an empty workspace for multiple apps.

---

## 🚀 Step 2: Generate Applications
```bash
ng g application host-app
ng g application customer-app
ng g application orders-app
```
- **host-app** → main shell
- **customer-app** → remote
- **orders-app** → remote

---

## 🚀 Step 3: Install Native Federation
```bash
npm install @angular-architects/native-federation@latest --save-dev
```

---

## 🚀 Step 4: Initialize Federation
### Host
```bash
ng g @angular-architects/native-federation:init --project=host-app --type=host --port=4200
```
### Customer Remote
```bash
ng g @angular-architects/native-federation:init --project=customer-app --type=remote --port=4301
```
### Orders Remote
```bash
ng g @angular-architects/native-federation:init --project=orders-app --type=remote --port=4302
```
➡ Press Enter when asked for project name.

---

# 🟦 Step 5: Configure **customer-app** (Remote)

## 📁 5a. Folder Structure
```
customer-app/
└─ src/app/
   ├─ customer/
   │   └─ home/
   │       └─ home.ts
   └─ customer-routes.module.ts
federation.config.js
```

---

## 🛠 5b. federation.config.js
```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'customer-app',
  exposes: {
    './CustomerRoutes': './projects/customer-app/src/app/customer/customer-routes.module.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  features: {
    ignoreUnusedDeps: true
  }
});
```

---

## 🛠 customer-routes.module.ts
```ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ]
})
export class CustomerRoutesModule {}
```

---

## 🧩 5d. home.ts (Standalone Component)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `<h2>Customer Home</h2>`
})
export class HomeComponent {}
```

---

# 🟪 Step 5 (Orders App)

## federation.config.js
```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'orders-app',
  exposes: {
    './OrdersRoutes': './projects/orders-app/src/app/orders/orders-routes.module.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  features: {
    ignoreUnusedDeps: true
  }
});
```

## orders-routes.module.ts
```ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ])
  ]
})
export class OrdersRoutesModule {}
```

---

# 🟧 Step 6: Setup **host-app**

## host-app/src/app/app.routes.ts
```ts
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4301/remoteEntry.json',
        exposedModule: './CustomerRoutes',
      }).then((m) => m.CustomerRoutesModule)
  },
  {
    path: 'orders',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4302/remoteEntry.json',
        exposedModule: './OrdersRoutes',
      }).then((m) => m.OrdersRoutesModule)
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
```

---

# 🏁 Step 7: Run All Apps
Open **3 terminals**:
```bash
ng serve customer-app --port 4301
ng serve orders-app --port 4302
ng serve host-app --port 4200
```

---

# 🎉 Step 8: Test
### ✔ Customer App
http://localhost:4200/customers
Displays:
```
Customer Home
```

### ✔ Orders App
http://localhost:4200/orders
Displays:
```
Orders Home
```

---
### Folder Structure:
```
MF-WORKSPACE
│
├── .angular
├── .vscode
├── dist
├── node_modules
│
├── projects
│   ├── customer-app
│   │   ├── public
│   │   ├── src
│   │   ├── federation.config.js
│   │   ├── tsconfig.app.json
│   │   └── tsconfig.spec.json
│   │
│   ├── host-app
│   │   ├── public
│   │   ├── src
│   │   ├── federation.config.js
│   │   ├── tsconfig.app.json
│   │   └── tsconfig.spec.json
│   │
│   └── orders-app
│       ├── public
│       ├── src
│       ├── federation.config.js
│       ├── tsconfig.app.json
│       └── tsconfig.spec.json
│
├── .editorconfig
├── .gitignore
├── angular_20_microfrontend_app_guide.md
├── angular.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

```
---
# ✅ Microfrontend setup working with Angular 20 + Native Federation
You now have:
- A host container app
- Two remote microfrontends
- Federated routing
- Standalone components
- Angular 20 compatible configuration

Let me know if you want:
✔ GitHub-ready folder structure
✔ Full working code repo
✔ Additional remotes (products, dashboard)
✔ Tailwind + Material setup for MFEs

