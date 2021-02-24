
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(public snackBar: MatSnackBar, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        if (token !== null && token.length > 0) {
            req = req.clone({ headers: req.headers.set('Authorization', `${token}`) });
        }
        // return next.handle(req);

        // add interceptor to the call back from server,
        // if token expired then show message that session expired.
        return next.handle(req).pipe(
          map((res: any) => {
            if (res && res.status === 401) {
              this.showSnackBar(res.message);
            }
            return res;
          }),
          catchError((e: any) => {
            this.throwErrorsResponse(e && e.status ? e : 500);
            return throwError(e);
          })
        );

    }

    throwErrorsResponse = (e: any) => {
      const { status, error } = e;
      console.log(`throw errors response ===> status === ${status} error === `, "error ", error, " e === ", e);
      switch (status) {
        case 401:
          this.showSnackBar(error.message);
          break;
        case 400:
          this.showSnackBar(e.message);
          break;
        default:
      }
    }


    showSnackBar(message: string){
      let config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.horizontalPosition = 'right';
      config.duration = 3000;
      let snackBarRef = this.snackBar.open(message, 'Cancel', config);
      this.router.navigateByUrl('/login');
      // snackBarRef.onAction().subscribe(() => {
      //   this.router.navigateByUrl('/login');
      // });
    }


}
