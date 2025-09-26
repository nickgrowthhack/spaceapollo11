import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  TrendingUp, 
  Zap, 
  Target, 
  DollarSign,
  Eye,
  Heart,
  Clock,
  Award,
  Flame,
  Star,
  Crown,
  Rocket,
  Trophy,
  Gauge,
  TrendingDown
} from 'lucide-react';

export function Estatisticas({ criativos, criativosFiltrados }) {
  // Calcular métricas engajantes
  const totalCriativos = criativos.length;
  const criativosSalvos = criativos.filter(c => c.salvo).length;
  
  // Top performer (maior CTR)
  const topPerformer = criativos.reduce((max, criativo) => {
    const ctrAtual = parseFloat(criativo.metricas?.ctr?.replace('%', '') || 0);
    const ctrMax = parseFloat(max.metricas?.ctr?.replace('%', '') || 0);
    return ctrAtual > ctrMax ? criativo : max;
  }, criativos[0] || {});

  // Criativo mais recente (menor tempo ativo)
  const maisRecente = criativos.reduce((min, criativo) => {
    const tempoAtual = parseInt(criativo.diasAtivos.match(/\d+/)?.[0] || 999);
    const tempoMin = parseInt(min.diasAtivos.match(/\d+/)?.[0] || 999);
    return tempoAtual < tempoMin ? criativo : min;
  }, criativos[0] || {});

  // Nicho dominante
  const nichoCounts = criativos.reduce((acc, criativo) => {
    acc[criativo.nicho] = (acc[criativo.nicho] || 0) + 1;
    return acc;
  }, {});
  const nichoDominante = Object.entries(nichoCounts).reduce((max, [nicho, count]) => 
    count > max.count ? { nicho, count } : max, { nicho: 'N/A', count: 0 });

  // CTR médio
  const ctrMedio = criativos.reduce((sum, criativo) => {
    return sum + parseFloat(criativo.metricas?.ctr?.replace('%', '') || 0);
  }, 0) / criativos.length;

  // Conversão média
  const conversaoMedia = criativos.reduce((sum, criativo) => {
    return sum + parseFloat(criativo.metricas?.conversao?.replace('%', '') || 0);
  }, 0) / criativos.length;

  // CPM médio
  const cpmMedio = criativos.reduce((sum, criativo) => {
    const cpm = parseFloat(criativo.metricas?.cpm?.replace('R$ ', '').replace(',', '.') || 0);
    return sum + cpm;
  }, 0) / criativos.length;

  // Melhor conversão
  const melhorConversao = criativos.reduce((max, criativo) => {
    const convAtual = parseFloat(criativo.metricas?.conversao?.replace('%', '') || 0);
    const convMax = parseFloat(max.metricas?.conversao?.replace('%', '') || 0);
    return convAtual > convMax ? criativo : max;
  }, criativos[0] || {});

  // Menor CPM (mais eficiente)
  const menorCPM = criativos.reduce((min, criativo) => {
    const cpmAtual = parseFloat(criativo.metricas?.cpm?.replace('R$ ', '').replace(',', '.') || 999);
    const cpmMin = parseFloat(min.metricas?.cpm?.replace('R$ ', '').replace(',', '.') || 999);
    return cpmAtual < cpmMin ? criativo : min;
  }, criativos[0] || {});

  const estatisticas = [
    {
      titulo: "🏆 CTR Champion",
      valor: topPerformer.nome?.substring(0, 12) + "..." || "N/A",
      subtitulo: `${topPerformer.metricas?.ctr || "0%"} de engajamento`,
      icone: Crown,
      cor: "#ffd700",
      gradiente: "from-yellow-500 to-orange-500",
      pulso: true
    },
    {
      titulo: "🚀 Lançamento Recente",
      valor: maisRecente.nome?.substring(0, 12) + "..." || "N/A", 
      subtitulo: `Ativo há ${maisRecente.diasAtivos || "0h"}`,
      icone: Rocket,
      cor: "#00ff88",
      gradiente: "from-green-400 to-emerald-500",
      pulso: false
    },
    {
      titulo: "💎 Conversão Master",
      valor: melhorConversao.nome?.substring(0, 12) + "..." || "N/A",
      subtitulo: `${melhorConversao.metricas?.conversao || "0%"} convertendo`,
      icone: Trophy,
      cor: "#8b5cf6",
      gradiente: "from-purple-400 to-indigo-500",
      pulso: false
    },
    {
      titulo: "💰 Custo Eficiente",
      valor: menorCPM.nome?.substring(0, 12) + "..." || "N/A",
      subtitulo: `${menorCPM.metricas?.cpm || "R$ 0"} por mil`,
      icone: DollarSign,
      cor: "#4ecdc4",
      gradiente: "from-teal-400 to-cyan-500",
      pulso: false
    },
    {
      titulo: "🎯 Setor Dominante",
      valor: nichoDominante.nicho,
      subtitulo: `${nichoDominante.count} criativos ativos`,
      icone: Target,
      cor: "#ff6b6b",
      gradiente: "from-red-400 to-pink-500",
      pulso: false
    },
    {
      titulo: "❤️ Favoritos da Base",
      valor: `${criativosSalvos}/${totalCriativos}`,
      subtitulo: `${((criativosSalvos/totalCriativos)*100).toFixed(0)}% marcados como favoritos`,
      icone: Heart,
      cor: "#f87171",
      gradiente: "from-rose-400 to-red-500",
      pulso: criativosSalvos > 0
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {estatisticas.map((stat, index) => (
        <Card 
          key={index} 
          className="group apollo-hover smooth-transition bg-card border-border mission-badge overflow-hidden relative cursor-pointer"
        >
          <CardContent className="p-4">
            {/* Background gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradiente} opacity-5 group-hover:opacity-15 smooth-transition`}
            />
            
            {/* Glow effect para top performers */}
            {stat.pulso && (
              <div 
                className="absolute inset-0 animate-pulse opacity-20"
                style={{ 
                  background: `radial-gradient(circle at center, ${stat.cor}40 0%, transparent 70%)` 
                }}
              />
            )}
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <stat.icone 
                  className={`w-5 h-5 group-hover:scale-110 smooth-transition ${stat.pulso ? 'animate-pulse' : ''}`}
                  style={{ color: stat.cor }}
                />
                <div 
                  className={`w-2 h-2 rounded-full ${stat.pulso ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: stat.cor }}
                />
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium leading-tight">
                  {stat.titulo}
                </p>
                <p className="text-sm font-bold text-card-foreground group-hover:text-primary smooth-transition leading-tight">
                  {stat.valor}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {stat.subtitulo}
                </p>
              </div>
            </div>

            {/* Bottom accent line */}
            <div 
              className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full smooth-transition"
              style={{ backgroundColor: stat.cor }}
            />

            {/* Corner accent for top performers */}
            {stat.pulso && (
              <div 
                className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent opacity-30"
                style={{ borderBottomColor: stat.cor }}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
