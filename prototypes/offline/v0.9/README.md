# Mythos Online — O Primeiro Juramento

Protótipo **offline em JavaScript** da primeira área, o **Bosque da Aurora**, com
o **Guardião** como personagem jogável. Windows e macOS, no navegador do desktop.

## Baixar e jogar

1. Baixe [Mythos_Online_Offline_v0.9.zip](Mythos_Online_Offline_v0.9.zip).
2. Extraia o ZIP.
3. Abra **Mythos_Online_Offline_v0.9.html** com dois cliques.

No GitHub, use **Download raw file** para salvar o arquivo. O jogo funciona sem
internet, servidor, Java ou Node.js instalado. O HTML contém todos os assets e códigos.
Também é possível baixar apenas [o HTML autossuficiente](Mythos_Online_Offline_v0.9.html).

## Árvore de passivas integrada

Abra com **T**. A árvore com 800 passivas e 48 grupos está dentro do jogo, com o
Guardião sozinho no centro. Passe o mouse para ler título e bônus; use busca,
catálogo, zoom, arraste do mapa e **Minha origem**. O orçamento usa o nível real:
nível 1 começa sem pontos e nível 99 oferece 98. Não há seletor de nível na árvore.

Clique para examinar e use Adicionar 1 ponto/Adicionar caminho para montar uma
prévia. Duplo clique também adiciona. **Aplicar** valida e confirma tudo no personagem,
atualiza os status, HUD e o save. **Cancelar**, fechar ou trocar de painel descarta
apenas os ajustes pendentes. O resumo calcula os status da prévia com seus equipamentos.

Os **51 modificadores** entram nas regras reais: atributos e requisitos, vida/mana,
dano por tipo e arma, crítico, precisão, penetração, velocidade, defesas, resistências,
regeneração, poções, custos de mana, veneno, sangramento, bloqueio e controles.
Bônus de fonte específica exigem arma/técnica compatível: dano de fogo não aumenta
um golpe físico e defesa de escudo não atua sem escudo. A árvore não concede técnicas
ativas de outras classes ao Guardião.

**Remover passivas aplicadas** custa 20 ouro por confirmação e exige estar na clareira,
fora de combate. Uma remoção não pode deixar pontos desconectados. Equipamentos sem
requisitos deixam de ficar equipados e continuam na mochila; sem espaço suficiente,
a operação é recusada. Aumentar máximos por passivas não cura automaticamente;
reduzir máximos limita vida/mana ao novo valor. Recargas não são reiniciadas.

Em **C > Todos os status** você pode conferir os valores efetivos. Para testar fontes
que o Guardião ainda não possui, use **Esc > Ferramentas de análise > Laboratório de
passivas**. O laboratório usa o mesmo cálculo do combate para golpes físicos, em
área, projéteis, magia, fogo/gelo/raio, dano recebido e controles. Os testes não
concedem novas técnicas. O atalho **Preparar nível 99 para testar passivas** altera
o personagem e o save; exporte a jornada antes de usá-lo para preservar seu progresso.

### Trazer a jornada antiga

Exporte a jornada na versão anterior e importe aqui. Personagem, itens, moedas,
missões e atributos são mantidos. **Os pontos da árvore antiga de 12 nós são devolvidos**
para escolher a nova build. Itens cujos requisitos dependiam daqueles bônus podem
precisar ser reequipados depois da nova distribuição. Não importe o JSON do estudo
independente como jornada: ele tem outro formato e é recusado.

As fórmulas, condições, limites e mapa de consumidores estão em
[PASSIVAS_APLICACAO.md](PASSIVAS_APLICACAO.md). Valores continuam abertos a balanceamento.

## Personagem e distribuição de pontos

Abra com **C** ou pelo ícone do personagem. A janela aplica o modelo aprovado,
com moldura preta e dourada, retrato do Guardião, nome e nível reais, experiência,
vida e mana, atributos e estatísticas de combate.

- **+** reserva um ponto disponível para Força, Destreza, Vitalidade ou Magia.
- **−** desfaz pontos adicionados na prévia atual, sem retirar pontos já confirmados.
- **Cancelar** descarta a prévia e mantém a janela aberta.
- **Aplicar** confirma todos os ajustes de uma vez, atualiza o HUD e salva.
- **X**, **Esc**, **C** ou mudar de painel descartam ajustes ainda não aplicados.

