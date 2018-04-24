import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
    // console.log('token', token);
    // let newHeader: HttpHeaders = req.headers;
    // newHeader = newHeader.set('Content-Type', 'application/json');
    // if (token) {
    //   newHeader = newHeader.set('x-access-token', token);
    // }
    // console.log('header:', newHeader);
    // let newReq = req.clone({headers: newHeader});
    // newReq = newReq.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    // return next.handle(newReq);
  }
}
