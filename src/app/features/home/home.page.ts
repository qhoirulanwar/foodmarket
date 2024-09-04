import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product/product.service';
import { Product, ProductResponse } from 'src/app/interfaces/product.interface';
import { ProductDetailModalComponent } from '../product/components/product-detail-modal/product-detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  currentPage = 0;
  totalPages = 1;
  isLoading = false;

  constructor(
    private productService: ProductService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.currentPage++;
    this.productService.getProducts(this.currentPage, 3).subscribe((response: ProductResponse) => {
      this.products = [...this.products, ...response.content];
      this.totalPages = response.totalPages;
      this.isLoading = false;
    });
  }

  loadMoreProducts(event: any) {
    if (this.currentPage >= this.totalPages) {
      event.target.complete();
      return;
    }
    setTimeout(() => {
      this.loadProducts();
      event.target.complete();
    }, 500);
  }

  async onProductClick(product: Product) {
    const modal = await this.modalController.create({
      component: ProductDetailModalComponent,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75],
      componentProps: {
        product: product
      }
    });
    return await modal.present();
  }

  doRefresh(event: any) {
    this.currentPage = 0;
    this.products = [];
    this.productService.getProducts(1, 3).subscribe((response: ProductResponse) => {
      this.products = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = 1;
      event.target.complete();
    });

    setTimeout(() => {
      event.target.complete();
    }, 10000);
  }

}
