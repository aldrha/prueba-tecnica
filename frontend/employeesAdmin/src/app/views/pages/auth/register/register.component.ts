import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterForm } from './register.form'; 
import { AuthService } from 'src/app/core/services/auth.services';
import { ResponseModel } from 'src/app/core/model/response.model';
import { RegisterModel, RegisterRequestModel } from 'src/app/core/model/register.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  returnUrl: any;
  registerForm: RegisterForm;
  registerModel: RegisterRequestModel; 
  sessionData: any = {};

  constructor(private _authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute, 
  ) {
    this.registerForm = new RegisterForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
    localStorage.removeItem('data');
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('token', '');
  }

  ngOnInit(): void {
    this.returnUrl =
    this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onRegister( ) { 
    let user = new RegisterRequestModel();
    user.name = this.registerForm.controls["name"].value;
    user.email = this.registerForm.controls["email"].value;
    user.password = this.registerForm.controls["password"].value;
    user.password_confirmation = this.registerForm.controls["password_confirmation"].value;

    // this._authService.register(user).subscribe((response) => {
    //   if (response.code == 200) {
    //     localStorage.setItem(
    //       'token',
    //       response.data.token == undefined ? '' : response.data.token
    //     );
    //     localStorage.setItem('data', JSON.stringify(response.data.user));
    //     localStorage.setItem('isLoggedin', 'true');
    //     if (localStorage.getItem('isLoggedin')) {
    //       this.router.navigate([this.returnUrl]);
    //     }
    //   }
    //   else if (response.code == 403) {
    //     console.log(response.error);
    //     // Swal.fire('Error!', response.error 'error');
    //   }
    // })

    this._authService.register(user).subscribe({
      next: (response) => {
       
        if (response.code == 200) {
          localStorage.setItem(
            'token',
            response.data.token == undefined ? '' : response.data.token
          );
          localStorage.setItem('data', JSON.stringify(response.data.user));
          localStorage.setItem('isLoggedin', 'true');
          if (localStorage.getItem('isLoggedin')) {
            this.router.navigate([this.returnUrl]);
          }
        }
        if (response.code == 401) {
    
          // Swal.fire('Error!', response.error 'error');
        }
      },
      error: (error) => {
        console.log(error.error);
        if (error.error.code == 401) {
          let errors = [];
          if(error.error.data["name"]){
            errors.push(error.error.data["name"][0]) 
          }
          if(error.error.data["email"]){
            errors.push(error.error.data["email"][0]) 
          }
          if(error.error.data["password"]){
            errors.push(error.error.data["password"][0]) 
          }
          Swal.fire('Error!', JSON.stringify(errors), 'error');
        }
      },
    });
  }

}
