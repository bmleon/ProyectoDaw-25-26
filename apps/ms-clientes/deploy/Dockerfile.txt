FROM node:20-alpine

ARG CONTEXTO
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

WORKDIR /app

RUN apk add --no-cache openssl bash

COPY ${APP_MS}/deploy/start.sh .

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY .npmrc .
COPY tsconfig.json .
COPY nest-cli.json .

COPY libs ./libs
COPY apps/${MICROSERVICIO} ./apps/${MICROSERVICIO}

RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

EXPOSE 3000
USER root

CMD ["./start.sh"]