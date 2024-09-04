import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderService } from '../../services/order/order.service';
import { OrderDetailPage } from './order-detail/order-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule
  ],
  declarations: [OrdersPage, OrderCardComponent, OrderDetailPage],
  providers: [OrderService]
})
export class OrdersPageModule { }
