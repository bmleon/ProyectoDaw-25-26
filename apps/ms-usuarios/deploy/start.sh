#!/bin/bash
set -e
set -x

DB_HOST="ms-usuarios-postgres"
DB_PORT="5432"

INFORME=/root/logs/informe.log
setup_ssh_k8s(){
    echo "Configurando SSH desde volumen temporal..."
    mkdir -p /root/.ssh
    
    if [ -f "/tmp/ssh_keys/id_ed25519" ]; then
        cp /tmp/ssh_keys/id_ed25519 /root/.ssh/id_ed25519
        cp /tmp/ssh_keys/id_ed25519.pub /root/.ssh/id_ed25519.pub
        
        # Permisos estrictos necesarios para SSH
        chmod 700 /root/.ssh
        chmod 600 /root/.ssh/id_ed25519
        chmod 644 /root/.ssh/id_ed25519.pub
    fi

    echo "Host github.com" > /root/.ssh/config
    echo "  StrictHostKeyChecking no" >> /root/.ssh/config
    chmod 600 /root/.ssh/config
}

# Función para esperar a que la BD esté lista
wait_for_db() {
    echo "Esperando a que la Base de Datos ($DB_HOST:$DB_PORT) esté lista..."
        until nc -z -v -w30 "$DB_HOST" "$DB_PORT"; do
    echo "Esperando BD"
        sleep 2
        done
    echo "Base de datos conectada."
}

config_git(){
    echo "Clonando repositorio..."
    # Usamos la variable de entorno REPO_GIT que viene del ConfigMap
    git clone --filter=blob:none --no-checkout $REPO_GIT ukiyo-backend
    cd ukiyo-backend

    # Sparse checkout para bajar solo lo necesario
    git sparse-checkout init --cone
    
    # IMPORTANTE: Aquí indicamos la carpeta específica de ESTE microservicio
    git sparse-checkout set apps/${MICROSERVICIO} libs
    
    git checkout main
    git pull origin main
}

main(){

    setup_ssh_k8s

    echo "Configurando Git"
    config_git

    echo "Iniciando configuración automática"

    npm install -g npm@11.7.0
    npm install -g pnpm
    npm install -g pm2

    echo "Instalando dependencias"

    pnpm install --frozen-lockfile

    echo "Base de datos: $DB_NAME en $DB_HOST"

    wait_for_db 

    cd apps/ms-usuarios
    
    pnpm exec prisma generate
    pnpm exec prisma migrate deploy
    
    cd ../..
    
    echo "Arrancando PM2.."
    pm2 delete ms-usuarios 2>/dev/null || true
    pm2 start pnpm --name "ms-usuarios" -- start:dev:usuarios
    
    echo "MS-USUARIOS ESTÁ ONLINE"
}

main

# Mantener el contenedor vivo mostrando los logs
pm2 logs ms-usuarios