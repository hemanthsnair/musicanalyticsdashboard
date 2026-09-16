import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({ title, value, change, subtext, icon: Icon, color = 'emerald' }) {
  const isPositive = change >= 0;
  const colorMap = {
    emerald: {
      bg: 'rgba(16, 185, 129, 0.12)',
      color: '#10b981',
      glow: 'rgba(16, 185, 129, 0.3)'
    },
    cyan: {
      bg: 'rgba(6, 182, 212, 0.12)',
      color: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.3)'
    },
    purple: {
      bg: 'rgba(139, 92, 246, 0.12)',
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.3)'
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.12)',
      color: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.3)'
    }
  };

  const theme = colorMap[color] || colorMap.emerald;

  // Mini decorative SVG sparkline curve
  const sparklinePoints = isPositive 
    ? "0,25 15,22 30,24 45,18 60,15 75,17 90,8 105,10 120,4"
    : "0,5 15,10 30,8 45,16 60,14 75,20 90,18 105,24 120,26";

  return (
    <div className="glass-panel kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        {Icon && (
          <div className="kpi-icon-badge" style={{ background: theme.bg, color: theme.color }}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="kpi-value-row">
        <div className="kpi-value">{value}</div>
        {change !== undefined && (
          <div className={`trend-badge ${isPositive ? 'trend-up' : 'trend-down'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="kpi-subtext">{subtext}</span>
        
        {/* Subtle mini sparkline */}
        <svg width="70" height="20" viewBox="0 0 120 30" style={{ overflow: 'visible', opacity: 0.6 }}>
          <polyline
            fill="none"
            stroke={theme.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={sparklinePoints}
          />
        </svg>
      </div>
    </div>
  );
}
