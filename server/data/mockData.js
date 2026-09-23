// Realistic seed dataset for Music Analytics Dashboard
// Includes streaming platforms, payout rates, acoustic audio features, album structures, and telemetry.

export const initialPlatforms = [
  {
    id: "spotify",
    name: "Spotify",
    color: "#1db954",
    payoutRate: 0.0038, // $0.0038 per stream
    quality: "320 kbps AAC / Vorbis",
    subscribers: 246000000,
    sharePercent: 44.5,
    tagline: "Global streaming market leader"
  },
  {
    id: "apple_music",
    name: "Apple Music",
    color: "#fa243c",
    payoutRate: 0.0080, // $0.0080 per stream
    quality: "Lossless & Hi-Res (24-bit/192kHz)",
    subscribers: 93000000,
    sharePercent: 24.8,
    tagline: "Spatial Audio & Studio Master"
  },
  {
    id: "youtube_music",
    name: "YouTube Music",
    color: "#ff0000",
    payoutRate: 0.0022, // $0.0022 per stream
    quality: "256 kbps Opus / AAC",
    subscribers: 100000000,
    sharePercent: 14.2,
    tagline: "Video streams & remix ecosystem"
  },
  {
    id: "amazon_music",
    name: "Amazon Music",
    color: "#ff9900",
    payoutRate: 0.0042, // $0.0042 per stream
    quality: "Ultra HD (24-bit/192kHz FLAC)",
    subscribers: 82000000,
    sharePercent: 9.6,
    tagline: "Prime & Unlimited ecosystem"
  },
  {
    id: "tidal",
    name: "Tidal",
    color: "#00ffff",
    payoutRate: 0.0125, // $0.0125 per stream (Highest industry payout)
    quality: "Master Quality Authenticated / FLAC",
    subscribers: 6500000,
    sharePercent: 4.1,
    tagline: "Audiophile-grade direct payouts"
  },
  {
    id: "deezer",
    name: "Deezer",
    color: "#a238ff",
    payoutRate: 0.0055, // $0.0055 per stream
    quality: "HiFi 16-bit/44.1kHz FLAC",
    subscribers: 9800000,
    sharePercent: 2.8,
    tagline: "User-centric payment system"
  }
];

// Helper to distribute song plays across platforms with slight variance
function generatePlatformBreakdown(totalPlays, distributionWeights) {
  const platforms = {};
  let calculatedRevenue = 0;

  const weights = distributionWeights || {
    spotify: 0.44,
    apple_music: 0.25,
    youtube_music: 0.15,
    amazon_music: 0.09,
    tidal: 0.045,
    deezer: 0.025
  };

  const payoutMap = {
    spotify: 0.0038,
    apple_music: 0.0080,
    youtube_music: 0.0022,
    amazon_music: 0.0042,
    tidal: 0.0125,
    deezer: 0.0055
  };

  for (const [platformId, weight] of Object.entries(weights)) {
    const plays = Math.round(totalPlays * weight);
    const revenue = Number((plays * payoutMap[platformId]).toFixed(2));
    platforms[platformId] = {
      plays,
      revenue,
      payoutRate: payoutMap[platformId]
    };
    calculatedRevenue += revenue;
  }

  return { platforms, totalRevenue: Number(calculatedRevenue.toFixed(2)) };
}

