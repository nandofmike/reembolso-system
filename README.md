# 🎯 Painel de Reembolso 2025+

Sistema web completo para gerenciar reembolsos com importação de dados de 2025, cadastro contínuo de 2026 em diante, filtros avançados e exportação de dados.

## ✨ Funcionalidades

- ✅ **Importação de Excel** - Importe dados da planilha de 2025 com deduplicação automática
- ✅ **Novo Registro** - Adicione registros de 2026 em diante
- ✅ **Busca Rápida** - Pesquise por processo, beneficiário, CPF, UPM, especialidade, etc.
- ✅ **Filtros Avançados** - Filtre por ano, datas, valores e status
- ✅ **Exportação** - Exporte dados em CSV ou Excel
- ✅ **Edição** - Visualize e edite registros individuais
- ✅ **Exclusão** - Delete registros quando necessário
- ✅ **Paginação** - 25 registros por página
- ✅ **Responsivo** - Funciona em desktop, tablet e mobile

## 🚀 Quick Start (Desenvolvimento)

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/reembolso-system.git
cd reembolso-system

# Instalar dependências
pnpm install

# Configurar banco de dados
pnpm exec prisma migrate dev

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:3000` no navegador.

## 📦 Deploy Permanente

### Opção 1: Vercel (Recomendado)

```bash
# 1. Fazer push para GitHub
git push origin main

# 2. Conectar no Vercel
# - Acesse https://vercel.com
# - Clique em "New Project"
# - Selecione o repositório
# - Deploy automático!

# URL: https://reembolso-system.vercel.app
```

### Opção 2: Render

```bash
# 1. Fazer push para GitHub
git push origin main

# 2. Conectar no Render
# - Acesse https://render.com
# - Novo Web Service
# - Conecte GitHub
# - Configure build command: pnpm install && pnpm run build

# URL: https://reembolso-system.onrender.com
```

### Opção 3: Docker

```bash
# Build
docker build -t reembolso-system .

# Run
docker run -p 3000:3000 reembolso-system

# Com docker-compose
docker-compose up -d
```

Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.

## 📋 Estrutura do Projeto

```
reembolso-system/
├── app/
│   ├── api/                    # Endpoints da API
│   │   ├── import/            # Importação Excel
│   │   ├── reembolsos/        # CRUD de reembolsos
│   │   └── export/            # Exportação CSV/Excel
│   ├── reembolsos/            # Páginas de reembolsos
│   │   ├── novo/              # Novo registro
│   │   └── [id]/              # Detalhes/edição
│   ├── lib/                   # Utilitários
│   ├── layout.tsx             # Layout principal
│   ├── page.tsx               # Página principal
│   └── globals.css            # Estilos globais
├── prisma/
│   ├── schema.prisma          # Schema do banco
│   └── migrations/            # Histórico de migrações
├── public/                    # Arquivos estáticos
├── Dockerfile                 # Containerização
├── docker-compose.yml         # Orquestração Docker
├── vercel.json               # Configuração Vercel
└── package.json              # Dependências
```

## 🗄️ Banco de Dados

### Schema

A tabela `Reembolso` contém os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | String (UUID) | Identificador único |
| atribuido | String | Atribuído a |
| data | DateTime | Data do reembolso |
| anoReferencia | Int | Ano extraído da data |
| processo | String | Número do processo |
| upm | String | Unidade de Processamento |
| beneficiario | String | Beneficiário |
| requerente | String | Requerente |
| solicitado | Float | Valor solicitado |
| cpfTitular | String | CPF com formatação |
| cpfTitularLimpo | String | CPF sem formatação |
| distribuicao | DateTime | Data de distribuição |
| conformidade | DateTime | Data de conformidade |
| peg | String | PEG |
| especialidade | String | Especialidade |
| decisao | String | Decisão |
| resultado | String | Resultado |
| pagamento | DateTime | Data de pagamento |
| ob | String | Observações |
| createdAt | DateTime | Data de criação |
| updatedAt | DateTime | Data de atualização |

### Migrações

```bash
# Criar nova migração
pnpm exec prisma migrate dev --name nome_da_migracao

# Aplicar migrações
pnpm exec prisma migrate deploy

# Reset do banco (desenvolvimento)
pnpm exec prisma migrate reset
```

## 🔌 API Endpoints

### Reembolsos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/reembolsos` | Listar com paginação e filtros |
| POST | `/api/reembolsos` | Criar novo |
| GET | `/api/reembolsos/:id` | Obter detalhes |
| PUT | `/api/reembolsos/:id` | Atualizar |
| DELETE | `/api/reembolsos/:id` | Deletar |

### Importação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/import` | Importar Excel |

### Exportação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/export?formato=csv` | Exportar CSV |
| GET | `/api/export?formato=excel` | Exportar Excel |

## 🛠️ Tecnologias

- **Frontend**: React 19, Next.js 16
- **Styling**: TailwindCSS 4
- **Backend**: Next.js API Routes
- **Database**: SQLite (desenvolvimento) / PostgreSQL (produção)
- **ORM**: Prisma 7
- **Excel**: XLSX, PapaParse
- **Language**: TypeScript

## 📝 Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL="file:./dev.db"

# Ambiente
NODE_ENV="development"
```

## 🚀 Deployment Checklist

- [ ] Código commitado no Git
- [ ] Testes passando
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] Build local funcionando
- [ ] Deploy realizado
- [ ] URL permanente testada
- [ ] Dados importados

## 📊 Performance

- Paginação: 25 registros por página
- Índices no banco: processo, cpfTitularLimpo, anoReferencia
- Cache: Habilitado para assets estáticos
- Compressão: Gzip automático

## 🔒 Segurança

- Validação de entrada em todos os endpoints
- Sanitização de dados
- CORS configurado
- Proteção contra SQL injection (Prisma)
- Variáveis sensíveis em .env

## 📱 Compatibilidade

- ✅ Chrome/Edge (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Mobile (iOS/Android)

## 🐛 Troubleshooting

### Erro: "DATABASE_URL não configurada"
```bash
# Verificar .env
cat .env

# Regenerar Prisma Client
pnpm exec prisma generate
```

### Erro: "Porta 3000 já em uso"
```bash
# Usar porta diferente
pnpm dev -- -p 3001
```

### Erro: "Migrations falharam"
```bash
# Reset do banco (desenvolvimento)
pnpm exec prisma migrate reset
```

## 📞 Suporte

Para problemas ou sugestões, abra uma issue no repositório.

## 📄 Licença

MIT

## 👨‍💻 Autor

Desenvolvido com ❤️ para gerenciamento de reembolsos

---

**Pronto para usar!** 🎉

Acesse o site permanente após fazer o deploy seguindo as instruções acima.
