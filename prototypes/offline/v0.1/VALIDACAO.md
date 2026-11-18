# Validação da versão 0.1

Verificação em 18 de novembro de 2026.

## Verificado

- Sintaxe dos quatro arquivos JavaScript e dos scripts inseridos no HTML final.
- Dez testes das regras: orçamento até nível 99, atributos e talentos, dano e
  defesa, alcance, recarga, cancelamento, esquiva, missões, requisitos de itens,
  validação e ida e volta de salvamento.
- Dez cenários de integração em uma simulação Node.js com DOM de teste:
  inicialização e HUD; todos os painéis; movimento e acessibilidade do mapa;
  sequência completa até o treinamento; técnica e cancelamento; bloqueio e poções;
  chefe e equipamentos; ferramentas de análise e derrota; armazenamento bloqueado;
  simulação prolongada e execução do renderizador.
- Busca de caminhos em grade confirmou acesso da área inicial aos NPCs, cristais,
  posições de criaturas e ruínas, considerando água e obstáculos.
- Renderizador inspecionado também com Canvas nativo e imagens carregadas.
  Essa inspeção cobre o mundo desenhado, sem o layout HTML e CSS.
- HTML com imagens e código embutidos, sem bibliotecas ou solicitações de rede.
- ZIP com integridade CRC e os arquivos necessários para jogar e reconstruir a versão.

## Limite de verificação

A prévia gerenciada falhou ao abrir a rota de navegador e não havia ferramenta
de controle de navegador disponível nesta sessão. Não foi possível validar a
interface em um navegador real nem testar a abertura por dois cliques no Windows
ou macOS. Testes com DOM simulado e Canvas nativo não substituem esse teste.

O pacote usa HTML clássico, JavaScript sem módulos e assets embutidos para permitir
abertura local. `localStorage` é protegido por tratamento de falhas, e há exportação
manual de jornada. O comportamento final de armazenamento depende do navegador.

O servidor online, o banco de dados e o cliente Java ainda não foram implementados
ou submetidos a testes de rede e carga nesta entrega.
