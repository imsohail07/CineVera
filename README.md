# 🎬 Cinevera — Where Stories Become Infinite

[![Vite](https://img.shields.counts.cx/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.counts.cx/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.counts.cx/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.counts.cx/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.counts.cx/badge/License-MIT-green)](LICENSE)

Cinevera is a premium, next-generation Over-The-Top (OTT) streaming web application. It combines high-end cinematic design principles inspired by the AWS Console design system with the visual elegance of Apple TV+. Built with React, TypeScript, Vite, and styled using modern responsive Tailwind CSS, the platform features high-performance rendering, fluid Framer Motion animations, stateful parent PIN-security lock systems, profile management, a full-screen custom interactive media player, and highly responsive keyboard accessibility.

---

## 📖 Table of Contents

1. [Features](#-features)
2. [Technology Stack](#-technology-stack)
3. [Design System & Aesthetics](#-design-system--aesthetics)
4. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running Locally](#running-locally)
   - [Building for Production](#building-for-production)
5. [Directory Structure](#-directory-structure)
6. [Architecture & State Management](#-architecture--astate-management)
7. [Progressive Web App (PWA)](#-progressive-web-app-pwa)
8. [License](#-license)

---

## ✨ Features

- **Collapsible Cinematic Navigation**: Smoothly animated, space-saving sidebar with custom active route highlights and micro-interactions powered by Framer Motion.
- **Dynamic Content Showcase (Hero)**: High-impact widescreen banner featuring rating indicators, meta tags, and interactive CTA controls (Watch Now, Info, watchlist additions).
- **Personalized Watchlist**: A persistent, custom list to add/remove movies and TV series, dynamically computed based on active profile states.
- **Smart Progress Tracking**: "Continue Watching" row with precise progress indicators, visual playback bars, and quick resume capability.
- **Filterable Media Grids**: Categorized grid systems (Movies, TV Shows, Anime, Top Rated) supporting search filtering, rating-based sort options, and tag selections.
- **Live Channels Broadcast**: Embedded 24/7 streams (NASA Space Feed, Bloomberg, Lo-fi music, etc.) with real-time status indicators.
- **Secure Profiles (Parental Locks)**: High-security Profile Switcher (Admin, Mom, Kids, Guest) guarded by an interactive PIN pad locks interface (default: `1303`).
- **Immersive Custom Video Player**: Fullscreen player offering simulated source selection, playback controls, fast forward/rewind, speed adjust, and context-aware settings.

---

## 🛠 Technology Stack

Cinevera is built on a modern frontend stack designed for speed, type safety, and scalability:

- **Framework**: [React 18](https://reactjs.org/) (Functional Components, Hooks, Contexts)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking, modular interface definitions)
- **Build System**: [Vite](https://vitejs.dev/) (Instant hot module replacement, optimized ESBuild pipeline)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (Ultra-lightweight, reactive global store)
- **Animations**: [Framer Motion](https://www.framerjs.com/) (Spring physics, entrance/exit page transitions)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) (Utility-first CSS, custom design tokens)
- **Icons**: [Lucide React](https://lucide.dev/) (Consistent, light vector iconography)
- **Fonts**: [Google Fonts (Outfit & Inter)](https://fonts.google.com/) (Cinematic display headings and clean, readable UI copy)

---

## 🎨 Design System & Aesthetics

The project implements a bespoke, dark-mode-first aesthetic with rich neon accents and glassmorphism styling:

### Harmonious Color Palette

| Token Name | Hex Code | Visual Application |
|---|---|---|
| **Background** | `#0D0E12` | Main viewport backing (deep midnight blue) |
| **Sidebar BG** | `#131720` | Collapsible navigation tray background |
| **Card Surface** | `#1B2028` | Content containers, modal windows |
| **Accent Orange** | `#FF9900` | Primary CTA, focus states, ratings, and glowing borders |
| **Accent Muted** | `#AAB2BF` | Secondary labels, descriptions, and metadata |
| **Active Glow** | `rgba(255, 153, 0, 0.4)` | Focus halos and interactive overlay shadows |

### Typography

- **Headings & Logo**: `Outfit` — A geometric, high-fashion display typeface.
- **Body & Metadata**: `Inter` — A clean, legible sans-serif for reading descriptions and fine text.

---

## 🚀 Getting Started

Follow these instructions to get the project set up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imsohail07/CineVera.git
   cd CineVera
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
By default, the server will launch at `http://localhost:5173/` (or the next available port, e.g., `http://localhost:5174/`).

### Building for Production

To compile and bundle the assets into highly optimized, production-ready static files:
```bash
npm run build
```
To run a local preview of the production build:
```bash
npm run preview
```

---

## 📂 Directory Structure

```
cinevera/
├── dist/                  # Optimized build outputs
├── public/                # Static assets (Favicon, manifest, PWA details)
│   ├── favicon.svg        # Cinevera Brand Icon
│   └── manifest.json      # Web Application Manifest
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Sidebar, Topbar layouts
│   │   ├── player/        # Fullscreen custom Video Player
│   │   └── profiles/      # Profile Selection & PIN lock pad
│   ├── data/              # Media metadata & static mock database
│   ├── pages/             # Page components (Home, Grid, Watchlist, Settings)
│   ├── store/             # Zustand global state configurations
│   ├── types/             # TypeScript declaration files
│   ├── App.tsx            # Main application coordinator
│   ├── index.css          # Design token styling & Tailwind classes
│   └── main.tsx           # React bootstrap entry point
├── package.json           # Scripts & dependency definitions
├── tsconfig.json          # TypeScript configurations
├── tailwind.config.js     # Tailwind design system configurations
└── vite.config.ts         # Vite bundler options
```

---

## 🧠 Architecture & State Management

Cinevera implements a clean, decoupled state architecture utilizing **Zustand**. The global store manages state transitions for:
- User profile configuration (Maturity rating levels & avatar selections)
- Active view switching (Home vs. Movies, Shows, Settings, Watchlists)
- Collapsible sidebar toggle states
- Video playback session management (current playing title, series details, active episode indexing)

All components subscribe to precise selectors to minimize render cycles and ensure smooth 60fps performance during interactive transitions.

---

## 📱 Progressive Web App (PWA)

Cinevera features PWA capabilities defined in `public/manifest.json`:
- **Standalone Mode**: Runs in an immersive standalone window without browser chrome.
- **Theme Color**: Preconfigured `#FF9900` status bars matching the primary design theme.
- **Custom Branding**: Loads `favicon.svg` dynamically as the system-wide application launch icon.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
