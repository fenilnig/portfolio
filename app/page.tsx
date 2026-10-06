"use client";
import React, { useState, useEffect, useRef } from "react";
import { SiteMotion, FilmIntro } from "./motion";
import { Aperture, Smartphone, Crosshair, Camera, Lightbulb, Target, Megaphone, Image as ImageIcon, Tag, Users, Telescope, AppWindow, Axis3d, Mic, Mic2, FileJson } from "lucide-react";

const tracks = [
  { title: "Teeth", artist: "5 Seconds of Summer", src: "/assets/music/5_Seconds_Of_Summer_-_Teeth.mp3" },
  { title: "To Ashes and Blood", artist: "Woodkid", src: "/assets/music/Woodkid_To_Ashes_and_Blood_from_the_series_Arcane_League_of_Legends.mp3" },
  { title: "The Line", artist: "Twenty One Pilots", src: "/assets/music/Twenty_One_Pilots_The_Line_from_the_series_Arcane_League_of_Legends.mp3" },
  { title: "São Paulo", artist: "The Weeknd", src: "/assets/music/The Weeknd - São Paulo.mp3" },
  { title: "Sweet Dreams", artist: "Eurythmics", src: "/assets/music/Eurythmics - Sweet Dreams (Are Made of This) (Remastered).mp3" },
  { title: "Cold", artist: "Alfie Castley", src: "/assets/music/Alfie Castley - Cold.mp3" },
  { title: "Holding Out for a Hero", artist: "Bonnie Tyler", src: "/assets/music/Bonnie Tyler - Holding Out for a Hero (Single Version).mp3" },
  { title: "The Final Countdown", artist: "Europe", src: "/assets/music/Europe - The Final Countdown.mp3" },
  { title: "Rasputin", artist: "Boney M.", src: "/assets/music/Boney M. - Rasputin.mp3" },
  { title: "The World We Knew", artist: "Frank Sinatra", src: "/assets/music/Frank Sinatra - The World We Knew (Over And Over).mp3" },
  { title: "Can't Take My Eyes off You", artist: "Frankie Valli", src: "/assets/music/Frankie Valli - Can t Take My Eyes off You.mp3" },
  { title: "Feel Good Inc.", artist: "Gorillaz", src: "/assets/music/Gorillaz - Feel Good Inc.mp3" },
  { title: "Carnival", artist: "John Michael Howell", src: "/assets/music/John Michael Howell - Carnival.mp3" },
  { title: "I Was Made For Lovin' You", artist: "KISS", src: "/assets/music/KISS - I Was Made For Lovin  You.mp3" },
  { title: "IRIS OUT", artist: "Kenshi Yonezu", src: "/assets/music/Kenshi Yonezu - IRIS OUT.mp3" },
  { title: "In the End", artist: "Linkin Park", src: "/assets/music/Linkin Park - In the End.mp3" },
  { title: "Art of Guitar", artist: "MarCin", src: "/assets/music/MarCin - Art of Guitar.mp3" },
  { title: "Lust", artist: "Marino", src: "/assets/music/Marino - Lust.mp3" },
  { title: "Feeling Good", artist: "Michael Bublé", src: "/assets/music/Michael Bublé - Feeling Good.mp3" },
  { title: "Sway", artist: "Michael Bublé", src: "/assets/music/Michael Bublé - Sway.mp3" },
  { title: "Bye Bye Bye", artist: "NSYNC", src: "/assets/music/NSYNC - Bye Bye Bye.mp3" },
  { title: "Counting Stars", artist: "OneRepublic", src: "/assets/music/OneRepublic - Counting Stars.mp3" },
  { title: "I Ain't Worried", artist: "OneRepublic", src: "/assets/music/OneRepublic - I Ain t Worried.mp3" },
  { title: "Everything In Its Right Place", artist: "Radiohead", src: "/assets/music/Radiohead - Everything In Its Right Place.mp3" },
  { title: "Come and Get Your Love", artist: "Redbone", src: "/assets/music/Redbone - Come and Get Your Love (Single Version).mp3" },
  { title: "Duel of the Fates", artist: "Samuel Kim", src: "/assets/music/Samuel Kim - Duel of the Fates - Epic Version (Cover).mp3" },
  { title: "Borderline", artist: "Tame Impala", src: "/assets/music/Tame Impala - Borderline.mp3" },
  { title: "Let It Happen", artist: "Tame Impala", src: "/assets/music/Tame Impala - Let It Happen.mp3" },
  { title: "Loser", artist: "Tame Impala", src: "/assets/music/Tame Impala - Loser.mp3" },
  { title: "My Old Ways", artist: "Tame Impala", src: "/assets/music/Tame Impala - My Old Ways.mp3" },
  { title: "The Less I Know The Better", artist: "Tame Impala", src: "/assets/music/Tame Impala - The Less I Know The Better.mp3" }
];

// Camera-viewfinder chrome (corners, REC, play button, caption) shared by video cards
function ViewfinderOverlay({ label, caption, format }: {
  label: string;
  caption: string;
  format: string;
}) {
  return (
    <>
      <span className="absolute inset-0 block bg-gradient-to-t from-black/90 via-transparent to-black/50" />

      {/* Viewfinder corners */}
      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[var(--gold)]/70" />
      <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[var(--gold)]/70" />
      <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[var(--gold)]/70" />
      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[var(--gold)]/70" />

      {/* Top HUD */}
      <span className="absolute top-5 inset-x-6 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-[var(--off-white)]/80">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
          REC
        </span>
        <span>{format}</span>
      </span>

      {/* Play button */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex items-center justify-center w-16 h-16 rounded-full border border-[var(--gold)] bg-black/70 backdrop-blur-sm group-hover:bg-[var(--gold)] group-hover:scale-110 transition-all duration-300">
          <span className="absolute inset-0 rounded-full border border-[var(--gold)]/50 animate-ping" />
          <svg viewBox="0 0 24 24" className="w-6 h-6 ml-1 fill-[var(--gold)] group-hover:fill-black transition-colors duration-300">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>

      {/* Bottom caption */}
      <span className="absolute bottom-5 inset-x-6 block">
        <span className="block font-mono text-[10px] tracking-widest uppercase text-[var(--gold)] mb-1">{label}</span>
        <span className="block font-serif italic text-[var(--off-white)] text-sm sm:text-base leading-snug">{caption}</span>
      </span>
    </>
  );
}

// Instagram reel thumbnail — the reel's cover frame (saved locally in
// /assets/reels) linking out to Instagram. Replaces Instagram's white embed iframe.
// Spacing uses inline styles: the unlayered `* { margin: 0; padding: 0 }` reset in
// globals.css overrides Tailwind's m-*/p-* utilities.
function InstaReelThumb({ href, thumb, label, title }: {
  href: string;
  thumb: string;
  label: string;
  title: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — ${title}: watch on Instagram`}
      className="group block min-w-0"
    >
      <span className="relative block aspect-[9/16] overflow-hidden rounded-md border border-[var(--dim)] group-hover:border-[var(--gold)] bg-[var(--surface)] transition-colors duration-300">
        <img
          src={thumb}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm border border-white/25 opacity-80 group-hover:opacity-100 group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:scale-110 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white group-hover:fill-black" style={{ marginLeft: 2 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </span>
      <span className="block" style={{ marginTop: "0.5rem" }}>
        <span className="block text-[13px] leading-snug text-[var(--off-white)] group-hover:text-[var(--gold)] transition-colors truncate">{title}</span>
        <span className="block font-mono text-[9px] tracking-widest uppercase text-[var(--muted)]" style={{ marginTop: 2 }}>{label} · Instagram ↗</span>
      </span>
    </a>
  );
}

// Compact software project card for the Projects section. Spacing is inline because
// the unlayered margin/padding reset in globals.css overrides Tailwind spacing utilities.
function ProjectCard({ tag, title, description, tech, href }: {
  tag: string;
  title: string;
  description: string;
  tech: string[];
  href?: string;
}) {
  return (
    <div className="spotlight flex flex-col border border-[var(--dim)] hover:border-[var(--gold)]/60 bg-[var(--surface)] rounded-md transition-colors duration-300 fi" style={{ padding: "1.25rem" }}>
      <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--gold)]">{tag}</span>
      <h3 className="font-sans text-2xl tracking-wide text-[var(--off-white)]" style={{ marginTop: "0.6rem" }}>{title}</h3>
      <p className="text-[13px] text-[var(--muted)] leading-relaxed" style={{ marginTop: "0.4rem" }}>{description}</p>
      <div className="tl-badges" style={{ marginTop: "auto", paddingTop: "1.25rem" }}>
        {tech.map((t) => (
          <span key={t} className="badge">{t}</span>
        ))}
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="badge gold hover:opacity-80 transition-opacity">
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
}

// Self-hosted video card styled like a camera viewfinder. Shows a poster + play
// button until clicked, then plays inline with native controls.
function VideoSpotlight({ src, poster, label, caption, onPlay, onPause }: {
  src: string;
  poster: string;
  label: string;
  caption: string;
  onPlay?: () => void;
  onPause?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const start = (e: React.MouseEvent) => {
    // Keep this click from reaching the document-level music autoplay listener
    e.stopPropagation();
    setStarted(true);
    videoRef.current?.play().catch(() => setStarted(false));
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-md border border-[var(--dim)] hover:border-[var(--gold)] bg-black shadow-2xl transition-colors duration-300">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={started}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onPause}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play: ${label}`}
          className="absolute inset-0 w-full h-full text-left cursor-pointer"
        >
          <ViewfinderOverlay label={label} caption={caption} format="16:9 · 1:03" />
        </button>
      )}
    </div>
  );
}

