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