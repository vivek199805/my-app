import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';
import Swal from 'sweetalert2';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  AuthOnboard: any;
  private requests: HttpRequest<any>[] = [];
  constructor(
    private auth: ApiService, 
    private loader: LoaderService, 
    private route: Router, 
    ) { }

    removeRequest(req: HttpRequest<any>) { 
      const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }
      this.loader.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.requests.push(req);
      let headers = new HttpHeaders({
        'Authkey': 'MWQyMmUzNWY4YjhlNjY2NWJjM2EzZjY0NjNhZWM0ZTk=',
        'Authtoken': this.auth.isLoggedIn()
        // 'Token': this.auth.isChangepass()
      })
      this.loader.isLoading.next(true); 
      const cloneReq = req.clone({ headers });
      return new Observable(observer => {
        const subscription = next.handle(cloneReq)
          .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                if (event.body.statuscode == 404 || event.body.statuscode == 201 || event.body.statuscode == 202) {
                  Swal.fire({
                    icon: 'error',
                    title: event.body.message
                  })
                  this.auth.onLogout();
                  this.route.navigate(['login']);
                }else if(event.body.statuscode == 2020 || event.body.statuscode == 203){
                  Swal.fire({
                    icon: 'error',
                    title: event.body.message
                  })
                  this.route.navigate(['/']);
                }
                else {
                  this.removeRequest(req);
                  observer.next(event);
                }
              }
            },
            err => {
              //alert('error' + err);
              this.removeRequest(req);
              observer.error(err);
            },
            () => {
              this.removeRequest(req);
              observer.complete();
            });
        // remove request from queue when cancelled
        return () => {
          this.removeRequest(req);
          subscription.unsubscribe();
        };
      });
      //const cloneReq = req.clone({headers});
      //return next.handle(cloneReq);
    }
}
