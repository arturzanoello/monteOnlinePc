import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const CPU_DATA = [
    {
        id: "cpu1",
        name: "Intel Core i9-13900K",
        price: "3.999,99",
        description: "24 núcleos, 5.8GHz Max Turbo",
        shop: "Kabum",
    },
    {
        id: "cpu2",
        name: "Intel Core i5-14600K,",
        price: "1.449,99",
        description: "5.3 GHz Max Turbo, Cache 24MB, 14 Núcleos, 20 Threads, LGA1700",
        shop: "Kabum",
    },
    {
        id: "cpu3",
        name: "Intel Core i9-14900K",
        price: "2.999,99",
        description: "6GHz Max Turbo, Cache 36MB, 24 Núcleos, 32 Threads, LGA1700",
        shop: "Kabum",
    },
    {
        id: "cpu4",
        name: "Intel Core i7-14700KF",
        price: "2.179,99",
        description: "5.6 GHz Max Turbo, Cache 33MB, 20 Núcleos, 28 Threads, LGA1700",
        shop: "Kabum",
    },

];

export function ChooseCpu({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="cpu"
            title="Processadores"
            nextScreen="ChooseMotherboard"
            componentsData={CPU_DATA}
        />
    );
}