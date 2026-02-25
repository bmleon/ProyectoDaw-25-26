FROM node:20-alpine

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}
# ARG RUTA_BUILD = ./deploy/build_img

RUN apk update && apk add --no-cache git openssh

WORKDIR /app
COPY ${APP_MS}/deploy/start.sh .
# COPY ${RUTA_BUILD}/start.sh .
RUN chmod +x ./start.sh
RUN mkdir -p /root/logs

# RUN mkdir -p root/.ssh
# COPY ./deploy/id_25519.pub /root/.ssh/id_25519.pub
# COPY ./deploy/id_25519 /root/.ssh/id_25519

# #Evita acces denied para que funcione la clave privada
# RUN chmod 600 /root/.ssh/id_25519
# RUN chmod 644 /root/.ssh/id_25519.pub
# # Evita fingerprint 
# RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN chmod 777 /app
# Exponer puerto
EXPOSE 3000

# CMD ["tail", "-f", "/dev/null"]
CMD ["sh", "/app/start.sh"]