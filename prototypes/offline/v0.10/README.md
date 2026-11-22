# Mythos Online — Bosque da Aurora v0.10

**O Guardião escolhido foi integrado ao jogo completo.** Abra `Mythos_Online_Offline_v0.10.html` no navegador do desktop. O HTML é autossuficiente e funciona offline, com floresta, monstros, missões, chefe, inventário, atributos, árvore de passivas e cursores existentes.

## Guardião em jogo

A base visual é o laboratório v1.0 enviado pelo autor, com a folha de morte aprovada. São 112 quadros: repouso/piscada, caminhada, corrida, ataque e morte em quatro direções. Os quadros foram registrados e isolados para impedir amostras de vizinhos; não foi aplicado um novo filtro de cor.

- **WASD:** caminhar. **Shift + WASD:** correr, a 1,5× da velocidade de caminhada, respeitando modificadores e colisões.
- **Mouse esquerdo:** mirar e atacar; segure para repetir. A animação lê o tempo real do ataque e do Golpe Frontal.
- **Q:** esquiva existente; **1/2:** técnicas aprendidas; **F1/F2:** poções.
- **F/clique direito:** interagir; **C/I/T/M:** atributos, mochila, passivas e mapa.
- **Esc:** opções/fechar; **Enter:** chat local.

Quando a vida zera, o Guardião cai no ponto da derrota e executa uma morte de 0,75 s. Movimento, ataques e consumíveis ficam bloqueados. Depois aparece a janela de retorno; clicar Voltar à floresta ou fechar essa janela retorna ao santuário com vida e mana restauradas. Não há nova perda de ouro, EXP ou equipamento. O corpo morto não recebe vento no cabelo ou respiração.

## Aparência e itens

O visual aprovado com regata bege, shorts branco e espada de madeira está ativo por padrão, inclusive em jornadas existentes. Essa é a aparência base para análise. Os itens equipados continuam concedendo seus atributos, requisitos e efeitos de combate.

Em **Esc → Aparência do personagem**, você pode escolher **Equipamentos · visual anterior** para conferir a aparência equipada já existente. Essa opção mantém o render anterior de armas, escudos e armaduras. A escolha não altera inventário nem estatísticas.

A arte modular de cada equipamento no novo corpo ainda não foi produzida. Portanto, no modo Guardião aprovado, equipar uma cota ou outra arma não substitui as peças do atlas base. A morte usa o novo sprite em ambos os modos.

## Saves

O formato e a chave de salvamento foram preservados. Continuar e importar jornadas existentes mantêm personagem, itens, pontos, árvore, missões e ouro no chão. Exporte sua jornada em Opções antes de experimentar mudanças extensas.

A morte permanece um estado de execução. Se o jogo for fechado durante a queda, o snapshot salva a posição do santuário e recursos restaurados, mantendo a progressão; assim, recarregar não reabre o personagem com HP zero no meio dos monstros.

## Teste rápido

Em **Esc → Ferramentas de análise → Testar queda do Guardião**, você pode conferir a animação sem procurar um inimigo. A ação segue a derrota real do protótipo e preserva os itens. O controle não é uma habilidade do personagem.

## Fontes e validação

- `src/guardian.js`: adaptador das animações ao movimento e combate reais.
- `src/guardian-renderer.js`: desenho do atlas, piscada e vento na coroa.
- `assets/guardian/`: fontes escolhidas, cinco folhas preparadas, atlas e retrato central da árvore.
- `tools/prepare_guardian.cjs`: preparação dos quadros sem recoloração.
- `tests/`: regras, simulação e captura com Canvas nativo.

91 testes passaram. A integração também passou por 39 verificações com Canvas nativo, incluindo renderização real das cinco animações no cenário, colisões, morte/retorno, passivas, inventário e preservação dos atributos ao alternar aparência. O teste nativo usa DOM simulado; a revisão de layout e entrada em navegador real permanece pendente por indisponibilidade da prévia gerenciada.

Reconstrução do HTML: `python build.py`. Preparação dos sprites, quando necessário: `node tools/prepare_guardian.cjs` (usa `@napi-rs/canvas` no desenvolvimento). O jogador não precisa de Python, Node, Java ou servidor.
