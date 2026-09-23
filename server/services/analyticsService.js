import { EventEmitter } from "events";
import {
  initialSongs,
  initialArtists,
  initialAlbums,
  initialPlatforms,
  initialDeviceBreakdown,
  initialCountryBreakdown,
  seedRecentActivity
} from "../data/mockData.js";

class AnalyticsService extends EventEmitter {
  constructor() {
    super();
    // Clone initial seed data into state
    this.songs = JSON.parse(JSON.stringify(initialSongs));
    this.artists = JSON.parse(JSON.stringify(initialArtists));
    this.albums = JSON.parse(JSON.stringify(initialAlbums));
    this.platforms = JSON.parse(JSON.stringify(initialPlatforms));
    this.activityStream = JSON.parse(JSON.stringify(seedRecentActivity));
    this.deviceBreakdown = JSON.parse(JSON.stringify(initialDeviceBreakdown));
    this.countryBreakdown = JSON.parse(JSON.stringify(initialCountryBreakdown));
    this.activeListeners = 14280;

    // Organic fluctuation interval for active listeners
    setInterval(() => {
      const delta = Math.floor(Math.random() * 41) - 20; // -20 to +20
      this.activeListeners = Math.max(12000, this.activeListeners + delta);
    }, 4000);

    // Occasional simulated organic background play event every 6 seconds
    setInterval(() => {
      this.simulateOrganicEvent();
    }, 6000);
  }

  simulateOrganicEvent() {
    const randomSong = this.songs[Math.floor(Math.random() * this.songs.length)];
    const types = ["play", "play", "play", "play", "skip", "like", "playlist_add"];
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
    const randPlatform = this.platforms[Math.floor(Math.random() * this.platforms.length)];

    this.trackEvent({
      type: eventType,
      songId: randomSong.id,
      platformId: randPlatform.id,
      country: randCountry.name,
      countryCode: randCountry.code,
      device: devices[Math.floor(Math.random() * devices.length)],
      user: randUser
    });
  }

