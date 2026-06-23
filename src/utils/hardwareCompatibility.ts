export interface Peca {
    id?: string;
    name?: string;           // Alterado de nome_produto para name (como no frontend)
    nome_produto?: string;   // Para retrocompatibilidade
    description?: string;    // Alterado de especificacoes para description
    especificacoes?: string; // Para retrocompatibilidade
}

// Utilitário para extrair valores das especificações (JSON ou Regex)
const extractSpec = (texto: string | null | undefined, keys: string[]): string | null => {
    if (!texto) return null;
    try {
        const specsObj = JSON.parse(texto);
        const lowerKeys = keys.map(k => k.toLowerCase().trim());
        
        for (const [objKey, objValue] of Object.entries(specsObj)) {
            if (lowerKeys.includes(objKey.toLowerCase().trim()) && objValue) {
                return String(objValue).toUpperCase();
            }
        }
    } catch (e) {
        // Fallback regex se não for JSON válido
        for (const key of keys) {
            const regex = new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`, 'i');
            const match = texto.match(regex);
            if (match) return match[1].toUpperCase();
        }
    }
    return null;
};

// Funções para pegar strings de texto de maneira segura
const getSpecsString = (peca: Peca): string | null => {
    return peca.description || peca.especificacoes || null;
};

const getNameString = (peca: Peca): string => {
    return peca.name || peca.nome_produto || '';
};

export const getCpuSocket = (cpu: Peca): string | null => {
    return extractSpec(getSpecsString(cpu), ['Socket', 'Socket do processador']);
};

export const getMotherboardSocket = (mb: Peca): string | null => {
    return extractSpec(getSpecsString(mb), ['Socket do processador', 'Socket']);
};

export const getMotherboardSupportedDdr = (mb: Peca, mbSocket: string | null): string | null => {
    const specsString = getSpecsString(mb);
    const memSpec = extractSpec(specsString, ['Suporte de memória', 'Tecnologia de memória RAM', 'Tipo de memória']);
    const mbName = getNameString(mb).toUpperCase();
    
    const isDdr4 = memSpec?.includes('DDR4') || mbName.includes('D4');
    const isDdr5 = memSpec?.includes('DDR5') || mbName.includes('D5');
    const isDdr3 = memSpec?.includes('DDR3');

    // Mapeamento rígido por socket
    if (mbSocket === 'AM5' || mbSocket === 'LGA 1851') return 'DDR5';
    if (mbSocket === 'AM4' || mbSocket === 'LGA 1200' || mbSocket === 'LGA 1151') return 'DDR4';
    if (mbSocket === 'AM3' || mbSocket === 'AM3+') return 'DDR3';

    // Para LGA 1700, a placa-mãe dita se é DDR4 ou DDR5
    if (mbSocket === 'LGA 1700') {
        if (isDdr5) return 'DDR5';
        if (isDdr4) return 'DDR4';
        return 'LGA1700_UNDEFINED'; // Requer info extra
    }

    return null;
};

export const getRamDdr = (ram: Peca): string | null => {
    const specsString = getSpecsString(ram);
    // Pega a velocidade via JSON/Regex baseado no exemplo do usuário ("Velocidade": "DDR4-3200")
    const vel = extractSpec(specsString, ['Velocidade', 'Tecnologia da memória', 'Tipo']);
    const ramName = getNameString(ram).toUpperCase();

    if (!vel) {
        // Tenta inferir pelo nome se a especificação falhar
        if (ramName.includes('DDR5')) return 'DDR5';
        if (ramName.includes('DDR4')) return 'DDR4';
        if (ramName.includes('DDR3')) return 'DDR3';
        return null;
    }
    
    if (vel.includes('DDR5')) return 'DDR5';
    if (vel.includes('DDR4')) return 'DDR4';
    if (vel.includes('DDR3')) return 'DDR3';
    return null;
};

export const validateMotherboard = (cpu: Peca | null, mb: Peca | null): { valid: boolean, error?: string } => {
    if (!cpu || !mb) return { valid: true };

    const cpuSocket = getCpuSocket(cpu);
    const mbSocket = getMotherboardSocket(mb);

    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
        return { 
            valid: false, 
            error: `Incompatibilidade de Socket!\n\nProcessador: ${cpuSocket}\nPlaca-mãe: ${mbSocket}.`
        };
    }

    return { valid: true };
};

export const validateMemory = (mb: Peca | null, ram: Peca | null): { valid: boolean, error?: string } => {
    if (!mb || !ram) return { valid: true };

    const mbSocket = getMotherboardSocket(mb);
    const mbDdr = getMotherboardSupportedDdr(mb, mbSocket);
    const ramDdr = getRamDdr(ram);

    if (mbDdr === 'LGA1700_UNDEFINED') {
        // Se a placa é 1700 mas não conseguimos ler se é DDR4/5 pela especificação,
        // logamos um alerta mas permitimos, ou bloqueamos dependendo do rigor desejado.
        return { valid: true }; 
    }

    if (mbDdr && ramDdr && mbDdr !== ramDdr) {
        return { 
            valid: false, 
            error: `Incompatibilidade de Memória!\n\nPlaca-mãe suporta: ${mbDdr}\nMemória escolhida: ${ramDdr}.`
        };
    }

    return { valid: true };
};
