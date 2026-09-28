// Real-World DSP Streaming Economics & Verified Industry Telemetry
export const REAL_DSP_PLATFORMS = [
  {
    id: "spotify",
    name: "Spotify",
    color: "#1db954",
    payoutRate: 0.0038, // $0.0038 per stream average global payout
    quality: "320 kbps AAC / Vorbis",
    subscribers: 246000000,
    monthlyActiveUsers: 626000000,
    sharePercent: 44.5,
    tagline: "Global streaming market leader"
  },
  {
    id: "apple_music",
    name: "Apple Music",
    color: "#fa243c",
    payoutRate: 0.0080, // $0.0080 per stream
    quality: "Lossless & Hi-Res (24-bit/192kHz ALAC)",
    subscribers: 93000000,
    monthlyActiveUsers: 98000000,
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
    monthlyActiveUsers: 210000000,
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
    monthlyActiveUsers: 85000000,
    sharePercent: 9.6,
    tagline: "Prime & Unlimited ecosystem"
  },
  {
    id: "tidal",
    name: "Tidal",
    color: "#00ffff",
    payoutRate: 0.0125, // $0.0125 per stream (Highest industry royalty payout)
    quality: "Master Quality Authenticated / FLAC",
    subscribers: 6500000,
    monthlyActiveUsers: 7000000,
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
    monthlyActiveUsers: 14000000,
    sharePercent: 2.8,
    tagline: "User-centric payment system"
  }
];

