<?php

namespace App\Http\Controllers;

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
            'document_number' => 'required|unique:employees,document_number|alpha|max:20'
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
            'name' => 'required',
            'description' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 403);
        }

        $employee = Employee::find($employee);

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
        $employee = Employee::find($employee);

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
