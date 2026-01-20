FROM node:20-alpine

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}

RUN apk update && apk add --no-cache git

WORKDIR /app
COPY ${APP_MS}/deploy/start.sh .
RUN chmod +x ./start.sh
RUN mkdir -p /root/logs

# Exponer puerto
EXPOSE 3000

# CMD ["tail", "-f", "/dev/null"]
CMD ["sh", "/app/start.sh"]