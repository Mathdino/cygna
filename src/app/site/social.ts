import { Facebook, Instagram, Linkedin, Whatsapp, Youtube } from "../components/SocialIcons";
import { SITE } from "./config";

/* Lista única de redes sociais, usada no rodapé e na página de contato.
   A ordem daqui é a ordem na tela. Rede sem URL no config (linha comentada)
   simplesmente não aparece — para ativar, basta descomentar em config.ts. */
export type RedeSocial = { label: string; href: string; Icon: typeof Instagram };

export const REDES_SOCIAIS: RedeSocial[] = [
  { label: "Instagram", href: SITE.social.instagram, Icon: Instagram },
  { label: "LinkedIn", href: SITE.social.linkedin, Icon: Linkedin },
  { label: "Facebook", href: SITE.social.facebook, Icon: Facebook },
  { label: "YouTube", href: SITE.social.youtube, Icon: Youtube },
  { label: "WhatsApp", href: SITE.contact.whatsapp && `https://wa.me/${SITE.contact.whatsapp}`, Icon: Whatsapp },
].filter((r): r is RedeSocial => Boolean(r.href));

/** "instagram.com/cygna" — versão curta da URL para exibir como texto. */
export const urlCurta = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
