# Aplicação das passivas — Mythos Online v0.9

A árvore integrada contém 800 passivas em 48 grupos. O Guardião é a única origem,
sem bônus gratuito, e o orçamento é nível menos um (máximo 98). Cada ponto custa um.
Os 51 modificadores abaixo têm consumidores efetivos e testes individuais.

## Confirmar e persistir

A prévia usa os mesmos cálculos do personagem, sem modificar o estado confirmado.
Aplicar valida conexões, nível, orçamento, requisitos, capacidade e custo antes de
alterar o personagem. Os bônus são sempre derivados dos IDs do catálogo, sem serem
somados novamente a cada abertura ou load. O save guarda os IDs em tree e a marca
passiveVersion 2. A árvore antiga é reembolsada integralmente para redistribuição.
O estudo independente não é aceito como jornada do personagem.

Adicionar passivas não custa ouro. Remover qualquer passiva aplicada custa 20 ouro
por confirmação, na clareira e fora de combate. Isso não cura nem reinicia recargas.
Se a retirada de atributos invalidar um item, ele fica na mochila e o encaixe é
corrigido; se faltar capacidade, a operação inteira é recusada.

## Consumidores dos modificadores

| Modificador | Unidade | Uso efetivo |
| --- | --- | --- |
| Força | Valor plano | Força efetiva; poder das armas e requisitos de equipamento. |
| Destreza | Valor plano | Destreza efetiva; precisão (base 100 + 2 por ponto) e requisitos. |
| Magia | Valor plano | Magia efetiva; mana máxima, poder mágico e requisitos. |
| Vitalidade | Valor plano | Vitalidade efetiva; 20 de vida máxima por ponto acima da base. |
| Dano físico | % | Multiplicador do acerto e base dos efeitos contínuos de fonte física. |
| Dano corpo a corpo | % | Acertos com fonte corpo a corpo. |
| Dano com armas de uma mão | % | Dano marcial com arma de uma mão na mão que ataca. |
| Dano com armas de duas mãos | % | Dano marcial com arma de duas mãos; sem duplicar o item. |
| Dano ao usar duas armas de uma mão | % | Dano marcial ao equipar duas armas distintas de uma mão. |
| Dano em área | % | Acertos em área, incluindo Golpe Frontal. |
| Penetração de defesa física | % | Reduz a defesa física considerada no cálculo do acerto físico. |
| Vida máxima | % | Multiplica a vida máxima depois de atributos e vida plana. |
| Regeneração de vida | % | Multiplica a regeneração de vida fora de combate. |
| Vida máxima | Valor plano | Soma vida plana antes do multiplicador de vida máxima. |
| Recuperação de vida recebida | % | Multiplica recuperação de vida de regeneração e poções. |
| Recuperação das poções de vida | % | Multiplica a quantidade restaurada pela poção de vida. |
| Mana máxima | % | Multiplica a mana máxima depois de atributos e mana plana. |
| Regeneração de mana | % | Multiplica a regeneração de mana em combate e fora dele. |
| Mana máxima | Valor plano | Soma mana plana antes do multiplicador de mana máxima. |
| Dano mágico | % | Dano de fontes mágicas, incluindo fontes de fogo/gelo/raio. |
| Redução do custo de mana das técnicas | % | Reduz o custo real de mana de Golpe Frontal e Bastião. |
| Defesa mágica | % | Defesa usada contra dano mágico e elemental recebido. |
| Dano elemental | % | Dano de fontes de fogo, gelo e raio. |
| Dano de fogo | % | Dano de fonte de fogo; não converte um ataque físico. |
| Dano de gelo | % | Dano de fonte de gelo; não concede congelamento. |
| Dano de raio | % | Dano de fonte de raio. |
| Resistência ao fogo | Pontos percentuais | Reduz dano de fogo depois da defesa mágica. |
| Resistência ao gelo | Pontos percentuais | Reduz dano de gelo depois da defesa mágica. |
| Resistência ao raio | Pontos percentuais | Reduz dano de raio depois da defesa mágica. |
| Velocidade de ataque | % | Reduz preparo, recuperação e recarga do ataque básico na mesma proporção. |
| Precisão dos ataques | % | Altera a chance de acerto marcial contra a evasão do alvo. |
| Chance de acerto crítico | Pontos percentuais | Chance efetiva de crítico, em pontos percentuais. |
| Multiplicador de dano crítico | Pontos percentuais | Multiplicador do dano crítico, em pontos percentuais acima de 150%. |
| Dano de projéteis | % | Dano de fontes de projétil; não modifica a espada corpo a corpo. |
| Chance de aplicar veneno | Pontos percentuais | Chance de aplicar veneno em um acerto físico marcial. |
| Dano de veneno | % | Dano por segundo do veneno aplicado. |
| Duração do veneno | % | Duração do veneno aplicado, com base de 4 segundos. |
| Chance de aplicar sangramento | Pontos percentuais | Chance de aplicar sangramento em um acerto físico marcial. |
| Dano de sangramento | % | Dano por segundo do sangramento aplicado. |
| Dano ao longo do tempo | % | Dano por segundo tanto de veneno quanto de sangramento. |
| Resistência ao veneno | Pontos percentuais | Reduz o dano de veneno recebido por segundo. |
| Dano direto | % | Dano do acerto imediato; não é incluído na base do dano contínuo. |
| Defesa física | % | Defesa física usada na mitigação de acertos físicos. |
| Chance de bloqueio com escudo | Pontos percentuais | Chance de bloqueio passivo frontal, apenas com escudo e fora da recuperação. |
| Recuperação após bloquear | % | Reduz a janela de recuperação entre bloqueios passivos. |
| Resistência a atordoamento | % | Reduz a duração do atordoamento recebido. |
| Defesas concedidas pelo escudo | % | Multiplica somente as defesas fornecidas pelo escudo equipado. |
| Velocidade de movimento | % | Deslocamento real do personagem; preserva a distância/recarga de Q. |
| Resistência à lentidão | % | Reduz a intensidade da lentidão recebida. |
| Recuperação das poções de mana | % | Multiplica a quantidade restaurada pela poção de mana durante 5 segundos. |
| Recuperação de vida e mana | % | Multiplica a recuperação de vida e mana de regeneração e poções. |

