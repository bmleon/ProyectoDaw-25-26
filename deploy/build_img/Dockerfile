# Build stage
FROM node:20-alpine

ARG CONTEXT
ARG MICROSERVICIO
ARG APP_MS=./apps/${MICROSERVICIO}
ARG RUTA_BUILD=./deploy/build_img

RUN apk update && apk add --no-cache git openssh

WORKDIR /app
COPY ${APP_MS}/deploy/start.sh .
# COPY ${RUTA_BUILD}/start.sh .
RUN chmod +x ./start.sh
RUN mkdir -p /root/logs

RUN mkdir -p /root/.ssh
# COPY ${RUTA_BUILD}/id_ed25519.pub /root/.ssh/id_ed25519.pub
# COPY ${RUTA_BUILD}/id_ed25519 /root/.ssh/id_ed25519

# Evita acces denied para que funcione la clave privada
RUN chmod 600 /root/.ssh/id_ed25519
RUN chmod 644 /root/.ssh/id_ed25519.pub

# Evita fingerprints añadiendo github.com a known_hosts
RUN ssh-keyscan github.com > /root/.ssh/known_hosts
# RUN eval "$(ssh-agent -s)" 
# RUN ssh-add /root/.ssh/id_ed25519

EXPOSE 3000

CMD ["sh", "/app/start.sh"]