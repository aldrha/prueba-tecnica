import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SortType } from '@swimlane/ngx-datatable';
import { map } from 'rxjs';
import { EmployeeModel } from 'src/app/core/model/employee.model';
import { EmployeesService } from 'src/app/core/services/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  employees: EmployeeModel[] = [];
  temp: EmployeeModel[] = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 0;
  reorderable = true;
  ColumnMode = ColumnMode;
  SortType = SortType;

  constructor (
    private _employeeService: EmployeesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
  }

  ngOnInit (): void {
    this.getEmployees();
  }

  public getEmployees (filter?: string) {
    console.log(filter);
    this._employeeService.getAll(filter)
      .pipe(
        map((data) => {
          data.data.forEach((row, i) => {
            row.name = `${ row.name } ${ !row.middlename ? "" : row.middlename }`;
            row.lastname = `${ row.lastname } ${ row.second_surname }`;
            data.data[i] = row;
          });
          return data;
        })
      )
      .subscribe({
        next: (employee) => {
          // console.log(employee.data);
          this.temp = [...employee.data];
          this.employees = employee.data;
        },
        error: (err) => {
          console.log("Error", err);
          this.employees = [];
        },
      });
  }

  public updateFilter (event: KeyboardEvent) {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    if (val.length >= 3) {
      this.getEmployees(val);
    }
    if (val.length == 0) {
      this.getEmployees();
    }
    this.table.offset = 0;

  }

  public onClickDelete (employee: EmployeeModel) {
    Swal.fire({
      title: "¿Quieres eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeService.delete(employee)
          .subscribe({
            next: (response) => {

              if (response.code == 200) {
                Swal.fire("Eliminado con éxito", "", "success");
                this.getEmployees();
              } else {
                Swal.fire("No pudo eliminarse el registro", "", "error");
              }
            },
            error: (error) => {
              console.log(error.error);
              if (error.error.code == 401) {
                let errors: any = [];
                error.error.map((nameError: any) => {
                  errors.push(nameError[0]);
                });
                Swal.fire('Error!', JSON.stringify(errors), 'error');
              }
            },
          });
      }
    });
  }


  public onClickEdit (employee: EmployeeModel) {
    this._router.navigate(["../update", employee.id], {
      relativeTo: this._activatedRoute,
    });
  }

  public toggleExpandRow (row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  public onDetailToggle (event: any) {
    console.log('Detail Toggled', event);
  }

}
