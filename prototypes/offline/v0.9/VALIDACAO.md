# Validação da versão 0.9

21 de novembro de 2026.

- **90 testes unitários JavaScript** passaram. Incluem os 51 modificadores, um a um,
  com comparação de um consumidor efetivo, além de grafo, confirmação, respec,
  condições por arma/fonte, acerto, crítico, penetração, área, dano contínuo,
  limites numéricos, migração e distinção entre estudo da árvore e jornada do jogo.
- **36 cenários de integração** com DOM/Canvas simulado passaram: interface da árvore,
  tooltip, prévia sem efeito antecipado, Aplicar/Cancelar, confirmação repetida,
  save e restauração, fechamento, requisitos de equipamento, respec cobrado uma vez,
  regeneração real, deslocamento, cadência, mana, poções, veneno/sangramento reais,
  morte/recompensa única, segurança da clareira, resistências, bloqueio e controles.
- As ferramentas de análise foram acionadas e usam os mesmos cálculos do combate.
- Inventário, cursores, moedas, mãos, distribuição de atributos e jornada anterior
  seguem cobertos pelos cenários. O DOM de teste também verifica nós removidos
  das janelas, evitando referências falsas a elementos que não existem mais.
- Os 36 cenários também executaram com Canvas nativo e imagens reais carregadas.
  Isso verifica execução e desenho Canvas, sem validar layout CSS/SVG do navegador.
- Um teste Python de CUR/ANI passou. Scripts embutidos, arte offline e integridade
  do ZIP são auditados no empacotamento e verificados após download do GitHub.

A prévia gerenciada continua indisponível, sem evidência de recuperação. A revisão
visual da interface CSS/SVG em navegador real e abertura por duplo clique no desktop
ficam pendentes. Os testes simulados e Canvas nativo não substituem essa revisão.

A cobertura por consumidor assegura que não há modificador apenas decorativo no
catálogo. Bônus condicionais precisam da fonte compatível; a árvore não concede uma
fonte nova de dano. O Guardião atual tem técnicas físicas; magia, elementos e
projéteis podem ser conferidos no laboratório e estão prontos para fontes futuras.
Os valores e limites continuam sujeitos a balanceamento. Ainda é um jogo offline,
sem servidor autoritativo, banco provisionado ou multiplayer nesta entrega.
