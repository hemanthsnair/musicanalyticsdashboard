import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function PlaysTrendChart({ data = [], timeframe = '7d', onTimeframeChange }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading streaming velocity data...
      </div>
    );
  }

  const width = 700;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = Math.max(...data.map(d => d.plays)) * 1.12 || 100;
  const minVal = Math.min(...data.map(d => d.plays)) * 0.85 || 0;

  // Compute SVG points
  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((d.plays - minVal) / (maxVal - minVal || 1)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  // Generate smooth cubic bezier SVG path
  const generateCurvedPath = (pts) => {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = generateCurvedPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
      <div className="card-header-bar">
        <div>
          <h2 className="card-title">
            <Activity size={18} style={{ color: 'var(--accent-green)' }} />
            Streaming Playback Velocity
          </h2>
          <p className="card-subtitle">Aggregate stream volume & audience listening telemetry</p>
        </div>

        <div className="timeframe-selector">
          {[
            { id: '24h', label: '24H' },
            { id: '7d', label: '7D' },
            { id: '30d', label: '30D' },
            { id: '12m', label: '12M' }
          ].map(t => (
            <button
              key={t.id}
              className={`timeframe-btn ${timeframe === t.id ? 'active' : ''}`}
              onClick={() => onTimeframeChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="chart-container"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chart-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="playsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          {[0.2, 0.5, 0.8].map((ratio, idx) => {
            const y = paddingY + ratio * (height - paddingY * 2);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#playsGradient)" />

          {/* Glowing Stroke Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Hover Crosshair and Dot */}
          {hoveredPoint && (
            <g>
              <line
                x1={hoveredPoint.x}
                y1={paddingY}
                x2={hoveredPoint.x}
                y2={height - paddingY}
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="6"
                fill="#10b981"
                stroke="#090d16"
                strokeWidth="3"
                filter="url(#glow)"
              />
            </g>
          )}

          {/* Invisible interactive hover hit areas */}
          {points.map((pt, i) => {
            const colWidth = (width - paddingX * 2) / (points.length - 1 || 1);
            return (
              <rect
                key={i}
                x={pt.x - colWidth / 2}
                y={0}
                width={colWidth}
                height={height}
                fill="transparent"
                style={{ cursor: 'crosshair' }}
                onMouseEnter={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredPoint && (
          <div
            className="chart-tooltip"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`
            }}
          >
            <div className="chart-tooltip-label">{hoveredPoint.label}</div>
            <div className="chart-tooltip-value">
              {hoveredPoint.plays.toLocaleString()} plays
            </div>
            {hoveredPoint.uniqueListeners && (
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {hoveredPoint.uniqueListeners.toLocaleString()} unique listeners
              </div>
            )}
          </div>
        )}
      </div>

      {/* X-axis labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px 20px 0 20px',
          color: 'var(--text-dim)',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)'
        }}
      >
        {points.filter((_, idx) => idx % Math.ceil(points.length / 6) === 0 || idx === points.length - 1).map((pt, idx) => (
          <span key={idx}>{pt.label}</span>
        ))}
      </div>
    </div>
  );
}
