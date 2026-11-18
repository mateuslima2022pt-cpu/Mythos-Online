# Mythos Online: do protótipo offline ao MMORPG

O protótipo v0.1 permite analisar o Guardião e a primeira área sem instalar nada.
Ele separa as regras (`core.js`), o mundo (`world.js`), a renderização (`render.js`)
e a simulação e interface (`game.js`). Essa separação prepara o desenvolvimento,
mas o servidor autoritativo e o multiplayer ainda precisam ser implementados.

## Onde o progresso fica agora

O HTML guarda o personagem no `localStorage` do navegador e permite exportar/importar
um JSON. É um save de análise, editável pelo usuário. Não é uma fonte confiável para
ouro, inventário ou progressão em um MMORPG. Ele não será importado para a economia
oficial. Criaturas e saques temporários voltam ao estado inicial ao carregar.

## Arquitetura online proposta

```text
Navegador JavaScript / Aplicativo Java Windows e macOS
             | HTTPS: autenticação e catálogo
             | WebSocket seguro: intenções e estados do mundo
             v
       Gateway de sessão e protocolo versionado
             |
       Servidores de mundo / instâncias
       Movimento, colisão, IA, combate e regras autoritativos
             |
       Serviços de personagens, inventário e economia
             |
       PostgreSQL: estado persistente e transações
       Redis opcional: presença, sessões e coordenação temporária
       Armazenamento de objetos: assets, exportações e backups
```

Os dois clientes são mantidos como solicitado: aplicativo Java e navegador JavaScript.
Usam o mesmo protocolo e a mesma conta. Um backend em TypeScript/Node.js é a proposta
inicial para aproveitar o domínio em JavaScript; essa escolha será validada com carga.
O cliente Java terá renderização e entrada próprias. JSON versionado é suficiente
para o primeiro teste de rede; um formato binário poderá entrar depois de medições.

## Quem decide o resultado das ações

O cliente envia intenções, como “mover para esta direção”, “usar técnica 1” ou
“equipar este item”. O servidor verifica sessão, propriedade do item, requisitos,
posição, alcance, colisão, recursos e recarga; então calcula o resultado e transmite
os estados aos jogadores próximos. O cliente prevê o próprio movimento e interpola
outros personagens. Ao receber o estado oficial, ele reconcilia diferenças.

O cliente nunca declara quanto ouro ganhou, que item caiu ou quanto dano causou.
Sorte de saque, refino, fusão e forja será calculada no servidor. O cliente mostra
a animação do resultado já validado. O mesmo vale para pedras, comércio e guerras.

## O que será persistido

| Domínio | Exemplos de dados |
| --- | --- |
| Conta | ID, autenticação, permissões, sanções e preferências |
| Personagem | ID, classe/contrato, nome, nível, EXP, atributos, talentos, técnicas, posição segura |
| Item individual | ID único, dono, base, raridade, afixos, refino, slots, pedras e estado de vínculo |
| Economia | Saldos, lançamentos de ouro, compras, vendas, leilões e operações de troca |
| Progresso | Missões, objetivos, conquistas, receitas e desbloqueios |
| Social | Guilda, patente, membros, convites e relações |
| Territórios | Proprietário, lance, agendamento, participantes e resultado da guerra |

Os itens precisam de instâncias únicas: duas espadas do mesmo modelo podem ter
refino, pedras e afixos diferentes. As definições de itens e técnicas ficam em
catálogos versionados; as instâncias persistem no banco.

## Como salvar sem gravar cada passo no banco

Movimento e combate são atualizados em memória pelo servidor de mundo. Uma hipótese
inicial é simulação a 20 atualizações por segundo, ajustável após testes com área
cheia e guerra 30 contra 30. Essa frequência não é uma meta já validada.

Estado de baixa criticidade recebe checkpoints periódicos e em eventos de saída,
troca de mapa e desconexão. Operações críticas de economia e inventário usam
transações duráveis antes da confirmação. Não gravaremos cada frame da animação
ou cada posição intermediária no PostgreSQL.

Trocas usam uma transação atômica entre os participantes. Recompensas, compras,
saques e refinamentos têm ID de operação e chave de idempotência para que uma
reconexão ou repetição de pacote não duplique ouro ou itens. Restrições no banco
impedem que uma instância pertença a dois inventários. Um registro de operações
permite auditar falhas e investigar discrepâncias. Checkpoints sozinhos não bastam
para proteger essas operações.

Recargas e efeitos relevantes serão representados por tempos do servidor, evitando
que relogar zere uma penalidade ou recarga. A desconexão terá política própria de
permanência em combate. São regras a especificar antes do teste online público.

## Estrutura inicial de tabelas

`accounts`, `characters`, `character_attributes`, `character_talents`,
`character_skills`, `item_instances`, `item_sockets`, `inventories`,
`wallets`, `economy_ledger`, `quest_progress`, `guilds`, `guild_members`,
`territories`, `war_bids`, `war_matches`, `processed_operations`.

As tabelas usarão chaves estrangeiras, migrações e IDs estáveis. Operações econômicas
terão limites, validação e observabilidade. Credenciais ficam no servidor, com
senhas protegidas por algoritmo apropriado, ou autenticação externa gerenciada.

## Recuperação e testes

Backups automáticos, recuperação por ponto no tempo e testes periódicos de restauração
serão necessários. O teste de rede deve cobrir reconexão, atraso, pacotes repetidos,
quedas durante trocas, duas sessões concorrentes e rollbacks transacionais.
A guerra territorial precisa de teste específico com 60 participantes e suas
habilidades, invocações e efeitos. Ainda não há promessa de capacidade simultânea.

## Próximas entregas sugeridas

1. Aprovar sensação de movimento, combate, escala visual e primeira área offline.
2. Extrair simulação determinística e contratos de rede do código local.
3. Criar servidor autoritativo e conectar dois clientes JavaScript na mesma clareira.
4. Integrar PostgreSQL, contas, personagem, itens únicos e salvamento transacional.
5. Adicionar reconexão e testes de duplicação, carga e recuperação.
6. Implementar cliente Java usando o mesmo protocolo e ampliar os sistemas do GDD.

Esta entrega inclui o protótipo e a proposta técnica acima. Não inclui um banco
de dados provisionado, serviço hospedado ou servidor multiplayer funcional.
