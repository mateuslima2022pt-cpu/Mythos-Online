# Mythos Online

MMORPG 2D de fantasia medieval com construção de builds, evolução de classes, equipamentos visíveis, refinamento e guerras territoriais.

## Protótipo offline v0.4 — Inventário em slots

Bosque da Aurora jogável com Guardião, monstros, missões, chefe, interface clássica,
cursores contextuais animados e o inventário aprovado.

- **[Novo HTML autossuficiente](prototypes/offline/v0.4/Mythos_Online_Offline_v0.4.html)**
- **[Baixar pacote completo ZIP](prototypes/offline/v0.4/Mythos_Online_Offline_v0.4.zip)**
- [Instruções e código-fonte](prototypes/offline/v0.4/README.md)
- [Arquitetura proposta para o MMORPG](prototypes/offline/v0.4/ARQUITETURA.md)

No GitHub, use **Download raw file**. Para jogar, abra o HTML no navegador do desktop,
ou extraia o ZIP e abra o HTML. Funciona offline e sem instalação.

A v0.4 aplica o inventário vertical com 14 encaixes e 48 espaços de mochila,
ícones vazios foscos e itens ocupados em destaque. A moeda fica no rodapé.
**Soltar moedas abre somente ao clicar na moeda**: escolha o valor, confirme em OK,
feche a mochila e clique na pilha no chão para recolher. Cancelar mantém o saldo.

Para preservar o progresso, exporte a jornada na versão anterior e importe o JSON
no novo HTML. Moedas que o jogador solta também são incluídas no save.

Versões anteriores: [0.3](prototypes/offline/v0.3/README.md),
[0.2](prototypes/offline/v0.2/README.md) e [0.1](prototypes/offline/v0.1/README.md).

## Documentação de design — GDD v1.0

Documento consolidado em **18 de novembro de 2026**, com **55 páginas, 29 capítulos, 13 ilustrações e as 109 decisões aprovadas** durante a concepção do jogo.

- [PDF ilustrado](docs/gdd/v1.0/Mythos_Online_GDD_Ilustrado_v1.0.pdf)
- [Pacote completo ZIP — PDF, TXT e Markdown](docs/gdd/v1.0/Mythos_Online_GDD_v1.0_Completo.zip)
- [Texto editável em Markdown](docs/gdd/v1.0/Mythos_Online_GDD_v1.0.md)
- [Texto simples UTF-8](docs/gdd/v1.0/Mythos_Online_GDD_v1.0.txt)

No visualizador do GitHub, use **Download raw file** para salvar o PDF ou o ZIP.

## Base do projeto

- Clientes: aplicativo **Java para Windows/macOS** e navegador **JavaScript**, conectados ao mesmo mundo.
- Seis classes iniciais, doze caminhos finais, evoluções nos níveis 30 e 60.
- Nível máximo 99, 495 pontos distribuíveis de atributos e 98 pontos de árvore.
- Árvore passiva compartilhada; cada nó adquirido custa um ponto.
- Refinamento até +20; seis famílias de pedras até nível 8; até 26 pedras equipadas.
- Guildas de 50 a 80 membros e guerras territoriais 30 contra 30 de até 60 minutos.

O GDD é uma referência de desenvolvimento. As regras aprovadas, direções de produção e parâmetros ainda sujeitos a testes estão identificados no documento. Este repositório contém a documentação e o primeiro protótipo offline. O servidor multiplayer e o cliente Java continuam nas próximas etapas de implementação.
