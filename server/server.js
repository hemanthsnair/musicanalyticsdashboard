import express from "express";
import cors from "cors";
import analyticsRoutes from "./routes/analyticsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());

// Routes
app.use("/api", analyticsRoutes);

// Root health & metadata
app.get("/", (req, res) => {
  res.json({
    status: "online",
    name: "Music Analytics Dashboard Engine",
    version: "1.0.0",
    endpoints: [
      "/api/stats/overview",
      "/api/stats/plays-trend",
      "/api/songs/top",
      "/api/artists/top",
      "/api/genres/breakdown",
      "/api/demographics",
      "/api/activity/stream",
      "/api/activity/live",
      "/api/events/track (POST)"
    ]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🎵 Music Analytics API running on http://localhost:${PORT}`);
});
