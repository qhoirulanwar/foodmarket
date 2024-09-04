import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlingService } from 'src/app/services/error/error-handling.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private errorHandlingSrvc: ErrorHandlingService
  ) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Log Out',
      subHeader: 'Apakah Anda yakin ingin keluar dari akun ini?',
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  public alertButtons = [
    {
      text: 'Batal',
      role: 'cancel',
      handler: () => {
        // 'Alert canceled'
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.errorHandlingSrvc.showLoading();

        setTimeout(() => {
          this.errorHandlingSrvc.hideLoading();

          this.authService.logout();
          this.router.navigate(['/login'])
        }, 1000);
      },
    },
  ];

}
