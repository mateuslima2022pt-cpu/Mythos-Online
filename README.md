# Mythos Online

MMORPG 2D de fantasia medieval com construção de builds, evolução de classes, equipamentos visíveis, refinamento e guerras territoriais.

## Protótipo offline v0.1 — Bosque da Aurora

Primeira área jogável em JavaScript, com **Guardião**, guia de iniciante, floresta,
monstros, chefe, atributos, talentos e equipamentos visíveis.

- **[Baixar o protótipo completo (ZIP)](prototypes/offline/v0.1/Mythos_Online_Offline_v0.1.zip)**
- [HTML autossuficiente](prototypes/offline/v0.1/Mythos_Online_Offline_v0.1.html)
- [Instruções, controles e código-fonte](prototypes/offline/v0.1/README.md)
- [Arquitetura proposta para o MMORPG e banco de dados](prototypes/offline/v0.1/ARQUITETURA.md)

Baixe o ZIP pelo botão **Download raw file**, extraia e abra
**Mythos_Online_Offline_v0.1.html** no navegador do seu desktop. Funciona sem internet
ou instalação. O salvamento desta versão é local e pode ser exportado.

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
