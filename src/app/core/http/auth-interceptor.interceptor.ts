import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.shouldIntercept(request)) {
      let token;
      if(localStorage.getItem("token")) {
        token = localStorage.getItem("token");
      } else if(this.cookieService.get("token")) {
        token = this.cookieService.get("token");
      }

      const clone = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(clone);
    } else {
      return next.handle(request);
    }

  }


  private shouldIntercept(request: HttpRequest<unknown>): boolean {
    console.log(!!request.headers.get("authRequired"))
    return !!request.headers.get("authRequired");
  }
}