export const initialSongs = [
  {
    id: "song-1",
    title: "Midnight City Lights",
    artist: "Aura Lumina",
    artistId: "art-1",
    album: "Neon Horizon",
    albumId: "alb-1",
    trackNumber: 1,
    genre: "Synthwave",
    duration: 218, // seconds
    plays: 1428500,
    skips: 182000,
    likes: 312400,
    completionRate: 87.2,
    releaseDate: "2024-03-15",
    bpm: 124,
    key: "F# Minor",
    isrc: "US-S1Z-24-00101",
    coverColor: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    previewNotes: [440, 554.37, 659.25, 880],
    audioFeatures: {
      danceability: 74,
      energy: 86,
      valence: 68,
      acousticness: 12,
      instrumentalness: 65
    },
    ...generatePlatformBreakdown(1428500, {
      spotify: 0.42,
      apple_music: 0.28,
      youtube_music: 0.12,
      amazon_music: 0.09,
      tidal: 0.06,
      deezer: 0.03
    })
  },
  {
    id: "song-2",
    title: "Echoes in the Rain",
    artist: "Kaelen Voss",
    artistId: "art-2",
    album: "Subtle Whispers",
    albumId: "alb-2",
    trackNumber: 1,
    genre: "Indie Pop",
    duration: 194,
    plays: 1294100,
    skips: 141000,
    likes: 289500,
    completionRate: 89.1,
    releaseDate: "2024-01-22",
    bpm: 108,
    key: "C Major",
    isrc: "GB-AYX-24-00204",
    coverColor: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    previewNotes: [261.63, 329.63, 392.00, 523.25],
    audioFeatures: {
      danceability: 62,
      energy: 58,
      valence: 54,
      acousticness: 68,
      instrumentalness: 18
    },
    // Higher Apple Music & Tidal audience -> Higher revenue per stream!
    ...generatePlatformBreakdown(1294100, {
      spotify: 0.35,
      apple_music: 0.35,
      youtube_music: 0.10,
      amazon_music: 0.10,
      tidal: 0.07,
      deezer: 0.03
    })
  },
  {
    id: "song-3",
    title: "Cybernetic Pulse",
    artist: "Vector Prime",
    artistId: "art-3",
    album: "Overdrive Protocol",
    albumId: "alb-3",
    trackNumber: 1,
    genre: "Cyberpunk",
    duration: 245,
    plays: 1184900,
    skips: 215000,
    likes: 241000,
    completionRate: 81.8,
    releaseDate: "2024-04-02",
    bpm: 140,
    key: "D Minor",
    isrc: "DE-VR7-24-00309",
    coverColor: "linear-gradient(135deg, #10b981, #06b6d4)",
    previewNotes: [293.66, 349.23, 440.00, 587.33],
    audioFeatures: {
      danceability: 82,
      energy: 94,
      valence: 42,
      acousticness: 4,
      instrumentalness: 88
    },
    ...generatePlatformBreakdown(1184900, {
      spotify: 0.46,
      apple_music: 0.22,
      youtube_music: 0.18,
      amazon_music: 0.07,
      tidal: 0.05,
      deezer: 0.02
    })
  },
  {
    id: "song-4",
    title: "Velvet Dreams",
    artist: "Sora & The Moon",
    artistId: "art-4",
    album: "Coffee at 2 AM",
    albumId: "alb-4",
    trackNumber: 1,
    genre: "Lo-Fi Beats",
    duration: 162,
    plays: 987400,
    skips: 92000,
    likes: 219800,
    completionRate: 90.7,
    releaseDate: "2024-02-10",
    bpm: 82,
    key: "E Minor",
    isrc: "JP-SM2-24-00412",
    coverColor: "linear-gradient(135deg, #f59e0b, #ef4444)",
    previewNotes: [329.63, 392.00, 493.88, 659.25],
    audioFeatures: {
      danceability: 58,
      energy: 35,
      valence: 62,
      acousticness: 82,
      instrumentalness: 78
    },
    ...generatePlatformBreakdown(987400, {
      spotify: 0.48,
      apple_music: 0.24,
      youtube_music: 0.16,
      amazon_music: 0.06,
      tidal: 0.03,
      deezer: 0.03
    })
  },
  {
    id: "song-5",
    title: "Golden Hour Mirage",
    artist: "Aura Lumina",
    artistId: "art-1",
    album: "Neon Horizon",
    albumId: "alb-1",
    trackNumber: 2,
    genre: "Synthwave",
    duration: 206,
    plays: 914200,
    skips: 134000,
    likes: 198400,
    completionRate: 85.3,
    releaseDate: "2024-05-18",
    bpm: 118,
    key: "A Major",
    isrc: "US-S1Z-24-00102",
    coverColor: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
    previewNotes: [440, 554.37, 659.25, 740],
    audioFeatures: {
      danceability: 70,
      energy: 78,
      valence: 76,
      acousticness: 18,
      instrumentalness: 42
    },
    ...generatePlatformBreakdown(914200, {
      spotify: 0.40,
      apple_music: 0.32,
      youtube_music: 0.12,
      amazon_music: 0.08,
      tidal: 0.05,
      deezer: 0.03
    })
  },
  {
    id: "song-6",
    title: "Solar Flare",
    artist: "Nova Helix",
    artistId: "art-5",
    album: "Starlight Voyage",
    albumId: "alb-5",
    trackNumber: 1,
    genre: "EDM",
    duration: 232,
    plays: 876300,
    skips: 195000,
    likes: 174000,
    completionRate: 77.7,
    releaseDate: "2024-03-30",
    bpm: 128,
    key: "G Major",
    isrc: "NL-NH9-24-00501",
    coverColor: "linear-gradient(135deg, #f43f5e, #fbbf24)",
    previewNotes: [392.00, 493.88, 587.33, 783.99],
    audioFeatures: {
      danceability: 88,
      energy: 96,
      valence: 82,
      acousticness: 5,
      instrumentalness: 55
    },
    ...generatePlatformBreakdown(876300, {
      spotify: 0.47,
      apple_music: 0.23,
      youtube_music: 0.17,
      amazon_music: 0.07,
      tidal: 0.04,
      deezer: 0.02
    })
  },
  {
    id: "song-7",
    title: "Subterranean Bass",
    artist: "Vector Prime",
    artistId: "art-3",
    album: "Overdrive Protocol",
    albumId: "alb-3",
    trackNumber: 2,
    genre: "Cyberpunk",
    duration: 214,
    plays: 789100,
    skips: 154000,
    likes: 162300,
    completionRate: 80.4,
    releaseDate: "2024-04-14",
    bpm: 135,
    key: "B Minor",
    isrc: "DE-VR7-24-00310",
    coverColor: "linear-gradient(135deg, #10b981, #14b8a6)",
    previewNotes: [246.94, 293.66, 369.99, 493.88],
    audioFeatures: {
      danceability: 79,
      energy: 92,
      valence: 38,
      acousticness: 8,
      instrumentalness: 85
    },
    ...generatePlatformBreakdown(789100, {
      spotify: 0.43,
      apple_music: 0.25,
      youtube_music: 0.16,
      amazon_music: 0.08,
      tidal: 0.05,
      deezer: 0.03
    })
  },
  {
    id: "song-8",
    title: "Autumn Reverie",
    artist: "Kaelen Voss",
    artistId: "art-2",
    album: "Subtle Whispers",
    albumId: "alb-2",
    trackNumber: 2,
    genre: "Indie Pop",
    duration: 188,
    plays: 742000,
    skips: 98000,
    likes: 155000,
    completionRate: 86.8,
    releaseDate: "2024-02-28",
    bpm: 96,
    key: "C# Minor",
    isrc: "GB-AYX-24-00205",
    coverColor: "linear-gradient(135deg, #6366f1, #a855f7)",
    previewNotes: [277.18, 329.63, 415.30, 554.37],
    audioFeatures: {
      danceability: 55,
      energy: 48,
      valence: 46,
      acousticness: 72,
      instrumentalness: 15
    },
    ...generatePlatformBreakdown(742000, {
      spotify: 0.37,
      apple_music: 0.34,
      youtube_music: 0.11,
      amazon_music: 0.10,
      tidal: 0.05,
      deezer: 0.03
    })
  },
  {
    id: "song-9",
    title: "Chilled Lavender",
    artist: "Sora & The Moon",
    artistId: "art-4",
    album: "Coffee at 2 AM",
    albumId: "alb-4",
    trackNumber: 2,
    genre: "Lo-Fi Beats",
    duration: 155,
    plays: 685300,
    skips: 61000,
    likes: 142000,
    completionRate: 91.1,
    releaseDate: "2024-03-05",
    bpm: 80,
    key: "F Major",
    isrc: "JP-SM2-24-00413",
    coverColor: "linear-gradient(135deg, #d946ef, #8b5cf6)",
    previewNotes: [349.23, 440.00, 523.25, 698.46],
    audioFeatures: {
      danceability: 60,
      energy: 32,
      valence: 59,
      acousticness: 86,
      instrumentalness: 80
    },
    ...generatePlatformBreakdown(685300, {
      spotify: 0.49,
      apple_music: 0.22,
      youtube_music: 0.17,
      amazon_music: 0.06,
      tidal: 0.03,
      deezer: 0.03
    })
  },
  {
    id: "song-10",
    title: "Galactic Odyssey",
    artist: "Nova Helix",
    artistId: "art-5",
    album: "Starlight Voyage",
    albumId: "alb-5",
    trackNumber: 2,
    genre: "EDM",
    duration: 250,
    plays: 632100,
    skips: 143000,
    likes: 128400,
    completionRate: 77.3,
    releaseDate: "2024-04-20",
    bpm: 130,
    key: "E Minor",
    isrc: "NL-NH9-24-00502",
    coverColor: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    previewNotes: [329.63, 392.00, 493.88, 659.25],
    audioFeatures: {
      danceability: 84,
      energy: 95,
      valence: 78,
      acousticness: 7,
      instrumentalness: 62
    },
    ...generatePlatformBreakdown(632100, {
      spotify: 0.45,
      apple_music: 0.25,
      youtube_music: 0.16,
      amazon_music: 0.08,
      tidal: 0.04,
      deezer: 0.02
    })
  },
  {
    id: "song-11",
    title: "Silk & Smoke",
    artist: "Maya Chen",
    artistId: "art-6",
    album: "Velvet Horizons",
    albumId: "alb-6",
    trackNumber: 1,
    genre: "R&B / Soul",
    duration: 203,
    plays: 598400,
    skips: 81000,
    likes: 134500,
    completionRate: 86.4,
    releaseDate: "2024-02-14",
    bpm: 90,
    key: "Ab Major",
    isrc: "US-MC4-24-00601",
    coverColor: "linear-gradient(135deg, #f43f5e, #e11d48)",
    previewNotes: [415.30, 519.13, 622.25, 830.61],
    audioFeatures: {
      danceability: 71,
      energy: 52,
      valence: 66,
      acousticness: 44,
      instrumentalness: 10
    },
    ...generatePlatformBreakdown(598400, {
      spotify: 0.38,
      apple_music: 0.36,
      youtube_music: 0.12,
      amazon_music: 0.08,
      tidal: 0.04,
      deezer: 0.02
    })
  },
  {
    id: "song-12",
    title: "Midnight Expressway",
    artist: "Tokyo Drift Collective",
    artistId: "art-7",
    album: "Shuto Expressway 92",
    albumId: "alb-7",
    trackNumber: 1,
    genre: "Synthwave",
    duration: 226,
    plays: 541200,
    skips: 99000,
    likes: 112000,
    completionRate: 81.7,
    releaseDate: "2024-05-01",
    bpm: 122,
    key: "D Minor",
    isrc: "JP-TD9-24-00701",
    coverColor: "linear-gradient(135deg, #06b6d4, #10b981)",
    previewNotes: [293.66, 349.23, 440.00, 587.33],
    audioFeatures: {
      danceability: 76,
      energy: 88,
      valence: 62,
      acousticness: 14,
      instrumentalness: 72
    },
    ...generatePlatformBreakdown(541200, {
      spotify: 0.44,
      apple_music: 0.26,
      youtube_music: 0.15,
      amazon_music: 0.08,
      tidal: 0.04,
      deezer: 0.03
    })
  }
];

