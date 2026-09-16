import React from 'react';
import { Smartphone, Globe } from 'lucide-react';

export default function DemographicsPanel({ demographics = null }) {
  if (!demographics) return null;

  const { devices = [], countries = [] } = demographics;

  return (
    <div className="demographics-grid">
      {/* Platform & Devices */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div className="card-header-bar" style={{ marginBottom: '18px' }}>
          <div>
            <h2 className="card-title">
              <Smartphone size={18} style={{ color: 'var(--accent-green)' }} />
              Platform & Ecosystem
            </h2>
            <p className="card-subtitle">Device share across active listening sessions</p>
          </div>
        </div>

        <div>
          {devices.map((d, idx) => (
            <div key={idx} className="device-item">
              <div className="device-info">
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{d.device}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  {d.percentage}%{' '}
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.74rem' }}>
                    ({(d.count / 1000).toFixed(0)}k)
                  </span>
                </span>
              </div>
              <div className="genre-bar-bg">
                <div
                  className="genre-bar-fill"
                  style={{ width: `${d.percentage}%`, background: d.color || 'var(--accent-green)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Audience Geography */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div className="card-header-bar" style={{ marginBottom: '18px' }}>
          <div>
            <h2 className="card-title">
              <Globe size={18} style={{ color: 'var(--accent-cyan)' }} />
              Audience Geography
            </h2>
            <p className="card-subtitle">Top listening regions by stream volume</p>
          </div>
        </div>

        <div>
          {countries.slice(0, 6).map((c, idx) => (
            <div key={idx} className="country-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>{c.flag}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.country}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '80px', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${c.percentage * 2.5}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))'
                    }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '42px', textAlign: 'right' }}>
                  {c.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
