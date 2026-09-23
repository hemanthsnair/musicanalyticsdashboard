import React, { useState, useEffect } from 'react';
import { Disc3, DollarSign, Headphones, Music } from 'lucide-react';

export default function AlbumsGrid({ onSelectAlbum }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/albums')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success) {
          setAlbums(data.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching albums:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar">
        <div>
          <h2 className="card-title">
            <Disc3 size={19} style={{ color: 'var(--accent-purple)' }} />
            Album Catalog Performance & Royalties
          </h2>
          <p className="card-subtitle">
            Long-playing releases, cumulative streams, gross album revenue, and standout tracks
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div className="pulse-dot" style={{ margin: '0 auto 16px auto' }} />
          <p>Loading album catalog data...</p>
        </div>
      ) : (
        <div className="albums-grid">
          {albums.map((album) => (
            <div
              key={album.id}
              className="glass-panel album-card"
              onClick={() => onSelectAlbum(album.id)}
            >
              {/* Album Art with Neon Depth */}
              <div
                className="album-cover-art"
                style={{
                  background: album.coverColor || 'var(--accent-purple)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {album.artworkUrl ? (
                  <img
                    src={album.artworkUrl}
                    alt={album.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <Disc3 size={44} color="#ffffff" className="album-disc-icon" />
                )}
                <span className="album-year-badge">{album.releaseYear}</span>
              </div>

              {/* Album Info */}
              <div className="album-card-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <h3 className="album-title">{album.title}</h3>
                  <span className="badge-pill badge-genre">{album.genre}</span>
                </div>

                <div className="album-artist-name">{album.artist}</div>

                <p className="album-desc-snippet">{album.description}</p>

                {/* Metrics */}
                <div className="album-stats-row">
                  <div className="album-stat-item">
                    <span className="album-stat-label">
                      <Headphones size={12} /> Total Streams
                    </span>
                    <span className="album-stat-val">
                      {album.totalPlays >= 1000000000
                        ? `${(album.totalPlays / 1000000000).toFixed(2)}B`
                        : `${(album.totalPlays / 1000000).toFixed(1)}M`}
                    </span>
                  </div>

                  <div className="album-stat-item">
                    <span className="album-stat-label">
                      <DollarSign size={12} style={{ color: 'var(--accent-green)' }} /> Gross Revenue
                    </span>
                    <span className="album-stat-val text-green">
                      ${album.totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Standout Track & Track count */}
                <div className="album-footer-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    <Music size={13} style={{ color: 'var(--accent-cyan)' }} />
                    <span>Top: <strong>{album.topTrack?.title || 'Track 1'}</strong></span>
                  </div>

                  <span className="album-tracks-pill">
                    {album.trackCount} {album.trackCount === 1 ? 'Track' : 'Tracks'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
