# Meu Financeiro

App de gestão financeira pessoal com Next.js 16, Supabase e shadcn/ui (base-ui).

## Stack

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **UI**: shadcn/ui v4 (base-ui)
- **Backend/BaaS**: Supabase (PostgreSQL + Auth + RLS)
- **Gráficos**: Recharts

## Setup

### 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. No SQL Editor, execute o conteúdo de `supabase/schema.sql`
3. Copie a **Project URL** e a **anon/public key** das configurações

### 2. Variáveis de ambiente

Edite o arquivo `.env.local` com suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

### 3. Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

### 4. Deploy na Vercel

1. Suba o projeto no GitHub
2. Importe no vercel.com
3. Adicione as variáveis de ambiente no painel da Vercel
4. Deploy automático!

## Funcionalidades

- Autenticação via Supabase Auth (email/senha)
- Cadastro de receitas e despesas com categoria, valor, data e descrição
- Listagem com filtros por mês, ano, tipo e categoria
- Dashboard mensal com cards de resumo (receitas, despesas, saldo)
- Gráfico de pizza por categoria (Recharts)
- Editar e excluir transações
- Responsivo (mobile-first)
- Row Level Security — cada usuário vê apenas seus dados

## Estrutura

```
src/
├── app/
│   ├── (auth)/          # Login e Cadastro (público)
│   │   ├── login/
│   │   └── register/
│   └── (app)/           # Área autenticada
│       ├── dashboard/
│       └── transactions/
├── components/
│   ├── dashboard/       # Cards, gráfico, transações recentes
│   ├── layout/          # Sidebar e Navbar
│   ├── transactions/    # Formulário, listagem, filtros
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── supabase/        # Client, Server, Middleware, Types
│   ├── categories.ts    # Categorias e cores
│   └── format.ts        # Formatação de moeda e datas
supabase/
└── schema.sql           # Schema + RLS policies
```
