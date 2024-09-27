![logo](https://i.imgur.com/sl6a6zi.png)
# Moodify
## Spotify API call

### Index

1. Descripción
2. Documentación
    * Requerimientos previos
    * Instalación
    * Inicialización
    * Autenticación
    * Rutas principales y Query Params
    * Manejo de errores
    * Estructura carpetas
3. Ramas
    + [Aldi_branch](https://github.com/FMartine7i/moodify_api/tree/aldi_branch)
    + [Jessi_branch](https://github.com/FMartine7i/moodify_api/tree/jessii_branch)
    + [Mila_branch](https://github.com/FMartine7i/moodify_api/tree/mila_branch)
    + [Fede_branch](https://github.com/FMartine7i/moodify_api/tree/fede_branch)

## Descripción
**Moodify** es una app que permite a los usuarios encontrar las mejores playlists, canciones, artistas y álbums para su **estado de ánimo** actual.

## Documentación
### Requerimientos previos
> [!NOTE]
> Tener instalado Node.js y npm.
### Instalación
> Clonar repositorio y luego ir a la terminal y buscar la carpeta ``moodify_api``. Una vez dentro la carpeta, usar el siguiente comando: ``npm install`` o ``npm i``.
### Inicialización
> 
### Autenticación
> Crear un archivo ``.env`` en la carpeta principal ``/moodify`` y escribir la siguiente línea: ``TOKEN = <codigo_token>`` con el token enviado.
### Rutas principales y Query Params
1. Canciones
    * **GET** ``api\v1\songs`` → Busca todas las canciones
    * **GET** ``api\v1\songs\id\:id`` → Busca una canción por su ID (numeros del 1 al 50)
    * **GET** ``api\v1\songs?mood=<mood>`` → Busca canciones por estado de ánimo. Se puede elegir: [dark, sad, happy, angry, crepy,romantic, emotional, relaxed]

2. Artistas
    * **GET** ``api\v1\artists`` → Devuelve todos los artistas
    * **GET** ``api\v1\artists\id\:id`` → Devuelve un artista por su id [1 - 50]
    * **GET** ``api\v1\artists?genre=<genre>`` → Devuelve artistas por cualquier género solicitado

3. Playlists
    * **GET** ``api\v1\playlists`` → Devuelve 50 playlists
    * **GET** ``api\v1\playlists\id\:id`` → Devuelve una playlist por id [1 - 50]
    * **GET** ``api\v1\playlists?TimeOfDay`` → Devuelve 50 playlists para el momento del dia elegido: [mañana, tarde, noche, madrugada]

### Manejo de errores
1. Paquetes de manejos de errores: ``husky`` y ``standard``
2. Manejo de errores:
    * ``node app``: inicializa la API
    * ``npx standard``: muestra los errores en el código
    * ``npx standard --fix``: corrige estos errores mostrados

### Estructura carpetas
* ``/moodify`` → carpeta principal
* ``/moodify/routes`` → acá se encuentran las configuraciones de las rutas de los controladores para cada entidad (canciones, playlists, albumes, artistas)
* ``/moodify/controllers`` → esta es la carpeta de los controladores para cada entidad.
* ``/moodify/models`` → esta carpeta guarda el archivo ``server.js`` que permite la conexión entre Moodify API y la API de Spotify.
* ``/moodify/public/`` → acá se encuentra la página pública que se muestra por defecto
> [!IMPORTANT]
> La pagina pública mostrada no es funcional

![Estructura]()