## Fórmulas e condições desta calibração

- Vida base: 300 + 20 por nível após o primeiro + 20 por Vitalidade acima de 5,
  mais vida plana; depois aplica aumento percentual da vida máxima.
- Mana base: 100 + 5 por nível após o primeiro + 10 por Magia acima de 5,
  mais mana plana; depois aplica aumento percentual da mana máxima.
- Poder marcial usa o poder da arma e o fator 1 + Força/100. Sem arma, a base é 10.
  O poder mágico de referência usa 20 + Magia; técnicas futuras podem fornecer uma
  base própria pelo mesmo perfil de fonte, sem duplicar os modificadores.
- Aumentos de dano compatíveis e penalidades do acerto são somados na categoria
  de dano e convertidos em um multiplicador. A fonte e a arma que ataca determinam
  quais condições são aplicáveis. O dano em área só entra em um perfil de área.
- A defesa reduz o dano pelo fator 500 / (500 + defesa). Penetração física reduz
  primeiro a defesa física considerada. Resistência elemental é aplicada depois.
- Precisão base: 100 + 2 × Destreza, multiplicada pelo aumento de precisão.
  Acerto marcial: precisão / (precisão + evasão do alvo). Evasão de referência
  dos monstros: 7 + 2 × nível. Fontes de magia não fazem esse teste marcial.
- Chance crítica base: 5%. Multiplicador crítico base: 150%. Bônus em pontos
  percentuais são somados diretamente aos respectivos valores.
- Ataque básico: intervalo 0,58 s, preparo 0,12 s e recuperação 0,32 s, todos divididos
  pela velocidade de ataque. Técnicas mantêm suas recargas. Q continua em 10 s.
