# Mythos Online — Guardião modelo 01 · Fantasia Pintada · v1.3

Baixe **Mythos_Online_Guardiao_Laboratorio_v1.3.html** e abra no navegador com duplo clique. O HTML é autossuficiente, funciona offline depois do download e não exige instalação ou servidor. O ZIP inclui o HTML, quatro folhas PNG finais, quatro artes de origem, referência em quatro vistas e fontes.

## Direção de arte

Esta edição usa o **modelo 01 — Fantasia Pintada**, escolhido na prancha de dez direções de arte. Guardião humano jovem adulto, cabelo castanho, proporções heroicas equilibradas, formas e tecidos com pinceladas visíveis. Regata bege de linho, shorts branco/cru, pés descalços e espada de madeira. Sem armadura. A referência em quatro vistas está em `assets/reference/guardian-modelo-01.png`.

São novas artes, não recolorações dos sprites anteriores. A textura pintada é preservada nas fontes PNG e nas folhas finais. O corpo de referência nas folhas finais foi ampliado de cerca de 128 para **208 px**, com células de **384×384**. Isso preserva mais detalhe das imagens geradas; não significa que ampliar além da resolução original crie detalhes novos.

## Folhas de animação

| Animação | Quadros por direção | Direções | Total | PNG final |
| --- | ---: | ---: | ---: | --- |
| Repouso/piscada | 4 | 4 | 16 | 1536×1536 |
| Caminhada | 6 | 4 | 24 | 2304×1536 |
| Corrida | 6 | 4 | 24 | 2304×1536 |
| Ataque normal | 6 | 4 | 24 | 2304×1536 |

**88 quadros**; linhas Sul, Oeste, Leste e Norte. Cada vista tem sua própria arte, sem espelhamento. Diagonais usam a orientação cardinal dominante. A âncora de exportação é (192; 337,92) dentro de cada célula. A escala lógica do personagem continua baseada em 128 unidades; os PNGs preservam o corpo de referência de 208 pixels.

O cabelo recebe vento suave na coroa. O efeito não desloca o rosto nem muda as roupas. Há respiração leve e uma piscada breve aproximadamente a cada 3,8 segundos em repouso, nas vistas com olhos visíveis. Vento e respiração são efeitos do renderizador, não quadros adicionais nas folhas exportadas.

## Consistência de cor e recortes

Pele, tecidos, cabelo e madeira usam a mesma referência de cor. A exposição é preparada por pose e direção com ajustes contínuos, preservando matiz e pinceladas. **As cores corrigidas ficam gravadas nos PNGs finais**. O HTML não recalcula exposição ao mudar de direção, correr ou atacar; não há filtro de clareamento em movimento.

Sombras e pinceladas naturais continuam variando com a pose. A validação compara a exposição dos grupos de pele e tecidos à mesma referência. O recorte segue o contorno completo de cada personagem, incluindo espada e pés. As máscaras removem o fundo e os fragmentos das artes de origem. Cada quadro é carregado em uma superfície independente, com limites de desenho explícitos, para evitar amostras de vizinhos.

## Teste

- **WASD/setas:** caminhar; **Shift:** correr.
- **Clique esquerdo ou Espaço:** ataque normal; segurar o mouse repete o golpe.
- WASD e Shift continuam ativos durante o ataque. O golpe mantém a direção até a recuperação; o seguinte usa a posição atual do mouse.
- **P:** pausar/continuar; **Home/Centralizar:** retornar ao centro.
- Selecione uma animação para repeti-la no lugar; WASD no cenário retoma controle livre.
- Use pausa e avanço quadro a quadro para examinar a arte. Ajuste escala, direção, ritmo, cabelo, piscada, fundo neutro e âncora.
- Exportar folha gera PNG transparente; exportar quatro folhas gera um ZIP local com JSON. Capturar pose gera PNG.

Clique no cenário para dar foco ao teclado. Há controles de toque em telas pequenas. O boneco de treino verifica alcance e direção a partir da posição atual e conta um acerto por ciclo.

## Arquivos

- `assets/registered/`: quatro PNGs finais, `animacoes.json` e `runtime-atlas.json` para uso imediato.
- `assets/sprites/`: quatro artes de origem e atlas com máscaras/ancoragem. Use os PNGs finais para integração; as origens passam pela preparação descrita no atlas.
- `assets/reference/`: referência do modelo 01 em quatro vistas.
- `src/engine.js`: movimento, estados, golpe e piscada.
- `src/palette.js`: preparação da exposição e transparência, fora do ciclo de execução do HTML entregue.
- `src/renderer.js`: quadros isolados e vento no cabelo.
- `src/app.js` e `src/index.template.html`: interface e exportadores.
- `build-atlas.cjs`: contornos e máscaras das fontes.
- `qa.cjs`: verificações, renderização/exportação das folhas e metadados.
- `build-runtime-atlas.cjs`: atlas das folhas finais.
- `build.py`: HTML único com imagens embutidas.

Reconstrução: `node build-atlas.cjs`, `node qa.cjs`, `python build.py`. Os scripts de desenvolvimento usam `@napi-rs/canvas`; o HTML final não tem dependências externas.

## Verificação e limites

**22 verificações passaram**, incluindo resolução ampliada, 88 quadros válidos, seis ataques de costas completos, margens das espadas, cores próximas à referência em todas as poses, paleta fixa preparada, cabelo sem alterar roupas, movimento diagonal, corrida durante golpes, ataque contínuo, pausa/passo a passo, interface, metadados e exportação PNG/ZIP.

Os PNGs finais e cenas de teste foram inspecionados. A lógica, a renderização e a interface foram verificadas com Canvas nativo e uma integração de DOM simulada. A revisão de layout, entrada e downloads em um navegador real permanece pendente pela indisponibilidade da prévia gerenciada.

Estudo para análise, sujeito a refinamento de ciclos e transições. O ataque em movimento desloca a pose do golpe; não é uma folha adicional específica de corrida-atacando. Equipamentos por camadas e a criação completa de personagens serão etapas posteriores.

O laboratório não acessa rede, APIs, cookies, localStorage ou saves. Não altera o jogo, inventário, conta nem versões anteriores. Pasta de distribuição: `prototypes/guardian-lab/v1.3/`.
