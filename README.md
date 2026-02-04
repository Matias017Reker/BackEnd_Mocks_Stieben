Backend Mocks API

Backend desarrollado en Node.js + Express + MongoDB para generación de datos mockeados, gestión de usuarios, mascotas y adopciones.

Incluye:

Mocking de datos con Faker

API REST

Swagger Docs

Tests funcionales con Mocha + Chai + Supertest

Dockerización del proyecto

```
Estructura

backend-mocks
├─ .env.example
├─ Dockerfile
├─ package-lock.json
├─ package.json
├─ src
│  ├─ app.js
│  ├─ config
│  │  ├─ db.js
│  │  └─ swagger.js
│  ├─ models
│  │  ├─ Adoption.js
│  │  ├─ Pet.js
│  │  └─ User.js
│  ├─ routes
│  │  ├─ adoption.router.js
│  │  ├─ mocks.router.js
│  │  └─ users.router.js
│  └─ utils
│     ├─ petMocker.js
│     └─ userMocker.js
└─ test
   └─ adoption.test.js

```
Servidor:

http://localhost:8080

Mocks

GET  /api/mocks/mockingusers
GET  /api/mocks/mockingpets
POST /api/mocks/generateData

Adoptions

POST   /api/adoptions
GET    /api/adoptions
GET    /api/adoptions/:id
DELETE /api/adoptions/:id

Tecnologías

Node.js

Express

MongoDB

Mongoose

Docker

Swagger

Mocha / Chai / Supertest

DookerHub Link: https://hub.docker.com/repository/docker/reker212/backend-mocks_stieben_entrega-final