# =========================
# Stage 1: Build & Dependencies
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Install specific pnpm version for build stability
RUN npm install -g pnpm@9

# Copy dependency manifest files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install all dependencies (including devDependencies required for compilation)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Build the NestJS project (outputs compiled JS to /app/dist)
RUN pnpm run build

# Prune devDependencies for a lightweight production bundle
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile


# =========================
# Stage 2: Production Runtime
# =========================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy production node_modules and compiled output from builder
COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

# Run as non-root user for security best practice
USER node

# Expose application port
EXPOSE 3000

# Start NestJS production server
CMD ["node", "dist/main.js"]