

Relatório de Sprint 4
Plataforma de Montagem de Computadores
Monte Online PC+  |  Abex V: Projeto Integrado II  |  Maio de 2026
- Nome dos integrantes do grupo
•Érico Campos Kempfer
•Vitor Benedett Caldas
•Artur Zanoello
•Lucas Sehn Klauck
•Vinicius de Morais Franzen Cordeiro
•Mario Antonio Fribel
- O que foi proposto durante a sprint
A Sprint 4 é a última sprint do projeto antes da entrega final do Abex V, prevista para 27/05/2026.
Diferente das sprints anteriores, o objetivo aqui não foi adicionar funcionalidades novas, mas sim fechar
débitos técnicos pendentes, estabilizar o aplicativo e preparar todo o material de apresentação.
A decisão de não incluir features novas veio dos dados consolidados das três sprints anteriores. A taxa de
conclusão de histórias caiu de 87% na Sprint 2 para 67% na Sprint 3, e o número de histórias com
retrabalho subiu de 14% para 50% no mesmo período. Esses dois indicadores juntos mostraram que o time
estava entregando coisas pela metade e que era hora de parar de empilhar feature e começar a finalizar o
que já estava em andamento.
Nesta sprint foi proposto:
•Finalizar a integração com Firebase Cloud Messaging para push notifications de variação de preço,
que tinha ficado 60% pronta na Sprint 3.
•Completar a acessibilidade do dark mode, especificamente o contraste de cores, atingindo o nível
## WCAG AA.
•Subir a cobertura de testes automatizados de 58% para 65%, com foco no módulo de salvamento
de montagens e autenticação.
•Testar o app em pelo menos 5 dispositivos físicos diferentes (mix de Android e iOS) para validar
performance e responsividade em hardware real.
•Implementar dois ajustes pequenos solicitados pela equipe da Desbravador na apresentação de
11/05: filtro por faixa de preço e ordenação alfabética na lista de peças.
•Preparar o material de apresentação final: slides, roteiro de demonstração e tela "Sobre" com
créditos do time.

O total planejado foi de 26 pontos, com capacidade de 32. A margem maior que o normal foi proposital
porque, sendo a última sprint, não dava para correr risco de estouro.
- Quais atividades foram realizadas
Durante a sprint, o grupo executou as seguintes atividades:
•Configuração nativa do Firebase Cloud Messaging tanto no projeto Android quanto no iOS. Isso
envolveu mexer no AndroidManifest.xml, configurar o google-services.json, ajustar o Info.plist do
iOS e fazer o link das bibliotecas nativas no React Native.
•Implementação da lógica de envio de notificações quando uma peça salva pelo usuário tem o
preço alterado em mais de 5%.
•Auditoria completa de contraste de cores no dark mode usando o plugin axe-core. Foram
identificados 14 componentes abaixo do WCAG AA, todos corrigidos.
•Escrita   de   testes   unitários   e   de   integração   para   o   módulo   de   salvamento   de   montagens
(montagem_pecas, persistência no Supabase) e para o fluxo de autenticação.
•Testes manuais em 5 dispositivos reais: dois celulares Android dos próprios integrantes (versões
12 e 14), um Android emulado (versão 10), um iPhone 12 emprestado pela irmã do Artur e um
iPhone 14 do Erico.
•Implementação do filtro por faixa de preço, com slider de valor mínimo e máximo, e ordenação
alfabética como opção adicional na lista de peças.
•Criação dos slides de apresentação cobrindo contexto do projeto, arquitetura, demonstração
funcional, métricas das sprints e próximos passos.
•Implementação da tela "Sobre" com nome de todos os integrantes, créditos e versão atual do app
## (1.0.0).
•Ensaio da apresentação em duas rodadas, com cronometragem e ajuste do roteiro de demo.
- Quais foram os principais desafios
A sprint teve menos surpresas que as anteriores justamente porque foi conservadora no escopo, mas
alguns desafios apareceram:
•Configuração nativa do FCM no iOS: foi o maior desafio técnico da sprint. Mesmo com o spike feito
na Sprint 3, a integração com o Apple Push Notification Service exige certificados que dependem
de uma conta de desenvolvedor Apple. Como ninguém do time tinha conta paga, conseguimos
rodar push apenas no Android. No iOS o código está pronto mas não foi possível testar em
produção. Isso foi documentado como limitação conhecida.
•Falta   de   dispositivos   reais   variados:   tínhamos   planejado   testar   em   5   aparelhos   diferentes.
Conseguimos os 5, mas com dificuldade. O iPhone 12 chegou só na última semana, o que
comprimiu o tempo de teste e correção de bugs específicos de iOS.

