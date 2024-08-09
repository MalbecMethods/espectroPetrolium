![Logo](./client/public/images/logo_dm.png)

## Instrucciones
1. El servidor está desarrollado en Python.
# Siga los siguientes pasos para usar el servidor
## Instala  las dependencias
    pip install -r requierements.txt

## Crea las tablas necesesarias para ejecutar django
    python manage.py makemigrations 
    python manage.py migrate    

## Crea un superusuario para utilizar el panel de admin
    python manage.py createsuperuser 

## Coloca un usuario y contraseña como este(Todo es segun tu preferencia, incluido el email.)
    username: admin
    contraseña: Contraseña1

## Ejecuta el servidor 
    python manage.py runserver

## Esto te dara un link a la ruta del servidor
- Si quieres acceder al panel del admin debes utilizar la ruta "/admin" ej: localhost:8080/admin
2. El cliente esta desarrollado en Javascript: 
`npm install`
   y ejecutar:
`npm run dev`
## Autores

- [@Aquino Alejandro](https://www.github.com/aquinoalejandro)
- [@Stevens Natali](https://www.github.com/solchuuxx)
- [@Rivenson Camila](https://www.github.com/cami-js)




