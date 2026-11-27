import { useState, useEffect } from "react";
import {
  vedicChantSynthesizer,
  ChantAudioState,
  SANSKRIT_VOICE_OPTIONS,
  SanskritVoiceName,
} from "../utils/vedicChantSynthesizer";
import {
  Volume2,
  Play,
  Pause,
  Square,
  Music2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";

interface VedicChantButtonProps {
  verseText: string;
  variant?: "compact" | "badge" | "player" | "inline";
  className?: string;
  label?: string;
}

export default function VedicChantButton({
  verseText,
  variant = "badge",
  className = "",
  label,
}: VedicChantButtonProps) {
  const [audioState, setAudioState] = useState<ChantAudioState>(() =>
    vedicChantSynthesizer.getState()
  );

  useEffect(() => {
    const unsubscribe = vedicChantSynthesizer.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const normalizedVerse = vedicChantSynthesizer.prepareVedicRecitationText(verseText);
  const isThisVerseTarget =
    normalizedVerse.length > 0 && normalizedVerse === audioState.currentSegment;
  const isThisVersePlaying = isThisVerseTarget && audioState.isPlaying;
  const isThisVerseLoading = isThisVerseTarget && audioState.isLoading;
  const isThisVerseError = isThisVerseTarget && Boolean(audioState.error);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisVerseLoading) {
      vedicChantSynthesizer.stop();
      return;
    }
    if (isThisVersePlaying) {
      if (audioState.isPaused) {
        vedicChantSynthesizer.resume();
      } else {
        vedicChantSynthesizer.pause();
      }
    } else {
      void vedicChantSynthesizer.chant(verseText);
    }
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    vedicChantSynthesizer.stop();
  };

  const handleSpeedChange = (speed: number, e: React.MouseEvent) => {
    e.stopPropagation();
    vedicChantSynthesizer.setSpeed(speed);
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    vedicChantSynthesizer.setVoice(e.target.value as SanskritVoiceName);
  };

  const handleToggleDrone = (e: React.MouseEvent) => {
    e.stopPropagation();
    vedicChantSynthesizer.toggleDrone();
  };

  if (variant === "compact") {
    return (
      <div className={`relative inline-flex items-center gap-1 ${className}`}>
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 ${
            isThisVerseLoading
              ? "bg-amber-100 text-amber-900 border-amber-400"
              : isThisVersePlaying
              ? "bg-amber-600 text-white border-amber-700 shadow-sm"
              : "bg-[#FAF5ED] hover:bg-[#ebd9bd] border-[#bf953f]/40 text-[#8c6011] hover:text-[#2D2319]"
          }`}
          title={
            isThisVerseLoading
              ? "Synthesizing Sanskrit audio (Click to cancel)"
              : isThisVersePlaying
              ? audioState.isPaused
                ? "Resume Sanskrit Recitation"
                : "Pause Sanskrit Recitation"
              : "Play Sanskrit Verse Audio"
          }
        >
          {isThisVerseLoading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : isThisVersePlaying && !audioState.isPaused ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {isThisVersePlaying && (
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg bg-[#FAF5ED] hover:bg-red-50 border border-[#bf953f]/40 text-[#8c6011] hover:text-red-700 transition cursor-pointer"
            title="Stop audio"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        )}

        {isThisVerseError && (
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 border border-red-200 text-[10px] font-mono text-red-800"
            title={audioState.error || undefined}
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span className="max-w-[140px] truncate">{audioState.error}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                vedicChantSynthesizer.clearError();
              }}
              className="hover:text-red-950 cursor-pointer"
              aria-label="Dismiss audio error"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>
    );
  }

  if (variant === "badge" || variant === "inline") {
    return (
      <div className={`relative inline-flex flex-wrap items-center gap-1.5 ${className}`}>
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`relative overflow-hidden px-2.5 py-1 rounded-lg border text-xs font-serif font-medium transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${
            isThisVerseLoading
              ? "bg-amber-50 border-amber-400 text-amber-900"
              : isThisVersePlaying
              ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-800 shadow-sm"
              : "bg-gradient-to-r from-[#FAF5ED] to-[#FFFDF9] hover:bg-[#FAF1E2] border-[#bf953f]/40 text-[#735013] hover:text-[#2D2319]"
          }`}
          title="Recite Sanskrit verse aloud using neural Sanskrit TTS & optional Tanpura drone"
        >
          {isThisVersePlaying && (
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-amber-200/90 transition-all duration-150"
              style={{ width: `${audioState.progress}%` }}
            />
          )}

          {isThisVerseLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
              <span className="text-[11px] font-mono font-bold">Synthesizing...</span>
            </>
          ) : isThisVersePlaying ? (
            audioState.isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-white" />
                <span className="text-[11px] font-mono font-bold">Resume</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-2.5 bg-white rounded-full animate-bounce" />
                </div>
                <span className="text-[11px] font-mono font-bold">Reciting...</span>
              </>
            )
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#8c6011]" />
              <span className="text-[11px] font-mono font-bold text-[#8c6011]">
                {label || "Listen Sanskrit"}
              </span>
            </>
          )}
        </button>

        {isThisVersePlaying && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 bg-[#FAF5ED] p-1 rounded-lg border border-[#bf953f]/40 shadow-xs animate-in fade-in duration-150"
          >
            <button
              type="button"
              onClick={handleStop}
              className="p-1 text-[#8c6011] hover:text-red-700 rounded transition cursor-pointer"
              title="Stop recitation"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>

            <button
              type="button"
              onClick={handleToggleDrone}
              className={`p-1 rounded transition cursor-pointer ${
                audioState.droneEnabled
                  ? "text-amber-700 bg-amber-100"
                  : "text-[#9c8266] hover:text-[#735013]"
              }`}
              title={
                audioState.droneEnabled
                  ? "Tanpura Drone Active (Click to mute drone)"
                  : "Tanpura Drone Muted (Click to enable drone)"
              }
            >
              <Music2 className="w-3 h-3" />
            </button>

            {/* Speed Options */}
            <div className="flex items-center text-[9px] font-mono font-bold">
              {[0.8, 1.0, 1.2].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={(e) => handleSpeedChange(spd, e)}
                  className={`px-1 py-0.5 rounded transition cursor-pointer ${
                    audioState.speed === spd
                      ? "bg-amber-700 text-white"
                      : "text-[#8c6011] hover:bg-[#FAF1E2]"
                  }`}
                  title={`Playback speed: ${spd}x`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Sanskrit Voice Selector */}
            <select
              value={audioState.voiceName}
              onChange={handleVoiceChange}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-mono bg-[#FFFDF9] border border-[#bf953f]/35 rounded px-1 py-0.5 text-[#735013] focus:outline-none cursor-pointer"
              title="Select Sanskrit recitation voice"
            >
              {SANSKRIT_VOICE_OPTIONS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id}
                </option>
              ))}
            </select>
          </div>
        )}

        {isThisVerseError && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-50 border border-red-200 text-[10px] font-mono text-red-800"
            title={audioState.error || undefined}
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span className="max-w-[180px] truncate">{audioState.error}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                vedicChantSynthesizer.clearError();
              }}
              className="hover:text-red-950 cursor-pointer"
              aria-label="Dismiss error"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Full Player Bar
  return (
    <div
      className={`p-3 rounded-xl bg-gradient-to-r from-[#FAF5ED] via-[#FFFDF8] to-[#FAF5ED] border border-[#bf953f]/40 flex flex-wrap items-center justify-between gap-3 shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleTogglePlay}
          className="p-2 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8c6011] text-white shadow-xs hover:brightness-110 transition cursor-pointer flex items-center justify-center"
        >
          {isThisVerseLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : isThisVersePlaying && !audioState.isPaused ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-[#8c6011] uppercase tracking-wider">
              Sanskrit Voice Recitation
            </span>
            {isThisVerseLoading && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                Synthesizing...
              </span>
            )}
            {isThisVersePlaying && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold animate-pulse">
                Active Recitation ({audioState.progress}%)
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#6e5842] font-serif italic">
            Classical Sanskrit vocal recitation with optional Sa-Pa Tanpura drone.
          </p>
          {isThisVerseError && (
            <p className="text-[11px] text-red-700 font-mono mt-0.5">
              {audioState.error}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={audioState.voiceName}
          onChange={handleVoiceChange}
          onClick={(e) => e.stopPropagation()}
          className="px-2 py-1 rounded-lg border border-[#bf953f]/35 bg-[#FFFDF9] text-xs font-mono text-[#735013] focus:outline-none cursor-pointer"
          title="Select Sanskrit recitation voice model"
        >
          {SANSKRIT_VOICE_OPTIONS.map((v) => (
            <option key={v.id} value={v.id}>
              {v.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleToggleDrone}
          className={`px-2 py-1 rounded-lg border text-xs font-mono flex items-center gap-1 transition cursor-pointer ${
            audioState.droneEnabled
              ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
              : "bg-[#FFFDF9] text-[#735013] border-[#bf953f]/30 hover:bg-[#FAF1E2]"
          }`}
          title="Toggle Sa-Pa Harmonic Tanpura drone"
        >
          <Music2 className="w-3 h-3" />
          <span>Tanpura {audioState.droneEnabled ? "ON" : "OFF"}</span>
        </button>

        <div className="flex items-center bg-[#FAF1E2] p-0.5 rounded-lg border border-[#bf953f]/30 text-xs font-mono">
          {[0.8, 1.0, 1.2].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={(e) => handleSpeedChange(spd, e)}
              className={`px-2 py-0.5 rounded transition cursor-pointer ${
                audioState.speed === spd
                  ? "bg-[#8c6011] text-[#FFFDF8] font-bold"
                  : "text-[#8c6011] hover:text-[#2D2319]"
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>

        {(isThisVersePlaying || isThisVerseLoading) && (
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 transition cursor-pointer"
            title="Stop recitation"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
}