- Movimento base: 132 unidades/s (4,125 m/s). Bônus altera esse deslocamento real.
- Vida regenera 2% do máximo por segundo fora de combate. Mana regenera 3% fora
  de combate e 0,5% em combate. Regeneração, recuperação de vida e recuperação de
  recursos multiplicam suas fontes compatíveis. O comportamento base foi preservado.
- Poção de vida: base de 80, multiplicada por poções de vida, recuperação de vida
  e recuperação de recursos. Poção de mana: base de 60, multiplicada por poções de
  mana e recuperação de recursos, distribuída em 5 segundos. Recargas: 20 s.
- Custos base: Golpe Frontal 10 mana; Bastião 14. O redutor de custo é aplicado ao
  iniciar a ação. Cancelar a ação não restitui o custo ou a recarga.
- Veneno: base de 12% do poder compatível por segundo, durante 4 s. Sangramento:
  base de 15% por segundo, durante 4 s. Potência e dano contínuo aplicáveis são
  somados. Dano direto não modifica essa base. Duração de veneno modifica seu tempo.
  Há uma instância ativa por tipo; novos acertos preservam a maior potência e duração,
  sem criar cargas infinitas. O dano é calculado ao aplicar o efeito.
- Dano contínuo ignora defesa de acerto. Resistência ao veneno reduz veneno recebido.
  Morte, retorno do monstro e a área segura respeitam as proteções de combate;
  uma morte por efeito contínuo concede recompensa uma única vez.
- Bloqueio passivo exige escudo, fonte frontal em arco de 120 graus, chance disponível
  e recuperação terminada. Bloqueios reduzem 70% do acerto. Ataques de área no chão e
  dano contínuo não são bloqueados. A recuperação base é 0,6 s, dividida pelo seu bônus.
  O Bastião manual continua sendo uma postura ativa distinta.
- Atordoamento: duração dividida por 1 + resistência/100. Lentidão: intensidade
  dividida pelo mesmo fator da resistência correspondente. Não há imunidade automática.

## Limites aplicados

São hipóteses de balanceamento desta versão, registradas para poder revisá-las:

- Chance crítica e bloqueio passivo: até 75%.
- Resistências tipadas: entre −50% e 75%.
- Penetração física: até 75% da defesa considerada.
- Redução do custo de mana: até 80%; uma técnica nunca gera mana ao ser usada.
- Velocidade de ataque: de 30% a 200% da base; movimento: de 40% a 150%.
- Chance de acerto marcial: de 50% a 99%; veneno e sangramento: de 0% a 100%.
- Vida/mana máximas nunca ficam abaixo de 1; fatores percentuais não ficam negativos.

O resumo da árvore exibe os modificadores brutos. Os status do personagem mostram
os valores efetivos depois de equipamentos, condições e limites. O poder de cada
fonte é um valor antes da defesa do alvo, não uma promessa de dano final.

## Fontes disponíveis e laboratório

O Guardião atual possui ataques físicos e Golpe Frontal em área. Com passivas de
chance, esses acertos podem aplicar veneno e sangramento. Bônus de uma ou duas mãos,
duas armas e escudo exigem os respectivos equipamentos. A árvore não altera as
restrições de armas e classes nem concede técnicas ativas de outras classes.

Dano mágico, elementos e projéteis usam perfis prontos no mesmo motor e podem ser
conferidos em Esc > Ferramentas de análise > Laboratório de passivas. Esse laboratório
calcula golpes contra defesa 25 e pode aplicar dano/controle ao próprio personagem
para verificar resistências. Não ensina técnicas e não inventa uma fonte elemental
no ataque físico do Guardião. Novas classes, armas e técnicas usarão esses mesmos
consumidores. As fontes naturais dos monstros desta área permanecem as anteriores.

Atalho de análise: preparar nível 99 altera o personagem e salva. Exporte a jornada
antes para preservar sua progressão normal. Todos os valores seguem calibráveis.
