import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './home/home';

@NgModule({
  imports: [    
    RouterModule.forChild([
      { path: '', component: Home }
    ])
  ]
})
export class OrdersRoutesModule {}
