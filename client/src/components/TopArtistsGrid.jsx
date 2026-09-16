import React from 'react';
import { Users, CheckCircle2, TrendingUp, Music2 } from 'lucide-react';

export default function TopArtistsGrid({ artists = [] }) {
  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar">
        <div>
          <h2 className="card-title">
            <Users size={19} style={{ color: 'var(--accent-cyan)' }} />
            Top Artists & Creator Velocity
          </h2>
          <p className="card-subtitle">Streaming powerhouses, monthly reach & listener momentum</p>
        </div>
      </div>

      <div className="artists-grid">
        {artists.map((artist) => (
          <div key={artist.id} className="glass-panel artist-card">
            {/* Header */}
            <div className="artist-header">
              <div
                className="artist-avatar"
                style={{ background: artist.avatarColor || 'var(--accent-green)' }}
              >
                {artist.name.charAt(0)}
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
                  {(artist.monthlyListeners / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="artist-stat-item">
                <span className="artist-stat-label">Total Streams</span>
                <span className="artist-stat-val">
                  {(artist.totalStreams / 1000000).toFixed(2)}M
                </span>
              </div>
            </div>

            {/* Footer with top track and growth */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="artist-top-song">
                <Music2 size={13} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {artist.topSong}
                </span>
              </div>

              <div className="trend-badge trend-up">
                <TrendingUp size={12} />
                <span>+{artist.growthRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
