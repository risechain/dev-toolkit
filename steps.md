# Shred API Page Modernisation Guide

> **Goal** — Make the Shred API section of the Builder Toolkit feel like a *high‑tech*, real‑time platform that matches the slick design language of the Rise Testnet portal (see reference screenshots). The steps below are ordered so you can progressively refactor without breaking production.

---

## 🗺️ Overview of What We’ll Touch

| Area                 | Why                                              | Key Techniques                                    |
| -------------------- | ------------------------------------------------ | ------------------------------------------------- |
| Global design tokens | Keep palette & spacing consistent across Toolkit | Tailwind `theme.extend`, CSS variables            |
| Fonts / typography   | Sharper, more futuristic aesthetic               | Inter Tight, Space Grotesk, variable font‑weight  |
| Hero + metrics cards | First impression — needs to pop                  | Glassmorphism, gradient text, subtle glow, motion |
| Sidebar navigation   | Improve scan‑ability & brand recall              | Frosted glass panel, neon active border           |
| Code / docs pages    | Reduce eye‑strain, improve hierarchy             | Prose class tweaks, syntax highlighting           |
| ShredsAnimation      | Reinforce real‑time speed narrative              | Faster pace, neon blue trails, 3‑D tilt           |

---

## 1  Set‑up

1. **Upgrade Tailwind** (if < v3.4):

   ```bash
   pnpm add -D tailwindcss@latest postcss@latest autoprefixer@latest
   npx tailwindcss init -p
   ```
2. **Add Framer‑Motion** (already used in other pages, but verify):

   ```bash
   pnpm add framer-motion
   ```
3. **Install Fonts** – self‑host for performance:

   ```bash
   # fonts/InterTight-Variable.woff2 & fonts/SpaceGrotesk-Variable.woff2
   ```

   Add to `app/globals.css`:

   ```css
   @font-face{
     font-family:"InterTight";src:url('/fonts/InterTight-Variable.woff2') format('woff2');
     font-weight:100 900;font-display:swap;
   }
   @font-face{
     font-family:"SpaceGrotesk";src:url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2');
     font-weight:300 800;font-display:swap;
   }
   :root{--font-sans:"InterTight","ui-sans-serif",system-ui;--font-display:"SpaceGrotesk";}
   ```

---

## 2  Define Design Tokens (`tailwind.config.ts`)

```ts
import { type Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // electrified Rise palette
        primary: {
          DEFAULT: '#3b82f6',          // electric blue
          50:  '#eef5ff',
          100: '#dbeafe',
        },
        neon: '#00e4ff',               // accent for glows
        surface: {
          900: '#0a0b0d',             // near‑black background
          800: '#111318',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 24px 4px theme("colors.neon")',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 12px theme("colors.neon")' },
          '50%':     { boxShadow: '0 0 24px theme("colors.neon")' },
        },
      },
      animation: {
        glow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
```

> **Tip:** Export `theme.extend` to a separate *design‑tokens.ts* if you plan to share tokens across packages.

---

## 3  Global Styles (`globals.css`)

```css
html{background:radial-gradient(circle at 30% 10%,#1f2937 0%,#0a0b0d 70%);}/* subtle vignette */
body{color:#e5e7eb;font-family:var(--font-sans);} /* light gray text */

/* Glass card */
.card-glass{background:hsla(0,0%,100%,0.05);backdrop-filter:blur(8px);border:1px solid hsla(0,0%,100%,0.07);}
```

---

## 4  Component Refactors

> **File paths reference the flattened repo you attached.**

### 4.1  `components/templates/SectionLandingPage.tsx`

1. **Switch to grid layout** for hero + links:

   ```tsx
   <section className="grid lg:grid-cols-[1fr,380px] gap-16">...</section>
   ```
2. **Apply backdrop & gradient text** to title:

   ```tsx
   <h1 className="text-6xl font-display font-black bg-gradient-to-br from-primary to-neon bg-clip-text text-transparent animate-glow">
     {title}
   </h1>
   ```
3. **Wrap `links` in `<motion.div>`** with staggered reveal.

### 4.2  `components/sections/HeroContent.tsx`  → **`ShredAPIHero`**

Add a subtle coded‑grid overlay & update metrics cards:

```tsx
const metric = (
  label:string,value:string)=> (
    <div className="card-glass rounded-2xl p-6 flex flex-col items-center">
      <span className="text-4xl font-display text-neon drop-shadow-lg">{value}</span>
      <p className="mt-2 text-sm tracking-wide uppercase text-zinc-400">{label}</p>
    </div>
);
```

### 4.3  `components/sections/ShredsAnimation.tsx`

Replace canvas config:

```tsx
<Canvas camera={{ position:[0,0,30], fov:60 }}>
  <Stars radius={100} depth={50} count={5000} factor={4}/>
  {/* Shred blocks */}
  {blocks.map((pos,i)=>(
     <mesh key={i} position={pos}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color="#3b82f6" emissive="#00e4ff" emissiveIntensity={0.6} />
     </mesh>
  ))}
  <EffectComposer>
     <Bloom intensity={1.3} luminanceThreshold={0} />
  </EffectComposer>
</Canvas>
```

Add speed control prop so Design can tune velocity without code change.

### 4.4  Sidebar (`components/layout/Sidebar.tsx`)

```tsx
<nav className="sticky top-0 h-screen w-60 px-6 py-8 bg-surface-800/70 backdrop-blur-xs"/>
```

Active link:

```css
.sidebar a.active{border-left:4px solid var(--tw-color-primary);color:#fff;}
```

---

## 5  Prose & Code Blocks (`@tailwindcss/typography`)

```css
.prose{ --tw-prose-body:#cbd5e1; --tw-prose-headings:#fff; --tw-prose-links:#3b82f6;}
```

---

## 6  Motion & Interactivity

* **Staggered fade‑up** for hero metrics:

  ```tsx
  const container = { hidden:{}, show:{ transition:{ staggerChildren:0.15 } } }
  const item = { hidden:{ y:20, opacity:0 }, show:{ y:0, opacity:1 } }
  ```
* **Mouse‑tilt on cards** – use `react-parallax-tilt` for a 3‑D hover.
* **Prefer reduced‑motion** media query to disable heavy animation for accessibility.

---

## 7  QA Checklist

* [ ] Dark‑mode contrast ratio ≥ 4.5
* [ ] Screens ≥ 320 px render without horizontal scroll
* [ ] WebVitals (CLS < 0.1, LCP < 2.5 s)
* [ ] Keyboard‑navigation visible focus ring
* [ ] Peer review on Safari (blur + backdrop filters)

---

## 8  Deployment

1. **Run lint & type‑check**

   ```bash
   pnpm lint && pnpm typecheck
   ```
2. **Run Vercel preview**

   ```bash
   vercel --prod
   ```
3. Verify lighthouse scores & merge.

---

### 📌 Next Iterations

* Integrate **3‑D shred flow** with live WebSocket TPS counter.
* Swap CSS shimmer loading → Real‑time skeleton fed from API.
* Implement panel that shows actual latency histogram pulled from Grafana.

> *Think big. Build fast.* 🚀
