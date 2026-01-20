FROM node:20-alpine

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

WORKDIR /app

RUN apk add --no-cache openssl bash

RUN sed -i 's/\r$//' ./start.sh && chmod +x ./start.sh

# Exponer puerto
EXPOSE 3000
USER root

# CMD ["tail", "-f", "/dev/null"]
CMD ["./start.sh"]