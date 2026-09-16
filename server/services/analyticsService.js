import { EventEmitter } from "events";
import {
  initialSongs,
  initialArtists,
  initialDeviceBreakdown,
  initialCountryBreakdown,
  seedRecentActivity
} from "../data/mockData.js";

class AnalyticsService extends EventEmitter {
  constructor() {
    super();
    // Clone initial data into state
    this.songs = JSON.parse(JSON.stringify(initialSongs));
    this.artists = JSON.parse(JSON.stringify(initialArtists));
    this.activityStream = JSON.parse(JSON.stringify(seedRecentActivity));
    this.deviceBreakdown = JSON.parse(JSON.stringify(initialDeviceBreakdown));
    this.countryBreakdown = JSON.parse(JSON.stringify(initialCountryBreakdown));
    this.activeListeners = 14280;

    // Organic fluctuation interval for active listeners
    setInterval(() => {
      const delta = Math.floor(Math.random() * 41) - 20; // -20 to +20
      this.activeListeners = Math.max(12000, this.activeListeners + delta);
    }, 4000);

    // Occasional simulated organic background play event every 7 seconds
    setInterval(() => {
      this.simulateOrganicEvent();
    }, 7000);
  }

  simulateOrganicEvent() {
    const randomSong = this.songs[Math.floor(Math.random() * this.songs.length)];
    const types = ["play", "play", "play", "skip", "like", "playlist_add"];
    const eventType = types[Math.floor(Math.random() * types.length)];
    const devices = ["Mobile (iOS)", "Mobile (Android)", "Desktop App", "Web Player"];
    const countries = [
      { name: "United States", code: "US" },
      { name: "United Kingdom", code: "GB" },
      { name: "Germany", code: "DE" },
      { name: "Japan", code: "JP" },
      { name: "Brazil", code: "BR" },
      { name: "Canada", code: "CA" }
    ];
    const randCountry = countries[Math.floor(Math.random() * countries.length)];
    const randUser = `listener_${Math.floor(Math.random() * 900) + 100}`;

    this.trackEvent({
      type: eventType,
      songId: randomSong.id,
      country: randCountry.name,
      countryCode: randCountry.code,
      device: devices[Math.floor(Math.random() * devices.length)],
      user: randUser
    });
  }

  getOverviewStats() {
    const totalPlays = this.songs.reduce((acc, song) => acc + song.plays, 0);
    const totalSkips = this.songs.reduce((acc, song) => acc + song.skips, 0);
    const totalLikes = this.songs.reduce((acc, song) => acc + song.likes, 0);
    const totalSeconds = this.songs.reduce((acc, song) => acc + song.plays * song.duration, 0);
    const totalListeningHours = Math.round(totalSeconds / 3600);

    const weightedCompletion = this.songs.reduce(
      (acc, song) => acc + song.completionRate * song.plays,
      0
    );
    const avgCompletionRate = Number((weightedCompletion / totalPlays).toFixed(1));
    const skipRate = Number(((totalSkips / totalPlays) * 100).toFixed(1));

    return {
      totalPlays,
      totalPlaysChange: 14.8, // % growth vs prior period
      totalListeners: 3840500,
      totalListenersChange: 9.3,
      totalListeningHours,
      activeListeners: this.activeListeners,
      avgCompletionRate,
      skipRate,
      totalLikes,
      peakHours: "20:00 - 23:00 UTC",
      repeatListenerRate: 42.6,
      topGenre: "Synthwave"
    };
  }

  getPlaysTrend(timeframe = "7d") {
    const totalPlays = this.songs.reduce((acc, song) => acc + song.plays, 0);

    if (timeframe === "24h") {
      // 24 hourly buckets
      const hours = [
        "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
        "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
        "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
      ];
      const distribution = [
        0.02, 0.015, 0.012, 0.01, 0.012, 0.018,
        0.032, 0.045, 0.052, 0.048, 0.046, 0.050,
        0.058, 0.054, 0.051, 0.055, 0.062, 0.071,
        0.078, 0.082, 0.089, 0.085, 0.065, 0.038
      ];
      const dailyTotal = Math.round(totalPlays / 30);
      return hours.map((label, i) => ({
        label,
        plays: Math.round(dailyTotal * distribution[i] * (0.95 + Math.random() * 0.1)),
        uniqueListeners: Math.round(dailyTotal * distribution[i] * 0.72)
      }));
    }

    if (timeframe === "30d") {
      const result = [];
      const baseDaily = Math.round(totalPlays / 35);
      for (let i = 30; i >= 1; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const dayOfWeek = d.getDay();
        const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.25 : 1.0;
        const trendMultiplier = 1 + (30 - i) * 0.008; // upward trajectory
        const noise = 0.92 + Math.random() * 0.16;
        const plays = Math.round(baseDaily * weekendMultiplier * trendMultiplier * noise);
        result.push({
          label,
          plays,
          uniqueListeners: Math.round(plays * 0.68)
        });
      }
      return result;
    }

    if (timeframe === "12m") {
      const months = [
        "Oct", "Nov", "Dec", "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul", "Aug", "Sep"
      ];
      const baseMonthly = Math.round(totalPlays / 12);
      return months.map((label, idx) => {
        const growth = 1 + idx * 0.07;
        const plays = Math.round(baseMonthly * growth * (0.94 + Math.random() * 0.12));
        return {
          label,
          plays,
          uniqueListeners: Math.round(plays * 0.65)
        };
      });
    }

    // Default: 7 days
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const multipliers = [0.88, 0.92, 0.95, 1.02, 1.18, 1.35, 1.24];
    const avgDayPlays = Math.round(totalPlays / 25);
    return days.map((label, idx) => {
      const plays = Math.round(avgDayPlays * multipliers[idx] * (0.96 + Math.random() * 0.08));
      return {
        label,
        plays,
        uniqueListeners: Math.round(plays * 0.7)
      };
    });
  }

