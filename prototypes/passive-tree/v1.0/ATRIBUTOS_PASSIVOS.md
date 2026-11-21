# Atributos passivos — proposta v1.0

A árvore contém 800 passivas e 51 modificadores. Valores e regras abaixo são a
proposta para teste; esta entrega é um planejador independente, sem integração ao
combate do protótipo. O catálogo individual está em CSV, JSON e na aba Catálogo.

## Como ler os bônus

- Valores planos se somam. Aumentos do mesmo modificador se somam antes de multiplicar a base.
- Pontos percentuais (p.p.) somam diretamente a uma chance ou resistência. Não são um aumento relativo.
- Bônus genéricos e específicos aplicáveis são categorias distintas; o planejador mostra cada uma separadamente, sem estimar DPS.
- Penalidades são somadas à mesma categoria, aparecendo com sinal negativo no resumo.
- Uma passiva não ignora requisitos de classe, atributos, armas, escudos ou fontes de dano.
- Regeneração, veneno, sangramento e elementos exigem fontes compatíveis; a árvore não concede técnicas ativas.
- Limites finais de resistência, crítico, velocidade e custo de mana serão fixados junto ao sistema de combate. O resumo exibe modificadores brutos, sem confundir isso com estatísticas finais.
- O ponto de origem é gratuito e sem bônus. Cada outro ponto custa 1. Nível 1 tem zero; nível 99 tem 98.

## Modificadores

| Atributo | Unidade | Incidência |
| --- | --- | --- |
| Força | Valor plano | Soma ao atributo Força, preservando requisitos de classe e equipamento. |
| Destreza | Valor plano | Soma ao atributo Destreza. |
| Magia | Valor plano | Soma ao atributo Magia. |
| Vitalidade | Valor plano | Soma ao atributo Vitalidade. |
| Dano físico | % | Aplica-se a fontes de dano físico. |
| Dano corpo a corpo | % | Aplica-se a ataques e técnicas corpo a corpo. |
| Dano com armas de uma mão | % | Exige arma de uma mão; não remove restrições de classe. |
| Dano com armas de duas mãos | % | Exige uma arma de duas mãos; o mesmo item ocupa ambas as mãos. |
| Dano ao usar duas armas de uma mão | % | Exige duas armas distintas de uma mão, sem escudo. |
| Dano em área | % | Aplica-se à parcela de dano de ataques/técnicas em área. |
| Penetração de defesa física | % | Ignora a fração indicada da defesa física do alvo; não é redução permanente. |
| Vida máxima | % | Multiplica a vida máxima depois dos valores planos e atributos. |
| Regeneração de vida | % | Aumenta uma fonte existente de regeneração de vida; não cria regeneração do zero. |
| Vida máxima | Valor plano | Adiciona vida plana antes de aumentos percentuais. |
| Recuperação de vida recebida | % | Afeta vida recuperada; não aumenta vida máxima. |
| Recuperação das poções de vida | % | Afeta a quantidade recuperada por poções de vida, sem mudar recarga. |
| Mana máxima | % | Multiplica a mana máxima depois dos valores planos e atributos. |
| Regeneração de mana | % | Aumenta uma fonte existente de regeneração de mana, sem criá-la do zero. |
| Mana máxima | Valor plano | Adiciona mana plana antes de aumentos percentuais. |
| Dano mágico | % | Afeta fontes de dano mágico; não concede uma técnica ativa. |
| Redução do custo de mana das técnicas | % | Reduz o custo das técnicas que consomem mana; não gera mana nem reduz a recarga. |
| Defesa mágica | % | Aumenta defesa mágica. Não é resistência elemental em pontos percentuais. |
| Dano elemental | % | Afeta fontes de fogo, gelo e raio. Não cria uma fonte de dano elemental. |
| Dano de fogo | % | Exige uma fonte de dano de fogo. |
| Dano de gelo | % | Exige uma fonte de dano de gelo. |
| Dano de raio | % | Exige uma fonte de dano de raio. |
| Resistência ao fogo | Pontos percentuais | Acrescenta pontos percentuais à resistência ao fogo. |
| Resistência ao gelo | Pontos percentuais | Acrescenta pontos percentuais à resistência ao gelo. |
| Resistência ao raio | Pontos percentuais | Acrescenta pontos percentuais à resistência ao raio. |
| Velocidade de ataque | % | Afeta ataques básicos compatíveis, não concede ataques adicionais por frame. |
| Precisão dos ataques | % | Aumenta a precisão de ataques compatíveis; não garante acerto. |
| Chance de acerto crítico | Pontos percentuais | Soma pontos percentuais à chance crítica, sem multiplicar a chance anterior. |
| Multiplicador de dano crítico | Pontos percentuais | Soma pontos percentuais ao multiplicador crítico. Ex.: 150% + 12 p.p. = 162%. |
| Dano de projéteis | % | Aplica-se a fontes de dano de projéteis. |
| Chance de aplicar veneno | Pontos percentuais | Chance adicional por acerto compatível com veneno; não cria dano de veneno por si só. |
| Dano de veneno | % | Exige uma fonte de dano de veneno. Não aumenta dano do acerto direto. |
| Duração do veneno | % | Aumenta duração de um veneno aplicado, sem criar cargas adicionais. |
| Chance de aplicar sangramento | Pontos percentuais | Chance adicional por acerto compatível com sangramento. |
| Dano de sangramento | % | Exige fonte de sangramento; afeta o dano ao longo do tempo. |
| Dano ao longo do tempo | % | Aumenta dano contínuo, incluindo veneno e sangramento compatíveis. |
| Resistência ao veneno | Pontos percentuais | Acrescenta pontos percentuais à resistência ao veneno. |
| Dano direto | % | Afeta o dano imediato do acerto, sem afetar veneno ou sangramento posteriores. |
| Defesa física | % | Aumenta a defesa física, sem prometer redução de dano da mesma porcentagem. |
| Chance de bloqueio com escudo | Pontos percentuais | Exige escudo. É uma proposta de chance passiva, não muda o botão Bastião do jogo atual. |
| Recuperação após bloquear | % | Reduz a recuperação após um bloqueio compatível; não altera a esquiva Q. |
| Resistência a atordoamento | % | Aumenta resistência a atordoamento; não concede imunidade automática. |
| Defesas concedidas pelo escudo | % | Aumenta somente as defesas fornecidas pelo escudo equipado. |
| Velocidade de movimento | % | Aumenta a velocidade de deslocamento; não altera duração ou recarga da esquiva. |
| Resistência à lentidão | % | Aumenta resistência ao efeito de lentidão. |
| Recuperação das poções de mana | % | Afeta a quantidade recuperada por poções de mana, sem mudar recarga. |
| Recuperação de vida e mana | % | Aplica aumento à recuperação de vida e mana; não altera os limites máximos. |

## Escolhas maiores

Cada afinidade tem uma escolha maior, que oferece uma especialização e uma contrapartida.

- **Corpo de Aço**: +30% de defesa física; −10% de velocidade de movimento.
- **Pulso Imortal**: +20% de vida máxima; −15% de mana máxima.
- **Mar de Éter**: +30% de mana máxima; −10% de vida máxima.
- **Convergência Arcana**: +25% de dano elemental; −10% de dano físico.
- **Precisão Implacável**: Chance de acerto crítico: +8 pontos percentuais; −15% de dano físico.
- **Sangue Alquímico**: +35% de dano ao longo do tempo; −12% de dano direto.
- **Fortaleza Viva**: +20% de defesa física; +20% de defesa mágica; −10% de velocidade de ataque.
- **Passo do Vento**: +15% de velocidade de movimento; −10% de defesa física.
