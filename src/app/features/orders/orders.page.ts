import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { OrderResponse } from '../../interfaces/order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: OrderResponse | null | undefined | any = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (response: OrderResponse[] | any) => {
        this.orders = response.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }
    );
  }

  doRefresh(event?: any) {
    this.loadOrders();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  goToOrderDetail(orderId: string | number) {
    this.router.navigate(['/app/orders/detail', orderId]);
  }
}
