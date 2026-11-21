# Validação da versão 0.5

Verificação em 21 de novembro de 2026.

- 22 testes unitários JavaScript passaram, incluindo as regras dos equipamentos,
  mãos, requisitos, capacidade da mochila, estatísticas e compatibilidade dos saves.
- 23 cenários de integração passaram com DOM/Canvas de teste: jornada e combate,
  interface, cursores, 16 encaixes, 48 espaços, equipar/retirar e moedas no chão.
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
  a verificação de que a arma de duas mãos é desenhada uma vez no personagem.
  Essa execução verifica desenho e execução, sem validar o layout CSS do navegador.
- Um teste Python de conversão CUR/ANI passou, mantendo transparências e hotspots.
- Scripts finais, assets embutidos e integridade do ZIP são auditados no empacotamento.

A prévia gerenciada falhou na rota do navegador nesta sessão. Não foi possível
revisar visualmente a interface completa em navegador real nem testar por duplo
clique no Windows/macOS. Os testes simulados e com Canvas nativo não substituem
essa revisão visual.

É um protótipo offline: chat local e salvamento por localStorage, com exportação e
importação. Pilhas próprias de moedas persistem no mesmo snapshot do personagem,
com até 120 segundos de simulação restante e limite de 200 pilhas. Servidor online,
banco de dados e instâncias individuais de itens seguem a proposta de ARQUITETURA.md.
