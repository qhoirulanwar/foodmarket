import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartResponse, Item } from '../../../../interfaces/cart.interface';
import { CartService } from '../../../../services/cart/cart.service';

@Component({
  selector: 'app-cart-cards',
  templateUrl: './cart-cards.component.html',
  styleUrls: ['./cart-cards.component.scss'],
})
export class CartCardComponent implements OnInit {
  @Input() item!: Item;
  @Output() cartUpdated = new EventEmitter<void>();
  discountedPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.calculateDiscountedPrice();
  }

  addQuantity(productId: number) {
    this.cartService.addToCart(productId).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        this.updateCart();
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  reduceQuantity(productId: number) {
    this.cartService.reduceFromCart(productId).subscribe(
      (response) => {
        console.log('Product reduced from cart:', response);
        this.updateCart();
      },
      (error) => {
        console.error('Error reducing product from cart:', error);
      }
    );
  }

  private updateCart() {
    this.cartService.getCart().subscribe({
      next: (response: CartResponse) => {
        const updatedItem = response.items.find(i => i.productId === this.item.productId);
        if (updatedItem) {
          this.item = updatedItem;
        }
        this.cartUpdated.emit();
        console.log('Updated cart data:', this.item);
      },
      error: (error) => {
        console.error('Error fetching updated cart data:', error);
      }
    });
  }


  calculateDiscountedPrice() {
    if (this.item && this.item.price) {
      this.discountedPrice = this.item.price / 0.9; // 10% diskon
    }
  }

}
