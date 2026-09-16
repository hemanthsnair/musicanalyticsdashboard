import express from "express";
import { analyticsService } from "../services/analyticsService.js";

const router = express.Router();

// GET /api/stats/overview - High-level metrics & KPIs
router.get("/stats/overview", (req, res) => {
  try {
    const stats = analyticsService.getOverviewStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/stats/plays-trend - Time-series trend for playback volume
router.get("/stats/plays-trend", (req, res) => {
  try {
    const timeframe = req.query.timeframe || "7d";
    const trend = analyticsService.getPlaysTrend(timeframe);
    res.json({ success: true, timeframe, data: trend });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/songs/top - Top most played songs with rankings & details
router.get("/songs/top", (req, res) => {
  try {
    const { limit = 10, genre = "all", search = "" } = req.query;
    const songs = analyticsService.getTopSongs({ limit, genre, search });
    res.json({ success: true, count: songs.length, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/artists/top - Top artists with total streams, monthly listeners, and velocity
router.get("/artists/top", (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const artists = analyticsService.getTopArtists({ limit });
    res.json({ success: true, count: artists.length, data: artists });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/genres/breakdown - Genre listening distribution
router.get("/genres/breakdown", (req, res) => {
  try {
    const genres = analyticsService.getGenreBreakdown();
    res.json({ success: true, data: genres });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/demographics - Listener platform and geo breakdown
router.get("/demographics", (req, res) => {
  try {
    const demographics = analyticsService.getDemographics();
    res.json({ success: true, data: demographics });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/activity/stream - Recent activity events
router.get("/activity/stream", (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 25;
    const activities = analyticsService.getRecentActivity(limit);
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

  analyticsService.on("activity", onActivity);

  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 20000);

  req.on("close", () => {
    clearInterval(heartbeat);
    analyticsService.off("activity", onActivity);
  });
});

// POST /api/events/track - Ingest live play / skip / like events
router.post("/events/track", (req, res) => {
  try {
    const { type, songId, country, countryCode, device, user } = req.body;
    if (!songId) {
      return res.status(400).json({ success: false, error: "songId is required" });
    }

    const result = analyticsService.trackEvent({
      type,
      songId,
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
