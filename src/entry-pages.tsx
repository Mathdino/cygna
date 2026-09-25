import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/index.css";
import { findRoute } from "./app/routes";
import { hideLoader } from "./app/lib/loader";

/* Páginas internas: o HTML chega pré-renderizado (scripts/prerender.mjs) e aqui
   só hidrata. No `vite dev` não há pré-render, então monta do zero. */
const route = findRoute(window.location.pathname);
const root = document.getElementById("root")!;
const app = <StrictMode>{route.render?.()}</StrictMode>;

if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

hideLoader();
