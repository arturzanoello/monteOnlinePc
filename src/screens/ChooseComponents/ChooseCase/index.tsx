import { ChooseComponentScreen } from "../../../components/chooseComponentScreen";

const CASE_DATA = [
    {
        id: 'case1',
        name: 'Gabinete Gamer Branco GB1791 4 fans',
        price: '299,00',
        description: 'Gabinete Gamer Branco GB1791 4 fans RGB Micro-Atx Em vidro temperado',
        shop: 'Amazon'
    },
    {
        id: 'case2',
        name: 'Gabinete Gamer Pichau HX110, Mini-Tower',
        price: '169,99',
        description: 'Gabinete Gamer Pichau HX110, Mini-Tower, Lateral de Vidro, Preto, PG-HX110-BK - PRE VENDA',
        shop: 'Pichau'
    },
    {
        id: 'case3',
        name: 'Gabinete Gamer Rise Mode Galaxy Glass Standard V2, Mid Tower',
        price: '399,99',
        description: 'Gabinete Gamer Rise Mode Galaxy Glass Standard V2, Mid Tower, ATX, Lateral e Frontal em Vidro Temperado, Preto - RM-GA-GGST2-FB',
        shop: 'Kabum'
    },
    {
        id: 'case4',
        name: 'Gabinete Gamer K-MEX Mega Shark, Aquario, Mid Tower',
        price: '279,90',
        description: 'Gabinete Gamer K-MEX Mega Shark, Aquario, Mid Tower, Vidro Temperado, ATX, Sem Fonte, Sem Fan, Preto, CG01FDRH001CB0X',
        shop: 'TerabyteShop'
    }
]

export function ChooseCase({ navigation }: any) {
    return (
        <ChooseComponentScreen
            navigation={navigation}
            componentType="case"
            title="Gabinete"
            nextScreen="SaveBuild"
            componentsData={CASE_DATA}
        />
    )
}