import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { AnaliseIA } from './AnaliseIA.jsx';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog.jsx';
import { 
  Eye, 
  Heart, 
  Copy, 
  Clock, 
  Satellite, 
  TrendingUp, 
  Target, 
  DollarSign,
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';

export function ModalCriativo({ criativo, isOpen, onClose }) {
  if (!criativo) return null;

  const handleCopiarTexto = () => {
    navigator.clipboard.writeText(criativo.mecanismo);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  const handleBaixarImagem = () => {
    // Simular download da imagem
    const link = document.createElement('a');
    link.href = criativo.thumbnail;
    link.download = `${criativo.nome.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  const handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: criativo.nome,
        text: criativo.mecanismo,
        url: window.location.href
      });
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-card-foreground">
            <Satellite className="w-5 h-5 text-primary animate-pulse" />
            Detalhes da Missão
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna da Imagem */}
          <div className="space-y-4">
            <Card className="overflow-hidden apollo-glow">
              <div className="relative">
                <img 
                  src={criativo.thumbnail} 
                  alt={criativo.nome}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant="secondary" 
                    className="apollo-glow border"
                    style={{ 
                      backgroundColor: `${criativo.cor}15`, 
                      color: criativo.cor, 
                      borderColor: `${criativo.cor}40` 
                    }}
                  >
                    {criativo.nicho}
                  </Badge>
                </div>
                
                {/* Status Indicator */}
                <div className="absolute top-2 left-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse apollo-glow"></div>
                </div>
              </div>
            </Card>

            {/* Métricas de Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Métricas de Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {criativo.metricas?.ctr || "3.2%"}
                    </div>
                    <div className="text-xs text-muted-foreground">CTR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {criativo.metricas?.conversao || "12.8%"}
                    </div>
                    <div className="text-xs text-muted-foreground">Conversão</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">
                      {criativo.metricas?.cpm || "R$ 4.50"}
                    </div>
                    <div className="text-xs text-muted-foreground">CPM</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={handleBaixarImagem}
                className="gap-2 apollo-hover smooth-transition"
              >
                <Download className="w-4 h-4" />
                Baixar
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCompartilhar}
                className="gap-2 apollo-hover smooth-transition"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar
              </Button>
            </div>
          </div>

          {/* Coluna das Informações */}
          <div className="space-y-4">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-card-foreground">
                  {criativo.nome}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Missão: {criativo.diasAtivos}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-card-foreground mb-2">
                    Mecanismo Principal
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {criativo.mecanismo}
                  </p>
                </div>

                {criativo.descricaoCompleta && (
                  <div>
                    <h4 className="font-medium text-card-foreground mb-2">
                      Descrição Completa
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {criativo.descricaoCompleta}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Análise de IA */}
            <AnaliseIA criativo={criativo} compact={false} />

            {/* Status da Missão */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Status da Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Categoria:</span>
                    <Badge variant="outline" style={{ color: criativo.cor, borderColor: criativo.cor }}>
                      {criativo.categoria || criativo.nicho}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm text-primary font-medium">Operacional</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Salvo:</span>
                    <div className="flex items-center gap-2">
                      {criativo.salvo ? (
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      ) : (
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {criativo.salvo ? 'Sim' : 'Não'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button 
                className="w-full gap-2 space-gradient border-0 apollo-glow"
                size="lg"
              >
                <Eye className="w-4 h-4" />
                Iniciar Missão
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleCopiarTexto}
                  className="gap-2 apollo-hover smooth-transition border-primary/20 hover:bg-primary/10"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Texto
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2 apollo-hover smooth-transition border-primary/20 hover:bg-primary/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver Original
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer com informações adicionais */}
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            <p className="flex items-center justify-center gap-2">
              <Satellite className="w-3 h-3 text-primary" />
              APOLLO 11 SPY Dashboard - Missão ID: {criativo.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
