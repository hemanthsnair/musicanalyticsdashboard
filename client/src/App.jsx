import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Flame,
  Users,
  Radio,
  Globe,
  Headphones,
  Clock,
  Repeat,
  ShieldCheck,
  Zap,
  Search,
  CheckCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

import MetricCard from './components/MetricCard';
import PlaysTrendChart from './components/PlaysTrendChart';
import GenreDonutChart from './components/GenreDonutChart';
import TopSongsTable from './components/TopSongsTable';
import TopArtistsGrid from './components/TopArtistsGrid';
import LiveActivityFeed from './components/LiveActivityFeed';
import DemographicsPanel from './components/DemographicsPanel';
import AudioPlayerBar from './components/AudioPlayerBar';
import EventSimulatorModal from './components/EventSimulatorModal';
import { audioSynth } from './utils/audioSynth';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('7d');

  // Data States
  const [overview, setOverview] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [demographics, setDemographics] = useState(null);
  const [activities, setActivities] = useState([]);

  // Audio Player State
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  // Simulator & Notifications
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show Toast Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial overview and static components
  const fetchOverview = async () => {
    try {
      const res = await fetch('/api/stats/overview');
      const data = await res.json();
      if (data.success) setOverview(data.data);
    } catch (err) {
      console.error('Error fetching overview', err);
    }
  };

  const fetchTrend = async (tf = timeframe) => {
    try {
      const res = await fetch(`/api/stats/plays-trend?timeframe=${tf}`);
      const data = await res.json();
      if (data.success) setTrendData(data.data);
    } catch (err) {
      console.error('Error fetching trend', err);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await fetch('/api/songs/top?limit=20');
      const data = await res.json();
      if (data.success) {
        setSongs(data.data);
        if (!currentSong && data.data.length > 0) {
          setCurrentSong(data.data[0]); // default docked song
        }
      }
    } catch (err) {
      console.error('Error fetching songs', err);
    }
  };

  const fetchArtists = async () => {
    try {
      const res = await fetch('/api/artists/top?limit=12');
      const data = await res.json();
      if (data.success) setArtists(data.data);
    } catch (err) {
      console.error('Error fetching artists', err);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch('/api/genres/breakdown');
      const data = await res.json();
      if (data.success) setGenres(data.data);
    } catch (err) {
      console.error('Error fetching genres', err);
    }
  };

  const fetchDemographics = async () => {
    try {
      const res = await fetch('/api/demographics');
      const data = await res.json();
      if (data.success) setDemographics(data.data);
    } catch (err) {
      console.error('Error fetching demographics', err);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/activity/stream?limit=25');
      const data = await res.json();
      if (data.success) setActivities(data.data);
    } catch (err) {
      console.error('Error fetching activities', err);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchOverview();
    fetchTrend('7d');
    fetchSongs();
    fetchArtists();
    fetchGenres();
    fetchDemographics();
    fetchActivities();
  }, []);

  // Timeframe change handler
  const handleTimeframeChange = (newTf) => {
    setTimeframe(newTf);
    fetchTrend(newTf);
  };

  // Server-Sent Events (SSE) Live Feed Subscription
  useEffect(() => {
    let eventSource = null;
    try {
      eventSource = new EventSource('/api/activity/live');

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type && payload.type !== 'connected') {
            // Prepend new activity
            setActivities(prev => [payload, ...prev.slice(0, 30)]);

            // Update stats dynamically
            if (payload.type === 'play' || payload.type === 'skip') {
              setOverview(prev => prev ? { ...prev, totalPlays: prev.totalPlays + 1 } : prev);
              setSongs(prevSongs =>
                prevSongs.map(s => (s.id === payload.songId ? { ...s, plays: s.plays + 1 } : s))
              );
            }
          }
        } catch (e) {
          // heartbeat or unparseable
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
      };
    } catch (err) {
      console.warn('SSE not supported or failed, falling back', err);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  // Audio Playback Handler
  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id && isPlaying) {
      audioSynth.stop();
      setIsPlaying(false);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      audioSynth.playSong(song);
    }
  };

  const handleTogglePlay = () => {
    if (!currentSong && songs.length > 0) {
      handlePlaySong(songs[0]);
      return;
    }
    if (isPlaying) {
      audioSynth.stop();
      setIsPlaying(false);
    } else if (currentSong) {
      setIsPlaying(true);
      audioSynth.playSong(currentSong);
    }
  };

  // Callback when user injects event via Simulator
  const handleEventSent = (event) => {
    triggerToast(`⚡ Telemetry recorded: ${event ? event.type.toUpperCase() : 'Surge batch'} logged!`);
    fetchOverview();
    fetchSongs();
    fetchActivities();
  };

  // Filter songs for search & genre
  const filteredSongs = songs.filter(s => {
    const matchesGenre = selectedGenre === 'all' || s.genre.toLowerCase() === selectedGenre.toLowerCase();
    const matchesSearch = !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Headphones size={22} />
          </div>
          <div className="brand-text">
            <h1>AudioPulse</h1>
            <span>Stream Intelligence</span>
          </div>
        </div>

        <div className="nav-section-label">Analytics Menu</div>
        <ul className="nav-list">
          <li className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('overview')}>
              <BarChart3 size={18} />
              <span>Overview</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'songs' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('songs')}>
              <Flame size={18} />
              <span>Top Songs</span>
              <span className="nav-badge">{songs.length}</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'artists' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('artists')}>
              <Users size={18} />
              <span>Top Artists</span>
              <span className="nav-badge">{artists.length}</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'demographics' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('demographics')}>
              <Globe size={18} />
              <span>Audience & Geo</span>
            </button>
          </li>
          <li className={`nav-item ${activeTab === 'live' ? 'active' : ''}`}>
            <button onClick={() => setActiveTab('live')}>
              <Radio size={18} />
              <span>Live Telemetry</span>
              <span className="nav-badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)' }}>
                LIVE
              </span>
            </button>
          </li>
        </ul>

        {/* Live Audience Signal Widget */}
        <div className="sidebar-footer">
          <div className="signal-card">
            <div className="signal-status">
              <span className="pulse-dot" />
              <span>Active Concurrent</span>
            </div>
            <div className="signal-count">
              {overview?.activeListeners ? overview.activeListeners.toLocaleString() : '14,280'}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--accent-green)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={11} /> +4.2% listening velocity
            </div>
          </div>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search songs, artists, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="header-actions">
            <button
              className="btn-secondary"
              onClick={() => setIsSimulatorOpen(true)}
              title="Open Stream Ingestion Simulator"
            >
              <Zap size={15} style={{ color: 'var(--accent-green)' }} />
              <span>Simulator</span>
            </button>

            <button
              className="btn-primary"
              onClick={() => handleEventSent()}
              title="Quick Refresh Analytics"
            >
              <Sparkles size={15} />
              <span>Refresh Metrics</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="dashboard-content">
          {/* Executive KPI Grid */}
          <div className="kpi-grid">
            <MetricCard
              title="Total Stream Plays"
              value={overview?.totalPlays ? overview.totalPlays.toLocaleString() : '10,544,300'}
              change={overview?.totalPlaysChange ?? 14.8}
              subtext="vs previous 30 days"
              icon={Headphones}
              color="emerald"
            />
            <MetricCard
              title="Unique Listeners"
              value={overview?.totalListeners ? `${(overview.totalListeners / 1000000).toFixed(2)}M` : '3.84M'}
              change={overview?.totalListenersChange ?? 9.3}
              subtext="Global reach"
              icon={Users}
              color="cyan"
            />
            <MetricCard
              title="Avg Completion Rate"
              value={overview?.avgCompletionRate ? `${overview.avgCompletionRate}%` : '86.4%'}
              change={2.1}
              subtext="Retention to outro"
              icon={ShieldCheck}
              color="purple"
            />
            <MetricCard
              title="Total Listening Hours"
              value={overview?.totalListeningHours ? `${(overview.totalListeningHours / 1000).toFixed(1)}k hrs` : '628.4k hrs'}
              change={11.5}
              subtext="Cumulative stream time"
              icon={Clock}
              color="amber"
            />
          </div>

          {/* Tab Views */}
          {activeTab === 'overview' && (
            <>
              {/* Analytics Main Chart Row */}
              <div className="analytics-main-row">
                <PlaysTrendChart
                  data={trendData}
                  timeframe={timeframe}
                  onTimeframeChange={handleTimeframeChange}
                />
                <GenreDonutChart genres={genres} />
              </div>

              {/* Songs Table & Live Activity Row */}
              <div className="songs-activity-row">
                <TopSongsTable
                  songs={filteredSongs.slice(0, 7)}
                  currentPlayingSong={currentSong}
                  isPlaying={isPlaying}
                  onPlaySong={handlePlaySong}
                  selectedGenre={selectedGenre}
                  onGenreChange={setSelectedGenre}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <LiveActivityFeed
                  activities={activities.slice(0, 10)}
                  onSimulateClick={() => setIsSimulatorOpen(true)}
                />
              </div>

              {/* Demographics Preview */}
              <DemographicsPanel demographics={demographics} />
            </>
          )}

          {activeTab === 'songs' && (
            <TopSongsTable
              songs={filteredSongs}
              currentPlayingSong={currentSong}
              isPlaying={isPlaying}
              onPlaySong={handlePlaySong}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {activeTab === 'artists' && (
            <TopArtistsGrid artists={artists} />
          )}

          {activeTab === 'demographics' && (
            <DemographicsPanel demographics={demographics} />
          )}

          {activeTab === 'live' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
              <LiveActivityFeed
                activities={activities}
                onSimulateClick={() => setIsSimulatorOpen(true)}
              />
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h2 className="card-title" style={{ marginBottom: '16px' }}>
                  <Zap size={18} style={{ color: 'var(--accent-green)' }} />
                  Real-Time Ingestion Architecture
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Streaming telemetry is ingested via the high-throughput <code>POST /api/events/track</code> REST endpoint and broadcast to connected dashboards through persistent <strong>Server-Sent Events (SSE)</strong>.
                </p>

                <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-green)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                    Live Connection Status
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <div className="pulse-dot" />
                    <span>SSE Stream: <strong>CONNECTED</strong></span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Heartbeat: Every 20s • Latency: &lt;15ms
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setIsSimulatorOpen(true)}
                  >
                    Open Telemetry Simulator
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Docked Audio Player Preview Bar */}
      <AudioPlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />

      {/* Telemetry Event Simulator Modal */}
      <EventSimulatorModal
        songs={songs}
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onEventSent={handleEventSent}
      />
    </div>
  );
}
