import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  DollarSign,
  Headphones,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Music,
  Radio,
  Sliders
} from 'lucide-react';

export default function TrackDetailModal({
  songId,
  isOpen,
  onClose,
  currentPlayingSong,
  isPlaying,
  onPlaySong,
  onOpenArtist,
  onOpenAlbum
}) {
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('platforms'); // 'platforms' | 'velocity' | 'acoustics'

  useEffect(() => {
    if (!songId || !isOpen) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/songs/${songId}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setTrackData(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching track details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [songId, isOpen]);

  if (!isOpen) return null;

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isCurrentPlaying = currentPlayingSong?.id === songId && isPlaying;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container track-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        {/* Modal Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close track insights">
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div className="pulse-dot" style={{ margin: '0 auto 16px auto', width: '12px', height: '12px' }} />
            <p>Loading deep streaming insights...</p>
          </div>
        ) : trackData ? (
          <div>
            {/* Header Banner */}
            <div className="track-modal-header">
              <div
                className="track-modal-cover"
                style={{
                  background: trackData.coverColor || 'var(--accent-green)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {trackData.artworkUrl ? (
                  <img
                    src={trackData.artworkUrl}
                    alt={trackData.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <Music size={36} color="#ffffff" />
                )}
                <button
                  className="track-modal-play-btn"
                  onClick={() => onPlaySong(trackData)}
                  title={isCurrentPlaying ? 'Pause Preview' : 'Play Master Preview'}
                >
                  {isCurrentPlaying ? <Pause size={20} fill="#ffffff" /> : <Play size={20} fill="#ffffff" style={{ marginLeft: '2px' }} />}
                </button>
              </div>

              <div className="track-modal-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-pill badge-genre">{trackData.genre}</span>
                  <span className="badge-pill badge-rank">Rank #{trackData.rank || 1}</span>
                  <span className="track-modal-isrc">ISRC: {trackData.isrc || 'US-S1Z-24-001'}</span>
                </div>

                <h1 className="track-modal-title">{trackData.title}</h1>

                <div className="track-modal-links">
                  <span>by </span>
                  <button
                    className="track-link-btn"
                    onClick={() => {
                      onClose();
                      onOpenArtist?.(trackData.artistId);
                    }}
                  >
                    {trackData.artist}
                  </button>
                  <span> • from album </span>
                  <button
                    className="track-link-btn"
                    onClick={() => {
                      onClose();
                      onOpenAlbum?.(trackData.albumId);
                    }}
                  >
                    "{trackData.album}"
                  </button>
                </div>

                <div className="track-meta-chips">
                  <span>⏱ {formatDuration(trackData.duration)}</span>
                  <span>🎼 Key: <strong>{trackData.key}</strong></span>
                  <span>⚡ Tempo: <strong>{trackData.bpm} BPM</strong></span>
                  <span>📅 Released: {trackData.releaseDate}</span>
                </div>
              </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="track-kpi-strip">
              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Headphones size={13} style={{ color: 'var(--accent-cyan)' }} />
                  Total Streams
                </span>
                <span className="kpi-value">{trackData.plays?.toLocaleString()}</span>
                <span className="kpi-sub positive">Global audience</span>
              </div>

              <div className="track-kpi-item highlight-revenue">
                <span className="kpi-label">
                  <DollarSign size={13} style={{ color: 'var(--accent-green)' }} />
                  Gross Royalties Generated
                </span>
                <span className="kpi-value text-green">
                  ${trackData.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="kpi-sub">
                  ${((trackData.totalRevenue / (trackData.plays || 1)) * 1000).toFixed(2)} / 1k streams
                </span>
              </div>

              <div className="track-kpi-item">
                <span className="kpi-label">
                  <CheckCircle2 size={13} style={{ color: 'var(--accent-purple)' }} />
                  Completion Rate
                </span>
                <span className="kpi-value">{trackData.completionRate}%</span>
                <span className="kpi-sub">Skip: {trackData.skipRate}%</span>
              </div>

              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Sparkles size={13} style={{ color: 'var(--accent-amber)' }} />
                  Total Likes & Saves
                </span>
                <span className="kpi-value">{trackData.likes?.toLocaleString()}</span>
                <span className="kpi-sub">High playlist affinity</span>
              </div>
            </div>

            {/* In-Modal Navigation Tabs */}
            <div className="modal-tabs-bar">
              <button
                className={`modal-tab-btn ${activeTab === 'platforms' ? 'active' : ''}`}
                onClick={() => setActiveTab('platforms')}
              >
                <Radio size={14} />
                <span>Streaming Platform Economics</span>
              </button>
              <button
                className={`modal-tab-btn ${activeTab === 'velocity' ? 'active' : ''}`}
                onClick={() => setActiveTab('velocity')}
              >
                <TrendingUp size={14} />
                <span>30-Day Stream Velocity</span>
              </button>
              <button
                className={`modal-tab-btn ${activeTab === 'acoustics' ? 'active' : ''}`}
                onClick={() => setActiveTab('acoustics')}
              >
                <Sliders size={14} />
                <span>Audio & Acoustic Profile</span>
              </button>
            </div>

            {/* TAB 1: Streaming Platform Breakdown */}
            {activeTab === 'platforms' && (
              <div className="modal-tab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Breakdown by Streaming Application
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Calculated with real-world royalty payout schedules
                  </span>
                </div>

                <div className="platform-table-wrapper">
                  <table className="platform-detail-table">
                    <thead>
                      <tr>
                        <th>Platform</th>
                        <th>Streams</th>
                        <th>Stream Share</th>
                        <th>Payout Rate</th>
                        <th>Gross Revenue</th>
                        <th>Audio Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trackData.platformBreakdown?.map((plat) => (
                        <tr key={plat.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span
                                className="platform-color-indicator"
                                style={{ background: plat.color }}
                              />
                              <strong style={{ fontSize: '0.84rem' }}>{plat.name}</strong>
                            </div>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
                            {plat.plays.toLocaleString()}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div className="progress-bar-container" style={{ width: '80px', height: '6px' }}>
                                <div
                                  className="progress-bar-fill"
                                  style={{ width: `${plat.share}%`, background: plat.color }}
                                />
                              </div>
                              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                                {plat.share}%
                              </span>
                            </div>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                            ${plat.payoutRate.toFixed(4)}/stream
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-green)' }}>
                            ${plat.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                            {plat.quality}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Geographic Audience Snippet */}
                <div style={{ marginTop: '20px' }}>
                  <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Top Geographic Markets for this Track
                  </h4>
                  <div className="geo-chips-grid">
                    {trackData.countryAudience?.map((geo) => (
                      <div key={geo.code} className="geo-chip">
                        <span className="geo-flag">{geo.flag}</span>
                        <span className="geo-name">{geo.country}</span>
                        <span className="geo-share">{geo.share}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 30-Day Stream Velocity */}
            {activeTab === 'velocity' && (
              <div className="modal-tab-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      30-Day Streaming Velocity Curve
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Daily stream count progression & revenue velocity
                    </p>
                  </div>
                </div>

                <div className="velocity-chart-wrapper">
                  <svg viewBox="0 0 700 180" className="velocity-svg">
                    <defs>
                      <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Generate path from velocity curve */}
                    {(() => {
                      const data = trackData.velocityCurve || [];
                      if (data.length === 0) return null;
                      const maxPlays = Math.max(...data.map(d => d.plays));
                      const minPlays = Math.min(...data.map(d => d.plays)) * 0.9;
                      const range = maxPlays - minPlays || 1;

                      const points = data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 660 + 20;
                        const y = 160 - ((d.plays - minPlays) / range) * 130;
                        return `${x},${y}`;
                      });

                      const pathD = `M ${points[0]} ` + points.slice(1).map(p => `L ${p}`).join(' ');
                      const areaD = `${pathD} L ${660 + 20},170 L 20,170 Z`;

                      return (
                        <>
                          <path d={areaD} fill="url(#velocityGrad)" />
                          <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" />
                          {data.filter((_, idx) => idx % 5 === 0).map((d, idx) => {
                            const actualIdx = idx * 5;
                            const x = (actualIdx / (data.length - 1)) * 660 + 20;
                            const y = 160 - ((d.plays - minPlays) / range) * 130;
                            return (
                              <g key={d.label}>
                                <circle cx={x} cy={y} r="4" fill="#10b981" stroke="#07090e" strokeWidth="2" />
                                <text x={x} y="178" fontSize="9" fill="var(--text-dim)" textAnchor="middle">
                                  {d.label}
                                </text>
                              </g>
                            );
                          })}
                        </>
                      );
                    })()}
                  </svg>
                </div>
              </div>
            )}

            {/* TAB 3: Audio & Acoustic Profile */}
            {activeTab === 'acoustics' && (
              <div className="modal-tab-content">
                <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Acoustic & Audio Characteristics
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                  Algorithmic audio feature vector analyzing musical attributes
                </p>

                <div className="acoustic-meters-grid">
                  {[
                    { label: 'Energy', value: trackData.audioFeatures?.energy || 80, desc: 'Perceptual measure of intensity, activity and loudness', color: '#f43f5e' },
                    { label: 'Danceability', value: trackData.audioFeatures?.danceability || 75, desc: 'Rhythmic regularity, tempo stability, and overall beat strength', color: '#10b981' },
                    { label: 'Valence (Mood)', value: trackData.audioFeatures?.valence || 65, desc: 'Musical positiveness conveyed by track (happy vs melancholic)', color: '#06b6d4' },
                    { label: 'Acousticness', value: trackData.audioFeatures?.acousticness || 20, desc: 'Confidence measure whether the track is acoustic', color: '#f59e0b' },
                    { label: 'Instrumentalness', value: trackData.audioFeatures?.instrumentalness || 60, desc: 'Likelihood of the song having no spoken or sung vocals', color: '#8b5cf6' }
                  ].map((feat) => (
                    <div key={feat.label} className="acoustic-meter-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.84rem' }}>{feat.label}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: feat.color }}>
                          {feat.value}%
                        </span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '8px' }}>
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${feat.value}%`, background: feat.color }}
                        />
                      </div>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '8px' }}>
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
