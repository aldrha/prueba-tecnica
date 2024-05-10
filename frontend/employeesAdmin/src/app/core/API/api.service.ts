import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiUrl: string = environment.server;

  constructor(private _httpClient: HttpClient) {}

  public get(
    url: string,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .get<any>(this._apiUrl + url, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public getUrlOutside(
    url: string,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .get<any>(url, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public post(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .post<any>(this._apiUrl + url, body, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public put(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .put<any>(this._apiUrl + url, body, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public delete(
    url: string,
    body: any,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .request<any>('delete', this._apiUrl + url, {
        body,
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }

  public deleteByParams(
    url: string,
    params: HttpParams | { [key: string]: string | number | boolean } = {}
  ): Observable<any> {
    return this._httpClient
      .request<any>('delete', this._apiUrl + url, {
        params:
          params instanceof HttpParams ? params : this._toStringParams(params),
      })
      .pipe(catchError((error: any) => this._handleError(this, error)));
  }
  private _handleError(_parent: ApiService, error: any): Observable<never> {
    //this._notifyService.showNotification('error', 'server response error');
    return throwError(error);
  }

  private _toStringParams(params: Object): HttpParams {
    let refactoParams: { [key: string]: string } = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value !== 'string') {
        refactoParams[key] = value.toString();
      } else {
        refactoParams[key] = value;
      }
    });

    return new HttpParams({ fromObject: refactoParams });
  }

  public formatDateUTC(date: string | number | Date) {
    const options = {
      timeZone: 'UTC',
    };
    const formattedDate = new Date(date).toLocaleString('en-US', options);
    console.log('formattedDate >>> ', date, formattedDate);
    const [datePart, timePart] = formattedDate.split(', ');
    const [month, day, year] = datePart.split('/');
    const formattedDay = this.addZero(day);
    const formattedMonth = this.addZero(month);
    return `${formattedMonth}/${formattedDay}/${year}`;
  }
  public addZero(value: string | []) {
    if (value.length === 1) {
      return '0' + value;
    }
    return value;
  }
}
