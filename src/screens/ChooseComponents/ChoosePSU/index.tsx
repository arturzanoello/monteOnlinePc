import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const PSU_DATA = [
    {
        id: 'psu1',
        name: 'Gamer Rise Mode Zeus, 1000W, 80 Plus Platinum',
        price: '699,99',
        description: 'Fonte Gamer Rise Mode Zeus, 1000W, 80 Plus Platinum, Modular, PFC Ativo, Preto - RM-PSU-01-PA-1000',
        shop: 'Kabum'
    },
    {
        id: 'psu2',
        name: 'Mancer Thunder 600W 80 Plus Bronze',
        price: '249,99',
        description: 'Fonte Mancer Thunder 600W 80 Plus Bronze, MCR-THR600-BL01',
        shop: 'Pichau'
    },
    {
        id: 'psu3',
        name: 'BRX Rainbow RGB, 850W, 80 Plus Bronze',
        price: '259,90',
        description: 'Fonte BRX Rainbow RGB, 850W, 80 Plus Bronze, PFC Ativo, 51033682',
        shop: 'TerabyteShop'
    },
    {
        id: 'psu4',
        name: 'MSI MAG A650BN, 650W, 80 Plus Bronze',
        price: '319,99',
        description: 'Fonte MSI MAG A650BN, 650W, 80 Plus Bronze, PFC Ativo, Com Cabo, Preto - 306-7ZP2B22-CE0',
        shop: 'Kabum'
    }
]

export function ChoosePsu({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="psu"
            title="Fonte"
            nextScreen="ChooseCase"
            componentsData={PSU_DATA}
        />
    )
}