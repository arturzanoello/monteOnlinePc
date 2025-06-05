import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const STORAGE_DATA = [
    {
        id: 'storage1',
        name: 'SSD KINGSTON NV3 1TB M.2',
        price: '429,00',
        description: 'SSD KINGSTON NV3 1TB M.2 2280 NVME PCIE 4.0 - SNV3S/1000G',
        shop: 'Amazon'
    },
    {
        id: 'storage2',
        name: 'SSD Kingston Fury Renegade, 1TB, M.2 2280',
        price: '629,99',
        description: 'SSD Kingston Fury Renegade, 1TB, M.2 2280, PCIe 4.0 x4, NVMe, Leitura: 7300 MB/s, Gravação: 6000 MB/s, Compatível com PS5 - SFYRS/1000G',
        shop: 'Kabum'
    },
    {
        id: 'storage3',
        name: 'SSD ADATA M.2 2280, 1TB, NVME',
        price: '399,99',
        description: 'SSD ADATA M.2 2280, 1TB, NVME, PCIe gen 4x4, Leitura: 3.500MB/s e Gravação: 2.800MB/s, Preto - ALEG-800-1000GCS',
        shop: 'Kabum'
    },
    {
        id: 'storage4',
        name: 'SSD Kingston NV3, 500 GB, M.2 2280',
        price: '294,99',
        description: 'SSD Kingston NV3, 500 GB, M.2 2280, PCIe 4.0 x4, NVMe, Leitura: 5000 MB/s, Gravação: 3000 MB/s, Azul - SNV3S/500G',
        shop: 'Kabum'
    }
]

export function ChooseStorage({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="storage"
            title="Armazenamento"
            nextScreen="ChoosePsu"
            componentsData={STORAGE_DATA}
        />
    )
}