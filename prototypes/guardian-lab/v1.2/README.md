# Mythos Online — Guardião fantasia medieval · Laboratório v1.2

Baixe **Mythos_Online_Guardiao_Laboratorio_v1.2.html** e abra com duplo clique no navegador. O arquivo é autossuficiente, com imagens e JavaScript embutidos. Funciona offline depois do download, sem instalação ou servidor. O ZIP inclui o HTML, quatro folhas PNG finais, artes de origem e fontes.

## Visual aprovado

Esta edição substitui no laboratório a arte cartunesca pela direção jovem de fantasia medieval aprovada: cabelo castanho expressivo, traços élficos discretos, pele natural, regata bege de linho, shorts branco/cru, pés descalços e espada de madeira. Sem armadura. A roupa base permanece em todas as poses.

## Animações

| Folha | Colunas | Direções | Quadros |
| --- | ---: | ---: | ---: |
| Repouso e piscada | 4 | 4 | 16 |
| Caminhada | 6 | 4 | 24 |
| Corrida | 6 | 4 | 24 |
| Ataque básico | 6 | 4 | 24 |

São **88 quadros novos**. Linhas: Sul, Oeste, Leste, Norte. As quatro vistas têm arte própria, sem espelhamento. Diagonais usam a orientação cardinal dominante.

O cabelo recebe vento suave apenas na região da coroa; a amostragem do rosto e das roupas permanece igual. Repouso inclui respiração leve e uma piscada breve aproximadamente a cada 3,8 segundos, quando os olhos estão visíveis. Vento e respiração são efeitos do renderizador, não quadros adicionais na folha exportada.

## Cores, transparência e recortes

As cores são calibradas na preparação de cada pose e direção pela mesma referência do repouso, preservando matiz e textura. As cores finais ficam gravadas nos PNGs. **O HTML usa diretamente as folhas prontas; não recalcula exposição ou clareia o personagem ao correr.** Luzes e sombras pintadas variam naturalmente com a pose, mas a referência de pele e tecidos é compartilhada.

O atlas de origem registra o contorno conectado de cada pose. Somente esses pixels entram nas folhas finais, excluindo o fundo/matte e fragmentos vizinhos das artes geradas. Cada quadro fica em uma superfície independente durante a renderização, com limites de recorte explícitos. Os seis ataques de costas foram conferidos com espadas completas.

As folhas finais têm células de **256×256**, corpo de referência próximo de 128 px, âncora horizontal 128 e linha dos pés próxima de 225 px. Repouso: 1024×1024; demais: 1536×1024. Use **assets/registered/** para os PNGs finais com transparência; as artes em assets/sprites/ são fontes de preparação, com seus próprios recortes e máscaras.

## Controles

- WASD ou setas: caminhar; segure Shift para correr.
- Clique esquerdo ou Espaço: ataque simples; segurar o mouse repete após a recuperação.
- WASD e Shift continuam funcionando durante o golpe. O ataque mantém sua direção até a recuperação; cada novo golpe usa a posição atual do mouse.
- P: pausar/continuar; Home ou Centralizar: voltar ao centro.
- Selecione uma animação para repeti-la no lugar. WASD no cenário ou Controle livre retomam a locomoção.
- Pausa, avanço quadro a quadro, direção, escala, ritmo, cabelo, piscada, fundo neutro e âncora podem ser ajustados.
- Exportar folha gera PNG transparente. O botão de quatro folhas gera um ZIP local com metadados. Capturar pose também gera PNG.

Clique no cenário para dar foco ao teclado. Os botões de toque ficam disponíveis em telas pequenas. O boneco de treino registra um acerto por golpe, verificando alcance e direção a partir da posição atual do personagem.

## Arquivos e reconstrução

- `assets/registered/`: quatro PNGs finais, `animacoes.json` e `runtime-atlas.json` para uso imediato.
- `assets/sprites/`: quatro artes de origem e `atlas.json`, incluindo máscaras e ancoragem.
- `src/engine.js`: movimento, estados, direção, ataque e piscada.
- `src/palette.js`: preparação da exposição compartilhada e da transparência.
- `src/renderer.js`: quadros isolados, vento e desenho.
- `src/app.js` e `src/index.template.html`: teste e exportadores.
- `build-atlas.cjs`: localiza os contornos completos e suas máscaras.
- `qa.cjs`: verifica lógica, prepara/exporta as folhas, monta a interface em Canvas nativo e gera os metadados.
- `build-runtime-atlas.cjs`: descreve as folhas finais para carregamento rápido, sem conversão de cores no navegador.
- `build.py`: incorpora os PNGs finais e gera o HTML único.

Para reconstruir: `node build-atlas.cjs`, `node qa.cjs`, `python build.py`. Os scripts de desenvolvimento usam `@napi-rs/canvas`; o HTML entregue não depende desse pacote.

## Validação e limites

**21 verificações passaram**, incluindo 88 quadros válidos, seis poses norte completas, margens para espadas, exposição próxima à referência em todas as poses, paleta preparada fixa, vento restrito ao cabelo, movimento diagonal, corrida durante ataque, ataque contínuo sem bloquear WASD, pausa, passo a passo, controles, exportação PNG/ZIP e metadados.

Os PNGs finais e cenas renderizadas foram inspecionados. A interface foi executada com Canvas nativo e uma integração de DOM simulada; não equivale à revisão de layout e downloads em navegador real, que permanece pendente pela indisponibilidade da prévia gerenciada.

É um estudo de sprites e movimento, sujeito a refinamento de ciclos, silhuetas e transições. A roupa/equipamento modular e a criação completa de personagem continuam como etapas futuras. O ataque em movimento desloca a pose do golpe; não é uma nova folha específica de corrida-atacando.

O laboratório não acessa rede, APIs, banco de dados, cookies ou localStorage. Não abre nem modifica jogo, inventário ou saves. Sua pasta no repositório é `prototypes/guardian-lab/v1.2/`; as versões anteriores e o jogo principal estão preservados.