  getTopSongs({ limit = 10, genre = "all", search = "" } = {}) {
    let filtered = [...this.songs];

    if (genre && genre !== "all") {
      filtered = filtered.filter(
        s => s.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.album.toLowerCase().includes(q)
      );
    }

    // Sort descending by play count
    filtered.sort((a, b) => b.plays - a.plays);

    const maxPlays = filtered.length > 0 ? filtered[0].plays : 1;

    return filtered.slice(0, Number(limit)).map((song, index) => {
      const rank = index + 1;
      const popularity = Math.round((song.plays / maxPlays) * 100);
      const skipRate = Number(((song.skips / song.plays) * 100).toFixed(1));

      // Calculate trend icon / rank change
      let rankDelta = 0;
      if (rank === 1) rankDelta = 0;
      else if (rank === 2) rankDelta = 1;
      else if (rank === 3) rankDelta = -1;
      else rankDelta = (index % 3) - 1;

      return {
        ...song,
        rank,
        rankDelta,
        popularity,
        skipRate
      };
    });
  }

  getTopArtists({ limit = 10 } = {}) {
    // Calculate total streams for each artist from songs
    const artistStreams = {};
    for (const song of this.songs) {
      artistStreams[song.artistId] = (artistStreams[song.artistId] || 0) + song.plays;
    }

    const artistsWithStats = this.artists.map(artist => {
      const totalStreams = artistStreams[artist.id] || 0;
      // Top song
      const artistSongs = this.songs
        .filter(s => s.artistId === artist.id)
        .sort((a, b) => b.plays - a.plays);
      const topSong = artistSongs[0] ? artistSongs[0].title : "N/A";

      return {
        ...artist,
        totalStreams,
        trackCount: artistSongs.length,
        topSong
      };
    });

    artistsWithStats.sort((a, b) => b.totalStreams - a.totalStreams);

    return artistsWithStats.slice(0, Number(limit)).map((artist, idx) => ({
      ...artist,
      rank: idx + 1
    }));
  }

  getGenreBreakdown() {
    const genreMap = {};
    let totalPlays = 0;

    for (const song of this.songs) {
      if (!genreMap[song.genre]) {
        genreMap[song.genre] = { name: song.genre, plays: 0, count: 0 };
      }
      genreMap[song.genre].plays += song.plays;
      genreMap[song.genre].count += 1;
      totalPlays += song.plays;
    }

    const colors = {
      Synthwave: "#ec4899",
      "Indie Pop": "#3b82f6",
      Cyberpunk: "#10b981",
      "Lo-Fi Beats": "#f59e0b",
      EDM: "#8b5cf6",
      "R&B / Soul": "#f43f5e"
    };

    return Object.values(genreMap)
      .map(item => ({
        name: item.name,
        plays: item.plays,
        trackCount: item.count,
        percentage: Number(((item.plays / totalPlays) * 100).toFixed(1)),
        color: colors[item.name] || "#06b6d4"
      }))
      .sort((a, b) => b.plays - a.plays);
  }

  getDemographics() {
    return {
      devices: this.deviceBreakdown,
      countries: this.countryBreakdown
    };
  }

  getRecentActivity(limit = 25) {
    return this.activityStream.slice(0, limit);
  }

  trackEvent({ type = "play", songId, country = "United States", countryCode = "US", device = "Mobile (iOS)", user = "anonymous_listener" }) {
    const song = this.songs.find(s => s.id === songId) || this.songs[0];
    const artist = this.artists.find(a => a.id === song.artistId);

    if (type === "play") {
      song.plays += 1;
      if (artist) artist.monthlyListeners += 1;
    } else if (type === "skip") {
      song.skips += 1;
      song.plays += 1;
    } else if (type === "like") {
      song.likes += 1;
    }

    const newEvent = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type,
      songId: song.id,
      songTitle: song.title,
      artist: song.artist,
      user,
      device,
      country,
      countryCode,
      timestamp: new Date().toISOString()
    };

    // Prepend to activity stream
    this.activityStream.unshift(newEvent);
    if (this.activityStream.length > 100) {
      this.activityStream.pop();
    }

    // Emit event for real-time subscribers (SSE)
    this.emit("activity", newEvent);

    return {
      event: newEvent,
      updatedSong: {
        id: song.id,
        plays: song.plays,
        skips: song.skips,
        likes: song.likes
      }
    };
  }
}

export const analyticsService = new AnalyticsService();
