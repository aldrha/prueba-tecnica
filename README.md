# prueba-tecnica

## Primer Paso

    Se debe ingresar en la carpeta backend y en la carpeta api-back esta el contenido de la api rest.
    Ejecutar composer install
    Copiar el contenido del archivo .env.example a un archivo .env
    Ejecutar php artisan key:generate
    Ejecutar php artisan migrate:fresh --seed
        Esto es para que se registren las migraciones y datos de prueba

## Segundo Paso

    Ingresar en la carpeta frontend y dentro de la carpeta employeesAdmin
    Ejecutar npm install ( en su caso npm install --force)

## Tercer Paso

    Para utilizar la aplicacion, primero se debe de registrar un usuario, no obstante se puede utilizar con los siguientes datos de prueba
        email: aldrha95@gmail.com
        password: 12345678

## Se Adjunta la collection de Api de postman, con los diferentes endpoints a utilizar

## Endpoint de Registro

    [POST] (http://127.0.0.1:8000/api/register)
    [POST] (http://127.0.0.1:8000/api/login)
    [POST] (http://127.0.0.1:8000/api/logout)

## Endpoint para gestion de empleados

    [GET] (http://127.0.0.1:8000/api/employees/1)
    [GET] (http://127.0.0.1:8000/api/employees/list?)
    [POST] (http://127.0.0.1:8000/api/employees/)
    [PUT] (http://127.0.0.1:8000/api/employees/101)
    [DELETE] (http://127.0.0.1:8000/api/employees/99)
