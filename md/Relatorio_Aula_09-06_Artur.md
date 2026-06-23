

Relatório de Atividades em Aula
Abex V: Projeto Integrado II - Monte Online PC+
## Aluno: Artur Zanoello
Papel no projeto: Desenvolvedor (DEV)
## Data: 09/06/2026
Sprint atual: Sprint 5 (02/06 a 16/06/2026)
Atividades desenvolvidas
Trabalhei em duas frentes durante a aula. A primeira foi pair programming com o Vinicius
na história #39 (categorização de montagens por uso), onde eu mexi na migration do
Supabase para adicionar o campo categoria na tabela montagens e o Vinicius implementou
a UI do filtro. A segunda frente foi configurar o snapshot testing com Jest, que era uma
ação da retrospectiva da Sprint 4 com prazo dentro da sprint atual, justamente para evitar os
bugs de regressão visual que tivemos no dark mode.
Resultados obtidos
Migration aplicada e testada com dados existentes, sem perda. Snapshot tests configurados
para 4 componentes principais do app (Header, BottomTab, MontagemCard, PecaCard).
Pair programming com o Vinicius rendeu o filtro de categoria já funcional na listagem.
Dificuldades encontradas
A configuração inicial do snapshot testing gerou muitos falsos positivos por diferenças
sutis de renderização entre versões do React Native. Precisei ajustar o serializer e fixar a
versão de algumas libs para estabilizar.
Próximos passos
Continuar a história #39 com a tela de seleção de categoria ao criar uma nova montagem,
novamente em pair com o Vinicius. Refinar os snapshot tests para reduzir flakiness e
integrar no pipeline antes de fechar a sprint.