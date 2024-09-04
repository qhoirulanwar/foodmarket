import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ProductCardHorizontalComponent } from '../product/components/product-card-horizontal/product-card-horizontal.component';
import { ProductCardVerticalComponent } from '../product/components/product-card-vertical/product-card-vertical.component';
import { ProductDetailModalComponent } from '../product/components/product-detail-modal/product-detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ProductCardHorizontalComponent, ProductCardVerticalComponent, ProductDetailModalComponent]
})
export class HomePageModule { }
