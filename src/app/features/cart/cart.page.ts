import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartResponse } from '../../interfaces/cart.interface';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalController, ToastController } from '@ionic/angular';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class CartPage implements OnInit {
  cartData: CartResponse | null = null;
  isCartEmpty: boolean = true;
  discountedPrice: number = 0;
  product: any;

  constructor(
    private cartService: CartService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    // Coba ambil data dari penyimpanan lokal terlebih dahulu
    const localCart = this.cartService.getLocalCart();
    if (localCart) {
      this.cartData = localCart;
      this.isCartEmpty = this.cartData.items.length === 0;
    }

    // Kemudian ambil data terbaru dari server
    this.cartService.getCart().subscribe({
      next: (response: CartResponse) => {
        this.cartData = response;
        this.isCartEmpty = this.cartData.items.length === 0;
        // Simpan data terbaru ke penyimpanan lokal
        this.cartService.saveCartLocally(this.cartData);
      }
    });
  }

  onCartUpdated() {
    this.loadCart();
  }

  calculateDiscountedPrice() {
    if (this.cartData) {
      this.discountedPrice = this.product.price / 0.9; // 10% diskon
    }
  }

  async openCheckoutModal() {
    const modal = await this.modalController.create({
      component: CheckoutModalComponent,
      initialBreakpoint: 0.55,
      breakpoints: [0, 0.55],
      componentProps: {
        cartData: this.cartData
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadCart();
        this.showinfoToast();
      }
    });

    return await modal.present();
  }

  async showinfoToast() {
    const toast = await this.toastController.create({
      message: 'Anda berhasil membuat pesanan.',
      duration: 1500,
      position: "bottom",
      color: "dark"
    });

    await toast.present();
  }
}
