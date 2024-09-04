import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { ErrorHandlingService } from 'src/app/services/error/error-handling.service';

@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.scss'],
})
export class ProductDetailModalComponent implements OnInit {
  @Input() product!: Product;
  discountedPrice: number = 0;

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private errorHandlingSrvc: ErrorHandlingService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.calculateDiscountedPrice();
  }

  calculateDiscountedPrice() {
    if (this.product && this.product.price) {
      this.discountedPrice = this.product.price / 0.9; // 10% diskon
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  addToCart() {
    if (this.product && this.product.id) {

      this.errorHandlingSrvc.showLoading();
      this.cartService.addToCart(this.product.id).subscribe({
        next: async (response) => {
          this.dismiss();
          this.infoToast();
        }
      })
    }
  }



  async infoToast() {
    const toast = await this.toastController.create({
      message: 'Berhasil memasukan ke keranjang',
      duration: 1500,
      position: "bottom",
      color: "dark"
    });

    await toast.present();
  }
}
