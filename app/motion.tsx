"use client";
import { useEffect, useRef } from "react";
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

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Film grain + drifting light leak + anamorphic streak pulled toward the cursor
const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uAccent;
uniform float uStrength;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.06;

  // Slow organic light leak from the top-right, warped by noise
  vec2 leakPos = vec2(0.82 + 0.06 * sin(t * 2.0), 0.78 + 0.05 * cos(t * 1.6));
  float warp = noise(uv * 3.0 + t) * 0.25;
  float leak = smoothstep(0.75, 0.0, length((uv - leakPos) * asp) + warp);

  // Horizontal anamorphic streak that follows the cursor's height and leans toward it
  float streakY = mix(0.62, uMouse.y, 0.35);
  float streak = exp(-pow((uv.y - streakY) * 28.0, 2.0)) * smoothstep(0.0, 1.0, 1.0 - abs(uv.x - uMouse.x) * 1.1);

  // Soft glow around the cursor
  float glow = smoothstep(0.45, 0.0, length((uv - uMouse) * asp));

  // Animated film grain
  float grain = hash(uv * uRes + fract(uTime * 7.0) * 100.0) - 0.5;

  float light = leak * 0.5 + streak * 0.22 + glow * 0.2;
  // Grain kept faint: the page already has a global grain overlay (body::after)
  vec3 col = uAccent * light + grain * 0.03;
  float alpha = clamp(light * 0.9 + abs(grain) * 0.05, 0.0, 1.0) * uStrength;
  gl_FragColor = vec4(col * uStrength, alpha);
}
`;

function readAccent(): { rgb: [number, number, number]; light: boolean } {
  const cs = getComputedStyle(document.documentElement);
  const toRgb = (hex: string): [number, number, number] => {
    const h = hex.trim().replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };
  const bg = toRgb(cs.getPropertyValue("--black") || "#070707");
  return { rgb: toRgb(cs.getPropertyValue("--gold") || "#c8973a"), light: bg[0] + bg[1] + bg[2] > 1.5 };
}

/**
 * WebGL hero background in the spirit of ThreeUI shader backgrounds, written as a single
 * raw-WebGL fragment shader to avoid shipping all of three.js. Pauses when the hero is
 * offscreen or the tab is hidden; draws one still frame for prefers-reduced-motion.
 */
export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uAccent = gl.getUniformLocation(prog, "uAccent");
    const uStrength = gl.getUniformLocation(prog, "uStrength");

    // Render below native resolution — it's grain and glow, sharpness doesn't matter
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 1) * 0.6;
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let accent = readAccent();
    const themeObserver = new MutationObserver(() => (accent = readAccent()));
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });

    const reduced = prefersReducedMotion();
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 0 : (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform3f(uAccent, ...accent.rgb);
      gl.uniform1f(uStrength, accent.light ? 0.35 : 0.8);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const loop = () => {
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const resume = () => {
      if (!reduced && visible && !document.hidden && !raf) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", resume);

    if (reduced) draw();
    else resume();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-shader" aria-hidden="true" />;
}
