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
