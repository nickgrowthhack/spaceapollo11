// Serviço simplificado para Google Sheets (frontend-only)
export class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = '1mpo44BpnGFR2hrcwi8uOKd3H_qtQqN3LS4zRtCnyDR0';
    this.range = 'SPY FB!A:D';
  }

  // Método para buscar dados da planilha via API pública
  async fetchCriativos() {
    try {
      // Tentar buscar da planilha pública primeiro
      const publicUrl = `https://docs.google.com/spreadsheets/d/${this.spreadsheetId}/gviz/tq?tqx=out:json&range=${this.range}`;
      
      const response = await fetch(publicUrl);
      const text = await response.text();
      
      // Processar resposta do Google Sheets
      const jsonData = this.parseGoogleSheetsResponse(text);
      
      if (jsonData && jsonData.length > 0) {
        console.log('🚀 APOLLO 11: Dados carregados da planilha');
        return this.parseSheetData(jsonData);
      }
    } catch (error) {
      console.log('🚨 APOLLO 11: Falha na comunicação, usando dados de backup');
    }
    
    // Fallback para dados locais
    return this.getMockData();
  }

  // Processar resposta do Google Sheets
  parseGoogleSheetsResponse(text) {
    try {
      // Remover callback do JSONP
      const jsonText = text.substring(47).slice(0, -2);
      const data = JSON.parse(jsonText);
      
      if (data.table && data.table.rows) {
        return data.table.rows.map(row => 
          row.c ? row.c.map(cell => cell ? cell.v : '') : []
        );
      }
    } catch (error) {
      console.error('Erro ao processar resposta:', error);
    }
    return null;
  }

  // Converter dados da planilha para formato do dashboard
  parseSheetData(rows) {
    // Pular o cabeçalho se existir
    const dataRows = rows.slice(1);
    
    return dataRows.map((row, index) => {
      const [nome, nicho, mecanismo, diasAtivos] = row;
      
      return {
        id: index + 1,
        nome: nome || 'Sem nome',
        nicho: nicho || 'Outros',
        mecanismo: mecanismo || 'Sem descrição',
        diasAtivos: diasAtivos || '0 horas',
        thumbnail: '/api/placeholder/300/200',
        cor: this.getNichoCor(nicho)
      };
    });
  }

  // Definir cores para cada nicho
  getNichoCor(nicho) {
    const cores = {
      'Disfunção Erétil': '#ef4444',
      'Diabetes': '#3b82f6',
      'Emagrecimento': '#10b981',
      'default': '#6b7280'
    };
    
    return cores[nicho] || cores.default;
  }

  // Dados de exemplo APOLLO 11
  getMockData() {
    return [
      {
        id: 1,
        nome: "Mission Alpha",
        nicho: "Disfunção Erétil",
        mecanismo: "Protocolo espacial de sal desenvolvido pelos astronautas para missões de longa duração.",
        diasAtivos: "19 horas ativo",
        thumbnail: "/api/placeholder/300/200",
        cor: "#ef4444"
      },
      {
        id: 2,
        nome: "Apollo Recovery",
        nicho: "Disfunção Erétil",
        mecanismo: "Técnica de 15 segundos usada na estação espacial internacional.",
        diasAtivos: "19 horas ativo",
        thumbnail: "/api/placeholder/300/200",
        cor: "#ef4444"
      },
      {
        id: 3,
        nome: "Houston Protocol",
        nicho: "Disfunção Erétil",
        mecanismo: "Fórmula desenvolvida no centro espacial para resistência extrema.",
        diasAtivos: "1 dia ativo",
        thumbnail: "/api/placeholder/300/200",
        cor: "#ef4444"
      },
      {
        id: 4,
        nome: "Mission Control",
        nicho: "Disfunção Erétil",
        mecanismo: "Sistema de suporte vital usado pelos comandantes da Apollo 11.",
        diasAtivos: "1 dia ativo",
        thumbnail: "/api/placeholder/300/200",
        cor: "#ef4444"
      },
      {
        id: 5,
        nome: "Eagle Landing",
        nicho: "Disfunção Erétil",
        mecanismo: "Protocolo de emergência desenvolvido para situações críticas no espaço.",
        diasAtivos: "22 dias ativos",
        thumbnail: "/api/placeholder/300/200",
        cor: "#ef4444"
      },
      {
        id: 6,
        nome: "Dr. Space Medicine",
        nicho: "Diabetes",
        mecanismo: "Descoberta revolucionária da NASA para controle glicêmico em gravidade zero.",
        diasAtivos: "12 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#3b82f6"
      },
      {
        id: 7,
        nome: "Lunar Research",
        nicho: "Diabetes",
        mecanismo: "Protocolo de 30 segundos desenvolvido pelos cientistas da missão lunar.",
        diasAtivos: "14 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#3b82f6"
      },
      {
        id: 8,
        nome: "SpaceX Protocol",
        nicho: "Diabetes",
        mecanismo: "Sistema de estabilização usado pelos astronautas do Elon Musk no espaço.",
        diasAtivos: "22 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#3b82f6"
      },
      {
        id: 9,
        nome: "Mars Mission Prep",
        nicho: "Diabetes",
        mecanismo: "Técnica da geladeira espacial que reverte condições em algumas horas.",
        diasAtivos: "10 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#3b82f6"
      },
      {
        id: 10,
        nome: "Orbital Weight Loss",
        nicho: "Emagrecimento",
        mecanismo: "Fórmula de sal rosa desenvolvida para astronautas em missões longas.",
        diasAtivos: "5 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#10b981"
      },
      {
        id: 11,
        nome: "Zero Gravity Diet",
        nicho: "Emagrecimento",
        mecanismo: "Protocolo de perda de peso usado na Estação Espacial Internacional.",
        diasAtivos: "9 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#10b981"
      },
      {
        id: 12,
        nome: "Cosmic Hydration",
        nicho: "Emagrecimento",
        mecanismo: "Sistema de hidratação térmica desenvolvido para missões espaciais.",
        diasAtivos: "3 dias",
        thumbnail: "/api/placeholder/300/200",
        cor: "#10b981"
      },
      {
        id: 13,
        nome: "Astronaut Formula",
        nicho: "Emagrecimento",
        mecanismo: "Receita secreta usada pelos comandantes da Apollo para manter forma física.",
        diasAtivos: "9 horas",
        thumbnail: "/api/placeholder/300/200",
        cor: "#10b981"
      },
      {
        id: 14,
        nome: "Mission Nutrition",
        nicho: "Emagrecimento",
        mecanismo: "Fórmula de 4 ingredientes que simula os efeitos da gravidade zero.",
        diasAtivos: "10h",
        thumbnail: "/api/placeholder/300/200",
        cor: "#10b981"
      },
      {
        id: 15,
        nome: "Cosmic Berry",
        nicho: "Emagrecimento",
        mecanismo: "Superfruta espacial com 2 ingredientes que ativam o metabolismo orbital.",
        diasAtivos: "10h",
        thumbnail: "/api/placeholder/300/200",
        cor: "#10b981"
      }
    ];
  }

  // Método para atualizar dados automaticamente
  async setupAutoRefresh(callback, intervalMinutes = 5) {
    // Buscar dados iniciais
    const initialData = await this.fetchCriativos();
    callback(initialData);

    // Configurar atualização automática
    setInterval(async () => {
      try {
        const updatedData = await this.fetchCriativos();
        callback(updatedData);
        console.log('🚀 APOLLO 11: Mission Control sincronizado');
      } catch (error) {
        console.error('🚨 APOLLO 11: Falha na comunicação:', error);
      }
    }, intervalMinutes * 60 * 1000);
  }
}

export default GoogleSheetsService;
