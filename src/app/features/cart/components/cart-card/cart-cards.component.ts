import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartResponse, Item } from '../../../../interfaces/cart.interface';
import { CartService } from '../../../../services/cart/cart.service';
import { AlertController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { ErrorHandlingService } from 'src/app/services/error/error-handling.service';

@Component({
  selector: 'app-cart-cards',
  templateUrl: './cart-cards.component.html',
  styleUrls: ['./cart-cards.component.scss'],
  animations: [
    trigger('quantityChange', [
      transition(':increment', [
        style({ transform: 'scale(1.2)' }),
        animate('200ms', style({ transform: 'scale(1)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'scale(0.8)' }),
        animate('200ms', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class CartCardComponent implements OnInit {
  @Input() item!: Item;
  @Output() cartUpdated = new EventEmitter<void>();
  discountedPrice: number = 0;

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private errorHandlingSrvc: ErrorHandlingService
  ) { }

  ngOnInit() {
    this.calculateDiscountedPrice();
  }

  async addQuantity(productId: number) {
    this.errorHandlingSrvc.showLoading();

    this.cartService.addToCart(productId).subscribe(
      (response) => {
        this.updateCart();
      }
    );
  }

  async reduceQuantity(productId: number, quantity: number) {
    if (quantity <= 1) {
      const alert = await this.alertController.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin ingin menghapus produk ini dari keranjang?',
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
          },
          {
            text: 'Ya',
            handler: () => {
              this.reduceQuantityHandler(productId)
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.reduceQuantityHandler(productId)
    }
  }


  async reduceQuantityHandler(productId: number) {
    this.errorHandlingSrvc.showLoading();

    this.cartService.reduceFromCart(productId).subscribe(
      (response) => {
        this.updateCart();
      }
    );
  }

  async removeItem(productId: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus produk ini dari keranjang?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Ya',
          handler: () => {
            this.errorHandlingSrvc.showLoading();

            this.cartService.removeFromCart(productId).subscribe(
              (response) => {
                this.cartUpdated.emit();
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  private updateCart() {
    this.cartUpdated.emit();
  }

  calculateDiscountedPrice() {
    if (this.item && this.item.price) {
      this.discountedPrice = this.item.price / 0.9; // 10% diskon
    }
  }
}
