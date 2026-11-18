# MYTHOS ONLINE

GDD consolidado e ilustrado • Versão 1.0 • 18 de novembro de 2026

Documento de referência para design, prototipagem e desenvolvimento. Consolida as definições do criador e as respostas aprovadas nas questões 1–109. As escolhas posteriores substituem propostas anteriores quando existe conflito. Não representa um jogo já implementado nem comprovação de equilíbrio ou capacidade técnica.

As tabelas numéricas aprovadas são a linha de base de teste. O projeto é um documento vivo: mudanças durante o desenvolvimento devem registrar motivo, versão e efeito esperado. Detalhes que ainda não foram escolhidos são identificados como direção de produção ou parâmetros a calibrar, sem novas rodadas de perguntas.

## 01 · Identidade e promessa do jogo

Mythos Online é um MMORPG 2D de fantasia medieval clássica, com magia, combate de ação, mundo persistente e construção de personagens por escolhas de progressão. O jogador cria sua história por exploração, conquistas, comércio, equipamentos e relações com outros jogadores e guildas.

**Promessa central:** sua build define como você luta; suas escolhas definem como você será lembrado.

A experiência combina classes com evoluções, distribuição manual de atributos, uma grande árvore passiva conectada, nove posições de técnicas, equipamentos com requisitos, refinamento até +20 e seis famílias de pedras até nível 8. A liberdade existe dentro da classe, das permissões de equipamentos e dos caminhos escolhidos. Não há troca livre da classe inicial nem acesso automático às técnicas de outras classes.

### Pilares

| Pilar | Compromisso |
| --- | --- |
| Construção de build | Atributos, árvore, técnicas, afixos, pedras e equipamentos oferecem escolhas distintas |
| Progressão perceptível | Cada item muda o visual; pedras e refinamento acrescentam status e efeitos |
| Combate legível | Colisão confirma o golpe; movimento, preparação e defesa ativa importam |
| Peso das decisões | Retirar pedras as destrói; refinar sem proteção pode destruir toda a peça |
| Mérito coletivo | Guildas conquistam e defendem territórios por força, preparação e organização |
| Mundo social | Capitais, vilas, comércio, forjas e dungeons sustentam relações persistentes |

O público de referência gosta de RPG online, evolução de equipamentos, experimentação, cooperação e competição. Classificação indicativa, idiomas adicionais e requisitos mínimos serão definidos na produção. Não existe estimativa de lançamento aprovada.

### Ciclos de jogo

**Combate:** observar → posicionar → executar → reagir → administrar recursos.

**Aventura:** escolher objetivo → preparar build → explorar → enfrentar desafios → obter recompensa → aperfeiçoar o personagem.

**Economia:** coletar → fabricar ou negociar → equipar ou vender → consumir recursos em serviços → voltar às atividades.

**Guilda:** recrutar → organizar funções → reunir recursos → disputar um ataque → conquistar ou defender uma cidade → registrar a história do clã.

## 02 · Universo, mundo e narrativa

> DIREÇÃO NARRATIVA — A ambientação abaixo desenvolve a base do primeiro GDD. Geografia, nomes de conteúdo e histórias locais podem evoluir na produção.

O mundo de **Elyndra** foi protegido por pactos entre reinos, ordens mágicas e guardiões. A ruptura do **Coração do Éter** espalhou fragmentos capazes de alterar matéria, criaturas e memória. As pedras são manifestações estabilizadas dessa energia.

Reinos e guildas disputam cidades e rotas. Ruínas guardam conhecimento e ameaças. O personagem começa buscando autonomia e reconhecimento; sua importância cresce com seus feitos. A narrativa permite identidades como aventureiro, artesão, explorador, comerciante, combatente ou líder de guilda.

O ponto de chegada proposto é **Porto da Aurora**, uma capital de fronteira ligada a caravanas, oficinas e ruínas que voltaram a emitir luz. A cidade serve de introdução aos serviços e conflitos do continente.

### Um mundo grande e diverso

| Região proposta | Bioma e clima | Conteúdo |
| --- | --- | --- |
| Vale da Aurora | Campos, planícies e clima temperado | Capitais, vilas, contratos e rotas comerciais |
| Bosque das Cinzas | Floresta encantada, umidade e névoa | Santuários, recursos naturais e mistérios |
| Cordilheira de Ferro | Montanhas, minas e neve nas alturas | Forjas, fortalezas, passagens e territórios |
| Pântano dos Juramentos | Brejos, chuva e neblina | Criptas, maldições e dungeons |
| Ermos de Aster | Terras áridas e tempestades arcanas | Ruínas antigas e expedições avançadas |
| Ilhas do Véu | Ilhas elevadas e correntes mágicas | Travessia aérea e exploração futura |

Litorais, portos, desertos, regiões vulcânicas e áreas congeladas completam a direção de expansão. O mapa deve distribuir entradas de dungeons e oportunidades de exploração, em vez de concentrar toda a aventura num único ponto.

> Figura: Mapa conceitual de Elyndra. Regiões, capitais e dungeons ilustram a diversidade pretendida; não representam cartografia ou conteúdo implementado. A ilustração está incorporada no PDF.

### Capitais, vilas e serviços

Grandes capitais concentram mercados, forjas, mestres de classe, Mestre de Pedras, serviços de guilda e espaços sociais. Vilas apoiam a exploração regional. Grandes cidades e vilas são contabilizadas como territórios conquistáveis pelos clãs.

Clima e ciclo de dia e noite são direções de ambientação. Começam como linguagem visual e sonora; efeitos mecânicos específicos entram apenas quando trouxerem decisões úteis e puderem ser testados.

### História pessoal

A proposta de **Crônica do Aventureiro** registra descobertas, chefes derrotados, fabricação, reputações, guildas, conquistas territoriais e decisões de missões. Títulos e feitos destacados ajudam a apresentar a história do personagem.

Origens narrativas podem alterar diálogos e contratos iniciais sem conceder vantagem permanente exclusiva. Consequências locais e reputações são preferíveis a prometer uma campanha inteira produzida individualmente para cada jogador.

## 03 · Classes, contratos e evoluções

Existem seis classes iniciais. Cada uma permite várias famílias de armas compatíveis. Equipamentos exigem classe, nível e atributos; a árvore não elimina essas restrições.

| Classe | Set | Arsenal permitido |
| --- | --- | --- |
| Guardião | Pesado | Espadas, machados, maças, lanças e escudos |
| Arcanista | Mágico | Cajados, cetros, varinhas e grimórios |
| Patrulheiro | Leve | Arcos, bestas, adagas e lanças |
| Devoto | Mágico | Cajados, varinhas, cetros e grimórios |
| Sombra | Leve | Adagas, sabres e garras |
| Conjurador | Mágico | Cajados, varinhas, focos e grimórios |

O personagem nasce no nível 1, com arma específica de seu contrato inicial. O modelo exato dessa arma e a composição de eventual equipamento secundário inicial serão definidos no catálogo. O Devoto utiliza seu arsenal mágico aprovado; a antiga sugestão de maça inicial foi substituída.

### Dois marcos de evolução

A primeira evolução acontece no nível 30, mediante contrato. O jogador escolhe um de dois caminhos. No nível 60, outro contrato aprofunda o caminho e concede novo título, sem nova bifurcação. São 12 caminhos finais.

| Classe inicial | Nível 30 | Nível 60 |
| --- | --- | --- |
| Guardião | Cavaleiro | Cavaleiro Real |
| Guardião | Berserker | Senhor da Fúria |
| Arcanista | Elementalista | Mestre dos Elementos |
| Arcanista | Feiticeiro | Arquifeiticeiro |
| Patrulheiro | Atirador | Atirador de Elite |
| Patrulheiro | Caçador | Senhor das Feras |
| Devoto | Sacerdote | Sumo Sacerdote |
| Devoto | Paladino | Templário |
| Sombra | Assassino | Algoz |
| Sombra | Duelista | Mestre Duelista |
| Conjurador | Invocador | Mestre Invocador |
| Conjurador | Necromante | Senhor dos Mortos |

> Figura: Seis classes, duas especializações por classe e aprofundamento no nível 60: doze caminhos finais aprovados. A ilustração está incorporada no PDF.

| Especialização | Identidade funcional |
| --- | --- |
| Cavaleiro | Defesa física, escudo e proteção de aliados |
| Berserker | Pressão física e armas pesadas |
| Elementalista | Fogo, gelo, eletricidade e combinações elementais |
| Feiticeiro | Energia arcana, maldições e enfraquecimento |
| Atirador | Alcance, precisão de execução e disparos fortes |
| Caçador | Armadilhas, perseguição e companheiro animal |
| Sacerdote | Cura, purificação e bênçãos |
| Paladino | Combate próximo, proteção e magia sagrada |
| Assassino | Furtividade, veneno e ataques oportunistas |
| Duelista | Agilidade, contra-ataques e combate sustentado |
| Invocador | Criaturas mágicas e coordenação de invocações |
| Necromante | Mortos-vivos, drenagem e sacrifício de lacaios |

Evoluções concedem técnicas e alguns equipamentos exclusivos, preservando o arsenal da classe inicial. A tabela de sets é a regra aprovada; exceções de equipamentos por especialização precisam estar descritas no catálogo, sem presumir que um título libera automaticamente outra categoria.

É possível trocar de especialização dentro da classe inicial por contrato e recursos. A troca não altera a classe de origem. Custos, prazos e requisitos do contrato serão calibrados.

## 04 · Progressão e atributos

O nível máximo inicial é **99**. O personagem começa com cinco pontos básicos em cada atributo e mais cinco pontos livres. Os básicos não podem ser retirados por redefinição.

| Atributo | Função aprovada |
| --- | --- |
| Força | Poder de armas e técnicas que escalam com Força; requisitos |
| Destreza | Poder de armas e técnicas que escalam com Destreza; requisitos |
| Magia | Poder mágico, cura, poder das invocações, mana máxima e requisitos |
| Vitalidade | Vida máxima |

Velocidades, crítico e regeneração vêm principalmente de equipamentos, árvore e habilidades. Destreza não cria uma chance aleatória de fazer um golpe conectado errar.

### Pontos recebidos

