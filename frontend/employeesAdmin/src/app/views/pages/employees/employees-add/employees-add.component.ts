import { Component, OnInit } from '@angular/core';
import { EmployessForm } from './employees.form';
import { EmployeeModel } from 'src/app/core/model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-employees-add',
  templateUrl: './employees-add.component.html',
  styleUrls: ['./employees-add.component.css']
})
export class EmployeesAddComponent implements OnInit {

  employeesForm: EmployessForm;
  employeesModel: EmployeeModel;
  action: "add" | "update" = "add";
  id: number;
  isSaving: boolean = false;
  isUpdate: boolean = false;
  date: any = new Date();
  dateAdmission: string = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  dateMonthAdminission: any = this.date.getFullYear() + '-' + String(this.date.getMonth()).padStart(2, '0') + '-' + String(this.date.getDate()).padStart(2, '0');

  constructor (private _employeeService: EmployeesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.employeesForm = new EmployessForm(this.employeesModel);
    if (this._activatedRoute.snapshot.params["id"] != null) {
      this.id = this._activatedRoute.snapshot.params["id"];

      this._employeeService.getOne(+this.id).subscribe((response) => {
        console.log(response);
        this.employeesForm.patchValue(response.data);
      });
    }
  }

  ngOnInit (): void {
    console.log(this.dateMonthAdminission);
    this._activatedRoute.data.subscribe((data) => {
      this.action = data["action"];
      if (this.action == "update") {
        this.isUpdate = true;
      }
    });
  }

  public getRelatedList () {
  }

  public reset () {
    this.employeesForm.enable();
    this.employeesForm.reset();
  }

  public submit () {

    let employee = new EmployeeModel();
    employee.id = this.id;
    employee.lastname = this.employeesForm.controls["lastname"].value;
    employee.second_surname = this.employeesForm.controls["second_surname"].value;
    employee.name = this.employeesForm.controls["name"].value;
    employee.middlename = this.employeesForm.controls["middlename"].value;
    employee.country_employment = this.employeesForm.controls["country_employment"].value;
    employee.type_document = this.employeesForm.controls["type_document"].value;
    employee.document_number = this.employeesForm.controls["document_number"].value;
    employee.admission_date = this.employeesForm.controls["admission_date"].value;
    employee.area = this.employeesForm.controls["area"].value;
    employee.status = 1;
    // console.log(employee);
    // console.log(this.action);

    switch (this.action) {
      case "add":
        this._employeeService
          .add(employee)
          .subscribe({
            next: (response) => {

              if (response.code == 201) {
                Swal.fire("Registro guardado con exito", "", "success");
                this._router.navigate(["/employees/list"]);
              } else {
                Swal.fire("Error!", "Fallido", "error");//
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
        break;
      case "update":
        employee._method = "PUT";
        this._employeeService
          .update(employee, this.id)
          .subscribe({
            next: (response) => {

              if (response.code == 200) {
                Swal.fire("Registro modificado con exito", "", "success");
                this._router.navigate(["/employees/list"]);
              } else {
                Swal.fire("Error!", "Fallido", "error");//
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
        break;
    }
  }

}
