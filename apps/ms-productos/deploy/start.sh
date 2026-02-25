#!/bin/bash
set -e

wait_for_db() {
    echo "Esperando a Base de Datos ($DB_HOST:5432)..."
    until nc -z -v -w30 "$DB_HOST" 5432; do
        echo "Esperando conexión a BD..."
        sleep 2
    done
    echo "Base de datos conectada."
}

main(){
    echo "Iniciando despliegue de MS-PRODUCTOS"

    npm install -g npm@11.7.0 pnpm pm2

    echo "Instalando dependencias..."
    pnpm install --frozen-lockfile

    echo "Base de Datos objetivo: $DB_DATABASE en $DB_HOST"

    wait_for_db
    
    echo "Arrancando PM2..."
    pm2 delete ms-productos 2>/dev/null || true
    pm2 start pnpm --name "ms-productos" -- start:dev:productos
    
    echo "MS-PRODUCTOS ONLINE"
}
main

pm2 logs ms-productos