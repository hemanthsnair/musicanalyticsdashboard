// Audio Engine supporting authentic AAC/M4A master preview streaming & Web Audio synth fallback
class AudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentSongId = null;
    this.timer = null;
    this.gainNode = null;
    this.volume = 0.7;
    this.isUsingRealAudio = false;

    // HTML5 Audio for authentic master audio stream
    if (typeof window !== "undefined") {
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = "anonymous";
      this.audioElement.preload = "auto";
    }
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playSong(song, onProgress, onEnded) {
    this.stop();
    this.isPlaying = true;
    this.currentSongId = song.id;

    // Check if song has real master preview URL (.m4a, .aac, .mp3, etc.)
    if (song.previewUrl && this.audioElement) {
      this.isUsingRealAudio = true;
      this.audioElement.src = song.previewUrl;
      this.audioElement.volume = Math.max(0, Math.min(1, this.volume));

      if (onProgress) {
        this.audioElement.ontimeupdate = () => {
          if (this.audioElement.duration) {
            const pct = (this.audioElement.currentTime / this.audioElement.duration) * 100;
            onProgress(pct, this.audioElement.currentTime, this.audioElement.duration);
          }
        };
      }

      this.audioElement.onended = () => {
        this.isPlaying = false;
        if (onEnded) onEnded();
      };

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Real audio autoplay blocked or failed, falling back to WebAudio synth:", err);
          this.playSynthFallback(song, onProgress);
        });
      }
      return;
    }

    // Otherwise fallback to WebAudio oscillator
    this.playSynthFallback(song, onProgress);
  }

  playSynthFallback(song, onProgress) {
    this.isUsingRealAudio = false;
    this.init();
    if (!this.ctx) return;

    const notes = song.previewNotes || [440, 554.37, 659.25, 880];
    let noteIdx = 0;
    const duration = song.duration || 180;
    let elapsed = 0;

    // Create master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    const intervalMs = Math.max(180, Math.round(60000 / (song.bpm || 120) / 2));

    this.timer = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;

      elapsed += intervalMs / 1000;
      if (onProgress) {
        const pct = Math.min(100, (elapsed / duration) * 100);
        onProgress(pct, elapsed, duration);
      }

      const freq = notes[noteIdx % notes.length];
      noteIdx++;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      osc.type = song.genre?.includes("Rock") ? "sawtooth" : song.genre?.includes("Pop") ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + (intervalMs / 1000) * 0.9);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + (intervalMs / 1000));
    }, intervalMs);
  }

  seek(pct) {
    if (this.isUsingRealAudio && this.audioElement && this.audioElement.duration) {
      this.audioElement.currentTime = (pct / 100) * this.audioElement.duration;
    }
  }

  stop() {
    this.isPlaying = false;
    this.currentSongId = null;

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement.ontimeupdate = null;
      this.audioElement.onended = null;
    }

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));

    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }

    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
    }
  }
}

export const audioSynth = new AudioSynth();

