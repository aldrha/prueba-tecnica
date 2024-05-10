import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesAddComponent } from './employees-add/employees-add.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: 'list',
        component: EmployeesListComponent
      },
      {
        path: 'add',
        component: EmployeesAddComponent,
        data: {
          action: 'add'
        }
      },
      {
        path: 'update/:id',
        component: EmployeesAddComponent,
        data: {
          action: 'update'
        }
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
