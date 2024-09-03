import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartResponse } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartData: CartResponse | any;
  discountedPrice: number = 0;
  product: any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (response: CartResponse) => {
        console.log(response);
        this.cartData = response;
      },
      error: (error) => {
        console.error('Error fetching cart data:', error);
      }
    });
  }

  onCartUpdated() {
    this.getCart();
  }


  calculateDiscountedPrice() {
    if (this.cartData && this.cartData.price) {
      this.discountedPrice = this.product.price / 0.9; // 10% diskon
    }
  }

}
