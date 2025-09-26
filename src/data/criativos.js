// Dados dos criativos com imagens e categorias editáveis
export const nichos = [
  { nome: "Todos", cor: "#6b7280" },
  { nome: "Disfunção Erétil", cor: "#ef4444" },
  { nome: "Diabetes", cor: "#3b82f6" },
  { nome: "Emagrecimento", cor: "#10b981" },
  { nome: "Outros", cor: "#8b5cf6" }
];

// Mapeamento de imagens por ID
const imagemPorId = {
  1: "/src/assets/images/criativo-1.png",
  2: "/src/assets/images/criativo-2.png", 
  3: "/src/assets/images/criativo-3.png",
  4: "/src/assets/images/criativo-4.png",
  5: "/src/assets/images/criativo-1.png",
  6: "/src/assets/images/criativo-4.png",
  7: "/src/assets/images/criativo-5.png",
  8: "/src/assets/images/criativo-3.png",
  9: "/src/assets/images/criativo-4.png",
  10: "/src/assets/images/criativo-6.png",
  11: "/src/assets/images/criativo-7.png",
  12: "/src/assets/images/criativo-6.png",
  13: "/src/assets/images/criativo-7.png",
  14: "/src/assets/images/criativo-6.png",
  15: "/src/assets/images/criativo-7.png"
};

