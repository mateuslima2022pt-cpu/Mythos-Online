# Validação — Estudo da Árvore de Passivas v1.0

21 de novembro de 2026.

- Nove testes de modelo passaram: uma origem, 800 passivas, 100 por afinidade,
  IDs únicos, grafo conectado, arestas simétricas, nomes e modificadores numéricos.
- Todas as oito escolhas maiores têm ao menos um benefício e uma penalidade.
- Orçamento de nível 1/99, caminho mínimo, alocação atômica, remoção e rotas
  alternativas testados. Caminhos desconectados, duplicados ou excessivos são recusados.
- Importação validada; resumo soma porcentagens, valores planos, pontos percentuais
  e penalidades; busca sem acentos e filtros verificados.
- Nove cenários de interface com DOM simulado passaram: hover e tooltip de Mente Aberta,
  título/efeito exatos, posição do tooltip na borda da tela, clique sem gasto,
  prévia de caminho, Aplicar, Cancelar, nível, catálogo completo, resumo, controles
  de zoom/pan, importação inválida e exportação apenas do estudo aplicado.
- O save do jogo foi mantido intacto nos cenários de armazenamento simulado.
- Scripts embutidos, ausência de chamadas de rede e CRC do ZIP são auditados ao empacotar.

A prévia gerenciada permanece indisponível, sem evidência de recuperação desde as
verificações anteriores. Os testes com DOM não validam o desenho CSS e SVG em um
navegador real. A revisão visual no navegador e a abertura por duplo clique em
Windows/macOS ficam pendentes para a análise do HTML.

Este é um planejador isolado: os bônus são somados no resumo, mas não alteram o
protótipo jogável nem executam cálculos de combate. O catálogo é original e seus
valores são propostos para balanceamento.
