# Stage 1: build
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy manifests (tanpa bun.lock karena tadi sudah dihapus)
COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/shared/package.json ./packages/shared/

RUN bun install

# Copy source
COPY apps/frontend ./apps/frontend
COPY packages/shared ./packages/shared

WORKDIR /app/apps/frontend
RUN bun run build

# Stage 2: serve dengan nginx
FROM nginx:alpine
# Ambil hasil build dari stage builder ke folder html nginx
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
# Copy konfigurasi nginx yang akan kita buat setelah ini
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

CMD sh -c "echo '🦊 Frontend → http://localhost:5173' && nginx -g 'daemon off;'"
EXPOSE 80