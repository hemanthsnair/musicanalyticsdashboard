import React from 'react';
import { PieChart, Disc } from 'lucide-react';

export default function GenreDonutChart({ genres = [] }) {
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar" style={{ marginBottom: '16px' }}>
        <div>
          <h2 className="card-title">
            <PieChart size={18} style={{ color: 'var(--accent-purple)' }} />
            Genre Velocity
          </h2>
          <p className="card-subtitle">Audience taste breakdown</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0 20px 0' }}>
        <div style={{ position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={strokeWidth}
            />

            {/* Segments */}
            {genres.map((g, idx) => {
              const dashoffset = circumference - (g.percentage / 100) * circumference;
              const rotation = (cumulativePercent / 100) * 360;
              cumulativePercent += g.percentage;

              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={g.color || '#10b981'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={dashoffset}
                  style={{
                    transformOrigin: 'center',
                    transform: `rotate(${rotation}deg)`,
                    transition: 'all 0.6s ease'
                  }}
                />
              );
            })}
          </svg>

          {/* Center Info */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <Disc size={22} style={{ color: 'var(--accent-purple)', opacity: 0.8 }} />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {genres.length} Genres
            </span>
          </div>
        </div>
      </div>

      {/* Genre list breakdown */}
      <div className="genre-list">
        {genres.slice(0, 5).map((g, idx) => (
          <div key={idx} className="genre-item">
            <div className="genre-info">
              <div className="genre-name">
                <span className="genre-dot" style={{ background: g.color || '#10b981' }} />
                <span>{g.name}</span>
              </div>
              <div className="genre-plays">
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{g.percentage}%</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.74rem', marginLeft: '6px' }}>
                  ({(g.plays / 1000).toFixed(0)}k)
                </span>
              </div>
            </div>
            <div className="genre-bar-bg">
              <div
                className="genre-bar-fill"
                style={{
                  width: `${g.percentage}%`,
                  background: g.color || '#10b981'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
