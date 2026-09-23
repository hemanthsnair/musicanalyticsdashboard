# 📊 AudioPulse — Powerful Music Analytics Dashboard

> An industry-grade music streaming telemetry, royalty intelligence, and DSP multi-platform analytics dashboard built with **React** and **Node.js**. Built to mirror how platforms like Spotify, Apple Music, Tidal, and YouTube Music track playback velocity, listener retention, creator reach, DSP payout economics, and real-time streaming activity.

---

## ✨ Features & Capabilities

### 1. 📈 Core Streaming Telemetry & Tracking
- **Play Volume & Velocity**: Ingests and aggregates stream play counts, historical curves, and growth metrics.
- **Audience Retention**: Calculates skip rates, completion rates, and repeat listener ratios.
- **Concurrent Live Listeners**: Real-time active audience counter with organic fluctuation simulations.
- **Cumulative Stream Time**: Computes total listening hours based on song durations and play counts.

### 2. 💰 Gross Royalty Economics & Revenue Tracking
- **Most Streamed vs. Most Revenue Generated**: Toggle rankings between raw play volume and total dollar royalties earned.
- **DSP Payout Schedules**: Real-world per-stream payout rates modeled across platforms:
  - **Tidal**: $0.0125 / stream (Master tier leader)
  - **Apple Music**: $0.0080 / stream (Lossless standard)
  - **Deezer**: $0.0055 / stream
  - **Amazon Music**: $0.0042 / stream (Ultra HD)
  - **Spotify**: $0.0038 / stream
  - **YouTube Music**: $0.0022 / stream (Video + ad-tier blend)
- **Revenue KPIs**: Total Gross Royalties ($), Average Revenue per 1k Streams ($/1k), and Top Earning Song/Platform.

### 3. 📻 Streaming Application (DSP) Intelligence
- **Cross-Platform Analytics**: In-depth comparison view for Spotify, Apple Music, YouTube Music, Amazon Music, Tidal, and Deezer.
- **Market Share vs. Revenue Share**: Visual multi-segment comparison illustrating how higher-payout platforms generate disproportionately larger revenues.
- **Global Platform Filter Lens**: Filter the entire dashboard (plays, revenue, artists, and charts) specifically for any streaming service or across all.

### 4. 🔍 Deep Granular Insights (Tracks, Artists & Albums)
- **Track Insights Modal**: Click any song to view:
  - Audio feature meters (Energy, Danceability, Valence, Acousticness, Instrumentalness).
  - 30-day stream velocity curve and revenue trajectory.
  - Platform breakdown table with stream volume, revenue, payout rates, and audio formats.
  - Top geographic listener markets.
  - Direct Web Audio API synthesizer preview with live soundwave animations.
- **Artist Catalog Insights**: Click any creator to inspect total catalog streams, gross artist royalties, monthly listeners, discography tracklists, and platform revenue shares.
- **Album Catalog Insights**: Comprehensive album grid and detail modal showcasing release information, cumulative streams, gross album royalties, and full tracklists.

### 5. ⚡ Backend Analytics Engine & REST APIs (`server/`)
- `GET /api/stats/overview?platform=...`: Executive KPIs (total plays, gross revenue, listeners, completion rate, peak hours).
- `GET /api/stats/plays-trend?timeframe=24h|7d|30d|12m&platform=...`: Time-series streaming volume and revenue curves.
- `GET /api/songs/top?limit=10&genre=...&search=...&sortBy=plays|revenue|completion&platform=...`: Most played or highest earning tracks.
- `GET /api/songs/:id`: Deep granular telemetry for a specific track.
- `GET /api/artists/top?limit=10&platform=...`: Top creator velocity with total streams, revenue, and reach.
- `GET /api/artists/:id`: Deep artist catalog and royalty profile.
- `GET /api/albums`: Album catalog performance with cumulative plays and revenue.
- `GET /api/albums/:id`: Album details with individual track performance metrics.
- `GET /api/platforms`: Multi-platform comparison, market shares, and payout metrics.
- `GET /api/genres/breakdown`: Audience taste distribution across genres.
- `GET /api/demographics`: Device ecosystem (iOS, Android, Desktop, Web) and geographic listener rankings.
- `GET /api/activity/stream`: Recent user engagement events.
- `GET /api/activity/live`: **Server-Sent Events (SSE)** channel broadcasting live listening events and instant payouts in real-time.
- `POST /api/events/track`: Ingestion API allowing telemetry simulation with DSP platform tags.

### 6. 🎨 Sleek Front-End Experience (`client/`)
- **Atmospheric Obsidian Dark Theme**: Glassmorphic frosted surfaces (`backdrop-filter: blur(16px)`), subtle neon gradients, and glowing accents.
- **Interactive SVG Playback Chart**: Bezier-smoothed streaming velocity curves with gradient fills and live crosshair tooltips.
- **Genre Velocity Donut**: Circular SVG breakdown of listening taste.
- **Interactive Web Audio API Synthesizer**: Click "Preview" on any song to hear harmonic synth melodies tailored to the genre, accompanied by dancing equalizer soundwave bars.
- **Live Stream Ticker**: Pulsing live activity feed showing listener actions from Tokyo, Berlin, New York, London, and São Paulo with platform badges and instant revenue increments.
- **Stream Ingestion Simulator**: Built-in interactive drawer to inject plays, skips, and traffic bursts tagged by DSP platform to watch metrics update live.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm

### 1. Clone or Open Workspace
```bash
cd MusicAnalyticsDashboard
```

### 2. Install Dependencies
```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 3. Start the Backend API Server
In a terminal:
```bash
cd server
npm start
```
The server will run on `http://localhost:5001`.

### 4. Start the Frontend Dev Server
In a second terminal:
```bash
cd client
npm run dev
```
Open your browser at:
```
http://localhost:5173/
```