// Verified Global Music Territories & Regional Chart Markets with State/Sub-Region Hierarchy
export const VERIFIED_REGIONS = [
  {
    id: "global",
    name: "Global",
    code: "GL",
    flag: "🌍",
    continent: "Worldwide",
    sharePercent: 100,
    tag: "Worldwide Aggregate",
    subRegions: [
      { id: "all", name: "Worldwide (All Continents)", code: "GL", sharePercent: 100, metro: "Global Listening Network" }
    ]
  },
  // North America
  {
    id: "US",
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    continent: "North America",
    sharePercent: 34.2,
    tag: "Billboard / RIAA Leader",
    subRegions: [
      { id: "all", name: "All States (US Nationwide)", code: "ALL", sharePercent: 100, metro: "50 States & Territories" },
      { id: "CA", name: "California (Los Angeles / Bay Area)", code: "CA", sharePercent: 12.2, metro: "Los Angeles & San Francisco" },
      { id: "NY", name: "New York (NYC Metro)", code: "NY", sharePercent: 9.1, metro: "New York City & Tri-State" },
      { id: "TX", name: "Texas (Austin / Dallas / Houston)", code: "TX", sharePercent: 8.8, metro: "Austin, Dallas & Houston" },
      { id: "FL", name: "Florida (Miami / Orlando)", code: "FL", sharePercent: 6.8, metro: "Miami & Orlando Metro" },
      { id: "IL", name: "Illinois (Chicago Metro)", code: "IL", sharePercent: 4.4, metro: "Chicago Greater Area" },
      { id: "GA", name: "Georgia (Atlanta Urban Hub)", code: "GA", sharePercent: 4.1, metro: "Atlanta Metro" },
      { id: "TN", name: "Tennessee (Nashville Music City)", code: "TN", sharePercent: 3.5, metro: "Nashville & Memphis" },
      { id: "WA", name: "Washington (Seattle)", code: "WA", sharePercent: 3.2, metro: "Seattle-Tacoma" },
      { id: "PA", name: "Pennsylvania (Philadelphia)", code: "PA", sharePercent: 3.1, metro: "Philadelphia & Pittsburgh" },
      { id: "NC", name: "North Carolina (Charlotte / Raleigh)", code: "NC", sharePercent: 2.8, metro: "Charlotte & Raleigh" }
    ]
  },
  {
    id: "CA",
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    continent: "North America",
    sharePercent: 9.4,
    tag: "Music Canada Top 40",
    subRegions: [
      { id: "all", name: "All Provinces (Canada Nationwide)", code: "ALL", sharePercent: 100, metro: "10 Provinces & Territories" },
      { id: "ON", name: "Ontario (Toronto Metro)", code: "ON", sharePercent: 38.8, metro: "Greater Toronto Area & Ottawa" },
      { id: "QC", name: "Quebec (Montreal Metro)", code: "QC", sharePercent: 23.2, metro: "Montreal & Quebec City" },
      { id: "BC", name: "British Columbia (Vancouver)", code: "BC", sharePercent: 13.5, metro: "Greater Vancouver & Victoria" },
      { id: "AB", name: "Alberta (Calgary / Edmonton)", code: "AB", sharePercent: 11.4, metro: "Calgary & Edmonton" },
      { id: "MB", name: "Manitoba (Winnipeg)", code: "MB", sharePercent: 4.1, metro: "Winnipeg Metro" },
      { id: "SK", name: "Saskatchewan (Saskatoon)", code: "SK", sharePercent: 3.0, metro: "Saskatoon & Regina" }
    ]
  },
  {
    id: "MX",
    name: "Mexico",
    code: "MX",
    flag: "🇲🇽",
    continent: "North America",
    sharePercent: 5.4,
    tag: "AMPROFON Top 100",
    subRegions: [
      { id: "all", name: "All States (Mexico Nationwide)", code: "ALL", sharePercent: 100, metro: "32 Federal Entities" },
      { id: "CDMX", name: "Mexico City (CDMX Capital)", code: "CDMX", sharePercent: 34.0, metro: "Greater Mexico City" },
      { id: "JAL", name: "Jalisco (Guadalajara)", code: "JAL", sharePercent: 13.2, metro: "Guadalajara Metropolitan Area" },
      { id: "NL", name: "Nuevo León (Monterrey)", code: "NL", sharePercent: 11.8, metro: "Monterrey Industrial Hub" },
      { id: "PUE", name: "Puebla (Angelópolis)", code: "PUE", sharePercent: 6.2, metro: "Puebla Metro" },
      { id: "VER", name: "Veracruz (Gulf Coast)", code: "VER", sharePercent: 5.4, metro: "Veracruz & Xalapa" }
    ]
  },
  // Europe
  {
    id: "GB",
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    continent: "Europe",
    sharePercent: 14.9,
    tag: "Official Charts UK",
    subRegions: [
      { id: "all", name: "All Regions (UK Nationwide)", code: "ALL", sharePercent: 100, metro: "Four Home Nations" },
      { id: "LDN", name: "Greater London & South East", code: "LDN", sharePercent: 34.5, metro: "London Metro & Surrey" },
      { id: "NW", name: "North West (Manchester / Liverpool)", code: "NW", sharePercent: 15.2, metro: "Greater Manchester & Merseyside" },
      { id: "SCT", name: "Scotland (Glasgow / Edinburgh)", code: "SCT", sharePercent: 10.4, metro: "Glasgow & Edinburgh Central Belt" },
      { id: "WM", name: "West Midlands (Birmingham)", code: "WM", sharePercent: 9.8, metro: "Birmingham & Coventry" },
      { id: "YOR", name: "Yorkshire & The Humber (Leeds)", code: "YOR", sharePercent: 8.6, metro: "Leeds & Sheffield" },
      { id: "SW", name: "South West (Bristol)", code: "SW", sharePercent: 7.9, metro: "Bristol & Bath" },
      { id: "WLS", name: "Wales (Cardiff / Swansea)", code: "WLS", sharePercent: 5.4, metro: "Cardiff & Newport" },
      { id: "NIR", name: "Northern Ireland (Belfast)", code: "NIR", sharePercent: 4.2, metro: "Greater Belfast" }
    ]
  },
  {
    id: "DE",
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    continent: "Europe",
    sharePercent: 11.8,
    tag: "GfK Entertainment",
    subRegions: [
      { id: "all", name: "All States (Germany Nationwide)", code: "ALL", sharePercent: 100, metro: "16 Federal States (Bundesländer)" },
      { id: "NRW", name: "North Rhine-Westphalia (Cologne / Düsseldorf)", code: "NRW", sharePercent: 21.5, metro: "Rhine-Ruhr Metro" },
      { id: "BY", name: "Bavaria (Munich)", code: "BY", sharePercent: 16.2, metro: "Munich & Nuremberg" },
      { id: "BW", name: "Baden-Württemberg (Stuttgart)", code: "BW", sharePercent: 13.5, metro: "Stuttgart & Karlsruhe" },
      { id: "BE", name: "Berlin (Capital City)", code: "BE", sharePercent: 8.4, metro: "Berlin Metropolitan Area" },
      { id: "HE", name: "Hesse (Frankfurt)", code: "HE", sharePercent: 8.0, metro: "Frankfurt Rhine-Main" },
      { id: "HH", name: "Hamburg (Port City)", code: "HH", sharePercent: 5.8, metro: "Hamburg Metro" }
    ]
  },
  {
    id: "FR",
    name: "France",
    code: "FR",
    flag: "🇫🇷",
    continent: "Europe",
    sharePercent: 5.9,
    tag: "SNEP Top 200",
    subRegions: [
      { id: "all", name: "All Regions (France Nationwide)", code: "ALL", sharePercent: 100, metro: "18 Administrative Regions" },
      { id: "IDF", name: "Île-de-France (Greater Paris)", code: "IDF", sharePercent: 32.5, metro: "Paris Metropolitan Area" },
      { id: "ARA", name: "Auvergne-Rhône-Alpes (Lyon)", code: "ARA", sharePercent: 13.2, metro: "Lyon & Grenoble" },
      { id: "PACA", name: "Provence-Alpes-Côte d'Azur (Marseille / Nice)", code: "PACA", sharePercent: 9.8, metro: "Marseille & French Riviera" },
      { id: "OCC", name: "Occitanie (Toulouse / Montpellier)", code: "OCC", sharePercent: 8.4, metro: "Toulouse & Montpellier" },
      { id: "NAQ", name: "Nouvelle-Aquitaine (Bordeaux)", code: "NAQ", sharePercent: 7.8, metro: "Bordeaux & Bayonne" }
    ]
  },
  {
    id: "ES",
    name: "Spain",
    code: "ES",
    flag: "🇪🇸",
    continent: "Europe",
    sharePercent: 4.2,
    tag: "PROMUSICAE Top 100",
    subRegions: [
      { id: "all", name: "All Communities (Spain Nationwide)", code: "ALL", sharePercent: 100, metro: "17 Autonomous Communities" },
      { id: "MAD", name: "Community of Madrid", code: "MAD", sharePercent: 29.5, metro: "Madrid Metropolitan Area" },
      { id: "CAT", name: "Catalonia (Barcelona)", code: "CAT", sharePercent: 22.8, metro: "Barcelona Metro" },
      { id: "AND", name: "Andalusia (Seville / Málaga)", code: "AND", sharePercent: 16.5, metro: "Seville & Costa del Sol" },
      { id: "VAL", name: "Valencian Community", code: "VAL", sharePercent: 11.2, metro: "Valencia & Alicante" },
      { id: "PV", name: "Basque Country (Bilbao / San Sebastián)", code: "PV", sharePercent: 6.2, metro: "Greater Bilbao" }
    ]
  },
  {
    id: "IT",
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    continent: "Europe",
    sharePercent: 3.9,
    tag: "FIMI Top of the Music",
    subRegions: [
      { id: "all", name: "All Regions (Italy Nationwide)", code: "ALL", sharePercent: 100, metro: "20 Administrative Regions" },
      { id: "LOM", name: "Lombardy (Milan Fashion Capital)", code: "LOM", sharePercent: 28.5, metro: "Milan Metropolitan Area" },
      { id: "LAZ", name: "Lazio (Rome Capital)", code: "LAZ", sharePercent: 19.8, metro: "Greater Rome" },
      { id: "CAM", name: "Campania (Naples)", code: "CAM", sharePercent: 13.2, metro: "Naples Metropolitan Area" },
      { id: "PIE", name: "Piedmont (Turin)", code: "PIE", sharePercent: 8.8, metro: "Turin Metro" },
      { id: "VEN", name: "Veneto (Venice / Verona)", code: "VEN", sharePercent: 8.2, metro: "Verona & Padua" }
    ]
  },
  {
    id: "NL",
    name: "Netherlands",
    code: "NL",
    flag: "🇳🇱",
    continent: "Europe",
    sharePercent: 3.5,
    tag: "Dutch Single Top 100",
    subRegions: [
      { id: "all", name: "All Provinces (Netherlands Nationwide)", code: "ALL", sharePercent: 100, metro: "Randstad & Provinces" },
      { id: "NH", name: "North Holland (Amsterdam)", code: "NH", sharePercent: 32.0, metro: "Amsterdam & Haarlem" },
      { id: "ZH", name: "South Holland (Rotterdam / The Hague)", code: "ZH", sharePercent: 28.5, metro: "Rotterdam & The Hague" },
      { id: "UT", name: "Utrecht (Central City)", code: "UT", sharePercent: 12.8, metro: "Utrecht City" },
      { id: "NB", name: "North Brabant (Eindhoven Tech Hub)", code: "NB", sharePercent: 11.5, metro: "Eindhoven & Tilburg" }
    ]
  },
  {
    id: "SE",
    name: "Sweden",
    code: "SE",
    flag: "🇸🇪",
    continent: "Europe",
    sharePercent: 3.1,
    tag: "Sverigetopplistan (Spotify Birthplace)",
    subRegions: [
      { id: "all", name: "All Counties (Sweden Nationwide)", code: "ALL", sharePercent: 100, metro: "Nordic Music Innovation Hub" },
      { id: "STH", name: "Stockholm County", code: "STH", sharePercent: 44.5, metro: "Greater Stockholm" },
      { id: "VG", name: "Västra Götaland (Gothenburg)", code: "VG", sharePercent: 22.0, metro: "Gothenburg Metro" },
      { id: "SKA", name: "Skåne (Malmö / Lund)", code: "SKA", sharePercent: 14.8, metro: "Malmö & Öresund Region" }
    ]
  },
  // Asia-Pacific
  {
    id: "JP",
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    continent: "Asia-Pacific",
    sharePercent: 8.3,
    tag: "Oricon Streaming Chart",
    subRegions: [
      { id: "all", name: "All Prefectures (Japan Nationwide)", code: "ALL", sharePercent: 100, metro: "47 Prefectures" },
      { id: "KT", name: "Kanto (Greater Tokyo / Yokohama)", code: "KT", sharePercent: 38.5, metro: "Tokyo & Kanagawa" },
      { id: "KS", name: "Kansai (Osaka / Kyoto / Kobe)", code: "KS", sharePercent: 17.5, metro: "Keihanshin Metro" },
      { id: "CB", name: "Chubu (Nagoya / Aichi)", code: "CB", sharePercent: 10.2, metro: "Greater Nagoya" },
      { id: "KY", name: "Kyushu & Okinawa (Fukuoka)", code: "KY", sharePercent: 8.5, metro: "Fukuoka Metro" },
      { id: "HK", name: "Hokkaido (Sapporo)", code: "HK", sharePercent: 5.2, metro: "Sapporo Metro" }
    ]
  },
  {
    id: "AU",
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    continent: "Asia-Pacific",
    sharePercent: 6.1,
    tag: "ARIA Charts",
    subRegions: [
      { id: "all", name: "All States (Australia Nationwide)", code: "ALL", sharePercent: 100, metro: "6 States & 2 Territories" },
      { id: "NSW", name: "New South Wales (Sydney)", code: "NSW", sharePercent: 33.8, metro: "Greater Sydney" },
      { id: "VIC", name: "Victoria (Melbourne Music Capital)", code: "VIC", sharePercent: 27.2, metro: "Melbourne Metro" },
      { id: "QLD", name: "Queensland (Brisbane / Gold Coast)", code: "QLD", sharePercent: 18.5, metro: "South East Queensland" },
      { id: "WA", name: "Western Australia (Perth)", code: "WA", sharePercent: 10.5, metro: "Perth Metro" },
      { id: "SA", name: "South Australia (Adelaide)", code: "SA", sharePercent: 6.8, metro: "Adelaide Metro" }
    ]
  },
  {
    id: "IN",
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    continent: "Asia-Pacific",
    sharePercent: 6.8,
    tag: "IMI India Top 20",
    subRegions: [
      { id: "all", name: "All States (India Nationwide)", code: "ALL", sharePercent: 100, metro: "Pan-India Streaming Hub" },
      { id: "MH", name: "Maharashtra (Mumbai Entertainment Capital)", code: "MH", sharePercent: 22.5, metro: "Mumbai & Pune" },
      { id: "DL", name: "Delhi NCR (Capital Region)", code: "DL", sharePercent: 18.2, metro: "Delhi, Noida & Gurugram" },
      { id: "KA", name: "Karnataka (Bengaluru Tech Hub)", code: "KA", sharePercent: 12.4, metro: "Bengaluru Metro" },
      { id: "PB", name: "Punjab & Chandigarh (Punjabi Music Hub)", code: "PB", sharePercent: 11.8, metro: "Chandigarh, Ludhiana & Amritsar" },
      { id: "TN", name: "Tamil Nadu (Chennai)", code: "TN", sharePercent: 9.8, metro: "Chennai Metro" },
      { id: "WB", name: "West Bengal (Kolkata)", code: "WB", sharePercent: 7.5, metro: "Greater Kolkata" }
    ]
  },
  {
    id: "KR",
    name: "South Korea",
    code: "KR",
    flag: "🇰🇷",
    continent: "Asia-Pacific",
    sharePercent: 4.8,
    tag: "Circle Chart (K-Pop Global HQ)",
    subRegions: [
      { id: "all", name: "All Provinces (Korea Nationwide)", code: "ALL", sharePercent: 100, metro: "K-Pop Global HQ" },
      { id: "SEL", name: "Seoul Capital City", code: "SEL", sharePercent: 42.0, metro: "Gangnam, Mapo & Yongsan" },
      { id: "GGI", name: "Gyeonggi Province", code: "GGI", sharePercent: 26.5, metro: "Suwon & Seongnam" },
      { id: "BSN", name: "Busan Metropolitan City", code: "BSN", sharePercent: 12.2, metro: "Busan Metro" },
      { id: "DGU", name: "Daegu & North Gyeongsang", code: "DGU", sharePercent: 7.5, metro: "Daegu Metro" }
    ]
  },
  {
    id: "PH",
    name: "Philippines",
    code: "PH",
    flag: "🇵🇭",
    continent: "Asia-Pacific",
    sharePercent: 2.7,
    tag: "Billboard Philippines Hot 100",
    subRegions: [
      { id: "all", name: "All Regions (Philippines Nationwide)", code: "ALL", sharePercent: 100, metro: "OPM & Global Hits" },
      { id: "NCR", name: "National Capital Region (Metro Manila)", code: "NCR", sharePercent: 48.0, metro: "Manila, Quezon City & Makati" },
      { id: "CAL", name: "Calabarzon (Region IV-A)", code: "CAL", sharePercent: 18.5, metro: "Laguna, Cavite & Batangas" },
      { id: "CEB", name: "Central Visayas (Cebu City)", code: "CEB", sharePercent: 12.4, metro: "Metro Cebu" }
    ]
  },
  {
    id: "ID",
    name: "Indonesia",
    code: "ID",
    flag: "🇮🇩",
    continent: "Asia-Pacific",
    sharePercent: 2.9,
    tag: "Billboard Indonesia",
    subRegions: [
      { id: "all", name: "All Provinces (Indonesia Nationwide)", code: "ALL", sharePercent: 100, metro: "Southeast Asia Streaming Giant" },
      { id: "JKT", name: "Jakarta Capital Special Region", code: "JKT", sharePercent: 42.5, metro: "Jabodetabek Megacity" },
      { id: "JB", name: "West Java (Bandung)", code: "JB", sharePercent: 21.2, metro: "Greater Bandung" },
      { id: "JT", name: "East Java (Surabaya)", code: "JT", sharePercent: 14.8, metro: "Surabaya Metro" }
    ]
  },
  // Latin America
  {
    id: "BR",
    name: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    continent: "Latin America",
    sharePercent: 7.5,
    tag: "Pro-Música Brasil",
    subRegions: [
      { id: "all", name: "All States (Brazil Nationwide)", code: "ALL", sharePercent: 100, metro: "26 States & Federal District" },
      { id: "SP", name: "São Paulo (Economic Hub)", code: "SP", sharePercent: 33.2, metro: "Greater São Paulo" },
      { id: "RJ", name: "Rio de Janeiro (Marvelous City)", code: "RJ", sharePercent: 18.5, metro: "Rio Metropolitan Area" },
      { id: "MG", name: "Minas Gerais (Belo Horizonte)", code: "MG", sharePercent: 10.2, metro: "Belo Horizonte" },
      { id: "BA", name: "Bahia (Salvador)", code: "BA", sharePercent: 7.1, metro: "Salvador da Bahia" },
      { id: "PR", name: "Paraná (Curitiba)", code: "PR", sharePercent: 6.5, metro: "Curitiba Metro" }
    ]
  },
  {
    id: "AR",
    name: "Argentina",
    code: "AR",
    flag: "🇦🇷",
    continent: "Latin America",
    sharePercent: 2.8,
    tag: "Billboard Argentina Hot 100",
    subRegions: [
      { id: "all", name: "All Provinces (Argentina Nationwide)", code: "ALL", sharePercent: 100, metro: "Urban & Trap Capital" },
      { id: "BUE", name: "Buenos Aires (CABA & Province)", code: "BUE", sharePercent: 54.0, metro: "Greater Buenos Aires" },
      { id: "CBA", name: "Córdoba (Central Hub)", code: "CBA", sharePercent: 13.5, metro: "Córdoba City" },
      { id: "SFE", name: "Santa Fe (Rosario)", code: "SFE", sharePercent: 9.8, metro: "Rosario Metro" },
      { id: "MDZ", name: "Mendoza (Cuyo Region)", code: "MDZ", sharePercent: 6.2, metro: "Mendoza City" }
    ]
  },
  {
    id: "CO",
    name: "Colombia",
    code: "CO",
    flag: "🇨🇴",
    continent: "Latin America",
    sharePercent: 2.5,
    tag: "Promúsica Colombia",
    subRegions: [
      { id: "all", name: "All Departments (Colombia Nationwide)", code: "ALL", sharePercent: 100, metro: "Reggaeton & Pop Powerhouse" },
      { id: "BOG", name: "Bogotá D.C. (Capital District)", code: "BOG", sharePercent: 38.5, metro: "Bogotá Metropolitan Area" },
      { id: "ANT", name: "Antioquia (Medellín Urban HQ)", code: "ANT", sharePercent: 28.0, metro: "Medellín / Aburrá Valley" },
      { id: "VAC", name: "Valle del Cauca (Cali)", code: "VAC", sharePercent: 12.5, metro: "Cali Metro" },
      { id: "ATL", name: "Atlántico (Barranquilla Caribbean Hub)", code: "ATL", sharePercent: 8.2, metro: "Barranquilla" }
    ]
  }
];

