/* =============================================================================
   CONSENTIMENTO DE COOKIES (LGPD + Google Consent Mode v2)

   Duas categorias opcionais, as duas que o Google entende:
     · analytics → analytics_storage
     · marketing → ad_storage, ad_user_data, ad_personalization

   O cookie guarda só a escolha, nada que identifique a pessoa. O script inline
   do <head> (site/seo.ts) lê este MESMO cookie antes do gtag.js carregar, por
   isso nome e formato moram aqui, num lugar só.
   ========================================================================== */

export const CONSENT_COOKIE = "cygna_consent";

/* Sobe quando as categorias mudarem: escolha salva com versão antiga é
   descartada e o banner volta, em vez de valer para algo que a pessoa não viu. */
export const CONSENT_VERSION = 1;

/* 12 meses: depois disso a pessoa é consultada de novo. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export const OPEN_PREFERENCES_EVENT = "cygna:abrir-preferencias-cookies";
export const CONSENT_CHANGE_EVENT = "cygna:consentimento-alterado";

export type ConsentChoice = { v: number; analytics: boolean; marketing: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function toGtagConsent(choice: ConsentChoice) {
  const ads = choice.marketing ? "granted" : "denied";
  return {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  };
}

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)`));
  if (!match?.[1]) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as ConsentChoice;
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): void {
  const choice: ConsentChoice = { v: CONSENT_VERSION, analytics, marketing };
  const secure = location.protocol === "https:" ? ";Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(choice))};max-age=${MAX_AGE_SECONDS};path=/;SameSite=Lax${secure}`;

  window.gtag?.("consent", "update", toGtagConsent(choice));

  /* Quem retira o consentimento não fica com os cookies já gravados:
     _ga* é do Analytics, _gcl* é do Google Ads. */
  if (!analytics) removeCookies(/^_ga(_|$)/);
  if (!marketing) removeCookies(/^_gcl_/);

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function removeCookies(pattern: RegExp): void {
  const host = location.hostname.replace(/^www\./, "");
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0]?.trim();
    if (!name || !pattern.test(name)) return;
    for (const domain of ["", `;domain=${host}`, `;domain=.${host}`]) {
      document.cookie = `${name}=;max-age=0;path=/${domain}`;
    }
  });
}

export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

/* Roda no <head>, ANTES do gtag.js: estado padrão negado e, se a pessoa já
   escolheu numa visita anterior, aplica a escolha na hora — a primeira página
   vista já sai medida com o consentimento certo. */
export function consentBootstrapScript(measurementId: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{var m=document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE}=([^;]+)/);if(m){var c=JSON.parse(decodeURIComponent(m[1]));if(c.v===${CONSENT_VERSION}){var a=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:a,ad_user_data:a,ad_personalization:a});}}}catch(e){}
gtag('js',new Date());gtag('config','${measurementId}');`;
}
