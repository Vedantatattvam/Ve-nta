/**
 * Vedic Chanting & Sanskrit Neural TTS Synthesis Engine
 * Uses server-side Gemini Sanskrit TTS (/api/tts with gemini-3.8-flash-lite-tts)
 * combined with an optional Web Audio API Sa-Pa Tanpura harmonic drone.
 */

export type SanskritVoiceName = "Charon" | "Kore" | "Zephyr" | "Puck" | "Fenrir";

export const SANSKRIT_VOICE_OPTIONS: {
  id: SanskritVoiceName;
  label: string;
  description: string;
}[] = [
  { id: "Charon", label: "Charon (Deep Scholarly)", description: "Deep, resonant classical recitation" },
  { id: "Kore", label: "Kore (Serene Clear)", description: "Balanced, lucid vocal clarity" },
  { id: "Zephyr", label: "Zephyr (Gentle Meditative)", description: "Calm, contemplative cadence" },
  { id: "Puck", label: "Puck (Crisp Articulate)", description: "Bright, distinct syllable emphasis" },
  { id: "Fenrir", label: "Fenrir (Grave Resonant)", description: "Firm, commanding Sūtra delivery" },
];

export interface ChantAudioState {
  isPlaying: boolean;
  isLoading: boolean;
  isPaused: boolean;
  progress: number;
  currentSegment: string;
  speed: number;
  droneEnabled: boolean;
  voiceName: SanskritVoiceName;
  error: string | null;
}

class VedicChantSynthesizer {
  private audioElement: HTMLAudioElement | null = null;
  private audioCache: Map<string, string> = new Map();
  private currentAbortController: AbortController | null = null;
  private playbackGeneration = 0;

  private audioCtx: AudioContext | null = null;
  private tanpuraNodes: {
    masterGain?: GainNode;
    oscillators?: OscillatorNode[];
  } = {};
  private listeners: Set<(state: ChantAudioState) => void> = new Set();

  private state: ChantAudioState = {
    isPlaying: false,
    isLoading: false,
    isPaused: false,
    progress: 0,
    currentSegment: "",
    speed: 1.0,
    droneEnabled: true,
    voiceName: "Charon",
    error: null,
  };

