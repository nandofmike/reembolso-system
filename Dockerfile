FROM node:22-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código-fonte
COPY . .

# Gerar Prisma Client
RUN pnpm exec prisma generate

# Build
RUN pnpm run build

# Expor porta
EXPOSE 3000

# Comando de inicialização
CMD ["pnpm", "start"]
