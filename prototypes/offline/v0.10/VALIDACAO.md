# Validação v0.10

- `node --test tests/*.test.js`: 91 testes aprovados, zero falhas.
- `node tests/native-render.cjs`: 39 verificações aprovadas com Canvas nativo e DOM simulado.
- Animações alimentadas pelo deslocamento real do personagem, pelo tempo do golpe e pelo estado de vida; não há cálculo de dano duplicado no adaptador.
- Caminhada e corrida respeitam terreno, água, obstáculos, inimigos, enraizamento e atordoamento existentes.
- Queda única de 0,75 s antes da janela de retorno; comandos bloqueados, recursos restaurados somente no retorno. Snapshot durante derrota salva um retorno seguro sem alterar o corpo em execução.
- Passivas, itens, requisitos, dados de progresso, saque por clique, moedas descartadas, chat e painéis permanecem cobertos pela suíte.
- Alterar aparência não altera equipamento ou estatísticas. O modo base é uma prévia do novo corpo; arte modular dos equipamentos permanece pendente, com visual equipado anterior disponível em Opções.
- Capturas do Canvas inspecionadas: Guardião no Bosque, cinco animações/quatro direções e morte no cenário. Essas capturas não incluem as camadas DOM do HUD.

A infraestrutura de prévia gerenciada estava indisponível. Não houve teste de navegador real; a validação de layout e eventos reais do navegador continua pendente. O resultado não representa capacidade de servidor MMORPG, banco de dados ou equilíbrio final de corrida/PvE.
