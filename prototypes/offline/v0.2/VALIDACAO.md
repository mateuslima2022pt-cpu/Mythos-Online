# Validação da versão 0.2

Verificação em 21 de novembro de 2026.

## Verificado

- Sintaxe dos cinco arquivos JavaScript e dos scripts embutidos no HTML final.
- Dez testes das regras de progressão, combate, requisitos, árvores e salvamento.
- Treze cenários de integração em Node.js com DOM de teste, cobrindo a jornada
  completa até o chefe, painéis, equipamentos, movimento, colisões, esquiva,
  poções, derrota, armazenamento bloqueado e simulação continuada.
- Novos cenários verificam que mensagens são tratadas como texto, o histórico
  tem limite e Sistema é somente leitura; digitar não aciona movimento, técnicas
  ou poções; minimizar missões persiste a preferência; coordenadas refletem o
  personagem e o contador de ouro está no inventário.
- Os cenários de integração também foram executados com Canvas nativo e os assets
  carregados. O recorte do retrato foi inspecionado visualmente.
- Estrutura do documento: oito consumíveis F1–F8, nove técnicas 1–9, Q separado,
  quatro atalhos e nenhum título de localização no centro superior.
- O HTML contém código e imagens, sem módulos, bibliotecas externas ou pedidos de rede.
- ZIP com integridade CRC e fontes para reconstrução.

## Limite de verificação

A prévia gerenciada falhou ao abrir a rota de navegador. A interface completa em
um navegador real e a abertura por dois cliques em Windows/macOS não foram
verificadas nesta sessão. Os testes com DOM simulado e Canvas nativo não substituem
essa verificação visual e de interação. O servidor de prévia ficou parado após a falha.

O HTML usa scripts clássicos e assets embutidos. A persistência local tem tratamento
de falhas e exportação/importação manual. Para migrar da v0.1, exporte o personagem
no HTML anterior e importe o JSON no novo HTML; o armazenamento pode ser separado
por arquivo dependendo do navegador.

Chat permanece local. Servidor multiplayer e banco de dados não fazem parte desta atualização.
