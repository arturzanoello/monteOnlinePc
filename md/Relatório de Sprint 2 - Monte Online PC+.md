

Relatório de Sprint 2 – Plataforma de
Montagem de Computadores
Monte Online PC+ | Abex V: Projeto Integrado II | Abril de 2026
- Nome dos integrantes do grupo
## Érico Campos Kempfer
## Vitor Benedett Caldas
## Artur Zanoello
## Lucas Sehn Klauck
Vinicius de Morais Franzen Cordeiro
## Mario Antonio Fribel
- O que foi proposto durante a sprint
A Sprint 2 teve como objetivo principal resolver os problemas identificados na Sprint 1, com
foco  em  três  frentes: performance do  aplicativo, conclusão das  histórias que  ficaram
pendentes e criação de uma base de testes automatizados.
Na Sprint 1, a equipe atingiu uma velocity de 70% (28 de 40 story points), e as duas histórias
que  não  foram  concluídas eram  justamente as  mais  complexas: otimização de  tempo de
carregamento e notificações de variação de preço. Além disso, o tempo de carregamento da
tela de seleção de peças estava em 4,8 segundos, bem acima da meta de 2 segundos, o que
prejudicava bastante a experiência do usuário.
Com base nessa análise, o grupo decidiu reduzir a capacidade planejada para 32 pontos (em
vez  dos  40  da  Sprint 1)  e  quebrar as  histórias grandes em  sub-histórias menores, de  no
máximo 5 pontos. O backlog da Sprint 2 ficou assim:
Paginação da lista de peças no backend (3 pts) – causa raiz do carregamento lento
Lazy loading de imagens e cache local (3 pts) – imagens representavam 60% do
payload
Skeleton UI (indicador de carregamento) (2 pts) – melhora a percepção de velocidade
07/04/2026, 19:35Relatório de Sprint 2 - Monte Online PC+
file:///C:/Users/vitor/Downloads/Relatorio_Sprint2_MonteOnlinePC.html1/6

Integração com API de preços via polling (5 pts) – carryover da Sprint 1, simplificado
para polling a cada 6 horas
Tela de alertas de preço (3 pts) – lista de peças que tiveram queda de preço
Testes automatizados unitários e de integração (5 pts) – elevar cobertura de 38% para
## 55%
Correção do bug de compatibilidade de socket (3 pts) – placas-mãe LGA 1700
apareciam para CPUs AM5
Correção dos bugs de performance restantes (3 pts) – 2 bugs abertos da Sprint 1
O total planejado foi de 27 pontos, deixando uma margem de 5 pontos para imprevistos dentro
da capacidade de 32.
- Quais atividades foram realizadas
Durante a sprint, as seguintes atividades foram desenvolvidas pela equipe:
Implementação de paginação no backend: a query que carregava todas as 2000+ peças
de uma vez foi substituída por um endpoint paginado, retornando 20 peças por vez. Isso
reduziu significativamente o tempo de resposta da API.
Implementação de lazy loading de imagens: as imagens das peças passaram a ser
carregadas sob demanda conforme o usuário faz scroll, com cache local para evitar
recarregamento desnecessário.
Criação de skeleton screens: enquanto os dados carregam, a tela mostra placeholders
animados ao invés de ficar em branco, melhorando a sensação de velocidade para o
usuário.
Integração com API de preços: o sistema agora consulta preços atualizados de
diferentes fornecedores via polling a cada 6 horas, armazenando os resultados no banco
local. A abordagem de push notifications foi descartada por ser muito complexa para o
escopo do projeto.
Tela de alertas de variação de preço: nova tela que exibe quais peças tiveram redução
de preço desde a última consulta do usuário.
Escrita de testes automatizados: foram criados testes unitários para o módulo de
compatibilidade entre peças e testes de integração para o fluxo de autenticação. A
cobertura subiu de 38% para 52%.
07/04/2026, 19:35Relatório de Sprint 2 - Monte Online PC+
file:///C:/Users/vitor/Downloads/Relatorio_Sprint2_MonteOnlinePC.html2/6

