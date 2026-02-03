FROM node:20-alpine

RUN apk add --no-cache git openssh-client bash netcat-openbsd

WORKDIR /app

COPY . .  

RUN npm install
RUN npm install @prisma/client

RUN npx prisma generate --schema=apps/ms-usuarios/prisma/schema.prisma

RUN cp apps/ms-usuarios/deploy/start.sh ./start.sh
RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

CMD ["./start.sh"]