•Bugs de regressão durante a estabilização: ao corrigir os 14 problemas de contraste do dark mode,
surgiram 3 bugs novos de layout no modo claro. Componentes que dividiam estilos entre os dois
modos não foram atualizados de forma consistente.
•Preparar a apresentação enquanto ainda existia código sendo escrito: o ensaio teve que ser
remarcado uma vez porque o app ainda estava sofrendo mudanças. Aprendizado importante: a
próxima vez, congelar o código pelo menos 3 dias antes do ensaio final.
•Diferença de fuso e disponibilidade dos integrantes na última semana: como vários estão em fim
de semestre com provas de outras matérias, conciliar horários para os ensaios e para os testes em
dispositivos reais foi mais difícil que o normal.
- O que o grupo conseguiu concluir
Apesar dos desafios, o grupo conseguiu fechar a maior parte do escopo da sprint.
## Concluído:
•Push notifications funcionando 100% no Android, com testes manuais validados em 3 aparelhos.
•Acessibilidade do dark mode atingiu WCAG AA em todos os componentes principais.
•Cobertura de testes subiu de 58% para 64%, ficando 1 ponto abaixo da meta de 65%.
•Testes em 5 dispositivos reais executados, com checklist de bugs documentado.
•Filtro por faixa de preço e ordenação alfabética implementados conforme pedido da Desbravador.
•Slides da apresentação prontos, com 14 lâminas cobrindo todo o ciclo do projeto.
•Tela "Sobre" implementada com créditos do time.
•Roteiro de demonstração revisado e ensaiado duas vezes.
Parcialmente concluído ou pendente:
•Push notifications no iOS: código pronto mas não testado em produção por falta de conta de
desenvolvedor Apple. Vai ficar registrado como limitação conhecida no relatório final.
•Cobertura de testes: ficou em 64% ao invés dos 65% planejados. A diferença é mínima, mas o
grupo decidiu não forçar a meta para não comprometer outras entregas.
•Documentação técnica final: as funcionalidades novas desta sprint (push e filtros) ainda precisam
de  ajuste  no  README  do  projeto.  Será  concluído  nos  dois  dias  entre  o  fim   da  sprint  e  a
apresentação.
A velocity da Sprint 4 ficou em 85% (22 de 26 pontos planejados, com a história #25b contando como
parcial). Esse número é coerente com a curva da equipe (70% → 84% → 79% → 85%) e mostra que, mesmo
na última sprint, a equipe manteve previsibilidade.
Mais importante que a velocity: a taxa de conclusão de histórias subiu de 67% (Sprint 3) para 86% (Sprint
4), o que era um dos objetivos principais do planejamento. O número de histórias com retrabalho caiu de

50% para 14%, validando a decisão de exigir protótipo Figma como Definition of Ready para histórias de
## UI.
- O que cada integrante aprendeu durante a sprint
## Érico Campos Kempfer
Aprendi bastante sobre coordenação de entrega final de projeto. Conciliar testes, escrita de slides e
ensaios em paralelo exigiu organização diferente do que tínhamos nas sprints anteriores. Também
aprofundei meu conhecimento em testes com Jest, principalmente em mocks de chamadas ao Supabase.
## Vitor Benedett Caldas
Essa sprint reforçou para mim a importância de planejar com base em dados, não em achismo. As decisões
da Sprint 4 vieram diretamente dos indicadores das anteriores e o resultado mostrou que funcionou.
Também aprendi como organizar testes em dispositivos reais de forma sistemática, com checklist e não só
"abrir o app e mexer".
## Artur Zanoello
Aprendi sobre acessibilidade em React Native de uma forma muito mais profunda. Antes desta sprint eu
só sabia que existia WCAG, mas não tinha noção do quanto pequenos ajustes de cor e contraste impactam
usuários reais. A ferramenta axe-core foi uma descoberta que vou levar pra outros projetos.
## Mario Antonio Fribel
O FCM foi um aprendizado pesado, mas valeu. Aprendi como funciona o ciclo completo de uma push
notification, desde a configuração de certificados até o recebimento no dispositivo. A parte de iOS me
frustrou um pouco por não conseguir testar, mas o código está lá e o conhecimento ficou.
Vinicius de Morais Franzen Cordeiro
Senti uma diferença grande do começo do semestre para agora. Fui responsável pela implementação do
filtro por faixa de preço quase sozinho (só com revisão do Artur) e consegui entregar sem grandes
problemas. Aprendi a usar componentes de slider em React Native e a integrar com o estado global do
app.
## Lucas Sehn Klauck
Aprendi  como  estruturar  uma  apresentação  técnica  para  um  público  misto  (professor  +  colegas  +
potencialmente parceiros externos). Escrever o roteiro de demonstração me forçou a pensar no app do
ponto de vista de quem nunca viu, o que foi um exercício interessante. Também participei ativamente da
escrita dos casos de teste de aceitação, que ajudou bastante o pessoal de teste.

