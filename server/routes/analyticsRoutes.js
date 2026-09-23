import express from "express";
import { realMusicService } from "../services/realMusicService.js";

const router = express.Router();

// GET /api/stats/overview - High-level metrics & KPIs
router.get("/stats/overview", (req, res) => {
  try {
    const { platform = "all" } = req.query;
    const stats = realMusicService.getOverviewStats(platform);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/stats/plays-trend - Time-series trend for playback volume & revenue
router.get("/stats/plays-trend", (req, res) => {
  try {
    const timeframe = req.query.timeframe || "7d";
    const platform = req.query.platform || "all";
    const trend = realMusicService.getPlaysTrend(timeframe, platform);
    res.json({ success: true, timeframe, platform, data: trend });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/songs/top - Top tracks with rankings, plays, revenue, platform, timeframe filters & live search
router.get("/songs/top", async (req, res) => {
  try {
    const { limit = 15, genre = "all", search = "", sortBy = "plays", platform = "all", timeframe = "all-time" } = req.query;
    const songs = await realMusicService.getTopSongs({ limit, genre, search, sortBy, platform, timeframe });
    res.json({ success: true, count: songs.length, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/songs/:id - Deep granular insights for a specific track
router.get("/songs/:id", async (req, res) => {
  try {
    const track = await realMusicService.getTrackDetails(req.params.id);
    if (!track) {
      return res.status(404).json({ success: false, error: "Track not found" });
    }
    res.json({ success: true, data: track });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/artists/top - Top artists with total streams, revenue, and velocity
router.get("/artists/top", (req, res) => {
  try {
    const { limit = 10, platform = "all" } = req.query;
    const artists = realMusicService.getTopArtists({ limit, platform });
    res.json({ success: true, count: artists.length, data: artists });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/artists/:id - Deep insights for a specific artist
router.get("/artists/:id", async (req, res) => {
  try {
    const artist = await realMusicService.getArtistDetails(req.params.id);
    if (!artist) {
      return res.status(404).json({ success: false, error: "Artist not found" });
    }
    res.json({ success: true, data: artist });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/albums - List albums with streams and revenue
router.get("/albums", (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const albums = realMusicService.getTopAlbums({ limit });
    res.json({ success: true, count: albums.length, data: albums });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/albums/:id - Deep insights for a specific album
router.get("/albums/:id", async (req, res) => {
  try {
    const album = await realMusicService.getAlbumDetails(req.params.id);
    if (!album) {
      return res.status(404).json({ success: false, error: "Album not found" });
    }
    res.json({ success: true, data: album });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/platforms - Multi-platform comparison, market shares, and payout metrics
router.get("/platforms", (req, res) => {
  try {
    const platforms = realMusicService.getPlatformBreakdown();
    res.json({ success: true, count: platforms.length, data: platforms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/genres/breakdown - Genre listening distribution
router.get("/genres/breakdown", (req, res) => {
  try {
    const genres = realMusicService.getGenreBreakdown();
    res.json({ success: true, data: genres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/demographics - Listener platform and geo breakdown
router.get("/demographics", (req, res) => {
  try {
    const demographics = realMusicService.getDemographics();
    res.json({ success: true, data: demographics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/activity/stream - Recent activity events
router.get("/activity/stream", (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 25;
    const activities = realMusicService.getRecentActivity(limit);
    res.json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/activity/live - Server-Sent Events (SSE) for real-time live events stream
router.get("/activity/live", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  // Send initial ping
  res.write(`data: ${JSON.stringify({ type: "connected", timestamp: new Date().toISOString() })}\n\n`);

  const onActivity = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  realMusicService.on("activity", onActivity);

  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 20000);

  req.on("close", () => {
    clearInterval(heartbeat);
    realMusicService.off("activity", onActivity);
  });
});

// POST /api/events/track - Ingest live play / skip / like events with platform tags
router.post("/events/track", (req, res) => {
  try {
    const { type, songId, platformId, country, countryCode, device, user } = req.body;
    if (!songId) {
      return res.status(400).json({ success: false, error: "songId is required" });
    }

    const result = realMusicService.trackEvent({
      type,
      songId,
      platformId,
      country,
      countryCode,
      device,
      user
    });

    res.status(201).json({
      success: true,
      message: `Event '${type || "play"}' recorded successfully`,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
