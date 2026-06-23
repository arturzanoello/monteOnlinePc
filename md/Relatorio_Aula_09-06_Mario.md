

Relatório de Atividades em Aula
Abex V: Projeto Integrado II - Monte Online PC+
## Aluno: Mario Antonio Fribel
Papel no projeto: Desenvolvedor (DEV)
## Data: 09/06/2026
Sprint atual: Sprint 5 (02/06 a 16/06/2026)
Atividades desenvolvidas
Como a história #36 (validar push notifications no iOS em dispositivo real) depende do
destravamento da conta Apple pelo Érico, gastei a aula em atividades de pesquisa e
preparação. Investiguei se existe alguma alternativa viável ao APNs sem conta paga e
revisei o código nativo do FCM no iOS para confirmar que está pronto para o teste assim
que a conta sair. Também aproveitei para documentar o que já foi implementado no
## Android.
Resultados obtidos
Documento de pesquisa com 3 alternativas mapeadas: conta Apple compartilhada do time,
simulador iOS (com limitações conhecidas no push) ou descartar iOS no MVP atual.
Documentação do código Android do FCM atualizada e revisada.
Dificuldades encontradas
É   frustrante   estar  dependente   do  desbloqueio  da   conta   para   destravar  minha   história
principal. Sem a conta, não consigo gerar os certificados de APNs e nada na prática avança
no iOS.
Próximos passos
Aguardar o retorno do Érico até 11/06 para definir o caminho. Se a conta não destravar até
lá, vou conversar com o Vitor para pegar uma tarefa secundária e contribuir em outra
frente, provavelmente apoiando o Lucas no #40 ou preparando o keystore Android para o
## #41.