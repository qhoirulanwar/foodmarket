import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CartResponse } from '../../../../interfaces/cart.interface';
import { OrderService } from '../../../../services/order/order.service';
import { ErrorHandlingService } from 'src/app/services/error/error-handling.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
})
export class CheckoutModalComponent implements OnInit {
  @Input() cartData: CartResponse = {} as CartResponse;
  checkoutForm: FormGroup;
  shippingOptions = [
    { id: 1, name: 'Reguler', price: 10000 },
    { id: 2, name: 'Express', price: 20000 },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private orderService: OrderService,
    private errorHandlingSrvc: ErrorHandlingService
  ) {
    this.checkoutForm = this.formBuilder.group({
      shippingAddress: ['', Validators.required],
      shippingName: ['', Validators.required],
      shippingCost: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit() {
    this.checkoutForm.get('shippingName')?.valueChanges.subscribe((value) => {
      const selectedOption = this.shippingOptions.find(option => option.name === value);
      if (selectedOption) {
        this.checkoutForm.patchValue({ shippingCost: selectedOption.price });
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onSubmit() {
    this.errorHandlingSrvc.showLoading();
    if (this.checkoutForm.valid) {
      const orderData = {
        shippingAddress: this.checkoutForm.get('shippingAddress')?.value,
        shippingCost: this.checkoutForm.get('shippingCost')?.value,
        shippingName: this.checkoutForm.get('shippingName')?.value,
      };

      this.orderService.createOrder(orderData).subscribe(
        (response) => {
          this.modalController.dismiss(response);
        }
      );
    }
  }

  get totalAmount() {
    const shippingCost = this.checkoutForm.get('shippingCost')?.value || 0;
    return this.cartData.total + shippingCost;
  }
}