A prévia mostra os totais com bônus de talentos e os efeitos sobre vida, mana,
poder de ataque e defesas. Passar o mouse no valor do atributo mostra base,
bônus e pontos em prévia. O saldo impede gastos acima dos pontos disponíveis;
botões sem ação possível ficam desabilitados. Após Aplicar, os pontos são permanentes
nesta versão: o botão de menos não funciona como uma redistribuição gratuita.

A vida e mana confirmadas recebem apenas o aumento do limite, preservando a parcela
que faltava recuperar, conforme a regra já usada na progressão. Saves e exportações
incluem apenas os atributos confirmados. Guildas e títulos continuam sem sistema
ativo: a janela informa Nenhuma e —, respectivamente. Os valores do mockup eram
ilustrativos; o HTML usa os valores reais do jogo, inclusive a velocidade de movimento.

## Inventário aprovado

Use **I** ou o ícone da mochila. A janela vertical tem **16 encaixes** no arranjo
aprovado, sem personagem no centro, e **48 espaços de mochila**. Ícones de encaixes
vazios são cinza e discretos; itens equipados recebem cor e destaque. O ouro fica
no rodapé, ao lado da moeda clicável. Organizar e Fechar não aparecem no rodapé;
o X superior e Esc fecham a janela.

Clique em um item para ver os detalhes e equipar; duplo clique equipa diretamente.
Itens podem ser arrastados ao encaixe correspondente. Clique no equipamento
ocupado para retirar. O inventário tem apenas as abas **Normal** e **Roupas**;
o Provador foi removido. Os equipamentos das mãos ficam na própria aba Normal.
O catálogo inicial de equipamentos permanece disponível; os novos encaixes aguardam
os respectivos itens e sistemas do projeto.

### Roupas e skins

A aba **Roupas** apresenta seis encaixes agrupados no centro, em duas colunas
de três, sem silhueta ou personagem. Ícones cinza fosco, sem nomes escritos acima,
e a grade **Coleção de visuais** com 48 espaços. Os encaixes são:

- Esquerda: visual de arma, roupa superior e roupa inferior.
- Direita: visual de cabeça, luvas e botas.

A coleção começa vazia, como no modelo. Esta entrega aplica a interface da seção;
os conjuntos, skins e sua aquisição/equipagem entram quando criarmos esses itens.
Equipamentos e poções da mochila normal não aparecem como roupas. Trocar de aba
não altera equipamentos, atributos ou saldo. O ouro e o botão de soltar moedas
continuam no rodapé, disponíveis nas duas abas.

### Arma primária e secundária

Os encaixes ficam ao lado da bota: **primária à esquerda** e **secundária à direita**,
com o ícone de espada cinza e discreto quando vazios.

- Arma de uma mão equipa à esquerda por padrão; arraste outra arma de uma mão
  ao encaixe direito para usá-la como secundária. A mesma unidade não pode ocupar ambos.
- Escudos equipam somente à direita.
- Arma de duas mãos ocupa os dois encaixes com **o mesmo item**. A imagem se repete
  nos encaixes, mas posse, atributos e arma no personagem são contados uma vez.
- Retirar uma arma de duas mãos por qualquer encaixe libera ambos. Substituí-la
  por uma arma de uma mão ou escudo também desfaz a ocupação conjunta.
- Itens substituídos voltam à mochila. A troca é recusada se não houver espaço.

Para testar: **Esc > Ferramentas de análise > Adicionar arma de duas mãos**.
O Espadão de Treino entra na mochila e pode ser equipado; não muda a arma inicial
nem entra no saque aleatório. Com duas armas de uma mão, ataques básicos alternam
as mãos mantendo a mesma cadência total. Técnicas usam a primária; Bastião exige
um escudo real. Esses parâmetros de combate continuam sujeitos a balanceamento.

### Soltar moedas

A janela fica **fechada** ao abrir o inventário. **Somente o botão da moeda** abre
Soltar moedas. Digite um inteiro positivo, ou use Máximo, e confirme em OK.
Cancelar, X e Esc fecham a janela sem retirar saldo. Valor zero, fração, texto,
notação científica e valor acima do saldo são rejeitados.

