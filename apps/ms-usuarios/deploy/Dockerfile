FROM node:20-alpine

RUN apk add --no-cache git openssh-client bash netcat-openbsd

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY . .  

RUN pnpm install

RUN pnpm exec prisma generate --schema=apps/ms-usuarios/prisma/schema.prisma

RUN cp apps/ms-usuarios/deploy/start.sh ./start.sh
RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

CMD ["./start.sh"]