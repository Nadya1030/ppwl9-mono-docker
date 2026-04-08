FROM oven/bun:1 AS base
WORKDIR /app

# Copy workspace manifests dulu (layer caching)
COPY package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/

RUN bun install

# Copy source
COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared

WORKDIR /app/apps/backend

# Generate Prisma client
RUN bunx prisma generate

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]