  public subscribe(callback: (state: ChantAudioState) => void): () => void {
    this.listeners.add(callback);
    callback({ ...this.state });
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb({ ...this.state }));
  }

  /**
   * Initialize and start ambient Tanpura harmonic drone using Web Audio API
   */
  private startTanpuraDrone() {
    if (!this.state.droneEnabled || typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!this.audioCtx || this.audioCtx.state === "closed") {
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === "suspended") {
        void this.audioCtx.resume();
      }

      this.stopTanpuraDrone();

      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.045, this.audioCtx.currentTime + 1.1);
      masterGain.connect(this.audioCtx.destination);

      const oscillators: OscillatorNode[] = [];
      const baseFreqs = [130.81, 196.0, 261.63, 130.81 * 0.5];

      baseFreqs.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const filter = this.audioCtx.createBiquadFilter();
        const gain = this.audioCtx.createGain();

        filter.type = "bandpass";
        filter.frequency.value = freq * 1.5;
        filter.Q.value = 3.0;

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq + (idx === 0 ? 0.3 : -0.2), this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        oscillators.push(osc);
      });

      this.tanpuraNodes = { masterGain, oscillators };
    } catch (e) {
      console.warn("Vedic Tanpura Audio synthesis not available on this device", e);
    }
  }

  private stopTanpuraDrone() {
    try {
      if (this.tanpuraNodes.masterGain && this.audioCtx) {
        this.tanpuraNodes.masterGain.gain.exponentialRampToValueAtTime(
          0.0001,
          this.audioCtx.currentTime + 0.45
        );
        const nodesToStop = this.tanpuraNodes.oscillators;
        this.tanpuraNodes = {};
        setTimeout(() => {
          nodesToStop?.forEach((o) => {
            try {
              o.stop();
              o.disconnect();
            } catch (_) {}
          });
        }, 500);
      }
    } catch (_) {}
  }

  /**
   * Normalize Sanskrit / IAST / Devanagari text into clean prosodic recitation input
   */
  public prepareVedicRecitationText(rawText: string): string {
    if (!rawText) return "";
    return rawText
      .replace(/[\n\r]+/g, " । ")
      .replace(/॥/g, " ॥ ")
      .replace(/\|\|/g, " ॥ ")
      .replace(/\|/g, " । ")
      .replace(/\s+/g, " ")
      .trim();
  }

  private base64WavToObjectUrl(base64: string, mimeType: string): string {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType || "audio/wav" });
    return URL.createObjectURL(blob);
  }

  private async playAudioUrl(
    objectUrl: string,
    cleanText: string,
    speed: number,
    generation: number
  ) {
    if (generation !== this.playbackGeneration) return;

    const audio = new Audio(objectUrl);
    audio.playbackRate = speed;
    this.audioElement = audio;

    audio.ontimeupdate = () => {
      if (generation !== this.playbackGeneration) return;
      if (audio.duration && Number.isFinite(audio.duration) && audio.duration > 0) {
        this.state.progress = Math.min(100, Math.round((audio.currentTime / audio.duration) * 100));
        this.notify();
      }
    };

    audio.onended = () => {
      if (generation !== this.playbackGeneration) return;
      this.state.isPlaying = false;
      this.state.isLoading = false;
      this.state.isPaused = false;
      this.state.progress = 100;
      this.stopTanpuraDrone();
      this.notify();
    };

    audio.onerror = () => {
      if (generation !== this.playbackGeneration) return;
      this.state.isPlaying = false;
      this.state.isLoading = false;
      this.state.isPaused = false;
      this.state.error = "Unable to play synthesized audio clip.";
      this.stopTanpuraDrone();
      this.notify();
    };

    this.startTanpuraDrone();
    await audio.play();

    if (generation !== this.playbackGeneration) {
      audio.pause();
      return;
    }

    this.state.isLoading = false;
    this.state.isPlaying = true;
    this.state.isPaused = false;
    this.state.progress = 0;
    this.state.currentSegment = cleanText;
    this.state.error = null;
    this.notify();
  }

  /**
   * Chant / Play Sanskrit Verse aloud via server-side Gemini Sanskrit TTS
   */
  public async chant(verseText: string, speedOverride?: number) {
    if (typeof window === "undefined") return;

    const cleanText = this.prepareVedicRecitationText(verseText);
    if (!cleanText) return;

    const targetSpeed = speedOverride !== undefined ? speedOverride : this.state.speed;
    if (speedOverride !== undefined) {
      this.state.speed = targetSpeed;
    }

    this.stop();
    const generation = ++this.playbackGeneration;
    const voice = this.state.voiceName;
    const cacheKey = `${voice}::${cleanText}`;

    this.state.currentSegment = cleanText;
    this.state.error = null;

    const cachedUrl = this.audioCache.get(cacheKey);
    if (cachedUrl) {
      try {
        await this.playAudioUrl(cachedUrl, cleanText, targetSpeed, generation);
      } catch (err: any) {
        if (generation === this.playbackGeneration) {
          this.state.isLoading = false;
          this.state.isPlaying = false;
          this.state.error = err?.message || "Audio playback failed.";
          this.stopTanpuraDrone();
          this.notify();
        }
      }
      return;
    }

    this.state.isLoading = true;
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.progress = 0;
    this.notify();

    const controller = new AbortController();
    this.currentAbortController = controller;

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          voiceName: voice,
        }),
        signal: controller.signal,
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || `Speech synthesis failed (${response.status})`);
      }

      if (generation !== this.playbackGeneration) return;

      if (!payload?.audioBase64) {
        throw new Error("No audio received from Sanskrit TTS service.");
      }

      const objectUrl = this.base64WavToObjectUrl(
        payload.audioBase64,
        payload.mimeType || "audio/wav"
      );
      this.audioCache.set(cacheKey, objectUrl);

      await this.playAudioUrl(objectUrl, cleanText, targetSpeed, generation);
    } catch (err: any) {
      if (err?.name === "AbortError" || generation !== this.playbackGeneration) {
        return;
      }
      this.state.isLoading = false;
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.error = err?.message || "Failed to generate Sanskrit audio.";
      this.stopTanpuraDrone();
      this.notify();
    } finally {
      if (this.currentAbortController === controller) {
        this.currentAbortController = null;
      }
    }
  }

  public pause() {
    if (this.audioElement && this.state.isPlaying && !this.state.isPaused) {
      this.audioElement.pause();
      this.stopTanpuraDrone();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.audioElement && this.state.isPlaying && this.state.isPaused) {
      this.startTanpuraDrone();
      void this.audioElement.play();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    this.playbackGeneration += 1;
    if (this.currentAbortController) {
      this.currentAbortController.abort();
      this.currentAbortController = null;
    }
    if (this.audioElement) {
      try {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      } catch (_) {}
      this.audioElement = null;
    }
    this.stopTanpuraDrone();
    this.state.isLoading = false;
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.progress = 0;
    this.notify();
  }

  public setSpeed(speed: number) {
    this.state.speed = speed;
    if (this.audioElement) {
      this.audioElement.playbackRate = speed;
    }
    this.notify();
  }

  public setVoice(voiceName: SanskritVoiceName) {
    const previousVoice = this.state.voiceName;
    this.state.voiceName = voiceName;
    if (previousVoice !== voiceName && (this.state.isPlaying || this.state.isLoading) && this.state.currentSegment) {
      const segment = this.state.currentSegment;
      void this.chant(segment);
      return;
    }
    this.notify();
  }

  public clearError() {
    if (this.state.error) {
      this.state.error = null;
      this.notify();
    }
  }

  public toggleDrone() {
    this.state.droneEnabled = !this.state.droneEnabled;
    if (this.state.isPlaying && !this.state.isPaused) {
      if (this.state.droneEnabled) {
        this.startTanpuraDrone();
      } else {
        this.stopTanpuraDrone();
      }
    }
    this.notify();
  }

  public getState(): ChantAudioState {
    return { ...this.state };
  }
}

export const vedicChantSynthesizer = new VedicChantSynthesizer();
