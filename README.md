<p align="center">
  <img src="img/readme-cover.png" alt="Teacher Patrícia · Business & Tech English: landing page com HTML, CSS e JavaScript" width="100%">
</p>

# Teacher Patrícia · Landing Page

<p>
  <a href="https://www.teacherpatricia.net/"><b>🔗 Ver o site no ar</b></a>
</p>

Landing page da **Teacher Patrícia**, professora de inglês online focada em **Business English** e **Tech English**. Site estático (HTML, CSS e JavaScript puros), sem build e sem dependências.

## Páginas

| Arquivo | Descrição |
| --- | --- |
| `index.html` | Landing page principal: hero, trilhas (Business/Tech), como funciona, para quem é, loja e CTA final. |
| `loja.html` | Página "Loja em construção", enquanto a loja real não está no ar. |
| `flexge.html` | Página "Flexge: o material didático" (plataforma, telas do app, sala de aula invertida, certificados), aberta em nova aba pelo selo "Saiba mais" do hero. |
| `empresa.html` | Página "Business English para empresas" (programa 2027, trilha Tech English, depoimentos e contato), aberta em nova aba pelo seletor do hero. |
| `404.html` | Página de erro. Tem **CSS e JS embutidos** para funcionar em qualquer rota. |

## Estrutura do projeto

```
teacher-patricia/
├── index.html
├── loja.html
├── flexge.html
├── empresa.html
├── 404.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   ├── selo-parceiro-flexge.png
│   ├── social-preview.png     ← imagem de compartilhamento (1200×630)
│   ├── readme-cover.png       ← capa deste README (1600×640)
│   ├── favicon.svg            ← ícone da aba (navegadores modernos)
│   ├── favicon.ico            ← ícone da aba (fallback)
│   ├── apple-touch-icon.png   ← ícone ao salvar na tela inicial do iPhone
│   └── flexge/                ← imagens da página Flexge (cedidas pela Flexge)
```

## Como rodar localmente

Abrir o `index.html` direto no navegador já funciona. Para testar de forma mais fiel (inclusive a página 404), use um servidor local dentro da pasta do projeto:

```bash
npx serve
```

Depois acesse o endereço mostrado (geralmente `http://localhost:3000`) e digite uma rota inexistente, como `/qualquer-coisa`, para ver a 404.

> `python3 -m http.server` não usa o `404.html` e serve a página de erro padrão dele.

## Identidade visual

**Paleta**

| Cor | Hex | Uso |
| --- | --- | --- |
| Ardósia | `#4D585A` | Títulos, notebook, botões secundários |
| Rosa | `#DB95A3` | Destaques, botões principais, bolhas do chat |
| Creme | `#FAEDE4` | Fundo do tema claro |

**Tipografia**

- **Montserrat**: textos.
- **Satisfy**: logo e destaques em script.

As duas vêm do Google Fonts (licença livre) e são carregadas no `<head>` de cada página. As cores e fontes ficam como variáveis no topo do `css/style.css` (`:root`).

> O manual de marca usa Salamander Script e Simplicity, que são fontes comerciais. A Satisfy foi escolhida como alternativa gratuita e parecida. Para usar as originais, é necessário ter licença de web font e adicionar os arquivos ao projeto.

## Tema claro e escuro

- Segue automaticamente a preferência do sistema (`prefers-color-scheme`).
- O botão 🌙/☀️ no menu alterna manualmente e salva a escolha no `localStorage`.
- Todas as cores vêm de variáveis CSS. Para ajustar um tema, edite os blocos de tokens no `:root` do `style.css`.

## O que você precisa trocar antes de publicar

**Já configurados**

- Instagram: `https://instagram.com/teacherpatricia.insta` (`index.html` e `loja.html`)
- LinkedIn: `https://www.linkedin.com/in/teacherpatricianet/` (`index.html` e `loja.html`)

- WhatsApp: `https://wa.me/5551989406926` (`index.html`, `loja.html` e `404.html`)

**Ainda é placeholder**

| Placeholder | O que é | Onde aparece |
| --- | --- | --- |
| `loja.html` | Link da loja (página "em construção") | `index.html` (menu, botão da seção Loja e ícone do rodapé) |

Quando a loja real estiver pronta, troque os links de `loja.html` pelo endereço dela.

## Páginas com CSS/JS embutido (atenção)

O `404.html` tem uma **cópia** do `css/style.css` e do `js/main.js` dentro dele. Por isso:

- Se você alterar o `style.css` ou o `main.js`, **atualize também o `404.html`**.
- O `404.html` usa uma tag `<base>` no `<head>` para que os links e as fontes funcionem em qualquer rota. Como o site está em domínio próprio, ela aponta para a raiz: `<base href="/">`.
- Se o site voltar a ser servido em uma subpasta (por exemplo, GitHub Pages de projeto), troque para `<base href="/NOME-DO-REPOSITORIO/">`.
- Ao abrir o `404.html` com duplo clique, os botões de início apontam para a raiz do computador. Isso é esperado no teste local.

## Publicação

Qualquer hospedagem de site estático serve. Envie todo o conteúdo da pasta, mantendo a estrutura.

- **GitHub Pages, Netlify, Vercel:** o `404.html` na raiz já é usado automaticamente.
- **Apache:** adicione `ErrorDocument 404 /404.html` no `.htaccess`.
- **Nginx:** adicione `error_page 404 /404.html;` na configuração do servidor.

## Social preview (Open Graph)

A imagem que aparece ao compartilhar o link (WhatsApp, LinkedIn, Instagram, Facebook, X) é `img/social-preview.png`, com 1200×630 px. As meta tags ficam no `<head>` do `index.html`.

- As tags `og:url`, `og:image` e `twitter:image` usam o domínio próprio (`https://www.teacherpatricia.net/`). O endereço da imagem precisa ser **absoluto** (com `https://`). Se o domínio mudar, troque nessas três tags e a `<base>` do `404.html`.
- Depois de publicar, teste o link no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ou no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). As redes guardam a imagem em cache, então esses testes forçam a atualização.

## Parceria

O selo **Parceiro Flexge** aparece no hero, acima do notebook (`img/selo-parceiro-flexge.png`).

## Próximos passos sugeridos

- [ ] Trocar WhatsApp, Instagram, LinkedIn e link da loja
- [ ] Incluir depoimentos de alunos
- [ ] Adicionar a logo em imagem no cabeçalho
- [ ] Configurar domínio, favicon e imagem de compartilhamento (Open Graph)
