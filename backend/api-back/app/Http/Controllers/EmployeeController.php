<?php

namespace App\Http\Controllers;

use App\Enums\Area;
use App\Enums\CountryEmployment;
use App\Enums\TypeDocument;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::latest()->get();

        if (is_null($employees->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No hay empleados registrados!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Emplados listados con éxito.',
            'data' => $employees,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'lastname' => 'required|alpha:ascii|max:20',
            'second_surname' => 'required|alpha:ascii|max:20',
            'name' => 'required|alpha:ascii|max:20',
            'middlename' => 'sometimes|required|alpha:ascii|max:50',
            'country_employment' => ['required', new Enum(CountryEmployment::class)],
            'type_document' => ['required', new Enum(TypeDocument::class)],
            'document_number' => 'required|string|regex:/^[A-Za-z0-9\-]+$/|unique:employees,document_number|max:20',
            'email' => 'required|email|unique:employess,email|max:300',
            'admission_date' => 'required|date|before_or_equal:today - 1 month',
            'area' => ['required', new Enum(Area::class)],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        $employee = Employee::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Empleado registrado con éxito',
            'data' => $employee,
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $employee = Employee::find($employee);

        if (is_null($employee)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Employee is not found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Employee is retrieved successfully.',
            'data' => $employee,
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validate = Validator::make($request->all(), [
            'lastname' => 'required|alpha:ascii|max:20',
            'second_surname' => 'required|alpha:ascii|max:20',
            'name' => 'required|alpha:ascii|max:20',
            'middlename' => 'sometimes|required|alpha:ascii|max:50',
            'country_employment' => ['required', new Enum(CountryEmployment::class)],
            'type_document' => ['required', new Enum(TypeDocument::class)],
            'document_number' => 'required|string|regex:/^[A-Za-z0-9\-]+$/|max:20unique:employees,document_number,' . $employee,
            'email' => 'required|email|max:300|unique:employess,email,' . $employee,
            'admission_date' => 'required|date|before_or_equal:today - 1 month',
            'area' => ['required', new Enum(Area::class)],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        if (is_null($employee)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Employee is not found!',
            ], 200);
        }

        $employee->update($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Employee is updated successfully.',
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
                'message' => 'Employee is not found!',
            ], 200);
        }

        Employee::destroy($employee);
        return response()->json([
            'status' => 'success',
            'message' => 'Employee is deleted successfully.'
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
                'message' => 'No Employee found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Employees are retrieved successfully.',
            'data' => $employees,
        ];

        return response()->json($response, 200);
    }
}
