# Validação da versão 0.3

Verificação em 21 de novembro de 2026.

- 12 testes unitários JavaScript: regras da versão anterior, originais, quadros,
  hotspots, sequência e durações das animações.
- 18 cenários de integração com DOM/Canvas simulados: jornada completa, combate,
  interface, salvamento, cursores em cada alvo, prioridade de missão, estados
  de recurso e monstro, retorno ao normal e sobreposição da interface.
- Saque exige clique; aproximação sozinha não recolhe; clique repetido não duplica;
  distância, capacidade e remoção do alvo são verificadas.
- Teste Python de orientação DIB e máscara de transparência para RGBA, evitando
  retângulos pretos sobre o jogo. Não há operação de inversão nos arquivos fornecidos.
- Arquivos originais preservados com SHA-256; 21 quadros PNG para 6 cursores.
- Inspeção dos PNGs decodificados. Código e imagens ficam no HTML, sem pedidos de rede.
- Sintaxe dos scripts finais, ausência de IDs duplicados e integridade do ZIP.

A prévia gerenciada falhou ao abrir a rota de navegador. Não foi possível verificar
os cursores em um navegador real ou em Windows/macOS nesta sessão. Os testes de
lógica, tempo, hotspots e conversão não substituem essa validação visual.
O servidor de prévia ficou parado após a falha.

O cursor desenhado usa a posição nativa do mouse e uma camada que não recebe
cliques. Em falha de carregamento dos assets, o cursor nativo permanece disponível.
O mundo é offline: não há outros jogadores ou campos PvP funcionais nesta entrega.
