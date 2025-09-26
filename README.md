'''
# 🚀 Space Apollo 11 Dashboard

[![Deploy with Manus.ai](https://img.shields.io/badge/Deploy%20with-Manus.ai-3ecf8e?style=for-the-badge&logo=manus)](https://manus.ai/) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Space Apollo 11** é um dashboard de inteligência de criativos (Ad Spy) completo, construído com um design moderno inspirado no Supabase, banco de dados real para persistência e um agente de IA integrado para análises profissionais.

![Dashboard Preview](/public/images/supabase-spy-preview.png)

## ✨ Funcionalidades Principais

- **🎨 Design Inspirado no Supabase**: Interface moderna com temas claro e escuro, gradientes e tipografia profissional.
- **🗄️ Banco de Dados Real**: Integração com Supabase para persistência de dados na nuvem (criativos, nichos, análises).
- **🤖 Análise com IA**: Agente de ChatGPT integrado que analisa cada criativo, fornece uma nota de performance e sugere melhorias.
- **🖼️ Galeria de Criativos**: Visualização em cards com imagens, vídeos e informações essenciais.
- **✏️ Categorias Editáveis**: Sistema completo para gerenciar nichos/setores com cores personalizadas.
- **❤️ Sistema de Favoritos**: Salve seus criativos preferidos para acesso rápido.
- **🔍 Filtros Avançados**: Busque, filtre por categoria e ordene os criativos por múltiplos critérios.
- **📊 Estatísticas Inteligentes**: Métricas engajantes como "CTR Champion", "Lançamento Recente" e "Conversão Master".
- **🔄 Sincronização Automática**: Suporte para sincronizar dados de um Google Sheets.
- **📱 Totalmente Responsivo**: Funciona perfeitamente em desktop, tablets e smartphones.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Shadcn/UI
- **Banco de Dados**: Supabase (PostgreSQL)
- **Análise de IA**: OpenAI (ChatGPT API)
- **Ícones**: Lucide React
- **Deployment**: Manus.ai

## 🚀 Começando

### Pré-requisitos

- Node.js (v18+)
- pnpm (ou npm/yarn)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/nickgrowthhack/spaceapollo11.git
   cd spaceapollo11
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```

O dashboard estará disponível em `http://localhost:5173`.

## ⚙️ Configuração

O dashboard funciona perfeitamente sem nenhuma configuração, utilizando dados locais. Para habilitar as funcionalidades de nuvem, configure as seguintes variáveis de ambiente em um arquivo `.env` na raiz do projeto.

### Supabase (Banco de Dados)

Para persistência de dados na nuvem, crie um projeto no [Supabase](https://supabase.com).

```.env
VITE_SUPABASE_URL="https://seu-projeto-url.supabase.co"
VITE_SUPABASE_ANON_KEY="sua-chave-anonima"
```

Após configurar, execute o SQL disponível em `src/config/supabase.js` no SQL Editor do seu projeto Supabase para criar as tabelas.

### OpenAI (Análise de IA)

Para análises de criativos com IA real, adicione sua chave da API da [OpenAI](https://openai.com/).

```.env
VITE_OPENAI_API_KEY="sua-chave-da-openai"
```

## 🤝 Contribuindo

Contribuições são super bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um Pull Request.

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Feito com ❤️ pela **Manus.ai**
'''
