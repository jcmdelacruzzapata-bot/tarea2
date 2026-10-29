# Contact Book API

API REST de agenda de contactos con autenticación JWT y roles (Express 5).

## Configuración

1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env` y cambia los valores (el `.env` NO se sube al repo):

| Variable | Qué es |
|---|---|
| `PORT` | Puerto del servidor (3000) |
| `JWT_SECRET` | Secreto con el que se firman los tokens. Largo y aleatorio |
| `JWT_EXPIRES_IN` | Duración del token (ej. `1h`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credenciales del admin inicial, creado al arrancar (`seedAdmin`) |

3. Arranca: `npm run dev` (o `npm start`)

## Roles

- **member**: consulta, crea y edita contactos
- **manager**: además elimina contactos
- **admin**: además administra usuarios

Todo usuario que se registra es `member`; si el body trae `role`, se ignora. El primer admin sale del `.env`.

## Endpoints

Las rutas protegidas exigen `Authorization: Bearer <token>`.

| Método | Ruta | Acceso | Respuestas |
|---|---|---|---|
| POST | /auth/register | Público | 201, 400, 409 |
| POST | /auth/login | Público (5 fallos / 15 min por IP) | 200, 400, 401, 429 |
| GET | /auth/me | member, manager, admin | 200, 401 |
| GET | /admin/users | admin | 200, 401, 403 |
| PATCH | /admin/users/:id/role | admin | 200, 400, 401, 403, 404 |
| GET | /contacts, /contacts/:id | member, manager, admin | 200, 401, 404 |
| POST | /contacts | member, manager, admin | 201, 400, 401, 409 |
| PUT | /contacts/:id | member, manager, admin | 200, 400, 401, 404, 409 |
| PATCH | /contacts/:id/favorite | member, manager, admin | 200, 401, 404 |
| DELETE | /contacts/:id | manager, admin | 204, 401, 403, 404 |
| GET | /contacts/stats/summary | member, manager, admin (+ header `x-client-id`) | 200, 400, 401 |

Nota: el rol viaja dentro del token. Si un admin cambia el rol de alguien, esa persona conserva el rol anterior hasta que su token venza o vuelva a iniciar sesión.

## ¿Qué diferencia hay entre un 401 y un 403 en tu API?

**401**: la API no sabe quién eres: no mandaste token, o es inválido o venció. Se arregla autenticándose. **403**: sí sabe quién eres, pero tu rol no permite esa acción (un `member` intentando borrar un contacto). Volver a iniciar sesión no lo arregla; hace falta otro rol.

## Postman

Importa `ContactBook.postman_collection.json` y ejecuta primero la carpeta **00 - Preparación** en orden: guarda `{{tokenAdmin}}`, `{{tokenMember}}` y `{{tokenManager}}` automáticamente.
