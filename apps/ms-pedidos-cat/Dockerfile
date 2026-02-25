# --- BUILDER ---
FROM node:20-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# 1. Copiar configuración del Monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2. Copiar la librería compartida
COPY libs/common ./libs/common

# 3. Copiar EL CÓDIGO DE ESTE SERVICIO
COPY apps/ms-pedidos-cat ./apps/ms-pedidos-cat

# 4. Instalar dependencias
RUN pnpm install --frozen-lockfile

# 5. Construir Common
WORKDIR /app/libs/common
RUN pnpm run build

# 6. Construir el Microservicio
WORKDIR /app/apps/ms-pedidos-cat
RUN ../../node_modules/.bin/nest build

# --- RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

# 7. Copiar dependencias
COPY --from=builder /app/node_modules ./node_modules

# 8. Copiar build
COPY --from=builder /app/dist/apps/ms-pedidos-cat ./dist

CMD ["node", "dist/main.js"]