Correção do bug de compatibilidade de socket: o filtro de placas-mãe agora valida
corretamente o tipo de socket (LGA 1700 vs AM5), impedindo que peças incompatíveis
apareçam na listagem.
Correção dos bugs de performance restantes: os dois bugs abertos da Sprint 1 foram
resolvidos, envolvendo otimização de queries e redução de re-renders desnecessários no
## React Native.
Pair programming entre membros: Artur fez pareamento com Vinícius nas tarefas de
paginação e com Mário na integração de API, o que ajudou bastante a desbloquear tarefas
que tinham travado na sprint anterior.
Testes manuais em dispositivos reais: o app foi testado em 3 celulares Android
diferentes para validar a performance e responsividade das melhorias.
- Quais foram os principais desafios
A sprint trouxe alguns desafios que exigiram adaptação por parte da equipe:
Implementar paginação sem quebrar o fluxo de compatibilidade: o maior desafio
técnico da sprint. A lógica de filtro de peças compatíveis dependia de ter todas as peças
carregadas na memória. Com a paginação, foi necessário mover essa lógica para o
backend, criando um endpoint que recebe as peças já selecionadas e retorna apenas as
compatíveis de forma paginada. Levou mais tempo do que o estimado.
Instabilidade da API de preços de terceiros: a API que utilizamos para consultar
preços ficou instável em alguns momentos, retornando timeouts. O grupo precisou
implementar um cache local com fallback para os últimos dados válidos, o que não
estava previsto inicialmente.
Curva de aprendizado com testes automatizados: a equipe tinha pouca experiência
com frameworks de teste (Jest). Escrever testes levou mais tempo do que o esperado, e a
cobertura ficou em 52%, um pouco abaixo da meta de 55%.
Conciliar horários para pair programming: como o projeto é part-time e os
integrantes têm horários diferentes, agendar sessões de pareamento entre Artur/Vinícius e
Artur/Mário exigiu bastante organização.
Debugging de performance no React Native: identificar gargalos de renderização no
app mobile é menos intuitivo do que em web. O grupo precisou aprender a usar o React
DevTools e o Flipper para encontrar componentes que re-renderizavam sem necessidade.
07/04/2026, 19:35Relatório de Sprint 2 - Monte Online PC+
file:///C:/Users/vitor/Downloads/Relatorio_Sprint2_MonteOnlinePC.html3/6

- O que o grupo conseguiu concluir
Ao final da Sprint 2, a grande maioria das histórias planejadas foi concluída com sucesso:
Paginação da lista de peças no backend – concluída
Lazy loading de imagens e cache local – concluída
Skeleton UI – concluída
Integração com API de preços via polling – concluída
Tela de alertas de preço – concluída
Correção do bug de compatibilidade de socket – concluída
Correção dos bugs de performance – concluída
Testes automatizados – parcialmente concluída (cobertura de 52%, meta era 55%)
A  velocity da  Sprint 2  ficou  em 84%  (27  de  32  pontos de  capacidade, com  24  pontos
efetivamente entregues contando a  história de  testes  como  parcial). Isso  representa uma
melhoria significativa em relação aos 70% da Sprint 1.
O tempo de carregamento da tela de peças caiu de 4,8 segundos para 1,9 segundo, ficando
abaixo da meta de 2,5s. Todos os 3 bugs que estavam abertos da Sprint 1 foram resolvidos.
A única atividade que ficou parcialmente pendente foi a cobertura de testes, que atingiu 52%
ao  invés  dos  55%  planejados. Faltaram  alguns testes  de  integração para  o  módulo de
salvamento de montagens, que serão priorizados na próxima sprint.
- O que cada integrante aprendeu durante a sprint
## Érico Campos Kempfer
Aprendi bastante sobre testes automatizados, principalmente como estruturar testes unitários
com Jest e como pensar em casos de teste que realmente cobrem os cenários importantes do
sistema. Também melhorei minha capacidade de coordenar a equipe com base em dados da
sprint anterior.
## Vitor Benedett Caldas
07/04/2026, 19:35Relatório de Sprint 2 - Monte Online PC+
file:///C:/Users/vitor/Downloads/Relatorio_Sprint2_MonteOnlinePC.html4/6

