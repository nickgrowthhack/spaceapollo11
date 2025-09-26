// Serviço de Análise de IA para Criativos
class AIAnalysisService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
    this.cache = new Map(); // Cache para evitar análises repetidas
  }

  // Analisar criativo com IA
  async analisarCriativo(criativo) {
    const cacheKey = `${criativo.id}-${criativo.nome}`;
    
    // Verificar cache primeiro
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Se não tiver API key, retornar análise simulada
      if (!this.apiKey) {
        return this.gerarAnaliseSimulada(criativo);
      }

      const prompt = this.criarPromptAnalise(criativo);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Você é um especialista em análise de criativos publicitários com 10 anos de experiência em marketing digital. Analise criativos de forma objetiva e profissional.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const analiseTexto = data.choices[0].message.content;
      
      const analise = this.processarResposta(analiseTexto, criativo);
      
      // Salvar no cache
      this.cache.set(cacheKey, analise);
      
      return analise;
      
    } catch (error) {
      console.error('Erro na análise de IA:', error);
      return this.gerarAnaliseSimulada(criativo);
    }
  }

  // Criar prompt especializado para análise
  criarPromptAnalise(criativo) {
    return `
Analise este criativo publicitário e forneça uma avaliação profissional:

**CRIATIVO:**
- Nome: ${criativo.nome}
- Nicho: ${criativo.nicho}
- Mecanismo: ${criativo.mecanismo}
- Tempo Ativo: ${criativo.diasAtivos}
- CTR Atual: ${criativo.metricas?.ctr || 'N/A'}
- Conversão: ${criativo.metricas?.conversao || 'N/A'}
- CPM: ${criativo.metricas?.cpm || 'N/A'}

**FORNEÇA:**
1. NOTA (0-10): Uma nota de 0 a 10 para o potencial de performance
2. ANÁLISE: Análise em 2-3 frases sobre pontos fortes e fracos
3. POTENCIAL: Estimativa de performance (Alto/Médio/Baixo)
4. SUGESTÕES: 1-2 sugestões de melhoria

**FORMATO DE RESPOSTA:**
NOTA: [0-10]
ANÁLISE: [sua análise]
POTENCIAL: [Alto/Médio/Baixo]
SUGESTÕES: [suas sugestões]
`;
  }

  // Processar resposta da IA
  processarResposta(resposta, criativo) {
    try {
      const linhas = resposta.split('\n').filter(linha => linha.trim());
      
      let nota = 7.5;
      let analise = 'Criativo com potencial interessante para o nicho.';
      let potencial = 'Médio';
      let sugestoes = 'Considere testar variações do copy.';

      linhas.forEach(linha => {
        if (linha.includes('NOTA:')) {
          const notaMatch = linha.match(/(\d+(?:\.\d+)?)/);
          if (notaMatch) nota = parseFloat(notaMatch[1]);
        } else if (linha.includes('ANÁLISE:')) {
          analise = linha.replace('ANÁLISE:', '').trim();
        } else if (linha.includes('POTENCIAL:')) {
          potencial = linha.replace('POTENCIAL:', '').trim();
        } else if (linha.includes('SUGESTÕES:')) {
          sugestoes = linha.replace('SUGESTÕES:', '').trim();
        }
      });

      return {
        nota: Math.min(10, Math.max(0, nota)),
        analise,
        potencial,
        sugestoes,
        timestamp: new Date().toISOString(),
        analisadoPorIA: true
      };
      
    } catch (error) {
      console.error('Erro ao processar resposta:', error);
      return this.gerarAnaliseSimulada(criativo);
    }
  }

  // Gerar análise simulada quando IA não está disponível
  gerarAnaliseSimulada(criativo) {
    const analises = {
      'Disfunção Erétil': {
        notas: [7.5, 8.2, 6.8, 9.1, 7.9],
        analises: [
          'Mecanismo forte com apelo à autoridade médica. Copy direto e persuasivo.',
          'Abordagem científica convincente. Pode se beneficiar de mais urgência.',
          'Promessa clara mas genérica. Considere personalizar mais o público.',
          'Excelente uso de prova social. Mecanismo único e diferenciado.',
          'Boa estrutura narrativa. Poderia explorar mais dor emocional.'
        ],
        potenciais: ['Alto', 'Alto', 'Médio', 'Alto', 'Médio'],
        sugestoes: [
          'Teste variações com depoimentos reais.',
          'Adicione elementos de urgência temporal.',
          'Segmente por faixa etária específica.',
          'Explore mais o aspecto científico.',
          'Inclua garantia de satisfação.'
        ]
      },
      'Diabetes': {
        notas: [8.1, 7.3, 8.7, 6.9, 7.8],
        analises: [
          'Abordagem médica sólida com credibilidade. Mecanismo inovador.',
          'Copy educativo eficaz. Pode melhorar o senso de urgência.',
          'Excelente diferenciação no mercado. Promessa específica e mensurável.',
          'Mecanismo interessante mas precisa de mais prova social.',
          'Boa estrutura de problema-solução. Falta call-to-action mais forte.'
        ],
        potenciais: ['Alto', 'Médio', 'Alto', 'Médio', 'Médio'],
        sugestoes: [
          'Adicione estudos científicos como prova.',
          'Crie senso de urgência com estatísticas.',
          'Teste headlines mais emocionais.',
          'Inclua depoimentos de médicos.',
          'Fortaleça o call-to-action final.'
        ]
      },
      'Emagrecimento': {
        notas: [8.9, 7.6, 8.3, 9.2, 7.1],
        analises: [
          'Mecanismo único e diferenciado. Excelente apelo emocional.',
          'Promessa clara mas competitiva. Precisa de mais diferenciação.',
          'Boa estrutura narrativa. Pode explorar mais transformação visual.',
          'Criativo excepcional com mecanismo inovador. Muito persuasivo.',
          'Copy genérico para o nicho. Necessita personalização.'
        ],
        potenciais: ['Alto', 'Médio', 'Alto', 'Alto', 'Baixo'],
        sugestoes: [
          'Explore mais o aspecto de facilidade.',
          'Adicione antes/depois mais impactantes.',
          'Teste variações com diferentes idades.',
          'Mantenha o mecanismo, teste novos angles.',
          'Reformule completamente o posicionamento.'
        ]
      }
    };

    const nichoData = analises[criativo.nicho] || analises['Emagrecimento'];
    const index = (criativo.id - 1) % nichoData.notas.length;

    return {
      nota: nichoData.notas[index],
      analise: nichoData.analises[index],
      potencial: nichoData.potenciais[index],
      sugestoes: nichoData.sugestoes[index],
      timestamp: new Date().toISOString(),
      analisadoPorIA: false
    };
  }

  // Analisar múltiplos criativos
  async analisarMultiplos(criativos) {
    const resultados = [];
    
    for (const criativo of criativos) {
      try {
        const analise = await this.analisarCriativo(criativo);
        resultados.push({
          id: criativo.id,
          ...analise
        });
        
        // Pequeno delay para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Erro ao analisar criativo ${criativo.id}:`, error);
        resultados.push({
          id: criativo.id,
          ...this.gerarAnaliseSimulada(criativo)
        });
      }
    }
    
    return resultados;
  }

  // Obter cor da nota
  getCorNota(nota) {
    if (nota >= 8.5) return '#22c55e'; // Verde
    if (nota >= 7.0) return '#eab308'; // Amarelo
    if (nota >= 5.5) return '#f97316'; // Laranja
    return '#ef4444'; // Vermelho
  }

  // Obter ícone do potencial
  getIconePotencial(potencial) {
    switch (potencial.toLowerCase()) {
      case 'alto': return '🚀';
      case 'médio': return '⚡';
      case 'baixo': return '⚠️';
      default: return '📊';
    }
  }
}

export default new AIAnalysisService();
