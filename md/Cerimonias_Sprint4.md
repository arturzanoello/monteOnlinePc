

Relatório das Cerimônias
Sprint 4 - Monte Online PC+
Plataforma Personalizada de Montagem de Computadores
## 1. Identificação
•Sprint: Sprint 4
•Data: 12/05/2026
•Participantes: Erico Campos Kempfer (GP), Vitor Benedett Caldas (SM), Lucas Sehn Klauck (PO),
Artur Zanoello (DEV), Mario Antonio Fribel (DEV), Vinicius de Moraes Franzen Cordeiro (DEV)
- Pós-Sprint (Retrospectiva da Sprint 3)
O que funcionou bem (Glad)
Clima da Sprint (uma palavra cada):
Erico: Consistência | Vitor: Maturidade | Lucas: Entrega | Artur: Sólido | Mario: Desafiador | Vinicius:
## Crescimento
O que funcionou bem:
•Tela de avaliações/reviews (#26) saiu redonda. UI ficou consistente com o resto do app e o Lucas
conseguiu validar todos os critérios de aceitação no mesmo dia que ficou pronto.
•Cache local com AsyncStorage (#27) salvou a sprint quando a API de preços caiu de novo. O
fallback funcionou direitinho, o usuário nem percebeu.
•Apresentação na Desbravador (11/05) foi um marco. O Davi Piovesan e a equipe deles testaram
o app ao vivo e o feedback foi positivo. Isso deu motivação extra pro time pra fechar bem o
projeto.
•Coverage de testes subiu de 52% pra 58% - não bateu a meta de 60%, mas a tendência tá certa.
•Spike técnico de Jest + RN Testing Library (ação da retro anterior) cumprido pelo Artur no prazo.
Isso destravou a Sprint 3 inteira na parte de testes.
O que não funcionou (Mad/Sad)
## Mad:
•Push notifications (#25) virou um pesadelo. O Firebase Cloud Messaging exige configuração
nativa em Android e iOS separadamente, e o build do React Native quebrou várias vezes. A
história ficou em 60% de conclusão e vira carryover pra Sprint 4.

•Comparação lado a lado (#29) foi descartada no meio da sprint. O layout responsivo em telas
pequenas (< 5.5") ficou inviável sem reescrever o sistema de navegação.
•Acessibilidade (#28) entregou só metade do escopo. Font scaling tá funcionando, mas contraste
de cores no dark mode ainda tem componentes abaixo do WCAG AA.
## Sad:
•Documentação continua sendo o ponto fraco. O template criado pelo Vitor (ação da retro
anterior) existe mas tá sendo preenchido superficialmente.
•Pressão da entrega final começou a aparecer. A sprint teve mais retrabalho do que o ideal
porque vários componentes foram tocados sem testes locais antes.
•Vinicius melhorou bastante mas ainda precisa de pair pra histórias mais complexas. Não dá pra
contar com ele em solo pra tarefas críticas ainda.
Causas identificadas (5 Porquês)
Problema 1: Push notifications ficou só 60% pronto
Por quê? FCM exigiu configuração nativa que não estava documentada no plano.
Por quê? Subestimamos a complexidade de integração nativa em RN.
Por quê? O time só tinha experiência com FCM em projetos web puros.
Por quê? Não fizemos spike técnico antes de estimar (mesmo erro da Sprint 2 com testes).
Causa raiz: Falha em aplicar a lição aprendida da retro anterior. Spike técnico precisa virar parte
obrigatória do Planning para integrações novas, não algo opcional.
Problema 2: Comparação lado a lado foi cancelada no meio da sprint
Por quê? O layout não cabia em telas pequenas sem quebrar a UX.
Por quê? A história foi estimada sem prototipar antes.
Por quê? Confiamos que "era só uma tela" pra justificar 5 pontos.
Por quê? Não validamos com o protótipo no Figma antes do Planning.
Causa raiz: Histórias de UI complexa precisam de protótipo no Figma como Definition of Ready, não só
descrição em texto.
Ações definidas
AçãoResponsávelPrazo
Tornar o spike técnico obrigatório para qualquer
história que envolva integração nativa ou biblioteca
nova. Sem spike, a história não entra no Sprint
## Backlog.
Vitor (SM)Imediato

AçãoResponsávelPrazo
Adicionar Definition of Ready ao processo: histórias
de UI exigem protótipo Figma aprovado pelo PO
antes do Planning.
Lucas (PO)14/05/2026
Finalizar configuração nativa do FCM (Android e
iOS) e retomar push notifications como prioridade
na Sprint 4.
MarioSprint 4
Auditoria de contraste de cores no dark mode
usando ferramenta automatizada (axe-core).
## Artur20/05/2026

- Pré-Sprint (Planning da Sprint 4)
Objetivo da Sprint
Sprint Goal: Finalizar push notifications, fechar acessibilidade WCAG AA, atingir 65% de cobertura de
testes e estabilizar o app para a apresentação final do projeto.
Contexto: A Sprint 4 é a última antes da entrega final do Abex V (prevista para 27/05/2026). O foco é
fechar débitos técnicos pendentes (push, acessibilidade, testes), estabilizar o app com testes em
dispositivos reais e preparar o material de apresentação. Não entram features novas, exceto pequenos
ajustes vindos do feedback da Desbravador.
Itens priorizados (MoSCoW)
## Must Have:
•#25b Finalizar push notifications de variação de preço (carryover Sprint 3, parte nativa do FCM)
•#28b Completar acessibilidade - contraste de cores no dark mode (WCAG AA)
•#22c Completar cobertura de testes para 65% (foco em módulo de salvamento de montagens e
auth)
•#31 Testes em 5 dispositivos reais diferentes (Android 10, 12, 14 e iPhone 12, 14)
## Should Have:
•#32 Ajustes vindos do feedback da Desbravador: filtro por faixa de preço e ordenação alfabética
na lista de peças
•#33 Preparar material de apresentação (slides + roteiro de demo)
## Could Have:
•#34 Tela "Sobre" com créditos do time e versão do app
Won't Have (esta sprint):
•#29 Comparação lado a lado (descartada na retro)
•#30 Integração com marketplace externo (fora de escopo do projeto acadêmico)
## Estimativas
ItemEstimativaPrioridade
#25b Finalizar push notifications (FCM nativo)5 ptsCRÍTICA
#28b Acessibilidade - contraste WCAG AA3 ptsALTA
#22c Cobertura de testes para 65%5 ptsALTA
#31 Testes em dispositivos reais (5 aparelhos)3 ptsALTA
#32 Filtro por preço + ordenação alfabética (Desbravador)3 ptsMÉDIA

ItemEstimativaPrioridade
#33 Material de apresentação5 ptsMÉDIA
#34 Tela "Sobre" com créditos2 ptsBAIXA
TOTAL26 pts-
Distribuição por membro
MembroTarefasPontosEstratégia
Erico Campos (GP)#22c (testes), #33 (apresentação), coordenação8Coordenação da
entrega final +
material de
apresentação
Vitor Caldas (SM)#31 (testes em dispositivos reais), facilitação3Coordenar testes
em aparelhos do
time +
retro/daily
Artur Zanoello (DEV)#28b (acessibilidade), #32 (filtros), pair com
## Vinicius
6Dev mais
experiente lidera
acessibilidade e
pareia em filtros
Lucas Sehn (PO)#22c (casos de teste), #33 (validação roteiro),
## #34
7Casos de teste de
aceitação +
validação da
apresentação
Mario A. Fribel (DEV)#25b (push FCM nativo)5Foco total em
FCM, que é seu
carryover. Sem
outras tarefas
críticas.
Vinicius Franzen (DEV)#32 (filtros, pair com Artur), #345Pair
programming
continua. Tarefas
de UI menos
arriscadas.

- Observações gerais
Riscos identificados:
•Push notifications pode estourar de novo. Se até o dia 19/05 o FCM não estiver funcionando em
pelo menos um dispositivo Android, descartamos a história e tiramos a feature do escopo final
do MVP.
•Testes em dispositivos reais dependem do time conseguir agregar aparelhos diferentes. Hoje
temos 3 confirmados, faltam 2.
•Sobrecarga de fim de projeto. Esta é a última sprint antes da entrega e da apresentação. Risco
de retrabalho ou burnout se a equipe não respeitar o escopo.
## Dependências:
•#33 (material de apresentação) depende do app estar estável após #31 (testes em dispositivos
reais).
•#22c (testes) depende do Lucas escrever os casos de aceitação até 17/05 para o Erico
implementar.
•#25b depende de billing do Firebase ativo, que foi resolvido na Sprint 3 pelo Lucas.
Pontos de atenção:
•Capacidade total: 32 pts. Total planejado: 26 pts. Margem de 6 pts para imprevistos - maior que
sprints anteriores porque é a última e não dá pra arriscar.
•Mario assume push sozinho mas com check-ins diários com Vitor para evitar o bloqueio da
## Sprint 3.
•Sprint tem 14 dias (12/05 a 26/05). Review marcada para 26/05 às 19h, apresentação final em
## 27/05.
•Feedback da Desbravador (11/05): solicitaram filtro por faixa de preço (incluído como #32) e
mencionaram que gostariam de ver categorização por uso (gamer, escritório, design). Esta
segunda sugestão fica para versão futura.
- Avaliação (ROTI)
Média do time: 4.5 / 5.0
Notas individuais:
•Erico (GP): 5 - "Planning mais focado que fizemos. A decisão de não meter feature nova foi
acertada."
•Vitor (SM): 5 - "MoSCoW continua funcionando bem. As ações da retro estão ficando mais
práticas com o tempo."
•Lucas (PO): 4 - "Bom alinhamento. Só queria que tivéssemos discutido melhor o roteiro de
apresentação, ficou superficial."

•Artur (DEV): 5 - "Tô confiante na entrega. As tarefas estão bem distribuídas e ninguém ficou
sobrecarregado."
•Mario (DEV): 4 - "Saí com clareza do que preciso fazer. Só fico um pouco preocupado com o FCM
de novo."
•Vinicius (DEV): 4 - "Já me sinto mais à vontade nas discussões. O glossário que o time fez ajudou
bastante."
## Feedbacks:
•Reservar 15 min da próxima retro especificamente pra discutir o roteiro de apresentação
(Lucas).
•Manter o limite de tempo da retro em 40 min - desta vez fechou em 38 min, melhorou.
•Reconhecimento explícito do time pra Mario, que assumiu o problema do FCM sem terceirizar a
responsabilidade.

Relatório de Apoio ao Planning - Sprint 4
Dados, indicadores e decisões que embasaram o planejamento
- Dados utilizados
Para planejar a Sprint 4, o grupo consolidou os dados das três sprints anteriores do semestre. Os
números abaixo combinam métricas reais do board no Taiga, dados fictícios coerentes (para
complementar o que o projeto acadêmico não mediu formalmente) e observações qualitativas
registradas nas retrospectivas.
MétricaSprint 1Sprint 2Sprint 3
Story points planejados403229
Story points entregues282723
## Velocity70%84%79%
Histórias planejadas786
Histórias concluídas
## (totalmente)
## 574
Bugs encontrados na
sprint
## 856
Bugs em aberto ao fim
da sprint
## 302
Cobertura de testes38%52%58%
Tempo de
carregamento (tela
peças)
## 4.8s1.9s1.8s
Histórias com
retrabalho
## 212
NPS beta testers62-71
Os dados de retrabalho foram extraídos da contagem de histórias que tiveram mais de um ciclo de "em
progresso → review → em progresso" no Taiga. Os bugs em aberto foram contados a partir do board de
issues do GitHub do projeto.
## 2. Indicadores
A partir dos dados acima, o grupo derivou três indicadores que orientaram diretamente as decisões da
## Sprint 4.

Indicador 1 - Taxa de conclusão de histórias (completude)
Como foi obtido: Histórias completamente concluídas dividido pelo total de histórias planejadas em
cada sprint.
## Valores: Sprint 1 = 71% (5/7), Sprint 2 = 87% (7/8), Sprint 3 = 67% (4/6).
Para que serve: Mede a previsibilidade da equipe. Diferente do velocity (que conta pontos), este
indicador mostra quantas funcionalidades realmente saíram "prontas". É mais honesto com o usuário
final, que não enxerga pontos, apenas features funcionando. A queda da Sprint 2 para a Sprint 3 (87% →
67%) acende um alerta: a equipe começou a deixar mais histórias pela metade, o que é típico de fase
final de projeto onde a complexidade aumenta.
Indicador 2 - Cobertura de testes vs. meta
Como foi obtido: Percentual de cobertura de testes medido pelo Jest (coverage report) ao fim de cada
sprint, comparado com a meta definida no Planning anterior.
Valores: Sprint 1 = 38% (meta 50%, gap -12pp), Sprint 2 = 52% (meta 55%, gap -3pp), Sprint 3 = 58%
(meta 60%, gap -2pp).
Para que serve: Mostra a maturidade da disciplina de testes e o risco de regressão. O gap está
diminuindo (de -12pp para -2pp), o que indica que o time está aprendendo a estimar testes com mais
realismo. Para a Sprint 4 definimos meta de 65% - incremento de 7 pontos percentuais, coerente com a
curva observada e com a alocação de 5 pts dedicados à história #22c.
Indicador 3 - Histórias com retrabalho
Como foi obtido: Contagem manual no Taiga de histórias que voltaram de "Ready for test" para "In
progress" pelo menos uma vez antes de fechar.
Valores: Sprint 1 = 2 (29% das concluídas), Sprint 2 = 1 (14%), Sprint 3 = 2 (50%).
Para que serve: Identifica problemas no Definition of Done. O salto de 14% para 50% na Sprint 3 indica
que o time está entregando coisa que não está realmente pronta. As duas histórias com retrabalho
foram justamente as de UI (acessibilidade e push notifications), que não tinham critérios visuais claros.
Daí a ação de exigir protótipo no Figma como Definition of Ready, registrada na retro.
- Decisões da Sprint 4 baseadas nos indicadores
Cada decisão abaixo está ancorada em pelo menos um dos indicadores discutidos. Não foram decisões
arbitrárias.
DecisãoIndicador / dado que motivou
Reduzir o planejado para 26 pts (capacidade 32
pts, margem de 6)
Velocity caiu de 84% para 79% na Sprint 3. Como é a
última sprint, não dá pra arriscar superplanejar.
Margem maior protege a entrega final.
Não incluir features novas, apenas carryovers e Taxa de conclusão caiu de 87% para 67% na Sprint 3.

DecisãoIndicador / dado que motivou
estabilizaçãoO time está deixando coisas pela metade. Forçar
foco em terminar o que já existe.
Reservar 5 pts (#22c) e 3 pts (#31) para qualidade
- quase 1/3 da sprint
Coverage está em 58% (gap -2pp da meta) e histórias
com retrabalho subiram para 50%. A relação direta
entre falta de testes e retrabalho justifica o
investimento.
Tornar spike técnico obrigatório no Definition of
## Ready
Push notifications travou em 60% na Sprint 3 pela
mesma razão que testes travaram na Sprint 2: falta
de exploração prévia da tecnologia. Padrão se
repetindo = ação estrutural.
Exigir protótipo Figma para histórias de UI antes
do Planning
Das 2 histórias com retrabalho na Sprint 3, ambas
eram de UI sem protótipo. Comparação lado a lado
(#29) foi descartada justamente por não ter sido
prototipada.
Alocar Mario sozinho em push notifications, sem
outras tarefas críticas
Mario teve 57% de conclusão na Sprint 1 quando
dividido em várias frentes. Pair programming na
Sprint 2 elevou pra 100%. Na Sprint 4 ele assume
sozinho mas com escopo único e check-ins diários.
Incluir feedback da Desbravador como história
prioritária (#32)
A parceria com a empresa é uma das poucas
validações externas reais do projeto. Filtro por preço
foi pedido explícito e tem baixa complexidade
técnica (3 pts), boa relação custo-benefício.
Resumo: A Sprint 4 foi planejada para encerrar o ciclo do projeto com previsibilidade. Os indicadores
apontaram que o time amadureceu em velocity e cobertura de testes, mas regrediu em completude de
histórias. A resposta foi reduzir escopo, blindar carryovers e investir pesado em qualidade - mesmo
abrindo mão de features que estavam no radar inicial.
Equipe Monte Online PC+
## Erico Campos Kempfer  |  Vitor Benedett Caldas  |  Artur Zanoello
Lucas Sehn Klauck  |  Vinicius de Moraes Franzen Cordeiro  |  Mario Antonio Fribel
Universidade Comunitária da Região de Chapecó - Maio de 2026