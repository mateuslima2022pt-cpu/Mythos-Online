# Validação da versão 0.8

Verificação em 21 de novembro de 2026.

- 28 testes unitários JavaScript passaram, incluindo as regras dos equipamentos,
  mãos, requisitos, capacidade da mochila, estatísticas e compatibilidade dos saves.
- 28 cenários de integração passaram com DOM/Canvas de teste: jornada e combate,
  interface, cursores, 16 encaixes, 48 espaços, equipar/retirar e moedas no chão.
- Seis testes unitários novos verificam prévia, desfazer, saldo, confirmação atômica,
  confirmação repetida, preservação dos recursos faltantes, dados inválidos,
  estado desatualizado, bônus de talentos e compatibilidade do save.
- Quatro cenários de integração acionam os botões reais da janela: quatro atributos,
  limites e Cancelar; Aplicar, HUD, save e confirmação repetida; X/Esc/troca de painel;
  saldo zero e alteração do personagem durante uma prévia.
- Prévia não altera o personagem nem aparece no save; só Aplicar confirma os pontos.
- Retrato e execução dos novos cenários também verificados com Canvas nativo.
- Navegação pelos botões Normal/Roupas verificada; Provador removido. A seção
  cosmética contém seis encaixes e coleção com 48 células vazias. A silhueta
  não está presente no DOM nem no HTML empacotado.
- Trocar de aba preserva equipamentos e itens normais. A coleção vazia não mostra
  poções ou armas da mochila; o contador corresponde à seção exibida.
- Na aba Roupas, confirmar moedas sem abrir não faz nada; abrir pelo clique,
  soltar, fechar e voltar à aba Normal preservam as regras e o estado esperado.
- Escudo recusado na primária. Arma de uma mão usa a primária por padrão e pode
  ser movida à secundária sem duplicar a mesma unidade nos dois encaixes.
- Arma de duas mãos vincula ambos ao mesmo ID e aplica atributos uma única vez.
  Retirar por qualquer mão libera os dois; trocar retorna o item uma única vez.
- Troca recusada por mochila cheia não altera o equipamento nem perde itens.
- Saves antigos com campo de escudo são migrados; saves com arma de duas mãos
  restauram o vínculo. Duplicação indevida de arma de uma mão é descartada.
- Ataques básicos com duas armas alternam as mãos mantendo a cadência total;
  arma na secundária não permite usar Bastião como se fosse um escudo.
- Ferramenta de análise adiciona uma arma de duas mãos sem equipá-la automaticamente.
- Soltar moedas continua fechado até o clique na moeda. Cancelar mantém o saldo;
  confirmar desconta uma vez, cria a pilha, salva e permite recolher uma vez.
- Os cenários também executaram com Canvas nativo e imagens carregadas, incluindo
  navegação das abas e a verificação de desenho único da arma de duas mãos.
  Essa execução verifica desenho e execução, sem validar o layout CSS do navegador.
- Um teste Python de conversão CUR/ANI passou, mantendo transparências e hotspots.
- Scripts finais, assets embutidos e integridade do ZIP são auditados no empacotamento.

A rota de prévia gerenciada permanece indisponível, sem evidência de recuperação
desde as verificações anteriores. O status atual informa prévia parada. Não foi possível
revisar visualmente a interface completa em navegador real nem testar por duplo
clique no Windows/macOS. Os testes simulados e com Canvas nativo não substituem
essa revisão visual.

É um protótipo offline: chat local e salvamento por localStorage, com exportação e
importação. Pilhas próprias de moedas persistem no mesmo snapshot do personagem,
com até 120 segundos de simulação restante e limite de 200 pilhas. Servidor online,
banco de dados e instâncias individuais de itens seguem a proposta de ARQUITETURA.md.

A coleção de roupas é uma interface vazia nesta entrega; ainda não há catálogo
de skins ou equipagem cosmética para validar.