Do nível 2 ao 99, cada evolução concede cinco pontos distribuíveis e um ponto de árvore. O personagem nasce sem ponto de árvore. Portanto, no nível 99 possui **495 pontos distribuíveis, 20 pontos básicos e 98 pontos de árvore**, antes de bônus externos.

| Nível | Pontos distribuíveis acumulados | Pontos de árvore | HP natural com VIT 5 | Mana natural com MAG 5 |
| --- | --- | --- | --- | --- |
| 1 | 5 | 0 | 300 | 100 |
| 5 | 25 | 4 | 380 | 120 |
| 15 | 75 | 14 | 580 | 170 |
| 30 | 150 | 29 | 880 | 245 |
| 50 | 250 | 49 | 1280 | 345 |
| 60 | 300 | 59 | 1480 | 395 |
| 80 | 400 | 79 | 1880 | 495 |
| 90 | 450 | 89 | 2080 | 545 |
| 99 | 495 | 98 | 2260 | 590 |

Pontos de árvore e pontos de atributos são recursos separados. Não há pontos extras de árvore por missões nesta base. Marcas narrativas e recompensas de exploração não elevam automaticamente o orçamento de 98.

### Vida e mana

Todas as classes compartilham as mesmas bases e crescimento natural.

| Componente | Vida | Mana |
| --- | --- | --- |
| Nível 1 com atributos básicos em 5 | 300 | 100 |
| Cada nível após o primeiro | +20 | +5 |
| Cada Vitalidade acima de 5 | +20 | — |
| Cada Magia acima de 5 | — | +10 |

**Vida natural = 300 + 20 × (nível − 1) + 20 × (Vitalidade − 5).**

**Mana natural = 100 + 5 × (nível − 1) + 10 × (Magia − 5).**

Os cinco pontos básicos já estão considerados no primeiro valor e não entram novamente como bônus. Equipamentos, pedras e árvore são acrescentados conforme suas propriedades; aumentos percentuais de vida são somados no grupo e aplicados uma vez sobre a vida calculada antes desses aumentos.

No nível 99, Vitalidade 100 produz 4.160 de vida natural; Magia 100 produz 1.540 de mana natural. Esses exemplos excluem itens, pedras e modificadores percentuais.

### Requisitos e redefinição

Requisitos de atributos de equipamentos contam **base + pontos distribuídos + árvore**. Bônus de equipamentos, pedras e efeitos temporários não liberam requisitos. Classe e nível continuam obrigatórios.

Redefinir atributos exige um recurso específico. Redefinir a árvore exige moeda. Trocar especialização continua sendo outra operação, por contrato e recursos. Qualquer redefinição revalida os equipamentos; o comportamento de interface deve mostrar incompatibilidades antes de confirmar. Custos e item de redefinição ainda não têm valores finais.

## 05 · A grande árvore passiva

A árvore é uma única rede conectada, inspirada no princípio de percorrer caminhos de atributos e especializações. Substitui a antiga organização em constelações independentes.

O objetivo de conteúdo é uma árvore de aproximadamente **700 nós**. Essa dimensão é uma ambição de produção, não um catálogo já desenhado. Todas as classes entram na mesma rede por posições próprias e podem alcançar outras regiões seguindo conexões.

| Classe | Região de entrada |
| --- | --- |
| Guardião | Força, Vitalidade e Defesa Física |
| Arcanista | Magia, mana e dano elemental |
| Patrulheiro | Destreza, armas de distância e velocidade de ataque |
| Devoto | Magia, cura e Defesa Mágica |
| Sombra | Destreza, crítico e veneno |
| Conjurador | Magia, dano e sobrevivência das invocações |

O marco inicial é gratuito e sem bônus. Todo nó comprado custa um ponto, inclusive notáveis e grandes modificadores. Com 98 pontos, o personagem compra até 98 nós. Distância, caminhos, condições e contrapartidas dão peso às escolhas.

> Figura: Recorte esquemático da árvore compartilhada. As seis entradas e os tipos de nós estão representados; o grafo final de aproximadamente 700 nós ainda será produzido. A ilustração está incorporada no PDF.

### Pequenos nós aprovados

| Família de nó | Bônus por nó |
| --- | --- |
| Força / Destreza / Magia / Vitalidade | +5 no atributo indicado |
| Dano físico ou mágico | +4% |
| Dano de elemento específico ou veneno | +6% |
| Vida máxima | +2% |
| Mana máxima | +3% |
| Defesa Física ou Mágica | +5% |
| Cura realizada | +4% |
| Dano das invocações | +6% |
| Vida das invocações | +5% |
| Velocidade de ataque ou conjuração | +2% |
| Chance crítica | +2 pontos percentuais |
| Multiplicador crítico | +10 pontos percentuais |
| Regeneração de mana | +10% sobre a taxa existente |

Cada nó concede apenas o efeito que sua descrição informa. Um nó de dano elemental específico não concede todos os elementos. Bônus para o personagem não devem ser interpretados automaticamente como bônus das invocações; a fonte precisa estar indicada.

Chance crítica usa pontos percentuais: 5% com um nó de +2 pontos passa a 7%. Multiplicador de 150% com +10 pontos passa a 160%. Regeneração de mana de 0,5% por segundo com +10% sobre a taxa passa a 0,55%, não a 10,5%.

### Agrupamentos e notáveis

Um agrupamento típico tem caminho de três a cinco pequenos nós e um notável. Ramos, anéis e conexões criam escolhas de entrada e continuação. O notável tem valor equivalente a aproximadamente dois ou três pequenos nós, mas também custa um ponto.

| Notável | Benefícios |
| --- | --- |
| Bastião de Ferro | +10% de Defesa Física e +5 de Força |
| Mente Arcana | +8% de dano mágico e +5 de Magia |
| Olho de Águia | +8% de dano com arcos e bestas e +5 de Destreza |
| Mãos Restauradoras | +8% de cura realizada e +5 de Magia |
| Instinto Predador | +4 pontos percentuais de chance crítica e +10 pontos percentuais de multiplicador crítico |
| Pacto Vivo | +12% de dano e +5% de vida das invocações |

Esses seis são o primeiro grupo aprovado, não a totalidade dos notáveis da árvore. Outras ramificações de vida, veneno, armas e elementos serão adicionadas no catálogo.

### Grandes modificadores

Grandes nós alteram regras da build com ganhos e contrapartidas explícitos. Não existe limite adicional de dois: o jogador combina quantos conseguir alcançar dentro dos 98 pontos e das condições. Não exigem nível 30 ou 60 por regra geral; basta caminho, pontos e condições.

As fichas individuais desses grandes modificadores ainda não foram aprovadas. Este documento não atribui números a efeitos que não chegaram à discussão. Sua criação futura precisa explicar ganho, perda, fontes afetadas e interação com itens e habilidades.

### Linguagem matemática

**Aumentado:** bônus compatíveis somam no grupo. Três nós de vida de 2% resultam em +6%.

**Mais / menos:** multiplicadores separados sobre o resultado correspondente. Dano básico 100, aumentos de 40% e 20% menos dano resultam em **100 × 1,40 × 0,80 = 112**.

O cálculo e a interface devem usar as mesmas palavras. Uma contrapartida não pode ser apresentada como multiplicador separado e ser calculada como simples subtração do grupo.

## 06 · Controles e interação

| Comando | Função |
| --- | --- |
| WASD | Movimento |
| Mouse | Direção e ataque básico |
| 1–9 | Habilidades e técnicas |
| F1–F9 | Consumíveis |
| Q | Esquiva ou técnica de mobilidade equipada |
| F | Interação |
| Cliques esquerdo e direito | Interações contextuais |

R não é reservado a uma suprema. Há nove posições de técnicas, além da mobilidade Q e consumíveis. Habilidades aprendidas precisam ser equipadas na barra para uso conforme suas regras.

O contexto diferencia ataque e interação: inimigos recebem ações de combate; NPCs e objetos apresentam suas ações. Alvos e alcance devem ser reconhecíveis antes de gastar recursos.

Todos os comandos precisam ser remapeáveis. No navegador e em alguns teclados macOS, teclas F podem ser capturadas pelo sistema; devem existir atalhos alternativos e uso pela interface.

### Movimento e colisão

Ataques não fazem sorteio de precisão ou esquiva. Uma colisão válida confirma o golpe, sujeita às defesas e proteções ativas. Aliados podem se atravessar. Inimigos e criaturas hostis bloqueiam a passagem terrestre normal.

Não há fogo amigo: dano ofensivo não atinge aliados e projéteis atravessam aliados. Curas e benefícios seguem suas próprias regras de alvo. A classificação de aliado e inimigo deve respeitar grupo, equipe da guerra e regras da região.

## 07 · Execução do combate

O combate de ação utiliza direção pelo cursor, movimento contínuo e ataques com preparação, liberação e recuperação. A renderização mostra antecipação e impacto, enquanto o servidor confirma o estado real.

Não há recarga global fixa. Cada técnica tem seus tempos e o personagem executa uma ação de combate por vez. A esquiva pode interromper essa ação quando estiver disponível e permitida.

**Mana e recarga são consumidas ao iniciar uma técnica válida.** Interrupção por movimento, controle ou cancelamento voluntário não devolve esses recursos. Tentativa inválida não inicia nem cobra. Efeitos liberados permanecem: um projétil já lançado continua viajando e uma cura já aplicada não é desfeita.

Técnicas físicas e mágicas usam mana. Ataque básico não consome recurso. A esquiva básica tem sua regra gratuita e recarga própria. A antiga hipótese de vigor para técnicas físicas foi substituída.

### Primeiras técnicas

A primeira habilidade de classe é aprendida no nível 5 com mestre. Níveis 1–4 utilizam ataque básico e esquiva. Contratos, livros, treinamento e exploração continuam sendo formas de aprendizado ao longo do jogo; o contrato inicial não concede automaticamente a primeira técnica antes do nível 5.

| Classe / técnica | Coeficiente nível 1 | Mana | Recarga |
| --- | --- | --- | --- |
| Guardião / Golpe Frontal | 140% | 10 | 5 s |
| Arcanista / Projétil Arcano | 150% | 12 | 4 s |
| Patrulheiro / Disparo Preciso | 160% | 10 | 6 s |
| Devoto / Luz Restauradora | 120% | 15 | 6 s |
| Sombra / Corte Rápido | 130% | 8 | 3 s |
| Conjurador / Chamar Familiar | Invoca familiar | 25 | 20 s |

