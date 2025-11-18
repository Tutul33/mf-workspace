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
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
