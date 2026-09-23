import React, { useState, useEffect } from 'react';
import {
  X,
  Users,
  CheckCircle2,
  DollarSign,
  Headphones,
  TrendingUp,
  Play,
  Pause,
  Globe
} from 'lucide-react';

export default function ArtistDetailModal({
  artistId,
  isOpen,
  onClose,
  currentPlayingSong,
  isPlaying,
  onPlaySong,
  onOpenTrack,
  onOpenAlbum
}) {
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId || !isOpen) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/artists/${artistId}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setArtistData(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching artist details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [artistId, isOpen]);

  if (!isOpen) return null;

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close artist insights">
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div className="pulse-dot" style={{ margin: '0 auto 16px auto' }} />
            <p>Loading artist catalog & royalty analytics...</p>
          </div>
        ) : artistData ? (
          <div>
            {/* Header */}
            <div className="track-modal-header">
              <div
                className="artist-avatar"
                style={{
                  width: '90px',
                  height: '90px',
                  fontSize: '2.4rem',
                  background: artistData.avatarColor || 'var(--accent-purple)',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {artistData.avatarUrl ? (
                  <img
                    src={artistData.avatarUrl}
                    alt={artistData.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  artistData.name.charAt(0)
                )}
                {artistData.verified && (
                  <div className="artist-verified-check" style={{ bottom: '2px', right: '2px' }} title="Verified Artist">
                    <CheckCircle2 size={16} color="#ffffff" fill="#3b82f6" />
                  </div>
                )}
              </div>

              <div className="track-modal-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-pill badge-genre">{artistData.primaryGenre}</span>
                  <span className="badge-pill badge-rank">
                    <Globe size={11} style={{ marginRight: '3px' }} />
                    {artistData.country}
                  </span>
                  <span className="trend-badge trend-up">
                    <TrendingUp size={11} /> +{artistData.growthRate}%
                  </span>
                </div>

                <h1 className="track-modal-title">{artistData.name}</h1>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
                  {artistData.bio}
                </p>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="track-kpi-strip" style={{ marginTop: '18px' }}>
              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Users size={13} style={{ color: 'var(--accent-cyan)' }} />
                  Monthly Listeners
                </span>
                <span className="kpi-value">
                  {(artistData.monthlyListeners / 1000000).toFixed(1)}M
                </span>
                <span className="kpi-sub">Active reach</span>
              </div>

              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Headphones size={13} style={{ color: 'var(--accent-purple)' }} />
                  Total Catalog Streams
                </span>
                <span className="kpi-value">
                  {artistData.totalStreams >= 1000000000
                    ? `${(artistData.totalStreams / 1000000000).toFixed(2)}B`
                    : `${(artistData.totalStreams / 1000000).toFixed(1)}M`}
                </span>
                <span className="kpi-sub">All-time plays</span>
              </div>

              <div className="track-kpi-item highlight-revenue">
                <span className="kpi-label">
                  <DollarSign size={13} style={{ color: 'var(--accent-green)' }} />
                  Gross Artist Royalties
                </span>
                <span className="kpi-value text-green">
                  ${artistData.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="kpi-sub">Cumulative payout</span>
              </div>

              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Users size={13} style={{ color: 'var(--accent-amber)' }} />
                  Total Followers
                </span>
                <span className="kpi-value">{artistData.followers?.toLocaleString()}</span>
                <span className="kpi-sub">Direct subscribers</span>
              </div>
            </div>

            {/* Releases / Discography */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Artist Discography & Track Royalties
              </h3>

              <div className="songs-table-wrapper">
                <table className="songs-table">
                  <thead>
                    <tr>
                      <th style={{ width: '36px' }}>#</th>
                      <th>Track Title</th>
                      <th>Album</th>
                      <th>Plays</th>
                      <th>Gross Revenue</th>
                      <th>Completion</th>
                      <th>Length</th>
                      <th style={{ textAlign: 'center', width: '50px' }}>Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artistData.tracks?.map((track, idx) => {
                      const isThisPlaying = currentPlayingSong?.id === track.id && isPlaying;

                      return (
                        <tr key={track.id} className="song-row">
                          <td style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                            {idx + 1}
                          </td>
                          <td>
                            <button
                              className="track-title-btn"
                              onClick={() => {
                                onClose();
                                onOpenTrack?.(track.id);
                              }}
                              title="Click to view deep track insights"
                            >
                              {track.title}
                            </button>
                          </td>
                          <td>
                            <button
                              className="track-link-btn"
                              onClick={() => {
                                onClose();
                                onOpenAlbum?.(track.albumId);
                              }}
                            >
                              {track.album}
                            </button>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>
                            {track.plays.toLocaleString()}
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-green)' }}>
                            ${track.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {track.completionRate}%
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {formatDuration(track.duration)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              className={`btn-preview-play ${isThisPlaying ? 'is-playing' : ''}`}
                              onClick={() => onPlaySong(track)}
                              title={isThisPlaying ? 'Stop playback' : 'Play synth preview'}
                            >
                              {isThisPlaying ? <Pause size={13} fill="#10b981" color="#10b981" /> : <Play size={13} fill="currentColor" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform Revenue Distribution */}
            {artistData.platformBreakdown && (
              <div style={{ marginTop: '22px' }}>
                <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Platform Revenue Distribution for {artistData.name}
                </h4>
                <div className="multi-segment-bar" style={{ height: '10px' }}>
                  {artistData.platformBreakdown.map(p => (
                    <div
                      key={p.id}
                      className="multi-segment"
                      style={{ width: `${p.share}%`, background: p.color }}
                      title={`${p.name}: ${p.share}% ($${p.revenue.toLocaleString()})`}
                    />
                  ))}
                </div>
                <div className="platform-legend" style={{ marginTop: '8px' }}>
                  {artistData.platformBreakdown.map(p => (
                    <div key={p.id} className="legend-item">
                      <span className="legend-dot" style={{ background: p.color }} />
                      <span className="legend-label">{p.name}</span>
                      <span className="legend-sub">(${p.revenue.toLocaleString()})</span>
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