Golpe Frontal e Corte Rápido usam o poder físico correspondente à arma e sua escala. Projétil Arcano usa poder mágico. Luz Restauradora restaura vida com base no poder mágico. Familiar tem ficha específica.

### Tempos e alcances

| Técnica | Preparação | Recuperação | Move na preparação? |
| --- | --- | --- | --- |
| Golpe Frontal | 0,25 s | 0,35 s | Sim |
| Projétil Arcano | 0,4 s | 0,25 s | Sim |
| Disparo Preciso | 0,6 s | 0,35 s | Não |
| Luz Restauradora | 0,6 s | 0,3 s | Não |
| Corte Rápido | 0,15 s | 0,2 s | Sim |
| Chamar Familiar | 1,5 s | 0,3 s | Não |

O efeito é liberado ao terminar a preparação. A recuperação impede iniciar outra ação de combate, salvo cancelamento permitido pela esquiva. Nas técnicas estacionárias, movimentar durante a preparação interrompe a tentativa e mantém os custos.

| Técnica | Alcance e formato |
| --- | --- |
| Golpe Frontal | Cone de 90°, 2 m |
| Projétil Arcano | Projétil, alvo único, 8 m |
| Disparo Preciso | Projétil, alvo único, 12 m |
| Luz Restauradora | Cura direcionada, 8 m e visão |
| Corte Rápido | Um alvo à frente, 1,5 m |
| Chamar Familiar | Posição válida e visível, até 1 m |

Uma unidade de mundo corresponde a um metro virtual como referência de design. A relação com pixels e o tamanho dos mapas será definida na produção. As distâncias são bases; alterações precisam aparecer nas descrições.

### Feedback

Cada golpe comunica direção, preparação, impacto e recuperação. A resposta combina animação, reação do alvo, som, partículas e indicadores opcionais. Tremor e flashes são ajustáveis. Pausas de impacto são visuais locais e não pausam a simulação online.

## 08 · Treinamento das habilidades

Habilidades possuem dez níveis próprios. Melhorias são compradas em mestres com requisitos de nível, ouro e materiais; não utilizam pontos da árvore nem criam um segundo orçamento de pontos de talento.

| Nível da habilidade | Nível mínimo do personagem |
| --- | --- |
| 1 | 5 |
| 2 | 15 |
| 3 | 25 |
| 4 | 35 |
| 5 | 45 |
| 6 | 55 |
| 7 | 65 |
| 8 | 75 |
| 9 | 85 |
| 10 | 95 |

Esse calendário vale para as seis habilidades iniciais. Técnicas adquiridas nas evoluções terão calendários próprios para caber no limite 99.

### Crescimento aprovado

A cada melhoria, dano, cura ou coeficientes do familiar recebem +10% do valor do nível 1. Mana recebe +5% do custo do nível 1, arredondada para cima. Recarga permanece igual. O crescimento é linear sobre a referência inicial, não composto.

**Coeficiente no nível r = coeficiente inicial × [1 + 0,10 × (r − 1)].**

**Mana no nível r = arredondar para cima {mana inicial × [1 + 0,05 × (r − 1)]}.**

| Técnica | Coeficiente nível 10 | Mana | Recarga |
| --- | --- | --- | --- |
| Golpe Frontal | 266% | 15 | 5 s |
| Projétil Arcano | 285% | 18 | 4 s |
| Disparo Preciso | 304% | 15 | 6 s |
| Luz Restauradora | 228% | 22 | 6 s |
| Corte Rápido | 247% | 12 | 3 s |
| Chamar Familiar | HP 95%; dano 66,5% do poder mágico | 37 | 20 s |

Atributos e equipamentos continuam alimentando o poder usado nesses coeficientes. A melhoria de nível não concede alcance, cargas ou mais invocações automaticamente.

Custos de treinamento e níveis de técnicas avançadas permanecem a calibrar. Velocidades obtidas pela árvore precisam ser traduzidas em tempos de animação na implementação, preservando legibilidade e as recargas aprovadas.

## 09 · Familiar e suporte

| Propriedade | Familiar inicial, habilidade nível 1 |
| --- | --- |
| Quantidade | Um por conjurador dessa técnica |
| Permanência | Até ser derrotado ou dispensado |
| Vida máxima | 50% da vida máxima do conjurador |
| Dano por ataque | 35% do poder mágico do conjurador |
| Tipo | Mágico direto |
| Frequência | Um ataque por segundo |
| Críticos | Usa chance e multiplicador do conjurador |
| Reconjuração | Substitui o familiar anterior |

No nível 10, os coeficientes passam a 95% da vida do dono e 66,5% do poder mágico por ataque. A quantidade continua sendo um e a frequência não aumenta automaticamente.

O familiar segue o dono e ataca o alvo hostil que ele estiver enfrentando. Possui ordens manuais de atacar, seguir, aguardar e permanecer passivo, além de dispensar. Os comandos ficam em interface de companheiro com atalhos remapeáveis, sem ocupar os nove espaços de técnicas do personagem.

O limite desta técnica não define a quantidade futura de todos os lacaios de Necromante ou Invocador. Esses catálogos ainda serão projetados. Defesa, deslocamento em voo, recuperação e detalhes de atualização dos atributos do familiar serão fechados no protótipo.

### Luz Restauradora

O jogador seleciona um aliado pelo personagem ou pela interface do grupo. Sem aliado selecionado, a técnica cura o próprio personagem. Exige alcance e linha de visão. Se o aliado selecionado estiver fora dessas condições, a tentativa é inválida; não redireciona automaticamente a cura ao usuário.

Curas por habilidade podem criticar. Poções e regeneração natural não fazem testes de crítico. A quantidade real deve ser exibida com possibilidade de distinguir cura efetiva e excedente na telemetria.

## 10 · Esquiva, bloqueio e barreira

> Figura: Três mecanismos distintos: evitar o momento do impacto, reduzir o dano frontal ou absorver o dano restante com uma reserva temporária. A ilustração está incorporada no PDF.

### Esquiva básica Q

| Propriedade | Regra |
| --- | --- |
| Cargas | Uma |
| Recarga | Dez segundos |
| Mana | Sem custo |
| Distância | Até três metros |
| Duração do deslocamento | 0,3 segundo |
| Proteção | Primeiros 0,2 segundo contra dano e novos controles |
| Corpo inimigo | Pode atravessar durante a esquiva |
| Cenário | Respeita muros, edificações e obstáculos terrestres |
| Destino | Precisa ser válido; percurso é encurtado se bloqueado ou ocupado |

A direção é configurável. O padrão segue WASD e, quando parado, o cursor. A esquiva cancela qualquer fase de técnica quando o personagem estiver livre para executá-la. Não remove atordoamento ou imobilização já ativos nem começa quando esses efeitos impedem sua execução.

A esquiva universal pode ser substituída fora de combate por técnica de mobilidade compatível com a classe. Cada substituta terá ficha própria; não herda automaticamente todos os valores da esquiva básica.

### Bloqueio com escudo

Bloqueio é técnica de hotbar com mana, duração e recarga. O escudo mantém seus atributos passivos; equipá-lo não ativa bloqueio contínuo.

Reduz **70% do dano após as defesas** em golpes e projéteis físicos ou mágicos pela frente. Costas e áreas no chão ficam descobertas. Ângulo, duração, custo e recarga da primeira técnica serão definidos.

### Barreira mágica

Barreira é uma reserva temporária que absorve dano antes da vida e quebra ao se esgotar. Quantidade, duração, alvos e recarga pertencem a cada habilidade. Não aumenta vida permanentemente nem substitui defesa ou bloqueio.

## 11 · Dano, crítico e controles

### Poder ofensivo

Cada ponto do atributo correspondente acrescenta 1% do poder básico da arma. Para uma arma de atributo único:

**Poder = base da arma × (1 + atributo correspondente ÷ 100).**

Uma arma de base 100 e Força 200 produz poder 300. Golpe Frontal nível 1 utiliza 140%, resultando em 420 antes de crítico e defesas. Destreza ou Magia substituem Força quando forem a escala correspondente.

Atributos usados no combate incluem bônus válidos de itens, pedras e árvore. Isso difere da regra de requisitos, que exclui equipamentos e pedras. Armas híbridas podem combinar escalas; as proporções ainda pertencem ao catálogo futuro.

Duas armas ofensivas utilizam a média dos poderes. Grimórios e focos são auxiliares: sua contribuição se soma à base da principal antes da aplicação de Magia.

### Defesa

**Redução = Defesa ÷ (Defesa + 500).**

| Defesa correspondente | Redução aproximada |
| --- | --- |
| 250 | 33,3% |
| 500 | 50% |
| 1.000 | 66,7% |
| 2.000 | 80% |

Defesa Física protege contra dano físico; Defesa Mágica, contra mágico. Elementos, venenos e conversões precisam declarar o tipo usado na resolução. A curva evita atingir 100% somente por acumular defesa finita. A constante 500 é a base aprovada para testes.

### Crítico

Chance básica: **5%**. Multiplicador básico: **150%**. Equipamentos, árvore e habilidades podem melhorar ambos. Técnicas podem garantir crítico por condição; esse resultado usa o multiplicador da build e não produz um segundo crítico.

Dano direto do personagem, curas por habilidades e ataques das invocações podem criticar. Veneno, queimadura e demais danos periódicos não criticam por padrão. Poções e regeneração natural não criticam.

### Ordem de resolução

1. Calcular o poder ofensivo.
2. Aplicar o coeficiente da técnica e os modificadores compatíveis.
3. Aplicar crítico, quando ocorrer.
4. Aplicar defesa correspondente.
5. Aplicar bloqueio válido.
6. Descontar da barreira.
7. Retirar da vida o restante.

> Figura: Ordem aprovada de resolução. O exemplo numérico parte de 1.500 após crítico e considera defesa 500, bloqueio de 70% e barreira de 200. A ilustração está incorporada no PDF.