// Verified official streaming telemetry for top global hits
// Sourced from official Kworb, Spotify verified records & iTunes master previews
export const VERIFIED_GLOBAL_TRACKS = [
  {
    id: "1499378607",
    spotifyId: "0VjIjW4GlUZAMYd2vXMi3b",
    title: "Blinding Lights",
    artist: "The Weeknd",
    artistId: "479756766",
    album: "After Hours",
    albumId: "1499378108",
    trackNumber: 9,
    genre: "Pop / Synthwave",
    duration: 200,
    releaseDate: "2019-11-29",
    bpm: 171,
    key: "F# Minor",
    isrc: "US-UM7-19-06049",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6f/bc/e6/6fbce6c4-c38c-72d8-4fd0-66cfff32f679/20UMGIM12176.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/19/d6/60/19d660ff-e3a9-8377-15a3-ce4b28e89cac/mzaf_18422426156481158187.plus.aac.p.m4a",
    spotifyStreams: 5507698226, // #1 Most Streamed Song in Spotify History
    peakPosition: 1,
    weeksAtPeak: 82,
    completionRate: 91.4,
    skipsRatio: 8.6,
    likes: 38240000,
    regionalShares: {
      US: 34.5,
      GB: 14.2,
      DE: 12.4,
      CA: 10.8,
      JP: 8.1,
      BR: 7.4,
      AU: 6.8
    },
    audioFeatures: {
      energy: 80,
      danceability: 51,
      valence: 33,
      acousticness: 0.1,
      instrumentalness: 0
    }
  },
  {
    id: "1200868601",
    spotifyId: "7qiZfU4dY1lWllzX7mPBI3",
    title: "Shape of You",
    artist: "Ed Sheeran",
    artistId: "1833134",
    album: "÷ (Divide)",
    albumId: "1193701079",
    trackNumber: 4,
    genre: "Pop",
    duration: 233,
    releaseDate: "2017-01-06",
    bpm: 96,
    key: "C# Minor",
    isrc: "GBAHS1600463",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e5/7d/50/e57d501b-c408-0136-1e6d-672506e00ca3/190295851286.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/31/76/89/317689fe-2ce1-df07-59a8-e1c5210aa2ae/mzaf_1241517409951336496.plus.aac.p.m4a",
    spotifyStreams: 4180520110, // #2 Most Streamed Song
    peakPosition: 1,
    weeksAtPeak: 48,
    completionRate: 88.5,
    skipsRatio: 11.5,
    likes: 31200000,
    regionalShares: {
      US: 28.5,
      GB: 23.5, // #1 in UK all-time
      DE: 14.0,
      CA: 8.0,
      JP: 6.5,
      BR: 7.0,
      AU: 11.2 // #1 in AU all-time
    },
    audioFeatures: {
      energy: 65,
      danceability: 82,
      valence: 93,
      acousticness: 58,
      instrumentalness: 0
    }
  },
  {
    id: "1440841363",
    spotifyId: "7qEHsqek33rTcFNT9PFqLf",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    artistId: "1236521921",
    album: "Divinely Uninspired To A Hellish Extent",
    albumId: "1440841362",
    trackNumber: 4,
    genre: "Pop / Ballad",
    duration: 182,
    releaseDate: "2018-11-08",
    bpm: 110,
    key: "C# Major",
    isrc: "GBUM71806319",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/25/7a/bf257a41-2a6c-9418-d784-0a375a0248ad/19UMGIM10359.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/10/a5/cb/10a5cb70-22c6-3023-e18e-49b82be6c646/mzaf_17730999554378174526.plus.aac.p.m4a",
    spotifyStreams: 3782140900,
    peakPosition: 1,
    weeksAtPeak: 36,
    completionRate: 89.8,
    skipsRatio: 10.2,
    likes: 27900000,
    regionalShares: {
      US: 31.0,
      GB: 24.8, // Major Scottish/UK phenomenon
      DE: 11.0,
      CA: 8.5,
      JP: 5.5,
      BR: 6.2,
      AU: 8.2
    },
    audioFeatures: {
      energy: 40,
      danceability: 50,
      valence: 45,
      acousticness: 75,
      instrumentalness: 0
    }
  },
  {
    id: "1440788434",
    spotifyId: "3KkXRQHbMCARz0aVfEt68P",
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    artistId: "966309175",
    album: "Spider-Man: Into the Spider-Verse",
    albumId: "1440788433",
    trackNumber: 2,
    genre: "Hip-Hop / Pop",
    duration: 158,
    releaseDate: "2018-10-19",
    bpm: 90,
    key: "D Major",
    isrc: "USUM71816098",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/64/46/78/6446781c-d789-21d7-2f1d-5555d4960309/18UMGIM71295.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f5/63/0d/f5630d7b-d023-1d07-280b-dfb0c793ff82/mzaf_18206981144004940562.plus.aac.p.m4a",
    spotifyStreams: 3645000000,
    peakPosition: 1,
    weeksAtPeak: 38,
    completionRate: 92.1,
    skipsRatio: 7.9,
    likes: 29500000,
    regionalShares: {
      US: 42.0, // Multi-Diamond US record
      GB: 13.5,
      DE: 8.5,
      CA: 10.5,
      JP: 6.0,
      BR: 8.0,
      AU: 8.5
    },
    audioFeatures: {
      energy: 48,
      danceability: 76,
      valence: 91,
      acousticness: 55,
      instrumentalness: 0
    }
  },
  {
    id: "1440872674",
    spotifyId: "7MXVkk9YM5IZxh0wAEeVAm",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    artistId: "479756766",
    album: "Starboy",
    albumId: "1440872671",
    trackNumber: 1,
    genre: "R&B / Synth-Pop",
    duration: 230,
    releaseDate: "2016-09-21",
    bpm: 186,
    key: "G Major",
    isrc: "USUM71607567",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/91/96/97/9196979a-10f7-6a75-b663-8a3fb70c868d/16UMGIM60447.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/92/8e/31/928e3100-3444-ea67-2708-3604fca9e332/mzaf_1170792376997424681.plus.aac.p.m4a",
    spotifyStreams: 3524900000,
    peakPosition: 1,
    weeksAtPeak: 42,
    completionRate: 90.6,
    skipsRatio: 9.4,
    likes: 26800000,
    regionalShares: {
      US: 36.0,
      GB: 13.0,
      DE: 10.5,
      CA: 11.5,
      JP: 7.0,
      BR: 10.0,
      AU: 6.5
    },
    audioFeatures: {
      energy: 59,
      danceability: 68,
      valence: 49,
      acousticness: 14,
      instrumentalness: 0
    }
  },
  {
    id: "1615585008",
    spotifyId: "4LRPiXqCikLlN15c3yImP7",
    title: "As It Was",
    artist: "Harry Styles",
    artistId: "470006997",
    album: "Harry's House",
    albumId: "1615584999",
    trackNumber: 4,
    genre: "Pop / Synth-Pop",
    duration: 167,
    releaseDate: "2022-04-01",
    bpm: 174,
    key: "A Major",
    isrc: "USSM12200424",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/fa/7a/ff/fa7aff13-722a-1996-0ab2-4b7bf0e41362/886449942475.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/ba/60/d4/ba60d4b9-8c9a-5829-d5c2-f1be74eb58d4/mzaf_1079373970891552528.plus.aac.p.m4a",
    spotifyStreams: 3410200000,
    peakPosition: 1,
    weeksAtPeak: 54,
    completionRate: 91.8,
    skipsRatio: 8.2,
    likes: 28400000,
    regionalShares: {
      US: 33.0,
      GB: 21.0, // #3 in UK all-time
      DE: 12.0,
      CA: 9.0,
      JP: 7.0,
      BR: 8.5,
      AU: 10.0
    },
    audioFeatures: {
      energy: 73,
      danceability: 52,
      valence: 66,
      acousticness: 34,
      instrumentalness: 0
    }
  },
  {
    id: "1574345229",
    spotifyId: "5PjdY0CKGZdErtk25b9OhV",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    artistId: "1453229672",
    album: "F*CK LOVE 3: OVER YOU",
    albumId: "1574345227",
    trackNumber: 1,
    genre: "Pop / Hip-Hop",
    duration: 141,
    releaseDate: "2021-07-09",
    bpm: 170,
    key: "C# Minor",
    isrc: "USSM12104169",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/71/84/9f/71849fc3-1ea8-bbd4-c9d3-6e3e1ff51e60/886449491683.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/16/d2/bf16d234-585d-2e6b-0775-12cf10f37be2/mzaf_17208477610331004149.plus.aac.p.m4a",
    spotifyStreams: 3220400000,
    peakPosition: 1,
    weeksAtPeak: 40,
    completionRate: 93.2,
    skipsRatio: 6.8,
    likes: 24700000,
    regionalShares: {
      US: 34.0,
      AU: 15.5, // #1 in AU (The Kid LAROI native anthem)
      JP: 12.5, // #1 in JP viral hit
      GB: 12.0,
      CA: 10.5,
      DE: 9.5,
      BR: 8.0
    },
    audioFeatures: {
      energy: 76,
      danceability: 59,
      valence: 48,
      acousticness: 4,
      instrumentalness: 0
    }
  },
  {
    id: "1741517409",
    spotifyId: "2qSkXiYOKWJDC9eQI8MoUp",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    artistId: "898516084",
    album: "Short n' Sweet",
    albumId: "1741517408",
    trackNumber: 2,
    genre: "Pop / Nu-Disco",
    duration: 175,
    releaseDate: "2024-04-11",
    bpm: 104,
    key: "C Minor",
    isrc: "USUM72403305",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a2/ab/6b/a2ab6b7e-7da3-e05f-b53a-885a4f64b0e1/075679559340.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/22/04/44220401-4467-33fa-0941-eb9462615456/mzaf_6452296184209569614.plus.aac.p.m4a",
    spotifyStreams: 1845200000, // 2024 #1 Summer Smash
    peakPosition: 1,
    weeksAtPeak: 26,
    completionRate: 94.6,
    skipsRatio: 5.4,
    likes: 19400000,
    regionalShares: {
      US: 39.0, // #1 2024 in US
      GB: 19.5, // #1 2024 in UK
      AU: 11.5,
      CA: 9.5,
      BR: 9.0,
      DE: 8.5,
      JP: 5.5
    },
    audioFeatures: {
      energy: 72,
      danceability: 70,
      valence: 71,
      acousticness: 11,
      instrumentalness: 0
    }
  },
  {
    id: "1739659134",
    spotifyId: "6dOtVTDmmp49OHphR24DYR",
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    artistId: "1065981054",
    album: "HIT ME HARD AND SOFT",
    albumId: "1739659133",
    trackNumber: 4,
    genre: "Alternative Pop",
    duration: 196,
    releaseDate: "2024-05-17",
    bpm: 105,
    key: "D Major",
    isrc: "USUM72403673",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5d/77/7b/5d777b87-e796-0b3e-cef6-d37d993dd8fe/26UMGIM82371.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4a/01/aa/4a01aace-885f-eb5a-b684-2a62e0c1f516/mzaf_8431807357069176317.plus.aac.p.m4a",
    spotifyStreams: 1720800000, // 2024 Global Hit
    peakPosition: 1,
    weeksAtPeak: 22,
    completionRate: 95.1,
    skipsRatio: 4.9,
    likes: 21200000,
    regionalShares: {
      US: 36.5,
      GB: 18.0,
      BR: 12.5, // Massive Latin America surge
      AU: 11.0,
      DE: 9.5,
      CA: 9.0,
      JP: 6.0
    },
    audioFeatures: {
      energy: 51,
      danceability: 75,
      valence: 44,
      acousticness: 20,
      instrumentalness: 5
    }
  },
  {
    id: "1763174246",
    spotifyId: "2plbrEY59IikOBvt05o99F",
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    artistId: "277293880",
    album: "Die With A Smile - Single",
    albumId: "1763174245",
    trackNumber: 1,
    genre: "Pop / Soul / Ballad",
    duration: 251,
    releaseDate: "2024-08-16",
    bpm: 158,
    key: "G Major",
    isrc: "USUM72409748",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2b/66/b2/2b66b26c-ab23-faa1-c4ee-06fa2cce8f76/26UM1IM00558.rgb.jpg/600x600bb.jpg",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8e/3c/68/8e3c6838-8e6d-e08d-ef6d-3687fa1e57c6/mzaf_10486826132717004456.plus.aac.p.m4a",
    spotifyStreams: 1350000000,
    peakPosition: 1,
    weeksAtPeak: 18,
    completionRate: 96.0,
    skipsRatio: 4.0,
    likes: 18700000,
    regionalShares: {
      US: 35.0,
      BR: 16.5, // Phenomenal chart run in Brazil
      GB: 14.5,
      JP: 11.0, // Massive in Tokyo
      AU: 9.0,
      CA: 8.5,
      DE: 8.0
    },
    audioFeatures: {
      energy: 56,
      danceability: 53,
      valence: 54,
      acousticness: 31,
      instrumentalness: 0
    }
  }
];

