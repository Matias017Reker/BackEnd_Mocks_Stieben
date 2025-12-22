
Proyecto BackEnd-Mocks

```
Proyecto backend desarrollado con Node.js, Express y MongoDB, enfocado en la generación de datos mockeados (usuarios y mascotas) y la inserción masiva en base de datos, según consignas del desafío.

```
Estructura

backend-mocks
├─ package-lock.json
├─ package.json
└─ src
   ├─ app.js
   ├─ config
   │  └─ db.js
   ├─ models
   │  ├─ Pet.js
   │  └─ User.js
   ├─ routes
   │  └─ mocks.router.js
   └─ utils
      ├─ petMocker.js
      └─ userMocker.js

```
Tecnologías utilizadas

Node.js

Express

MongoDB + Mongoose

@faker-js/faker

bcrypt