export const initialAlbums = [
  {
    id: "alb-1",
    title: "Neon Horizon",
    artist: "Aura Lumina",
    artistId: "art-1",
    releaseYear: 2024,
    genre: "Synthwave",
    coverColor: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    trackIds: ["song-1", "song-5"],
    description: "A luminous journey across nocturnal skylines, combining analog Roland synths with driving 80s drum machines."
  },
  {
    id: "alb-2",
    title: "Subtle Whispers",
    artist: "Kaelen Voss",
    artistId: "art-2",
    releaseYear: 2024,
    genre: "Indie Pop",
    coverColor: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    trackIds: ["song-2", "song-8"],
    description: "An intimate acoustic exploration of rain-drenched streets, melancholy string arrangements, and vulnerable poetry."
  },
  {
    id: "alb-3",
    title: "Overdrive Protocol",
    artist: "Vector Prime",
    artistId: "art-3",
    releaseYear: 2024,
    genre: "Cyberpunk",
    coverColor: "linear-gradient(135deg, #10b981, #06b6d4)",
    trackIds: ["song-3", "song-7"],
    description: "Dystopian industrial basslines and glitched modular synthesis engineered for high-octane cybernetic adrenaline."
  },
  {
    id: "alb-4",
    title: "Coffee at 2 AM",
    artist: "Sora & The Moon",
    artistId: "art-4",
    releaseYear: 2024,
    genre: "Lo-Fi Beats",
    coverColor: "linear-gradient(135deg, #f59e0b, #ef4444)",
    trackIds: ["song-4", "song-9"],
    description: "Late-night tape-saturated chords, vinyl crackle, and gentle Fender Rhodes keys for deep contemplation."
  },
  {
    id: "alb-5",
    title: "Starlight Voyage",
    artist: "Nova Helix",
    artistId: "art-5",
    releaseYear: 2024,
    genre: "EDM",
    coverColor: "linear-gradient(135deg, #f43f5e, #fbbf24)",
    trackIds: ["song-6", "song-10"],
    description: "Stadium-sized progressive drops, sparkling supersaws, and euphoric festival anthems engineered for cosmic heights."
  },
  {
    id: "alb-6",
    title: "Velvet Horizons",
    artist: "Maya Chen",
    artistId: "art-6",
    releaseYear: 2024,
    genre: "R&B / Soul",
    coverColor: "linear-gradient(135deg, #f43f5e, #e11d48)",
    trackIds: ["song-11"],
    description: "Warm contemporary R&B layered with velvety vocal harmonies, sub-bass grooves, and neo-soul jazz inflections."
  },
  {
    id: "alb-7",
    title: "Shuto Expressway 92",
    artist: "Tokyo Drift Collective",
    artistId: "art-7",
    releaseYear: 2024,
    genre: "Synthwave",
    coverColor: "linear-gradient(135deg, #06b6d4, #10b981)",
    trackIds: ["song-12"],
    description: "High-speed highway outrun anthems inspired by midnight cruising through Tokyo's illuminated Metropolitan Expressway."
  }
];

