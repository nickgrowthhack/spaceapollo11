import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ModalCriativo } from './ModalCriativo.jsx';
import { AnaliseIA } from './AnaliseIA.jsx';
import { 
  Eye, 
  Heart, 
  Copy, 
  Clock, 
  Satellite, 
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

export function CriativoCard({ criativo, onToggleSalvar }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [salvo, setSalvo] = useState(criativo.salvo || false);

  const handleToggleSalvar = () => {
    const novoStatus = !salvo;
    setSalvo(novoStatus);
    if (onToggleSalvar) {
      onToggleSalvar(criativo.id, novoStatus);
    }
  };

  const handleVerDetalhes = () => {
    setModalAberto(true);
  };

  const handleCopiarTexto = () => {
    navigator.clipboard.writeText(criativo.mecanismo);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  return (
    <>
      <Card className="group supabase-hover supabase-transition bg-card border-border supabase-card overflow-hidden">
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative overflow-hidden h-48 cursor-pointer" onClick={handleVerDetalhes}>
            <img 
              src={criativo.thumbnail} 
              alt={criativo.nome}
              className="w-full h-full object-cover group-hover:scale-105 supabase-transition"
              onError={(e) => {
                // Fallback para imagem padrão se a imagem não carregar
                e.target.src = '/api/placeholder/300/200';
              }}
            />
            
            {/* Overlay com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 supabase-transition"></div>
            
            {/* Badge do nicho */}
            <div className="absolute top-2 right-2">
              <Badge 
                variant="secondary" 
                className="text-xs font-medium supabase-glow border"
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
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse supabase-glow"></div>
            </div>

            {/* Indicador de salvo */}
            {salvo && (
              <div className="absolute bottom-2 right-2">
                <div className="bg-red-500 rounded-full p-1 supabase-glow">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary smooth-transition cursor-pointer" onClick={handleVerDetalhes}>
                {criativo.nome}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <Clock className="w-3 h-3" />
                <span>Missão: {criativo.diasAtivos}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
              {criativo.mecanismo}
            </p>

            {/* Métricas rápidas */}
            {criativo.metricas && (
              <div className="flex justify-between text-xs text-muted-foreground bg-muted/30 rounded-lg p-2">
                <span>CTR: <strong className="text-primary">{criativo.metricas.ctr}</strong></span>
                <span>Conv: <strong className="text-green-500">{criativo.metricas.conversao}</strong></span>
                <span>CPM: <strong className="text-orange-500">{criativo.metricas.cpm}</strong></span>
              </div>
            )}

            {/* Análise de IA */}
            <div className="bg-muted/20 rounded-lg p-3 border border-primary/10">
              <AnaliseIA criativo={criativo} compact={true} />
            </div>

            {/* Botões de ação */}
            <div className="flex gap-2 pt-2">
              <Button 
                size="sm" 
                variant="default" 
                className="flex-1 gap-1 supabase-hover supabase-transition supabase-gradient border-0"
                onClick={handleVerDetalhes}
              >
                <Eye className="w-3 h-3" />
                Ver Detalhes
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className={`gap-1 supabase-hover supabase-transition border-primary/20 ${
                  salvo 
                    ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20' 
                    : 'hover:bg-primary/10'
                }`}
                onClick={handleToggleSalvar}
              >
                {salvo ? (
                  <BookmarkCheck className="w-3 h-3" />
                ) : (
                  <Bookmark className="w-3 h-3" />
                )}
                {salvo ? 'Salvo' : 'Salvar'}
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-1 supabase-hover supabase-transition border-primary/20 hover:bg-primary/10"
                onClick={handleCopiarTexto}
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalhes */}
      <ModalCriativo 
        criativo={criativo}
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </>
  );
}
