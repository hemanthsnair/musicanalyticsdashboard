import React from 'react';
import { Smartphone, Globe, MapPin } from 'lucide-react';

export default function DemographicsPanel({
  demographics = null,
  selectedRegion = 'global',
  selectedSubRegion = 'all',
  onSelectCountry,
  onSelectSubRegion
}) {
  if (!demographics) return null;

  const { devices = [], countries = [], subRegions = [], selectedRegionName = 'United States', selectedRegionFlag = '🇺🇸' } = demographics;

  return (
    <div className="demographics-grid" style={{ gridTemplateColumns: subRegions.length > 0 ? 'repeat(auto-fit, minmax(320px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
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
              Country Market Shares
            </h2>
            <p className="card-subtitle">Global stream distribution across major music territories</p>
          </div>
        </div>

        <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
          {countries.slice(0, 10).map((c, idx) => (
            <div
              key={idx}
              className="country-item"
              onClick={() => onSelectCountry?.(c.code || c.id)}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '8px 10px',
                transition: 'background 0.2s ease',
                background: selectedRegion === (c.code || c.id) ? 'rgba(6, 182, 212, 0.12)' : 'transparent'
              }}
              title={`Click to drill down into ${c.country}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>{c.flag}</span>
                <div>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.88rem' }}>{c.country}</div>
                  {c.tag && <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.tag}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '60px', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.min(100, c.percentage * 2.5)}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))'
                    }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: '40px', textAlign: 'right' }}>
                  {c.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State & Sub-Region Distribution */}
      {subRegions.length > 0 && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="card-header-bar" style={{ marginBottom: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 className="card-title">
                  <MapPin size={18} style={{ color: 'var(--accent-amber)' }} />
                  {selectedRegionFlag} {selectedRegionName} Sub-Regions
                </h2>
              </div>
              <p className="card-subtitle">State & province level streaming density & metro hubs</p>
            </div>
          </div>

          <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
            {subRegions.map((sr, idx) => (
              <div
                key={idx}
                className="country-item"
                onClick={() => onSelectSubRegion?.(sr.id)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  transition: 'background 0.2s ease',
                  background: selectedSubRegion === sr.id ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                  border: selectedSubRegion === sr.id ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent'
                }}
                title={`Click to filter dashboard to ${sr.name}`}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.86rem' }}>
                    {sr.name}
                  </div>
                  {sr.metro && (
                    <div style={{ fontSize: '0.70rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      📍 {sr.metro}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '55px', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.min(100, sr.percentage * 2)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-rose))'
                      }}
                    />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-amber)', minWidth: '42px', textAlign: 'right', fontWeight: 600 }}>
                    {sr.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
