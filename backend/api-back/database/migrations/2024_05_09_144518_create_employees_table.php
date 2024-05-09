<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('lastname', 20);
            $table->string('second_surname', 20);
            $table->string('name', 20);
            $table->string('middlename', 50)->nullable();
            $table->enum('country_employment', ['COLOMBIA', 'USA']);
            $table->enum('type_document', ['Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte', 'Permiso Especial']);
            $table->string('document_number', 20);
            $table->text('email', 300);
            $table->date('admission_date');
            $table->enum('area', ['Administración', 'Financiera', 'Compras', 'Infraestructura', 'Operación', 'Talento 
            Humano', 'Servicios Varios']);
            $table->integer('status')->default(1)->comment('1: Activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
