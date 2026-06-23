

Relatório de Sprint 5
Plataforma de Montagem de Computadores
Monte Online PC+ | Abex V: Projeto Integrado II | Junho de 2026

- Nome dos integrantes do grupo

## • Érico Campos Kempfer
## • Vitor Benedett Caldas
## • Artur Zanoello
## • Lucas Sehn Klauck
- Vinicius de Morais Franzen Cordeiro
## • Mario Antonio Fribel

- O que foi proposto durante a sprint

A Sprint 5 foi a primeira sprint de pós-entrega do projeto. O MVP foi formalmente apresentado em 27/05
e a Sprint 4 fechou bem (velocity 85%, taxa de conclusão de histórias em 86%), então o time entrou
nesta sprint com um objetivo diferente das anteriores: ao invés de adicionar funcionalidades novas,
fechar os débitos técnicos pendentes e implementar duas melhorias prioritárias vindas do feedback
recebido na apresentação final.
Os débitos eram conhecidos. A validação do push notifications no iOS, que ficou só com código pronto
na Sprint 4 porque não tínhamos conta de desenvolvedor Apple, era o item de maior peso técnico. A
documentação técnica, que veio sendo apontada como ponto fraco desde a Sprint 2, precisava de uma
resolução definitiva. E o bug de validação de email no cadastro, identificado pela própria audiência
durante a apresentação, precisava ser corrigido.
Nesta sprint foi proposto:
- Resolver acesso à conta de desenvolvedor Apple, idealmente via convênio com a universidade, e
validar o push notifications no iOS em dispositivo real.
- Finalizar a documentação técnica de todos os módulos do projeto (autenticação, montagem,
instalação e arquitetura geral).
- Corrigir o bug de validação de email no cadastro.
- Implementar a categorização de montagens por uso (Gamer, Escritório, Design), pedido
recorrente da Desbravador e mencionado também na apresentação.
- Implementar melhorias de UX no fluxo de comparação de preços (botão de atualizar mais visível).
- Gerar APK assinado e publicar no GitHub Releases para distribuição interna.

O total planejado foi de 23 pontos, com capacidade de 28. A margem maior que sprints anteriores foi
proposital por dois motivos. Primeiro, o time estava em fim de semestre com provas finais de outras
matérias chegando, então a motivação podia oscilar. Segundo, sabíamos que a conta Apple tinha risco
burocrático alto, e queríamos espaço para reagir caso o caminho via universidade não destravasse.
- Quais atividades foram realizadas
Durante a sprint, o grupo executou as seguintes atividades:
- Tentativa de obtenção da conta de desenvolvedor Apple via convênio da universidade. O Érico
enviou pedido formal à DTI no início da sprint e acompanhou o processo passando por três áreas
diferentes da instituição.
- Acionamento do plano B no meio da sprint, quando ficou claro que o caminho institucional não
destravaria em tempo. O Érico assumiu pessoalmente o custo de USD 99/ano da conta de
desenvolvedor Apple, que foi ativada na hora.
- Configuração dos certificados de APNs e validação completa do push notifications iOS em
dispositivo real (iPhone 14 do próprio Érico).
- Implementação da categorização de montagens por uso, com migration no Supabase para
adicionar o campo categoria na tabela montagens, UI de filtro na listagem e seleção de categoria
no fluxo de criação. Trabalho conduzido em pair programming entre Artur e Vinicius.
- Correção do bug de validação de email no cadastro pelo Lucas, com expansão de escopo para
incluir o fluxo de recuperação de senha, que tinha a mesma fragilidade.
- Finalização da documentação técnica completa do projeto, dividida em três frentes: módulo de
autenticação pelo Lucas, módulo de montagem pelo Vitor e guia de instalação e arquitetura
geral pelo Érico.
- Implementação das melhorias de UX no fluxo de comparação de preços, com botão de atualizar
mais visível e indicador de última atualização.
- Configuração do keystore Android, geração do APK assinado e publicação da versão 1.0.0 no
GitHub Releases para distribuição interna.
- Setup do snapshot testing com Jest pelo Artur, ação que veio da retrospectiva da Sprint 4 para
evitar bugs de regressão visual.
- Atualização do Definition of Done pelo Vitor para incluir documentação como critério obrigatório
de fechamento de história.
- Quais foram os principais desafios

A sprint teve menos surpresas técnicas que as anteriores justamente por ser conservadora no escopo,
mas os desafios que apareceram foram bem específicos:
- Burocracia da conta Apple via universidade: o pedido passou por três áreas distintas (DTI,
coordenação do curso e setor financeiro) sem chegar a uma resposta clara até o décimo dia de

