import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { CartCardComponent } from './components/cart-card/cart-cards.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CartPage, CartCardComponent, CheckoutModalComponent],
})
export class CartPageModule { }
