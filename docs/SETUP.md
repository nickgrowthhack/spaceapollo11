# Guia de Instalação e Configuração

Este guia detalha como instalar e configurar o SUPABASE SPY Dashboard em seu ambiente local ou de produção.

## Instalação Local

### Pré-requisitos

- **Node.js** versão 18 ou superior
- **pnpm** (recomendado) ou npm/yarn
- **Git** para clonar o repositório

### Passos de Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/nickgrowthhack/spaceapollo11.git
   cd spaceapollo11
   ```

2. **Instale as dependências**:
   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente** (opcional):
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm run dev
   ```

5. **Acesse o dashboard**:
   Abra seu navegador em `http://localhost:5173`

## Configuração do Supabase

Para habilitar a persistência de dados na nuvem, siga estes passos:

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Escolha sua organização e defina:
   - **Name**: Nome do seu projeto
   - **Database Password**: Senha segura
   - **Region**: Região mais próxima de você

### 2. Obter Credenciais

1. No dashboard do seu projeto, vá para **Settings > API**
2. Copie os valores:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public** key (VITE_SUPABASE_ANON_KEY)

### 3. Configurar Variáveis de Ambiente

Adicione no seu arquivo `.env`:

```env
VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
VITE_SUPABASE_ANON_KEY="sua-chave-anonima"
```

### 4. Criar Tabelas no Banco

1. No dashboard do Supabase, vá para **SQL Editor**
2. Execute o SQL disponível em `src/config/supabase.js`
3. Isso criará as tabelas: `criativos`, `nichos` e `analises_ia`

## Configuração da OpenAI

Para habilitar análises de IA reais:

### 1. Obter Chave da API

1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma conta ou faça login
3. Vá para **API Keys** e crie uma nova chave

### 2. Configurar Variável de Ambiente

Adicione no seu arquivo `.env`:

```env
VITE_OPENAI_API_KEY="sua-chave-openai"
```

## Configuração do Google Sheets (Opcional)

Para sincronizar dados de uma planilha do Google:

### 1. Habilitar Google Sheets API

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Habilite a **Google Sheets API**
4. Crie credenciais (API Key)

### 2. Configurar Variáveis

```env
VITE_GOOGLE_SHEETS_API_KEY="sua-chave-google"
VITE_GOOGLE_SHEETS_ID="id-da-planilha"
```

### 3. Compartilhar Planilha

Compartilhe sua planilha com o email da conta de serviço criada.

## Deploy em Produção

### Usando Manus.ai (Recomendado)

1. Faça o build do projeto:
   ```bash
   pnpm run build
   ```

2. Use a ferramenta de deploy do Manus.ai para publicar a pasta `dist`

### Usando Vercel

1. Instale a CLI do Vercel:
   ```bash
   npm i -g vercel
   ```

2. Faça o deploy:
   ```bash
   vercel --prod
   ```

### Usando Netlify

1. Faça o build:
   ```bash
   pnpm run build
   ```

2. Arraste a pasta `dist` para o Netlify Drop

## Solução de Problemas

### Dashboard não carrega dados

- Verifique se as variáveis de ambiente estão corretas
- Confirme se as tabelas foram criadas no Supabase
- Verifique o console do navegador para erros

### Análise de IA não funciona

- Confirme se a chave da OpenAI está configurada
- Verifique se há créditos disponíveis na sua conta OpenAI
- O sistema usa análises simuladas como fallback

### Erro de CORS

- Verifique as configurações de RLS no Supabase
- Confirme se as políticas de acesso estão corretas

Para mais ajuda, abra uma [issue no GitHub](https://github.com/nickgrowthhack/spaceapollo11/issues).
