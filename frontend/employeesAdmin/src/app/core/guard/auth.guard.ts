import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userLoggedIn = false;
  routeURL: string;
  data: any;

  constructor(private _router: Router) {
    this.routeURL = this._router.url;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.data = localStorage.getItem('data');
    this.data = JSON.parse(this.data);

    if (this.data == null) {
      this.sessionExpired();
      return false;
    }

    return true;
  }

  messageError403() {
    this._router.navigate(['error/403']);
  }

  sessionExpired() {
    this._router.navigate(['/auth/login']);
  }
}
