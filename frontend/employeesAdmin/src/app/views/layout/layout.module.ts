import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { BaseComponent } from './base/base.component';



@NgModule({
  declarations: [
    NavigationComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class LayoutModule { }
