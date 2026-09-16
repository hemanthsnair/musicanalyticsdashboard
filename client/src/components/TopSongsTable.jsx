import React from 'react';
import { Play, Pause, Music, Flame, Sparkles } from 'lucide-react';

export default function TopSongsTable({
  songs = [],
  currentPlayingSong = null,
  isPlaying = false,
  onPlaySong,
  selectedGenre = 'all',
  onGenreChange,
  searchQuery = '',
  onSearchChange
}) {
  const genres = ['all', 'Synthwave', 'Indie Pop', 'Cyberpunk', 'Lo-Fi Beats', 'EDM', 'R&B / Soul'];

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 className="card-title">
            <Flame size={19} style={{ color: 'var(--accent-rose)' }} />
            Most Played Tracks
          </h2>
          <p className="card-subtitle">Global stream leaders & listener retention analytics</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(15, 23, 42, 0.8)' }}
          >
            {genres.map(g => (
              <option key={g} value={g}>
                {g === 'all' ? 'All Genres' : g}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search tracks or artists..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="form-input"
            style={{ width: '180px', padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(15, 23, 42, 0.8)' }}
          />
        </div>
      </div>

      <div className="songs-table-wrapper">
        <table className="songs-table">
          <thead>
            <tr>
              <th style={{ width: '36px' }}>#</th>
              <th>Track & Artist</th>
              <th>Genre</th>
              <th>Plays</th>
              <th>Skip Rate</th>
              <th>Completion</th>
              <th>Popularity</th>
              <th>Length</th>
              <th style={{ textAlign: 'center', width: '50px' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {songs.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No tracks match your filter query.
                </td>
              </tr>
            ) : (
              songs.map((song) => {
                const isThisPlaying = currentPlayingSong?.id === song.id && isPlaying;

                return (
                  <tr
                    key={song.id}
                    className={`song-row ${isThisPlaying ? 'is-active-playing' : ''}`}
                  >
                    {/* Rank */}
                    <td>
                      <span className={`song-rank ${song.rank <= 3 ? 'top-3' : ''}`}>
                        {song.rank}
                      </span>
                    </td>

                    {/* Track info with cover art */}
                    <td>
                      <div className="song-title-cell">
                        <div
                          className="song-cover"
                          style={{ background: song.coverColor || 'var(--accent-green)' }}
                        >
                          <Music size={18} color="#ffffff" style={{ opacity: 0.85 }} />
                          <button
                            className="play-overlay-btn"
                            onClick={() => onPlaySong(song)}
                            title={isThisPlaying ? 'Pause' : 'Play preview'}
                          >
                            {isThisPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                        </div>

                        <div className="song-meta">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="song-name">{song.title}</span>
                            {song.rank === 1 && (
                              <span style={{ color: '#fbbf24' }} title="#1 Global">
                                <Sparkles size={13} />
                              </span>
                            )}
                          </div>
                          <span className="song-artist">{song.artist} • {song.album}</span>
                        </div>
                      </div>
                    </td>

                    {/* Genre */}
                    <td>
                      <span className="badge-tag">{song.genre}</span>
                    </td>

                    {/* Plays */}
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {song.plays.toLocaleString()}
                      </span>
                    </td>

                    {/* Skip Rate */}
                    <td>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: song.skipRate > 18 ? 'var(--accent-rose)' : 'var(--text-secondary)'
                      }}>
                        {song.skipRate}%
                      </span>
                    </td>

                    {/* Completion Rate */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '40px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${song.completionRate}%`, height: '100%', background: 'var(--accent-green)' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {song.completionRate}%
                        </span>
                      </div>
                    </td>

                    {/* Popularity score meter */}
                    <td>
                      <div className="popularity-meter">
                        <div className="pop-bar">
                          <div className="pop-fill" style={{ width: `${song.popularity}%` }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {song.popularity}
                        </span>
                      </div>
                    </td>

                    {/* Duration */}
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {formatDuration(song.duration)}
                      </span>
                    </td>

                    {/* Play/Soundwave Action Button */}
                    <td style={{ textAlign: 'center' }}>
                      {isThisPlaying ? (
                        <div className="sound-wave-bars" style={{ margin: '0 auto' }}>
                          <span className="wave-bar" />
                          <span className="wave-bar" />
                          <span className="wave-bar" />
                          <span className="wave-bar" />
                        </div>
                      ) : (
                        <button
                          onClick={() => onPlaySong(song)}
                          style={{
                            padding: '6px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.06)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-secondary)'
                          }}
                          title="Preview Track"
                        >
                          <Play size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