- Opinião do grupo sobre a sprint
O grupo considera a Sprint 4 como a sprint mais madura do projeto. Não a mais agitada nem a com mais
entregas, mas a melhor executada do ponto de vista de processo.
A decisão de não meter feature nova foi a melhor que tomamos. Em todas as sprints anteriores existia
aquela tensão de querer mostrar mais coisa funcionando, e isso quase sempre cobrava o preço de
histórias inacabadas. Nesta sprint, ao assumir que o escopo era "terminar o que existe", o ritmo ficou mais
constante e o final foi muito menos estressante que em sprints anteriores.
A apresentação na Desbravador, no início do mês, também teve peso. Ver gente de fora testando o app
deu uma motivação extra que se sentiu nesta sprint. Saber que o filtro por faixa de preço veio de um
pedido real fez a história se sentir diferente das que vinham só do backlog interno.
Um ponto de orgulho coletivo: a curva de melhoria da equipe ao longo do semestre. Saímos de 70% de
velocity na Sprint 1 para 85% na Sprint 4, com cobertura de testes praticamente dobrada (38% para 64%) e
tempo de carregamento do app reduzido de 4,8s para 1,8s. Não é só código melhor, é processo melhor. As
retrospectivas com 5 Porquês e o MoSCoW no Planning são exemplos de práticas que começamos sem
muita convicção e terminamos defendendo.
O ponto que mais frustrou foi o iOS para push notifications. Não pela parte técnica em si, mas porque
mostrou um limite estrutural do projeto acadêmico: sem orçamento para conta de desenvolvedor Apple,
parte do que produzimos não pode ser validado no mundo real. Aprendizado para projetos futuros: incluir
esses custos no planejamento desde o início.
- Sugestões de melhoria
Apesar da sprint ter sido a mais tranquila, ainda existem pontos onde o grupo enxerga espaço para
melhorar caso o projeto continue ou caso esta experiência sirva para projetos futuros:
•Congelar o código antes de ensaios de apresentação: tivemos que remarcar um ensaio porque o
app ainda estava sendo mexido. Para a próxima vez, regra clara: pelo menos 3 dias sem novas
alterações antes do ensaio final.
•Definir orçamento e dependências externas no início do projeto: a conta de desenvolvedor Apple
é um exemplo do que deveria ter sido identificado lá na Sprint 1, não no fim. O mesmo vale para
APIs pagas, infraestrutura em nuvem e domínios.
•Continuar exigindo protótipo Figma para histórias de UI: essa prática, adotada a partir da retro da
Sprint 3, derrubou as histórias com retrabalho de 50% para 14%. Deve virar regra padrão do time.
•Documentação contínua, não no fim: ainda terminamos a sprint com débito de documentação.
Para próximos projetos, reservar tempo fixo dentro de cada história (10 ou 15 minutos) para
atualizar o README junto com o código.

•Testes em dispositivos reais desde a primeira sprint: deixamos para fazer só na sprint final, e isso
comprimiu o tempo de correção dos bugs encontrados. O ideal seria ter pelo menos 2 aparelhos
de teste rotativos desde o começo.
•Criar um guia técnico de onboarding: como o projeto acabou sendo grande, integrar alguém novo
agora seria complicado. Um documento curto explicando arquitetura, decisões importantes e
como rodar o ambiente teria valor para qualquer continuação do trabalho.
•Comemorar entregas pequenas: este foi um aprendizado mais subjetivo, mas o time concorda. Em
vários   momentos   do   semestre   passamos   batido   por   marcos   importantes   (primeiro   login
funcionando,   primeira   montagem   salva,   performance   otimizada).   Reconhecer   essas   vitórias
mantém a moral do grupo.
Equipe Monte Online PC+
Universidade Comunitária da Região de Chapecó
Área de Ciências Exatas e Ambientais  -  Curso de Engenharia de Produção
Chapecó, 23 de maio de 2026