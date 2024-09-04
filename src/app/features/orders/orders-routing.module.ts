import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';
import { OrderDetailPage } from './order-detail/order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'detail/:id',
    component: OrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
