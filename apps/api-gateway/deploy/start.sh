#!/bin/bash
set -e

INFORME=/root/logs/informe.log
config_git(){
    git clone --filter=blob:none --no-checkout $REPO_GIT ukiyo-backend
    cd ukiyo-backend

    # con sparse-checkout init --cone --> copiamos los archivos directos del monorepositorio
    # package.json, pnpm-lock.yaml, pnpm-workspace.yaml, tsconfig.json, .npmrc, .prettierrc, .eslintrc.json, .gitignore, etc
    git sparse-checkout init --cone

    # Trae solo los subdirectorios que indiques (apps/${MICROSERVICIO} y libs)
    git sparse-checkout set apps/${MICROSERVICIO} libs
    git checkout main

    git pull origin main

}

main(){

    npm install -g npm@11.7.0
    npm install -g pnpm
    npm install -g pm2

    echo "Instalando dependencias"
    pnpm install --frozen-lockfile

    echo "Arrancando Gateway con PM2"
    
    # Limpieza preventiva
    pm2 delete api-gateway 2>/dev/null || true
    
    # Arrancamos el proceso
    pm2 start pnpm --name "api-gateway" -- start:dev:gateway

    echo "API-GATEWAY ONLINE (Puerto 3000)"
    
}

main

# Mantener el contenedor vivo mostrando logs
pm2 logs api-gateway