export const initialArtists = [
  {
    id: "art-1",
    name: "Aura Lumina",
    verified: true,
    monthlyListeners: 2450000,
    followers: 894000,
    country: "Sweden",
    primaryGenre: "Synthwave",
    growthRate: 14.8,
    avatarColor: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    bio: "Pioneering atmospheric retro-futuristic soundscapes with analog synthesis and cinematic depth.",
    albumIds: ["alb-1"]
  },
  {
    id: "art-2",
    name: "Kaelen Voss",
    verified: true,
    monthlyListeners: 2120000,
    followers: 742000,
    country: "United Kingdom",
    primaryGenre: "Indie Pop",
    growthRate: 11.2,
    avatarColor: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    bio: "Introspective lyrical narratives combined with lush acoustic guitars and ambient reverberation.",
    albumIds: ["alb-2"]
  },
  {
    id: "art-3",
    name: "Vector Prime",
    verified: true,
    monthlyListeners: 1980000,
    followers: 680000,
    country: "Germany",
    primaryGenre: "Cyberpunk",
    growthRate: 18.5,
    avatarColor: "linear-gradient(135deg, #10b981, #0ea5e9)",
    bio: "Industrial dystopian beats driven by modular Eurorack rigs and glitch aesthetics.",
    albumIds: ["alb-3"]
  },
  {
    id: "art-4",
    name: "Sora & The Moon",
    verified: true,
    monthlyListeners: 1750000,
    followers: 610000,
    country: "Japan",
    primaryGenre: "Lo-Fi Beats",
    growthRate: 9.4,
    avatarColor: "linear-gradient(135deg, #f59e0b, #ef4444)",
    bio: "Nostalgic piano melodies and rain samples designed for late-night focus and tranquil moments.",
    albumIds: ["alb-4"]
  },
  {
    id: "art-5",
    name: "Nova Helix",
    verified: true,
    monthlyListeners: 1610000,
    followers: 520000,
    country: "Netherlands",
    primaryGenre: "EDM",
    growthRate: 16.3,
    avatarColor: "linear-gradient(135deg, #f43f5e, #8b5cf6)",
    bio: "Festival headliner producing euphoric progressive drops and high-energy bass anthems.",
    albumIds: ["alb-5"]
  },
  {
    id: "art-6",
    name: "Maya Chen",
    verified: true,
    monthlyListeners: 1240000,
    followers: 430000,
    country: "United States",
    primaryGenre: "R&B / Soul",
    growthRate: 12.0,
    avatarColor: "linear-gradient(135deg, #f43f5e, #fb923c)",
    bio: "Silky contemporary neo-soul vocals laced with jazzy Rhodes chords and deep sub-bass.",
    albumIds: ["alb-6"]
  },
  {
    id: "art-7",
    name: "Tokyo Drift Collective",
    verified: false,
    monthlyListeners: 980000,
    followers: 320000,
    country: "Japan",
    primaryGenre: "Synthwave",
    growthRate: 21.4,
    avatarColor: "linear-gradient(135deg, #06b6d4, #10b981)",
    bio: "Underground midnight car club producer collective synthesizing fast outrun energy.",
    albumIds: ["alb-7"]
  }
];