Exemplo: ataque crítico de 1.500 encontra defesa 500 e cai para 750; bloqueio reduz para 225; barreira restante de 200 absorve essa quantidade; 25 chegam à vida. Cura não é reduzida pelas defesas física ou mágica do aliado.

### Controles consecutivos em PvP

Na janela de oito segundos, o primeiro atordoamento ou imobilização tem duração integral, o segundo dura metade e a terceira tentativa concede quatro segundos de imunidade a esses controles. A proteção impede o controle, sem anular automaticamente o dano da técnica.

Chefes terão regras próprias; não foi aprovado aplicar a eles a mesma regra do PvP. Silêncio, medo, lentidão e outras categorias precisam ser catalogados separadamente. Limites finais de acúmulo de velocidade e multiplicador crítico serão validados no protótipo.

## 12 · Recuperação e consumíveis

| Estado | Vida por segundo | Mana por segundo |
| --- | --- | --- |
| Em combate | Sem regeneração natural | 0,5% da mana máxima |
| Fora de combate | 2% da vida máxima | 3% da mana máxima |

O personagem sai de combate após oito segundos sem executar ou receber ações hostis e sem ajudar um aliado em combate. Dano periódico mantém o estado ativo. Habilidades e equipamentos podem conceder recuperação adicional conforme suas descrições.

Existem poções instantâneas e graduais. Poções de vida compartilham recarga entre si; poções de mana compartilham outra recarga independente. Uma híbrida aciona ambas. Colocar nove poções de vida na barra não multiplica a frequência de uso.

Potência, duração, interrupção dos efeitos graduais e segundos de recarga das famílias ainda serão definidos. Esses números precisam acompanhar os custos das técnicas e o ritmo de dano, especialmente nas faixas altas.

## 13 · Equipamentos e empunhaduras

O personagem possui espaços para **arma principal, secundária, elmo, torso, luvas, botas, capa, cinto, amuleto e anel**. Uma arma de duas mãos ocupa principal e secundária; não permite um auxiliar simultâneo.

Elmo, torso, luvas, botas, capa e cinto são as seis peças de armadura elegíveis a até quatro pedras. Amuleto e anel não têm encaixes nesta base. O refinamento das joias não recebeu ficha própria; mantém-se fora do escopo de refinamento aprovado para armas, armaduras e auxiliares.

> Figura: Preparação ilustrativa com arma de uma mão e auxiliar. Seis armaduras e o conjunto de mãos permitem até 26 pedras. Modelo e cores são editoriais. A ilustração está incorporada no PDF.

### Categorias e restrições

Guardião usa Set Pesado. Arcanista, Devoto e Conjurador usam Set Mágico. Patrulheiro e Sombra usam Set Leve. Cada peça informa classe, nível necessário e atributos exigidos.

Pesado possui Defesa Física alta e Mágica baixa. Mágico apresenta o inverso. Leve tem ambas intermediárias. Refinar aumenta ambas as defesas básicas da peça e preserva essa proporção.

| Família | Empunhadura |
| --- | --- |
| Espadas, machados e maças | Variantes de uma ou duas mãos |
| Lanças e cajados | Duas mãos |
| Arcos e bestas | Duas mãos |
| Adagas, sabres e garras | Uma mão por peça |
| Varinhas e cetros | Uma mão |
| Escudos, grimórios e focos | Mão secundária |

Combinações dependem da classe. Sombra pode usar duas armas compatíveis; isso não concede dupla empunhadura a toda classe por simples disponibilidade de espaços.

### Contribuição de poder

Em duas armas ofensivas, a técnica usa a média dos poderes. Para arma mágica com grimório ou foco, soma-se a contribuição básica do auxiliar à principal antes de aplicar Magia.

Exemplo de orçamento: varinha 70 + grimório 30 = base 100; cajado equivalente de duas mãos = base 100. Com Magia 200, ambos produzem 300 de poder. Se todas as peças estiverem +20, ambos chegam a 525, antes de outros modificadores. Esses números são referências de comparação, não o catálogo completo de bases de cada grau.

Cadência do ataque básico, pesos de armas híbridas, alcance básico por família e diferenças de afixos/efeitos entre uma peça de duas mãos e duas peças independentes precisam de testes específicos.

## 14 · Graus, raridades e afixos

**Grau, nível de uso, raridade, refino e slots são propriedades separadas.** O grau varia de 1 a 8 e limita a pedra máxima aceita. O requisito do personagem é um valor fixo dentro da faixa correspondente.

| Grau | Faixa do requisito de nível | Pedra máxima |
| --- | --- | --- |
| 1 | 1–9 | 1 |
| 2 | 10–24 | 2 |
| 3 | 25–39 | 3 |
| 4 | 40–49 | 4 |
| 5 | 50–64 | 5 |
| 6 | 65–79 | 6 |
| 7 | 80–89 | 7 |
| 8 | 90–99 | 8 |

Uma espada grau 5 que exige nível 55 não pode ser equipada no nível 50. Ela aceita pedras de níveis 1–5 quando o personagem satisfizer seus requisitos. Não há exigência adicional de nível do personagem exclusivamente pela pedra.

### Poder por raridade

| Raridade | Base relativa | Afixos | Efeito lendário |
| --- | --- | --- | --- |
| Normal | 100% | 0 | Não |
| Incomum | 105% | 1 | Não |
| Raro | 115% | 2 | Não |
| Épico | 130% | 3 | Não |
| Lendário | 150% | 2 | Um efeito próprio |

O percentual corresponde à base normal do mesmo grau e família. Aplica-se aos atributos básicos refináveis. Crítico, velocidade e atributos adicionais têm valores próprios e não recebem automaticamente esse multiplicador.

Um lendário de base relativa 150% e refino +20 resulta em **150% × 1,75 = 262,5%** da base normal sem refino, antes dos atributos do personagem. Refinamento não multiplica pedras ou afixos.

Lendários podem ocupar todos os espaços compatíveis. Um item de duas mãos ocupa dois espaços, mas continua sendo um item. Efeitos lendários idênticos não acumulam; efeitos diferentes podem coexistir conforme suas descrições.

### Afixos sorteados

Afixos vêm de listas compatíveis com família, grau e classe. Duas peças do mesmo modelo podem ter afixos diferentes. O efeito lendário é parte da identidade do modelo e não muda nesse sorteio.

Um mesmo atributo não aparece duas vezes nos afixos de uma peça. Chance crítica e multiplicador crítico são atributos diferentes. Bônus de peças diferentes podem somar, respeitando a regra do atributo. Essa restrição não se aplica às pedras, que admitem repetição livre.

### Novo sorteio

O jogador pode escolher um afixo para receber novo sorteio mediante moeda e materiais. O resultado substitui o anterior e pode ser pior para a build. A operação preserva grau, raridade, base, refino, slots, pedras e efeito lendário.

Custos, intervalos de valores e listas completas de afixos ainda serão definidos. O sistema deve mostrar quais propriedades podem ser obtidas antes da operação.

### Efeitos acionados

Um efeito acionado não inicia outros efeitos acionados por padrão. Exceções precisam estar descritas. Um golpe pode ativar uma explosão lendária; essa explosão não dispara automaticamente uma sequência de outras explosões.

Combinações de estado continuam possíveis: um item pode favorecer dano contra alvos queimando. As fontes e condições precisam ser claras. Recargas internas e limites de ativação pertencem à ficha de cada efeito futuro.

## 15 · Refinamento: recompensa e risco

O refino máximo é **+20**. Armas melhoram poder básico correspondente. Armaduras e escudos melhoram suas defesas básicas. Grimórios e focos melhoram sua contribuição básica de poder mágico.

| Faixa desejada | Identidade de dificuldade |
| --- | --- |
| +1 a +8 | Fácil |
| +9 a +15 | Média |
| +16 a +18 | Difícil |
| +19 | Extrema |
| +20 | Rara |

O +15 permanece na faixa média; a difícil começa no +16. A destruição aparece **ao tentar obter +16**, quando o item ainda está em +15.

### Ganho sobre a base

| Faixa | Ganho por nível | Acumulado no fim |
| --- | --- | --- |
| +1 a +8 | +2% da base | +16% |
| +9 a +15 | +3% da base | +37% |
| +16 a +18 | +5% da base | +52% |
| +19 | +8% da base | +60% |
| +20 | +15% da base | +75% |

Uma arma de base 200 apresenta 232 no +8, 274 no +15, 304 no +18, 320 no +19 e 350 no +20. Esses valores alimentam os cálculos de atributos; não são o dano final da técnica.

> Figura: Direção visual conceitual para a progressão de refino. Os percentuais são aprovados; o desenho das armas e efeitos não é uma captura de jogo. A ilustração está incorporada no PDF.

| Refino | Acréscimo sobre a base |
| --- | --- |
| +1 | 2% |
| +2 | 4% |
| +3 | 6% |
| +4 | 8% |
| +5 | 10% |
| +6 | 12% |
| +7 | 14% |
| +8 | 16% |
| +9 | 19% |
| +10 | 22% |
| +11 | 25% |
| +12 | 28% |
| +13 | 31% |
| +14 | 34% |
| +15 | 37% |
| +16 | 42% |
| +17 | 47% |
| +18 | 52% |
| +19 | 60% |
| +20 | 75% |

### Probabilidades aprovadas

Cada linha representa todos os resultados possíveis da tentativa sem proteção e soma 100%. Não são probabilidades condicionais após outro sorteio.

| Alvo | Sucesso | Mantém | Reduz 1 nível | Destrói |
| --- | --- | --- | --- | --- |
| +1 | 100% | 0% | 0% | 0% |
| +2 | 98% | 2% | 0% | 0% |
| +3 | 96% | 4% | 0% | 0% |
| +4 | 94% | 6% | 0% | 0% |
| +5 | 90% | 10% | 0% | 0% |
| +6 | 85% | 15% | 0% | 0% |
| +7 | 80% | 20% | 0% | 0% |
| +8 | 75% | 25% | 0% | 0% |
| +9 | 65% | 30% | 5% | 0% |
| +10 | 60% | 35% | 5% | 0% |
| +11 | 55% | 40% | 5% | 0% |
| +12 | 50% | 45% | 5% | 0% |
| +13 | 45% | 48% | 7% | 0% |
| +14 | 40% | 52% | 8% | 0% |
| +15 | 35% | 55% | 10% | 0% |
| +16 | 25% | 64,8% | 10% | 0,2% |
| +17 | 15% | 74,6% | 10% | 0,4% |
| +18 | 8% | 83,4% | 8% | 0,6% |
| +19 | 2% | 92,2% | 5% | 0,8% |
| +20 | 0,5% | 96,5% | 2% | 1% |

