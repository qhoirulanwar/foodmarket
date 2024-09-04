import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ErrorHandlingService } from 'src/app/services/error/error-handling.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  async register() {
    if (this.registerForm.valid) {

      this.errorHandlingService.showLoading()
      this.authService.register(this.registerForm.value).subscribe({
        next: (data: any) => {
          this.presentToast('Pendaftaran berhasil, Silahkan login!')
          this.dismiss()
        }
      })
    }
  }


  dismiss() {
    this.modalController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'dark'
    });
    toast.present();
  }
}
