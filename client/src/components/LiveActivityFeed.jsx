import React from 'react';
import { Radio, Play, Heart, SkipForward, PlusCircle, Smartphone, Monitor } from 'lucide-react';

export default function LiveActivityFeed({ activities = [], onSimulateClick, onOpenTrack }) {
  const getActionBadge = (type) => {
    switch (type) {
      case 'like':
        return (
          <div className="activity-badge like" title="Liked Track">
            <Heart size={14} />
          </div>
        );
      case 'skip':
        return (
          <div className="activity-badge skip" title="Skipped Track">
            <SkipForward size={14} />
          </div>
        );
      case 'playlist_add':
        return (
          <div className="activity-badge playlist_add" title="Added to Playlist">
            <PlusCircle size={14} />
          </div>
        );
      case 'play':
      default:
        return (
          <div className="activity-badge play" title="Played Track">
            <Play size={14} />
          </div>
        );
    }
  };

  const getActionText = (type) => {
    switch (type) {
      case 'like': return 'liked';
      case 'skip': return 'skipped';
      case 'playlist_add': return 'added to playlist';
      case 'play':
      default: return 'streamed';
    }
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'just now';
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins / 60)}h ago`;
  };

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'spotify': return '#1db954';
      case 'apple music': return '#fa243c';
      case 'tidal': return '#00ffff';
      case 'youtube music': return '#ff0000';
      case 'amazon music': return '#ff9900';
      case 'deezer': return '#a238ff';
      default: return 'var(--accent-green)';
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar" style={{ marginBottom: '16px' }}>
        <div>
          <h2 className="card-title">
            <Radio size={18} style={{ color: 'var(--accent-green)' }} />
            Live Listening Stream & Royalty Ticker
          </h2>
          <p className="card-subtitle">Real-time user engagement & instant streaming payouts</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="pulse-dot" />
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 600, letterSpacing: '0.04em' }}>
            LIVE FEED
          </span>
        </div>
      </div>

      <div className="activity-feed-wrapper">
        {activities.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Listening for incoming user events...
          </div>
        ) : (
          activities.map((act) => {
            const platColor = getPlatformColor(act.platform);

            return (
              <div key={act.id} className="activity-event-card">
                <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                  {act.artworkUrl ? (
                    <img
                      src={act.artworkUrl}
                      alt={act.songTitle}
                      style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    getActionBadge(act.type)
                  )}
                  {act.artworkUrl && (
                    <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', transform: 'scale(0.8)' }}>
                      {getActionBadge(act.type)}
                    </div>
                  )}
                </div>

                <div className="activity-details">
                  <div className="activity-action-line">
                    <span style={{ color: 'var(--text-secondary)' }}>{act.user}</span>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>{getActionText(act.type)}</span>{' '}
                    <button
                      className="track-link-btn"
                      onClick={() => onOpenTrack?.(act.songId)}
                      style={{ fontWeight: 600 }}
                    >
                      "{act.songTitle}"
                    </button>
                  </div>

                  <div className="activity-sub-line">
                    <span>{act.artist}</span>
                    <span>•</span>
                    {act.platform && (
                      <span
                        className="live-platform-tag"
                        style={{ color: platColor, borderColor: `${platColor}40` }}
                      >
                        {act.platform}
                      </span>
                    )}
                    <span>•</span>
                    <span>{act.country}</span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      {act.device?.includes('Mobile') ? <Smartphone size={10} /> : <Monitor size={10} />}
                      {act.device}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="activity-time">{formatTimeAgo(act.timestamp)}</span>
                  {act.type === 'play' && act.payout && act.payout > 0 && (
                    <span className="live-payout-pill" title="Instant gross royalty generated">
                      +${act.payout.toFixed(4)}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          className="btn-secondary"
          style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          onClick={onSimulateClick}
        >
          ⚡ Simulate Custom Stream Event
        </button>
      </div>
    </div>
  );
}
