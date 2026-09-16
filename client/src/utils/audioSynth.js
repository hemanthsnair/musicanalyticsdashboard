// Browser Web Audio API Synthesizer for instant track preview
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentSongId = null;
    this.timer = null;
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playSong(song, onTick) {
    this.stop();
    this.init();
    this.isPlaying = true;
    this.currentSongId = song.id;

    const notes = song.previewNotes || [440, 554.37, 659.25, 880];
    let noteIdx = 0;

    // Create master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Arpeggio loop every 260ms
    const intervalMs = Math.max(180, Math.round(60000 / (song.bpm || 120) / 2));

    this.timer = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;

      const freq = notes[noteIdx % notes.length];
      noteIdx++;

      // Synth tone oscillator
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Gentle filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = song.genre === "Cyberpunk" ? "sawtooth" : song.genre === "Lo-Fi Beats" ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope ADSR
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + (intervalMs / 1000) * 0.9);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + (intervalMs / 1000));

      if (onTick) onTick(noteIdx);
    }, intervalMs);
  }

  stop() {
    this.isPlaying = false;
    this.currentSongId = null;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  setVolume(vol) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, vol)) * 0.3, this.ctx.currentTime);
    }
  }
}

export const audioSynth = new AudioSynth();
