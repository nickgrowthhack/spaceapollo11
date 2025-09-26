# Documentação da API

O Space Apollo 11 Dashboard utiliza várias APIs e serviços para funcionar. Esta documentação detalha como cada serviço é integrado e como você pode estendê-los.

## Supabase Service

O `SupabaseService` é a camada principal de acesso aos dados, localizada em `src/services/supabaseService.js`.

### Métodos Principais

#### `getCriativos()`
Busca todos os criativos com suas análises de IA.

```javascript
const result = await supabaseService.getCriativos();
if (result.success) {
  console.log(result.data); // Array de criativos
}
```

#### `createCriativo(criativo)`
Cria um novo criativo no banco de dados.

```javascript
const novoCriativo = {
  nome: "Novo Criativo",
  nicho: "Emagrecimento",
  mecanismo: "Truque secreto",
  diasAtivos: "1D",
  cor: "#22c55e"
};

const result = await supabaseService.createCriativo(novoCriativo);
```

#### `updateCriativo(id, updates)`
Atualiza um criativo existente.

```javascript
const result = await supabaseService.updateCriativo(1, {
  salvo: true,
  metricas: { ctr: "3.5%", conversao: "8.2%" }
});
```

#### `toggleSalvarCriativo(id, salvo)`
Alterna o status de salvo de um criativo.

```javascript
const result = await supabaseService.toggleSalvarCriativo(1, true);
```

### Métodos de Nichos

#### `getNichos()`
Busca todos os nichos/categorias.

#### `createNicho(nicho)`
Cria um novo nicho.

#### `updateNicho(id, updates)`
Atualiza um nicho existente.

### Métodos de Análise de IA

#### `getAnaliseIA(criativoId)`
Busca a análise de IA de um criativo específico.

#### `saveAnaliseIA(criativoId, analise)`
Salva uma nova análise de IA.

```javascript
const analise = {
  nota: 8.5,
  analise: "Criativo com boa performance...",
  potencial: "Alto",
  sugestoes: "Considere testar variações...",
  analisadoPorIA: true
};

const result = await supabaseService.saveAnaliseIA(1, analise);
```

## AI Analysis Service

O `AIAnalysisService` gerencia as análises de criativos com IA, localizado em `src/services/aiAnalysis.js`.

### Métodos Principais

#### `analisarCriativo(criativo)`
Analisa um criativo usando ChatGPT ou análise simulada.

```javascript
import { analisarCriativo } from './services/aiAnalysis.js';

const analise = await analisarCriativo(criativo);
console.log(analise.nota); // 0-10
console.log(analise.analise); // Texto da análise
console.log(analise.potencial); // "Alto", "Médio", "Baixo"
```

### Configuração da OpenAI

Para usar análises reais, configure:

```env
VITE_OPENAI_API_KEY="sua-chave-openai"
```

O serviço automaticamente detecta se a chave está configurada e usa análises reais ou simuladas.

## Google Sheets Service

O `GoogleSheetsService` permite sincronização com planilhas do Google, localizado em `src/services/googleSheets.js`.

### Métodos Principais

#### `fetchCriativos()`
Busca criativos de uma planilha do Google Sheets.

```javascript
import { GoogleSheetsService } from './services/googleSheets.js';

const service = new GoogleSheetsService();
const criativos = await service.fetchCriativos();
```

### Configuração

```env
VITE_GOOGLE_SHEETS_API_KEY="sua-chave-google"
VITE_GOOGLE_SHEETS_ID="id-da-planilha"
```

## Estrutura de Dados

### Criativo

```typescript
interface Criativo {
  id: number;
  nome: string;
  nicho: string;
  mecanismo: string;
  diasAtivos: string;
  cor: string;
  thumbnail?: string;
  videoUrl?: string;
  salvo: boolean;
  metricas?: {
    ctr?: string;
    conversao?: string;
    cpm?: string;
  };
  analiseIA?: AnaliseIA;
  createdAt?: string;
  updatedAt?: string;
}
```

### Análise de IA

```typescript
interface AnaliseIA {
  id: number;
  criativoId: number;
  nota: number; // 0-10
  analise: string;
  potencial: "Alto" | "Médio" | "Baixo";
  sugestoes: string;
  analisadoPorIA: boolean;
  createdAt: string;
}
```

### Nicho

```typescript
interface Nicho {
  id: number;
  nome: string;
  cor: string;
  descricao?: string;
  createdAt: string;
}
```

## Tratamento de Erros

Todos os serviços retornam objetos com a estrutura:

```typescript
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  fallback?: boolean; // Indica se deve usar dados locais
}
```

### Exemplo de Uso

```javascript
const result = await supabaseService.getCriativos();

if (result.success) {
  // Sucesso - usar result.data
  setCriativos(result.data);
} else if (result.fallback) {
  // Erro, mas pode usar fallback
  setCriativos(dadosLocais);
  console.warn(result.message);
} else {
  // Erro crítico
  console.error(result.message);
}
```

## Extensibilidade

### Adicionando Novos Campos

1. **Banco de Dados**: Adicione a coluna na tabela do Supabase
2. **Interface**: Atualize as interfaces TypeScript
3. **Serviço**: Modifique os métodos do `SupabaseService`
4. **UI**: Atualize os componentes para exibir/editar o novo campo

### Integrando Novas APIs

1. Crie um novo serviço em `src/services/`
2. Implemente tratamento de erros consistente
3. Adicione fallbacks quando apropriado
4. Documente os novos métodos neste arquivo

### Exemplo de Novo Serviço

```javascript
class NovoService {
  async metodoExemplo() {
    try {
      // Lógica da API
      const data = await fetch('/api/exemplo');
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro: ${error.message}`,
        fallback: true 
      };
    }
  }
}

export default new NovoService();
```