Essa sprint me ajudou a entender melhor como usar métricas para tomar decisões no Scrum. A
análise que  fizemos da  Sprint 1  (velocity,  burndown, taxa  de  conclusão) guiou  todo  o
planejamento da  Sprint 2,  e  o  resultado mostrou que  funciona. Também aprendi sobre
debugging de compatibilidade entre componentes de hardware, ao corrigir o bug do socket.
## Artur Zanoello
Aprendi muito sobre pair programming e como isso pode ser eficiente para destravar tarefas
que  uma  pessoa sozinha levaria muito  mais  tempo. Tecnicamente, aprofundei meu
conhecimento em otimização de queries no PostgreSQL e em como implementar paginação
de dados em uma API REST.
## Lucas Sehn Klauck
Aprendi sobre a importância de escrever casos de teste antes mesmo de programar. Participar
da  escrita dos  testes  me  deu  uma  visão  diferente de  como  validar se  o  sistema está
funcionando corretamente, indo além dos testes manuais que fazíamos antes.
## Mario Antonio Fribel
Essa sprint foi importante para mim porque consegui finalizar a integração com a API de
preços, que tinha travado na Sprint 1. O pair programming com o Artur me ajudou a entender
melhor como lidar com APIs externas instáveis e como implementar cache de fallback.
Vinicius de Morais Franzen Cordeiro
Aprofundei bastante meus conhecimentos em performance de aplicativos mobile. Aprendi a
usar o React DevTools para identificar re-renders desnecessários, implementei lazy loading de
imagens pela  primeira vez,  e  entendi na  prática como  a  paginação no  backend impacta
diretamente a experiência do usuário.
- Opinião do grupo sobre a sprint
O grupo considera que a Sprint 2 foi a mais produtiva até agora. A decisão de reduzir a
capacidade planejada e quebrar histórias grandes em pedaços menores fez muita diferença. Na
Sprint 1, a equipe se frustrou com as duas histórias de 8 pontos que não conseguimos entregar.
Nesta  sprint, com  histórias de  no  máximo 5  pontos, o  ritmo  de  entrega foi  muito  mais
constante.
07/04/2026, 19:35Relatório de Sprint 2 - Monte Online PC+
file:///C:/Users/vitor/Downloads/Relatorio_Sprint2_MonteOnlinePC.html5/6

O pair programming foi outra decisão que deu muito certo. O Mário e o Vinícius, que tinham
ficado com 57% de conclusão na Sprint 1, conseguiram entregar todas as suas tarefas desta
vez. Parear com o Artur ajudou a resolver bloqueios mais rápido e também contribuiu para
nivelar o conhecimento técnico da equipe.
A melhoria de performance foi o ponto alto da sprint. Ver o tempo de carregamento cair de
4,8s para 1,9s foi bastante gratificante e mostrou que as decisões tomadas no planejamento
foram acertadas. O app ficou visivelmente mais rápido e fluido.
O único ponto que poderia ter sido melhor foi a cobertura de testes. Ficamos em 52% ao invés
de 55%, o que não é um desvio grande, mas mostra que ainda precisamos dedicar mais tempo
a essa área nas próximas sprints.
- Sugestões de melhoria
Para as próximas sprints, o grupo sugere as seguintes melhorias:
Manter o limite de 5 pontos por história: a Sprint 2 confirmou que histórias menores
são mais previsíveis. Devemos continuar com essa prática.
Dedicar tempo fixo para testes: reservar pelo menos 20% do tempo da sprint
exclusivamente para testes, ao invés de deixar para o final.
Expandir o pair programming: os resultados foram muito positivos. Sugerimos manter
pelo menos 2 sessões de pareamento por semana, principalmente para tarefas que
envolvem integração entre frontend e backend.
Criar um checklist de "done": definir critérios claros para considerar uma história
como concluída (código revisado, teste escrito, testado em dispositivo real), evitando
entregas parciais.
Melhorar a documentação de API: com a integração de APIs externas, percebemos a
necessidade de documentar melhor os endpoints que criamos, facilitando a manutenção
futura.
07/04/2026, 19:35Relatório de Sprint 2 - Monte Online PC+
file:///C:/Users/vitor/Downloads/Relatorio_Sprint2_MonteOnlinePC.html6/6