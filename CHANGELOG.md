
## Versão leve (06/10/2026)
- Removidas 80 requisições mortas (`frames-v2` dava 404) e o código que as chamava.
- Fontes e `motion.js` hospedados localmente (fontes recortadas para PT-BR: 72 KB no total, menos que no Google Fonts); CSP sem domínios externos de fonte/script.
- Imagens do topo e dos fundos em AVIF + WebP, com versão de 960px para celular (hero: 43 KB → 15 KB no celular).
- Animações: removido o grão animado em tela cheia e os brilhos que se moviam sem parar; abertura ~40% mais curta (mesma coreografia).
- Cache: fontes/vendor imutáveis; demais assets 1 dia + revalidação.