sprint. Foi a primeira vez que o time teve que lidar com um bloqueio que não era técnico, e
demorou para entendermos quando era hora de desistir do caminho institucional e seguir para o
plano B.
- Custo pessoal do plano B: o Érico bancou os USD 99 da conta pessoal de desenvolvedor para
destravar o Mario. É uma solução pragmática mas não escalável, e foi tratada como dívida
coletiva do time.
- Bloqueio do Mario na primeira metade da sprint: enquanto a conta Apple não destravava, o
Mario ficou em modo de pesquisa e preparação. Para não desperdiçar tempo, ele assumiu
tarefas secundárias como apoio na implementação do APK assinado e revisão de código dos
outros devs.
- Pressão de tempo no fim da sprint: como a conta Apple só ficou disponível faltando 4 dias para o
fim, o Mario teve uma janela curta para configurar certificados, gerar build, instalar no
dispositivo e validar. Funcionou, mas exigiu trabalho concentrado no fim de semana.
- Migration da categorização: ao aplicar a migration que adicionava o campo categoria na tabela
montagens, o time teve que decidir o que fazer com as montagens existentes que não tinham
categoria definida. Decidimos por uma categoria padrão chamada "Geral" e ajustamos a UI para
permitir reclassificação.
- Documentação técnica como tarefa coletiva: dividir a documentação entre três pessoas
funcionou, mas exigiu padronização no formato. O Vitor centralizou a revisão final para garantir
consistência entre os três módulos.
- O que o grupo conseguiu concluir
A Sprint 5 entregou 100% das histórias planejadas, fechando todos os débitos técnicos pendentes do
projeto.
## Concluído:
- Push notifications iOS validado em dispositivo real, com testes manuais confirmando
recebimento da notificação quando há variação de preço.
- Documentação técnica completa em todos os módulos do projeto, com READMEs revisados e
guia de instalação detalhado.
- Bug de validação de email corrigido no cadastro e no fluxo de recuperação de senha.
- Categorização de montagens por uso (Gamer, Escritório, Design e Geral) implementada e
funcional, com filtro na listagem e seleção na criação.
- Melhorias de UX no fluxo de comparação de preços implementadas.
- APK assinado da versão 1.0.0 publicado no GitHub Releases.
- Snapshot testing configurado e integrado no pipeline para evitar regressões visuais.

Sobre indicadores ao longo do semestre, a Sprint 5 fechou com velocity de 100% das histórias planejadas
(23 de 23 pontos entregues), continuando a curva de melhoria do time. A taxa de conclusão de histórias foi

de 100% (8 de 8 histórias). A cobertura de testes subiu de 64% (Sprint 4) para 70% (Sprint 5), batendo a
meta de 70% que tínhamos definido. Não houve bugs de regressão graves nem retrabalho significativo.
O caminho do semestre fica claro nos números: velocity 70% na Sprint 1, depois 84%, 79%, 85% e agora
100% (do planejado).
Nenhuma atividade ficou faltando. A única ressalva é que a validação do push iOS foi possível graças ao
plano B (conta pessoal do Érico) e não pelo caminho ideal (convênio universitário). Funcionalmente o
resultado é o mesmo, mas como aprendizado fica registrado que a estrutura institucional não
acompanhou o ritmo do projeto.
- O que cada integrante aprendeu durante a sprint

## Érico Campos Kempfer
Essa sprint me ensinou bastante sobre navegar burocracia institucional. Tentar destravar a conta Apple
via universidade me obrigou a entender como funcionam os processos internos da instituição, e a lição
clara foi que esses caminhos precisam ser tentados com semanas de antecedência, não em prazo
apertado de sprint. Também aprendi que às vezes o plano B precisa ser ativado antes do que o time
gostaria de admitir.
## Vitor Benedett Caldas
Tive a chance de fechar uma reflexão que vinha desde o começo do semestre. As métricas que coletamos
sprint após sprint formaram uma curva clara de maturação, e ver isso refletido na Sprint 5 (que foi a mais
previsível de todas) reforçou pra mim que processo bem aplicado entrega resultado. Também aprendi
muito ao revisar documentação de código que não foi escrito por mim, e isso me deu uma visão melhor
da arquitetura geral do projeto.
## Artur Zanoello
Aprofundei meus conhecimentos em snapshot testing, que era um território novo. A parte mais valiosa
foi entender que ferramentas de teste exigem ajuste fino para serem úteis na prática, não basta plugar e
usar. Configurações como serializers e ignore patterns fazem diferença real entre um teste útil e um teste
que vira ruído. Também tive a satisfação de ver o Vinicius assumir mais responsabilidade no pair
programming durante a categorização.
## Mario Antonio Fribel
Essa sprint foi um exercício de paciência. Passei a primeira metade bloqueado pela conta Apple e tive
que aprender a ser produtivo dentro do bloqueio, fazendo pesquisa, documentação e apoio em tarefas
secundárias. Quando a conta finalmente saiu, consegui validar o push em dispositivo real em três dias, o
que mostra que a preparação prévia valeu a pena. Aprendi também que conta Apple é coisa séria e que
projetos mobile precisam considerar esse custo desde o início.
Vinicius de Morais Franzen Cordeiro

