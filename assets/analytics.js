/* Atlas Performance Group — GA4 com consentimento (LGPD)
 * O GA4 só carrega depois que o visitante aceita. Sem aceite, nada é enviado.
 * Preencha o ID da propriedade abaixo (GA4 > Admin > Fluxos de dados > ID da métrica).
 */
(function () {
  "use strict";
  var GA_ID = "G-FY7VQD4YTJ";
  var KEY = "atlas_consent_v1";

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function gaReady() { return /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== "G-XXXXXXXXXX"; }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent Mode v2: tudo negado por padrão
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", wait_for_update: 500
  });

  var loaded = false;
  function load() {
    if (loaded || !gaReady()) return;
    loaded = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function track(name, params) {
    if (!loaded) return;
    gtag("event", name, params || {});
  }

  /* ---------- eventos ---------- */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("a,button");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var label = (a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
    var page = location.pathname;
    if (href.indexOf("wa.me") > -1 || href.indexOf("api.whatsapp.com") > -1) {
      track("whatsapp_click", { link_text: label, page_path: page });
      track("generate_lead", { lead_type: "whatsapp", page_path: page });
    } else if (href.indexOf("mailto:") === 0) {
      track("email_click", { link_text: label, page_path: page });
      track("generate_lead", { lead_type: "email", page_path: page });
    }
    if (a.matches && a.matches(".btn-primary,.btn-ghost,.nav-cta")) {
      track("cta_click", { link_text: label, link_url: href, page_path: page });
    }
  }, true);

  document.addEventListener("submit", function (ev) {
    var f = ev.target;
    track("form_submit", { form_id: f.id || f.getAttribute("name") || "form", page_path: location.pathname });
    track("generate_lead", { lead_type: "form", page_path: location.pathname });
  }, true);

  var marks = [25, 50, 75, 90], hit = {};
  addEventListener("scroll", function () {
    var h = document.documentElement.scrollHeight - innerHeight;
    if (h <= 0) return;
    var p = Math.round((scrollY / h) * 100);
    marks.forEach(function (m) {
      if (p >= m && !hit[m]) { hit[m] = 1; track("scroll_depth", { percent: m, page_path: location.pathname }); }
    });
  }, { passive: true });

  /* revoga: nega o consentimento na sessão e apaga os cookies _ga* */
  function revoke() {
    gtag("consent", "update", { analytics_storage: "denied" });
    loaded = false;
    var host = location.hostname.split("."), doms = [location.hostname];
    for (var i = 1; i < host.length - 1; i++) doms.push("." + host.slice(i).join("."));
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (n.indexOf("_ga") !== 0) return;
      doms.forEach(function (dm) { document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + dm; });
      document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    });
  }

  /* ---------- banner de cookies ---------- */
  function banner() {
    var st = document.createElement("style");
    st.textContent =
      "#ck{position:fixed;left:16px;right:16px;bottom:16px;max-width:560px;z-index:9999;background:#111;color:#f5f5f5;border:1px solid #333;border-radius:12px;padding:16px 18px;font:400 14px/1.5 system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.5)}" +
      "#ck p{margin:0 0 12px}#ck a{color:#ff5a3c;text-decoration:underline}" +
      "#ck .r{display:flex;gap:10px;flex-wrap:wrap}" +
      "#ck button{min-height:44px;padding:0 18px;border-radius:8px;border:1px solid #555;background:transparent;color:#f5f5f5;font:600 14px system-ui,sans-serif;cursor:pointer}" +
      "#ck button.y{background:#e10600;border-color:#e10600;color:#fff}" +
      "#ck button:focus-visible{outline:3px solid #fff;outline-offset:2px}";
    document.head.appendChild(st);
    var d = document.createElement("div");
    d.id = "ck"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Aviso de cookies");
    d.innerHTML = '<p>Usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorar a sua experiência. Você escolhe. Saiba mais na <a href="/politica-de-privacidade/">Política de Privacidade</a>.</p>' +
      '<div class="r"><button type="button" class="y" id="ck-y">Aceitar</button><button type="button" id="ck-n">Recusar</button></div>';
    document.body.appendChild(d);
    function close(v) {
      write(v); d.remove();
      if (v === "granted") load(); else revoke();
    }
    document.getElementById("ck-y").onclick = function () { close("granted"); };
    document.getElementById("ck-n").onclick = function () { close("denied"); };
  }

  document.addEventListener("click", function (ev) {
    var l = ev.target.closest && ev.target.closest("[data-cookie-settings]");
    if (!l) return;
    ev.preventDefault();
    try { localStorage.removeItem(KEY); } catch (e) {}
    revoke();
    if (!document.getElementById("ck")) banner();
  });

  function init() {
    var c = read();
    if (c === "granted") load();
    else if (c !== "denied") banner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
