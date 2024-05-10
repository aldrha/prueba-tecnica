import { Injectable } from '@angular/core';
import { ApiService } from '../API/api.service';
import { Observable } from 'rxjs';
import { LoginRequestModel, LoginResponseModel } from '../model/login.model';
import { ResponseModel } from '../model/response.model';
import { RegisterModel, RegisterRequestModel } from '../model/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO: start session
  // private token: string = 'U2FsdGVkX19jnQjJt64kJ/3bBaxhkUQxQLeWe+rtsAqpRy6fZ40g0FXM7qKIn0fdR/0gs3CBEPOcFO8iEQTg5xW8lC9heu1Qrx8NEy4iLIuLk48ZRP92vVJVOIHLKFE19I+PTRsXOzx3KZdHe6z19COhqmx0bj3ixYSMXVfHe1w8A8adD1dU7YozbRL0Zw2T5NdMSgDY92UwDrvYh89pNaXN2lo2zrLSEVFiiaqByycQv+p5GbrazOaSfBIQlgORfy8WBL7+f/gCpxy+VIUpt26DYvISg14v0ZUdDGlUZvWsXo6O0HxR6zzcpdKi1DPG';

  constructor(private _apiService: ApiService) {}

  login(
    login: LoginRequestModel
  ): Observable<LoginResponseModel> {
    return this._apiService.post(`/login`, login);
  }

  register(
    register: RegisterRequestModel
  ): Observable<RegisterModel> {
    return this._apiService.post(`/register`, register);
  }


  logout(user: LoginRequestModel): Observable<ResponseModel<boolean>> {
    return this._apiService.post(`/logout`, user);
  }
}
