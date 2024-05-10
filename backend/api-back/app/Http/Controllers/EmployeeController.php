<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = $request->query('filter'); 

       
        if (!empty($filter)) {
            $employees = Employee::where('employees.name', 'like', '%'.$filter.'%')
            ->orWhere('employees.middlename', 'like', '%'.$filter.'%')
            ->orWhere('employees.lastname', 'like', '%'.$filter.'%')
            ->orWhere('employees.second_surname', 'like', '%'.$filter.'%')
            ->orWhere('employees.country_employment', 'like', '%'.$filter.'%')
            ->orWhere('employees.type_document', 'like', '%'.$filter.'%')
            ->orWhere('employees.document_number', 'like', '%'.$filter.'%')
            ->orWhere('employees.email', 'like', '%'.$filter.'%')
            ->orWhere('employees.status', 'like', '%'.$filter.'%')
            ->get();
        } else {
            $employees = Employee::latest()->get();
        } 
 
        $page = Paginator::resolveCurrentPage() ?: 1;
        $perPage = 10;
        $employees = new LengthAwarePaginator(
            $employees->forPage($page, $perPage), $employees->count(), $perPage, $page, ['path' => Paginator::resolveCurrentPath()]
        );

        if (is_null($employees->first())) {
            return response()->json([
                'status' => 'failed',
                'code' => 200,
                'message' => 'No hay empleados registrados!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'code' => 200,
            'message' => 'Emplados listados con éxito.',
            'response' => $employees,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
       
        $validate = $request->validated();  
        $employeeNew = new Employee();
        $validate['email'] = $employeeNew->generateEmailAdress($request->name, $request->lastname, $request->country_employment);
     
        $employee = Employee::create($validate); 

        $response = [
            'status' => 'success',
            'code' => 201,
            'message' => 'Empleado registrado con éxito',
            'data' => $employee,
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
       
        $employeeData = Employee::find($employee->id);
        if (is_null($employeeData)) {
            return response()->json([
                'status' => 'failed',
                'code' => 404,
                'message' => 'Emplado no encontrado!',
            ], 404);
        }

        $response = [
            'status' => 'success',
            'code' => 200,
            'message' => 'Datos del empleado obtenidos éxitosamente.',
            'data' => $employeeData,
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, $id)
    {
        
        $validate = $request->validated();

        $employee = Employee::find($id);
        if (is_null($employee)) {
            return response()->json([
                'status' => 'failed',
                'code' => 404,
                'message' => 'Emplado no encontrado!',
            ], 404);
        }

        if($validate['name'] != $employee->name || $validate['lastname'] != $employee->lastname || $validate['country_employment'] != $employee->country_employment){
            $validate['email'] = $employee->generateEmailAdress($request->name, $request->lastname, $request->country_employment);
            $employee->update($validate);
        }else{
            $employee->fill($validate)->save();
        } 

        $response = [
            'status' => 'success',
            'code' => 200,
            'message' => 'Empleado modificado éxitosamente.',
            'data' => $employee,
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        if (is_null($employee)) {
            return response()->json([
                'status' => 'failed',
                'code' => 404,
                'message' => 'Emplado no encontrado!',
            ], 404);
        }

        $employee->delete();
        return response()->json([
            'status' => 'success',
            'code' => 200,
            'message' => 'Empleado eliminado éxitosamente.',
        ], 200);
    }

    /**
     * Search by a employee name
     *
     * @param  str  $name
     * @return \Illuminate\Http\Response
     */
    public function search($name)
    {
        $employees = Employee::where('name', 'like', '%' . $name . '%')
            ->latest()->get();

        if (is_null($employees->first())) {
            return response()->json([
                'status' => 'failed',
                'code' => 404,
                'message' => 'Empleado no encontrado!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'code' => 200,
            'message' => 'Los empleados se recuperaron con éxito.',
            'data' => $employees,
        ];

        return response()->json($response, 200);
    }
}
