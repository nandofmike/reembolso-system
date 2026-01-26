# 🚀 Deploy Permanente em 5 Minutos

## Opção Mais Rápida: Vercel

### Passo 1: Criar conta GitHub (se não tiver)
- Acesse https://github.com
- Crie uma conta gratuita

### Passo 2: Fazer push do código
```bash
cd /tmp/reembolso-system

# Configurar Git
git config --global user.email "seu-email@gmail.com"
git config --global user.name "Seu Nome"

# Criar repositório no GitHub
# Acesse https://github.com/new
# Nome: reembolso-system
# Descrição: Painel de Reembolso 2025+

# Fazer push
git remote add origin https://github.com/seu-usuario/reembolso-system.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy na Vercel
1. Acesse https://vercel.com
2. Clique em "Sign Up" → "Continue with GitHub"
3. Autorize e conecte sua conta
4. Clique em "New Project"
5. Selecione "reembolso-system"
6. Clique em "Deploy"
7. Aguarde 2-3 minutos

### Pronto! ✅
Sua URL permanente: `https://reembolso-system.vercel.app`

---

## Alternativa: Render (Também Gratuito)

### Passo 1: Fazer push para GitHub (mesmo que acima)

### Passo 2: Deploy no Render
1. Acesse https://render.com
2. Clique em "Sign up" → "GitHub"
3. Autorize e conecte
4. Clique em "New +" → "Web Service"
5. Conecte seu repositório "reembolso-system"
6. Configure:
   - **Name**: reembolso-system
   - **Environment**: Node
   - **Build Command**: `pnpm install && pnpm run build`
   - **Start Command**: `pnpm start`
7. Clique em "Create Web Service"
8. Aguarde 5-10 minutos

### Pronto! ✅
Sua URL permanente: `https://reembolso-system.onrender.com`

---

## Após o Deploy

### Importar dados de 2025:
1. Acesse sua URL permanente
2. Clique em "📤 Importar Excel"
3. Selecione `PaineldeReembolso2025.xlsx`
4. Aguarde a conclusão

### Compartilhar:
- Envie a URL para seus colegas
- Todos podem acessar de qualquer lugar
- Sem limite de usuários simultâneos

---

## Custos

- **Vercel**: Grátis (até 100GB/mês)
- **Render**: Grátis (com limitações)
- **Banco de Dados**: Grátis (Neon ou Render)

**Total: R$ 0,00/mês** 🎉

---

## Troubleshooting

### Erro: "Build failed"
- Verifique se o repositório está completo
- Certifique-se de que `package.json` existe

### Erro: "DATABASE_URL não configurada"
- Vercel configura automaticamente
- Se precisar, configure manualmente nas variáveis de ambiente

### Site não carrega
- Aguarde 5 minutos após o deploy
- Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## Próximos Passos

1. ✅ Deploy realizado
2. ✅ URL permanente obtida
3. ⏭️ Importar dados de 2025
4. ⏭️ Adicionar novos registros de 2026+
5. ⏭️ Compartilhar com a equipe

**Tudo pronto!** 🚀
