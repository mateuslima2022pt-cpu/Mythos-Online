# Proposta de balanceamento PvE 1–99

Esta é a edição inicial do catálogo; valores são hipóteses, exceto os campos
observáveis dos quatro encontros existentes. O jogo permanece na v0.9.

## Curvas para dimensionar encontros

Referência de DPS efetivo por jogador: D(L) = 8 + 1,2L + 0,045L².
Referência de vida de um jogador com 40% dos pontos de atributo em Vitalidade:
H(L) = 300 + 60(L−1). Essas referências não são estatísticas garantidas de uma build,
nem substituem medir armas, refino, pedras e passivas durante o desenvolvimento.
D é tomado após a mitigação de referência; não se reaplica defesa ao calcular o HP-alvo.

HP proposto: D × duração-alvo × contribuição efetiva do grupo. Para chefes/minibosses,
a contribuição considera 70% do grupo atacando efetivamente, reservando espaço para
cura, objetivos e deslocamento. Grupos são recomendações de análise, não restrições
já aprovadas de composição. Comuns/elite usam um alvo de referência solo.

- Comuns: cerca de 12 s; inimigos de preenchimento da dungeon têm fator 0,6 nesse HP.
- Elites: 24 s, normalmente dupla ou solo com equipamento adequado.
- Minibosses: 75 s para o grupo indicado.
- Chefes: 180 s; raid final: 300 s de fase útil.
- Dungeons: 25–40 min de sessão; raid: 45–60 min, incluindo deslocamento e tentativas.
- Ataque bruto: aproximadamente 3,5% de H para comuns, 5% elites, 7,5% minibosses
  e 12% chefes. A defesa do personagem ainda reduz o dano recebido.
- Os quatro encontros existentes usam os valores reais do protótipo, sem recalculá-los.

EXP futura usa 12 + 5L + 0,2L², com fatores de categoria para comparação inicial.
Esses fatores não estão ajustados à curva de XP do jogo e não devem ser importados
como tabela final. Será preciso definir divisão de grupo, contribuição e ritmo de nível.

## Regras de encontro

Todos os golpes fortes têm preparação, forma de área e aviso sonoro. Não se exige
classe específica, possuir voo ou um item de loja para resolver a mecânica.
Chefes regionais usam participação pública; o tamanho indicado não é limite rígido.
O Cerne Corrompido continua solo, conforme o protótipo. Chefes futuros de evento
recebem área de reset e recompensas por contribuição, a especificar no servidor.
Dungeons têm retorno seguro e reinício de instância; não despawnam um chefe vencido
no meio da mesma tentativa. As ilhas oferecem acessos terrestres/portais de instância.

Resistências propostas são moderadas (0–30%) e não imunidades elementais permanentes.
Chefes/minibosses têm redução de duração de controles para evitar travamento, mas
janelas de interrupção por mecânica continuam funcionais. Valores de controle e
resistência das novas fichas ainda precisam de teste. Não modificar os quatro
monstros atuais automaticamente com essas regras futuras.

Enrage é pressão crescente depois do tempo indicado, sem execução inevitável.
Limites, escalonamento por participantes e versão heroica exigem especificação própria.
Não fixamos chance de lendário, quantidade de moedas ou receita de pedras neste
catálogo. Drops são categorias; economia, refino e fusão serão balanceados juntos.

O roteiro de regiões usa Vale da Aurora, Bosque das Cinzas, Cordilheira de Ferro,
Pântano dos Juramentos, Ermos de Aster e Ilhas do Véu, propostos no GDD. As cidades
seguras não têm encontros hostis neste catálogo. Arenas e guerras são PvP e não
substituem a progressão PvE. Novas variantes devem receber ID/versionamento próprios.
