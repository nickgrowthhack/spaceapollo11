import { supabase, TABLES } from '../config/supabase.js';

class SupabaseService {
  constructor() {
    this.isConnected = false;
    this.lastError = null;
  }

  // Testar conexão
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('count')
        .limit(1);
      
      if (error) throw error;
      
      this.isConnected = true;
      this.lastError = null;
      return { success: true, message: 'Conectado ao Supabase' };
    } catch (error) {
      this.isConnected = false;
      this.lastError = error;
      return { 
        success: false, 
        message: `Erro de conexão: ${error.message}`,
        fallback: true
      };
    }
  }

  // CRIATIVOS
  async getCriativos() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CRIATIVOS)
        .select(`
          *,
          analises_ia (
            nota,
            analise,
            potencial,
            sugestoes,
            analisado_por_ia
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transformar dados para formato esperado pelo frontend
      const criativos = data.map(item => ({
        id: item.id,
        nome: item.nome,
        nicho: item.nicho,
        mecanismo: item.mecanismo,
        diasAtivos: item.dias_ativos,
        cor: item.cor,
        thumbnail: item.thumbnail || '/api/placeholder/300/200',
        videoUrl: item.video_url,
        salvo: item.salvo,
        metricas: item.metricas || {},
        analiseIA: item.analises_ia?.[0] || null,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
      
      return { success: true, data: criativos };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao buscar criativos: ${error.message}`,
        fallback: true
      };
    }
  }

  async createCriativo(criativo) {
    try {
      const { data, error } = await supabase
        .from(TABLES.CRIATIVOS)
        .insert([{
          nome: criativo.nome,
          nicho: criativo.nicho,
          mecanismo: criativo.mecanismo,
          dias_ativos: criativo.diasAtivos,
          cor: criativo.cor,
          thumbnail: criativo.thumbnail,
          video_url: criativo.videoUrl,
          salvo: criativo.salvo || false,
          metricas: criativo.metricas || {}
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao criar criativo: ${error.message}`
      };
    }
  }

  async updateCriativo(id, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.CRIATIVOS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao atualizar criativo: ${error.message}`
      };
    }
  }

  async deleteCriativo(id) {
    try {
      const { error } = await supabase
        .from(TABLES.CRIATIVOS)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao deletar criativo: ${error.message}`
      };
    }
  }

  async toggleSalvarCriativo(id, salvo) {
    return this.updateCriativo(id, { salvo });
  }

  // NICHOS
  async getNichos() {
    try {
      const { data, error } = await supabase
        .from(TABLES.NICHOS)
        .select('*')
        .order('nome');
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao buscar nichos: ${error.message}`,
        fallback: true
      };
    }
  }

  async createNicho(nicho) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NICHOS)
        .insert([nicho])
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao criar nicho: ${error.message}`
      };
    }
  }

  async updateNicho(id, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NICHOS)
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao atualizar nicho: ${error.message}`
      };
    }
  }

  async deleteNicho(id) {
    try {
      const { error } = await supabase
        .from(TABLES.NICHOS)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao deletar nicho: ${error.message}`
      };
    }
  }

  // ANÁLISES DE IA
  async getAnaliseIA(criativoId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ANALISES_IA)
        .select('*')
        .eq('criativo_id', criativoId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao buscar análise: ${error.message}`
      };
    }
  }

  async saveAnaliseIA(criativoId, analise) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ANALISES_IA)
        .upsert([{
          criativo_id: criativoId,
          nota: analise.nota,
          analise: analise.analise,
          potencial: analise.potencial,
          sugestoes: analise.sugestoes,
          analisado_por_ia: analise.analisadoPorIA || false
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao salvar análise: ${error.message}`
      };
    }
  }

  // ESTATÍSTICAS
  async getEstatisticas() {
    try {
      // Total de criativos
      const { count: totalCriativos } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('*', { count: 'exact', head: true });

      // Criativos salvos
      const { count: criativosSalvos } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('*', { count: 'exact', head: true })
        .eq('salvo', true);

      // Nicho mais popular
      const { data: nichosCount } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('nicho')
        .not('nicho', 'is', null);

      const nichoMaisPopular = nichosCount?.reduce((acc, curr) => {
        acc[curr.nicho] = (acc[curr.nicho] || 0) + 1;
        return acc;
      }, {});

      const nichoTop = Object.entries(nichoMaisPopular || {})
        .sort(([,a], [,b]) => b - a)[0];

      // Criativo mais recente
      const { data: criativoRecente } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('nome, dias_ativos')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // Melhor CTR
      const { data: criativos } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('nome, metricas')
        .not('metricas', 'is', null);

      let melhorCTR = { nome: 'N/A', ctr: '0%' };
      if (criativos?.length) {
        const criativoComMelhorCTR = criativos
          .filter(c => c.metricas?.ctr)
          .sort((a, b) => {
            const ctrA = parseFloat(a.metricas.ctr.replace('%', ''));
            const ctrB = parseFloat(b.metricas.ctr.replace('%', ''));
            return ctrB - ctrA;
          })[0];

        if (criativoComMelhorCTR) {
          melhorCTR = {
            nome: criativoComMelhorCTR.nome,
            ctr: criativoComMelhorCTR.metricas.ctr
          };
        }
      }

      return {
        success: true,
        data: {
          totalCriativos: totalCriativos || 0,
          criativosSalvos: criativosSalvos || 0,
          nichoMaisPopular: nichoTop ? `${nichoTop[0]} (${nichoTop[1]})` : 'N/A',
          criativoRecente: criativoRecente?.nome || 'N/A',
          melhorCTR
        }
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro ao buscar estatísticas: ${error.message}`,
        fallback: true
      };
    }
  }

  // SINCRONIZAÇÃO
  async syncWithGoogleSheets(googleSheetsData) {
    try {
      // Buscar criativos existentes
      const { data: existingCriativos } = await supabase
        .from(TABLES.CRIATIVOS)
        .select('nome');

      const existingNames = new Set(existingCriativos?.map(c => c.nome) || []);

      // Filtrar apenas novos criativos
      const newCriativos = googleSheetsData.filter(
        criativo => !existingNames.has(criativo.nome)
      );

      if (newCriativos.length === 0) {
        return { success: true, message: 'Nenhum criativo novo para sincronizar' };
      }

      // Inserir novos criativos
      const { data, error } = await supabase
        .from(TABLES.CRIATIVOS)
        .insert(newCriativos.map(c => ({
          nome: c.nome,
          nicho: c.nicho,
          mecanismo: c.mecanismo,
          dias_ativos: c.diasAtivos,
          cor: c.cor,
          thumbnail: c.thumbnail,
          video_url: c.videoUrl,
          salvo: c.salvo || false,
          metricas: c.metricas || {}
        })))
        .select();

      if (error) throw error;

      return { 
        success: true, 
        message: `${newCriativos.length} novos criativos sincronizados`,
        data 
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Erro na sincronização: ${error.message}`
      };
    }
  }

  // REALTIME SUBSCRIPTIONS
  subscribeToChanges(callback) {
    const subscription = supabase
      .channel('criativos-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: TABLES.CRIATIVOS }, 
        callback
      )
      .subscribe();

    return subscription;
  }

  unsubscribe(subscription) {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  }
}

export default new SupabaseService();
