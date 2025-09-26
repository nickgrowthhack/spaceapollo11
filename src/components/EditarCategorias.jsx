import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog.jsx';
import { Plus, X, Edit3, Palette, Settings } from 'lucide-react';

export function EditarCategorias({ nichos, onUpdateNichos }) {
  const [nichosEditaveis, setNichosEditaveis] = useState(nichos);
  const [novoNicho, setNovoNicho] = useState({ nome: '', cor: '#6b7280' });
  const [editandoId, setEditandoId] = useState(null);

  const cores = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#6b7280', '#374151', '#1f2937'
  ];

  const adicionarNicho = () => {
    if (novoNicho.nome.trim()) {
      const novoId = Math.max(...nichosEditaveis.map(n => n.id || 0)) + 1;
      const nichoAtualizado = {
        id: novoId,
        nome: novoNicho.nome.trim(),
        cor: novoNicho.cor
      };
      
      const novosNichos = [...nichosEditaveis, nichoAtualizado];
      setNichosEditaveis(novosNichos);
      setNovoNicho({ nome: '', cor: '#6b7280' });
    }
  };

  const removerNicho = (id) => {
    const novosNichos = nichosEditaveis.filter(n => n.id !== id);
    setNichosEditaveis(novosNichos);
  };

  const editarNicho = (id, novoNome, novaCor) => {
    const novosNichos = nichosEditaveis.map(n => 
      n.id === id ? { ...n, nome: novoNome, cor: novaCor } : n
    );
    setNichosEditaveis(novosNichos);
    setEditandoId(null);
  };

  const salvarAlteracoes = () => {
    onUpdateNichos(nichosEditaveis);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 apollo-hover smooth-transition border-primary/20 hover:bg-primary/10"
        >
          <Settings className="w-4 h-4" />
          Gerenciar Setores
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-card-foreground">
            <Palette className="w-5 h-5 text-primary" />
            Gerenciar Setores de Operação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lista de nichos existentes */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-card-foreground">Setores Ativos</h3>
            <div className="grid gap-3">
              {nichosEditaveis.filter(n => n.nome !== 'Todos').map((nicho) => (
                <Card key={nicho.id || nicho.nome} className="p-3">
                  <div className="flex items-center justify-between">
                    {editandoId === (nicho.id || nicho.nome) ? (
                      <EditarNichoForm 
                        nicho={nicho}
                        cores={cores}
                        onSave={editarNicho}
                        onCancel={() => setEditandoId(null)}
                      />
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: nicho.cor }}
                          />
                          <span className="font-medium text-card-foreground">
                            {nicho.nome}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditandoId(nicho.id || nicho.nome)}
                            className="h-8 w-8 p-0 hover:bg-primary/10"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          {nicho.nome !== 'Outros' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removerNicho(nicho.id || nicho.nome)}
                              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Adicionar novo nicho */}
          <Card className="p-4 border-dashed border-primary/30">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-card-foreground flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" />
                Adicionar Novo Setor
              </h3>
              
              <div className="flex gap-3">
                <Input
                  placeholder="Nome do setor..."
                  value={novoNicho.nome}
                  onChange={(e) => setNovoNicho({ ...novoNicho, nome: e.target.value })}
                  className="flex-1"
                />
                
                <div className="flex gap-2">
                  {cores.slice(0, 8).map((cor) => (
                    <button
                      key={cor}
                      className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${
                        novoNicho.cor === cor ? 'border-white shadow-lg' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: cor }}
                      onClick={() => setNovoNicho({ ...novoNicho, cor })}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={adicionarNicho}
                disabled={!novoNicho.nome.trim()}
                className="w-full space-gradient border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Setor
              </Button>
            </div>
          </Card>

          {/* Botão salvar */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={salvarAlteracoes}
              className="space-gradient border-0 apollo-glow"
            >
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditarNichoForm({ nicho, cores, onSave, onCancel }) {
  const [nome, setNome] = useState(nicho.nome);
  const [cor, setCor] = useState(nicho.cor);

  const handleSave = () => {
    if (nome.trim()) {
      onSave(nicho.id || nicho.nome, nome.trim(), cor);
    }
  };

  return (
    <div className="flex-1 space-y-3">
      <div className="flex gap-3">
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="flex-1"
        />
        
        <div className="flex gap-1">
          {cores.slice(0, 6).map((corOption) => (
            <button
              key={corOption}
              className={`w-6 h-6 rounded-full border hover:scale-110 transition-transform ${
                cor === corOption ? 'border-white shadow-lg' : 'border-gray-300'
              }`}
              style={{ backgroundColor: corOption }}
              onClick={() => setCor(corOption)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave} className="space-gradient border-0">
          Salvar
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
