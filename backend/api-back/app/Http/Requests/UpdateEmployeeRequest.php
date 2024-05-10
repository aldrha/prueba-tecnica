<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest; 
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Enums\AreaEnum;
use App\Enums\CountryEmploymentEnum;
use App\Enums\TypeDocumentEnum;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $first = Carbon::today();
        $second = Carbon::now()->subMonth(1); 
     
        return [
            'lastname' => 'required|string|regex:/^[A-Z\s]+$/|max:20',
            'second_surname' => 'required|string|regex:/^[A-Z\s]+$/|max:20',
            'name' => 'required|string|regex:/^[A-Z\s]+$/|max:20',
            'middlename' => 'sometimes|regex:/^[A-Z\s]+$/|max:50',
            'country_employment' => ['required',Rule::in(CountryEmploymentEnum::toArray())],
            'type_document' => ['required', Rule::in(TypeDocumentEnum::toArray())],
            'document_number' => 'required|string|regex:/^[A-Za-z0-9\-]+$/|max:20|unique:employees,document_number,' . $this->id,
            'email' => 'sometimes|email|max:300|unique:employees,email,' . $this->id,
            'admission_date' => 'required|date_format:Y-m-d|before_or_equal:'.$first.'|after:'.$second,
            'area' => ['required', Rule::in(AreaEnum::toArray())],
        ];
    
    }

    protected function failedValidation(Validator $validator)
    {
        if ($this->expectsJson()) {
            $errors = (new ValidationException($validator))->errors();
            throw new HttpResponseException(
                response()->json([
                    'status' => 'failed',
                    'code' => 422,
                    'message' => 'Error de Validación!',
                    'data' => $errors,
                ], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
