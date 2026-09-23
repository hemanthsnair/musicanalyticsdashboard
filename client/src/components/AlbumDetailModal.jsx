import React, { useState, useEffect } from 'react';
import {
  X,
  Disc3,
  Play,
  Pause,
  DollarSign,
  Headphones,
  Music2
} from 'lucide-react';

export default function AlbumDetailModal({
  albumId,
  isOpen,
  onClose,
  currentPlayingSong,
  isPlaying,
  onPlaySong,
  onOpenTrack,
  onOpenArtist
}) {
  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!albumId || !isOpen) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/albums/${albumId}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setAlbumData(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching album details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [albumId, isOpen]);

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
        style={{ maxWidth: '800px' }}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close album insights">
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div className="pulse-dot" style={{ margin: '0 auto 16px auto' }} />
            <p>Loading album details & tracklist telemetry...</p>
          </div>
        ) : albumData ? (
          <div>
            {/* Header */}
            <div className="track-modal-header">
              <div
                className="track-modal-cover"
                style={{
                  background: albumData.coverColor || 'var(--accent-purple)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {albumData.artworkUrl ? (
                  <img
                    src={albumData.artworkUrl}
                    alt={albumData.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <Disc3 size={44} color="#ffffff" />
                )}
              </div>

              <div className="track-modal-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-pill badge-genre">{albumData.genre}</span>
                  <span className="album-year-badge" style={{ position: 'static' }}>{albumData.releaseYear}</span>
                </div>

                <h1 className="track-modal-title">{albumData.title}</h1>

                <div className="track-modal-links">
                  <span>Artist: </span>
                  <button
                    className="track-link-btn"
                    onClick={() => {
                      onClose();
                      onOpenArtist?.(albumData.artistId);
                    }}
                  >
                    {albumData.artist}
                  </button>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.4 }}>
                  {albumData.description}
                </p>
              </div>
            </div>

            {/* Quick KPIs */}
            <div className="track-kpi-strip" style={{ marginTop: '16px' }}>
              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Headphones size={13} style={{ color: 'var(--accent-cyan)' }} />
                  Cumulative Plays
                </span>
                <span className="kpi-value">{albumData.totalPlays?.toLocaleString()}</span>
                <span className="kpi-sub">Across all tracks</span>
              </div>

              <div className="track-kpi-item highlight-revenue">
                <span className="kpi-label">
                  <DollarSign size={13} style={{ color: 'var(--accent-green)' }} />
                  Gross Album Royalties
                </span>
                <span className="kpi-value text-green">
                  ${albumData.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="kpi-sub">Catalog payout</span>
              </div>

              <div className="track-kpi-item">
                <span className="kpi-label">
                  <Music2 size={13} style={{ color: 'var(--accent-purple)' }} />
                  Tracklist Count
                </span>
                <span className="kpi-value">{albumData.tracks?.length || 0} Songs</span>
                <span className="kpi-sub">Full LP release</span>
              </div>
            </div>

            {/* Tracklist Table */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Album Tracklist & Individual Track Economics
              </h3>

              <div className="songs-table-wrapper">
                <table className="songs-table">
                  <thead>
                    <tr>
                      <th style={{ width: '36px' }}>#</th>
                      <th>Track Title</th>
                      <th>Streams</th>
                      <th>Gross Revenue</th>
                      <th>Completion</th>
                      <th>Length</th>
                      <th style={{ textAlign: 'center', width: '50px' }}>Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albumData.tracks?.map((track, idx) => {
                      const isThisPlaying = currentPlayingSong?.id === track.id && isPlaying;

                      return (
                        <tr key={track.id} className="song-row">
                          <td style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                            {idx + 1}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                            </div>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>
                            {track.plays.toLocaleString()}
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-green)' }}>
                            ${track.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              {track.completionRate}%
                            </span>
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {formatDuration(track.duration)}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button
                              className={`btn-preview-play ${isThisPlaying ? 'is-playing' : ''}`}
                              onClick={() => onPlaySong(track)}
                              title={isThisPlaying ? 'Stop playback' : 'Play audio preview'}
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

            {/* Platform Distribution Bar for this Album */}
            {albumData.platformBreakdown && (
              <div style={{ marginTop: '22px' }}>
                <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Platform Revenue Distribution for this Album
                </h4>
                <div className="multi-segment-bar" style={{ height: '10px' }}>
                  {albumData.platformBreakdown.map(p => (
                    <div
                      key={p.id}
                      className="multi-segment"
                      style={{ width: `${p.share}%`, background: p.color }}
                      title={`${p.name}: ${p.share}% ($${p.revenue.toLocaleString()})`}
                    />
                  ))}
                </div>
                <div className="platform-legend" style={{ marginTop: '8px' }}>
                  {albumData.platformBreakdown.map(p => (
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
