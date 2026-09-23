import React, { useState, useEffect } from 'react';
import {
  Radio,
  DollarSign,
  Headphones,
  Filter,
  Sparkles
} from 'lucide-react';

export default function PlatformBreakdownView({
  selectedPlatform = 'all',
  onSelectPlatform
}) {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/platforms')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setPlatforms(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching platforms:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalRevenue = platforms.reduce((acc, p) => acc + (p.revenue || 0), 0);
  const totalPlays = platforms.reduce((acc, p) => acc + (p.plays || 0), 0);

  // Highest payout platform
  const highestPayoutPlatform = [...platforms].sort((a, b) => b.payoutRate - a.payoutRate)[0];

  return (
    <div className="platforms-view-container">
      {/* View Header */}
      <div className="card-header-bar" style={{ marginBottom: '20px' }}>
        <div>
          <h2 className="card-title">
            <Radio size={20} style={{ color: 'var(--accent-cyan)' }} />
            Streaming Application Intelligence & Royalty Economics
          </h2>
          <p className="card-subtitle">
            Cross-platform telemetry, payout rate disparity, market share distribution, and gross revenue generated
          </p>
        </div>

        {selectedPlatform !== 'all' && (
          <button
            className="btn-secondary"
            onClick={() => onSelectPlatform('all')}
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          >
            Reset Platform Filter (Viewing {selectedPlatform.replace('_', ' ').toUpperCase()})
          </button>
        )}
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div className="pulse-dot" style={{ margin: '0 auto 16px auto' }} />
          <p>Loading streaming application telemetry & economics...</p>
        </div>
      ) : (
        <>
          {/* Summary KPI Cards */}
          <div className="kpi-grid" style={{ marginBottom: '24px' }}>
            <div className="glass-panel metric-card border-green">
          <div className="metric-header">
            <span className="metric-title">Total Royalty Pool</span>
            <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value text-green">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="metric-subtext">Cumulative gross payout across all DSPs</p>
        </div>

        <div className="glass-panel metric-card border-cyan">
          <div className="metric-header">
            <span className="metric-title">Highest Payout Platform</span>
            <div className="metric-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">
              {highestPayoutPlatform?.name || 'Tidal'}
            </span>
          </div>
          <p className="metric-subtext">
            <strong>${highestPayoutPlatform?.payoutRate.toFixed(4)}</strong> per stream (~$12.50 / 1k streams)
          </p>
        </div>

        <div className="glass-panel metric-card border-purple">
          <div className="metric-header">
            <span className="metric-title">Stream Volume Leader</span>
            <div className="metric-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)' }}>
              <Headphones size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">Spotify (44.5%)</span>
          </div>
          <p className="metric-subtext">Leading global listener ecosystem</p>
        </div>

        <div className="glass-panel metric-card border-amber">
          <div className="metric-header">
            <span className="metric-title">DSP Platforms Tracked</span>
            <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <Radio size={18} />
            </div>
          </div>
          <div className="metric-value-row">
            <span className="metric-value">6 Major Services</span>
          </div>
          <p className="metric-subtext">Real-time telemetry ingestion active</p>
        </div>
      </div>

      {/* Cross-Platform Share vs Revenue Comparison Bar */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Stream Volume Share vs Gross Royalty Share
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Notice how higher-payout platforms (Apple Music & Tidal) generate a significantly larger share of revenue than raw stream volume.
            </p>
          </div>
        </div>

        {/* Stream Share Bar */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Stream Volume Distribution</span>
            <span>Total: {totalPlays.toLocaleString()} Plays</span>
          </div>
          <div className="multi-segment-bar">
            {platforms.map(p => (
              <div
                key={p.id}
                className="multi-segment"
                style={{ width: `${p.sharePercent}%`, background: p.color }}
                title={`${p.name}: ${p.sharePercent}% of total plays (${p.plays.toLocaleString()} streams)`}
              />
            ))}
          </div>
        </div>

        {/* Revenue Share Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            <span>Gross Royalty Revenue Distribution</span>
            <span>Total: ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</span>
          </div>
          <div className="multi-segment-bar">
            {platforms.map(p => (
              <div
                key={p.id}
                className="multi-segment"
                style={{ width: `${p.revenueSharePercent}%`, background: p.color }}
                title={`${p.name}: ${p.revenueSharePercent}% of total royalties ($${p.revenue.toLocaleString()})`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="platform-legend">
          {platforms.map(p => (
            <div key={p.id} className="legend-item">
              <span className="legend-dot" style={{ background: p.color }} />
              <span className="legend-label">{p.name}</span>
              <span className="legend-sub">({p.sharePercent}% vol / {p.revenueSharePercent}% rev)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Platform Cards Grid */}
      <div className="platform-cards-grid">
        {platforms.map(plat => {
          const isSelected = selectedPlatform === plat.id;

          return (
            <div
              key={plat.id}
              className={`glass-panel platform-card ${isSelected ? 'is-selected-platform' : ''}`}
            >
              {/* Header */}
              <div className="platform-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    className="platform-card-badge"
                    style={{ background: plat.color }}
                  >
                    {plat.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="platform-name">{plat.name}</h3>
                    <span className="platform-tagline">{plat.tagline}</span>
                  </div>
                </div>

                <div className="platform-rate-pill">
                  ${plat.payoutRate.toFixed(4)}/stream
                </div>
              </div>

              {/* Stats Grid */}
              <div className="platform-stats-grid">
                <div className="p-stat-box">
                  <span className="p-stat-label">Total Streams</span>
                  <span className="p-stat-val">{plat.plays.toLocaleString()}</span>
                  <span className="p-stat-sub">{plat.sharePercent}% of total</span>
                </div>

                <div className="p-stat-box highlight-revenue">
                  <span className="p-stat-label">Gross Revenue</span>
                  <span className="p-stat-val text-green">
                    ${plat.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="p-stat-sub">${plat.avgPayoutPerThousand} / 1k plays</span>
                </div>
              </div>

              {/* Audio Tier & Subscribers info */}
              <div className="platform-features-list">
                <div className="p-feature-item">
                  <span className="p-feature-label">Audio Quality:</span>
                  <span className="p-feature-val">{plat.quality}</span>
                </div>
                <div className="p-feature-item">
                  <span className="p-feature-label">Global Subscribers:</span>
                  <span className="p-feature-val">{(plat.subscribers / 1000000).toFixed(0)}M</span>
                </div>
              </div>

              {/* Action Button to Filter Dashboard by this Platform */}
              <div style={{ marginTop: '16px' }}>
                <button
                  className={`btn-platform-filter ${isSelected ? 'active-filter' : ''}`}
                  onClick={() => onSelectPlatform(isSelected ? 'all' : plat.id)}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    border: `1px solid ${isSelected ? plat.color : 'var(--border-subtle)'}`,
                    background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent'
                  }}
                >
                  <Filter size={13} style={{ color: plat.color }} />
                  <span>
                    {isSelected ? 'Clear Platform Filter' : `Filter Dashboard by ${plat.name}`}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </>
      )}
    </div>
  );
}
