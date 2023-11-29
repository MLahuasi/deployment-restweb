# DATA BASES

## POSTGRES

### LOCAL - DOCKER

- Crear Contenedor para pruebas

```
    docker compose up -d
```

- Instalar Prisma

```
    npm install prisma --save-dev
    npx prisma init --datasource-provider PostgreSQL
```

- **NOTA**: Si trabajamos con una BDD ya creada ejecutamos `npx prisma db pull` para crear los modelos desde la BDD.

- Si no tenemos un BDD crear modelos en [schema.prisma](./prisma/schema.prisma)

- Ejecutar la migración hacia la BDD

```
    npx prisma migrate dev
```

### CLOUD - [NEON](https://neon.tech/)

- Crear una base de datos
- Copiar la url de conexión y pegar en el archivo .env
- Configurar el comando en [package.json](./package.json) para la migración de la BDD en producción

```
    "prisma:migrate:prod": "prisma migrate deploy"
```

- Ejecutar. Se debe crear la BDD en la nube

```
    npm run prisma:migrate:prod
```

## CONFIGURAR

- Crear directorio `data` en donde se agregan las diferentes bases de datos que puede usar el sistema por ejemplo [postgres](./src/data/postgres/)
- Configurar el contexto para acceder a la BDD, en este caso se crea el [prismaCliente](./src/data/postgres/index.ts).

## [DTOS](https://www.okta.com/identity-101/dto/)

- Son objeto que se usa para transferir información.
- Para este caso recibe el `Request` y realiza las validaciones necesarias.
- En el caso de presentarse un error lo retorna para que el `Controller` lo gestione. Valida los parámetros de entrada.

> - [**CREATE**](./src/domain/dtos/todos/create-todo.dto.ts)
> - [**UPDATE**](./src/domain/dtos/todos/update-todo.dto.ts)

## [OPERACIONES CRUD](./src/presentation/todos/controller.ts)

> - Se definen en el controller
> - El controller recibe los parámetros recibidos en el `Request` y los puede validar directamente o usando Dtos.

> [Inicio](./README.md) | [Anterior](./rest.md) |[Siguiente](./)
