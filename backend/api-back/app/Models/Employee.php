<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'lastname',
        'second_surname',
        'name',
        'middlename',
        'country_employment',
        'type_document',
        'document_number',
        'email',
        'admission_date',
        'area',
        'status'
    ];
}
