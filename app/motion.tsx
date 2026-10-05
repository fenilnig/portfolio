"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { CrtBackground } from "@/shaders/crt/CrtBackground";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fired when the film-leader intro starts leaving, so the hero can animate in underneath it
const INTRO_DONE_EVENT = "film-intro-done";

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
 * - once the film intro clears: hero name rises in and stats count up
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

    // Hero entrance, held until the film intro starts clearing.
    // Only .hero-name is tweened — elements with .fi already have CSS opacity/transform
    // transitions, which fight GSAP tweens on the same properties.
    const heroIn = () => {
      gsap.from("#hero .hero-name", { yPercent: 25, opacity: 0, duration: 1, ease: "power3.out", clearProps: "opacity,transform" });

      document.querySelectorAll<HTMLElement>(".stat-num").forEach((el, i) => {
        const stat = parseStat(el.textContent || "");
        if (!stat) return;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: stat.value,
          duration: 1.8,
          delay: 0.2 + i * 0.12,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = `${stat.prefix}${counter.v.toFixed(stat.decimals)}${stat.suffix}`;
          },
        });
      });
    };
    window.addEventListener(INTRO_DONE_EVENT, heroIn, { once: true });

    // Layout shifts (expanding chapters, lazy images) move trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener(INTRO_DONE_EVENT, heroIn);
    };
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

// Countdown 3 → 2 → 1 at normal speed (one number per second), then the leader's flash
const INTRO_COUNT_FROM = 3;
const INTRO_EXIT = 0.4;

/**
 * Full-screen loading intro: ThreeUI's cinematic film-leader CrtBackground counting 3 → 1 in
 * real time, then a GSAP fade/zoom-out into the site as the flash hits. Click or any key skips
 * it. Unmounts afterwards so the WebGL renderer stops; a CSS failsafe (.film-intro) hides it
 * even if JS never runs.
 */
export function FilmIntro() {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      setShow(false);
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      return;
    }

    const root = document.documentElement;
    root.style.overflow = "hidden";
    let leaving = false;
    let backstop = 0;

    const finish = () => {
      root.style.overflow = "";
      setShow(false);
    };
    const leave = () => {
      if (leaving) return;
      leaving = true;
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      gsap.to(el, { opacity: 0, scale: 1.06, duration: INTRO_EXIT, ease: "power2.in", onComplete: finish });
      // GSAP runs on requestAnimationFrame, which stalls in background tabs; a plain timer
      // guarantees the scroll lock is released and the intro unmounts on schedule regardless.
      backstop = window.setTimeout(finish, INTRO_EXIT * 1000 + 250);
    };

    // The leader's clock starts when it mounts (same tick as this effect), so leave exactly
    // when its countdown reaches the flash.
    const timer = window.setTimeout(leave, INTRO_COUNT_FROM * 1000);
    el.addEventListener("click", leave);
    window.addEventListener("keydown", leave);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(backstop);
      el.removeEventListener("click", leave);
      window.removeEventListener("keydown", leave);
      root.style.overflow = "";
    };
  }, []);

  if (!show) return null;
  return (
    <div ref={ref} className="film-intro" aria-hidden="true">
      <CrtBackground
        variant="cinematic"
        speed={1.00}
        countFrom={INTRO_COUNT_FROM}
        motion={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
        opacity={1.00}
      />
      <span className="film-intro-skip">Click or press any key to skip</span>
    </div>
  );
}
