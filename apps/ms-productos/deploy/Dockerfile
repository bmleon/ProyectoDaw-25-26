FROM node:20-alpine

ARG CONTEXTO
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

WORKDIR /app

RUN apk add --no-cache openssl bash

# Copiar script de inicio
COPY ${APP_MS}/deploy/start.sh .

# Copiar archivos de configuración del monorepo
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY .npmrc .
COPY tsconfig.json .
COPY nest-cli.json .

# Copiar código fuente (Librerías compartidas y el microservicio específico)
COPY libs ./libs
COPY apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

# Dar permisos de ejecución al script
RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

# El puerto interno siempre es 3000
EXPOSE 3000
USER root

CMD ["./start.sh"]