FROM node:20-alpine

RUN apk add --no-cache git openssh-client bash netcat-openbsd

WORKDIR /app

COPY apps/ms-usuarios/deploy/start.sh ./start.sh

RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

CMD ["./start.sh"]