import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  Sparkles,
  Target,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import aiAnalysisService from '../services/aiAnalysis.js';

export function AnaliseIA({ criativo, compact = false }) {
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (criativo) {
      analisarCriativo();
    }
  }, [criativo.id]);

  const analisarCriativo = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await aiAnalysisService.analisarCriativo(criativo);
      setAnalise(resultado);
    } catch (err) {
      setError('Erro ao analisar criativo');
      console.error('Erro na análise:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCorNota = (nota) => {
    if (nota >= 8.5) return 'text-green-500';
    if (nota >= 7.0) return 'text-yellow-500';
    if (nota >= 5.5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getCorPotencial = (potencial) => {
    switch (potencial?.toLowerCase()) {
      case 'alto': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'médio': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'baixo': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getIconePotencial = (potencial) => {
    switch (potencial?.toLowerCase()) {
      case 'alto': return '🚀';
      case 'médio': return '⚡';
      case 'baixo': return '⚠️';
      default: return '📊';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-card rounded-lg border border-border">
        <Loader2 className="w-4 h-4 animate-spin text-primary mr-2" />
        <span className="text-sm text-muted-foreground">
          IA analisando criativo...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-destructive">{error}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={analisarCriativo}
          className="text-destructive hover:bg-destructive/10"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!analise) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={analisarCriativo}
        className="w-full gap-2 apollo-hover smooth-transition border-primary/20 hover:bg-primary/10"
      >
        <Brain className="w-4 h-4" />
        Analisar com IA
      </Button>
    );
  }

  // Versão compacta para cards
  if (compact) {
    return (
      <div className="space-y-2">
        {/* Nota e Potencial */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-card-foreground">
              Análise IA
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${getCorPotencial(analise.potencial)}`}
            >
              {getIconePotencial(analise.potencial)} {analise.potencial}
            </Badge>
            <span className={`text-lg font-bold ${getCorNota(analise.nota)}`}>
              {analise.nota.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Barra de progresso da nota */}
        <div className="space-y-1">
          <Progress 
            value={analise.nota * 10} 
            className="h-2"
            style={{
              '--progress-background': aiAnalysisService.getCorNota(analise.nota)
            }}
          />
          <p className="text-xs text-muted-foreground line-clamp-2">
            {analise.analise}
          </p>
        </div>
      </div>
    );
  }

  // Versão completa para modal
  return (
    <Card className="apollo-glow border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span>Análise de IA</span>
            <div className="flex items-center gap-2 mt-1">
              {analise.analisadoPorIA ? (
                <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  ChatGPT
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Simulada
                </Badge>
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Nota de Performance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-card-foreground">
              Nota de Performance
            </span>
            <span className={`text-2xl font-bold ${getCorNota(analise.nota)}`}>
              {analise.nota.toFixed(1)}/10
            </span>
          </div>
          <Progress 
            value={analise.nota * 10} 
            className="h-3"
          />
        </div>

        {/* Potencial */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-card-foreground">
            Potencial de Performance
          </span>
          <Badge 
            variant="outline" 
            className={`${getCorPotencial(analise.potencial)}`}
          >
            {getIconePotencial(analise.potencial)} {analise.potencial}
          </Badge>
        </div>

        {/* Análise */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-card-foreground">
              Análise Detalhada
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
            {analise.analise}
          </p>
        </div>

        {/* Sugestões */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-card-foreground">
              Sugestões de Melhoria
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed bg-yellow-500/5 p-3 rounded-lg border border-yellow-500/20">
            {analise.sugestoes}
          </p>
        </div>

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          Analisado em {new Date(analise.timestamp).toLocaleString('pt-BR')}
        </div>
      </CardContent>
    </Card>
  );
}
