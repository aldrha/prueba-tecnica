import { Injectable } from "@angular/core";
import { ApiService } from "../API/api.service";
import { Observable } from "rxjs";
import { ResponseModel } from "../model/response.model";
import { EmployeeModel, ResponsePaginate } from "../model/employee.model";


@Injectable({
    providedIn: "root",
})
export class EmployeesService {

    private sessionData: any = {};

    constructor (private _apiService: ApiService,
    ) {
        this.sessionData = JSON.parse(localStorage.getItem('data') || '{}');
    }

    getAll (search?: string): Observable<ResponseModel<EmployeeModel[]>> {
        let filter = typeof search === "string" ? search : "";
        return this._apiService.get(`/employees/list?filter=${ filter }`);
    }

    add (employee: EmployeeModel): Observable<ResponseModel<EmployeeModel>> {
        return this._apiService.post('/employees', employee);
    }

    update (employee: EmployeeModel, id: number): Observable<ResponseModel<EmployeeModel>> {
        return this._apiService.put('/employees/' + id, employee);
    }

    delete (employee: EmployeeModel): Observable<ResponseModel<boolean>> {
        return this._apiService.delete('/employees/' + employee.id, employee);
    }

    getOne (id: number): Observable<ResponseModel<EmployeeModel>> {
        let data = { id: id };
        return this._apiService.get('/employees/' + id);
    }

}

