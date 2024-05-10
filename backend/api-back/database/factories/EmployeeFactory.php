<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Haruncpi\LaravelIdGenerator\IdGenerator;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->firstName($gender = 'male'|'female');
        $lastname = $this->faker->lastName;
        $country = $this->faker->randomElement(['COLOMBIA', 'USA']);
        $id = Employee::inRandomOrder()->value('id') ;

        if($country == "COLOMBIA"){
            $email = $name . '.' . $lastname . '.'. $id . '@global.com.co';
        }else{
            $email = $name . '.' . $lastname . '.'. $id . '@global.com.us';
        }
        
        return [
            'lastname' => Str::upper($lastname),
            'second_surname' =>  Str::upper($this->faker->lastName),
            'name' => Str::upper($name),
            'middlename' =>  Str::upper($this->faker->firstName($gender = 'male'|'female')),
            'country_employment' => $country,
            'type_document' => $this->faker->randomElement(['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Permiso Especial']),
            'document_number' => $this->faker->unique()->bothify('?-##########'),
            'email' => $email,
            'admission_date' => $this->faker->dateTimeBetween('-1 month', 'today'),
            'area' => $this->faker->randomElement(['Administración', 'Financiera', 'Compras', 'Infraestructura', 'Operación', 'Talento Humano', 'Servicios Varios']),
            'status' => 1,
        ];
    }
}
