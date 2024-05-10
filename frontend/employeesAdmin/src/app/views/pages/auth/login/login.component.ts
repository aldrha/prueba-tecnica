import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginForm } from './login.form';
import { LoginRequestModel, LoginResponseModel } from 'src/app/core/model/login.model';
import { AuthService } from 'src/app/core/services/auth.services';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  loginForm: LoginForm;
  loginModel: LoginResponseModel ; 
  sessionData: any = {};

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute, 
  ) {
    this.loginForm = new LoginForm({
      email: '',
      password: '',
    });
    localStorage.removeItem('data');
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('token', '');
  }

  ngOnInit(): void {
     
    this.returnUrl =
      this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    this.loginModel = this.loginForm.value;
    this._authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.code == 200) {
          localStorage.setItem(
            'token',
            response.data.token == undefined ? '' : response.data.token
          );
          localStorage.setItem('data', JSON.stringify(response.data.user));
          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            this._router.navigate([this.returnUrl]);
          }
        }
      },
      error: (error) => {
        if (error.code == 401) {
          Swal.fire('Login!', error.error.message, 'error');
        }
      },
    });
  }
 
}
