# Validação da versão 0.4

Verificação em 21 de novembro de 2026.

- 15 testes unitários JavaScript, incluindo valores de moedas, registros no chão,
  compatibilidade de saves antigos e equipamento retirado persistido.
- 21 cenários de integração com DOM/Canvas de teste: jornada e combate anteriores,
  interface, cursores, 14 encaixes, 48 espaços, seções e equipar/retirar.
- A janela de moedas começa fechada; sem clique de abertura, confirmar não faz nada.
- Cancelar não altera o saldo. Zero, negativos, frações, texto e valores maiores
  que o saldo são rejeitados. Máximo usa o saldo atual e confirmar revalida o saldo.
- Confirmar retira uma vez, cria uma pilha, salva, restaura e permite recolher uma vez.
- Os cenários também executaram com Canvas nativo e as imagens carregadas; isso
  verifica desenho de ícones/prévia e execução, sem validar o layout CSS do navegador.
- Teste Python de conversão CUR/ANI mantém transparências e hotspots.
- Scripts finais e ZIP verificados, assets e código embutidos sem pedidos de rede.

A prévia gerenciada falhou na rota do navegador. Não foi possível revisar visualmente
a interface completa em navegador real nesta sessão, nem testar por duplo clique
no Windows/macOS. Os testes simulados e com Canvas nativo não substituem essa revisão.

É um protótipo offline: o chat permanece local e o salvamento usa localStorage,
com exportação/importação. Pilhas próprias de moedas são incluídas no mesmo snapshot
do personagem, com até 120 segundos de simulação restante e limite de 200 pilhas.
Servidor autoritativo e persistência online ainda não fazem parte desta entrega.