  getOverviewStats(platform = "all") {
    let targetSongs = this.songs;
    let totalPlays = 0;
    let totalRevenue = 0;
    let totalSkips = 0;
    let totalLikes = 0;
    let totalSeconds = 0;

    if (platform && platform !== "all") {
      for (const song of targetSongs) {
        const platData = song.platforms?.[platform];
        const pPlays = platData ? platData.plays : Math.round(song.plays * 0.2);
        const pRev = platData ? platData.revenue : Number((pPlays * 0.004).toFixed(2));
        totalPlays += pPlays;
        totalRevenue += pRev;
        totalSkips += Math.round(song.skips * 0.25);
        totalLikes += Math.round(song.likes * 0.25);
        totalSeconds += pPlays * song.duration;
      }
    } else {
      totalPlays = targetSongs.reduce((acc, song) => acc + song.plays, 0);
      totalRevenue = targetSongs.reduce((acc, song) => acc + (song.totalRevenue || 0), 0);
      totalSkips = targetSongs.reduce((acc, song) => acc + song.skips, 0);
      totalLikes = targetSongs.reduce((acc, song) => acc + song.likes, 0);
      totalSeconds = targetSongs.reduce((acc, song) => acc + song.plays * song.duration, 0);
    }

    const totalListeningHours = Math.round(totalSeconds / 3600);
    const weightedCompletion = targetSongs.reduce(
      (acc, song) => acc + song.completionRate * song.plays,
      0
    );
    const avgCompletionRate = Number((weightedCompletion / (this.songs.reduce((acc, s) => acc + s.plays, 0) || 1)).toFixed(1));
    const skipRate = Number(((totalSkips / (totalPlays || 1)) * 100).toFixed(1));
    const avgRevenuePerThousand = Number(((totalRevenue / (totalPlays || 1)) * 1000).toFixed(2));

    // Top earning song
    const topEarningSong = [...this.songs].sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))[0];

    return {
      platform,
      totalPlays,
      totalPlaysChange: 14.8,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalRevenueChange: 16.4,
      avgRevenuePerThousand,
      totalListeners: 3840500,
      totalListenersChange: 9.3,
      totalListeningHours,
      activeListeners: this.activeListeners,
      avgCompletionRate,
      skipRate,
      totalLikes,
      peakHours: "20:00 - 23:00 UTC",
      repeatListenerRate: 42.6,
      topGenre: "Synthwave",
      topEarningSong: topEarningSong ? {
        id: topEarningSong.id,
        title: topEarningSong.title,
        artist: topEarningSong.artist,
        revenue: topEarningSong.totalRevenue
      } : null,
      topPlatform: "Spotify (44.5% share)"
    };
  }

  getPlaysTrend(timeframe = "7d", platform = "all") {
    const totalPlays = this.songs.reduce((acc, song) => acc + song.plays, 0);
    const platformMultiplier = platform && platform !== "all"
      ? (this.platforms.find(p => p.id === platform)?.sharePercent || 20) / 100
      : 1.0;

    const basePlays = totalPlays * platformMultiplier;

    if (timeframe === "24h") {
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
      const dailyTotal = Math.round(basePlays / 30);
      return hours.map((label, i) => {
        const plays = Math.round(dailyTotal * distribution[i] * (0.95 + Math.random() * 0.1));
        const revenue = Number((plays * 0.0048).toFixed(2));
        return {
          label,
          plays,
          revenue,
          uniqueListeners: Math.round(plays * 0.72)
        };
      });
    }

    if (timeframe === "30d") {
      const result = [];
      const baseDaily = Math.round(basePlays / 35);
      for (let i = 30; i >= 1; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const dayOfWeek = d.getDay();
        const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.25 : 1.0;
        const trendMultiplier = 1 + (30 - i) * 0.008;
        const noise = 0.92 + Math.random() * 0.16;
        const plays = Math.round(baseDaily * weekendMultiplier * trendMultiplier * noise);
        const revenue = Number((plays * 0.0049).toFixed(2));
        result.push({
          label,
          plays,
          revenue,
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
      const baseMonthly = Math.round(basePlays / 12);
      return months.map((label, idx) => {
        const growth = 1 + idx * 0.07;
        const plays = Math.round(baseMonthly * growth * (0.94 + Math.random() * 0.12));
        const revenue = Number((plays * 0.0049).toFixed(2));
        return {
          label,
          plays,
          revenue,
          uniqueListeners: Math.round(plays * 0.65)
        };
      });
    }

    // Default: 7 days
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const multipliers = [0.88, 0.92, 0.95, 1.02, 1.18, 1.35, 1.24];
    const avgDayPlays = Math.round(basePlays / 25);
    return days.map((label, idx) => {
      const plays = Math.round(avgDayPlays * multipliers[idx] * (0.96 + Math.random() * 0.08));
      const revenue = Number((plays * 0.0049).toFixed(2));
      return {
        label,
        plays,
        revenue,
        uniqueListeners: Math.round(plays * 0.7)
      };
    });
  }

  getTopSongs({ limit = 10, genre = "all", search = "", sortBy = "plays", platform = "all" } = {}) {
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

    // Compute display plays & revenue if filtered by a specific platform
    const mapped = filtered.map(song => {
      let displayPlays = song.plays;
      let displayRevenue = song.totalRevenue;

      if (platform && platform !== "all" && song.platforms?.[platform]) {
        displayPlays = song.platforms[platform].plays;
        displayRevenue = song.platforms[platform].revenue;
      }

      return {
        ...song,
        displayPlays,
        displayRevenue
      };
    });

    // Sorting logic: plays | revenue | completion
    if (sortBy === "revenue") {
      mapped.sort((a, b) => b.displayRevenue - a.displayRevenue);
    } else if (sortBy === "completion") {
      mapped.sort((a, b) => b.completionRate - a.completionRate);
    } else {
      // Default: plays
      mapped.sort((a, b) => b.displayPlays - a.displayPlays);
    }

    const maxMetric = mapped.length > 0
      ? (sortBy === "revenue" ? mapped[0].displayRevenue : mapped[0].displayPlays)
      : 1;

    return mapped.slice(0, Number(limit)).map((song, index) => {
      const rank = index + 1;
      const popularity = Math.round(((sortBy === "revenue" ? song.displayRevenue : song.displayPlays) / maxMetric) * 100);
      const skipRate = Number(((song.skips / song.plays) * 100).toFixed(1));

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

  getTrackDetails(songId) {
    const song = this.songs.find(s => s.id === songId);
    if (!song) return null;

    const artist = this.artists.find(a => a.id === song.artistId);
    const album = this.albums.find(a => a.id === song.albumId);

    // Generate 30-day velocity curve specifically for this track
    const velocityCurve = [];
    const baseDaily = Math.round(song.plays / 35);
    for (let i = 30; i >= 1; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const trendMultiplier = 1 + (30 - i) * 0.007;
      const noise = 0.9 + Math.random() * 0.2;
      const plays = Math.round(baseDaily * trendMultiplier * noise);
      velocityCurve.push({
        label,
        plays,
        revenue: Number((plays * (song.totalRevenue / song.plays)).toFixed(2))
      });
    }

    // Platform breakdown array
    const platformBreakdown = this.platforms.map(plat => {
      const platData = song.platforms?.[plat.id] || { plays: 0, revenue: 0 };
      const share = Number(((platData.plays / (song.plays || 1)) * 100).toFixed(1));
      return {
        id: plat.id,
        name: plat.name,
        color: plat.color,
        plays: platData.plays,
        revenue: platData.revenue,
        payoutRate: plat.payoutRate,
        share,
        quality: plat.quality
      };
    }).sort((a, b) => b.plays - a.plays);

    // Track geographic audience
    const countryAudience = [
      { country: "United States", code: "US", flag: "🇺🇸", share: 34 },
      { country: "United Kingdom", code: "GB", flag: "🇬🇧", share: 18 },
      { country: "Germany", code: "DE", flag: "🇩🇪", share: 14 },
      { country: "Japan", code: "JP", flag: "🇯🇵", share: 11 },
      { country: "Brazil", code: "BR", flag: "🇧🇷", share: 8 },
      { country: "Others", code: "XX", flag: "🌍", share: 15 }
    ];

    return {
      ...song,
      artistDetails: artist ? {
        id: artist.id,
        name: artist.name,
        verified: artist.verified,
        monthlyListeners: artist.monthlyListeners,
        followers: artist.followers,
        country: artist.country,
        avatarColor: artist.avatarColor
      } : null,
      albumDetails: album ? {
        id: album.id,
        title: album.title,
        releaseYear: album.releaseYear,
        coverColor: album.coverColor,
        description: album.description
      } : null,
      platformBreakdown,
      velocityCurve,
      countryAudience
    };
  }

  getTopArtists({ limit = 10, platform = "all" } = {}) {
    const artistStreams = {};
    const artistRevenues = {};

    for (const song of this.songs) {
      let plays = song.plays;
      let revenue = song.totalRevenue;

      if (platform && platform !== "all" && song.platforms?.[platform]) {
        plays = song.platforms[platform].plays;
        revenue = song.platforms[platform].revenue;
      }

      artistStreams[song.artistId] = (artistStreams[song.artistId] || 0) + plays;
      artistRevenues[song.artistId] = (artistRevenues[song.artistId] || 0) + revenue;
    }

    const artistsWithStats = this.artists.map(artist => {
      const totalStreams = artistStreams[artist.id] || 0;
      const totalRevenue = Number((artistRevenues[artist.id] || 0).toFixed(2));
      const artistSongs = this.songs
        .filter(s => s.artistId === artist.id)
        .sort((a, b) => b.plays - a.plays);
      const topSong = artistSongs[0] ? artistSongs[0].title : "N/A";

      return {
        ...artist,
        totalStreams,
        totalRevenue,
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

  getArtistDetails(artistId) {
    const artist = this.artists.find(a => a.id === artistId);
    if (!artist) return null;

    const artistSongs = this.songs
      .filter(s => s.artistId === artist.id)
      .sort((a, b) => b.plays - a.plays);

    const artistAlbums = this.albums.filter(alb => alb.artistId === artist.id);

    const totalStreams = artistSongs.reduce((sum, s) => sum + s.plays, 0);
    const totalRevenue = Number(artistSongs.reduce((sum, s) => sum + (s.totalRevenue || 0), 0).toFixed(2));

    // Platform aggregation for this artist
    const platformBreakdown = this.platforms.map(plat => {
      let plays = 0;
      let revenue = 0;
      for (const song of artistSongs) {
        if (song.platforms?.[plat.id]) {
          plays += song.platforms[plat.id].plays;
          revenue += song.platforms[plat.id].revenue;
        }
      }
      return {
        id: plat.id,
        name: plat.name,
        color: plat.color,
        plays,
        revenue: Number(revenue.toFixed(2)),
        share: Number(((plays / (totalStreams || 1)) * 100).toFixed(1))
      };
    }).sort((a, b) => b.plays - a.plays);

    return {
      ...artist,
      totalStreams,
      totalRevenue,
      tracks: artistSongs,
      albums: artistAlbums,
      platformBreakdown
    };
  }

  getTopAlbums({ limit = 10 } = {}) {
    const albumsWithMetrics = this.albums.map(album => {
      const albumSongs = this.songs.filter(s => s.albumId === album.id);
      const totalPlays = albumSongs.reduce((acc, s) => acc + s.plays, 0);
      const totalRevenue = Number(albumSongs.reduce((acc, s) => acc + (s.totalRevenue || 0), 0).toFixed(2));
      const topTrack = [...albumSongs].sort((a, b) => b.plays - a.plays)[0];

      return {
        ...album,
        trackCount: albumSongs.length,
        totalPlays,
        totalRevenue,
        topTrack: topTrack ? { id: topTrack.id, title: topTrack.title, plays: topTrack.plays } : null
      };
    });

    albumsWithMetrics.sort((a, b) => b.totalPlays - a.totalPlays);
    return albumsWithMetrics.slice(0, Number(limit));
  }

  getAlbumDetails(albumId) {
    const album = this.albums.find(a => a.id === albumId);
    if (!album) return null;

    const albumSongs = this.songs
      .filter(s => s.albumId === album.id)
      .sort((a, b) => (a.trackNumber || 1) - (b.trackNumber || 1));

    const artist = this.artists.find(a => a.id === album.artistId);
    const totalPlays = albumSongs.reduce((acc, s) => acc + s.plays, 0);
    const totalRevenue = Number(albumSongs.reduce((acc, s) => acc + (s.totalRevenue || 0), 0).toFixed(2));

    // Platform aggregation for this album
    const platformBreakdown = this.platforms.map(plat => {
      let plays = 0;
      let revenue = 0;
      for (const song of albumSongs) {
        if (song.platforms?.[plat.id]) {
          plays += song.platforms[plat.id].plays;
          revenue += song.platforms[plat.id].revenue;
        }
      }
      return {
        id: plat.id,
        name: plat.name,
        color: plat.color,
        plays,
        revenue: Number(revenue.toFixed(2)),
        share: Number(((plays / (totalPlays || 1)) * 100).toFixed(1))
      };
    }).sort((a, b) => b.plays - a.plays);

    return {
      ...album,
      artistDetails: artist,
      tracks: albumSongs,
      totalPlays,
      totalRevenue,
      platformBreakdown
    };
  }

  getPlatformBreakdown() {
    let grandTotalPlays = 0;
    let grandTotalRevenue = 0;

    const platformStats = this.platforms.map(plat => {
      let plays = 0;
      let revenue = 0;

      for (const song of this.songs) {
        if (song.platforms?.[plat.id]) {
          plays += song.platforms[plat.id].plays;
          revenue += song.platforms[plat.id].revenue;
        }
      }

      grandTotalPlays += plays;
      grandTotalRevenue += revenue;

      return {
        ...plat,
        plays,
        revenue: Number(revenue.toFixed(2))
      };
    });

    return platformStats.map(plat => ({
      ...plat,
      sharePercent: Number(((plat.plays / (grandTotalPlays || 1)) * 100).toFixed(1)),
      revenueSharePercent: Number(((plat.revenue / (grandTotalRevenue || 1)) * 100).toFixed(1)),
      avgPayoutPerThousand: Number(((plat.revenue / (plat.plays || 1)) * 1000).toFixed(2))
    })).sort((a, b) => b.plays - a.plays);
  }

  getGenreBreakdown() {
    const genreMap = {};
    let totalPlays = 0;

    for (const song of this.songs) {
      if (!genreMap[song.genre]) {
        genreMap[song.genre] = { name: song.genre, plays: 0, revenue: 0, count: 0 };
      }
      genreMap[song.genre].plays += song.plays;
      genreMap[song.genre].revenue += (song.totalRevenue || 0);
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
        revenue: Number(item.revenue.toFixed(2)),
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

  trackEvent({
    type = "play",
    songId,
    platformId = "spotify",
    country = "United States",
    countryCode = "US",
    device = "Mobile (iOS)",
    user = "anonymous_listener"
  }) {
    const song = this.songs.find(s => s.id === songId) || this.songs[0];
    const artist = this.artists.find(a => a.id === song.artistId);
    const platform = this.platforms.find(p => p.id === platformId) || this.platforms[0];

    const payoutRate = type === "play" ? platform.payoutRate : 0.0;

    if (type === "play") {
      song.plays += 1;
      if (song.platforms?.[platform.id]) {
        song.platforms[platform.id].plays += 1;
        song.platforms[platform.id].revenue = Number((song.platforms[platform.id].revenue + payoutRate).toFixed(4));
      }
      song.totalRevenue = Number(((song.totalRevenue || 0) + payoutRate).toFixed(4));
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
      platform: platform.name,
      platformId: platform.id,
      payout: payoutRate,
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
        totalRevenue: song.totalRevenue,
        skips: song.skips,
        likes: song.likes
      }
    };
  }
}

export const analyticsService = new AnalyticsService();
