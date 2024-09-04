import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card-horizontal',
  templateUrl: './product-card-horizontal.component.html',
  styleUrls: ['./product-card-horizontal.component.scss'],
})
export class ProductCardHorizontalComponent implements OnInit {
  @Input() product!: Product;
  discountedPrice: number = 0;

  constructor() { }

  ngOnInit() {
    this.calculateDiscountedPrice();
  }

  calculateDiscountedPrice() {
    if (this.product && this.product.price) {
      this.discountedPrice = this.product.price / 0.9; // 10% diskon
    }
  }
}

