import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesAddComponent } from './employees-add/employees-add.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    EmployeesAddComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeesModule { }
