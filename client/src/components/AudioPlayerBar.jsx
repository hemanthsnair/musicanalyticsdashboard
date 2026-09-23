import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export default function AudioPlayerBar({ currentSong, isPlaying, onTogglePlay }) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isPlaying && currentSong) {
      if (audioSynth.audioElement && currentSong.previewUrl) {
        const updateProg = () => {
          const el = audioSynth.audioElement;
          if (el && el.duration) {
            setProgress((el.currentTime / el.duration) * 100);
          }
        };
        const handleEnded = () => {
          onTogglePlay();
          setProgress(0);
        };

        audioSynth.audioElement.addEventListener('timeupdate', updateProg);
        audioSynth.audioElement.addEventListener('ended', handleEnded);

        return () => {
          if (audioSynth.audioElement) {
            audioSynth.audioElement.removeEventListener('timeupdate', updateProg);
            audioSynth.audioElement.removeEventListener('ended', handleEnded);
          }
        };
      } else {
        const duration = currentSong.duration || 180;
        interval = setInterval(() => {
          setProgress(prev => (prev >= 100 ? 0 : prev + 1));
        }, duration * 10);
      }
    } else {
      setProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong, onTogglePlay]);

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

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newPct);
    audioSynth.seek(newPct);
  };

  const isRealStream = !!currentSong.previewUrl;
  const streamDuration = isRealStream ? 30 : (currentSong.duration || 180);
  const currentSeconds = Math.floor((progress / 100) * streamDuration);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="audio-player-dock">
      {/* Left info with authentic cover artwork */}
      <div className="player-left">
        <div
          className="player-cover"
          style={{
            background: currentSong.coverColor || 'var(--accent-green)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {currentSong.artworkUrl ? (
            <img
              src={currentSong.artworkUrl}
              alt={currentSong.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <Disc size={22} color="#ffffff" style={{ animation: isPlaying ? 'spin 4s linear infinite' : 'none' }} />
          )}
        </div>

        <div className="player-track-info" style={{ maxWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4 style={{ margin: 0 }}>{currentSong.title}</h4>
            {isRealStream && (
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  padding: '2px 5px',
                  borderRadius: '4px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: 'var(--accent-green)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  whiteSpace: 'nowrap'
                }}
                title="Verified 30-second studio master AAC stream"
              >
                MASTER
              </span>
            )}
          </div>
          <p style={{ margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentSong.artist} • {currentSong.album || currentSong.genre}
          </p>
        </div>
      </div>

      {/* Center Controls */}
      <div className="player-center">
        <div className="player-controls">
          <button
            className="play-pause-circle"
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Preview' : 'Play Master Preview'}
          >
            {isPlaying ? <Pause size={18} fill="#022c22" /> : <Play size={18} fill="#022c22" style={{ marginLeft: '2px' }} />}
          </button>
        </div>

        <div className="player-progress-bar">
          <span>{formatTime(currentSeconds)}</span>
          <div
            className="progress-track"
            onClick={handleSeek}
            title="Click to seek"
          >
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{formatTime(streamDuration)}</span>
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

        <button onClick={handleToggleMute} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
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
