import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { EditarCategorias } from './EditarCategorias.jsx';
import { Search, Filter, SortAsc, Radar, Bookmark } from 'lucide-react';

export function Filtros({ 
  busca, 
  setBusca, 
  nichoSelecionado, 
  setNichoSelecionado, 
  ordenacao, 
  setOrdenacao,
  nichos,
  onUpdateNichos,
  mostrarSalvos,
  setMostrarSalvos
}) {
  const opcoesOrdenacao = [
    { valor: 'recentes', label: 'Mais Recentes' },
    { valor: 'antigos', label: 'Mais Antigos' },
    { valor: 'nome', label: 'Nome A-Z' },
    { valor: 'performance', label: 'Performance' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4 mission-badge apollo-glow">
      {/* Header do painel */}
      <div className="flex items-center justify-between text-sm font-medium text-card-foreground border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-primary animate-pulse" />
          Mission Control
        </div>
        <EditarCategorias 
          nichos={nichos} 
          onUpdateNichos={onUpdateNichos}
        />
      </div>

      {/* Barra de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar missões..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-10 apollo-hover smooth-transition border-primary/20 focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Filtro de salvos */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <Bookmark className="w-4 h-4 text-primary" />
          Filtros Especiais
        </div>
        <Button
          variant={mostrarSalvos ? "default" : "outline"}
          size="sm"
          onClick={() => setMostrarSalvos(!mostrarSalvos)}
          className={`w-full text-xs apollo-hover smooth-transition ${
            mostrarSalvos 
              ? 'space-gradient border-0 apollo-glow' 
              : 'border-primary/20 hover:bg-primary/10'
          }`}
        >
          <Bookmark className="w-3 h-3 mr-2" />
          {mostrarSalvos ? 'Mostrando Salvos' : 'Mostrar Apenas Salvos'}
        </Button>
      </div>

      {/* Filtros por nicho */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <Filter className="w-4 h-4 text-primary" />
          Setores de Operação
        </div>
        <div className="flex flex-wrap gap-2">
          {nichos.map((nicho) => (
            <Badge
              key={nicho.nome}
              variant={nichoSelecionado === nicho.nome ? "default" : "outline"}
              className="cursor-pointer apollo-hover smooth-transition mission-badge"
              style={nichoSelecionado === nicho.nome ? { 
                backgroundColor: nicho.cor, 
                borderColor: nicho.cor,
                boxShadow: `0 0 10px ${nicho.cor}40`
              } : {
                borderColor: `${nicho.cor}40`,
                color: nicho.cor
              }}
              onClick={() => setNichoSelecionado(
                nichoSelecionado === nicho.nome ? "Todos" : nicho.nome
              )}
            >
              {nicho.nome}
            </Badge>
          ))}
        </div>
      </div>

      {/* Ordenação */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <SortAsc className="w-4 h-4 text-primary" />
          Sequência de Lançamento
        </div>
        <div className="flex flex-wrap gap-2">
          {opcoesOrdenacao.map((opcao) => (
            <Button
              key={opcao.valor}
              variant={ordenacao === opcao.valor ? "default" : "outline"}
              size="sm"
              onClick={() => setOrdenacao(opcao.valor)}
              className={`text-xs apollo-hover smooth-transition ${
                ordenacao === opcao.valor 
                  ? 'space-gradient border-0 apollo-glow' 
                  : 'border-primary/20 hover:bg-primary/10'
              }`}
            >
              {opcao.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Status da missão */}
      <div className="pt-2 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Sistema Operacional
          </div>
        </div>
      </div>
    </div>
  );
}
