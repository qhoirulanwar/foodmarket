import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ErrorHandlingService } from '../error/error-handling.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(
        private alertController: AlertController,
        private errorHandlingSrvc: ErrorHandlingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and add the authorization header
        const authReq = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        return next.handle(authReq).pipe(
            tap((httpEvent: HttpEvent<any>) => {
                this.checkInvalid200Response(httpEvent)
            }),
            catchError((error: any) => {
                this.errorHandlingSrvc.hideLoading()

                if (this.checkNoNetworkConnection(error)) {
                    this.presentAlert("No network connection. Please try again later.");

                    const networkError = new HttpNoNetworkConnectionError();
                    console.warn(networkError);
                    networkError.wasCaught = true;
                    return throwError(() => networkError);
                }

                console.error(error);
                return throwError(() => error);
            })
        );
    }

    private checkNoNetworkConnection(error: any): boolean {

        if (error.error?.message) {
            this.presentAlert(error.error.message);
        }

        if (error.error?.error) {
            this.presentAlert(error.error.error);
        }

        return (
            error instanceof HttpErrorResponse &&
            !error.headers.keys().length &&
            !error.ok &&
            !error.status &&
            !error.error?.loaded &&
            !error.error?.total
        );
    }

    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            message: message,
            buttons: ['Close'],
        });

        await alert.present();
    }

    checkInvalid200Response(httpEvent: any): boolean {

        if (httpEvent.status != undefined) {
            this.errorHandlingSrvc.hideLoading();
        }

        return (
            // Must be an instance of HttpResponse (i.e., a response, not a request or other event)
            httpEvent instanceof HttpResponse
            // Must have a successful status code (200 OK)
            && httpEvent.status === HttpStatusCode.Ok
            // But the body format must be invalid
            // && !check200ResponseBodyFormat(httpEvent)
        )
    }
}

class HttpNoNetworkConnectionError extends Error {
    wasCaught = false;

    constructor() {
        super('No network connection');
    }
}