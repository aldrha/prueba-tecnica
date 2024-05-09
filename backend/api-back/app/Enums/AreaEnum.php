<?php

namespace App\Enums;


enum Area: string
{
    case ADMINISTRATCION = 'Administración';
    case FINANCIERA = 'Financiera';
    case COMPRAS = 'Compras';
    case INFRAESTRUCTURA = 'Infraestructura';
    case TALENTOHUMANO = 'Talento Humano';
    case SEVICIOSVARIOS = 'Servicios Varios';
}
