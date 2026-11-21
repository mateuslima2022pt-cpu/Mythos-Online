# Mythos Online — Laboratório offline do Guardião v1.1

Baixe **Mythos_Online_Guardiao_Laboratorio_v1.1.html** e abra com duplo clique no navegador do Windows ou macOS. O arquivo é autossuficiente: imagens, dados e JavaScript estão embutidos. Não exige servidor, instalação ou conexão à internet depois do download. O ZIP contém esse HTML, as folhas PNG e os fontes.

## Correções da v1.1

- Corrida recolorida pela referência de repouso; exposição de pele e tecidos alinhada entre todas as animações. Sem filtro de clareamento durante a corrida.
- Seis poses de ataque de costas substituídas por uma tira com espaçamento. Os recortes agora seguem a silhueta completa, inclusive quando ela atravessa a grade teórica da arte original.
- Células finais de 256×256, com margem para a espada em todas as direções, inclusive exportação de pose e bordas do cenário.
- WASD, setas e Shift processados durante todo o ataque. A entrada de movimento também sai automaticamente da inspeção em repetição. O golpe não bloqueia caminhada ou corrida. O deslocamento usa a velocidade de caminhada/corrida; a pose visual do corpo continua o ciclo de golpe até a recuperação, sem trocar de ataque ao mover o mouse.
- Ataque mantido acompanha a posição do mouse no início de cada novo golpe e registra um acerto por ciclo, usando a posição atual do personagem.

## Controles

- WASD ou setas: caminhar. Segure Shift para correr.
- Clique esquerdo ou Espaço: ataque simples. Segurar o mouse repete após a recuperação. O clique determina uma das quatro orientações do golpe.
- P: pausar/continuar. Home ou Centralizar: retornar ao centro.
- Selecione uma animação em repetição para inspecioná-la sem deslocamento; pressione WASD no cenário ou volte a Controle livre para mover o personagem.
- Pausar e Avançar quadro permitem analisar cada pose.
- Ajuste direção, escala, ritmo, cabelo, piscada, grade, âncora e fundo neutro.
- Há botões de movimento e ataque para toque. No desktop, clique no cenário para dar foco ao teclado.

## Conteúdo

Guardião adulto estilizado com cabelo castanho, pele bronzeada, regata bege, shorts branco, pés descalços e espada de madeira. Sem armadura. Roupa base permanente nesta demonstração.

| Folha | Quadros por direção | Direções | Total |
| --- | ---: | ---: | ---: |
| Repouso | 4 | 4 | 16 |
| Caminhada | 6 | 4 | 24 |
| Corrida | 6 | 4 | 24 |
| Ataque simples | 6 | 4 | 24 |

São **88 quadros base**. As linhas representam Sul, Oeste, Leste e Norte. Diagonais usam a orientação cardinal dominante. A piscada acontece aproximadamente a cada 3,8 segundos em repouso, em uma sequência curta; não há olhos visíveis na vista de costas. Respiração e vento suave no topo do cabelo são efeitos adicionais do renderizador. Não estão representados como novos quadros na folha exportada.

- `assets/sprites/`: cinco PNGs de origem deste estudo (incluindo a nova tira de ataque norte) e `atlas.json` com recortes, registro de pés e espelhamentos. O atlas usa recortes do contorno inteiro; a vista norte do ataque vem de `guardian-attack-north.png`, substituindo a linha antiga dessa direção. Use os quatro PNGs em `assets/registered/` para obter as folhas finais corrigidas.
- `assets/registered/`: quatro folhas renderizadas/exportadas com células de **256×256**, corpo de referência de aproximadamente 128 px e âncora **(128, 225)**. Idle: 1024×1024; demais: 1536×1024. PNG transparente. `animacoes.json` descreve dimensões e tempos.
- `src/engine.js`: controlador de estados, movimento, direção, ataque e piscada.
- `src/renderer.js`: renderização e registro dos sprites.
- `src/palette.js`: exposição de referência do repouso compartilhada por todas as ações, com ajustes contínuos que preservam matiz e sombras.
- `src/app.js`: interface, teste, exportação PNG e ZIP local.
- `src/index.template.html`: layout do laboratório.
- `build-atlas.cjs`: leitura do alfa para preparar os recortes; preserva os PNGs de origem.
- `build.py`: gera o HTML autossuficiente.
- `qa.cjs` e `QA.json`: verificações e resultado.

A folha registrada já aplica o espelhamento oeste. Não reaplique o `flip` do atlas de origem sobre os PNGs registrados. Use o JSON correspondente à pasta escolhida.

## Teste isolado

O boneco de treino registra acerto por alcance e orientação, uma vez por golpe. Não há economia, progressão ou dano de combate do MMORPG envolvidos. Velocidades e duração do ataque são parâmetros deste laboratório.

Não acessa o HTML do jogo, APIs, banco de dados, cookies ou localStorage; não abre nem altera saves. Todos os arquivos ficam em `prototypes/guardian-lab/v1.1/`, separados do jogo v0.9.

A arte é uma primeira passagem animada para análise. Existem diferenças de contorno e volume entre quadros; algumas vistas usam espelhamento e a lateralidade visual da espada ainda merece revisão antes da integração final. Aparência modular por equipamento e novas opções de criação serão etapas posteriores.

## Validação

19 verificações passaram: 88 quadros com alfa e recortes válidos; movimento diagonal normalizado; caminhada/corrida/repouso; ataque com recuperação e um evento de acerto; pausa e passo a passo; piscada; repetição; exportação PNG; montagem da interface; controles; alcance/direção do alvo; metadados e downloads.

Incluem regressões para ataque contínuo em movimento, corrida durante o golpe, cores próximas à referência de repouso, seis quadros norte completos e margens de exportação.

A renderização foi executada e inspecionada com Canvas nativo, e o ZIP gerado pelo exportador foi aberto por um leitor independente. Isso não equivale a um teste de navegador. A infraestrutura de prévia gerenciada estava indisponível; a revisão de layout e downloads em um navegador real permanece pendente.

Para reconstruir: `node build-atlas.cjs`, `node qa.cjs`, `python build.py`. Os dois primeiros usam `@napi-rs/canvas` no ambiente de desenvolvimento; o HTML final não tem dependências externas.
