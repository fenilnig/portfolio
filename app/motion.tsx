"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Parses "44M+" / "3.05K" into its number, decimals and surrounding text for the count-up
function parseStat(text: string) {
  const m = text.match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], value: parseFloat(m[2]), decimals: (m[2].split(".")[1] || "").length, suffix: m[3] };
}

/**
 * Page-wide scroll motion (GSAP + ScrollTrigger + SplitText):
 * - section titles rise in letter by letter
 * - the Grind timeline line draws itself as you scroll
 * - hero stats count up on load
 * - hero: projector warm-up of the CRT film leader on load, then a dolly-in + parallax on scroll
 * Renders nothing; skipped entirely for prefers-reduced-motion.
 */
export function SiteMotion() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // Section titles: masked letter-by-letter reveal
    document.querySelectorAll<HTMLElement>(".sec-title").forEach((title) => {
      const split = SplitText.create(title, { type: "lines,chars", mask: "lines" });
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.025,
        scrollTrigger: { trigger: title, start: "top 85%", once: true },
      });
    });

    // Timeline: progress line scrubbed to scroll position
    const progress = document.querySelector<HTMLElement>(".tl-progress");
    const timeline = document.querySelector<HTMLElement>(".timeline");
    if (progress && timeline) {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: timeline, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
        }
      );
    }

    // Hero stats: count up from zero
    document.querySelectorAll<HTMLElement>(".stat-num").forEach((el, i) => {
      const stat = parseStat(el.textContent || "");
      if (!stat) return;
      const counter = { v: 0 };
      gsap.to(counter, {
        v: stat.value,
        duration: 1.8,
        delay: 0.6 + i * 0.12,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${stat.prefix}${counter.v.toFixed(stat.decimals)}${stat.suffix}`;
        },
      });
    });

    // Hero intro: the film leader flickers on like a projector warming up, then the name rises in.
    // Only .hero-name is tweened — elements with .fi already have CSS opacity/transform transitions,
    // which fight GSAP tweens on the same properties.
    const frame = document.querySelector<HTMLElement>("#hero .shader-frame");
    const heroContent = document.querySelector<HTMLElement>("#hero > .relative");
    if (frame) {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(frame, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" })
        .to(frame, { opacity: 0.55, duration: 0.06, repeat: 3, yoyo: true, ease: "none" }, 0.15)
        .from("#hero .hero-name", { yPercent: 25, opacity: 0, duration: 1, clearProps: "opacity,transform" }, 0.35);

      // Scrolling out of the hero: the leader dollies in and fades while the text drifts up faster (parallax)
      gsap
        .timeline({ scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 0.8 } })
        .to(frame, { scale: 1.18, opacity: 0.25, ease: "none" }, 0)
        .to(heroContent, { yPercent: -18, ease: "none" }, 0);
    }

    // Layout shifts (expanding chapters, lazy images) move trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  });

  // Spotlight cards: a soft glow that follows the cursor (delegated, so it covers every .spotlight)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
