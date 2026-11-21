# Mythos Online — Bestiário v1.0

Proposta completa desta edição para progressão PvE 1–99: 83 fichas em dez áreas,
dez dungeons de progressão e uma raid. Onze pranchas PNG têm nome, nível e categoria
para cada encontro. As Gêmeas do Paradoxo são uma ficha de encontro em dupla.

- `Mythos_Online_Bestiario_PNG_v1.0.zip`: extraia e abra index.html. Contém os onze PNGs originais, fichas, CSV e JSON.
- `Mythos_Online_Bestiario_v1.0.html`: catálogo offline em arquivo único, com as imagens embutidas e filtros.
- `Mythos_Online_Bestiario_v1.0.pdf`: 23 páginas com índice, onze pranchas e onze páginas de fichas resumidas.
- `CATALOGO_MONSTROS.csv`: planilha separada por ponto e vírgula, com BOM UTF-8 para Excel.
- `catalogo.json`: dados estruturados completos, referências de locais e artes.

No GitHub, use **Download raw file**. O catálogo é um documento de análise e não
altera o jogo v0.9. As imagens são conceitos novos, não sprites ou animações prontos.

Broto de Esporos, Gosma de Éter, Lobo das Raízes e Cerne Corrompido mantêm nível,
HP, poder, defesa e recargas do protótipo. A defesa mágica desses quatro usa o
fallback da defesa no motor atual. Demais fichas, locais, grupos, recompensas e
resistências são propostas. Regiões se apoiam no GDD; subáreas e novas dungeons são
nomes de trabalho. Isso não representa conteúdo já implementado ou todo o conteúdo
que futuras expansões poderão acrescentar.

HP é máximo. ATQ é poder bruto por golpe, antes de defesa, bloqueio e resistência.
DF/DM usam a curva 500/(500+defesa). Recarga base não equivale sozinha ao intervalo
completo de animação. 32 unidades do mundo correspondem a um metro.
Os PNGs são pranchas, com oito fichas por região e três da dungeon piloto; o HTML/CSV/JSON traz os atributos completos.

Verificações: 83 IDs únicos, onze pranchas PNG válidas, 21 locais referenciados,
níveis 1–99, chefes e minibosses em cada instância, valores positivos e dados dos
quatro encontros atuais. As onze pranchas foram inspecionadas visualmente. O HTML
teve estrutura e JavaScript auditados; a revisão no navegador não foi realizada.
Os valores futuros não foram validados por simulação de combate ou playtest.

A Cripta da Coroa Partida mantém Porteiro Sem Nome, Irmãs do Sino e Rei Oco,
propostos no GDD. O Mausoléu do Juramento é uma instância adicional. A raid final
usa oito jogadores. Grupos de 3/5 nas demais fichas são alternativas de teste à
direção inicial de quatro jogadores, sujeitas a aprovação e balanceamento.