Senti uma diferença grande de confiança em comparação com o começo do semestre. Na história da
categorização, fui responsável por boa parte da implementação da UI praticamente sozinho, com o Artur
fazendo só revisão. Aprendi sobre useReducer para gerenciar estado complexo de filtros, sobre
migrations no Supabase e principalmente sobre como dividir uma história em pequenas entregas
testáveis. Sair desta sprint com uma feature inteira no meu nome no histórico de commits é motivo de
orgulho.
## Lucas Sehn Klauck
Aprendi na prática que bug aparentemente simples pode esconder cascata. A correção do bug de
validação de email que parecia ser meia hora de trabalho acabou consumindo um dia inteiro porque
descobri que o mesmo problema afetava a recuperação de senha. Foi um lembrete bom sobre por que
vale a pena escrever testes de borda mesmo em funcionalidades que parecem triviais. Também
participei ativamente da documentação do módulo de autenticação e isso me forçou a entender o código
a fundo.
- Opinião do grupo sobre a sprint
O grupo considera a Sprint 5 a mais previsível e menos estressante do projeto. Pela primeira vez no
semestre, o time terminou uma sprint sem corrida de última hora nem ajustes emergenciais, com 100%
das histórias planejadas entregues e zero bugs de regressão. O escopo conservador, definido com base
nos dados das sprints anteriores, foi decisivo para esse resultado.
A história da conta Apple foi o ponto de tensão, mas também ensinou algo importante: nem todo
bloqueio é técnico, e quando o caminho ideal não destrava, é preciso ter coragem de seguir para o plano
B antes do prazo apertar. O Érico bancar o custo pessoal não é solução ideal, mas foi a decisão correta
dada a situação. O time reconhece e agradece o gesto, que vai ser registrado também no relatório final
do projeto.
Olhando o semestre inteiro, é curioso ver a evolução. Saímos da Sprint 1 com 70% de velocity e
cobertura de testes de 38%, com histórias de 8 pontos travando e devs com 57% de conclusão.
Chegamos na Sprint 5 com 100% das histórias entregues, 70% de cobertura de testes, todos os membros
próximos de 100% de conclusão e um time que confia no próprio processo. Essa progressão é o que o
projeto entregou de mais valioso, mais até que o app em si.
A semana de transição da Sprint 5 para a entrega final do projeto também trouxe um clima de
fechamento. Foi a última cerimônia formal de planning e a última sprint formal do projeto. O time
aproveitou para celebrar pequenas vitórias e marcos individuais antes de partir para a consolidação do
relatório final, que será o trabalho da próxima semana.
- Sugestões de melhoria

Mesmo sendo a sprint mais tranquila do projeto, ainda existem pontos onde o grupo enxerga espaço
para aprender ou recomendar para projetos futuros:

- Levantar dependências externas pagas no início do projeto. A conta de desenvolvedor Apple,
certificados, infraestrutura em nuvem, contas de APIs pagas: tudo isso precisa estar mapeado na
primeira sprint, com decisão clara sobre quem financia e em que prazo. Tratar isso como parte
do escopo, não como detalhe administrativo.
- Estabelecer canais institucionais antes de precisar deles. Se tivéssemos aberto contato com a DTI
da universidade na primeira sprint, e não no meio da Sprint 5, talvez o convênio tivesse saído a
tempo. A burocracia precisa de tempo para acontecer.
- Manter a prática de exigir protótipo Figma como Definition of Ready para histórias de UI. Essa
regra, criada na retro da Sprint 3, foi a única mudança de processo que reduziu retrabalho de
forma mensurável (de 50% para 14% e depois 0%).
- Investir em snapshot testing desde o início em projetos mobile. Configuramos só na Sprint 5 e
isso já gerou valor imediato. Em sprints anteriores, bugs de regressão visual no dark mode
poderiam ter sido evitados.
- Documentar continuamente, não no fim. A Sprint 5 mostrou que dedicar tempo formal para
documentação dentro da sprint funciona. Em sprints anteriores, a documentação ficava como
dívida porque nunca era prioridade explícita.
- Reservar uma sprint específica para fechamento e polimento ao fim do projeto. Foi exatamente o
que fizemos com a Sprint 5, e o resultado foi muito superior ao que seria se tivéssemos
espremido tudo na Sprint 4. Recomendamos essa prática para qualquer projeto acadêmico ou
profissional com prazo definido.



Equipe Monte Online PC+
Universidade Comunitária da Região de Chapecó
Sistemas de Informação
Chapecó, 16 de junho de 2026