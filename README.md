# 📊 AudioPulse — Powerful Music Analytics Dashboard

> An industry-grade music streaming telemetry and analytics platform built with **React** and **Node.js**. Built to mirror how platforms like Spotify, Apple Music, and YouTube Music track playback velocity, listener retention, creator reach, and real-time streaming activity.

---

## ✨ Features & Capabilities

### 1. 📈 Core Streaming Telemetry & Tracking
- **Play Volume & Velocity**: Ingests and aggregates stream play counts, historical curves, and growth metrics.
- **Audience Retention**: Calculates skip rates, completion rates, and repeat listener ratios.
- **Concurrent Live Listeners**: Real-time active audience counter with organic fluctuation simulations.
- **Cumulative Stream Time**: Computes total listening hours based on song durations and play counts.

### 2. ⚡ Backend Analytics Engine & REST APIs (`server/`)
- `GET /api/stats/overview`: High-level executive KPIs (total plays, unique listeners, completion rate, peak listening hours, growth rates).
- `GET /api/stats/plays-trend?timeframe=24h|7d|30d|12m`: Time-series streaming volume with hourly, daily, and monthly resolution.
- `GET /api/songs/top?limit=10&genre=...&search=...`: Most played tracks with skip rates, popularity scores, and durations.
- `GET /api/artists/top?limit=10`: Top creator velocity with total streams, monthly listeners, and follower metrics.
- `GET /api/genres/breakdown`: Audience taste distribution across Synthwave, Indie Pop, Cyberpunk, Lo-Fi, EDM, and R&B.
- `GET /api/demographics`: Device ecosystem (iOS, Android, Desktop, Web) and geographic listener rankings.
- `GET /api/activity/stream`: Recent user engagement events (plays, skips, likes, playlist additions).
- `GET /api/activity/live`: **Server-Sent Events (SSE)** channel broadcasting live listening events in real-time.
- `POST /api/events/track`: Ingestion API allowing telemetry simulation and instant recalculation of metrics.

### 3. 🎨 Sleek Front-End Experience (`client/`)
- **Atmospheric Obsidian Dark Theme**: Glassmorphic frosted surfaces (`backdrop-filter: blur(16px)`), subtle neon gradients, and glowing accents.
- **Interactive SVG Playback Chart**: Bezier-smoothed streaming velocity curves with gradient fills and live crosshair tooltips.
- **Genre Velocity Donut**: Circular SVG breakdown of listening taste.
- **Interactive Web Audio API Synthesizer**: Click "Preview" on any song to hear harmonic synth melodies tailored to the genre, accompanied by dancing equalizer soundwave bars.
- **Live Stream Ticker**: Pulsing live activity feed showing listener actions from Tokyo, Berlin, New York, London, and São Paulo.
- **Stream Ingestion Simulator**: Built-in interactive drawer to inject plays, skips, and traffic bursts to watch metrics update live.

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

---

## 📡 API Reference

### `GET /api/stats/overview`
**Response**:
```json
{
  "success": true,
  "data": {
    "totalPlays": 10673511,
    "totalPlaysChange": 14.8,
    "totalListeners": 3840500,
    "totalListenersChange": 9.3,
    "totalListeningHours": 616875,
    "activeListeners": 14284,
    "avgCompletionRate": 85.0,
    "skipRate": 14.9,
    "peakHours": "20:00 - 23:00 UTC",
    "topGenre": "Synthwave"
  }
}
```

### `POST /api/events/track`
**Request Body**:
```json
{
  "songId": "song-1",
  "type": "play",
  "device": "Mobile (iOS)",
  "country": "Japan",
  "countryCode": "JP",
  "user": "kenji_sound"
}
```
**Response (201 Created)**:
```json
{
  "success": true,
  "message": "Event 'play' recorded successfully",
  "data": {
    "event": { ... },
    "updatedSong": {
      "id": "song-1",
      "plays": 1428502,
      "skips": 182000,
      "likes": 312400
    }
  }
}
```

---

## 🏗️ Architecture

```
MusicAnalyticsDashboard/
├── server/
│   ├── data/
│   │   └── mockData.js            # Initial dataset (songs, artists, demographics, events)
│   ├── routes/
│   │   └── analyticsRoutes.js     # Express routes & SSE streaming
│   ├── services/
│   │   └── analyticsService.js    # Aggregations, metrics engine & organic simulator
│   ├── package.json
│   └── server.js                  # Express app entrypoint (Port 5001)
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MetricCard.jsx             # KPI cards with sparklines & trends
│   │   │   ├── PlaysTrendChart.jsx        # SVG area chart with 24H/7D/30D/12M filters
│   │   │   ├── GenreDonutChart.jsx        # Donut genre velocity breakdown
│   │   │   ├── TopSongsTable.jsx          # Most played tracks with audio preview
│   │   │   ├── TopArtistsGrid.jsx         # Creator velocity & monthly reach
│   │   │   ├── LiveActivityFeed.jsx       # Real-time event ticker
│   │   │   ├── DemographicsPanel.jsx      # Device & geographic distribution
│   │   │   ├── AudioPlayerBar.jsx         # Docked player with Web Audio API & EQ
│   │   │   └── EventSimulatorModal.jsx    # Telemetry ingestion test controls
│   │   ├── utils/
│   │   │   └── audioSynth.js              # Browser Web Audio API synthesizer
│   │   ├── App.jsx                        # Master dashboard state & SSE listener
│   │   ├── index.css                      # Glassmorphic dark design system
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js                     # Proxy configured to localhost:5001
│   └── package.json
└── README.md
```
