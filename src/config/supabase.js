import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configurações das tabelas
export const TABLES = {
  CRIATIVOS: 'criativos',
  NICHOS: 'nichos',
  ANALISES_IA: 'analises_ia',
  USUARIOS: 'usuarios'
};

// Schema das tabelas (para referência)
export const SCHEMAS = {
  criativos: {
    id: 'number',
    nome: 'string',
    nicho: 'string',
    mecanismo: 'string',
    dias_ativos: 'string',
    cor: 'string',
    thumbnail: 'string',
    video_url: 'string',
    salvo: 'boolean',
    metricas: 'json',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  },
  nichos: {
    id: 'number',
    nome: 'string',
    cor: 'string',
    descricao: 'string',
    created_at: 'timestamp'
  },
  analises_ia: {
    id: 'number',
    criativo_id: 'number',
    nota: 'number',
    analise: 'string',
    potencial: 'string',
    sugestoes: 'string',
    analisado_por_ia: 'boolean',
    created_at: 'timestamp'
  }
};

// SQL para criar as tabelas (executar no Supabase SQL Editor)
export const CREATE_TABLES_SQL = `
-- Tabela de nichos
CREATE TABLE IF NOT EXISTS nichos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  cor VARCHAR(7) NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de criativos
CREATE TABLE IF NOT EXISTS criativos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nicho VARCHAR(100) NOT NULL,
  mecanismo TEXT NOT NULL,
  dias_ativos VARCHAR(50) NOT NULL,
  cor VARCHAR(7) NOT NULL,
  thumbnail VARCHAR(500),
  video_url VARCHAR(500),
  salvo BOOLEAN DEFAULT FALSE,
  metricas JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de análises de IA
CREATE TABLE IF NOT EXISTS analises_ia (
  id SERIAL PRIMARY KEY,
  criativo_id INTEGER REFERENCES criativos(id) ON DELETE CASCADE,
  nota DECIMAL(3,1) NOT NULL CHECK (nota >= 0 AND nota <= 10),
  analise TEXT NOT NULL,
  potencial VARCHAR(20) NOT NULL CHECK (potencial IN ('Alto', 'Médio', 'Baixo')),
  sugestoes TEXT NOT NULL,
  analisado_por_ia BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(criativo_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_criativos_nicho ON criativos(nicho);
CREATE INDEX IF NOT EXISTS idx_criativos_salvo ON criativos(salvo);
CREATE INDEX IF NOT EXISTS idx_analises_ia_criativo ON analises_ia(criativo_id);

-- RLS (Row Level Security) - opcional
ALTER TABLE criativos ENABLE ROW LEVEL SECURITY;
ALTER TABLE nichos ENABLE ROW LEVEL SECURITY;
ALTER TABLE analises_ia ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permitir acesso público para este exemplo)
CREATE POLICY "Allow public access" ON criativos FOR ALL USING (true);
CREATE POLICY "Allow public access" ON nichos FOR ALL USING (true);
CREATE POLICY "Allow public access" ON analises_ia FOR ALL USING (true);
`;

// Função para testar conexão
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('criativos')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    
    return { success: true, message: 'Conexão com Supabase estabelecida' };
  } catch (error) {
    return { 
      success: false, 
      message: `Erro na conexão: ${error.message}`,
      details: error
    };
  }
};

// Função para inicializar dados de exemplo
export const initializeData = async () => {
  try {
    // Verificar se já existem dados
    const { count } = await supabase
      .from('criativos')
      .select('*', { count: 'exact', head: true });
    
    if (count > 0) {
      return { success: true, message: 'Dados já existem no banco' };
    }
    
    // Inserir nichos
    const nichosData = [
      { nome: 'Disfunção Erétil', cor: '#ef4444', descricao: 'Produtos para saúde masculina' },
      { nome: 'Diabetes', cor: '#3b82f6', descricao: 'Controle e tratamento de diabetes' },
      { nome: 'Emagrecimento', cor: '#22c55e', descricao: 'Perda de peso e fitness' }
    ];
    
    const { error: nichosError } = await supabase
      .from('nichos')
      .insert(nichosData);
    
    if (nichosError) throw nichosError;
    
    // Inserir criativos de exemplo
    const criativosData = [
      {
        nome: 'The Calorie Whisperer',
        nicho: 'Emagrecimento',
        mecanismo: 'Truque do gelo que acelera a perda de peso',
        dias_ativos: '1D',
        cor: '#22c55e',
        thumbnail: '/images/criativo-1.png',
        salvo: false,
        metricas: { ctr: '2.4%', conversao: '8.1%', cpm: 'R$ 12.50' }
      },
      {
        nome: 'Nicky Zehner',
        nicho: 'Emagrecimento',
        mecanismo: 'Ice water recipe made at home',
        dias_ativos: '1D',
        cor: '#22c55e',
        thumbnail: '/images/criativo-2.png',
        salvo: false,
        metricas: { ctr: '3.1%', conversao: '6.9%', cpm: 'R$ 15.20' }
      },
      {
        nome: 'Brewed Fitness',
        nicho: 'Emagrecimento',
        mecanismo: 'Morning water tweak',
        dias_ativos: '1D',
        cor: '#22c55e',
        thumbnail: '/images/criativo-3.png',
        salvo: true,
        metricas: { ctr: '2.8%', conversao: '7.5%', cpm: 'R$ 11.80' }
      }
    ];
    
    const { error: criativosError } = await supabase
      .from('criativos')
      .insert(criativosData);
    
    if (criativosError) throw criativosError;
    
    return { success: true, message: 'Dados inicializados com sucesso' };
    
  } catch (error) {
    return { 
      success: false, 
      message: `Erro ao inicializar dados: ${error.message}`,
      details: error
    };
  }
};