Confirmar desconta uma única vez e cria uma pilha próxima ao personagem, respeitando
o terreno. Feche a mochila e clique na pilha para recolher. Moedas que você solta
são incluídas no save/exportação, com o tempo restante; desaparecem após 120 segundos
de simulação ativa, assim como o saque temporário da área. O máximo local é de
200 pilhas de moedas soltas simultaneamente, para manter o save limitado.

## Cursores e saque por clique

Os seis arquivos enviados foram integrados, preservando a arte, os pontos de clique
(hotspots), os quadros e o ritmo das animações:

| Contexto | Arquivo |
| --- | --- |
| Principal, campo vazio e interface | CursorNormal.ani |
| Monstro vivo e atacável fora da área segura | Atack.cur |
| Cristais coletáveis | Coleta.ani |
| Saque no chão | PegarItens.cur |
| Aelric para conversa | ConversasNPC.cur |
| Aelric com missão pronta para entregar | MissaoCompleta.cur |

Ao sair do alvo, o cursor retorna ao normal. Saque tem coleta **manual**:
aproxime-se e clique no objeto. Andar por cima ou usar F não recolhe saque.
Não há caminhada automática até o item. Itens distantes ou com obstáculo no caminho
não são recolhidos. Um consumível com reserva cheia permanece no chão.

Os ANI foram transcodificados em PNGs embutidos e animados pelo próprio cliente,
sem depender do suporte de Windows/macOS a ANI no navegador. Os originais estão
preservados em `assets/cursors/original`. A camada do cursor não recebe cliques;
os cliques mantêm suas coordenadas nativas, ajustando apenas a imagem ao hotspot.

## Interface aprovada

Preto/carvão, bronze e dourado. HUD no superior esquerdo; minimapa com localização
 e coordenadas no superior direito; missões minimizáveis abaixo do mapa; chat local
no inferior esquerdo; barras compactas F1–F8 e 1–9 ao centro da base; atalhos de
mochila, personagem, árvore e opções no inferior direito, apenas com ícones e teclas.
O ouro aparece no inventário.

## O que você pode analisar

- Uma floresta com clareira segura, trilhas, rio, ponte, santuário, cristais e ruínas.
- Aelric, guia dos iniciantes, com uma jornada que apresenta as mecânicas.
- Três famílias de criaturas comuns e o chefe Cerne Corrompido.
- Espada e escudo, ataque direcional, esquiva, Golpe Frontal e Postura de Bastião.
- Níveis, atributos, árvore de passivas, mochila, poções e saque.
- Equipamentos que alteram a aparência do Guardião.
- Salvamento local, exportação/importação da jornada e ferramentas de análise.

**WASD** move, **mouse esquerdo** ataca, **Q** esquiva, **F** interage,
**1/2** usam técnicas aprendidas, **F1/F2** usam poções. **C/I/T/M** abrem
personagem, mochila, árvore e mapa. **Esc** abre opções e ferramentas de teste. **Enter** abre o chat local.
A janela de missões pode ser recolhida com o botão no cabeçalho.

Comece conversando com Aelric, junto à bandeira azul ao norte da posição inicial.
Distribua os cinco pontos iniciais em **C**. No nível 5, o guia ensina Golpe Frontal.

## Salvar e continuar

Para trazer o personagem das **v0.1/v0.2/v0.3/v0.4/v0.5/v0.6/v0.7/v0.8**, exporte a jornada na versão anterior e importe
o JSON nesta versão. O formato do personagem permanece compatível.

O personagem fica salvo neste navegador. Use **Esc > Exportar jornada** para
guardar um JSON ou levar o progresso para outro computador. O guia completo de uso
está em [LEIA-ME.txt](LEIA-ME.txt). Esta versão ainda não tem multiplayer ou contas.

A proposta para o servidor autoritativo, PostgreSQL, clientes Java/JavaScript,
persistência e proteção contra duplicação está em [ARQUITETURA.md](ARQUITETURA.md).

## Fonte e validação

```sh
node --test tests/core.test.js tests/cursors.test.js tests/inventory.test.js tests/hands.test.js tests/character.test.js tests/passives.test.js
node tests/simulation.test.js
python tests/test_cursor_conversion.py
python build.py
```

Esses comandos são para desenvolvimento; o jogador só precisa do HTML.
Consulte [VALIDACAO.md](VALIDACAO.md) para os testes realizados e limites de verificação.
Parâmetros desta área continuam abertos a balanceamento, conforme [CHANGELOG.md](CHANGELOG.md).


