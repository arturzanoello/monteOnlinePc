

Relatório das Cerimônias
## 1. Identificação
## ● Sprint: Sprint 3
## ● Data: 14/04/2026
● Participantes: Erico Campos Kempfer (GP), Vitor Benedett Caldas (SM), Lucas Sehn
Klauck (PO), Artur Zanoello (DEV), Mario Antonio Fribel (DEV), Vinicius de Morais
Franzen Cordeiro (DEV)
- Pós-Sprint (Retrospectiva)
O que funcionou bem (Glad)
● Clima da Sprint (uma palavra cada):
Erico: Evolução | Vitor: Ritmo | Lucas: Foco | Artur: Produtivo | Mario: Confiante |
## Vinicius: Aprendizado

O que funcionou bem:
- Pair programming entre Artur e Vinicius/Mario deu muito certo. A produtividade dos
dois devs menos experientes subiu bastante comparando com a Sprint 1.
- Performance do app melhorou de 4.8s pra 1.9s de carregamento, que era o principal
objetivo técnico da sprint.
- Lazy loading e skeleton UI ficaram visivelmente melhores na experiência do usuário.
- Comunicação no grupo do WhatsApp foi mais ativa, com updates diários mesmo sem
daily formal.
- Sprint Planning da Sprint 2 foi mais realista (27 pts vs capacidade 32), o que ajudou a
não sobrecarregar o time.
## ●
O que não funcionou (Mad/Sad)
## ● Mad:
- API de preços externa caiu duas vezes durante a sprint. Perdemos tempo debugando
achando que era bug nosso.
- Coverage de testes ficou em 52%, abaixo da meta de 55%. A história de testes
automatizados ficou parcialmente incompleta.

## Sad:
- Horários do time ainda são complicados. Mario e Vinicius trabalham, então reuniões
só rolam à noite. Nem sempre todo mundo consegue.
- A documentação do código continua fraca. Ninguém quer parar pra documentar
porque parece perda de tempo.
- O Vinicius ainda tem dificuldade com React Native, mesmo com o pair. Progresso
existe mas é lento.
## ●
Causas identificadas

● Problema 1: Testes automatizados ficaram incompletos (52% vs meta 55%)
Por quê? A história de testes (#22) foi subestimada em pontos.
Por quê? Não consideramos a curva de aprendizado do Jest com React Native.
Por quê? Ninguém do time tinha experiência real com testes em RN.
Por quê? Na Sprint 1 não tínhamos testes, então não tinha referência.
Causa raiz: Falta de experiência prévia com testing em mobile. Precisamos de spike
técnico antes de estimar histórias novas.

Problema 2: Dependência da API externa de preços causou retrabalho
Por quê? A API ficou fora do ar e não tínhamos fallback.
Por quê? O design original assumia que a API seria estável.
Por quê? Não fizemos análise de risco da integração.
Por quê? O PO priorizou velocidade de entrega sobre resiliência.
Causa raiz: Falta de análise de risco nas dependências externas. Precisamos de
mock/cache local.
## ●
Ações definidas
## Ação Responsável Prazo
Fazer spike técnico de 2h
sobre Jest + React Native
Testing Library antes de
estimar histórias de teste
## Artur 16/04/2026
Implementar cache local
(AsyncStorage) para dados
da API de preços com TTL de
30 min
## Mario 21/04/2026
Criar template básico de
documentação (README por
módulo) e dedicar 30min por
história pra documentar
Vitor (SM) 18/04/2026

- Pré-Sprint (Planning)
Objetivo da Sprint
● Sprint Goal: "Completar a cobertura de testes para 60%, implementar notificações
push de alerta de preço, e entregar o fluxo de avaliações de usuário."
● Contexto: A Sprint 2 deixou a base técnica sólida (performance ok, lazy loading,
skeleton). Agora o foco é qualidade (testes) e novas features que agregam valor pro
usuário final (notificações e avaliações).
Itens priorizados
● Priorização por MoSCoW + votação do time:


## Must Have:
- #22b Completar testes automatizados (carry over Sprint 2) - cobertura de 52% para
## 60%
- #25 Push notifications para alertas de variação de preço
- #26 Tela de avaliações/reviews de componentes

## Should Have:
- #27 Cache local de preços com fallback offline
- #28 Melhorias de acessibilidade (contraste, font scaling)

## Could Have:
- #29 Tela de comparação lado a lado (2 builds)

Won't Have (esta sprint):
- #30 Integração com marketplace externo (complexidade alta, depende de API de
terceiros)
## ●
## Estimativas
## Item Estimativa
#22b Completar testes automatizados 5 pts
#25 Push notifications de preço 8 pts
#26 Tela de avaliações/reviews 5 pts
#27 Cache local de preços 3 pts
#28 Melhorias de acessibilidade 3 pts
#29 Comparação lado a lado 5 pts
- Observações gerais
● Riscos identificados:
- Push notifications dependem de configuração do Firebase Cloud Messaging, que
nenhum dev configurou antes.
- A história de comparação (#29) pode estourar se o layout responsivo complicar.
- API de preços continua instável. O cache local (#27) mitiga, mas precisa ser priorizado
cedo na sprint.
## ● Dependências:
- #25 (push) depende de #27 (cache) estar pronto pra não disparar notificação com
preço desatualizado.
- #22b (testes) depende do spike técnico definido no plano de ação da retro (prazo
## 16/04).
- Conta do Firebase precisa ter billing ativado pro FCM funcionar (Lucas vai resolver até
## 15/04).
● Pontos de atenção:
- Capacidade total: 32 pts. Total planejado: 29 pts. Margem de 3 pts pra imprevistos.
- Vinicius vai continuar em pair com Artur nas histórias de teste.
- Mario assume push notifications sozinho (já tem experiência com Firebase do
estágio).
- Sprint tem 2 semanas (14/04 a 28/04). Review marcada pra 28/04 às 19h.

- Avaliação (ROTI)
● Média do time: 4.2 / 5.0

Notas individuais:
Erico (GP): 4 - "Reunião foi produtiva, conseguimos fechar tudo. Só achei a retro um
pouco longa."
Vitor (SM): 5 - "Melhor planning que a gente fez até agora. O MoSCoW ajudou muito a
priorizar."
Lucas (PO): 4 - "Gostei do 5 Porquês, deu pra entender os problemas de verdade.
Planning poker foi rápido."
Artur (DEV): 5 - "As dinâmicas deixaram a reunião menos chata. Saí sabendo
exatamente o que fazer."
Mario (DEV): 4 - "Valeu a pena, mas podia ser 15 min mais curta. A parte do MoSCoW
demorou um pouco."
Vinicius (DEV): 3 - "Achei ok, mas eu ainda fico meio perdido nas estimativas. Preciso
estudar mais o projeto."
## ● Feedbacks:
- Manter o formato MoSCoW pra próximas plannings (consenso do time).
- Retro com 5 Porquês funcionou melhor que só listar problemas. Manter.
- Sugestão: limitar retro a 40 min (dessa vez passou de 50 min).
- Vinicius pediu um "glossário" dos termos técnicos pra se sentir mais confiante nas
discussões.