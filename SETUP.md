# Instruções de Execução

## 1. Instalar Dependências

```bash
pnpm install
```

## 2. Configurar Banco de Dados

O banco de dados SQLite já foi criado durante a inicialização. Se precisar resetar:

```bash
rm dev.db
pnpm exec prisma migrate dev --name init
```

## 3. Iniciar o Servidor

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

## 4. Importar Dados de 2025

1. Abra `http://localhost:3000`
2. Clique no botão "📤 Importar Excel"
3. Selecione o arquivo `PaineldeReembolso2025.xlsx`
4. Aguarde a conclusão da importação

## 5. Usar o Sistema

### Painel Principal
- **Busca Rápida**: Pesquise por processo, beneficiário, CPF, etc.
- **Novo Registro**: Adicione registros de 2026 em diante
- **Filtros Avançados**: Filtre por ano, datas, valores e status
- **Exportar**: Exporte dados em CSV ou Excel

### Detalhes do Registro
- Clique em "Ver" na tabela para abrir os detalhes
- Use "Editar" para modificar o registro
- Use "Deletar" para remover o registro

## Estrutura de Arquivos Criados

```
app/
├── api/
│   ├── import/route.ts          # Endpoint para importação
│   ├── reembolsos/
│   │   ├── route.ts             # GET (listar), POST (criar)
│   │   └── [id]/route.ts        # GET (detalhes), PUT (editar), DELETE
│   └── export/route.ts          # Exportação CSV/Excel
├── components/
│   ├── ReembolsoTable.tsx       # Tabela de listagem
│   └── FiltrosAvancados.tsx     # Painel de filtros
├── lib/
│   └── excel-importer.ts        # Utilitário de importação
├── layout.tsx                    # Layout principal
├── page.tsx                      # Página principal
├── reembolsos/
│   ├── novo/page.tsx            # Formulário de novo registro
│   └── [id]/page.tsx            # Página de detalhes/edição
```

## Banco de Dados

- **Arquivo**: `dev.db` (SQLite)
- **Schema**: Definido em `prisma/schema.prisma`
- **Migrations**: Armazenadas em `prisma/migrations/`

## Troubleshooting

### Erro: "Módulo não encontrado"
Regenere o cliente Prisma:
```bash
pnpm exec prisma generate
```

### Erro: "Banco de dados corrompido"
Resete o banco:
```bash
rm dev.db
pnpm exec prisma migrate dev --name init
```

### Porta 3000 já em uso
Use uma porta diferente:
```bash
pnpm dev -- -p 3001
```

## Próximos Passos

1. Importe os dados de 2025
2. Adicione novos registros de 2026
3. Use os filtros para consultar dados
4. Exporte os dados quando necessário
