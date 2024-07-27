# Descripción

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del archivo `.env.template`, renombrarlo a `.env` y poner las variables correspondientes.
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar el SEED `npm run seed`
7. Correr el proyecto `npm run dev` o `npm run dev:turbo`

## Correr en prod

1.
