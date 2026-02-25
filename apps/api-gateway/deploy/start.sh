#!/bin/bash
set -e

# Configuración de variables personalizadas
REPO_PERSONAL="https://github.com/bmleon/ProyectoDaw-25-26.git"
INFORME=/root/logs/informe.log

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

    ssh-keyscan github.com > /root/.ssh/known_hosts 2>/dev/null
}

config_git(){
    echo "Clonando repositorio personal: $REPO_PERSONAL"
    
    # Clonamos usando la URL de tu repositorio directamente
    git clone --filter=blob:none --no-checkout $REPO_PERSONAL ukiyo-backend
    cd ukiyo-backend

    # Configuración de sparse-checkout para traer solo lo necesario
    git sparse-checkout init --cone
    git sparse-checkout set apps/${MICROSERVICIO} libs
    
    # Cambiado a 'master' que es tu rama actual
    git checkout master
    git pull origin master
}

main(){
    setup_ssh_k8s

    echo "Configurando Git"
    config_git

    echo "Instalando herramientas de Node"
    npm install -g npm@11.7.0 pnpm pm2

    echo "Instalando dependencias con pnpm"
    pnpm install --frozen-lockfile

    echo "Arrancando microservicio con PM2"
    
    # Limpieza de procesos previos
    pm2 delete api-gateway 2>/dev/null || true
    
    # Arrancamos el microservicio (usando el script de inicio de tu package.json)
    pm2 start pnpm --name "api-gateway" -- start:dev:gateway

    echo "SISTEMA ONLINE"
}

main

# Mostrar logs para que el contenedor no se detenga
pm2 logs api-gateway