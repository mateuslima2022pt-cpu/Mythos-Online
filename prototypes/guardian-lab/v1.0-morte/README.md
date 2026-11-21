# Mythos Online — Guardião escolhido · v1.0 + Morte

Abra **Mythos_Online_Guardiao_Laboratorio_v1.0_Morte.html** no navegador. É um arquivo único, com imagens e código embutidos, que funciona offline depois do download.

A base foi extraída diretamente do HTML enviado pelo usuário: `Mythos_Online_Guardiao_Laboratorio_v1.0.html`. O hash desse arquivo está em `base.json`. As quatro imagens de repouso, caminhada, corrida e ataque permanecem **idênticas byte a byte** às imagens do arquivo enviado.

## Morte

- Nova folha com **24 quadros**, seis etapas em quatro direções: Sul, Oeste, Leste e Norte.
- Queda de 0,75 segundo a 8 quadros/s, seguida da pose final no chão.
- A morte executa uma única vez e mantém o último quadro até reviver.
- Interrompe ataques em curso e bloqueia movimento, corrida e novos golpes.
- O corpo morto não respira, não pisca e não recebe movimento no cabelo.
- Reviver retoma o repouso no mesmo local, com os comandos anteriores liberados.
- Sem sangue ou ferimentos gráficos. Regata bege, shorts branco, cabelo e espada seguem o visual escolhido.

A nova folha foi preparada com recortes completos, fundo transparente e exposição ajustada à referência original. Não foi aplicado ajuste de cor às quatro imagens existentes.

## Como testar

**K** ou **Testar morte**: iniciar a queda.

**V** ou **Reviver**: voltar ao teste no mesmo ponto.

Também é possível escolher Morte no seletor de animações, pausar e avançar quadro a quadro. No último quadro, o avanço para; a sequência não volta ao início. Os botões de direção permitem inspecionar as quatro vistas.

Os controles originais continuam disponíveis: WASD/setas para mover, Shift para correr, clique/Espaço para atacar, P para pausar e Home/Centralizar para voltar ao centro. Centralizar também reinicia o estado de vida. O comportamento anterior das quatro animações foi preservado.

## Arquivos

- `assets/sprites/guardian-death.png`: folha final da morte, 1536×1024, seis colunas por quatro linhas, células de 256×256.
- `assets/sprites/guardian-death-raw.png`: arte de origem da nova animação.
- `assets/sprites/`: imagens originais extraídas, atlas e nova folha.
- `assets/registered/`: cinco folhas exportadas pelo laboratório e metadados. As quatro folhas antigas usam células de 192×192; a morte usa 256×256, com mais margem para o corpo deitado.
- `src/engine.js`: estados vivo, morrendo e morto, além do controlador original.
- `src/renderer.js`: desenho das poses e suspensão do movimento do cabelo na morte.
- `src/app.js` e `src/index.template.html`: interface de teste e exportadores.
- `src/death-palette-build.js` e `build-death.cjs`: preparação exclusiva da nova folha. O preparador de cor não é executado no HTML.
- `base.json`: hashes do arquivo enviado e das imagens originais.
- `qa.cjs`, `QA.json`: verificação e resultado.

O botão de exportar todas as folhas agora gera cinco PNGs e JSON. O laboratório tem **112 quadros base**: 88 originais e 24 novos de morte.

Reconstrução: `node build-death.cjs`, `node qa.cjs`, `python build.py`. As ferramentas de desenvolvimento usam `@napi-rs/canvas`; o HTML final não exige dependências.

## Verificação

21 verificações passaram: identidade das quatro imagens originais, sequência única e retenção do último quadro, cancelamento de golpe, bloqueio de comandos, pausa/passo a passo, reviver no mesmo ponto, corpo estático, controles da interface, atalhos K/V, exportação e comportamentos originais.

Os quadros da morte e a pose final no cenário foram inspecionados em Canvas nativo. A integração de interface usa DOM simulado; a revisão em navegador real permanece pendente pela indisponibilidade da prévia gerenciada.

A morte e o reviver são controles do laboratório, sem penalidades, drops ou regras de ressurreição do MMORPG. O jogo principal, os saves e as versões anteriores não são acessados nem alterados. A pasta de distribuição é `prototypes/guardian-lab/v1.0-morte/`.
