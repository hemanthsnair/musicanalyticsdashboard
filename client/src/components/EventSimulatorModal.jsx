import React, { useState } from 'react';
import { X, Zap, Activity } from 'lucide-react';

export default function EventSimulatorModal({ songs = [], isOpen, onClose, onEventSent }) {
  const [songId, setSongId] = useState(songs[0]?.id || 'song-1');
  const [platformId, setPlatformId] = useState('spotify');
  const [type, setType] = useState('play');
  const [device, setDevice] = useState('Mobile (iOS)');
  const [country, setCountry] = useState('United States');
  const [user, setUser] = useState('demo_listener');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const countryCodeMap = {
        'United States': 'US',
        'United Kingdom': 'GB',
        'Germany': 'DE',
        'Japan': 'JP',
        'Brazil': 'BR',
        'Canada': 'CA'
      };

      const res = await fetch('/api/events/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId,
          platformId,
          type,
          device,
          country,
          countryCode: countryCodeMap[country] || 'US',
          user: user.trim() || 'stream_user'
        })
      });

      const data = await res.json();
      if (data.success) {
        onEventSent?.(data.data.event);
        onClose();
      }
    } catch (err) {
      console.error('Failed to submit simulated event', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBurstSurge = async () => {
    setIsSubmitting(true);
    try {
      const countries = ['United States', 'Japan', 'Germany', 'United Kingdom', 'Brazil'];
      const devices = ['Mobile (iOS)', 'Mobile (Android)', 'Desktop App'];
      const platforms = ['spotify', 'apple_music', 'tidal', 'youtube_music', 'amazon_music'];

      for (let i = 0; i < 8; i++) {
        const randSong = songs[Math.floor(Math.random() * songs.length)] || { id: songId };
        const randPlat = platforms[Math.floor(Math.random() * platforms.length)];

        await fetch('/api/events/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            songId: randSong.id,
            platformId: randPlat,
            type: 'play',
            device: devices[Math.floor(Math.random() * devices.length)],
            country: countries[Math.floor(Math.random() * countries.length)],
            countryCode: 'US',
            user: `fan_${Math.floor(Math.random() * 800) + 100}`
          })
        });
      }
      onEventSent?.();
      onClose();
    } catch (err) {
      console.error('Surge error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="simulator-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Zap size={22} style={{ color: 'var(--accent-green)' }} />
            <span>Telemetry & Stream Ingestion Simulator</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Inject mock playback, skip, or like events tagged with specific DSP streaming platforms directly into the analytics aggregation engine.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">Target Track</label>
            <select
              value={songId}
              onChange={(e) => setSongId(e.target.value)}
              className="form-select"
            >
              {songs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} — {s.artist} ({s.genre})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Streaming Application (DSP)</label>
              <select
                value={platformId}
                onChange={(e) => setPlatformId(e.target.value)}
                className="form-select"
              >
                <option value="spotify">Spotify ($0.0038/play)</option>
                <option value="apple_music">Apple Music ($0.0080/play)</option>
                <option value="tidal">Tidal ($0.0125/play)</option>
                <option value="youtube_music">YouTube Music ($0.0022/play)</option>
                <option value="amazon_music">Amazon Music ($0.0042/play)</option>
                <option value="deezer">Deezer ($0.0055/play)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Telemetry Action</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select"
              >
                <option value="play">Play Stream (Full Play)</option>
                <option value="skip">Track Skip (Premature)</option>
                <option value="like">Track Favorite / Like</option>
                <option value="playlist_add">Playlist Add</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Client Device</label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="form-select"
              >
                <option value="Mobile (iOS)">Mobile (iOS)</option>
                <option value="Mobile (Android)">Mobile (Android)</option>
                <option value="Desktop App">Desktop App</option>
                <option value="Web Player">Web Player</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Listener Region</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-select"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="Brazil">Brazil</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Listener Identifier</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="form-input"
              placeholder="e.g. user_842"
            />
          </div>

          <div className="modal-btn-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              {isSubmitting ? 'Recording...' : 'Send Live Event'}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleBurstSurge}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Simulates 8 concurrent plays across different tracks and locations"
            >
              <Activity size={15} style={{ color: 'var(--accent-rose)' }} />
              Burst Surge (8x)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
