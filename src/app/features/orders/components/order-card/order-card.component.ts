import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderResponse } from '../../../../interfaces/order.interface';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order!: OrderResponse;
  @Output() cardClick = new EventEmitter<string | number>();

  constructor() { }

  ngOnInit() { }

  getItemCount(): number {
    return this.order.items.reduce((total, item) => total + item.quantity, 0);
  }

  getItemImg(): string {
    return this.order.items[0].imgUrl;
  }

  formatDate(date: string | number | Date): string {
    const orderDate = new Date(date);
    orderDate.setHours(orderDate.getHours() + 7);

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

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  }

  onCardClick() {
    this.cardClick.emit(this.order.id);
  }
}
