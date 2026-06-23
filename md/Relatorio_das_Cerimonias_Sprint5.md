

Relatório das Cerimônias
## 1. Identificação
## ● Sprint: Sprint 5
## ● Data: 02/06/2026
● Participantes: Érico Campos Kempfer (GP), Vitor Benedett Caldas (SM), Lucas
Sehn Klauck (PO), Artur Zanoello (DEV), Mario Antonio Fribel (DEV),
Vinicius de Moraes Franzen Cordeiro (DEV)
- Pós-Sprint (Retrospectiva)
O que funcionou bem (Glad)
● Clima da Sprint (uma palavra cada): Erico - Conquista | Vitor - Maduro | Lucas -
## Orgulho | Artur - Fechamento | Mario - Aliviado | Vinicius - Realização.
● Apresentação final em 27/05 foi muito bem recebida. A equipe da empresa
interagiu bem e gostou, fizeram perguntas técnicas e demos conta de responder
todas com segurança.
● Velocity da Sprint 4 fechou em 85%, melhor resultado do semestre. A taxa de
conclusão de histórias subiu de 67% na Sprint 3 para 86%, validando a decisão
de reduzir escopo e priorizar carryovers.
● Push notifications no Android funcionou redondinho. Os testes em três
aparelhos Android confirmaram que a notificação chega em tempo real quando
há variação de preço maior que 5%.
● Acessibilidade do dark mode atingiu WCAG AA em todos os componentes
principais. A auditoria com axe-core ficou completa e vai ser destacada como
diferencial técnico na apresentação.
● A regra de exigir protótipo Figma como Definition of Ready para histórias de UI
reduziu o retrabalho de 50% na Sprint 3 para 14% na Sprint 4. Vamos manter.
● Pair programming continua dando certo. O Vinicius implementou o filtro por
faixa de preço quase sozinho, só com revisão do Artur. Evolução clara desde o
começo do semestre.
O que não funcionou (Mad/Sad)
● Mad: Push notifications no iOS ficou só com código pronto, sem teste em
dispositivo real. Sem conta de desenvolvedor Apple não foi possível gerar os
certificados de APNs. Virou limitação conhecida no relatório final, mas
incomoda saber que metade da feature não foi validada.
● Mad: Cobertura de testes ficou em 64%, um ponto abaixo da meta de 65%.
Diferença pequena, mas é a terceira sprint seguida que não batemos a meta de
testes na mosca. Algo no nosso processo de estimar testes continua otimista
demais.
● Mad: Durante a correção dos 14 problemas de contraste no dark mode, surgiram
3 bugs de regressão no modo claro. Foram corrigidos a tempo, mas mostrou que
mexer em estilos sem testes visuais automatizados é arriscado.

● Sad: Tivemos que remarcar um ensaio de apresentação porque o app ainda
estava sofrendo alterações de última hora. Stress desnecessário que poderia ter
sido evitado com congelamento de código antes.
● Sad: Documentação técnica continua sendo nosso ponto fraco. Mesmo com
template criado, ficou superficial em vários módulos. Vamos ter que fechar isso
na Sprint 5 ou virar débito permanente.
● Sad: Fim de projeto trouxe um cansaço coletivo perceptível. Vários integrantes
têm provas finais de outras matérias chegando, e a motivação na última semana
caiu. Não impactou a entrega, mas foi sentido.
Causas identificadas
● Problema 1: Push notifications no iOS não foi validado em dispositivo real. Por
quê? Não temos conta de desenvolvedor Apple para gerar certificados. Por quê?
Não foi previsto orçamento para conta paga (USD 99/ano). Por quê? Quando
definimos o escopo na Sprint 1, não levantamos dependências externas pagas.
Por quê? Tratamos o projeto como exclusivamente técnico, sem análise de
viabilidade comercial e dependências. Causa raiz: falta de análise de
dependências externas (contas pagas, APIs, infraestrutura) na fase de descoberta
do projeto.
● Problema 2: Documentação técnica continua superficial mesmo com template
criado na retro anterior. Por quê? Cada dev preenche o README do próprio
módulo só no fim, sem revisão. Por quê? Não tem critério de Definition of Done
que inclua documentação. Por quê? Documentação é vista como tarefa separada,
não como parte da história. Por quê? Estimativas das histórias não consideram
tempo de documentar. Causa raiz: Definition of Done incompleto.
Documentação precisa virar critério explícito de fechamento da história, com
tempo dedicado dentro da estimativa.
Ações definidas
## Ação Responsável Prazo
Atualizar o Definition of
Done para incluir
documentação obrigatória do
módulo afetado pela história,
com revisão por pares.
Vitor (SM) 04/06/2026
Verificar viabilidade de conta
de desenvolvedor Apple via
convênio da universidade ou
conta pessoal compartilhada
do time.
Érico (GP) 06/06/2026
Implementar testes de
regressão visual (snapshot
testing com Jest) nos
componentes que dividem
estilos entre dark e light
mode.
## Artur Sprint 5


