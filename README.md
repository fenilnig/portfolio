# Fenil Shah — Portfolio

Personal portfolio of **Fenil Shah** — creator, filmmaker, editor and builder from Mumbai. 44M+ YouTube views, NASA HERC Social Media Award with Team Mushak, Creative Director at m33.

A single-page site with a camera-viewfinder aesthetic: the grind timeline, photography, freelance work, hardware & software projects, and a built-in music player.

## Stack

- **Next.js 16** (App Router, static export) + **React 19**
- **Tailwind CSS 4**
- **Framer Motion**, **lucide-react**
- Fonts: Bebas Neue, IBM Plex Mono, Cormorant Garamond

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Build the static site (outputs to `out/`):

```bash
npm run build
```

### Music player

The site's background music player expects MP3s in `public/assets/music/` (listed in the `tracks` array in `app/page.tsx`). The songs are commercial tracks, so they're **not included in this repo** — add your own files there to use the player.

## Projects featured

- [WayneTech Audio](https://github.com/fenilnig/mp3-player) — desktop music player with Bluetooth auto-EQ
- [Legend's Labs](https://github.com/fenilnig/legends-labs) — local AI audio studio
- [Content Gap Analyzer](https://github.com/fenilnig/content-gap-analyzer) — YouTube ↔ Instagram cross-post matcher
- [Insta Chat Downloader](https://github.com/fenilnig/insta-chat-downloader) — bulk DM media downloader
