<?php

namespace App\Enums;


enum TypeDocument: string
{

    case CEDULADECIUDADANIA = 'Cédula de Ciudadanía';
    case CEDULADEEXTRANJERIA = 'Cédula de Extranjería';
    case PASAPORTE = 'Pasaporte';
    case PERMISOESPECIAL = 'Permiso Especial';
}
