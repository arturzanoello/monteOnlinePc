

Relatório de Planning Sprint 2
Plataforma Personalizada de Montagem de Computadores
(Monte Online PC+)
Universidade Comunitária da Região de Chapecó Área de Ciências
Exatas e Ambientais Curso de Engenharia de Produção
## Integrantes
NomePapel
Érico CamposGerente de Projeto (GP)
Vitor CaldasScrum Master (SM)
Artur ZanoelloDesenvolvedor (DEV)
Lucas SehnProduct Owner (PO)
Mário Antônio Fribel  Desenvolvedor (DEV)
Vinícius FranzenDesenvolvedor (DEV)
Projeto:Monte Online PC+ - Plataforma mobile de montagem personalizada
de computadores com verificação automática de compatibilidade e comparação
de preços entre fornecedores.
Stack:React Native (JavaScript), Node.js + Express, PostgreSQL, Firebase
## Authentication.
- Dados Fictícios da Sprint 1
## 1.1. Contexto
A Sprint 1 do novo semestre (03/Mar - 24/Mar/2026) deu continuidade ao MVP
entregue no semestre anterior. O foco foi melhorar a performance, adicionar
funcionalidades de busca e corrigir bugs remanescentes.
## 1.2. Métricas Utilizadas
MétricaDefiniçãoPor que foi escolhida
## Velocity
(Story
## Points)
Pontos de história
concluídos
vs. planejados
Mede a capacidade real de entrega da
equipe por sprint
## 1

MétricaDefiniçãoPor que foi escolhida
Taxa de
Conclusão de
## Tarefas (%)
Tarefas concluídas
/ tarefas atribuídas
por membro
Identifica gargalos individuais e
distribuição desigual de carga
Bugs por
## Categoria
Quantidade de
bugs agrupados
por tipo (UI,
## Backend, Lógica,
## Performance)
Revela onde o código está mais frágil
e orienta esforços de qualidade
## Tempo
Médio por
## História
## (dias)
Média de dias
entre início e
conclusão de cada
user story
Indica complexidade real vs. estimada
e previsibilidade
Cobertura de
## Testes (%)
Percentual de
código coberto por
testes
automatizados
Mede maturidade técnica e risco de
regressão
Tempo de
## Carrega-
mento (s)
Média de tempo
para carregar a
tela de seleção de
peças
Métrica direta de experiência do
usuário (UX)
Satisfação do
## Usuário
## (NPS)
## Net Promoter
Score de 12 beta
testers
Valida se o produto resolve o
problema do usuário
1.3. Como os Dados Foram Definidos
Os dados foram construídos simulando um cenário realista para uma equipe
de 6 pessoas (3 devs, 1 GP, 1 SM, 1 PO) trabalhando part-time em projeto
acadêmico:
•Velocity de 70%é típica de equipes em fase inicial de maturidade Scrum,
onde estimativas ainda são imprecisas.
•Bugs concentrados em Performance (37,5%)refletem que o MVP
priorizou funcionalidade sobre otimização.
•Cobertura de testes baixa (38%)é comum em projetos acadêmicos
onde o foco está em entregar features.
•NPS de 62é considerado “bom” (acima de 50), compatível com um app
funcional, mas com pontos de fricção.
•Distribuição desigual de tarefassimula a realidade de equipes onde
alguns membros têm mais experiência técnica que outros.
## 1.4. Dados Consolidados
## Sprint 1 - Visão Geral
## 2

MétricaPlanejado   Realizado  Status
## Story Points402870%
Histórias de Usuário7571%
## Tarefas Totais372978%
## Bugs Encontrados-8-
## Bugs Resolvidos-562,5%
Cobertura de Testes50% (meta)  38%Abaixo
Tempo de Carregamento  < 2s (meta)  4,8sCrítico
NPS Beta Testers70 (meta)   62Próximo
Histórias da Sprint 1
#   HistóriaPontosStatusResponsávelDias
#15  Busca e
filtro de
peças por
nome/categoria
5Concluída  Artur3
## #16  Otimização
de tempo de
carrega-
mento
8IncompletaVinícius7+
## #17  Compatibilidade
de
refrigeração
5Concluída  Mário4
## #18  Notificações
de variação
de preço
8IncompletaVinícius/Mário    7+
## #19  Modo
escuro (dark
mode)
3Concluída  Artur2
## #20  Exportar
montagem
em PDF
5Concluída  Érico/Lucas5
#21  Correção de
bugs do
## MVP
5Concluída  Vitor/Lucas4
Distribuição de Tarefas por Membro
## 3

## Membro   Papel    Atribuídas    Concluídas    %   Observação
## Érico
## Campos
GP55100% Documentação
e coordenação
## Vitor
## Caldas
SM6583% 1 tarefa
bloqueada por
dependência
## Artur
## Zanoello
DEV8787% Maior
produtividade
técnica
## Lucas
## Sehn
PO44100% Validação e
testes de
aceitação
## Mário A.
## Fribel
DEV7457%Dificuldade
com APIs
externas
## Vinícius
## Franzen
DEV7457%Travou na
otimização de
performance
Bugs por Categoria
CategoriaQuantidade  %Resolvidos  Abertos
## Performance337,5%  12
UI/Layout225,0%  20
Lógica de Compatibilidade  225,0%  11
Backend/API112,5%  10
## Total8100%  53
Burndown (Story Points por dia)
## Dia   Ideal  Real
## 138   40
## 334   38
## 530   35
## 726   32
## 922   28
## 11    18   25
## 13    14   20
## 15    10   15
## 17    612
## 19    28
## 21    05
## 4

## Dia   Ideal  Real
Final  012(não entregues)
- Análise dos Dados
## 2.1. Interpretação
A Sprint 1 apresentou umavelocity de 70%(28 de 40 pontos), indicando que
a equipe superestimou sua capacidade. As 5 histórias concluídas representam o
núcleo funcional planejado, porém as 2 histórias incompletas (#16 e #18) são
justamente as demaior complexidade técnica(8 pontos cada).
Oburndownmostra que a equipe ficou consistentemente acima da linha ideal,
com a maior divergência a partir do dia 9, quando as histórias de alta complex-
idade travaram.
ONPS de 62é um sinal positivo: os beta testers reconhecem valor no produto.
A insatisfação se concentra emlentidão(4,8s de carregamento) efalta de
notificações
, ambos diretamente ligados às histórias não concluídas.
## 2.2. Problemas Identificados
P1. Performance crítica (Problema Principal)O tempo de carregamento
de 4,8s está 140% acima da meta de 2s. A tela de seleção de peças faz queries
não otimizadas ao PostgreSQL, carregando todas as peças de uma vez ao invés
de paginar. 37,5% dos bugs são de performance. Isso afeta diretamente a
experiência do usuário e é o maior detrator do NPS.
P2. Sobrecarga em membros específicosMário e Vinícius tiveram apenas
57% de conclusão, enquanto Érico e Lucas atingiram 100%. A causa raiz é que
as tarefas mais complexas (otimização, integração com API de terceiros) ficaram
concentradas nos mesmos devs, sem suporte adequado.
P3. Cobertura de testes insuficiente (38%)A meta era 50% e o resultado
ficou 12 pontos abaixo. A ausência de testes automatizados faz com que bugs
de regressão apareçam a cada nova feature, aumentando o retrabalho.
P4. Histórias de 8 pontos são arriscadasAs duas únicas histórias in-
completas tinham 8 pontos. Histórias grandes demais não permitem entrega
incremental e travaram o burndown.
## 2.3. Pontos Fortes
F1. Core do produto sólidoAs funcionalidades centrais (busca, compatibil-
idade, exportação PDF, dark mode) foram entregues com qualidade. Bugs de
UI foram 100% resolvidos.
## 5

F2. Satisfação do usuário acima da médiaNPS de 62 com 12 testers é um
resultado positivo para um MVP acadêmico. O fluxo de montagem guiada foi
elogiado por 10 dos 12 testers.
F3. Membros não-dev são produtivosGP e PO atingiram 100% de con-
clusão, indicando que a documentação, validação e coordenação estão bem es-
truturadas.
F4. Histórias de até 5 pontos são confiáveisTodas as 5 histórias de até 5
pontos foram concluídas. A equipe tem boa previsibilidade para itens menores.
- Planejamento da Sprint 2
## 3.1. Objetivo
Resolver o gargalo de performance, concluir as histórias
carryover da Sprint 1 e estabelecer uma base mínima de
testes automatizados para reduzir bugs de regressão.
3.2. Decisões Baseadas nos Dados
DecisãoDado que Motivou
Reduzir a capacity para
32 pontos (de 40)
Velocity real foi 70%, então 32 pts = capacity
realista
Quebrar histórias de 8 pts
em sub-histórias de 3-5
pts
Histórias de 8 pts tiveram 0% de conclusão
vs. 100% das de até 5 pts
Priorizar performance
como #1
37,5% dos bugs são de performance + NPS
detractor + 4,8s de load time
Parear Mário/Vinícius
com Artur
Mário e Vinícius tiveram 57% de conclusão; Artur
teve 87%. Pair programming reduz bloqueios
Incluir história de testes
automatizados
Cobertura de 38% está gerando retrabalho. Meta:
## 55%
Não incluir features novas
além do carryover
Sprint 1 mostrou que a equipe não tem capacity
para 40 pts. Foco em dívida técnica
3.3. Backlog da Sprint 2
## 6

## #   História   Pontos   Prioridade  Responsável(is)   Justificativa
## #16a Paginação
da lista
de peças
## (back-
end)
3CRÍTICAVinícius + Artur
## (pair)
Causa raiz do
load time de
## 4,8s. Query
carrega 2000+
peças sem
paginação
#16bLazy
loading
de
imagens
e cache
local
3CRÍTICAViníciusComplementa
## #16a. Imagens
são 60% do
payload
## #16c Indicador
de
carrega-
mento
## (skeleton
## UI)
2ALTAArturMelhora a
percepção de
velocidade
enquanto
## #16a/#16b
não eliminam
100% da
lentidão
## #18a Integração
com API
de preços
## (polling)
5ALTAMário + Artur
## (pair)
Carryover da
## Sprint 1.
## Simplificado:
polling a cada
6h em vez de
push
notifications
#18bTela de
alertas
de preço
3MÉDIA    MárioDepende de
#18a. UI
simples: lista
de peças que
baixaram de
preço
## #22 Testes
automa-
tizados
## (unitários
+ inte-
gração)
5ALTAÉrico + Lucas    Cobertura de
38% para 55%.
Foco nos
módulos de
compatibili-
dade e auth
## 7

## #   História   Pontos   Prioridade  Responsável(is)   Justificativa
#23 Fix bug
de
compati-
bilidade
de socket
## (#BUG-
## 06)
3ALTAVitorBug aberto da
## Sprint 1.
## Placas-mãe
## LGA 1700
aparecem para
CPUs AM5
#24 Fix bugs
de per-
formance
restantes
## (#BUG-
## 03,
## #BUG-
## 04)
3MÉDIA    Vinícius2 bugs abertos
de performance
da Sprint 1
TOTAL27Margem de 5
pts para
imprevistos
## (capacity 32)
3.4. Distribuição por Membro
MembroTarefasPontosEstratégia
## Érico Campos
## (GP)
## #22 (testes),
coordenação
5Lidera esforço de
testes +
documentação
## Vitor Caldas
## (SM)
#23 (bug fix),
facilitação
3Bug crítico de
compatibilidade +
daily/retro
## Artur Zanoello
## (DEV)
## #16a, #16c,
## #18a (pair)
10Dev mais produtivo.
Pair programming
com Mário e Vinícius
## Lucas Sehn
## (PO)
## #22 (testes),
validação
5Testes de aceitação +
escrever casos de
teste
## Mário A. Fribel
## (DEV)
## #18a, #18b
(pair com Artur)
8Pair programming
mitiga bloqueio da
## Sprint 1
## Vinícius
Franzen (DEV)
#16a, #16b, #24  9Foco total em
performance (área
que travou na Sprint
## 1)
## 8

3.5. Critérios de Sucesso
MétricaMeta Sprint 2  Baseline Sprint 1
## Velocity>= 85%70%
Tempo de Carregamento< 2,5s4,8s
Cobertura de Testes>= 55%38%
Bugs Abertos ao Final03
## NPS>= 7062
Conclusão por Membro (mín.)  >= 75%57%
3.6. Riscos e Mitigações
RiscoProbabilidadeImpactoMitigação
API de
preços de
terceiros
instável
AltaMédioImplementar cache
local + fallback
para dados
estáticos
Pair pro-
gramming
reduz
throughput
individual
MédiaBaixoLimitar pair a
2h/dia, resto do
tempo trabalho
individual
## Testes
atrasam
entregas de
features
MédiaMédioTestes são escritos
em paralelo por
GP/PO, não pelos
devs
## 4. Dashboard
O dashboard interativo está disponível no arquivodashboard_sprint1.html
(abrir no navegador).
Contém 4 gráficos:
1.Gráfico de Barras - Story Points: Planejado vs Entregue por
## História
•Identifica oproblema principal: histórias #16 e #18 (8 pts cada)
não foram entregues, representando 100% dos pontos não concluídos.
2.Gráfico de Pizza - Distribuição de Bugs por Categoria
•Mostra aoportunidade de melhoria: 37,5% dos bugs são de Per-
formance, indicando necessidade de foco em otimização e testes de
carga.
## 9

3.Gráfico de Barras Horizontais - Taxa de Conclusão por Membro
•Revela tanto oponto positivo(GP e PO com 100%) quanto o
problema desobrecargaem Mário e Vinícius (57%).
4.Gráfico de Linha - Burndown Chart
•Visualiza a divergência entre progresso ideal e real, mostrando que a
equipe ficou para trás a partir do dia 9 (quando travaram nas histórias
complexas).
Documento elaborado pela equipe Monte Online PC+ para a disciplina de En-
genharia de Software. Março de 2026.
## 10