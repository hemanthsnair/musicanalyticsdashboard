import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function AudioPlayerBar({ currentSong, isPlaying, onTogglePlay }) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, (currentSong.duration * 10)); // progress scaled to duration
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong]);

  if (!currentSong) {
    return null;
  }

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    audioSynth.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioSynth.setVolume(volume);
    } else {
      setIsMuted(true);
      audioSynth.setVolume(0);
    }
  };

  const currentSeconds = Math.floor((progress / 100) * (currentSong.duration || 180));
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="audio-player-dock">
      {/* Left info */}
      <div className="player-left">
        <div
          className="player-cover"
          style={{ background: currentSong.coverColor || 'var(--accent-green)' }}
        >
          <Disc size={22} color="#ffffff" style={{ animation: isPlaying ? 'spin 4s linear infinite' : 'none' }} />
        </div>

        <div className="player-track-info">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist} • {currentSong.genre}</p>
        </div>
      </div>

      {/* Center Controls */}
      <div className="player-center">
        <div className="player-controls">
          <button
            className="play-pause-circle"
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Preview' : 'Play Preview'}
          >
            {isPlaying ? <Pause size={18} fill="#022c22" /> : <Play size={18} fill="#022c22" style={{ marginLeft: '2px' }} />}
          </button>
        </div>

        <div className="player-progress-bar">
          <span>{formatTime(currentSeconds)}</span>
          <div
            className="progress-track"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setProgress(newPct);
            }}
          >
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{formatTime(currentSong.duration || 180)}</span>
        </div>
      </div>

      {/* Right controls: Equalizer + Volume */}
      <div className="player-right">
        {isPlaying && (
          <div className="sound-wave-bars" style={{ marginRight: '8px' }}>
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
            <span className="wave-bar" />
          </div>
        )}

        <button onClick={handleToggleMute} style={{ color: 'var(--text-secondary)' }}>
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          style={{ width: '80px', accentColor: 'var(--accent-green)', cursor: 'pointer' }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
