# Mythos Online — O Primeiro Juramento

Protótipo **offline em JavaScript** da primeira área, o **Bosque da Aurora**, com
o **Guardião** como personagem jogável. Windows e macOS, no navegador do desktop.

## Baixar e jogar

1. Baixe [Mythos_Online_Offline_v0.3.zip](Mythos_Online_Offline_v0.3.zip).
2. Extraia o ZIP.
3. Abra **Mythos_Online_Offline_v0.3.html** com dois cliques.

No GitHub, use **Download raw file** para salvar o arquivo. O jogo funciona sem
internet, servidor, Java ou Node.js instalado. O HTML contém todos os assets e códigos.
Também é possível baixar apenas [o HTML autossuficiente](Mythos_Online_Offline_v0.3.html).

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
- Níveis, atributos, recorte da árvore de talentos, mochila, poções e saque.
- Equipamentos que alteram a aparência do Guardião.
- Salvamento local, exportação/importação da jornada e ferramentas de análise.

**WASD** move, **mouse esquerdo** ataca, **Q** esquiva, **F** interage,
**1/2** usam técnicas aprendidas, **F1/F2** usam poções. **C/I/T/M** abrem
personagem, mochila, árvore e mapa. **Esc** abre opções e ferramentas de teste. **Enter** abre o chat local.
A janela de missões pode ser recolhida com o botão no cabeçalho.

Comece conversando com Aelric, junto à bandeira azul ao norte da posição inicial.
Distribua os cinco pontos iniciais em **C**. No nível 5, o guia ensina Golpe Frontal.

## Salvar e continuar

Para trazer o personagem das **v0.1/v0.2**, exporte a jornada na versão anterior e importe
o JSON nesta versão. O formato do personagem permanece compatível.

O personagem fica salvo neste navegador. Use **Esc > Exportar jornada** para
guardar um JSON ou levar o progresso para outro computador. O guia completo de uso
está em [LEIA-ME.txt](LEIA-ME.txt). Esta versão ainda não tem multiplayer ou contas.

A proposta para o servidor autoritativo, PostgreSQL, clientes Java/JavaScript,
persistência e proteção contra duplicação está em [ARQUITETURA.md](ARQUITETURA.md).

## Fonte e validação

```sh
node --test tests/core.test.js tests/cursors.test.js
node tests/simulation.test.js
python tests/test_cursor_conversion.py
python build.py
```

Esses comandos são para desenvolvimento; o jogador só precisa do HTML.
Consulte [VALIDACAO.md](VALIDACAO.md) para os testes realizados e limites de verificação.
Parâmetros desta área continuam abertos a balanceamento, conforme [CHANGELOG.md](CHANGELOG.md).


