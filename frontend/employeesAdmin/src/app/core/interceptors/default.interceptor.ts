import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class DefaultOauthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    const header = `Bearer ${token}`; 
    req = req.clone({
      setHeaders: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
        Authorization: header,
      },
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || error.status === 403) {
          // Redireccionar al inicio de sesión
          this.router.navigate(["/auth/login"]);
        }
        return throwError(error);
      }),
      finalize(()=>{
        console.log("ok");
      })
    );
  }
}