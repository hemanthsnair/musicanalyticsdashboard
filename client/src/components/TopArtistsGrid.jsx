import React from 'react';
import { Users, CheckCircle2, TrendingUp, Music2, ArrowUpRight } from 'lucide-react';

export default function TopArtistsGrid({ artists = [], onOpenArtist, onOpenTrack }) {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar">
        <div>
          <h2 className="card-title">
            <Users size={19} style={{ color: 'var(--accent-cyan)' }} />
            Top Artists, Creator Reach & Catalog Royalties
          </h2>
          <p className="card-subtitle">Streaming powerhouses, monthly listener momentum, and catalog payouts</p>
        </div>
      </div>

      <div className="artists-grid">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="glass-panel artist-card"
            onClick={() => onOpenArtist?.(artist.id)}
            style={{ cursor: 'pointer' }}
          >
            {/* Header */}
            <div className="artist-header">
              <div
                className="artist-avatar"
                style={{
                  background: artist.avatarColor || 'var(--accent-green)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {artist.avatarUrl ? (
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  artist.name.charAt(0)
                )}
                {artist.verified && (
                  <div className="artist-verified-check" title="Verified Artist">
                    <CheckCircle2 size={12} color="#ffffff" fill="#3b82f6" />
                  </div>
                )}
              </div>

              <div className="artist-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3>{artist.name}</h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--accent-green)',
                      fontWeight: 700
                    }}
                  >
                    #{artist.rank}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <span className="artist-genre-chip">{artist.primaryGenre}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>• {artist.country}</span>
                </div>
              </div>
            </div>

            {/* Bio snippet */}
            <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {artist.bio}
            </p>

            {/* Metrics */}
            <div className="artist-stats-row">
              <div className="artist-stat-item">
                <span className="artist-stat-label">Monthly Listeners</span>
                <span className="artist-stat-val">
                  {(artist.monthlyListeners / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="artist-stat-item">
                <span className="artist-stat-label">Total Streams</span>
                <span className="artist-stat-val">
                  {artist.totalStreams >= 1000000000
                    ? `${(artist.totalStreams / 1000000000).toFixed(2)}B`
                    : `${(artist.totalStreams / 1000000).toFixed(1)}M`}
                </span>
              </div>
              <div className="artist-stat-item highlight-revenue">
                <span className="artist-stat-label">Catalog Revenue</span>
                <span className="artist-stat-val text-green">
                  ${artist.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0'}
                </span>
              </div>
            </div>

            {/* Footer with top track and growth */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="artist-top-song">
                <Music2 size={13} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {artist.topSong}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="trend-badge trend-up">
                  <TrendingUp size={12} />
                  <span>+{artist.growthRate}%</span>
                </div>
                <ArrowUpRight size={14} color="var(--text-dim)" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