Manter consome os ingredientes e preserva o nível. Reduzir retira um nível do refino atual: falhar buscando +20 pode levar +19 a +18. Destruir elimina **o equipamento completo, incluindo refino, slots e pedras inseridas**.

Moeda e materiais são consumidos em qualquer resultado. Não existe garantia de sucesso por número de tentativas nesta tabela nem checkpoints de refino aprovados. A baixa chance de +20 é por tentativa; ela não promete conclusão ao atingir uma contagem.

> Figura: Probabilidades da tabela aprovada. Eixo vertical logarítmico para tornar visíveis as chances pequenas. Destruição só aparece ao tentar +16 ou superior. A ilustração está incorporada no PDF.

### Proteção contra destruição

Proteção pode ser obtida no PvE e comprada na loja. Deve estar ativada antes da tentativa. Só é consumida quando o resultado original seria destruição. Nesse caso, transforma o resultado em **manter o nível atual**.

A proteção não aumenta sucesso e não impede a redução normal da tabela. As pedras são preservadas porque o equipamento não foi destruído; se realmente ocorrer destruição sem proteção, tudo inserido é perdido.

### Custos por empunhadura

| Peça | Materiais e moeda por tentativa | Proteções por destruição impedida |
| --- | --- | --- |
| Uma mão ou auxiliar | Custo de referência | 1 |
| Duas mãos | Dobro do custo de referência | 2 |

O custo esperado do conjunto de mãos fica comparável: uma peça de duas mãos ou duas peças de uma mão. Preços por grau e custos de armaduras ainda serão calibrados.

### Estudo matemático realizado

Foi calculada uma cadeia de estados com refinos 0–20, manutenção, redução de um nível e destruição. Para proteção, destruição vira manutenção. O modelo assume probabilidades fixas, recursos suficientes e ausência de outras garantias.

| Cenário | Resultado matemático aproximado |
| --- | --- |
| Do +0 ao +20, protegendo todas as tentativas de risco | 800 tentativas em média |
| Tentativas em faixas com risco, nesse caminho | 758 em média |
| Destruições impedidas | 5,48 eventos em média |
| Proteções consumidas em peça de uma mão ou armadura | 5,48 em média |
| Proteções consumidas em duas mãos | 10,97 unidades em média |
| Mesmo item chegar ao +20 antes da destruição, sem proteção | 11,63% de probabilidade |
| Repor item do +0 a cada destruição até obter um +20 | 1.429 tentativas e 7,60 itens destruídos, em média |

Uma verificação adicional por 20 mil trajetórias protegidas encontrou média próxima de 807, mediana 584 e percentil 90 de 1.738 tentativas. A diferença da média teórica é amostral. Percentil 90 significa que aproximadamente 90% daquela amostra terminou até esse número; não é um limite garantido.

Esses resultados não estimam horas ou preço em dinheiro. Isso exige frequência de materiais, valor da moeda, preço das proteções e duração de atividades, que ainda não foram definidos.

## 16 · Slots e pedras

Armaduras possuem de um a quatro slots por peça elegível. Uma arma de uma mão tem um slot; uma de duas mãos tem dois. Escudos, grimórios e focos têm um. Assim, seis armaduras com quatro encaixes somam 24; o conjunto de mãos acrescenta dois: **máximo de 26 pedras**.

O jogador pode repetir a mesma família livremente. Uma armadura de quatro slots pode receber quatro pedras de HP. Cada slot recebe uma pedra.

### Seis famílias, oito níveis

As famílias são HP, Força, Magia, Destreza, Defesa Física e Defesa Mágica. Nome próprio, cor e modelo definitivos ainda serão escolhidos na direção artística. Os símbolos deste documento são editoriais.

| Nível | HP | Força / Destreza / Magia | Defesa Física / Mágica |
| --- | --- | --- | --- |
| 1 | 20 | 1 | 5 |
| 2 | 40 | 2 | 10 |
| 3 | 75 | 3 | 15 |
| 4 | 125 | 5 | 25 |
| 5 | 200 | 8 | 40 |
| 6 | 300 | 12 | 60 |
| 7 | 400 | 16 | 80 |
| 8 | 500 | 20 | 100 |

A coluna de atributos representa três famílias separadas, com o mesmo valor numérico; uma pedra de Força não concede também Destreza e Magia. O mesmo vale para as duas defesas.

No extremo de 26 pedras nível 8, o personagem recebe +13.000 HP, ou +520 de um atributo, ou +2.600 de uma defesa, dependendo da família escolhida. São alternativas, não bônus simultâneos de uma única coleção.

Esses bônus participam do combate, mas não liberam requisitos de equipamentos. O grau do item precisa ser pelo menos o nível da pedra. Graus superiores aceitam pedras inferiores.

> Figura: As seis famílias, com valores máximos de nível 8. Formas, abreviações e cores são símbolos editoriais; nomes e aparência finais permanecem em direção artística. A ilustração está incorporada no PDF.

### Abrir slots

A forja é incremental: tenta abrir o próximo encaixe de uma armadura, até quatro. A falha consome materiais e preserva equipamento, encaixes existentes e pedras. O processo não sorteia novamente toda a quantidade nem reduz os slots anteriores.

Chances para o segundo, terceiro e quarto slots, materiais e moeda ainda serão definidos. A quantidade de slots não é ampliada pelo refino ou pela raridade automaticamente.

### Inserir, limpar e perder

Inserir vincula a pedra àquela preparação. **Retirar destrói a pedra**, preservando slot e equipamento. Não existe extração intacta aprovada. Se a peça for destruída no refino, suas pedras também são destruídas.

A peça completa pode ser negociada com pedras inseridas. Isso não transforma a venda em extração: o comprador recebe todo o item e continua sujeito à destruição ao limpar.

Uma estratégia possível é alcançar o refino desejado, abrir slots e só então inserir pedras. Refinar depois continua permitido, assumindo o risco do conjunto completo ou utilizando proteção.

## 17 · Mestre de Pedras e produção

O Mestre de Pedras realiza fusões garantidas com pedras da mesma família e nível. Todas as receitas estão disponíveis a qualquer personagem que forneça ingredientes e moeda. Não há contrato de desbloqueio nem exigência adicional de profissão para esse serviço.

| Produz | Receita da mesma família | Equivalente em nível 1 |
| --- | --- | --- |
| Pedra nível 2 | 3 pedras nível 1 | 3 |
| Pedra nível 3 | 3 pedras nível 2 | 9 |
| Pedra nível 4 | 3 pedras nível 3 | 27 |
| Pedra nível 5 | 4 pedras nível 4 | 108 |
| Pedra nível 6 | 4 pedras nível 5 | 432 |
| Pedra nível 7 | 5 pedras nível 6 | 2.160 |
| Pedra nível 8 | 5 pedras nível 7 | 10.800 |

> Figura: Cadeia de fusão garantida. Números acima das setas indicam quantas pedras do nível anterior são consumidas; abaixo, equivalência em pedras nível 1. A ilustração está incorporada no PDF.

A equivalência considera toda a produção partindo do nível 1. Uma pedra nível 8 equivale a 10.800 pedras nível 1, mas cinco pedras nível 7 obtidas prontas já cumprem sua receita. Uma coleção de 26 pedras nível 8 equivaleria a 280.800 de nível 1 se toda a cadeia fosse construída assim.

Todas as famílias seguem a estrutura de quantidades. A fusão consome as entradas e entrega uma superior; não é uma soma do valor bruto de todas as pedras. O benefício é concentrar mais status num slot limitado.

### Ingredientes complementares

Além das pedras e da moeda, há materiais de lapidação. Primeiras fusões utilizam materiais comuns; produção de níveis 6–8 exige catalisadores raros. Nomes, quantidades e origens específicas desses materiais ainda serão calibrados.

Pedras de todos os níveis podem aparecer prontas em drops e baús, com fontes apropriadas e raridade crescente. A frequência das intermediárias é essencial para determinar a velocidade real de produção. Não se pode converter a equivalência de 10.800 diretamente em horas sem os dados de farm.

## 18 · Comércio, fabricação e economia

Equipamentos continuam negociáveis depois de utilizados, mantendo grau, raridade, refino, slots e pedras. Não há vínculo ao personagem ou à conta por simples uso na regra aprovada. O mercado pode negociar peças completas e diferentes combinações de afixos de um mesmo modelo.

Capitais possuem comércio e forjas. O ouro é a moeda de referência proposta para serviços e negociação. Custos de aprimoramento, redefinição e manutenção de serviços precisam criar circulação e consumo de moeda sem eliminar o acesso básico às atividades.

### Direção de profissões

| Área proposta | Atividades |
| --- | --- |
| Mineração | Minérios e componentes de forja |
| Botânica | Plantas e recursos alquímicos |
| Extração de essências | Componentes mágicos e de lapidação |
| Forja | Armas, armaduras e serviços de slots |
| Alfaiataria e couro | Sets e peças especializadas |
| Lapidação | Componentes e itens de sua área, sem bloquear o Mestre de Pedras |
| Alquimia | Poções e consumíveis |

Profissões e receitas de equipamentos são direções do GDD base, ainda sem níveis e custos finais. Encomendas podem permitir fornecer materiais a um artesão com entrega controlada pelo servidor.

| Entradas | Saídas e circulação |
| --- | --- |
| Contratos, inimigos e eventos geram moeda | Serviços, redefinições e taxas removem moeda |
| Coleta e PvE geram materiais | Fabricação, refino, fusão e slots consomem materiais |
| Drops e fabricação geram peças | Refino sem proteção pode destruir peças; desmontagem pode converter excedentes |
| Drops geram pedras | Fusões concentram e consomem pedras; retirada e destruição eliminam pedras |
| Comércio transfere riqueza | Taxas de mercado podem financiar saídas de moeda |

