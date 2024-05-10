import { Injectable } from "@angular/core";
import { ApiService } from "../API/api.service";
import { Observable } from "rxjs";
import { ResponseModel } from "../model/response.model";
import { EmployeeModel } from "../model/employee.model";


@Injectable({
    providedIn: "root",
})
export class EmployeesService {

    private sessionData: any = {};

    constructor (private _apiService: ApiService,
    ) {
        this.sessionData = JSON.parse(localStorage.getItem('data') || '{}');
    }

    getAll (service?: number): Observable<ResponseModel<EmployeeModel[]>> {
        return this._apiService.get(`/employees/list`);
    }

    add (employee: EmployeeModel): Observable<ResponseModel<EmployeeModel>> {
        return this._apiService.post('/employees', employee);
    }

    update (employee: EmployeeModel, id: number): Observable<ResponseModel<EmployeeModel>> {
        return this._apiService.put('/employees/' + id, employee);
    }

    delete (id: number): Observable<ResponseModel<boolean>> {
        let data = { id: id };
        return this._apiService.delete('/employees', data);
    }

    getOne (id: number): Observable<ResponseModel<EmployeeModel>> {
        let data = { id: id };
        return this._apiService.get('/employees/' + id);
    }

}

