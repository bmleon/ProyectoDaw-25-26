#!/bin/bash
set -e
set -x

# --- CONFIGURACIÓN ESPECÍFICA DE CLIENTES ---
DB_HOST="ukiyo-ms-clientes-postgres"
DB_PORT="5432"
MICROSERVICIO="ms-clientes"
PM2_NAME="ms-clientes"
SCRIPT_START="start:dev:clientes"

setup_ssh_k8s(){
    echo "Configurando SSH desde volumen temporal..."
    mkdir -p /root/.ssh
    
    if [ -f "/tmp/ssh_keys/id_ed25519" ]; then
        cp /tmp/ssh_keys/id_ed25519 /root/.ssh/id_ed25519
        cp /tmp/ssh_keys/id_ed25519.pub /root/.ssh/id_ed25519.pub
        chmod 700 /root/.ssh
        chmod 600 /root/.ssh/id_ed25519
        chmod 644 /root/.ssh/id_ed25519.pub
    fi

    echo "Host github.com" > /root/.ssh/config
    echo "  StrictHostKeyChecking no" >> /root/.ssh/config
    chmod 600 /root/.ssh/config
}

wait_for_db() {
    echo "Esperando a que la Base de Datos ($DB_HOST:$DB_PORT) esté lista..."
    until nc -z -v -w30 "$DB_HOST" "$DB_PORT"; do
        echo "Esperando BD..."
        sleep 2
    done
    echo "Base de datos conectada."
}

config_git(){
    echo "Clonando repositorio..."
    # Usamos la variable de entorno REPO_GIT que viene del ConfigMap de K8s
    git clone --filter=blob:none --no-checkout $REPO_GIT ukiyo-backend
    cd ukiyo-backend

    git sparse-checkout init --cone
    
    # Bajamos solo ms-clientes y librerías compartidas
    git sparse-checkout set apps/${MICROSERVICIO} libs
    
    git checkout main
    git pull origin main
}

main(){
    setup_ssh_k8s
    echo "Configurando Git"
    config_git

    echo "Iniciando configuración automática"
    npm install -g npm@11.7.0 pnpm pm2

    echo "Instalando dependencias..."
    pnpm install --frozen-lockfile

    echo "Base de datos en $DB_HOST"
    wait_for_db 

    # Entramos a la carpeta del microservicio para migraciones
    cd apps/${MICROSERVICIO}
    
    echo "Ejecutando Prisma..."
    pnpm exec prisma generate
    pnpm exec prisma migrate deploy
    # Opcional: pnpm exec prisma db seed (si quieres seed automático al arrancar)
    
    cd ../..
    
    echo "Arrancando PM2 ($PM2_NAME)..."
    pm2 delete $PM2_NAME 2>/dev/null || true
    
    # OJO: Este script debe existir en el package.json de la RAÍZ
    pm2 start pnpm --name "$PM2_NAME" -- $SCRIPT_START
    
    echo "MS-CLIENTES ESTÁ ONLINE"
}

main
pm2 logs $PM2_NAME