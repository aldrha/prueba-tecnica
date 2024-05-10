<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str; 

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

    public function generateEmailAdress($name, $lastname, $country){
        $name = Str::lower(Str::camel($name));
        $lastname = Str::lower(Str::camel($lastname));
        $country = Str::lower(Str::slug($country));        
       
        $email = $name . '.' . $lastname;
        if($country == "colombia"){
            $domain = '@global.com.co';
        }else{
            $domain =  '@global.com.us';
        }
        $safeEmail = $email . $domain;
        
        
        if(Employee::where('email', '=', $safeEmail)->exists()){
            $id = Employee::latest()->first();
            $uniqueEmail = $email . '.' . $id->id + 1; 
            $safeEmail = $uniqueEmail . $domain;
            
        }
        
        // dd($id);
        // exit();
        return $safeEmail;
    } 
}
