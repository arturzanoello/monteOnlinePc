import { supabase } from './supabase';

/**
 * Busca as especificações de uma peça diretamente no banco pelo ID.
 * Retorna o JSON bruto da coluna 'especificacoes'.
 */
const fetchEspecificacoesById = async (id: string): Promise<Record<string, string> | null> => {
    const { data, error } = await supabase
        .from('pecas')
        .select('especificacoes')
        .eq('id', id)
        .single();

    if (error || !data?.especificacoes) return null;

    try {
        return typeof data.especificacoes === 'string'
            ? JSON.parse(data.especificacoes)
            : data.especificacoes;
    } catch {
        return null;
    }
};

/**
 * Extrai um valor de um objeto de especificações, insensível a maiúsculas/minúsculas.
 * Ex: extractFromObj(specs, 'Socket') → "AM5"
 */
const extractFromObj = (specs: Record<string, string>, key: string): string | null => {
    const lowerKey = key.toLowerCase().trim();
    for (const [k, v] of Object.entries(specs)) {
        if (k.toLowerCase().trim() === lowerKey && v) {
            return String(v);
        }
    }
    return null;
};

/**
 * DDR exigido por socket (regra de negócio fixa).
 * Para LGA 1700, retorna null pois a placa-mãe é quem define.
 */
const socketToDdr = (socket: string): string | null => {
    const s = socket.toUpperCase();
    if (s === 'AM5' || s === 'LGA 1851') return 'DDR5';
    if (s === 'AM4' || s === 'LGA 1200' || s === 'LGA 1151') return 'DDR4';
    if (s === 'AM3' || s === 'AM3+') return 'DDR3';
    return null; // LGA 1700 depende da placa-mãe
};

// ─────────────────────────────────────────────────────────────────
// FUNÇÕES PÚBLICAS — chamadas pelas telas
// ─────────────────────────────────────────────────────────────────

/**
 * Dado o ID do processador selecionado, retorna o filtro para buscar
 * placas-mãe compatíveis no banco.
 * O filtro é uma substring que deve aparecer no campo 'especificacoes'.
 *
 * Ex: { specsFilter: 'AM5', specsKey: 'Socket do processador' }
 * → usado como: .ilike('especificacoes', '%"Socket do processador"%AM5%')
 */
export const getMotherboardFilterByCpu = async (
    cpuId: string
): Promise<{ specsFilter: string; specsKey: string } | null> => {
    const specs = await fetchEspecificacoesById(cpuId);
    if (!specs) return null;

    const socket = extractFromObj(specs, 'Socket');
    if (!socket) return null;

    return {
        specsKey: 'Socket do processador',
        specsFilter: socket,
    };
};

/**
 * Dado o ID da placa-mãe selecionada, retorna o filtro para buscar
 * memórias RAM compatíveis no banco.
 *
 * Ex: { specsFilter: 'DDR5', specsKey: 'Velocidade' }
 * → usado como: .ilike('especificacoes', '%"Velocidade"%DDR5%')
 */
export const getRamFilterByMotherboard = async (
    mbId: string
): Promise<{ specsFilter: string; specsKey: string } | null> => {
    const specs = await fetchEspecificacoesById(mbId);
    if (!specs) return null;

    // Tenta ler o socket da placa-mãe
    const socket = extractFromObj(specs, 'Socket do processador') || extractFromObj(specs, 'Socket');
    if (!socket) return null;

    // Determina DDR pelo socket (regra fixa)
    let ddr = socketToDdr(socket);

    // LGA 1700: a própria placa diz se é DDR4 ou DDR5 nas specs
    if (!ddr) {
        for (const v of Object.values(specs)) {
            const val = String(v).toUpperCase();
            if (val.includes('DDR5')) { ddr = 'DDR5'; break; }
            if (val.includes('DDR4')) { ddr = 'DDR4'; break; }
        }
    }

    if (!ddr) return null;

    return {
        specsKey: 'Velocidade',
        specsFilter: ddr,
    };
};

/**
 * Valida compatibilidade de socket entre CPU e Placa-Mãe.
 * Usa IDs para buscar as specs diretamente do banco.
 */
export const validateMotherboardById = async (
    cpuId: string,
    mbId: string
): Promise<{ valid: boolean; error?: string }> => {
    const [cpuSpecs, mbSpecs] = await Promise.all([
        fetchEspecificacoesById(cpuId),
        fetchEspecificacoesById(mbId),
    ]);

    if (!cpuSpecs || !mbSpecs) return { valid: true }; // sem dados, não bloqueia

    const cpuSocket = extractFromObj(cpuSpecs, 'Socket');
    const mbSocket = extractFromObj(mbSpecs, 'Socket do processador') || extractFromObj(mbSpecs, 'Socket');

    if (cpuSocket && mbSocket && cpuSocket.toUpperCase() !== mbSocket.toUpperCase()) {
        return {
            valid: false,
            error: `Incompatibilidade de Socket!\n\nProcessador: ${cpuSocket}\nPlaca-mãe: ${mbSocket}`,
        };
    }

    return { valid: true };
};

/**
 * Valida compatibilidade de DDR entre Placa-Mãe e RAM.
 * Usa IDs para buscar as specs diretamente do banco.
 */
export const validateMemoryById = async (
    mbId: string,
    ramId: string
): Promise<{ valid: boolean; error?: string }> => {
    const [mbSpecs, ramSpecs] = await Promise.all([
        fetchEspecificacoesById(mbId),
        fetchEspecificacoesById(ramId),
    ]);

    if (!mbSpecs || !ramSpecs) return { valid: true };

    const socket = extractFromObj(mbSpecs, 'Socket do processador') || extractFromObj(mbSpecs, 'Socket');
    let mbDdr = socket ? socketToDdr(socket) : null;

    // LGA 1700: lê o DDR nas próprias specs da placa-mãe
    if (!mbDdr) {
        for (const v of Object.values(mbSpecs)) {
            const val = String(v).toUpperCase();
            if (val.includes('DDR5')) { mbDdr = 'DDR5'; break; }
            if (val.includes('DDR4')) { mbDdr = 'DDR4'; break; }
        }
    }

    const ramVelocidade = extractFromObj(ramSpecs, 'Velocidade');
    const ramDdr = ramVelocidade
        ? ramVelocidade.toUpperCase().includes('DDR5') ? 'DDR5'
          : ramVelocidade.toUpperCase().includes('DDR4') ? 'DDR4'
          : ramVelocidade.toUpperCase().includes('DDR3') ? 'DDR3'
          : null
        : null;

    if (mbDdr && ramDdr && mbDdr !== ramDdr) {
        return {
            valid: false,
            error: `Incompatibilidade de Memória!\n\nPlaca-mãe suporta: ${mbDdr}\nMemória escolhida: ${ramDdr}`,
        };
    }

    return { valid: true };
};
