import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlingService } from 'src/app/services/error/error-handling.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() { }

  async onLogin() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Logging in...',
        spinner: 'crescent',
      });
      await loading.present();

      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          loading.dismiss();
          this.router.navigate(['/app'], { replaceUrl: true });
        },
        error: (error: any) => {
          loading.dismiss();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  async openRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.75],
      // componentProps: {
      //   cartData: this.cartData
      // }
    });

    // modal.onDidDismiss().then((result) => {
    //   if (result.data) {
    //     // Handle the checkout data here
    //     console.log('Checkout data:', result.data);
    //     // You can add logic to process the order here
    //   }
    // });

    return await modal.present();
  }

}