Valores de taxas, desmontagem e recompensas precisam ser testados. Indicadores: moeda criada/removida, preço de uma cesta de materiais, volume negociado, tempo para build funcional e concentração de riqueza.

## 19 · Aparência, efeitos e áudio

**Cada equipamento deve mudar o visual do personagem.** Modelo, cor, materiais e efeitos próprios comunicam identidade. Pedras e refino acrescentam status e efeitos visuais. Esse requisito inclui detalhes de acessórios, com efeitos discretos quando a peça for pequena.

A direção inicial é fantasia medieval com magia, silhuetas legíveis e animações 2D. Pixel art detalhada é uma proposta artística do primeiro GDD; o estilo final e a resolução dos assets serão validados no protótipo visual. A capa é uma ilustração conceitual e não uma captura de jogo nem especificação de sprites.

### Produção modular

Corpo, cabelo, armadura, acessórios, armas e efeitos utilizam camadas e pontos de encaixe compartilhados. O primeiro conjunto precisa ser verificado em movimento, ataque, conjuração, defesa, impacto, morte, montaria e voo. Oito direções são uma proposta técnica a validar.

Não basta mudar o ícone do inventário. O jogador deve enxergar a peça no mundo. A quantidade de famílias de modelos cresce conforme a equipe comprovar sua capacidade de produzir animações consistentes.

### Leitura de poder

| Faixa | Direção visual proposta |
| --- | --- |
| +1 a +8 | Acabamento e brilho crescente |
| +9 a +15 | Runas e energia mais evidentes |
| +16 a +18 | Partículas e assinatura intensa |
| +19 | Efeito de alto poder reconhecível |
| +20 | Assinatura excepcional |

Pedras devem acrescentar sinais de família e nível sem ocultar o item. A paleta final das seis famílias não está fechada. A identidade elemental de uma técnica não substitui seu indicador funcional de perigo.

### Legibilidade e acessibilidade

O cliente precisa limitar partículas decorativas por qualidade e distância, preservando projéteis relevantes, áreas hostis e preparações. Configurações incluem escala de interface, remapeamento, contraste, redução de flashes, tremor e números opcionais.

Áudio distingue armas, materiais e magias. Sinais sonoros complementam os visuais; nenhuma mecânica obrigatória depende exclusivamente de som ou cor. Música acompanha bioma e intensidade, com controles separados de volume.

## 20 · Montarias e voo

Montarias e voo fazem parte da visão do jogo. Montarias terrestres auxiliam a travessia e reforçam identidade. Velocidades, obtenção, canalização para montar, desmontagem em combate e restrições por conteúdo serão calibradas.

### Regra espacial aprovada

Voo passa por cima de cercas e muros. Casas, salões, edificações fechadas e volumes classificados como bloqueadores aéreos barram o personagem. Ao colidir com esse obstáculo, o deslocamento naquela direção para.

Não se aplica a antiga proposta de restringir todo voo a corredores e pousos autorizados como regra geral. A classificação de cenário deve permitir a travessia exterior aprovada e impedir passagem através de volumes fechados.

> Figura: Regra aprovada de voo: cercas e muros são transponíveis; edificações fechadas são volumes bloqueadores. Alturas e distâncias são esquemáticas. A ilustração está incorporada no PDF.

A representação 2D pode utilizar sombra, deslocamento vertical do sprite e estado aéreo validado pelo servidor. Não é necessário prometer uma simulação 3D livre. Colisão terrestre e aérea precisam de dados próprios.

Na guerra, muros não bastam para deter voadores. Torres capazes de atacar alvos aéreos e objetivos que protegem o núcleo são recomendações de protótipo, não uma revogação da regra de passar sobre muros. Combate aéreo completo, energia de voo e comportamento de companheiros em voo ainda serão definidos.

## 21 · Guildas e territórios

Guildas, também chamadas clãs, possuem quatro níveis.

| Nível | Capacidade |
| --- | --- |
| 1 | 50 membros |
| 2 | 60 membros |
| 3 | 70 membros |
| 4 | 80 membros |

Requisitos de evolução ainda serão calibrados. Nome, emblema, cargos, permissões, agenda, tesouro e histórico de movimentações formam a direção funcional. A capacidade total da guilda não altera os 30 participantes por lado na guerra.

### Conquista por mérito

Grandes cidades e vilas são territórios contabilizados para os clãs. A guilda conquista e conserva domínio por força, organização e resultado das guerras. Não há limite artificial de dois territórios nem redistribuição automática por concentração de posse.

Benefícios econômicos, tributação, serviços e acesso às cidades sob domínio serão detalhados no modelo territorial. Custos não devem ser usados para reintroduzir silenciosamente um limite de posse que foi removido.

### Lances e calendário

Clãs precisam dar lance para atacar e marcar um dia e horário entre as janelas disponibilizadas pelo servidor. A interface deve apresentar território, prazo, valor comprometido, janela e participantes elegíveis.

Critério de desempate, seleção entre lances, destino da quantia vencedora, devoluções e regras de ausência não receberam aprovação específica. A direção técnica é um regulamento público, determinístico e auditável, a fechar antes de partidas com economia real.

## 22 · Guerra territorial e arena

| Regra territorial | Definição |
| --- | --- |
| Estrutura | Estilo MOBA, com referência a League of Legends |
| Equipes | 30 contra 30 |
| Duração máxima | 60 minutos |
| Participação | Personagem nível 50 ou superior |
| Entrada | Lance do clã e janela do servidor |
| Equipamento | Preparação e poder reais da guilda |

Não se conserva o formato anterior de 12 contra 12 por 30 minutos nem o limite de refino equivalente a +5. As regras de itens, pedras e refino sustentam a força das equipes.

> Figura: Estrutura MOBA proposta para protótipo territorial. O formato 30v30, 60 minutos e nível 50+ está aprovado; mapa, ondas e objetivos ainda serão detalhados. A ilustração está incorporada no PDF.

### Estrutura de partida proposta

Mapa com bases, rotas de avanço, torres, objetivos laterais e núcleo. Unidades controladas pelo servidor podem criar ondas de pressão. A ilustração mostra três rotas como referência de protótipo, sem fixar um mapa final.

A condição proposta é destruir o núcleo após cumprir os objetivos necessários. Critério ao fim do tempo, regras de reaparecimento, tolerância a desconexão, composição de escalações e bloqueio de transferências de última hora precisam ser estabelecidos no regulamento.

Voo exige defesas que funcionem dentro da regra espacial aprovada. Controle do núcleo por objetivos evita que passar sobre uma muralha encerre a partida imediatamente.

### Arena e outros PvPs

Arena PvP está no escopo. A direção inicial inclui duelo consensual, treino 1v1 e modo coletivo 3v3. Normalização, temporadas e recompensas de arena ainda não foram fechadas; não devem ser inferidas automaticamente das regras territoriais.

Zonas de conflito opcionais são uma proposta do GDD base. Regras de morte, risco de materiais e saque precisam ser explícitas antes da entrada. Não foi aprovada perda de equipamento por morte como extensão automática da destruição no refino.

## 23 · Dungeons, eventos e conteúdo

O mundo contém várias entradas de dungeons distribuídas entre biomas, vilas, ruínas, cavernas, minas e fortalezas. Grupos pequenos, exploração solo e eventos públicos precisam sustentar o PvE que abastece a progressão.

Como direção inicial, dungeons para quatro jogadores têm duração de referência de 25–40 minutos, com dois ou três chefes, pontos de descanso e funções de proteção, dano, cura e controle. Expedições de oito jogadores ficam para expansão. Esses tamanhos e durações são planejamento de conteúdo, sem testes realizados.

### Piloto: Cripta da Coroa Partida

Uma ordem destruída protege um fragmento do Coração do Éter sob uma fortaleza abandonada.

| Encontro proposto | Mecânicas | Objetivo de aprendizado |
| --- | --- | --- |
| Porteiro Sem Nome | Golpe frontal, investida e cobertura | Posicionamento |
| Irmãs do Sino | Proteções alternadas e interrupção de sinos | Prioridade e coordenação |
| Rei Oco | Corredores perigosos, sentinelas e selos | Controle do espaço e objetivos |

Recompensas podem incluir equipamentos, materiais de refino, pedras e catalisadores. Taxas e rotas determinísticas de fragmentos precisam acompanhar a economia aprovada. O registro de contribuição deve considerar cura, proteção e objetivos, além de dano.

Eventos propostos: caravanas, invasões, rituais, chefes regionais e expedições. Escalonamento por participantes deve preservar legibilidade e impedir que uma população pequena deixe serviços essenciais permanentemente bloqueados.

### Introdução ao jogo

Sequência de referência: criação e contrato inicial; movimento e ataque básico; uso da esquiva; primeiro ponto de árvore no nível 2; treinamento da primeira técnica no nível 5; introdução a equipamentos, requisitos e pedras; atividade cooperativa opcional.

A duração exata e os materiais concedidos pelos contratos dependem da curva de experiência e custos de treinamento. Não se garante uma atividade num minuto específico antes de medir o ritmo real.

## 24 · Monetização e sorte

A direção comercial aceita vantagem paga de progressão, descrita pelo criador como P2W moderado. O jogo mantém obtenção por farm, sorte, baús e comércio, com porcentagens baixas para recompensas superiores.

**Proteção contra destruição obtida no PvE e vendida na loja é uma decisão aprovada.** Seu efeito não aumenta a chance de sucesso. O limite de poder continua sendo refino +20, pedras nível 8 e os slots aprovados.

Venda de materiais, pacotes e baús comerciais é uma possibilidade de implementação da direção de monetização, ainda sem catálogo, preços ou taxas. Baús de recompensa e pedras de todos os níveis em drops estão confirmados; a forma comercial de cada baú precisa ser especificada.

### Apresentação de probabilidades

Antes de usar recursos, o jogador deve visualizar custo, todos os resultados e probabilidades. Proteção selecionada precisa mostrar seu efeito e consumo de uma ou duas unidades conforme a peça. Baús precisam declarar a distribuição pertinente quando implementados.

O preço e o acesso PvE às proteções devem considerar sua frequência real de consumo: aproximadamente 5,48 eventos por peça para atingir +20 no modelo aprovado. Uma arma de duas mãos consome duas unidades por evento.