export const initialDeviceBreakdown = [
  { device: "Mobile (iOS)", percentage: 48.2, count: 1824000, color: "#10b981" },
  { device: "Mobile (Android)", percentage: 34.1, count: 1290000, color: "#06b6d4" },
  { device: "Desktop App", percentage: 11.4, count: 431000, color: "#8b5cf6" },
  { device: "Web Player", percentage: 4.8, count: 181000, color: "#f59e0b" },
  { device: "Smart Speaker / TV", percentage: 1.5, count: 56700, color: "#ec4899" }
];

export const initialCountryBreakdown = [
  { country: "United States", code: "US", plays: 3420000, percentage: 32.5, flag: "🇺🇸" },
  { country: "United Kingdom", code: "GB", plays: 1540000, percentage: 14.6, flag: "🇬🇧" },
  { country: "Germany", code: "DE", plays: 1280000, percentage: 12.2, flag: "🇩🇪" },
  { country: "Japan", code: "JP", plays: 980000, percentage: 9.3, flag: "🇯🇵" },
  { country: "Brazil", code: "BR", plays: 820000, percentage: 7.8, flag: "🇧🇷" },
  { country: "Canada", code: "CA", plays: 710000, percentage: 6.7, flag: "🇨🇦" },
  { country: "Australia", code: "AU", plays: 590000, percentage: 5.6, flag: "🇦🇺" },
  { country: "Others", code: "XX", plays: 1190000, percentage: 11.3, flag: "🌍" }
];