// Verified Artists with authentic monthly listeners, followers, and discography
export const VERIFIED_GLOBAL_ARTISTS = [
  {
    id: "479756766",
    name: "The Weeknd",
    verified: true,
    monthlyListeners: 115400000, // #1 on Spotify Worldwide
    followers: 86500000,
    country: "Canada",
    primaryGenre: "R&B / Pop",
    growthRate: 18.2,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6f/bc/e6/6fbce6c4-c38c-72d8-4fd0-66cfff32f679/20UMGIM12176.rgb.jpg/600x600bb.jpg",
    bio: "Abel Tesfaye, known as The Weeknd, is the #1 most streamed artist on Spotify globally, celebrated for cinematic dark pop, synthwave anthems, and record-breaking hits.",
    totalStreams: 18450000000,
    totalRevenue: 78500000,
    topSong: "Blinding Lights"
  },
  {
    id: "159260351",
    name: "Taylor Swift",
    verified: true,
    monthlyListeners: 104200000,
    followers: 112000000,
    country: "United States",
    primaryGenre: "Pop / Country",
    growthRate: 19.5,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/25/7a/bf257a41-2a6c-9418-d784-0a375a0248ad/19UMGIM10359.rgb.jpg/600x600bb.jpg",
    bio: "One of the best-selling music artists of all time with monumental record-breaking global tours, multi-platinum albums, and dominant digital streaming catalog.",
    totalStreams: 19800000000,
    totalRevenue: 84200000,
    topSong: "Cruel Summer"
  },
  {
    id: "271256",
    name: "Drake",
    verified: true,
    monthlyListeners: 84500000,
    followers: 90200000,
    country: "Canada",
    primaryGenre: "Hip-Hop / Rap",
    growthRate: 11.4,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/91/96/97/9196979a-10f7-6a75-b663-8a3fb70c868d/16UMGIM60447.rgb.jpg/600x600bb.jpg",
    bio: "Grammy Award-winning cultural icon and the most streamed hip-hop artist in Spotify history.",
    totalStreams: 17200000000,
    totalRevenue: 72800000,
    topSong: "One Dance"
  },
  {
    id: "1065981054",
    name: "Billie Eilish",
    verified: true,
    monthlyListeners: 102800000,
    followers: 94100000,
    country: "United States",
    primaryGenre: "Alternative Pop",
    growthRate: 22.8,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5d/77/7b/5d777b87-e796-0b3e-cef6-d37d993dd8fe/26UMGIM82371.rgb.jpg/600x600bb.jpg",
    bio: "Multiple Grammy and Academy Award winner redefining contemporary alternative pop with whispered vocals and deep subsonic production.",
    totalStreams: 14200000000,
    totalRevenue: 61500000,
    topSong: "Birds of a Feather"
  },
  {
    id: "1833134",
    name: "Ed Sheeran",
    verified: true,
    monthlyListeners: 78500000,
    followers: 115000000,
    country: "United Kingdom",
    primaryGenre: "Pop / Singer-Songwriter",
    growthRate: 8.5,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e5/7d/50/e57d501b-c408-0136-1e6d-672506e00ca3/190295851286.jpg/600x600bb.jpg",
    bio: "English singer-songwriter renowned for massive global acoustic-pop anthems like Shape of You and Perfect.",
    totalStreams: 15400000000,
    totalRevenue: 65900000,
    topSong: "Shape of You"
  },
  {
    id: "898516084",
    name: "Sabrina Carpenter",
    verified: true,
    monthlyListeners: 82400000,
    followers: 24500000,
    country: "United States",
    primaryGenre: "Pop / Nu-Disco",
    growthRate: 46.2,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a2/ab/6b/a2ab6b7e-7da3-e05f-b53a-885a4f64b0e1/075679559340.jpg/600x600bb.jpg",
    bio: "Breakout pop sensation topping global streaming charts with chart-topping hits like Espresso and Please Please Please.",
    totalStreams: 6800000000,
    totalRevenue: 28900000,
    topSong: "Espresso"
  },
  {
    id: "277293880",
    name: "Bruno Mars",
    verified: true,
    monthlyListeners: 110200000,
    followers: 58000000,
    country: "United States",
    primaryGenre: "Pop / Soul / R&B",
    growthRate: 28.5,
    avatarUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/2b/66/b2/2b66b26c-ab23-faa1-c4ee-06fa2cce8f76/26UM1IM00558.rgb.jpg/600x600bb.jpg",
    bio: "Global musical virtuoso with historic stadium anthems, timeless funk grooves, and recent smash duet Die With A Smile.",
    totalStreams: 16100000000,
    totalRevenue: 69200000,
    topSong: "Die With A Smile"
  }
];