Raridade isolada não define tempo de farm. É necessário medir tentativas por hora, produção de materiais, pedras intermediárias, reposição de itens e concentração de poder. Não há previsão financeira aprovada.

## 25 · Clientes e arquitetura técnica

Há dois clientes conectados ao mesmo mundo: **aplicativo Java para Windows/macOS** e **navegador em JavaScript**. Java e JavaScript são implementações distintas, não uma única linguagem renomeada.

> Figura: Clientes Java e JavaScript compartilham o mundo e regras resolvidas pelo servidor. A organização das tecnologias é proposta de engenharia. A ilustração está incorporada no PDF.

| Camada | Proposta técnica |
| --- | --- |
| Aplicativo | Java; libGDX como opção de motor 2D |
| Navegador | JavaScript; TypeScript na autoria e Phaser como opções |
| Tempo real | WebSocket com protocolo versionado |
| Serviços | HTTPS para conta, autenticação e operações de serviço |
| Simulação | Node.js em processos de zonas e instâncias, a validar |
| Persistência | PostgreSQL para personagens, itens e economia |
| Dados transitórios | Redis quando houver necessidade comprovada |
| Recursos | Catálogo e assets versionados, distribuição por CDN |

As tecnologias além das linguagens/plataformas são propostas técnicas. Sua adoção depende de protótipo, não de capacidade já comprovada.

### Autoridade e integridade

O cliente envia intenção. O servidor valida posição, colisão, direção, alcance, visão, mana, recargas, dano e recompensas. Inventário, refino, sorteios e comércio são resolvidos no servidor.

Itens e pedras precisam de identificadores únicos. Operações econômicas devem ser atômicas e idempotentes: repetir uma solicitação após queda não pode repetir cobrança, prêmio ou sorteio. Troca, fusão, abertura de slot, limpeza, novo afixo e refino precisam de histórico auditável.

Predição local, reconciliação e interpolação ajudam a suavizar movimento. A área de interesse limita estados enviados ao cliente. Zonas persistentes e instâncias de dungeon, arena e guerra distribuem carga.

### Metas de validação

Simulação a 20 atualizações por segundo e renderização visando 60 FPS são hipóteses iniciais. Equipamento mínimo, preset e carga precisam ser fixados antes de aceitar números como resultado.

O teste territorial deve incluir 60 jogadores ou agentes representativos, unidades, projéteis, barreiras, equipamentos e efeitos. CCU total conectado não equivale à quantidade no mesmo combate. Não há promessa validada de milhares de personagens na mesma tela.

Operação inclui reconexão, backup com restauração testada, monitoramento, ferramentas de moderação, bloquear/ignorar/denunciar e controle de acesso a funções de guilda. Políticas de dados e retenção serão definidas conforme distribuição e público.

## 26 · Produção e validação

### Fases propostas

| Fase | Entrega | Evidência para avançar |
| --- | --- | --- |
| A — Combate e protocolo | Movimento, colisão, primeiras técnicas e comunicação dos clientes | Controles e acertos compreensíveis sob latência |
| B — Fatia vertical | Cidade, zona, dungeon, itens, árvore parcial e oficinas | Ciclo completo de aventura e preparação persistente |
| C — Alfa fechado | Mercado, guildas, montaria, PvP e simulação territorial | Economia íntegra e batalha representativa estável |
| D — Mundo público | Conteúdo e população suficientes para os sistemas sociais | Operação e ritmo de produção sustentáveis |
| Expansões | Mais regiões, catálogo da árvore, voo e expedições | Escolhas novas e manutenção viável |

O protótipo pode utilizar recortes de conteúdo e personagens de teste para validar níveis altos. Isso não altera o nível máximo 99 nem elimina as regras finais. A árvore ilustrada é um recorte conceitual, não entrega de 700 nós jogáveis.

### Verificações prioritárias

- Custos de mana e recarga em interrupção, movimento e esquiva.
- Colisão, visão, projéteis atravessando aliados e bloqueio por inimigos.
- Primeiros 0,2 segundo de proteção da esquiva e término após 0,3 segundo.
- Ordem de defesa, bloqueio, barreira e vida; críticos em cura e familiar.
- Retornos decrescentes dos controles em PvP.
- Requisitos sem contribuição de equipamentos e pedras.
- Destruição completa e proteção consumida apenas quando necessária.
- Fusão garantida, limpeza destrutiva e forja incremental preservando pedras.
- Comércio de item completo, novo afixo e operações simultâneas sem duplicação.
- Reconexão durante refino, negociação, compra e guerra.
- Voo sobre muro e bloqueio em edificações fechadas.

### Métricas

Observar compreensão da árvore, tempo até primeira técnica, tempo para build funcional, variedade de escolhas, mortes entendidas pelo jogador, duração de encontros, abandono de dungeon, espera de fila e retorno de jogadores.

Na economia, medir entrada e saída de moeda, itens e pedras destruídos, consumo de proteções, receitas de fusão, preços e concentração de riqueza. Em PvP, interpretar vitórias por composição, equipamento e habilidade com amostra suficiente.

Antes de estimar prazo e orçamento, medir a produção de uma família de equipamento animada, um encontro completo e uma habilidade com seus efeitos nos dois clientes.

## 27 · Parâmetros a calibrar e critérios de mudança

O criador autorizou resolver escolhas restantes durante o desenvolvimento. Os pontos abaixo são trabalho de design e protótipo, sem nova rodada de perguntas obrigatória.

| Área | Trabalho pendente |
| --- | --- |
| Personagem | Curva de experiência, tempo até 99 e contratos iniciais completos |
| Classes | Técnicas avançadas, contratos 30/60 e custos de troca |
| Armas | Bases por grau/família, pesos híbridos, cadência básica e auxiliares defensivos |
| Armaduras | Valores básicos, requisitos e orçamentos por peça |
| Árvore | Grafo completo, posicionamento final, grandes modificadores e regras de conflito |
| Combate | Limites de velocidade/multiplicador, tipos elementais, veneno e demais controles |
| Defesa | Primeira técnica de bloqueio e fichas de barreiras |
| Oficinas | Moeda, materiais, custos de afixos e probabilidades de abrir slots |
| Pedras | Nomes, cores, modelos, ingredientes e frequências de drop |
| Refino | Materiais, taxas, preços e acesso PvE à proteção |
| Consumíveis | Potência, duração, recarga e interrupção das versões graduais |
| Territórios | Regulamento de lances, receitas, reaparecimento e desempate da partida |
| Voo | Obtenção, velocidades, combate e comportamento de companheiros |
| Arena | Formato final, normalização, classificação e temporadas |
| Conteúdo | Dungeons, eventos, loot, recompensas e regras de morte por atividade |
| Operação | Regiões, capacidade, hardware mínimo, equipe e custos |

As regras aprovadas são a referência inicial. Uma revisão deve registrar o valor anterior, o novo, a evidência que motivou a mudança e os sistemas afetados. Ajustar uma taxa de drop pode alterar preço, tempo de fusão e vantagem comercial; ajustar dano pode exigir rever vida, cura e duração de encontro.

### Regras substituídas

| Proposta anterior | Base consolidada |
| --- | --- |
| Nível máximo 50 | Nível máximo 99 |
| Afinidades sem evoluções definidas | Seis classes, duas especializações e evoluções 30/60 |
| Constelações separadas e custos variáveis | Árvore única; todo nó custa um ponto |
| Limite de dois grandes modificadores | Sem limite adicional além dos pontos e condições |
| Pedras que concedem técnicas | Seis famílias de status, níveis 1–8 |
| Seis encaixes no personagem | Até 26 encaixes |
| Refino até +10 sem destruição | +20 com redução e destruição a partir da tentativa +16 |
| Retirada intacta de pedra | Retirada destrói a pedra |
| Proteção consumida por tentativa | Consumida só ao impedir destruição |
| Um lendário equipado | Lendários em todos os espaços compatíveis |
| Equipamento vinculado ao usar | Negociável mesmo após uso |
| Guilda com 40 membros | 50–80 conforme nível 1–4 |
| Dois territórios por guilda | Sem limite artificial aprovado |
| Guerra 12v12 de 30 minutos | 30v30 de até 60 minutos, nível 50+ |
| Voo restrito por rotas gerais | Passa sobre cercas/muros; edificações fechadas bloqueiam |
| Cliente apenas no navegador | Aplicativo Java e navegador JavaScript no mesmo mundo |

## 28 · Registro das decisões aprovadas

Este índice preserva o histórico de aprovação sem exigir leitura das perguntas. Quando houve correção, a resposta mais recente foi incorporada. Os capítulos anteriores reúnem as regras por sistema.

