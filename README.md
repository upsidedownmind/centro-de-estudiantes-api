# centro-de-estudiantes-api

API REST (Node.js + Express) con Swagger UI, lista para desplegar en Vercel.

## Autenticación

Todas las rutas de entidades requieren **HTTP Basic Auth**.  
Configurar usuarios via variable de entorno:

```
TEST_USERS=grupo1:grupo1pass,grupo2:grupo2pass,grupo3:grupo3pass
```

## Entidades

| Entidad | Ruta base |
|---|---|
| Calendario | `/calendario` |
| Carreras | `/carreras` |
| Eventos | `/eventos` |
| Notificaciones | `/notificaciones` |
| Novedades | `/novedades` |
| Perfiles | `/perfiles` |
| Reglamentación | `/reglamentacion` |
| Usuarios | `/usuarios` |

Cada entidad expone:

```
GET    /entidad        → listado
GET    /entidad/:id    → detalle
POST   /entidad        → crear
PUT    /entidad/:id    → actualizar
DELETE /entidad/:id    → eliminar
```

## Ejemplos curl

```bash
# Listar carreras
curl -u grupo1:grupo1pass http://localhost:3000/carreras

# Obtener una carrera por ID
curl -u grupo1:grupo1pass http://localhost:3000/carreras/1

# Crear una carrera
curl -u grupo1:grupo1pass -X POST http://localhost:3000/carreras \
  -H "Content-Type: application/json" \
  -d '{"codigo":"TSD","nombre":"Tecnicatura Superior en Diseño"}'

# Actualizar una carrera
curl -u grupo1:grupo1pass -X PUT http://localhost:3000/carreras/1 \
  -H "Content-Type: application/json" \
  -d '{"codigo":"TSP","nombre":"Tecnicatura Superior en Programación (actualizada)"}'

# Eliminar una carrera
curl -u grupo1:grupo1pass -X DELETE http://localhost:3000/carreras/1

# Crear una novedad
curl -u grupo1:grupo1pass -X POST http://localhost:3000/novedades \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nueva novedad","contenido":"Contenido de ejemplo","categoria_id":1,"categoria":"Académico","autor_id":1,"autor":"Admin","destacada":false,"fecha":"2026-05-13"}'

# Crear un evento
curl -u grupo1:grupo1pass -X POST http://localhost:3000/eventos \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Charla de Ciberseguridad","descripcion":"Charla abierta","fecha_inicio":"2026-06-15T18:00:00","fecha_fin":"2026-06-15T20:00:00","cupo":60,"inscriptos":0,"autor_id":1,"autor":"Admin","estado":"abierto","categoria":"charla","lugar":"Aula Magna","color":"#3A5BA9","imagen":""}'
```

## Swagger UI

Explorador interactivo disponible en:

```
GET /api-docs
```

## Ejecutar localmente

```bash
npm install
TEST_USERS=grupo1:grupo1pass npm start
```
