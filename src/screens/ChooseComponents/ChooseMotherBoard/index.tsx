import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const MB_DATA = [
    {
        id: "mb1",
        name: "Asus ROG Strix Z790-E",
        price: "2.799,99",
        description: "DDR5, PCIe 5.0, Wi-Fi 6E",
        shop: "Pichau",
    },
    {
        id: "mb2",
        name: "Placa-Mãe ASUS Prime H610M-A",
        price: "799,99",
        description: "Intel, M-ATX, DDR5, Preto - 90MB1G20-M0EAY0",
        shop: "Kabum",
    },
    {
        id: "mb3",
        name: "Placa Mae Gigabyte B760M D2H DDR4",
        price: "699,99",
        description: "Socket LGA1700, M-ATX, Chipset Intel B760, B760M-D2H-DDR4",
        shop: "Pichau",
    },
    {
        id: "mb4",
        name: "Placa-Mãe ASUS TUF GAMING B760M-PLUS WIFI II",
        price: "1.259,99",
        description: "Intel, DDR5, Preto - 90MB1HE0-M0EAY0",
        shop: "Kabum",
    },
];

export function ChooseMotherboard({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="motherboard"
            title="Placas-mãe"
            nextScreen="ChooseMemory"
            componentsData={MB_DATA}
        />
    );
}