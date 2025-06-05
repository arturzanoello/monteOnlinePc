import AsyncStorage from '@react-native-async-storage/async-storage';

export interface PcComponent {
    id: string;
    name: string;
    price: string;
    quantity?: number;
}

export interface PcBuild {
    id: number;
    components: {
        cpu?: PcComponent | null;
        motherboard?: PcComponent | null;
        gpu?: PcComponent | null;
        memory?: PcComponent | null;
        storage?: PcComponent | null;
        psu?: PcComponent | null;
        case?: PcComponent | null;
        [key: string]: PcComponent | null | undefined; // Índice para tipos dinâmicos
    };
    totalPrice: number;
}

export const updateBuild = async (build: PcBuild) => {
    try {
        const savedBuilds = await getBuilds();
        const index = savedBuilds.findIndex(b => b.id === build.id);

        if (index !== -1) {
            savedBuilds[index] = build;
            await AsyncStorage.setItem('@saved_builds', JSON.stringify(savedBuilds));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erro ao atualizar a montagem:", error);
        throw error;
    }
};

export const getNextBuildId = async (): Promise<number> => {
    try {
        const savedBuilds = await getBuilds();

        const maxId = savedBuilds.reduce((max, build) =>
            build.id > max ? build.id : max, 0);

        return maxId + 1;
    } catch (error) {
        console.error("Erro ao obter próximo ID:", error);
        return 1;
    }
};

export const saveBuild = async (newBuild: PcBuild) => {
    try {
        const savedBuilds = await getBuilds();
        const updatedBuilds = [...savedBuilds, newBuild];
        await AsyncStorage.setItem('@saved_builds', JSON.stringify(updatedBuilds));
        return true;
    } catch (error) {
        console.error("Erro ao salvar build:", error);
        throw error;
    }
};

export const getBuilds = async (): Promise<PcBuild[]> => {
    try {
        const savedBuilds = await AsyncStorage.getItem('@saved_builds');
        return savedBuilds ? JSON.parse(savedBuilds) : [];
    } catch (error) {
        console.error("Erro ao obter montagens salvas:", error);
        return [];
    }
};

export const deleteBuild = async (buildId: number): Promise<boolean> => {
    try {
        const savedBuilds = await getBuilds();
        const updatedBuilds = savedBuilds.filter(build => build.id !== buildId);
        await AsyncStorage.setItem('@saved_builds', JSON.stringify(updatedBuilds));
        return true;
    } catch (error) {
        console.error("Erro ao deletar montagem:", error);
        return false;
    }
};