| Questão | Decisão consolidada |
| --- | --- |
| 1 | Seis classes iniciais aprovadas. |
| 2 | Classes evoluem por especializações, nível e contratos. |
| 3 | Várias famílias de armas compatíveis por classe. |
| 4 | Aprendizado combina níveis, mestres, contratos, livros e exploração. |
| 5 | Evoluções nos níveis 30 e 60, mediante contratos. |
| 6 | Duas especializações por classe; segunda evolução aprofunda a escolha: 12 caminhos finais. |
| 7 | Troca de especialização dentro da classe inicial por contrato e recursos. |
| 8 | Os 12 caminhos de especialização foram aprovados. |
| 9 | Evoluções concedem habilidades e alguns equipamentos exclusivos, preservando o arsenal inicial. |
| 10 | A evolução do nível 60 recebe novo título. |
| 11 | Os 12 títulos finais foram aprovados. |
| 12 | Arsenais corrigidos: Arcanista e Devoto mágicos; Sombra com adagas, sabres e garras. |
| 13 | Quatro atributos distribuíveis: Força, Destreza, Magia e Vitalidade. |
| 14 | Guardião: Pesado; Arcanista, Devoto e Conjurador: Mágico; Patrulheiro e Sombra: Leve. |
| 15 | Combinações por classe; uma mão tem 1 slot, duas mãos têm 2 slots. |
| 16 | Dano físico escala conforme a arma; Força, Destreza ou combinação. |
| 17 | Escudos, grimórios e focos secundários possuem 1 slot. |
| 18 | Pesado favorece defesa física; Mágico favorece mágica; Leve tem ambas intermediárias. |
| 19 | Colisão válida confirma o golpe; não há sorteio de precisão ou esquiva. |
| 20 | Funções de Força, Destreza, Magia e Vitalidade aprovadas. |
| 21 | Críticos combinam chance normal e condições de crítico garantido. |
| 22 | Redefinir atributos exige recurso; redefinir árvore exige moeda. |
| 23 | Cinco pontos básicos em cada atributo, mais cinco livres ao nascer. |
| 24 | Mesma base de vida e mana para todas as classes. |
| 25 | Vida e mana crescem naturalmente por nível. |
| 26 | Bases: 300 HP e 100 mana; +20 HP/+5 mana por nível; +20 HP por Vitalidade e +10 mana por Magia adicionais. |
| 27 | Regeneração natural: vida fora de combate; mana dentro e fora. |
| 28 | Técnicas físicas e mágicas usam mana; ataque básico é gratuito. |
| 29 | Regeneração: combate 0,5% mana/s; fora 2% HP/s e 3% mana/s; saída de combate em 8 s. |
| 30 | Existem poções instantâneas e graduais. |
| 31 | Poções compartilham recarga por família; híbridas acionam vida e mana. |
| 32 | Q começa com esquiva universal substituível por técnica compatível fora de combate. |
| 33 | Uma carga de esquiva, com recarga corrigida para 10 segundos. |
| 34 | Esquiva básica possui 0,2 segundo de invulnerabilidade. |
| 35 | Bloqueio com escudo é técnica de hotbar, com mana, duração e recarga. |
| 36 | Bloqueio frontal reduz 70% após defesas; cobre golpes e projéteis, não costas nem áreas no chão. |
| 37 | Barreira mágica é uma reserva temporária de absorção. |
| 38 | Chance crítica básica de 5% e multiplicador básico de 150%. |
| 39 | Crítico em dano direto, cura por habilidade e ataques de invocações; dano periódico não por padrão. |
| 40 | PvP: controles consecutivos na janela de 8 s têm 100%, 50% e, na terceira tentativa, imunidade por 4 s. |
| 41 | Habilidades têm 10 níveis, treinados com requisitos, ouro e materiais. |
| 42 | Primeira técnica de classe é aprendida no nível 5 com mestre. |
| 43 | As seis técnicas iniciais foram aprovadas. |
| 44 | Treinos das iniciais: níveis 5, 15, 25, 35, 45, 55, 65, 75, 85 e 95. |
| 45 | Coeficientes, mana e recargas do nível 1 das seis técnicas aprovados. |
| 46 | Familiar inicial: um; 50% HP do dono; 35% poder mágico/ataque; um ataque/s; herda críticos. |
| 47 | Por melhoria: +10% do coeficiente inicial e +5% da mana inicial; recarga permanece. |
| 48 | Duas armas ofensivas usam a média dos poderes. |
| 49 | Sem recarga global fixa; cada técnica tem seus tempos, uma ação de combate por vez. |
| 50 | Esquiva pode cancelar qualquer fase da técnica quando o personagem puder esquivar. |
| 51 | Mana e recarga são consumidas ao iniciar técnica válida, sem devolução por interrupção. |
| 52 | Movimentação durante preparação/canalização depende da habilidade. |
| 53 | Tempos e permissões de movimento das seis técnicas iniciais aprovados. |
| 54 | Luz Restauradora: aliado selecionado ou si próprio; alcance e visão obrigatórios. |
| 55 | Familiar automático com ordens de atacar, seguir, aguardar e passivo. |
| 56 | Alcances e formatos das seis técnicas iniciais aprovados. |
| 57 | Sem fogo amigo; projéteis atravessam aliados. |
| 58 | Aliados se atravessam; inimigos e criaturas hostis bloqueiam passagem terrestre normal. |
| 59 | Esquiva: até 3 m em 0,3 s; atravessa inimigos; cenário e destino válido limitam o percurso. |
| 60 | Direção da esquiva configurável; padrão WASD com cursor quando parado. |
| 61 | Primeiros 0,2 s impedem dano e novos controles; não removem controles existentes. |
| 62 | Cada ponto do atributo correspondente acrescenta 1% do poder básico da arma. |
| 63 | Defesa reduz dano por Defesa / (Defesa + 500). |
| 64 | Ordem: poder, técnica, crítico, defesa, bloqueio, barreira e vida. |
| 65 | Seis peças de armadura com até 4 slots: máximo total de 26 pedras com as mãos. |
| 66 | Repetição livre de famílias de pedras na peça. |
| 67 | Requisitos contam base, distribuição e árvore; excluem equipamentos, pedras e efeitos temporários. |
| 68 | Tabela de bônus das seis famílias de pedras, níveis 1–8, aprovada. |
| 69 | Correção do autor: compatibilidade das pedras depende do equipamento, substituindo a proposta de nível direto do personagem. |
| 70 | Mestre de Pedras e quantidades crescentes para fusão; exemplo 3:1 levado ao balanceamento. |
| 71 | Equipamento tem grau próprio 1–8, separado do nível de uso, raridade e refino. |
| 72 | Fusão garantida com pedras da mesma família e nível, mais ingredientes. |
| 73 | Pedras de todos os níveis podem vir prontas em drops e baús. |
| 74 | Fusões requerem 3, 3, 3, 4, 4, 5 e 5 pedras para produzir níveis 2–8. |
| 75 | Fusão exige moeda, materiais de lapidação e catalisadores raros nos níveis 6–8. |
| 76 | Todas as receitas ficam acessíveis no mestre a qualquer personagem com recursos. |
| 77 | Retirar uma pedra a destrói; equipamento e encaixe permanecem. |
| 78 | Destruição por refino elimina equipamento, pedras, slots e refino. |
| 79 | Forja incremental de slots; falha consome materiais e preserva peça, slots e pedras. |
| 80 | Destruição pode ocorrer ao tentar +16 ou mais. |
| 81 | Falha pode manter ou reduzir o nível, além de destruir nas faixas de risco. |
| 82 | Proteção contra destruição obtida no PvE e vendida na loja, sem aumentar sucesso. |
| 83 | Tabela completa de probabilidades +1 a +20 aprovada. |
| 84 | Proteção ativada antes; consumida somente quando impede destruição. |
| 85 | Destruição impedida se transforma em manter o refino atual. |
| 86 | Armaduras refinam defesas básicas; armas refinam poder básico correspondente. |
| 87 | Curva acumulada de bônus chega a +75% da base no +20. |
| 88 | Escudos refinam defesas; grimórios e focos refinam poder mágico; todos até +20. |
| 89 | Empunhaduras das famílias de armas aprovadas. |
| 90 | Grimórios/focos somam à base da arma principal antes da aplicação de Magia. |
| 91 | Duas mãos custam dobro de moeda/materiais e duas proteções por destruição impedida. |
| 92 | Faixas de nível dos oito graus aprovadas. |
| 93 | Raridade aumenta atributos básicos e propriedades adicionais. |
| 94 | Lendários permitidos em todos os espaços; efeitos idênticos não se acumulam. |
| 95 | Bases relativas: 100%, 105%, 115%, 130%, 150%; afixos 0, 1, 2, 3, 2; lendário tem efeito próprio. |
| 96 | Afixos sorteados em listas compatíveis; efeito lendário pertence ao modelo. |
| 97 | Efeitos acionados não disparam outros por padrão; exceções precisam estar descritas. |
| 98 | Equipamentos negociáveis após uso, preservando refino, slots e pedras. |
| 99 | Novo sorteio de um afixo escolhido, preservando demais propriedades; resultado pode piorar. |
| 100 | Mesmo atributo não se repete nos afixos da mesma peça; peças diferentes podem somar. |
| 101 | Regiões de entrada das seis classes na árvore compartilhada aprovadas. |
| 102 | Todo nó adquirido custa um ponto, incluindo os mais poderosos. |
| 103 | Pequenos nós dos quatro atributos concedem +5. |
| 104 | Tabela dos pequenos nós especializados aprovada. |
| 105 | Agrupamentos típicos: 3–5 pequenos nós e um notável de um ponto. |
| 106 | Sem limite adicional de grandes modificadores: valem pontos, caminhos e condições. |
| 107 | Primeiros seis notáveis e seus benefícios aprovados. |
| 108 | Grandes modificadores não têm nível mínimo adicional; exigem caminhos, pontos e condições. |
| 109 | Aumentos compatíveis somam; mais/menos são multiplicadores separados. |

## 29 · Glossário e leitura dos diagramas

**Build:** conjunto de atributos, árvore, técnicas, equipamentos, pedras e afixos preparado pelo jogador.

**Grau:** categoria 1–8 do equipamento, que limita o nível de pedra aceito e se associa à faixa de requisito de uso.

**Raridade:** normal, incomum, raro, épico ou lendário; altera base e propriedades adicionais.

**Afixo:** propriedade adicional sorteada de uma lista compatível.

**Refino:** aprimoramento +0 a +20, com bônus de base e riscos próprios.

**Slot:** encaixe que recebe uma pedra.

**Notável:** nó de maior benefício alcançado por caminhos da árvore; custa um ponto.

**Mais / menos:** multiplicadores separados. **Aumentado:** soma de bônus compatíveis no grupo.

**Servidor autoritativo:** servidor que decide o estado válido do jogo.

**Idempotência:** repetir uma solicitação não repete seu efeito econômico.

**Fatia vertical:** experiência pequena e completa que comprova ciclo, qualidade e processo de produção.

**CCU:** jogadores simultaneamente conectados; diferente de jogadores no mesmo combate.

**Percentil 90:** valor até o qual terminaram aproximadamente 90% das trajetórias de uma amostra; não é garantia individual.

A capa é arte conceitual original produzida para este documento. Mapas, árvore, ícones, diagramas e campo de guerra são ilustrações de design; não são capturas de software implementado. As cores editoriais não fecham a paleta das pedras. O mapa territorial e a geografia são referências de composição para desenvolvimento.

Documento consolidado a partir da conversa de concepção de Mythos Online e das aprovações 1–109, encerradas em 18 de novembro de 2026. Versão de referência para implementação e revisão por testes.
