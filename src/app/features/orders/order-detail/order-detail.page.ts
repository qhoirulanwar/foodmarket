import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
})
export class OrderDetailPage implements OnInit {
  orderId: string | number | null = '';
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    this.orderService.getOrdersDetails(this.orderId).subscribe(
      (response) => {
        this.order = response;
      }
    );
  }

  formatDate(date: string | number): string {
    const orderDate = new Date(date);
    orderDate.setHours(orderDate.getHours() + 7); // Menambahkan 7 jam

    const tanggal = orderDate.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const jam = orderDate.toLocaleString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${tanggal} - ${jam}`;
  }
}