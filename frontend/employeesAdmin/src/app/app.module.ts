import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './views/layout/layout.module';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { DefaultOauthInterceptor } from './core/interceptors/default.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
  ],
 
  providers: [
    HttpClient,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: DefaultOauthInterceptor,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
