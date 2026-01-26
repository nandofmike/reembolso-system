# Painel de Reembolso 2025+

Sistema web para gerenciar reembolsos com importação de dados de 2025, cadastro contínuo de 2026 em diante, filtros avançados e exportação de dados.

## Requisitos

- Node.js 18+
- npm ou pnpm

## Instalação

1. Instale as dependências:
```bash
pnpm install
```

2. Configure o banco de dados (já foi feito, mas se precisar regenerar):
```bash
pnpm exec prisma migrate dev
```

3. Gere o cliente Prisma:
```bash
pnpm exec prisma generate
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:
```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## Funcionalidades

- **Importação de Excel**: Importe dados da planilha "Painel de Reembolso 2025.xlsx"
- **Cadastro de Novos Registros**: Adicione registros de 2026 em diante
- **Listagem Paginada**: Visualize registros com paginação de 25 por página
- **Busca Global**: Pesquise por processo, beneficiário, CPF, etc.
- **Filtros Avançados**: Filtre por ano, datas, valores e status
- **Exportação**: Exporte dados em CSV ou Excel
- **Edição e Exclusão**: Edite ou delete registros individuais

## Estrutura do Projeto

```
reembolso-system/
├── app/
│   ├── api/              # Endpoints da API
│   ├── components/       # Componentes React
│   ├── lib/              # Utilitários
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── migrations/       # Histórico de migrações
├── public/               # Arquivos estáticos
├── PaineldeReembolso2025.xlsx  # Planilha para importar
└── package.json
```

## Banco de Dados

O projeto usa SQLite com Prisma ORM. O banco de dados é armazenado em `dev.db`.

### Schema

A tabela `Reembolso` possui os seguintes campos:
- `id`: Identificador único (UUID)
- `atribuido`, `processo`, `upm`, `beneficiario`, `requerente`: Campos de texto
- `data`, `distribuicao`, `conformidade`, `pagamento`: Campos de data
- `anoReferencia`: Ano extraído da data (para filtros)
- `solicitado`: Valor numérico
- `cpfTitular`, `cpfTitularLimpo`: CPF com e sem formatação
- `peg`, `especialidade`, `decisao`, `resultado`, `ob`: Campos de texto
- `createdAt`, `updatedAt`: Timestamps

## Endpoints da API

- `POST /api/import` - Importar Excel
- `GET /api/reembolsos` - Listar reembolsos (com filtros e paginação)
- `POST /api/reembolsos` - Criar novo reembolso
- `GET /api/reembolsos/:id` - Obter detalhes de um reembolso
- `PUT /api/reembolsos/:id` - Atualizar reembolso
- `DELETE /api/reembolsos/:id` - Deletar reembolso
- `GET /api/export` - Exportar dados (CSV ou Excel)

## Próximos Passos

1. Importe os dados de 2025 usando o botão "Importar Excel"
2. Adicione novos registros de 2026 em diante usando "Novo Registro"
3. Use os filtros para consultar dados por ano, data, etc.
4. Exporte os dados quando necessário
