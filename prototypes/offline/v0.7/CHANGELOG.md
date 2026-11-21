# v0.7 — Slots visuais centralizados

- Removida a silhueta humana do centro da aba Roupas.
- Seis encaixes visuais agrupados no centro, em duas colunas de três, mantendo
  ordem, dimensões, ícones foscos e paleta de preto, bronze e dourado.
- Preservados coleção, equipamentos normais, moedas e progresso.

# v0.6 — Aba Roupas aprovada

- Removida a aba Provador e sua prévia; o inventário tem apenas Normal e Roupas.
- Abas redistribuídas para ocupar a largura disponível.
- Roupas recebe silhueta central neutra e seis encaixes cosméticos, com pictogramas
  cinza fosco, bordas em bronze e nomes apenas nas dicas de mouse/acessibilidade.
- Esquerda: arma, roupa superior, calça. Direita: cabeça, luvas, botas.
- Grade Coleção de visuais com 48 espaços e contador próprio, inicialmente vazia.
- Equipamentos e poções da mochila normal ficam separados da seção cosmética.
- Ouro no rodapé e Soltar moedas disponíveis em ambas as abas; janela abre somente
  ao clicar na moeda. Trocar de aba não muda equipamentos, atributos ou saldo.
- Mantidas as regras de primária, secundária, escudos e arma de duas mãos na aba Normal.
- Mantida a compatibilidade com o progresso das versões anteriores.

Esta entrega aplica a interface aprovada. Catálogo de conjuntos/skins, sua aquisição
e equipagem cosmética serão desenvolvidos quando esses itens forem criados.

# v0.5 — Armas primária e secundária

- Dois encaixes ao lado da bota, totalizando 16: primária à esquerda e secundária à direita.
- Ícone vazio de espada diagonal em cinza fosco, na paleta do inventário.
- Armas de uma mão equipam na primária por padrão; outra unidade pode ser arrastada
  à secundária. Escudos são aceitos somente na secundária.
- Arma de duas mãos preenche os dois encaixes com o mesmo ID, sem duplicar posse,
  atributos ou desenho da arma no personagem. Retirar por qualquer mão libera ambas.
- Trocas respeitam os requisitos e a capacidade da mochila antes de alterar o estado.
- Visual e animação distinguem arma primária, secundária e arma de duas mãos.
- Duas armas de uma mão alternam ataques básicos sem dobrar a cadência;
  técnicas usam a primária e Bastião exige escudo real. Calibração de protótipo.
- Espadão de Treino disponível somente nas ferramentas de análise, sem alterar
  o contrato inicial, o saque aleatório ou as recompensas.
- Saves antigos com escudo migram para a secundária; importação e exportação mantidas.
- Janela Soltar moedas continua abrindo somente pelo clique na moeda.

# v0.4 — Inventário em slots e Soltar moedas

- Janela vertical com skin e arte próprias, no tema aprovado de preto e bronze.
- 14 encaixes no arranjo aprovado, ícones vazios foscos e ocupados em destaque.
- Mochila com 48 células, pilhas de poções e contagem de ocupação real.
- Detalhes, equipar/retirar, arrastar para encaixe compatível e prévia do personagem.
- Armas e escudos acessíveis no Provador; seção Roupas sem cosméticos adquiridos.
- Ouro no rodapé; removidos os botões Organizar e Fechar desse rodapé.
- Janela Soltar moedas abre exclusivamente pelo botão da moeda; máximo, cancelar,
  validação de quantidade e confirmação única.
- Moedas criadas perto do jogador são recolhidas por clique e persistem no save
  com o tempo de vida restante, até expirar ou serem recolhidas.
- Saves antigos permanecem compatíveis; equipamento retirado permanece retirado.
- Retirar escudo encerra o bloqueio e impede Bastião até equipar um escudo.

Os novos encaixes representam o inventário aprovado. Itens adicionais, voo,
regeneração por amuletos/selos e bônus de livros/bolsas seguem para suas etapas.
O catálogo de itens jogáveis permanece o catálogo inicial do Guardião.

# v0.3 — Cursores e saque manual

- Seis cursores fornecidos pelo usuário, incluindo animação normal e de coleta.
- Conversão CUR/ANI em PNG RGBA preserva transparência, hotspots, sequência e tempos.
- Resolver compartilhado entre desenho do cursor e ação do clique, cobrindo corpo
  inteiro das criaturas, NPC, missão pronta, cristais e itens no chão.
- A indicação de missão pronta tem prioridade sobre conversa; aceitar a primeira
  missão usa o cursor de conversa. A interface sempre usa o cursor normal.
- Saque de ouro e poções exige clique próximo; retirada da coleta automática.
- Distância e caminho são validados; reserva cheia não destrói o saque.
- Coleta remove a instância antes de conceder a recompensa e salva imediatamente.
- Cliques em NPCs distantes não ativam outros objetos próximos.
- Monstros não recebem dano do jogador dentro da clareira segura.
- Interface aprovada v0.2 e formato de personagem das versões anteriores preservados.

# v0.2 — Interface clássica aprovada

- Tema de preto/carvão com bordas em bronze e dourado, aplicado a HUD e janelas.
- Retrato do Guardião e barras de vida, mana e EXP no canto superior esquerdo.
- Minimapa quadrado com zoom, placa de região, localização e coordenadas em tempo real.
- Missões abaixo do mapa, com minimizar/expandir e preferência persistida.
- Chat local com canais, entrada por Enter e proteção contra atalhos durante a digitação.
- Barras F1–F8 e técnicas 1–9 com encaixes menores e bandejas alongadas; Q separado.
- Atalhos baixos e alongados no canto inferior direito, apenas ícones e teclas.
- Contador de ouro com moeda no inventário, sem contador fixo no chat.
- Compatibilidade com exportações de personagem da v0.1.

O chat é local nesta versão offline. As regras de progressão, combate, mapa e
missões da área inicial foram mantidas. A referência visual aprovada orienta os
materiais e a disposição; os componentes são implementados em HTML, CSS e SVG.

# v0.1 — O Primeiro Juramento

Primeira área explorável de Mythos Online: Bosque da Aurora, região de fantasia
medieval para estudar o Guardião e estabelecer a base visual e de combate.

- Clareira segura, guia Aelric, santuário, boneco de treino, trilhas, ponte, rio e ruínas.
- Brotos de Esporos, Gosmas de Éter, Lobos das Raízes e Cerne Corrompido.
- Ataque básico direcional, esquiva, Golpe Frontal e proposta de Postura de Bastião.
- Missões introdutórias, EXP, distribuição de atributos e recorte da árvore.
- Equipamentos em camadas, recompensas, saque, poções e efeitos de impacto.
- Mapa, preferências, ferramentas de análise, save local e exportação/importação.
- HTML autossuficiente para abrir no desktop e fontes para desenvolvimento.

As regras explícitas do GDD guiam a implementação. Valores da área, curvas de EXP,
loot, requisitos das recompensas e parâmetros de Bastião são propostas calibráveis.
Esta versão usa quatro atributos de base: Força, Destreza, Magia e Vitalidade;
defesas física e mágica são estatísticas derivadas e dos equipamentos.
Não converte as respostas históricas “A/B/C/Aprovo” em regras novas sem o enunciado.