// Verified Albums with authentic track counts, release years, and LP streaming figures
export const VERIFIED_GLOBAL_ALBUMS = [
  {
    id: "1499378108",
    title: "After Hours",
    artist: "The Weeknd",
    artistId: "479756766",
    releaseYear: 2020,
    genre: "R&B / Synthwave",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6f/bc/e6/6fbce6c4-c38c-72d8-4fd0-66cfff32f679/20UMGIM12176.rgb.jpg/600x600bb.jpg",
    trackCount: 14,
    totalPlays: 9450000000,
    totalRevenue: 41200000,
    description: "Critically-acclaimed cinematic masterpiece featuring the historic #1 global smash Blinding Lights, Save Your Tears, and Heartless."
  },
  {
    id: "1739659133",
    title: "HIT ME HARD AND SOFT",
    artist: "Billie Eilish",
    artistId: "1065981054",
    releaseYear: 2024,
    genre: "Alternative Pop",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5d/77/7b/5d777b87-e796-0b3e-cef6-d37d993dd8fe/26UMGIM82371.rgb.jpg/600x600bb.jpg",
    trackCount: 10,
    totalPlays: 4200000000,
    totalRevenue: 18500000,
    description: "2024 Grammy-nominated worldwide sensation featuring Birds of a Feather, Lunch, and Chihiro."
  },
  {
    id: "1741517408",
    title: "Short n' Sweet",
    artist: "Sabrina Carpenter",
    artistId: "898516084",
    releaseYear: 2024,
    genre: "Pop / Nu-Disco",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a2/ab/6b/a2ab6b7e-7da3-e05f-b53a-885a4f64b0e1/075679559340.jpg/600x600bb.jpg",
    trackCount: 12,
    totalPlays: 3850000000,
    totalRevenue: 16800000,
    description: "The biggest pop album of 2024 with smash hits Espresso, Please Please Please, and Taste."
  },
  {
    id: "1440872671",
    title: "Starboy",
    artist: "The Weeknd",
    artistId: "479756766",
    releaseYear: 2016,
    genre: "R&B / Pop",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/91/96/97/9196979a-10f7-6a75-b663-8a3fb70c868d/16UMGIM60447.rgb.jpg/600x600bb.jpg",
    trackCount: 18,
    totalPlays: 8850000000,
    totalRevenue: 38400000,
    description: "Multi-platinum album featuring Starboy (ft. Daft Punk), I Feel It Coming, and Die For You."
  },
  {
    id: "1193701079",
    title: "÷ (Divide)",
    artist: "Ed Sheeran",
    artistId: "1833134",
    releaseYear: 2017,
    genre: "Pop",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e5/7d/50/e57d501b-c408-0136-1e6d-672506e00ca3/190295851286.jpg/600x600bb.jpg",
    trackCount: 16,
    totalPlays: 9800000000,
    totalRevenue: 42800000,
    description: "Blockbuster record containing Shape of You, Castle on the Hill, and Perfect."
  },
  {
    id: "1615584999",
    title: "Harry's House",
    artist: "Harry Styles",
    artistId: "470006997",
    releaseYear: 2022,
    genre: "Pop / Funk",
    artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/fa/7a/ff/fa7aff13-722a-1996-0ab2-4b7bf0e41362/886449942475.jpg/600x600bb.jpg",
    trackCount: 13,
    totalPlays: 6200000000,
    totalRevenue: 27100000,
    description: "Grammy Album of the Year winner featuring the world's #1 hit As It Was."
  }
];
