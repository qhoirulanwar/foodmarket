import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  private errorTimeout: any;
  private currentToast: HTMLIonToastElement | null = null;

  constructor(
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  private loading = this.loadingCtrl.create({ duration: 30000 })

  async handleError(error: string, color: string = 'danger'): Promise<void> {
    if (this.errorSubject.value !== error) {
      this.errorSubject.next(error);

      // Clear any existing timeout
      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout);
      }

      this.currentToast = await this.toastController.create({
        message: error,
        duration: 5000,
        position: 'bottom',
        color: color,
        buttons: [
          {
            text: 'Tutup',
            role: 'cancel',
            handler: () => {
              this.clearError();
            }
          }
        ]
      });

      await this.currentToast.present();


      // Set new timeout to clear the error after 5 seconds
      this.errorTimeout = setTimeout(() => {
        this.clearError();
      }, 5000);
    }
  }

  getError(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  clearError(): void {
    this.errorSubject.next(null);
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.currentToast = null;
    }
  }

  async showLoading() {
    this.loading = this.loadingCtrl.create({ duration: 60000 });
    (await this.loading).present();
  }

  async hideLoading() {
    if (this.loading) {
      (await this.loading).dismiss();
    }
  }

}