export default function Home() {
  // Video IDs
  const [video2Id, setVideo2Id] = useState("VIDEO_ID_2");
  const [video3Id, setVideo3Id] = useState("VIDEO_ID_3");
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({});


  // Music Player States
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // True while a VideoSpotlight is playing, so background music stays paused
  const videoPlayingRef = useRef(false);
  const handleVideoPlay = () => {
    videoPlayingRef.current = true;
    audioRef.current?.pause();
  };
  const handleVideoPause = () => {
    videoPlayingRef.current = false;
  };
  const [curTrack, setCurTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeStr, setTimeStr] = useState("0:00");
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [isMusicMinimized, setIsMusicMinimized] = useState(false);
  // The MP3s are kept out of the GitHub repo (copyright), so builds from GitHub have no music:
  // hide the player instead of showing one that can't play
  const [musicAvailable, setMusicAvailable] = useState(true);
  const musicMissingRef = useRef(false);

  // Theme State
  const [theme, setTheme] = useState<'dark' | 'light' | 'teal'>('teal');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light-theme', 'teal-theme');
      if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
      } else if (theme === 'teal') {
        document.documentElement.classList.add('teal-theme');
      }
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : prev === 'light' ? 'teal' : 'dark');
  };
  const [showPhotography, setShowPhotography] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<{ [key: number]: boolean }>({});
  
  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  // Form State
  const [formSent, setFormSent] = useState(false);

  // Initialize Custom Cursor & Scroll Reveal
  useEffect(() => {
    const cur = document.getElementById("cur");
    const ring = document.getElementById("curRing");
    if (!cur || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .video-card, .photo-card, [role='button']")) {
        ring.classList.add("big");
      } else {
        ring.classList.remove("big");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    let animFrameId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      animFrameId = requestAnimationFrame(animRing);
    };
    animRing();

    // Intersection Observer for fade-in animations
    let obs: IntersectionObserver | null = null;
    try {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("v");
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll(".fi, .tl-item").forEach((el) => obs?.observe(el));
    } catch (e) {
      console.warn("IntersectionObserver not supported or failed to initialize", e);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrameId);
      if (obs) obs.disconnect();
    };
  }, []);

  // Initialize Audio Player
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      const s = audio.currentTime;
      setTimeStr(Math.floor(s / 60) + ":" + (Math.floor(s % 60) + "").padStart(2, "0"));
    };
    const handleEnded = () => {
      setCurTrack((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    fetch(tracks[0].src, { method: "HEAD" })
      .then((res) => {
        if (res.ok) return;
        musicMissingRef.current = true;
        audio.pause();
        setMusicAvailable(false);
      })
      .catch(() => {});

    // Attempt autoplay
    audio.play().catch(() => {
      // Autoplay blocked, wait for user interaction
      const playOnInteract = () => {
        if (videoPlayingRef.current || musicMissingRef.current) return;
        audio.play().then(() => {
          document.removeEventListener("click", playOnInteract);
          document.removeEventListener("keydown", playOnInteract);
          document.removeEventListener("scroll", playOnInteract);
          document.removeEventListener("touchstart", playOnInteract);
        }).catch(() => {
          // If browser still blocks it (e.g. on scroll), keep listening for a click
        });
      };
      document.addEventListener("click", playOnInteract);
      document.addEventListener("keydown", playOnInteract);
      document.addEventListener("scroll", playOnInteract);
      document.addEventListener("touchstart", playOnInteract);
    });

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Sync Audio Source with Current Track
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    
    // Check if source changed to prevent restart loop
    const currentSrc = tracks[curTrack].src;
    if (!decodeURI(audio.src).endsWith(currentSrc)) {
      audio.src = currentSrc;
      if (playing) {
        audio.play().catch(() => setPlaying(false));
      }
    }
  }, [curTrack, playing]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => setPlaying(false));
    }
  };

  const loadTrack = (idx: number) => {
    if (idx < 0) idx = tracks.length - 1;
    if (idx >= tracks.length) idx = 0;
    setCurTrack(idx);
    setPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = tracks[idx].src;
      audioRef.current.play().catch(() => setPlaying(false));
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    audioRef.current.currentTime = clickPercent * audioRef.current.duration;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
    }, 3000);
  };

  const playVideo = (idx: number, vid: string) => {
    if (!vid || vid.startsWith("VIDEO_ID")) return;
    setPlayingVideos((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <>
      <FilmIntro />
      <audio ref={audioRef} preload="auto" src={tracks[0].src} />
      {/* Custom Cursor */}
      <div className="cur" id="cur"></div>
      <div className="cur-ring" id="curRing"></div>

      {/* Navigation */}
      <nav>
        <a href="#" className="nav-logo">
          FENIL <span>SHAH</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#grind">Grind</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        {/* Outside .nav-links so it stays visible on mobile, where the links are hidden */}
        <button
          onClick={cycleTheme}
          className="theme-toggle"
          title="Change theme"
          aria-label={`Change theme (current: ${theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'Cinema'})`}
        >
          <span aria-hidden="true">{theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🎬'}</span>
        </button>
      </nav>

      {/* Music Player */}
      <div className={`music-player ${isMusicMinimized ? "minimized" : ""}`} id="musicPlayer" style={musicAvailable ? undefined : { display: "none" }}>
        {!isMusicMinimized ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="mp-label" style={{ marginBottom: 0 }}>// now playing</div>
              <button className="mp-btn" onClick={() => setIsMusicMinimized(true)} title="Minimize Player" style={{ fontSize: "10px" }}>
                ▼
              </button>
            </div>
            <div className="mp-track" id="mpTrack">
              <span>{tracks[curTrack].artist}</span> — {tracks[curTrack].title}
            </div>
            <div className="mp-controls">
              <button className="mp-btn" onClick={() => loadTrack(curTrack - 1)} title="Previous">
                ⏮
              </button>
              <button className="mp-btn play" onClick={togglePlay} title="Play/Pause">
                {playing ? "⏸" : "▶"}
              </button>
              <button className="mp-btn" onClick={() => loadTrack(curTrack + 1)} title="Next">
                ⏭
              </button>
              <div className="mp-bar" onClick={handleProgressBarClick}>
                <div className="mp-progress" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="mp-time" id="mpTime">
                {timeStr}
              </span>
              <button className="mp-btn" onClick={() => setPlaylistOpen(!playlistOpen)} title="Playlist">
                ☰
              </button>
            </div>

            <div className={`mp-playlist ${playlistOpen ? "open" : ""}`} id="mpPlaylist">
              {tracks.map((track, idx) => (
                <div
                  key={idx}
                  className={`mp-item ${curTrack === idx ? "active" : ""}`}
                  onClick={() => loadTrack(idx)}
                >
                  {track.title} — {track.artist}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center cursor-none w-10 h-10 rounded-full border border-[var(--gold)] bg-[var(--surface)] hover:bg-[var(--black)] transition-all" onClick={() => setIsMusicMinimized(false)} title="Expand Player">
            <span className={`text-[var(--gold)] text-lg ${playing ? "animate-[spin_4s_linear_infinite]" : ""}`}>♪</span>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section id="hero">
        <SiteMotion />
        <div className="hero-bg-text" aria-hidden="true">
          FENIL
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 w-full z-10 relative">
          <div className="flex-1 flex flex-col justify-end">
            {/* Camera Viewfinder HUD */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-[10px] sm:text-[11px] font-mono tracking-widest text-[var(--muted)] mb-6 fi">
              <span className="flex items-center gap-1.5 text-[var(--red)] font-bold">
                <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse inline-block"></span>
                REC
              </span>
              <span className="text-[var(--dim)]">│</span>
              <span>24 FPS</span>
              <span className="text-[var(--dim)]">│</span>
              <span>1/48s</span>
              <span className="text-[var(--dim)]">│</span>
              <span>ISO 400</span>
              <span className="text-[var(--dim)]">│</span>
              <span className="text-[var(--gold)]">f/1.8 SONY A6700</span>
            </div>

            <div className="fi" style={{ transitionDelay: "0.1s" }}>
              <h1 className="hero-name">
                FENIL
                <br />
                SHAH
                <span className="glitch gr" aria-hidden="true">
                  FENIL
                  <br />
                  SHAH
                </span>
                <span className="glitch gb" aria-hidden="true">
                  FENIL
                  <br />
                  SHAH
                </span>
              </h1>
            </div>
            <p className="hero-role fi" style={{ transitionDelay: "0.2s" }}>
              Filmmaker &nbsp;·&nbsp; Visual&nbsp;Storyteller &nbsp;·&nbsp; <span>NASA&nbsp;HERC&nbsp;Awardee</span> &nbsp;·&nbsp; BTech&nbsp;CS&nbsp;(AI/ML)
            </p>
            <div className="hero-stats fi" style={{ transitionDelay: "0.3s" }}>
              <div className="stat-item">
                <span className="stat-num">44M+</span>
                <span className="stat-label">Solo YT Views</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">9K</span>
                <span className="stat-label">YT Subs</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">14M+</span>
                <span className="stat-label">Team Views</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">3.05K</span>
                <span className="stat-label">Instagram</span>
              </div>
            </div>
          </div>
          
          {/* Profile Picture Column */}
          <div className="w-full md:w-80 shrink-0 flex justify-center md:justify-end pb-4 fi" style={{ transitionDelay: "0.25s" }}>
            <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded-lg">
              {/* Viewfinder brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--gold)] z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--gold)] z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--gold)] z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--gold)] z-20 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"></div>

              <img 
                src="/assets/hero/v2_img_4.jpg" 
                alt="Blue Hero Silhouette" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 -scale-x-100 scale-y-100 group-hover:-scale-x-[1.05] group-hover:scale-y-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-35 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>scroll</span>
        </div>
      </section>

      <div className="divider" data-label="001"></div>

      <div className="marquee-wrap">
        <div className="marquee-track">
          <span className="marquee-item">
            <span className="dot"></span>CONTENT CREATOR
          </span>
          <span className="marquee-item">
            <span className="dot"></span>CINEMATOGRAPHER
          </span>
          <span className="marquee-item">
            <span className="dot"></span>SOCIAL MEDIA MANAGER
          </span>
          <span className="marquee-item">
            <span className="dot"></span>NASA HERC AWARD
          </span>
          <span className="marquee-item">
            <span className="dot"></span>SELF TAUGHT
          </span>
          <span className="marquee-item">
            <span className="dot"></span>44 MILLION VIEWS
          </span>
          <span className="marquee-item">
            <span className="dot"></span>SONY A6700
          </span>
          <span className="marquee-item">
            <span className="dot"></span>ATLAS SKILLTECH UNIVERSITY
          </span>
          <span className="marquee-item">
            <span className="dot"></span>CONTENT CREATOR
          </span>
          <span className="marquee-item">
            <span className="dot"></span>CINEMATOGRAPHER
          </span>
          <span className="marquee-item">
            <span className="dot"></span>SOCIAL MEDIA MANAGER
          </span>
          <span className="marquee-item">
            <span className="dot"></span>NASA HERC AWARD
          </span>
          <span className="marquee-item">
            <span className="dot"></span>SELF TAUGHT
          </span>
          <span className="marquee-item">
            <span className="dot"></span>44 MILLION VIEWS
          </span>
          <span className="marquee-item">
            <span className="dot"></span>SONY A6700
          </span>
          <span className="marquee-item">
            <span className="dot"></span>ATLAS SKILLTECH UNIVERSITY
          </span>
        </div>
      </div>

      <div className="divider" data-label="002"></div>

      {/* About Section */}
      <section id="about" className="sec">
        <div className="about-grid">
          <div>
            <span className="sec-tag fi">// 001 — introduction</span>
            <p className="about-quote fi" style={{ transitionDelay: "0.1s" }}>
              I don't do things halfway. I shoot, edit, post, iterate — <em>alone</em> — and I do it until it works.
            </p>
            <p className="about-body fi" style={{ transitionDelay: "0.15s" }}>
              Self-taught filmmaker, content creator, and visual storyteller based in Mumbai. No mentor, no formal film school, no shortcuts. Everything I know came from Discord servers at 2am, from watching a hundred tutorials and unlearning half of them, from editing frame by frame until it felt right.
            </p>
            <p className="about-body fi" style={{ transitionDelay: "0.2s" }}>
              I own a Sony A6700 with a TTArtisan f/1.8 lens, Simpex 200W light, and a tripod — enough to run a complete solo production. I've also operated gimbals professionally on set as part of crew, learned camera operating and lighting hands-on through RC Atlas. Every frame is deliberate.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 max-w-2xl mb-6 fi" style={{ transitionDelay: "0.22s" }}>
              <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded aspect-[4/5]">
                <img src="/assets/introduction/user_img_125k.jpg" alt="Lens Close-up" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
              </div>
              <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded aspect-[4/5]">
                <img src="/assets/introduction/user_img_89k.jpg" alt="Sunset Camera" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
              </div>
              <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded aspect-[4/5]">
                <img src="/assets/introduction/img_1791.jpg" alt="Camera Setup" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
              </div>
            </div>

            <p className="about-body fi" style={{ transitionDelay: "0.22s" }}>
              Currently a <strong style={{ color: "var(--gold)" }}>3rd year BTech CS student with specialisation in AI/ML</strong> at Atlas Skilltech University — and simultaneously working there as Social Media Intern & Photographer. Previously Social Media Manager for Team Mushak — where I helped bring home an international <strong style={{ color: "var(--gold)" }}>Social Media Award from NASA HERC</strong> and drove 14M+ views for the team.
            </p>

            <p className="about-body fi" style={{ transitionDelay: "0.25s" }}>
              Off camera: I solve Rubik's cubes — multiple kinds. I run on Monster and Diet Coke. That's not a bit, that's just accurate.
            </p>
            
            {/* Inline Rubik's Cubes Image */}
            <div className="mt-6 max-w-sm relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded fi" style={{ transitionDelay: "0.28s" }}>
              <img 
                src="/assets/introduction/rubiks_cubes_photo.jpg" 
                alt="Rubik's cube collection with Monster Energy and Diet Coke" 
                className="w-full h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
            </div>

            {/* Spotlight: Favorite Reel */}
            <div className="mt-8 mb-6 p-5 rounded-lg border border-[var(--gold)]/40 bg-[var(--surface)] fi shadow-xl relative overflow-hidden" style={{ transitionDelay: "0.3s" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--gold)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse inline-block"></span>
                    // Spotlight Edit
                  </div>
                  <h3 className="font-serif italic text-lg sm:text-xl text-[var(--off-white)] mt-1">
                    "one of my fav edits i ever made"
                  </h3>
                </div>
                <a 
                  href="https://www.instagram.com/p/Db8WOOJsV-5/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--gold)] hover:underline border border-[var(--gold)]/30 hover:border-[var(--gold)] px-3 py-1.5 rounded transition-all w-fit"
                >
                  Watch on Instagram ↗
                </a>
              </div>

              <VideoSpotlight
                src="/assets/spotlight/fenil_spotlight.mp4"
                poster="/assets/spotlight/fenil_spotlight_poster.jpg"
                label="legend_editx × fenil_s"
                caption="Autonomous Lunar Rover — NASA HERC"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
              />
              <p className="text-[11px] text-center text-[var(--muted)] mt-3 font-mono">
                Team Mushak × NASA HERC Autonomous Lunar Rover Campaign
              </p>
            </div>

            <div className="about-links fi" style={{ transitionDelay: "0.32s" }}>
              <a href="https://www.youtube.com/@Legend_editx0" target="_blank" rel="noopener noreferrer" className="ext-link">
                Legend Edits — YouTube ↗ <span className="platform">9K Subs · 44M+ Views</span>
              </a>
              <a href="https://teammushak.in" target="_blank" rel="noopener noreferrer" className="ext-link">
                Team Mushak ↗ <span className="platform">Official Site</span>
              </a>
              <a href="https://www.instagram.com/teammushak" target="_blank" rel="noopener noreferrer" className="ext-link">
                Team Mushak Instagram ↗ <span className="platform">Multiple Million+ Reels</span>
              </a>
            </div>
          </div>
          <div>
            <span className="sec-tag fi" style={{ transitionDelay: "0.1s" }}>
              // gear i own &amp; operate
            </span>
            <div className="gear-grid fi" style={{ transitionDelay: "0.2s" }}>
              <div className="gear-item">
                <div className="gear-icon">Camera</div>
                <div className="gear-name">Sony A6700</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">Lens</div>
                <div className="gear-name">TTArtisan f/1.8</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">Light</div>
                <div className="gear-name">Simpex 200W</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">Support</div>
                <div className="gear-name">Tripod</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">On-Set</div>
                <div className="gear-name">Gimbal Operator</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">Hobby</div>
                <div className="gear-name">Rubik's Cubes</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">Fuel</div>
                <div className="gear-name">Monster Energy</div>
              </div>
              <div className="gear-item">
                <div className="gear-icon">Fuel</div>
                <div className="gear-name">Diet Coke</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" data-label="003"></div>

      {/* Social Strip */}
      <section className="sec" style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
        <span className="sec-tag fi">// reach — across platforms</span>
        <div className="social-strip fi" style={{ transitionDelay: "0.1s" }}>
          <div className="social-cell">
            <span className="sc-platform">YouTube</span>
            <div className="sc-num">9K</div>
            <span className="sc-label">Subscribers</span>
          </div>
          <div className="social-cell">
            <span className="sc-platform">YouTube</span>
            <div className="sc-num">44M+</div>
            <span className="sc-label">Solo Views</span>
          </div>
          <div className="social-cell">
            <span className="sc-platform">Instagram</span>
            <div className="sc-num">3.05K</div>
            <span className="sc-label">Followers</span>
          </div>
          <div className="social-cell">
            <span className="sc-platform">Facebook</span>
            <div className="sc-num">1.5K</div>
            <span className="sc-label">Followers</span>
          </div>
          <div className="social-cell">
            <span className="sc-platform">Threads</span>
            <div className="sc-num">626</div>
            <span className="sc-label">Followers</span>
          </div>
        </div>

        {/* ANALYTICS PROOFS TOGGLE */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:bg-zinc-800 transition-colors rounded text-[var(--muted)] hover:text-[var(--off-white)]"
          >
            {showAnalytics ? "Hide Analytics Proofs" : "Show Analytics Proofs"}
          </button>
        </div>
        
        {showAnalytics && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8 max-w-5xl mx-auto">
            <div className="relative overflow-hidden border border-[var(--dim)] rounded group">
              <img src="/assets/analytics/media__1781930910163.jpg" alt="Analytics Proof 1" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="relative overflow-hidden border border-[var(--dim)] rounded group">
              <img src="/assets/analytics/media__1781930910165.jpg" alt="Analytics Proof 2" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="relative overflow-hidden border border-[var(--dim)] rounded group">
              <img src="/assets/analytics/media__1781930910169.jpg" alt="Analytics Proof 3" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="relative overflow-hidden border border-[var(--dim)] rounded group">
              <img src="/assets/analytics/media__1781930910172.jpg" alt="Analytics Proof 4" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="relative overflow-hidden border border-[var(--dim)] rounded group">
              <img src="/assets/analytics/media__1781930910194.jpg" alt="Analytics Proof 5" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>
        )}
      </section>

      <div className="divider" data-label="004"></div>

      {/* Grind / Timeline Section */}
      <section id="grind" className="sec">
        <span className="sec-tag fi">// 002 — the grind</span>
        <h2 className="sec-title fi">
          How I Got
          <br />
          Here
        </h2>

        <div className="timeline">
          <div className="tl-progress" aria-hidden="true" />
          {/* Chapter 08 — m33: Deeptech Builders */}
          <div className="tl-item">
            <div className="tl-dot" style={{ backgroundColor: "var(--gold)", borderColor: "var(--gold)" }}></div>
            <div className="tl-logo">
              <img src="/assets/logos/m33_logo.jpg" alt="m33" />
              <span className="tl-logo-label">m33</span>
            </div>
            <div className="tl-year text-[var(--gold)] font-bold">Chapter 08 — Active · Creative Director</div>
            <div className="tl-title">m33</div>
            
            <div className="tl-body text-[var(--off-white)] font-medium mt-2">
              A community for the world's most ambitious deeptech builders.
            </div>

            <div className="mt-4 pt-1">
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Currently acting as <strong className="text-[var(--gold)]">Creative Director</strong> for <a href="https://www.m33hq.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] underline hover:opacity-80">m33</a>. Building and directing the creative identity, media narratives, and visual storytelling for founders, engineers, and researchers tackling hard problems across robotics, aerospace, defense, AI, energy, semiconductors, and the <strong className="text-[var(--off-white)]">PointSeven</strong> hardware residency.
              </p>
            </div>

            <div className="tl-badges mt-4">
              <span className="badge gold">Creative Director</span>
              <span className="badge">Deeptech Builders</span>
              <a href="https://www.m33hq.com/" target="_blank" rel="noopener noreferrer" className="badge hover:border-[var(--gold)] transition-colors">
                m33hq.com ↗
              </a>
              <span className="badge">PointSeven Residency</span>
              <span className="badge">Robotics · Aerospace · Defense</span>
            </div>
          </div>

          {/* Chapter 07 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <img src="/assets/logos/atlas_logo_official.png" alt="Atlas Skilltech University" />
              <span className="tl-logo-label">Atlas Skilltech University</span>
            </div>
            <div className="tl-year">Chapter 07 — Present</div>
            <div className="tl-title">Social Media Intern &amp; Photographer</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Currently documenting Atlas Skilltech University and learning professional gimbal operation on live shoots.
            </div>

            <div className="mt-4 max-w-sm">
              <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
                <img src="/assets/grind/atlas-intern/mtw_crew.jpg" alt="Mirror Gimbal Selfie" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                <div className="absolute bottom-2 left-2 text-[10px] bg-[var(--black)]/75 px-2 py-0.5 rounded text-gray-400">Part of Crew of MTW</div>
              </div>
            </div>

            <button onClick={() => toggleChapter(7)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[7] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[7] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  Currently shooting, creating, and managing content at <strong>Atlas Skilltech University</strong>. Documenting the institution — events, people, moments. Also part of the crew for MTW — learning gimbal operation on real shoots. Still building. Still posting. Still figuring out what comes next. The grind doesn't have an endpoint, it just changes shape.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">Current</span>
                  <span className="badge">Photography</span>
                  <span className="badge">Social Media</span>
                  <span className="badge">Atlas Skilltech</span>
                  <span className="badge">Gimbal — MTW Crew</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-2xl items-start">
                  <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
                    <img src="/assets/grind/atlas-intern/sony_camera_user.jpg" alt="Sony A6700 B&W" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                    <div className="absolute bottom-2 left-2 text-[10px] bg-[var(--black)]/75 px-2 py-0.5 rounded text-gray-400">Sony A6700 B&W 105mm</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 06 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <img src="/assets/logos/team_mushak_logo_new.jpg" alt="Team Mushak" />
              <span className="tl-logo-label">Team Mushak</span>
            </div>
            <div className="tl-year">Chapter 06 — Team Mushak &amp; NASA HERC</div>
            <div className="tl-title">Social Media Manager</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Led the social media campaign for our autonomous lunar rover, driving 14M+ views and winning the international NASA HERC Social Media Award.
            </div>

            <div className="mt-4 max-w-sm">
              <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
                <img src="/assets/grind/mushak/nasa_award_photo.jpg" alt="NASA HERC Trophy close-up" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-300" />
              </div>
            </div>

            {/* Main Highlight Reel for Mushak */}
            <div className="mt-5 mb-3 p-4 rounded-lg border border-[var(--gold)]/50 bg-[var(--surface)] max-w-md">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--gold)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse inline-block"></span>
                  Main Highlight Reel // NASA HERC Campaign
                </span>
                <a 
                  href="https://www.instagram.com/p/Db8WOOJsV-5/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[var(--gold)] hover:underline border border-[var(--gold)]/30 hover:border-[var(--gold)] px-2.5 py-1 rounded transition-colors w-fit whitespace-nowrap"
                >
                  Instagram ↗
                </a>
              </div>
              <VideoSpotlight
                src="/assets/spotlight/fenil_spotlight.mp4"
                poster="/assets/spotlight/fenil_spotlight_poster.jpg"
                label="Team Mushak · Highlight"
                caption="The reel behind 14M+ views"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
              />
            </div>

            <button onClick={() => toggleChapter(6)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[6] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[6] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  Joined Team Mushak in <strong>Aug/Sep 2025</strong> as a coordinator, then became <strong>Social Media Manager</strong>. Drove <strong>14 million+ views</strong> across platforms with multiple million+ Instagram reels. The team competed in NASA's Human Exploration Rover Challenge (HERC), an international engineering competition. I built the content campaign around our journey, winning the prestigious <strong>Social Media Award at NASA HERC 2026</strong>.
                  <br /><br />
                  Though backed by an incredible team, this role demanded wearing nearly every hat—acting as a videographer, photographer, video editor, scriptwriter, and podcast producer. From handling public relations and cracking deals to managing back-to-back meetings, the role was relentlessly fast-paced. The constant spontaneity and last-minute changes taught me the true meaning of adaptability. It forged my ability to think critically on my feet, manage absolute chaos, and consistently deliver the best possible outcome under extreme time limits.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">NASA HERC Award — International</span>
                  <span className="badge gold">14M+ Views</span>
                  <span className="badge gold">Multiple 1M+ Reels Achieved</span>
                  <span className="badge">Social Media Manager</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-2xl">
                  <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "16/9", background: "#000" }}>
                    <iframe className="w-full h-full border-none" src="https://www.youtube.com/embed/1uXjX8qE2gM" title="Team Mushak Podcast 1" allowFullScreen></iframe>
                  </div>
                  <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "16/9", background: "#000" }}>
                    <iframe className="w-full h-full border-none" src="https://www.youtube.com/embed/-V-z2ROY2a4" title="Team Mushak Podcast 2" allowFullScreen></iframe>
                  </div>
                </div>
                <div className="mt-8 mb-4 border border-[var(--dim)] rounded p-6 bg-[var(--black)]/40">
                  <div className="text-xl font-bold text-[var(--gold)] mb-2">NASA HERC Social Media Award</div>
                  <p className="text-[var(--off-white)] opacity-90 text-sm leading-relaxed mb-4">
                    NASA's Human Exploration Rover Challenge is an <strong>international engineering competition</strong>. While the engineering team worked relentlessly on designing our autonomous lunar rover for sample collection, I directed the team's public-facing campaign. Result: we won the <strong>Social Media Award from NASA</strong>. As the Social Media Manager, I ran the campaign that drove <strong>14 million+ views</strong> across platforms, proving that storytelling is just as vital as the engineering behind the journey.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="relative group overflow-hidden border border-[#c8973a] transition-all duration-300 rounded max-w-sm">
                      <img src="/assets/grind/mushak/rover.jpg" alt="NASA HERC Rover Prototype" className="w-full h-auto block rounded grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 05 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <img src="/assets/logos/legend_editx_logo.png" alt="Legend Edits" />
              <span className="tl-logo-label">Legend Edits</span>
            </div>
            <div className="tl-year">Chapter 05 — The Rebuild</div>
            <div className="tl-title">Monetised Sep 2025.</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Rebuilt Legend Edits from zero to 9K subscribers and 44M+ views, achieving YouTube monetization and mastering content consistency.
            </div>

            <div className="mt-4 max-w-xl">
              <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "16/9", background: "#000", cursor: "default" }}>
                <iframe
                  className="w-full h-full border-none"
                  src="https://www.youtube.com/embed/PiHlFYhsetU"
                  title="First Cinematic Video - The Making of Idea"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>

            <button onClick={() => toggleChapter(5)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[5] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[5] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  Started over. Zero subscribers, zero views, zero sympathy. Rebuilt <strong>Legend Edits</strong> from scratch with everything I'd built, lost, and learned. Hit <strong>YouTube monetisation in September 2025</strong>. Currently at <strong>9K subscribers and 44 million+ views</strong>. The first channel taught me how to grow. The second one taught me how to build something that lasts. It taught me the importance of consistency, pattern recognition, and how if you make something similar for a long time, it ends up being your identity — like a brand. In the long term, viewers recognize your content from frame one.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">44M+ Views</span>
                  <span className="badge gold">Monetised — Sep 2025</span>
                  <span className="badge">9K Subs</span>
                  <span className="badge">Legend Edits</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 max-w-4xl">
                  <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "9/16", background: "#000" }}>
                    <iframe className="w-full h-full border-none" src="https://www.youtube.com/embed/h8uD77QQ6CM" title="Puppetry and Keyframe Animation" allowFullScreen></iframe>
                  </div>
                  <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "9/16", background: "#000" }}>
                    <iframe className="w-full h-full border-none" src="https://www.youtube.com/embed/T4BxCXYxg3M" title="Favorite Edit" allowFullScreen></iframe>
                  </div>
                  <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "9/16", background: "#000" }}>
                    <iframe className="w-full h-full border-none" src="https://www.youtube.com/embed/c4myn3h5nWE" title="Favorite Edit 2" allowFullScreen></iframe>
                  </div>
                  <div className="video-card w-full rounded overflow-hidden" style={{ aspectRatio: "9/16", background: "#000" }}>
                    <iframe className="w-full h-full border-none" src="https://www.youtube.com/embed/99rnIK6wZA0" title="Unboxing Video" allowFullScreen></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 04 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <img src="/assets/logos/rc_atlas_logo_official.jpg" alt="RC Atlas" />
              <span className="tl-logo-label">RC Atlas</span>
            </div>
            <div className="tl-year">Chapter 04 — RC Atlas &amp; The Camera</div>
            <div className="tl-title">Support Function Coordinator</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Transitioned to hands-on camera operation and lighting, shooting and editing professional podcasts, aftermovies, and event highlight reels.
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl" style={{ marginTop: "1.25rem" }}>
              <InstaReelThumb href="https://www.instagram.com/p/C_r0abzN2f6/" thumb="/assets/reels/reel_C_r0abzN2f6.jpg" label="MUNzil" title="Dress Code" />
              <InstaReelThumb href="https://www.instagram.com/p/DAH-oFcRI01/" thumb="/assets/reels/reel_DAH-oFcRI01.jpg" label="MUNzil" title="1 Day to Go" />
              <InstaReelThumb href="https://www.instagram.com/p/DH_LoF6tDMr/" thumb="/assets/reels/reel_DH_LoF6tDMr.jpg" label="Saathi" title="2 Days to Go" />
              <InstaReelThumb href="https://www.instagram.com/p/DA-9zbQNT_c/" thumb="/assets/reels/reel_DA-9zbQNT_c.jpg" label="GV × RC Atlas" title="GV Intro — Country Reveal" />
              <InstaReelThumb href="https://www.instagram.com/p/DBbUWi5t3KY/" thumb="/assets/reels/reel_DBbUWi5t3KY.jpg" label="RC Atlas" title="Navrangi Navratri '24" />
            </div>

            <button onClick={() => toggleChapter(4)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[4] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[4] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  After losing the channel, joined <strong>RC Atlas</strong> as Support Function Coordinator. Competed in district-level events. This is where I first got properly introduced to <strong>camera operating and lighting</strong> — not theory, hands-on. Edited podcasts, aftermovies, highlight reels, announcement reels, motion graphics reels. Volunteered as Promotions Coordinator for <strong>MUNzil</strong> and <strong>Saathi</strong>. Shot and edited the <strong>Aawaz Podcast</strong>.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">Camera Operating</span>
                  <span className="badge gold">Lighting</span>
                  <span className="badge">RC Atlas</span>
                  <span className="badge">Podcasts</span>
                  <span className="badge">MUNzil · Saathi</span>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 03 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <img src="/assets/logos/legend_editx_logo_old.jpg" alt="Legend Editx (original channel)" />
              <span className="tl-logo-label">Original Channel</span>
            </div>
            <div className="tl-year">Chapter 03 — The Climb</div>
            <div className="tl-title">0 → 35,000 Subscribers</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Started experimenting on mobile editors before grinding on a low-spec laptop to hit my first millions of views, growing to 35K subscribers before getting hacked.
            </div>

            <button onClick={() => toggleChapter(3)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[3] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[3] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  Going solo paid off. Took everything learned from Discord and DFE, brought it back to my own channel, and applied it. <strong>Grew to 35,000 subscribers</strong>. Not luck — pattern recognition, iteration, and an obsessive amount of time in the edit suite. I shifted to CapCut PC, where I hit my first million-view YouTube edit, and heavily taught myself Adobe After Effects during that same period.
                  <br /><br />
                  The early technical journey to get here was relentless. I started editing on KineMaster using my mom's phone, then upgraded to a 2GB RAM tablet, and eventually my personal phone. I cycled through every mobile editor imaginable—InShot, CapCut, Alight Motion, Node Video, PowerDirector, Filmora—before finally drawing the line at a CapCut + Alight Motion workflow. That exact mobile workflow landed my very first million-view reel on Instagram.
                  <br /><br />
                  Then in <strong>September 2024</strong>, the channel got hacked. But the story didn't end there: my few 10/10 movie videos completely blew up to tens of millions of views, pushing the stolen channel to <strong>92,000 subscribers</strong>. I personally messaged every editor and channel I knew to get it mass-reported and banned. Today, the hacked channel sits completely dead at 92K, getting zero views.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">35K Subs</span>
                  <span className="badge">Hacked — Sep 2024</span>
                  <span className="badge">Content Strategy</span>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 02 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <img src="/assets/logos/dfe_logo_official.jpg" alt="DFE Productions" />
              <span className="tl-logo-label">DFE Productions</span>
            </div>
            <div className="tl-year">Chapter 02 — Going Pro (Early)</div>
            <div className="tl-title">DFE Productions</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Joined DFE Productions and other editing teams, learning the core fundamentals of viewer retention, editing for pacing, and content strategy.
            </div>

            <button onClick={() => toggleChapter(2)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[2] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[2] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  After getting my first laptop (an ASUS Vivobook S14x with 12GB RAM and no dedicated graphics card), I started editing for <strong><a href="https://www.youtube.com/@DFE-Productions" target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)" }}>DFE Productions ↗</a></strong> and other teams. This was school. Not the kind with classrooms — the kind where you watch what gets views and what doesn't, what retains and what drops off, what editors do that makes a cut land. Absorbed everything. But after a while, I realized I could earn more money going solo, so I made the shift.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">DFE Productions</span>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 01 */}
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-logo">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-[#c8973a] flex items-center justify-center text-[10px] font-bold text-[var(--gold)] tracking-widest">GI</div>
              <span className="tl-logo-label">Galactic Imperative</span>
            </div>
            <div className="tl-year">Chapter 01 — The Spark</div>
            <div className="tl-title">Galactic Imperative</div>
            
            <div className="tl-body text-[var(--gold)] font-medium mt-2">
              Shot and edited Rubik's cube tutorials on my mom's phone, landing my first viral spike and igniting my passion for content creation.
            </div>

            <button onClick={() => toggleChapter(1)} className="mt-6 text-xs uppercase tracking-widest border border-zinc-700 px-6 py-3 hover:border-[var(--gold)] hover:bg-zinc-800/50 transition-colors rounded text-[var(--off-white)] flex items-center justify-center gap-2 w-full sm:w-auto">
              {expandedChapters[1] ? "— Show Less" : "+ Read More"}
            </button>

            {expandedChapters[1] && (
              <div className="mt-4 pt-4 border-t border-[var(--dim)]/50">
                <div className="tl-body">
                  It all started on a forgotten channel named <strong>Galactic Imperative</strong>. I shot and edited "how to solve 3x3 and 2x2 Rubik's cube" tutorials entirely on my mom's phone. Six months after uploading, they randomly spiked to 1.7K and 900 views around a movie release. That was the initial spark, pushing the channel to <strong>1,000 YouTube subscribers</strong>. When I eventually got my 2GB RAM tablet, I took that grind straight to Instagram. It was during this run that I got introduced to DFE and many other editors on Discord.
                </div>
                <div className="tl-badges">
                  <span className="badge gold">1K Subs</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

      <div className="divider" data-label="///"></div>

      {/* Freelance Section */}
      <section id="freelance" className="sec">
        <span className="sec-tag fi">// the side grind</span>
        <h2 className="sec-title fi">
          Freelance<br />Work
        </h2>
        
        <div className="mt-8 border border-[var(--gold)]/30 bg-[#c8973a]/5 p-6 rounded relative overflow-hidden group fi" style={{ transitionDelay: "0.1s" }}>
           <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.08]">
              <span className="text-8xl font-black italic">FREELANCE</span>
           </div>
           <div className="flex items-center gap-3 mb-3 relative z-10">
             <div className="w-2 h-2 rounded-full bg-[#c8973a] animate-pulse"></div>
             <h3 className="text-xl font-bold text-[var(--off-white)] tracking-wide uppercase text-sm">Versatility & Breadth</h3>
           </div>
           <p className="text-[var(--gold)] text-sm leading-relaxed relative z-10 max-w-3xl font-medium mb-4">
             Alongside all the structured chapters in the timeline above, I've consistently taken on widespread freelance video editing projects—sourcing clients through college connections, Discord communities, Fiverr, and Instagram.
           </p>
           <p className="text-[var(--off-white)] opacity-90 text-sm leading-relaxed relative z-10 max-w-3xl">
             My freelance portfolio spans across entirely different genres, meaning I am highly adaptable. I have edited everything from:
           </p>
           <ul className="list-disc list-inside text-[var(--off-white)] opacity-90 text-sm mt-3 relative z-10 space-y-2 marker:text-[var(--gold)]">
             <li>Long-form, engaging podcasts</li>
             <li>Cinematic, emotional wedding videos</li>
             <li>Fast-paced, high-retention commentary videos</li>
             <li>Highly engaging movie storytelling formats</li>
           </ul>
        </div>

        {/* Notable freelance clients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="spotlight border border-[var(--dim)] hover:border-[var(--gold)]/60 bg-[var(--surface)] p-6 rounded transition-colors fi" style={{ transitionDelay: "0.15s" }}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--gold)] mb-2">// Podcast Editor</div>
            <h3 className="font-sans text-2xl tracking-wide text-[var(--off-white)] mb-3">Gamechangers of India</h3>
            <p className="text-[var(--off-white)] opacity-90 text-sm leading-relaxed">
              Edited full-length professional podcast episodes featuring guests like <strong className="text-[var(--gold)]">Shaan</strong>, <strong className="text-[var(--gold)]">Sonu Nigam</strong>, <strong className="text-[var(--gold)]">Cheteshwar Pujara</strong> and more.
            </p>
            <div className="tl-badges mt-4">
              <span className="badge gold">Podcasts</span>
              <a href="https://www.youtube.com/@Gamechangersofindia" target="_blank" rel="noopener noreferrer" className="badge hover:border-[var(--gold)] transition-colors">
                YouTube ↗
              </a>
            </div>
          </div>

          <div className="spotlight border border-[var(--dim)] hover:border-[var(--gold)]/60 bg-[var(--surface)] p-6 rounded transition-colors fi" style={{ transitionDelay: "0.2s" }}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--gold)] mb-2">// Launch Videos</div>
            <h3 className="font-sans text-2xl tracking-wide text-[var(--off-white)] mb-3">Deeptech Startups</h3>
            <p className="text-[var(--off-white)] opacity-90 text-sm leading-relaxed">
              Edited for multiple deeptech startups — launch videos, product announcements, and the content that introduces their work to the world.
            </p>
            <div className="tl-badges mt-4">
              <span className="badge gold">Launch Videos</span>
              <span className="badge">Product Content</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" data-label="///"></div>

      {/* Projects Section */}
      <section id="projects" className="sec">
        <span className="sec-tag fi">// builds — hardware &amp; software</span>
        <h2 className="sec-title fi">
          Things I<br />Build
        </h2>

        {/* Spacing is inline: the unlayered margin/padding reset in globals.css overrides Tailwind spacing utilities */}
        {/* Featured: Autonomous Robotic Cinematographer */}
        <div className="spotlight relative border border-[var(--gold)]/50 bg-[var(--surface)] rounded-md max-w-5xl overflow-hidden fi" style={{ marginTop: "2rem", padding: "1.75rem", transitionDelay: "0.05s" }}>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_85%_0%,rgba(200,151,58,0.12),transparent_55%)]" />

          <div className="relative flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-widest uppercase">
            <span className="text-[var(--gold)]">// Robotics × Cinema — BTech Year 3</span>
            <span className="flex items-center gap-1.5 text-[var(--off-white)]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
              In Development
            </span>
          </div>

          <h3 className="relative font-sans text-4xl sm:text-5xl tracking-wide text-[var(--off-white)] leading-none" style={{ marginTop: "0.9rem" }}>
            Autonomous Robotic Cinematographer
          </h3>
          <p className="relative font-serif italic text-lg text-[var(--gold)]" style={{ marginTop: "0.4rem" }}>
            An AI second camera operator, on wheels.
          </p>

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ marginTop: "1.25rem" }}>
            <div className="lg:col-span-3">
              <p className="text-sm text-[var(--off-white)]/90 leading-relaxed">
                Where my two worlds meet — years behind the camera as a shooter and on-set gimbal operator, and a front-row seat to rover engineering with Team Mushak at NASA HERC. This is an autonomous ground dolly that carries my <strong className="text-[var(--gold)]">Sony a6700</strong> rig, finds and follows a subject on its own, and keeps the shot framed and stable — the job a second camera operator does on set.
              </p>

              <ul className="text-sm text-[var(--muted)] leading-relaxed space-y-2" style={{ marginTop: "1rem" }}>
                <li className="flex gap-3">
                  <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>01</span>
                  <span><strong className="text-[var(--off-white)]">Active subject tracking</strong> — quantized YOLOv8n detection with Rule-of-Thirds framing control, keeping the subject at a 2 m standoff.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>02</span>
                  <span><strong className="text-[var(--off-white)]">2-axis stabilized gimbal</strong> — MPU6050 IMU + Madgwick filter at 100 Hz holding the horizon through pitch and roll.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>03</span>
                  <span><strong className="text-[var(--off-white)]">Ackermann steering + rear torque vectoring</strong> — an electronic differential for tight, scrub-free turns and smooth parallax moves.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>04</span>
                  <span><strong className="text-[var(--off-white)]">Director&apos;s web app</strong> — live MJPEG feed and four shooting modes: Active Follow, Parallax Orbit, Dolly In/Out, and Manual joystick. ToF-based emergency braking under 25 cm.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-3">
              <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">Design targets</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["< 50 ms", "Tracking latency"],
                  ["< 5%", "Framing deviation"],
                  ["< 0.1°", "Gimbal jitter"],
                  ["< 30 cm", "Stop from 1.5 m/s"],
                ].map(([value, label]) => (
                  <div key={label} className="border border-[var(--dim)] rounded" style={{ padding: "0.7rem 0.8rem" }}>
                    <div className="font-sans text-2xl text-[var(--off-white)] leading-none">{value}</div>
                    <div className="font-mono text-[9px] tracking-widest uppercase text-[var(--muted)]" style={{ marginTop: "0.35rem" }}>{label}</div>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] leading-relaxed" style={{ marginTop: "0.25rem" }}>
                1.12 kg camera payload · 160 mm track · 260 mm wheelbase · 3S LiPo
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-2" style={{ marginTop: "1.5rem" }}>
            {[
              ["Review 1", "Steering, torque vectoring, teleop"],
              ["Review 2", "IMU + gimbal stabilization"],
              ["Review 3", "YOLOv8n tracking + AEB"],
              ["Testing", "Latency, framing, braking, jitter"],
              ["Final Demo", "Outdoor follow-me sequence"],
            ].map(([stage, desc], i) => (
              <div key={stage} className="border-t-2 border-[var(--dim)]" style={{ paddingTop: "0.6rem" }}>
                <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--gold)]">{String(i + 1).padStart(2, "0")} · {stage}</div>
                <div className="text-[12px] text-[var(--muted)] leading-snug" style={{ marginTop: "0.25rem" }}>{desc}</div>
              </div>
            ))}
          </div>

          <div className="relative tl-badges" style={{ marginTop: "1.5rem" }}>
            <span className="badge gold">YOLOv8n</span>
            <span className="badge">Madgwick Filter</span>
            <span className="badge">PID Control</span>
            <span className="badge">Ackermann Steering</span>
            <span className="badge">Torque Vectoring</span>
            <span className="badge">Arduino UNO Q</span>
            <span className="badge">Sony a6700</span>
            <span className="badge">Self Driving Cars — CIA 1 &amp; 2</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl" style={{ marginTop: "1rem" }}>
          {/* Editing Console */}
          <div className="spotlight group relative flex flex-col border border-[var(--dim)] hover:border-[var(--gold)]/60 bg-[var(--surface)] rounded-md transition-colors duration-300 fi" style={{ padding: "1.5rem", transitionDelay: "0.1s" }}>
            <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
              <span className="text-[var(--gold)]">// Hardware</span>
              <span className="flex items-center gap-1.5 text-[var(--off-white)]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] animate-pulse" />
                In Progress
              </span>
            </div>
            <h3 className="font-sans text-3xl tracking-wide text-[var(--off-white)]" style={{ marginTop: "0.75rem" }}>Custom Editing Console</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed" style={{ marginTop: "0.5rem" }}>
              A compact wireless macro console for DaVinci Resolve, After Effects and system shortcuts — designed and built from scratch in a &ldquo;tech-noir&rdquo; wedge enclosure, for a fraction of what commercial editing consoles cost.
            </p>

            <ul className="text-sm text-[var(--off-white)]/90 leading-relaxed space-y-2" style={{ marginTop: "1.25rem" }}>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>01</span>
                <span><strong className="text-[var(--off-white)]">Jog dial for scrubbing</strong> — ALPS EC11 encoder under a 40 mm aluminium knob, with acceleration curves for timeline scrubbing.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>02</span>
                <span><strong className="text-[var(--off-white)]">9 mechanical macro keys</strong> — 3×3 matrix with per-key diodes for anti-ghosting.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>03</span>
                <span><strong className="text-[var(--off-white)]">3.12&Prime; OLED + haptics</strong> — 256×64 display for layers, active tool and battery; a linear-resonant motor for tactile feedback.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>04</span>
                <span><strong className="text-[var(--off-white)]">Wireless</strong> — Bluetooth LE or USB HID, a 2000 mAh+ LiPo with pass-through charging, and deep sleep after 10 idle minutes.</span>
              </li>
            </ul>

            {/* Cost comparison */}
            <div className="font-mono text-[10px] tracking-widest uppercase" style={{ marginTop: "1.5rem" }}>
              <div className="flex items-center justify-between text-[var(--gold)]">
                <span>My build</span><span>Under ₹8K</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--dim)] overflow-hidden" style={{ marginTop: "0.4rem" }}>
                <div className="h-full bg-[var(--gold)] rounded-full" style={{ width: "17%" }} />
              </div>
              <div className="flex items-center justify-between text-[var(--muted)]" style={{ marginTop: "0.9rem" }}>
                <span>Commercial consoles</span><span>₹40–50K</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--dim)] overflow-hidden" style={{ marginTop: "0.4rem" }}>
                <div className="h-full bg-[var(--muted)] rounded-full" style={{ width: "100%" }} />
              </div>
            </div>

            <div className="tl-badges" style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
              <span className="badge gold">~5× cheaper</span>
              <span className="badge">ESP32-S3</span>
              <span className="badge">BLE HID</span>
              <span className="badge">C++ / PlatformIO</span>
            </div>
          </div>

          {/* Music Player */}
          <div className="spotlight group relative flex flex-col border border-[var(--dim)] hover:border-[var(--gold)]/60 bg-[var(--surface)] rounded-md transition-colors duration-300 fi" style={{ padding: "1.5rem", transitionDelay: "0.2s" }}>
            <div className="flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
              <span className="text-[var(--gold)]">// Software</span>
              <span className="flex items-center gap-1.5 text-[var(--off-white)]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                Built
              </span>
            </div>
            <h3 className="font-sans text-3xl tracking-wide text-[var(--off-white)]" style={{ marginTop: "0.75rem" }}>WayneTech Audio</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed" style={{ marginTop: "0.5rem" }}>
              A desktop music player built because YT Music and Spotify weren&apos;t good enough — lossless playback, and sound that tunes itself to whatever you&apos;re listening on.
            </p>

            <ul className="text-sm text-[var(--off-white)]/90 leading-relaxed space-y-2" style={{ marginTop: "1.25rem" }}>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>01</span>
                <span><strong className="text-[var(--off-white)]">FLAC &amp; WAV support</strong> — full lossless audio from your local library, no streaming compression.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>02</span>
                <span><strong className="text-[var(--off-white)]">Bluetooth device recognition</strong> — detects which headphones or speaker just connected.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>03</span>
                <span><strong className="text-[var(--off-white)]">Auto EQ per device</strong> — loads a 10-band parametric EQ profile tuned to that device&apos;s frequency response.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--gold)] font-mono text-xs" style={{ paddingTop: 2 }}>04</span>
                <span><strong className="text-[var(--off-white)]">3D visualizer, ambient mixer &amp; listening analytics</strong> — plus six themes, including one that colours itself from the album art.</span>
              </li>
            </ul>

            <div className="tl-badges" style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
              <span className="badge gold">Electron</span>
              <span className="badge">Web Audio API</span>
              <span className="badge">Three.js</span>
              <a href="https://github.com/fenilnig/mp3-player" target="_blank" rel="noopener noreferrer" className="badge hover:border-[var(--gold)] transition-colors">
                Source ↗
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl" style={{ marginTop: "1rem" }}>
          <ProjectCard
            tag="// AI Audio · Desktop"
            title="Legend's Labs"
            description="“The DaVinci Resolve of AI audio” — a Windows app for voice cloning, expressive TTS, stem separation, noise reduction, transcription and emotion detection, all running locally on the GPU."
            tech={["Python", "PySide6", "PyTorch", "Whisper"]}
            href="https://github.com/fenilnig/legends-labs"
          />
          <ProjectCard
            tag="// Creator Tool · Web"
            title="Content Gap Analyzer"
            description="Pulls every upload from my YouTube channel and every reel from Instagram, then shows exactly which videos never got cross-posted. Video-hash and audio-fingerprint matching in progress."
            tech={["FastAPI", "Next.js", "YouTube & IG APIs"]}
            href="https://github.com/fenilnig/content-gap-analyzer"
          />
          <ProjectCard
            tag="// Automation · CLI"
            title="Insta Chat Downloader"
            description="Bulk-downloads every reel, post and story shared in an Instagram DM thread — parallel downloads, saved sessions, and history so re-runs only fetch what's new."
            tech={["Python", "instagrapi", "PyInstaller"]}
            href="https://github.com/fenilnig/insta-chat-downloader"
          />
        </div>

        <a
          href="https://github.com/fenilnig"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border border-[var(--dim)] hover:border-[var(--gold)] rounded-md transition-colors duration-300 fi"
          style={{ marginTop: "1.5rem", padding: "0.75rem 1.1rem", transitionDelay: "0.3s" }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--off-white)] group-hover:fill-[var(--gold)] transition-colors" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          <span className="font-mono text-xs tracking-widest uppercase text-[var(--off-white)] group-hover:text-[var(--gold)] transition-colors">
            More on GitHub — fenilnig ↗
          </span>
        </a>
      </section>

      <div className="divider" data-label="///"></div>

      {/* Skills / Arsenal Section */}
      <section id="skills" className="sec text-left w-full flex flex-col items-start" style={{ textAlign: "left" }}>
        <span className="sec-tag fi text-left w-full">// 003 - arsenal</span>
        <h2 className="sec-title fi text-left w-full" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          Skills
        </h2>
        <p className="fi text-left w-full" style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: "3rem", letterSpacing: "0.1em", textAlign: "left" }}>
          CLICK A CATEGORY TO EXPAND
        </p>

        {/* Category-based skill groups */}
        <div className="w-full text-left flex flex-col items-start" style={{ textAlign: "left" }}>
        {[
          {
            category: "Editing & Post",
            tools: [
              { name: "Professional Video Editing", local: "/assets/logos/premiere_pro_logo.png" },
              { name: "Motion Graphics & VFX", local: "/assets/logos/aftereffects_logo.png" },
              { name: "Color Grading & Resolve", local: "/assets/logos/davinci_logo.png" },
              { name: "Fast-Turn Editing (CapCut)", local: "/assets/logos/capcut_logo.svg" },
              { name: "Optimum Export Rendering", local: "/assets/logos/media_encoder_logo.png" },
              { name: "Lossless Video Compression", local: "/assets/logos/handbrake_logo.png" },
              { name: "Podcast & Audio Editing", local: "/assets/logos/audacity_logo.svg" },
              { name: "Pro Audio Mixing", local: "/assets/logos/audition_logo.png" },
            ],
          },
          {
            category: "Design & Visual",
            tools: [
              { name: "Photo Manipulation & Retouching", local: "/assets/logos/photoshop_logo.png" },
              { name: "Vector Design & Branding", local: "/assets/logos/illustrator_logo.png" },
              { name: "Photo Colour Correction", local: "/assets/logos/lightroom_logo.png" },
              { name: "Rapid Visual Content Creation", local: "/assets/logos/canva_logo.png" },
              { name: "UI/UX Prototyping", local: "/assets/logos/figma_logo.png" },
            ],
          },
          {
            category: "3D & Motion",
            tools: [
              { name: "3D Animation & Scene Composition", icon: "blender", color: "E87D0D" },
              { name: "3D Product Design", icon: "autodesk", color: "0696D7" },
              { name: "Technical CAD Drafting", icon: "autodesk", color: "E51050" },
            ],
          },
          {
            category: "Camera & Hardware",
            tools: [
              { name: "Mirrorless Cinema Camera", lucideIcon: Camera },
              { name: "Manual Prime Lens Operation", lucideIcon: Aperture },
              { name: "Versatile Zoom Lens Operation", lucideIcon: Aperture },
              { name: "Remote Shooting & Tethering", lucideIcon: AppWindow },
              { name: "Stabilised Cinematic Movement", lucideIcon: Axis3d },
              { name: "Controlled Static & Long Exposure", lucideIcon: Telescope },
              { name: "Studio Lighting Setup", lucideIcon: Lightbulb },
              { name: "Maono Wired Mic", lucideIcon: Mic2 },
              { name: "Grenaro P10 Wireless", lucideIcon: Mic },
            ],
          },
          {
            category: "Social & Strategy",
            tools: [
              { name: "Platform Growth Strategy", lucideIcon: Target },
              { name: "YouTube Channel Management", icon: "youtube", color: "FF0000" },
              { name: "Social Media Campaigns", lucideIcon: Megaphone },
              { name: "Performance Analytics & Reporting", icon: "googleanalytics", color: "E37400" },
              { name: "Short-Form Video Production", icon: "instagram", color: "E4405F" },
              { name: "Click-Through Optimisation", lucideIcon: ImageIcon },
              { name: "YouTube SEO & Discoverability", lucideIcon: Tag },
              { name: "Audience & Community Growth", lucideIcon: Users },
            ],
          },
          {
            category: "Code & Dev",
            tools: [
              { name: "VS Code — Web Development", local: "/assets/logos/vscode_logo.png" },
              { name: "Python Notebooks & ML", icon: "googlecolab", color: "F9AB00" },
              { name: "Python Scripting & Automation", icon: "python", color: "3776AB" },
              { name: "Frontend Web Development", local: "/assets/logos/html_css_wiki_logo.png" },
              { name: "JSON Scripts for AE", lucideIcon: FileJson },
            ],
          },
          {
            category: "AI & Web",
            tools: [
              { name: "Agentic AI Development", local: "/assets/logos/antigravity_logo.png" },
              { name: "AI-Assisted Workflows", local: "/assets/logos/claude_ai_logo.png" },
              { name: "AI Research & Ideation", icon: "googlegemini", color: "8E75B2" },
              { name: "AI Video Enhancement", local: "/assets/logos/topaz_ai_logo.png" },
              { name: "AI Photo Enhancement", local: "/assets/logos/upscayl_logo.png" },
            ],
          },
        ].map((group, gi) => (
          <details key={gi} className="group w-full text-left" style={{ marginBottom: "2.5rem" }}>
            <summary 
              style={{ fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.8rem", cursor: "pointer", transition: "color 0.3s", listStyle: "none", fontWeight: "bold", textAlign: "left" }}
              className="outline-none text-left w-full inline-block"
            >
              <span className="inline-block transition-transform duration-300 group-open:rotate-90">▸</span> {group.category}
            </summary>
            <div className="skills-grid mt-4">
              {group.tools.map((tool, ti) => (
                <div className="skill-cell" key={ti}>
                  {(tool as any).lucideIcon ? (
                    React.createElement((tool as any).lucideIcon, {
                      size: 28,
                      strokeWidth: 1.5,
                      color: "var(--gold)",
                      style: { margin: "0 auto 0.8rem", display: "block" }
                    })
                  ) : (tool as any).local ? (
                    <img
                      src={(tool as any).local}
                      alt={tool.name}
                      style={{ width: 36, height: 28, margin: "0 auto 0.8rem", objectFit: "contain" }}
                      loading="lazy"
                    />
                  ) : tool.icon ? (
                    <img
                      src={`https://cdn.simpleicons.org/${tool.icon}/${tool.color}`}
                      alt={tool.name}
                      style={{ width: 28, height: 28, margin: "0 auto 0.8rem" }}
                      loading="lazy"
                    />
                  ) : (
                    <span style={{ display: "block", width: 28, height: 28, margin: "0 auto 0.8rem", lineHeight: "28px", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--gold)", border: "1px solid var(--gold)", borderRadius: "4px", textAlign: "center" }}>
                      {(tool as any).abbr}
                    </span>
                  )}
                  <span className="skill-name">{tool.name}</span>
                </div>
              ))}
            </div>
          </details>
        ))}
        </div>
      </section>

      <div className="divider" data-label="///"></div>

      {/* Photography Showcase */}
      <section className="sec text-left w-full flex flex-col items-start" style={{ textAlign: "left" }}>
        <span className="sec-tag text-left w-full">// photography showcase</span>
        <h2 className="sec-title text-left w-full" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          Photography<br />Showcase
        </h2>
        <button 
          onClick={() => setShowPhotography(!showPhotography)}
          className="text-xs uppercase tracking-widest border border-zinc-700 px-4 py-2 hover:bg-zinc-800 transition-colors rounded text-[var(--muted)] hover:text-[var(--off-white)] mb-8 inline-block text-left"
        >
          {showPhotography ? "Hide Photos" : "Show Photos"}
        </button>
        {showPhotography && (
          <div className="columns-2 sm:columns-3 gap-3 max-w-3xl" style={{ marginTop: "2rem" }}>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/user_img_48k.jpg" alt="Building Structure" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/new_img_127k.jpg" alt="On Set Lighting" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/new_img_102k.jpg" alt="Motion Blur Dog" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/v2_img_2.jpg" alt="Varanasi Priest" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/v2_img_5.jpg" alt="Monkey Sunset" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/user_img_51k.jpg" alt="Solar Car Prototype" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/red_lamp.jpg" alt="Red Desk Lamp" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/hallway_arch.jpg" alt="Hallway Arch Silhouette" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/birds_sky.jpg" alt="Birds flying in the Sky" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/photo_bee.jpg" alt="Bee near light" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/photo_metro.jpg" alt="Person waiting at Metro" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/photo_redbull.jpg" alt="Red Bull Can" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/photo_traffic.jpg" alt="Highway Traffic Trails" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/photo_light_trails.jpg" alt="City Light Trails" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="break-inside-avoid mb-3 relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/photography/rover_indoor.jpg" alt="Indoor Rover with Controller" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
        </div>
        )}
      </section>

      <div className="divider" data-label="///"></div>

      {/* Fun Camera Moments */}
      <section className="sec">
        <span className="sec-tag">// fun camera moments</span>
        <h2 className="sec-title">
          Fun Camera<br />Moments
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl" style={{ marginTop: "2rem" }}>
          <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/fun-moments/v2_img_1.jpg" alt="Triangle Inside Wheels" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/fun-moments/user_img_83k.jpg" alt="Fenil Gimbal on Set" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/fun-moments/funny_camera.jpg" alt="Camera with Funny Glasses" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
          <div className="relative group overflow-hidden border border-[var(--dim)] hover:border-[var(--gold)] transition-all duration-300 rounded">
            <img src="/assets/fun-moments/macro_lens.jpg" alt="Macro Lens attached to Camera" className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
          </div>
        </div>
      </section>

      <div className="divider" data-label="///"></div>

      {/* Education Section */}
      <section id="education" className="sec">
        <span className="sec-tag fi">// 004 — education</span>
        <h2 className="sec-title fi">
          Academics
        </h2>
        
        <div className="mt-8 transition-all duration-300 relative overflow-hidden group fi" style={{ transitionDelay: "0.1s" }}>
           <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.08]">
              <span className="text-8xl font-black italic">ATLAS</span>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-6 relative z-10 items-start">
             <div className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center overflow-hidden">
               <img src="/assets/logos/atlas_logo_official.png" alt="Atlas Skilltech University" className="w-full h-full object-contain rounded-full" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-[var(--off-white)] tracking-wide">Atlas Skilltech University</h3>
               <div className="text-[var(--gold)] font-medium text-sm mt-1">B.Tech in Computer Science</div>
               <div className="text-[var(--muted)] text-xs tracking-widest uppercase mt-1 mb-3">Specialisation in AI / ML</div>
               <p className="text-[var(--off-white)] opacity-90 text-sm leading-relaxed max-w-2xl mb-6">
                 Currently in my 3rd year pursuing a rigorous curriculum focused on Artificial Intelligence and Machine Learning. Balancing intense academic requirements while simultaneously operating as the university's official Social Media Intern & Photographer.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mt-4">
                 <div className="relative group overflow-hidden border border-[var(--dim)] transition-all duration-300 rounded aspect-[4/3]">
                   <img src="/assets/education/new_img_243k.jpg" alt="Atlas Skilltech Campus" className="w-full h-full object-cover block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                 </div>
                 <div className="relative group overflow-hidden border border-[var(--dim)] transition-all duration-300 rounded aspect-[4/3]">
                   <img src="/assets/education/award_trophy_photo.jpg" alt="Award Trophy" className="w-full h-full object-cover block grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" />
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      <div className="divider" data-label="fin"></div>

      {/* Contact Section */}
      <section id="contact" className="sec">
        <div className="contact-grid">
          <div>
            <span className="sec-tag fi">// 005 — get in touch</span>
            <div className="contact-big fi" style={{ transitionDelay: "0.1s" }}>
              Let's make
              <br />
              something
              <br />
              <em>worth watching.</em>
            </div>
            <p className="contact-body fi" style={{ transitionDelay: "0.2s" }}>
              Whether it's a shoot, a collab, social media management, editing, or just an interesting conversation — reach out. I don't do half-measures.
            </p>
            <div className="about-links fi" style={{ transitionDelay: "0.3s" }}>
              <a href="https://www.youtube.com/@Legend_editx0" target="_blank" rel="noopener noreferrer" className="ext-link">
                YouTube — Legend Edits ↗
              </a>
              <a href="https://teammushak.in" target="_blank" rel="noopener noreferrer" className="ext-link">
                Team Mushak ↗
              </a>
              <a href="https://www.instagram.com/teammushak" target="_blank" rel="noopener noreferrer" className="ext-link">
                Team Mushak Instagram ↗
              </a>
              <a href="https://www.youtube.com/@DFE-Productions" target="_blank" rel="noopener noreferrer" className="ext-link">
                DFE Productions ↗
              </a>
              <a href="https://github.com/fenilnig" target="_blank" rel="noopener noreferrer" className="ext-link">
                GitHub — fenilnig ↗
              </a>
              <a href="mailto:legendeditx77@gmail.com" className="ext-link">
                legendeditx77@gmail.com ↗
              </a>
            </div>
          </div>
          <div className="fi" style={{ transitionDelay: "0.2s" }}>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Name</label>
                  <input type="text" placeholder="your name" required />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-field">
                <label>Subject</label>
                <input type="text" placeholder="collab / shoot / project" required />
              </div>
              <div className="form-field">
                <label>Message</label>
                <textarea rows={4} placeholder="what's on your mind" required></textarea>
              </div>
              <button type="submit" className="submit-btn">
                {formSent ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer>
        <div className="footer-left">
          © {new Date().getFullYear()} Fenil Shah. All Rights Reserved.
        </div>
        <div className="footer-right">
          <a href="https://www.youtube.com/@Legend_editx0" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.instagram.com/teammushak" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="mailto:legendeditx77@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}