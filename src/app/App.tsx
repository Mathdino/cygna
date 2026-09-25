import { useEffect } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP, MOTION } from "./lib/gsap";
import { scrollToId } from "./lib/scroll";
import CookieConsent from "./components/CookieConsent";
import Overlays from "./components/Overlays";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Niches from "./sections/Niches";
import Problem from "./sections/Problem";
import Features from "./sections/Features";
import Audience from "./sections/Audience";
import HowItWorks from "./sections/HowItWorks";
import AppShowcase from "./sections/AppShowcase";
import Stats from "./sections/Stats";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import Faq from "./sections/Faq";
import FinalCta from "./sections/FinalCta";
import Footer from "./sections/Footer";

/**
 * Rendered as the first child of #smooth-content: sibling layout effects run in order,
 * so the smoother exists before any section creates its ScrollTriggers.
 */
function Smoother() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        effects: true,
        smoothTouch: 0.1,
      });
    });
  });
  return null;
}

/*
 * Arrival from another page on a "/#id" link (header, footer). Left alone, the browser's own
 * fragment jump scrolls the fixed #smooth-wrapper from inside: the section shows, but
 * ScrollSmoother/ScrollTrigger still think the page is at the top, so nothing below animates in.
 * Module scope runs before React renders, so the hash is taken out of the URL before the target
 * exists (no native jump), then reached through the smoother and put back without scrolling.
 */
const LANDING_HASH = typeof window !== "undefined" ? decodeURIComponent(window.location.hash.slice(1)) : "";
if (LANDING_HASH) history.replaceState(history.state, "", window.location.pathname + window.location.search);

function HashLanding() {
  useEffect(() => {
    if (!LANDING_HASH || !document.getElementById(LANDING_HASH)) return;
    const go = () => {
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        scrollToId(LANDING_HASH);
        history.replaceState(history.state, "", `#${LANDING_HASH}`);
      });
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="bg-perola font-sans">
          <Smoother />
          <Hero />
          <main>
            <Niches />
            <Problem />
            <Features />
            <Audience />
            <HowItWorks />
            <AppShowcase />
            <Stats />
            <Testimonials />
            <Pricing />
            <Faq />
            <FinalCta />
          </main>
          <Footer />
        </div>
      </div>
      {/* Fixed UI lives outside the smoothed content; mounted after it so its triggers see the final layout */}
      <Navbar />
      <Overlays />
      <CookieConsent />
      <HashLanding />
    </>
  );
}
