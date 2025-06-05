import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const GPU_DATA = [
    {
        id: 'gpu1',
        name: 'Gigabyte GeForce RTX 5090 Aorus Master Ice, 32GB',
        price: '26.999,99',
        description: 'Placa de Video Gigabyte GeForce RTX 5090 Aorus Master Ice, 32GB, GDDR7, 512-bit, GV-N5090AORUS-M-ICE-32GD',
        shop: 'Pichau'
    },
    {
        id: 'gpu2',
        name: 'Gigabyte RTX 5060 WINDFORCE OC 8G NVIDIA GeForce, 8GB GDDR7',
        price: '2.649,00',
        description: 'Placa de Vídeo Gigabyte RTX 5060 WINDFORCE OC 8G NVIDIA GeForce, 8GB GDDR7, 128bits, DLSS, Ray Tracing - GV-N5060WF2OC-8GD',
        shop: 'Kabum'
    },
    {
        id: 'gpu3',
        name: 'Gigabyte NVIDIA GeForce RTX 3050 WINDFORCE OC V2, 6GB GDDR6',
        price: '1.379,90',
        description: 'Placa de Vídeo Gigabyte NVIDIA GeForce RTX 3050 WINDFORCE OC V2, 6GB GDDR6, DLSS, Ray Tracing, GV-N3050WF2OCV2-6GD',
        shop: 'TerabyteShop'
    },
    {
        id: 'gpu4',
        name: 'RTX 4070 Super Gigabyte Windforce NVIDIA GeForce, 12GB, GDDR6X',
        price: '4.859,99',
        description: 'Placa de Vídeo RTX 4070 Super Gigabyte Windforce NVIDIA GeForce, 12GB, GDDR6X, DLSS, Ray Tracing - GV-N407SWF3OC-12GD',
        shop: 'Kabum'
    }
]

export function ChooseGpu({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="gpu"
            title="Placa de Vídeo"
            nextScreen="ChooseStorage"
            componentsData={GPU_DATA}
        />
    )
}