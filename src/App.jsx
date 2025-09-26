import { useState, useMemo, useEffect } from 'react';
import { CriativoCard } from './components/CriativoCard.jsx';
import { Filtros } from './components/Filtros.jsx';
import { Estatisticas } from './components/Estatisticas.jsx';
import { GoogleSheetsService } from './services/googleSheets.js';
import supabaseService from './services/supabaseService.js';
import { criativos as criativosIniciais, nichos as nichosIniciais } from './data/criativos.js';
import { Button } from '@/components/ui/button.jsx';
import { 
  Moon, 
  Sun, 
  Rocket, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Palette,
  Monitor,
  Zap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.jsx';
import './App.css';

function App() {
  const [busca, setBusca] = useState('');
  const [nichoSelecionado, setNichoSelecionado] = useState('Todos');
  const [ordenacao, setOrdenacao] = useState('recentes');
  const [tema, setTema] = useState('supabase'); // supabase, dark, light
  const [criativos, setCriativos] = useState(criativosIniciais);
  const [nichos, setNichos] = useState(nichosIniciais);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [mostrarSalvos, setMostrarSalvos] = useState(false);

  const googleSheetsService = new GoogleSheetsService();

  // Aplicar tema no documento
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    
    if (tema === 'dark') {
      root.classList.add('dark');
    } else if (tema === 'light') {
      root.classList.add('light');
    }
  }, [tema]);

  // Carregar dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Testar conexão com Supabase primeiro
        const connectionTest = await supabaseService.testConnection();
        
        if (connectionTest.success) {
          // Carregar dados do Supabase
          const result = await supabaseService.getCriativos();
          if (result.success && result.data.length > 0) {
            setCriativos(result.data);
            setConnected(true);
          } else {
            // Fallback para dados locais se Supabase estiver vazio
            setCriativos(criativosIniciais);
            setConnected(false);
          }
        } else {
          // Fallback para Google Sheets se Supabase não estiver disponível
          try {
            const sheetsData = await googleSheetsService.fetchCriativos();
            if (sheetsData && sheetsData.length > 0) {
              setCriativos(sheetsData);
              setConnected(true);
            } else {
              setCriativos(criativosIniciais);
              setConnected(false);
            }
          } catch (sheetsError) {
            setCriativos(criativosIniciais);
            setConnected(false);
          }
        }
        
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setCriativos(criativosIniciais);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Atualização manual
  const handleRefresh = async () => {
    try {
      setLoading(true);
      
      // Tentar Supabase primeiro
      const connectionTest = await supabaseService.testConnection();
      
      if (connectionTest.success) {
        const result = await supabaseService.getCriativos();
        if (result.success) {
          setCriativos(result.data);
          setConnected(true);
        }
      } else {
        // Fallback para Google Sheets
        const sheetsData = await googleSheetsService.fetchCriativos();
        if (sheetsData && sheetsData.length > 0) {
          setCriativos(sheetsData);
          setConnected(true);
        }
      }
      
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  // Função para alternar status de salvo
  const handleToggleSalvar = async (criativoId, novoStatus) => {
    // Atualizar estado local imediatamente
    setCriativos(prev => 
      prev.map(criativo => 
        criativo.id === criativoId 
          ? { ...criativo, salvo: novoStatus }
          : criativo
      )
    );

    // Tentar salvar no Supabase
    try {
      const result = await supabaseService.toggleSalvarCriativo(criativoId, novoStatus);
      if (!result.success) {
        console.warn('Erro ao salvar no Supabase:', result.message);
        // Reverter mudança local se falhou
        setCriativos(prev => 
          prev.map(criativo => 
            criativo.id === criativoId 
              ? { ...criativo, salvo: !novoStatus }
              : criativo
          )
        );
      }
    } catch (error) {
      console.error('Erro ao salvar criativo:', error);
    }
  };

  // Função para atualizar nichos
  const handleUpdateNichos = (novosNichos) => {
    setNichos(novosNichos);
    // Resetar filtro se o nicho selecionado não existir mais
    if (!novosNichos.find(n => n.nome === nichoSelecionado)) {
      setNichoSelecionado('Todos');
    }
  };

  // Filtrar e ordenar criativos
  const criativosFiltrados = useMemo(() => {
    let filtrados = criativos.filter(criativo => {
      const matchBusca = busca === '' || 
        criativo.nome.toLowerCase().includes(busca.toLowerCase()) ||
        criativo.nicho.toLowerCase().includes(busca.toLowerCase()) ||
        criativo.mecanismo.toLowerCase().includes(busca.toLowerCase());
      
      const matchNicho = nichoSelecionado === 'Todos' || criativo.nicho === nichoSelecionado;
      
      const matchSalvos = !mostrarSalvos || criativo.salvo;
      
      return matchBusca && matchNicho && matchSalvos;
    });

    // Ordenar
    switch (ordenacao) {
      case 'antigos':
        filtrados.sort((a, b) => {
          const diasA = parseInt(a.diasAtivos.match(/\d+/)?.[0] || 0);
          const diasB = parseInt(b.diasAtivos.match(/\d+/)?.[0] || 0);
          return diasB - diasA;
        });
        break;
      case 'nome':
        filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'performance':
        filtrados.sort((a, b) => {
          const ctrA = parseFloat(a.metricas?.ctr?.replace('%', '') || 0);
          const ctrB = parseFloat(b.metricas?.ctr?.replace('%', '') || 0);
          return ctrB - ctrA;
        });
        break;
      case 'recentes':
      default:
        filtrados.sort((a, b) => {
          const diasA = parseInt(a.diasAtivos.match(/\d+/)?.[0] || 0);
          const diasB = parseInt(b.diasAtivos.match(/\d+/)?.[0] || 0);
          return diasA - diasB;
        });
        break;
    }

    return filtrados;
  }, [criativos, busca, nichoSelecionado, ordenacao, mostrarSalvos]);

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Nunca';
    return lastUpdate.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getThemeIcon = () => {
    switch (tema) {
      case 'dark': return <Moon className="w-4 h-4" />;
      case 'light': return <Sun className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (tema) {
      case 'dark': return 'Dark Mode';
      case 'light': return 'Light Mode';
      default: return 'Supabase';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg supabase-glow supabase-card">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">
                  Space <span className="text-primary">Apollo 11</span>
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Creative Intelligence Dashboard</span>
                  <div className="flex items-center gap-1">
                    {connected ? (
                      <Wifi className="w-3 h-3 text-primary" />
                    ) : (
                      <WifiOff className="w-3 h-3 text-destructive" />
                    )}
                    <span className="text-xs">
                      {connected ? 'Online' : 'Offline'} • {formatLastUpdate()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="gap-2 supabase-hover supabase-transition"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Sync
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 supabase-hover supabase-transition"
                  >
                    {getThemeIcon()}
                    {getThemeLabel()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => setTema('supabase')}
                    className="gap-2"
                  >
                    <Zap className="w-4 h-4 text-primary" />
                    Supabase (Verde)
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTema('dark')}
                    className="gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setTema('light')}
                    className="gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light Mode
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && criativos.length === 0 ? (
          <div className="text-center py-12">
            <div className="apollo-glow inline-block p-4 rounded-full bg-primary/10 mb-4">
              <Rocket className="w-8 h-8 animate-pulse text-primary" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              Iniciando Missão Apollo...
            </h3>
            <p className="text-muted-foreground">
              Conectando com Mission Control
            </p>
          </div>
        ) : (
          <>
            {/* Estatísticas */}
            <Estatisticas criativos={criativos} criativosFiltrados={criativosFiltrados} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar com filtros */}
              <div className="lg:col-span-1">
                <Filtros
                  busca={busca}
                  setBusca={setBusca}
                  nichoSelecionado={nichoSelecionado}
                  setNichoSelecionado={setNichoSelecionado}
                  ordenacao={ordenacao}
                  setOrdenacao={setOrdenacao}
                  nichos={nichos}
                  onUpdateNichos={handleUpdateNichos}
                  mostrarSalvos={mostrarSalvos}
                  setMostrarSalvos={setMostrarSalvos}
                />
              </div>

              {/* Grid de criativos */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-card-foreground">
                    Criativos em Órbita ({criativosFiltrados.length})
                    {mostrarSalvos && (
                      <span className="text-sm text-muted-foreground ml-2">
                        • Apenas salvos
                      </span>
                    )}
                  </h2>
                  
                  {!connected && (
                    <div className="text-sm text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      Modo Offline - Houston, temos um problema
                    </div>
                  )}
                </div>

                {criativosFiltrados.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-30">🚀</div>
                    <h3 className="text-lg font-medium text-card-foreground mb-2">
                      {mostrarSalvos ? 'Nenhum criativo salvo encontrado' : 'Nenhum criativo encontrado'}
                    </h3>
                    <p className="text-muted-foreground">
                      {mostrarSalvos 
                        ? 'Salve alguns criativos para vê-los aqui'
                        : 'Ajuste os controles de navegação'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {criativosFiltrados.map((criativo) => (
                      <CriativoCard 
                        key={criativo.id} 
                        criativo={criativo}
                        onToggleSalvar={handleToggleSalvar}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Space Apollo 11 Dashboard - Intelligence Active
            </p>
            <p className="mt-1">
              {criativos.filter(c => c.salvo).length} criativos salvos • 
              {connected ? ' 🟢 Database Online' : ' 🔴 Database Offline'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
