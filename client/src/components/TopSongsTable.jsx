import React from 'react';
import {
  Play,
  Pause,
  Music,
  Flame,
  DollarSign,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function TopSongsTable({
  songs = [],
  currentPlayingSong = null,
  isPlaying = false,
  onPlaySong,
  selectedGenre = 'all',
  onGenreChange,
  searchQuery = '',
  onSearchChange,
  sortBy = 'plays',
  onSortByChange,
  onOpenTrack,
  onOpenArtist,
  onOpenAlbum,
  selectedPlatform = 'all',
  timeframe = 'all-time',
  onTimeframeChange
}) {
  const genres = ['all', 'Pop', 'R&B', 'Hip-Hop', 'Alternative Pop', 'Nu-Disco', 'Synth-Pop', 'Rock', 'Country'];

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const timeframeLabels = {
    'all-time': 'All-Time Record',
    '12m': 'Past 12 Months',
    '30d': 'Past 30 Days',
    '7d': 'Past 7 Days',
    '24h': 'Past 24 Hours'
  };

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div className="card-header-bar" style={{ flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="card-title">
              {sortBy === 'revenue' ? (
                <DollarSign size={20} style={{ color: 'var(--accent-green)' }} />
              ) : (
                <Flame size={20} style={{ color: 'var(--accent-rose)' }} />
              )}
              {sortBy === 'revenue' ? 'Top Gross Revenue Generating Tracks' : 'Most Streamed Tracks'}
            </h2>
            {selectedPlatform !== 'all' && (
              <span className="badge-pill badge-rank" style={{ textTransform: 'uppercase' }}>
                {selectedPlatform.replace('_', ' ')}
              </span>
            )}
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--accent-cyan)',
                background: 'rgba(6, 182, 212, 0.12)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 600,
                letterSpacing: '0.03em'
              }}
            >
              {timeframeLabels[timeframe] || 'All-Time'}
            </span>
          </div>
          <p className="card-subtitle">
            {sortBy === 'revenue'
              ? 'Ranked by cumulative dollar royalties earned across digital streaming platforms'
              : selectedPlatform !== 'all'
                ? `Ranked by verified streaming volume and chart positions on ${selectedPlatform.replace('_', ' ').toUpperCase()}`
                : 'Ranked by playback volume, listener velocity, and global platform retention'}
          </p>
        </div>

        {/* Sort & Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {/* Timeframe Selector Pills */}
          <div className="segmented-control" title="Select time period for rankings">
            {[
              { id: 'all-time', label: 'All-Time' },
              { id: '12m', label: '12M' },
              { id: '30d', label: '30D' },
              { id: '7d', label: '7D' },
              { id: '24h', label: '24H' }
            ].map(tf => (
              <button
                key={tf.id}
                className={`segment-btn ${timeframe === tf.id ? 'active' : ''}`}
                onClick={() => onTimeframeChange?.(tf.id)}
              >
                <span>{tf.label}</span>
              </button>
            ))}
          </div>

          {/* Sort Switcher (Plays vs Revenue vs Completion) */}
          <div className="segmented-control">
            <button
              className={`segment-btn ${sortBy === 'plays' ? 'active' : ''}`}
              onClick={() => onSortByChange?.('plays')}
              title="Sort by Total Streams"
            >
              <Flame size={13} />
              <span>Most Streamed</span>
            </button>
            <button
              className={`segment-btn ${sortBy === 'revenue' ? 'active' : ''}`}
              onClick={() => onSortByChange?.('revenue')}
              title="Sort by Gross Royalty Revenue"
            >
              <DollarSign size={13} style={{ color: 'var(--accent-green)' }} />
              <span>Highest Revenue</span>
            </button>
            <button
              className={`segment-btn ${sortBy === 'completion' ? 'active' : ''}`}
              onClick={() => onSortByChange?.('completion')}
              title="Sort by Listener Retention"
            >
              <span>Retention %</span>
            </button>
          </div>

          {/* Genre Filter */}
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

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search tracks, artists..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="form-input"
            style={{ width: '160px', padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(15, 23, 42, 0.8)' }}
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
              <th>{selectedPlatform !== 'all' ? `${selectedPlatform.replace('_', ' ')} Plays` : 'Total Streams'}</th>
              <th>Gross Revenue</th>
              <th>Completion</th>
              <th>DSP Platforms</th>
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
                const displayPlays = song.displayPlays ?? song.plays;
                const displayRevenue = song.displayRevenue ?? song.totalRevenue ?? 0;

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
                          style={{
                            background: song.coverColor || 'var(--accent-green)',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                          onClick={() => onOpenTrack?.(song.id)}
                          title="Click to view deep track insights"
                        >
                          {song.artworkUrl ? (
                            <img
                              src={song.artworkUrl}
                              alt={song.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <Music size={18} color="#ffffff" style={{ opacity: 0.85 }} />
                          )}
                          <button
                            className="play-overlay-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlaySong(song);
                            }}
                            title={isThisPlaying ? 'Pause' : 'Play preview'}
                          >
                            {isThisPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                        </div>

                        <div className="song-meta">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              className="track-title-btn"
                              onClick={() => onOpenTrack?.(song.id)}
                              title="Click for full track telemetry"
                            >
                              {song.title}
                            </button>
                            {song.rank === 1 && (
                              <span style={{ color: '#fbbf24' }} title="#1 Ranked">
                                <Sparkles size={13} />
                              </span>
                            )}
                          </div>

                          <div className="song-sub-links">
                            <button
                              className="track-link-btn"
                              onClick={() => onOpenArtist?.(song.artistId)}
                            >
                              {song.artist}
                            </button>
                            <span>•</span>
                            <button
                              className="track-link-btn"
                              onClick={() => onOpenAlbum?.(song.albumId)}
                            >
                              {song.album}
                            </button>
                          </div>
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
                        {displayPlays.toLocaleString()}
                      </span>
                    </td>

                    {/* Gross Revenue */}
                    <td>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: 'var(--accent-green)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        ${displayRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

                    {/* Platform Micro-Dots */}
                    <td>
                      <div
                        className="platform-dots-row"
                        onClick={() => onOpenTrack?.(song.id)}
                        title="Click to view DSP breakdown"
                      >
                        <span className="p-dot spotify" title="Spotify" />
                        <span className="p-dot apple" title="Apple Music" />
                        <span className="p-dot tidal" title="Tidal" />
                        <span className="p-dot youtube" title="YouTube Music" />
                        <span className="p-dot amazon" title="Amazon Music" />
                        <ChevronRight size={12} color="var(--text-dim)" />
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