export const criativos = [
  {
    id: 1,
    nome: "Mission Alpha",
    nicho: "Disfunção Erétil",
    mecanismo: "Protocolo espacial de sal desenvolvido pelos astronautas para missões de longa duração. Técnica revolucionária testada em gravidade zero.",
    diasAtivos: "19 horas ativo",
    thumbnail: imagemPorId[1],
    cor: "#ef4444",
    salvo: false,
    categoria: "Disfunção Erétil",
    descricaoCompleta: "Este protocolo foi desenvolvido durante as missões Apollo e testado extensivamente pelos astronautas da NASA. A técnica utiliza uma combinação específica de minerais que foram descobertos durante experimentos em gravidade zero. Os resultados mostraram uma eficácia de 94% em testes controlados realizados no centro espacial Johnson.",
    metricas: {
      ctr: "3.2%",
      conversao: "12.8%",
      cpm: "R$ 4.50"
    }
  },
  {
    id: 2,
    nome: "Apollo Recovery",
    nicho: "Disfunção Erétil", 
    mecanismo: "Técnica de 15 segundos usada na estação espacial internacional para recuperação rápida durante missões críticas.",
    diasAtivos: "19 horas ativo",
    thumbnail: imagemPorId[2],
    cor: "#ef4444",
    salvo: false,
    categoria: "Disfunção Erétil",
    descricaoCompleta: "Desenvolvida pelos engenheiros da SpaceX em colaboração com médicos especializados em medicina espacial. Esta técnica revolucionária foi testada durante 6 meses na Estação Espacial Internacional com resultados surpreendentes.",
    metricas: {
      ctr: "4.1%",
      conversao: "15.2%", 
      cpm: "R$ 3.80"
    }
  },
  {
    id: 3,
    nome: "Houston Protocol",
    nicho: "Disfunção Erétil",
    mecanismo: "Fórmula desenvolvida no centro espacial para resistência extrema durante operações de longa duração no espaço.",
    diasAtivos: "1 dia ativo",
    thumbnail: imagemPorId[3],
    cor: "#ef4444",
    salvo: true,
    categoria: "Disfunção Erétil",
    descricaoCompleta: "O protocolo Houston foi criado especificamente para astronautas que enfrentam missões de longa duração. Utiliza uma combinação de ingredientes naturais que foram testados em condições extremas de microgravidade.",
    metricas: {
      ctr: "2.8%",
      conversao: "9.5%",
      cpm: "R$ 5.20"
    }
  },
  {
    id: 4,
    nome: "Mission Control",
    nicho: "Disfunção Erétil",
    mecanismo: "Sistema de suporte vital usado pelos comandantes da Apollo 11 para manter performance durante missões críticas.",
    diasAtivos: "1 dia ativo",
    thumbnail: imagemPorId[4],
    cor: "#ef4444",
    salvo: false,
    categoria: "Disfunção Erétil",
    descricaoCompleta: "Baseado nos protocolos médicos utilizados pelos comandantes das missões Apollo. Este sistema foi desenvolvido para garantir que os astronautas mantivessem sua performance física e mental durante as missões mais desafiadoras da história.",
    metricas: {
      ctr: "3.7%",
      conversao: "11.3%",
      cpm: "R$ 4.10"
    }
  },
  {
    id: 5,
    nome: "Eagle Landing",
    nicho: "Disfunção Erétil",
    mecanismo: "Protocolo de emergência desenvolvido para situações críticas no espaço, garantindo resposta rápida e eficaz.",
    diasAtivos: "22 dias ativos",
    thumbnail: imagemPorId[5],
    cor: "#ef4444",
    salvo: true,
    categoria: "Disfunção Erétil",
    descricaoCompleta: "Inspirado no protocolo de emergência usado durante o pouso da Eagle na Lua. Esta fórmula foi desenvolvida para situações onde a resposta rápida é crucial, utilizando ingredientes que foram testados em condições extremas.",
    metricas: {
      ctr: "5.2%",
      conversao: "18.7%",
      cpm: "R$ 2.90"
    }
  },
  {
    id: 6,
    nome: "Dr. Space Medicine",
    nicho: "Diabetes",
    mecanismo: "Descoberta revolucionária da NASA para controle glicêmico em gravidade zero, adaptada para uso terrestre.",
    diasAtivos: "12 horas",
    thumbnail: imagemPorId[6],
    cor: "#3b82f6",
    salvo: false,
    categoria: "Diabetes",
    descricaoCompleta: "Esta descoberta foi feita durante experimentos de longa duração na Estação Espacial Internacional. Os cientistas da NASA descobriram que certas condições do espaço podem ser replicadas na Terra para melhorar o controle glicêmico.",
    metricas: {
      ctr: "4.5%",
      conversao: "16.8%",
      cpm: "R$ 3.60"
    }
  },
  {
    id: 7,
    nome: "Lunar Research",
    nicho: "Diabetes",
    mecanismo: "Protocolo de 30 segundos desenvolvido pelos cientistas da missão lunar para estabilização rápida da glicose.",
    diasAtivos: "14 horas",
    thumbnail: imagemPorId[7],
    cor: "#3b82f6",
    salvo: true,
    categoria: "Diabetes",
    descricaoCompleta: "Baseado em pesquisas realizadas durante as missões lunares, este protocolo utiliza uma técnica específica que foi desenvolvida para astronautas que precisavam de estabilização rápida da glicose durante atividades extraveiculares.",
    metricas: {
      ctr: "3.9%",
      conversao: "13.4%",
      cpm: "R$ 4.20"
    }
  },
  {
    id: 8,
    nome: "SpaceX Protocol",
    nicho: "Diabetes",
    mecanismo: "Sistema de estabilização usado pelos astronautas do Elon Musk durante missões para Marte.",
    diasAtivos: "22 horas",
    thumbnail: imagemPorId[8],
    cor: "#3b82f6",
    salvo: false,
    categoria: "Diabetes",
    descricaoCompleta: "Desenvolvido pela equipe médica da SpaceX especificamente para as missões de longa duração para Marte. Este protocolo foi testado durante simulações de 6 meses em isolamento completo.",
    metricas: {
      ctr: "4.8%",
      conversao: "17.2%",
      cpm: "R$ 3.30"
    }
  },
  {
    id: 9,
    nome: "Mars Mission Prep",
    nicho: "Diabetes",
    mecanismo: "Técnica da geladeira espacial que reverte condições em algumas horas, desenvolvida para colonização de Marte.",
    diasAtivos: "10 horas",
    thumbnail: imagemPorId[9],
    cor: "#3b82f6",
    salvo: false,
    categoria: "Diabetes",
    descricaoCompleta: "Esta técnica inovadora foi desenvolvida como parte dos preparativos para a colonização de Marte. Utiliza princípios de conservação criogênica adaptados para uso médico terrestre.",
    metricas: {
      ctr: "3.1%",
      conversao: "10.7%",
      cpm: "R$ 4.80"
    }
  },
  {
    id: 10,
    nome: "Orbital Weight Loss",
    nicho: "Emagrecimento",
    mecanismo: "Fórmula de sal rosa desenvolvida para astronautas em missões longas, simulando os efeitos da microgravidade.",
    diasAtivos: "5 horas",
    thumbnail: imagemPorId[10],
    cor: "#10b981",
    salvo: true,
    categoria: "Emagrecimento",
    descricaoCompleta: "Baseada nos estudos de perda de massa corporal em microgravidade, esta fórmula replica os efeitos benéficos da gravidade zero no metabolismo humano.",
    metricas: {
      ctr: "6.2%",
      conversao: "22.1%",
      cpm: "R$ 2.40"
    }
  },
  {
    id: 11,
    nome: "Zero Gravity Diet",
    nicho: "Emagrecimento",
    mecanismo: "Protocolo de perda de peso usado na Estação Espacial Internacional, adaptado para uso terrestre.",
    diasAtivos: "9 horas",
    thumbnail: imagemPorId[11],
    cor: "#10b981",
    salvo: false,
    categoria: "Emagrecimento",
    descricaoCompleta: "Este protocolo foi desenvolvido após observações detalhadas dos efeitos da microgravidade no metabolismo dos astronautas durante missões de 6 meses na ISS.",
    metricas: {
      ctr: "5.7%",
      conversao: "19.8%",
      cpm: "R$ 2.80"
    }
  },
  {
    id: 12,
    nome: "Cosmic Hydration",
    nicho: "Emagrecimento",
    mecanismo: "Sistema de hidratação térmica desenvolvido para missões espaciais, otimizando o metabolismo celular.",
    diasAtivos: "3 dias",
    thumbnail: imagemPorId[12],
    cor: "#10b981",
    salvo: false,
    categoria: "Emagrecimento",
    descricaoCompleta: "Desenvolvido pelos engenheiros de suporte vital da NASA, este sistema otimiza a hidratação celular utilizando princípios descobertos durante experimentos em gravidade zero.",
    metricas: {
      ctr: "4.3%",
      conversao: "14.6%",
      cpm: "R$ 3.70"
    }
  },
  {
    id: 13,
    nome: "Astronaut Formula",
    nicho: "Emagrecimento",
    mecanismo: "Receita secreta usada pelos comandantes da Apollo para manter forma física durante missões de 14 dias.",
    diasAtivos: "9 horas",
    thumbnail: imagemPorId[13],
    cor: "#10b981",
    salvo: true,
    categoria: "Emagrecimento",
    descricaoCompleta: "Esta fórmula foi desenvolvida especificamente para os comandantes das missões Apollo, que precisavam manter sua forma física ideal durante as missões lunares de 14 dias.",
    metricas: {
      ctr: "5.9%",
      conversao: "21.3%",
      cpm: "R$ 2.60"
    }
  },
  {
    id: 14,
    nome: "Mission Nutrition",
    nicho: "Emagrecimento",
    mecanismo: "Fórmula de 4 ingredientes que simula os efeitos da gravidade zero no metabolismo humano.",
    diasAtivos: "10h",
    thumbnail: imagemPorId[14],
    cor: "#10b981",
    salvo: false,
    categoria: "Emagrecimento",
    descricaoCompleta: "Baseada em 4 ingredientes específicos que foram identificados durante estudos de metabolismo em microgravidade. Esta fórmula replica os efeitos benéficos da ausência de gravidade.",
    metricas: {
      ctr: "4.7%",
      conversao: "16.9%",
      cpm: "R$ 3.20"
    }
  },
  {
    id: 15,
    nome: "Cosmic Berry",
    nicho: "Emagrecimento",
    mecanismo: "Superfruta espacial com 2 ingredientes que ativam o metabolismo orbital, descoberta em experimentos da NASA.",
    diasAtivos: "10h",
    thumbnail: imagemPorId[15],
    cor: "#10b981",
    salvo: false,
    categoria: "Emagrecimento",
    descricaoCompleta: "Esta superfruta foi descoberta durante experimentos de cultivo em microgravidade. Seus 2 ingredientes ativos foram isolados e testados extensivamente pela NASA.",
    metricas: {
      ctr: "6.8%",
      conversao: "24.5%",
      cpm: "R$ 2.10"
    }
  }
];

export default criativos;
