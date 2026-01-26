# Instruções de Deploy Permanente

## Opção 1: Deploy na Vercel (Recomendado para Next.js)

### Pré-requisitos:
- Conta no GitHub
- Conta na Vercel (gratuita)

### Passos:

1. **Fazer push para GitHub:**
```bash
git remote add origin https://github.com/seu-usuario/reembolso-system.git
git branch -M main
git push -u origin main
```

2. **Conectar no Vercel:**
   - Acesse https://vercel.com
   - Clique em "New Project"
   - Selecione o repositório "reembolso-system"
   - Configure as variáveis de ambiente:
     - `DATABASE_URL`: Será configurada automaticamente com PostgreSQL

3. **Deploy automático:**
   - Cada push para `main` fará deploy automático
   - URL permanente: `https://reembolso-system.vercel.app`

---

## Opção 2: Deploy no Render

### Pré-requisitos:
- Conta no GitHub
- Conta no Render (gratuita)

### Passos:

1. **Fazer push para GitHub** (mesmo que acima)

2. **Conectar no Render:**
   - Acesse https://render.com
   - Clique em "New +" → "Web Service"
   - Conecte sua conta GitHub
   - Selecione o repositório
   - Configure:
     - **Name**: reembolso-system
     - **Environment**: Node
     - **Build Command**: `pnpm install && pnpm run build`
     - **Start Command**: `pnpm start`
     - **Plan**: Free (ou pago para melhor performance)

3. **Variáveis de Ambiente:**
   - `DATABASE_URL`: Configure com banco PostgreSQL gratuito do Render

4. **Deploy:**
   - URL permanente: `https://reembolso-system.onrender.com`

---

## Opção 3: Deploy no Railway

### Pré-requisitos:
- Conta no GitHub
- Conta no Railway

### Passos:

1. **Fazer push para GitHub** (mesmo que acima)

2. **Conectar no Railway:**
   - Acesse https://railway.app
   - Clique em "New Project"
   - Selecione "Deploy from GitHub repo"
   - Autorize e selecione o repositório

3. **Configurar:**
   - Railway detectará automaticamente como Next.js
   - Configure variáveis de ambiente conforme necessário

4. **Deploy:**
   - URL permanente: `https://reembolso-system-production.up.railway.app`

---

## Configuração do Banco de Dados

### Para Vercel com PostgreSQL Neon (Gratuito):

1. Acesse https://neon.tech
2. Crie um projeto novo
3. Copie a string de conexão
4. Configure em Vercel como `DATABASE_URL`
5. Execute migrations:
```bash
DATABASE_URL="sua-string" pnpm exec prisma migrate deploy
```

### Para Render com PostgreSQL:

1. No Render, crie um novo PostgreSQL Database
2. Copie a URL de conexão
3. Configure em seu Web Service
4. Execute migrations no deploy

---

## Após o Deploy

1. **Importar dados de 2025:**
   - Acesse a URL do seu site
   - Clique em "📤 Importar Excel"
   - Selecione `PaineldeReembolso2025.xlsx`

2. **Compartilhar com outros:**
   - Distribua a URL permanente
   - Todos podem acessar de qualquer lugar

3. **Manutenção:**
   - Atualizações automáticas com cada push
   - Backups automáticos do banco de dados
   - Monitoramento de performance

---

## Troubleshooting

### Erro: "DATABASE_URL não configurada"
- Configure a variável de ambiente na plataforma de deploy

### Erro: "Prisma migrations falharam"
- Execute manualmente: `pnpm exec prisma migrate deploy`

### Site lento
- Upgrade para plano pago
- Configure cache adequadamente

---

## Custos Estimados

| Plataforma | Hosting | Banco de Dados | Total/mês |
|-----------|---------|----------------|-----------|
| Vercel    | Grátis  | Neon (Grátis)  | R$ 0      |
| Render    | Grátis  | Render (Grátis)| R$ 0      |
| Railway   | Grátis  | Railway (Grátis)| R$ 0      |

Todas as opções têm planos gratuitos adequados para este projeto!
