# Iniciar el servidor Express

Antes de iniciar deberías tener la base de datos levantada y añadir el fichero
.env con la configuracion de la db.

Teniendo en cuenta de estar en  la raiz del projecto

### Contenido del Archivo `.env`
````
DB_host= 'HOST'
DB_port= 3306
DB_user= 'USER'
DB_password= 'PASSWORD'
DB_database= 'DBNAME'
````

### Run express
````
> npm i
> npm run dev
````

# Como consumir el api

Para facilitar las pruebas con el api rest, he adjuntado un [INITIAL.SQL](docs/initial.sql), que podrías lanzar una vez creado el schema.

> [!WARNING]  
> Lanzar el initial.sql con la db limpia

### Postman

He añadido tambien un postman para facilitar el testing de la api [COLECTION](docs/modulo-4-evaluacion.postman_collection.json)