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
