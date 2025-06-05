import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const RAM_DATA = [
    {
        id: "ram1",
        name: "Kingston Memória Fury Beast RGB 16GB 3200MT/s DDR4 ",
        price: "345,00",
        description: "Kingston Memória de computador Fury Beast RGB 16GB 3200MT/s DDR4 CL16 DIMM KF432C16BB12A/16",
        shop: "Amazon"
    },
    {
        id: "ram2",
        name: "Kingston Fury Beast, 8GB, 3200MHz, DDR4",
        price: "139,99",
        description: "Memória RAM Kingston Fury Beast, 8GB, 3200MHz, DDR4, CL16, Preto - KF432C16BB/8",
        shop: "Kabum"
    },
    {
        id: "ram3",
        name: "Team Group T-Force Elite Plus, 16GB (2x8GB), DDR4",
        price: "279,99",
        description: "Memoria Team Group T-Force Elite Plus, 16GB (2x8GB), DDR4, 3200MHz, C22, Preto, TPD416G3200HC22DC01",
        shop: "Pichau"
    },
    {
        id: "ram4",
        name: "Kingston Fury SuperFrame, 8GB, 3200MHz",
        price: "149,99",
        description: "Memória DDR4 Kingston Fury SuperFrame, 8GB, 3200MHz, Black, KF432C16BB/8CLLB",
        shop: "TerabyteShop"
    }
];

export function ChooseMemory({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="memory"
            title="Memória RAM"
            nextScreen="ChooseGpu"
            componentsData={RAM_DATA}
        />
    )
}