- Pré-Sprint (Planning)
Objetivo da Sprint
● Sprint Goal: Estabilizar o app no pós-entrega, resolver as duas limitações
conhecidas do MVP (push iOS e documentação) e implementar as melhorias
prioritárias vindas do feedback da apresentação final.
● Contexto: A Sprint 4 fechou o ciclo principal do projeto com a entrega do MVP
e a apresentação em 27/05. A Sprint 5 não é mais uma sprint de entrega, é uma
sprint de refinamento e fechamento de débitos. O escopo é mais leve (28 pts de
capacidade contra 32 anteriores) porque o time está em fim de semestre com
provas de outras matérias chegando, e o objetivo é entregar polimento, não
funcionalidade nova.
Itens priorizados
● Must Have - #35 Resolver acesso à conta de desenvolvedor Apple (via
universidade ou solução alternativa).
● Must Have - #36 Validar push notifications iOS em dispositivo real (depende de
## #35).
● Must Have - #37 Finalizar documentação técnica de todos os módulos
(READMEs + guia de instalação).
● Must Have - #38 Corrigir bug encontrado na apresentação: cadastro aceita email
com formato inválido.
● Should Have - #39 Categorização de montagens por uso (Gamer, Escritório,
Design). Pedido recorrente da Desbravador e do público da apresentação final.
● Should Have - #40 Melhorias de UX no fluxo de comparação de preços (botão
de atualizar mais visível).
● Could Have - #41 Gerar APK assinado e publicar no GitHub Releases para
distribuição interna.
● Won't Have nesta sprint: publicação na Play Store / App Store (depende de
contas pagas e processo de revisão longo) e integração com marketplace externo
(fora de escopo definido no início do projeto).
## Estimativas
## Item Estimativa
#35 Conta de desenvolvedor Apple (via
universidade ou alternativa)
2 pts
#36 Validação de push notifications no iOS
em dispositivo real
3 pts
#37 Documentação técnica completa
(READMEs + guia de instalação)
5 pts
#38 Fix bug de validação de email no
cadastro
2 pts
#39 Categorização de montagens por uso 5 pts
#40 Melhorias de UX no fluxo de
comparação de preços
3 pts
#41 Gerar APK assinado e publicar no
GitHub Releases
3 pts

TOTAL 23 pts
- Observações gerais
● Riscos identificados: conta de desenvolvedor Apple pode demorar se o caminho
for via convênio da universidade (processo burocrático). Plano B é dividir custo
entre os integrantes para uma conta pessoal compartilhada do projeto. Motivação
do time pode oscilar com proximidade de provas finais. Bug do email pode ter
ramificações no fluxo de recuperação de senha. Categorização de montagens
(#39) toca em estrutura do banco de dados (campo novo em montagens),
migration precisa ser testada com dados existentes.
● Dependências: #36 (push iOS validação) depende inteiramente de #35 (conta
Apple). Se #35 não destravar até 06/06, descartamos #36 da sprint. #41 (APK
assinado) depende de configurar keystore Android, que ainda não foi feito.
Tarefas de documentação (#37) precisam de acesso ao código mais recente de
cada módulo, então o pessoal de doc deve sincronizar com o autor original do
código.
● Pontos de atenção: capacidade total é 28 pts (reduzida em relação aos 32 da
Sprint 4). Total planejado 23 pts, margem de 5 para imprevistos. Sprint tem 2
semanas: 02/06 a 16/06/2026, com review e retro juntos em 16/06 às 19h. Mario
continua focado em push notifications com check-ins curtos a cada dois dias.
Documentação (#37) dividida entre Lucas (módulo de autenticação), Vitor
(módulo de montagem) e Érico (guia de instalação). Pair programming entre
Artur e Vinicius continua na história #39.
- Avaliação (ROTI)
● Média do time: 4.0 / 5.0. Notas individuais: Érico (GP) 4, cerimônia produtiva,
reflexão sobre o que ficou foi útil, poderíamos ter celebrado mais a entrega do
MVP. Vitor (SM) 4, 5 Porquês continua entregando insights bons, as duas causas
raiz que encontramos são estruturais. Lucas (PO) 4, MoSCoW deixou claro o
que era essencial. Artur (DEV) 5, bom alinhamento, tarefas claras. Mario (DEV)
3, reunião ok, mas preocupado com a Apple, se não conseguir a conta vou ter
passado duas sprints na mesma história. Vinicius (DEV) 4, saí com tarefas
claras, mais confortável agora do que no começo do semestre.
● Feedbacks: Érico sugeriu separar um momento curto de comemoração antes de
cada planning quando a sprint anterior teve entrega significativa, time
concordou. Mario pediu apoio do GP para destravar a parte burocrática da conta
Apple, Érico assumiu como prioridade. Manter o formato de retro com 5
Porquês e MoSCoW no planning, consenso de que esses dois rituais foram os
que mais agregaram valor durante o semestre. Sugestão de Vitor: na próxima
retro (que será a última do projeto), reservar 30 minutos para uma retrospectiva
ampliada de todo o semestre, não só da Sprint 5.