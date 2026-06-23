

Relatório de Atividades em Aula
Abex V: Projeto Integrado II - Monte Online PC+
Aluno: Vinicius de Moraes Franzen Cordeiro
Papel no projeto: Desenvolvedor (DEV)
## Data: 09/06/2026
Sprint atual: Sprint 5 (02/06 a 16/06/2026)
Atividades desenvolvidas
A aula inteira foi dedicada à história #39 (categorização de montagens por uso) em pair
programming   com   o   Artur.   Enquanto   ele   cuidava   da   migration   no   Supabase,   eu
implementei a UI do filtro de categoria na tela de listagem de montagens. Também estudei
a   estrutura   do   banco   para   entender   como   o   campo   novo   se   relaciona   com   a   tabela
montagens e revisei a documentação do useReducer para gerenciar o estado do filtro.
Resultados obtidos
Filtro de categoria implementado com um dropdown nativo. Componente de listagem agora
aceita a categoria como prop e filtra corretamente. Migration aplicada no meu ambiente
local com sucesso e dados de teste populados.
Dificuldades encontradas
Tive dificuldade inicial com o useReducer para gerenciar o estado do filtro junto com os
outros filtros já existentes (preço, ordenação). O Artur me explicou o padrão e isso
destravou, mas me lembrou que ainda preciso estudar mais sobre gerenciamento de estado.
Próximos passos
Implementar a tela de seleção de categoria ao criar uma nova montagem, ainda em pair com
o Artur. Testar o fluxo completo de filtro com dados reais e gravar um vídeo curto da
feature funcionando para mostrar na próxima daily.