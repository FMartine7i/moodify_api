![logo](https://i.imgur.com/sl6a6zi.png)
# Moodify
## Spotify API call

### Index

1. Descripción
2. Documentación
    * Instalación
    * Endpoints/ Query params 
3. Ramas
    + [Aldi_branch](https://github.com/FMartine7i/moodify_api/tree/aldi_branch)
    + [Jessi_branch](https://github.com/FMartine7i/moodify_api/tree/jessii_branch)
    + [Mila_branch](https://github.com/FMartine7i/moodify_api/tree/mila_branch)
    + [Fede_branch](https://github.com/FMartine7i/moodify_api/tree/fede_branch)

## Descripción
**Moodify** es una app que permite a los usuarios encontrar las mejores playlists, canciones, artistas y álbums para su **estado de ánimo** actual.

## Documentación
### Instalación
> [!NOTE]
> Clonar repositorio y luego ir a la terminal y buscar la carpeta ``moodify_api``. Una vez dentro la carpeta, usar el siguiente comando: ``npm install`` o ``npm i``.

### Endpoints/ Query params
## Álbumes

# 1. Obtener álbumes por año
# URL: /api/albums
# Query Params:
# year (opcional): Año para filtrar los álbumes. Si no se especifica, devuelve 50 álbumes de 2024.
# Descripción: Devuelve una lista de 50 álbumes del año 2024 o del año especificado en el parámetro year.
# Ejemplo de Request:
# GET /api/albums?year=2024
# Respuestas:
# 200 OK: Lista de álbumes.
# 500 ERROR: Error al obtener los álbumes.

# 2. Obtener álbumes instrumentales
# URL: /api/albums/instrumental
# Descripción: Devuelve una lista de 50 álbumes instrumentales.
# Ejemplo de Request: GET /api/albums/instrumental
# Respuestas:
# 200 OK: Lista de álbumes instrumentales.
# 500 ERROR: Error al obtener los álbumes.

# 3. Obtener álbum por ID
# URL: /api/albums/:id
# Descripción: Devuelve los detalles de un álbum por su id personalizado.
# Ejemplo de Request: GET /api/albums/1
# Respuestas:
# 200 OK: Detalles del álbum.
# 404 ERROR: Álbum no encontrado.
