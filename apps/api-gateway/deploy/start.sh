#!/bin/bash
set -e

INFORME=/root/logs/informe.log
setup_ssh_k8s(){
    echo "Configurando SSH desde volumen temporal..."
    mkdir -p /root/.ssh
    
    # Copiamos del volumen de solo lectura (/tmp/ssh_keys) a la carpeta real (/root/.ssh)
    if [ -f "/tmp/ssh_keys/id_ed25519" ]; then
        cp /tmp/ssh_keys/id_ed25519 /root/.ssh/id_ed25519
        cp /tmp/ssh_keys/id_ed25519.pub /root/.ssh/id_ed25519.pub
        
        # Ahora sí podemos cambiar permisos porque son copias nuestras
        chmod 700 /root/.ssh
        chmod 600 /root/.ssh/id_ed25519
        chmod 644 /root/.ssh/id_ed25519.pub
    fi

    # Generamos known_hosts (ahora sí podemos escribir)
    ssh-keyscan github.com > /root/.ssh/known_hosts 2>/dev/null
}

config_git(){
    if [$? -ne 0]; then
        echo "Error de configuracion de git. Abortando." >> $INFORME
        exit 1
    fi

    ls -la /root/.ssh

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

    setup_ssh_k8s

    echo "Configurando Git"
    # if ssh -T git@github.com
        config_git
    # fi

    echo "Instalando microservicio"

    npm install -g npm@11.7.0 pnpm pm2

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
# tail -f /dev/null

# Mantener el contenedor vivo mostrando logs
pm2 logs api-gateway