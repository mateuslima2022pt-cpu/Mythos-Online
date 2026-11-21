# Mythos Online — Estudo da Árvore de Passivas v1.0

HTML independente e offline para testar e ler a árvore proposta. O Guardião é o
único modelo de classe no centro. Não existem outras classes distribuídas na árvore.

## Abrir

Baixe [o HTML](Mythos_Online_Arvore_Passivas_v1.0.html) com **Download raw file**
e abra no navegador do desktop. O arquivo contém a arte, o catálogo e o código;
não precisa de internet, servidor, Java ou Node.js. O [ZIP](Mythos_Online_Arvore_Passivas_v1.0.zip)
inclui o HTML, as fontes, documentação e o catálogo completo em CSV e JSON.

## Conteúdo

- Uma origem gratuita, com o modelo visual do Guardião no centro.
- **800 passivas** em **48 grupos**, oito afinidades e **51 modificadores** definidos.
- Todas as passivas pertencem à mesma rede conectada. Afinidades não bloqueiam caminhos.
- Pontos menores de passagem, passivas menores, 48 notáveis e oito escolhas maiores.
- Escolhas maiores incluem benefício e contrapartida expressos no tooltip.
- Um ponto por novo nível: nível 1 começa sem pontos; nível 99 oferece 98.

Afinidades: Força & Armas; Vida & Regeneração; Magia & Mana; Elementos;
Destreza & Crítico; Veneno & Sangramento; Defesa & Escudos; Mobilidade & Recursos.
Cada afinidade tem 100 pontos possíveis. O orçamento de 98 obriga a escolher caminhos.

## Testar e ler

Passe o mouse sobre qualquer ponto para ver **título e efeitos numéricos**, mesmo
que ele ainda não esteja conectado. O tooltip usa uma faixa de título e bônus em
violeta, conforme a referência enviada. Clique no ponto para abrir os detalhes.

Use **Adicionar 1 ponto** na lateral ou **Adicionar caminho**, que seleciona uma
rota curta a partir da distribuição atual. O custo da rota é exibido antes da ação.
Duplo clique também adiciona; clique direito tenta remover da prévia. Não é possível
remover um ponto que sustenta outros, salvo se houver uma rota alternativa conectada.

**Aplicar** confirma a distribuição e salva o estudo. **Cancelar** descarta todas as
alterações pendentes, inclusive remoções. O campo **Nível de teste** aceita 1–99;
reduzir o nível é recusado se invalidar os pontos já escolhidos.

**Buscar** procura nomes e descrições sem distinguir acentos. O filtro de afinidade
realça os pontos encontrados sem retirar a rede. **Catálogo** lista todas as 800
passivas, com seus efeitos, e permite centralizar o ponto. **Resumo** soma os bônus
da distribuição em prévia, incluindo penalidades.

Arraste o fundo para mover. Role o mouse ou use +/− para ampliar. **Ver tudo** mostra
a rede completa; **Minha origem** retorna ao Guardião. No mapa, setas movem a visão,
+ e − controlam o zoom, Home centraliza e Esc esconde o tooltip. Enter/Espaço em um
ponto focado abre os detalhes.

## Salvar o estudo

O estudo usa armazenamento local próprio: `mythos.passive.study.v1`. O save do jogo
não é lido ou modificado. **Exportar** baixa somente a distribuição aplicada em JSON;
**Importar** valida nível, pontos, IDs e conexão antes de substituir o estudo.
Salvar não inclui a prévia. Ao reabrir, a última distribuição aplicada é restaurada.
Se o navegador bloquear o armazenamento local, use Exportar. Mover o HTML ou trocar
de navegador pode separar o armazenamento; guarde o JSON para preservar a análise.

**Limpar estudo** pede confirmação dentro da interface e zera somente este estudo.
Esta entrega não integra a árvore ao combate ou às estatísticas do protótipo v0.8.
O resumo representa modificadores, sem simular o dano final de equipamentos/técnicas.
Os valores constituem a proposta inicial de balanceamento, aberta a ajustes.

## Definições e fontes

[ATRIBUTOS_PASSIVOS.md](ATRIBUTOS_PASSIVOS.md) define os 51 modificadores e suas condições.
[CATALOGO_PASSIVAS.csv](CATALOGO_PASSIVAS.csv) contém cada ponto, bônus e conexões;
[catalogo.json](catalogo.json) mantém os dados estruturados.

A organização em corredores, agrupamentos e passivas de tamanhos distintos foi
estudada na [exportação oficial da GGG](https://github.com/grindinggear/poe2-skilltree-export).
Nomes, valores, grafo, ícones e interface desta entrega são próprios do Mythos.
A arte do Guardião é a mesma usada no protótipo já aprovado.

## Desenvolvimento

```sh
node --test tests/model.test.js
node tests/ui.test.cjs
python build.py
```

Consulte [VALIDACAO.md](VALIDACAO.md) para resultados e limites da verificação.