export const seedRecentActivity = [
  {
    id: "evt-101",
    type: "play",
    platform: "Spotify",
    platformId: "spotify",
    payout: 0.0038,
    songId: "song-1",
    songTitle: "Midnight City Lights",
    artist: "Aura Lumina",
    user: "alex_99",
    device: "Mobile (iOS)",
    country: "United States",
    countryCode: "US",
    timestamp: new Date(Date.now() - 12000).toISOString()
  },
  {
    id: "evt-102",
    type: "play",
    platform: "Apple Music",
    platformId: "apple_music",
    payout: 0.0080,
    songId: "song-2",
    songTitle: "Echoes in the Rain",
    artist: "Kaelen Voss",
    user: "sarah_m",
    device: "Desktop App",
    country: "United Kingdom",
    countryCode: "GB",
    timestamp: new Date(Date.now() - 25000).toISOString()
  },
  {
    id: "evt-103",
    type: "play",
    platform: "Tidal",
    platformId: "tidal",
    payout: 0.0125,
    songId: "song-3",
    songTitle: "Cybernetic Pulse",
    artist: "Vector Prime",
    user: "matrix_runner",
    device: "Mobile (Android)",
    country: "Germany",
    countryCode: "DE",
    timestamp: new Date(Date.now() - 42000).toISOString()
  },
  {
    id: "evt-104",
    type: "skip",
    platform: "YouTube Music",
    platformId: "youtube_music",
    payout: 0.0,
    songId: "song-6",
    songTitle: "Solar Flare",
    artist: "Nova Helix",
    user: "lucas_dj",
    device: "Mobile (iOS)",
    country: "Brazil",
    countryCode: "BR",
    timestamp: new Date(Date.now() - 58000).toISOString()
  },
  {
    id: "evt-105",
    type: "play",
    platform: "Amazon Music",
    platformId: "amazon_music",
    payout: 0.0042,
    songId: "song-4",
    songTitle: "Velvet Dreams",
    artist: "Sora & The Moon",
    user: "kenji_t",
    device: "Web Player",
    country: "Japan",
    countryCode: "JP",
    timestamp: new Date(Date.now() - 75000).toISOString()
  },
  {
    id: "evt-106",
    type: "like",
    platform: "Apple Music",
    platformId: "apple_music",
    payout: 0.0,
    songId: "song-1",
    songTitle: "Midnight City Lights",
    artist: "Aura Lumina",
    user: "elena_sound",
    device: "Mobile (iOS)",
    country: "Canada",
    countryCode: "CA",
    timestamp: new Date(Date.now() - 92000).toISOString()
  }
];
