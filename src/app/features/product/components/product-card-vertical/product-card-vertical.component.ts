import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-card-vertical',
  templateUrl: './product-card-vertical.component.html',
  styleUrls: ['./product-card-vertical.component.scss'],
})
export class ProductCardVerticalComponent implements OnInit {
  @Input() product!: Product;
  @Output() productClicked = new EventEmitter<Product>();
  discountedPrice: number = 0;

  constructor() { }

  ngOnInit() {
    this.calculateDiscountedPrice();
  }

  calculateDiscountedPrice() {
    this.discountedPrice = this.product.price / 0.9; // 10% diskon
  }

  onProductClick() {
    this.productClicked.emit(this.product);
  }
}
