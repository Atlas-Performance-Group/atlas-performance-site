# CHANGELOG — branch `revisao-total` (06/10/2026)

Nada foi publicado em produção. Alterações apenas nesta branch (commit local, sem push).

## Conteúdo
- Removidos 4 depoimentos e 4 contadores (R$ 1M+, ROAS 3,4x, +120, 14 dias) sem comprovação. Motivo: regra de não publicar resultado sem confirmação (e risco de publicidade enganosa).
- Nova seção "Cases Atlas": Experience Films, Binnos Films e Herbalife, SEM números.
- Novo serviço e página `/edicao-producao-video/`; card 07 na home; título da seção de serviços ajustado (não diz mais "duas coisas").
- "Relatório toda segunda-feira" na home.
- E-mail oficial `comercial@atlasperformancegroup.com` em todas as páginas e schema (antes: gmail).

## SEO
- Domínio `atlasperformancegroup.com` em canonical, og:*, twitter:*, schema, sitemap e robots (antes: `.vercel.app`).
- Schema: removido horário 24/7 não confirmado; descrição inclui criativos e vídeo.
- Sitemap com 9 URLs; `llms.txt` criado; meta description da home atualizada.

## Segurança
- `vercel.json`: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, HSTS e cache imutável em `/assets`.
- Sem segredos no repositório (varredura feita). Site estático: sem `npm audit`, sem formulários.
- `motion.js` agora hospedado em `assets/vendor/` (sem CDN de terceiro).

## Mensuração / LGPD
- `assets/analytics.js`: GA4 só carrega após aceite (Consent Mode v2, tudo negado por padrão). Eventos: `whatsapp_click`, `email_click`, `cta_click`, `scroll_depth` (25/50/75/90), `form_submit`, `generate_lead` (whatsapp/email/form).
- Banner de cookies + página `/politica-de-privacidade/` (revisar com advogado). Link no rodapé de todas as páginas.
- PENDENTE: trocar `G-XXXXXXXXXX` em `assets/analytics.js` pelo ID real.

## Performance / acessibilidade
- Removido código morto do hero (80 requisições a `assets/frames-v2/*` davam 404; o visual já era o fallback de zoom).
- Google Fonts sem bloqueio de renderização; contraste do marquee corrigido (2,6 → ~5:1).

## Pós-revisão independente
- Recusar/revogar consentimento agora nega `analytics_storage` na sessão e apaga cookies `_ga*`.
- HSTS sem `preload` (difícil de reverter; avaliar depois que todos os subdomínios tiverem HTTPS).
- Pendentes (dependem do Miguel): ID real do GA4; CNPJ/razão social na política de privacidade.
- Observação: `generate_lead` é o único evento a marcar como conversão (`whatsapp_click`/`email_click` são complementares).

## Correção de rumo (domínio)
- O Miguel confirmou que o domínio do site é `atlasperformancegroup.vercel.app` (não há domínio próprio). Revertidos canonical, og, schema, sitemap, robots e llms.txt para esse endereço.
- E-mail voltou para `comercial.atlasperformance@gmail.com` (única caixa existente). Quando houver e-mail próprio, trocar com um único find/replace.
- Herbalife removida temporariamente dos cases (a pedido do Miguel); reincluir após confirmar texto.
- Menu/rodapé: 'Resultados'→'Transparência', 'Provas'→'Cases' (coerência com o conteúdo atual).
- Fontes (Barlow Condensed e Sora, subset latin) hospedadas em `assets/fonts/` + `assets/fonts.css`: sem requisição ao Google Fonts (mais rápido e melhor para LGPD). CSP sem domínios do Google Fonts.
- Animação de abertura da home ~2x mais rápida (cortina 1,5s→0,4s; sequência do hero comprimida), mesma coreografia.
- Resultado local (mobile): páginas de serviço 99-100; home 82-90 (oscila).

## Confiança e visual sóbrio (pedido do Miguel, 06/10/2026)
- Seção "Cases/Quem já sobe com a gente" removida da home e do menu (Experience Films e Binnos Films fora).
- Logo corrigida: o site usava recorte borrado de 88px e um triângulo genérico na abertura. Agora usa a logo original (escalador + ATLAS PERFORMANCE GROUP) em alta resolução: header, rodapé, hero, favicon, ícone e imagem de compartilhamento (`assets/og.jpg` 1200×630).
- Removidas as 3 imagens com aparência de geradas por IA (hero, escalador, horizonte), cortina de abertura, barras de cinema, grão, vinheta, brilhos flutuantes, inclinação 3D nos cards, texto vazado em títulos e a lib `motion.js`. Hero estático com a logo.
- Textos de IA removidos ("Construído com IA", "Tecnologia própria + IA aplicada", "IA aplicada" em Sites Institucionais, incluindo meta e schema) e a frase de escassez "vagas limitadas".
- Faixa de plataformas sem HubSpot e RD Station (não confirmados) e sem rolagem automática.
- Script da home reescrito (~80 linhas): menu, FAQ, entrada suave das seções, linha do método, botão flutuante.
- Sitemap com lastmod; Barlow Condensed com font-display:optional (sem troca de fonte = sem deslocamento de layout, CLS).
