import React from "react";
import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";

// Global reference to handle stopping previous audio to prevent overlap
let currentAudio: HTMLAudioElement | null = null;

interface AudioButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg";
}

const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  className = "",
  variant = "default",
  size = "sm",
}) => {
  const playAudio = () => {
    // 1. Stop any system speech
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // 2. Stop any currently playing audio file
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    // 3. Try to play using Google TTS (Online "Soft Female Voice")
    // This provides a much more natural, softer female voice than most default system voices.
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodedText}`;

    const audio = new Audio(url);

    audio.play()
      .then(() => {
        currentAudio = audio;
        // Clear reference when audio finishes
        audio.onended = () => {
          if (currentAudio === audio) {
            currentAudio = null;
          }
        };
      })
      .catch((e) => {
        console.warn("Online audio failed, falling back to system TTS", e);
        // Fallback to system TTS if offline or blocked
        if ("speechSynthesis" in window) {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(text);

          // Attempt to find a softer voice (often female or specific Google voices)
          const voices = synth.getVoices();
          const softVoice = voices.find(v =>
            v.name.includes("Google US English") ||
            v.name.includes("Female") ||
            v.name.includes("Samantha")
          );

          if (softVoice) {
            utterance.voice = softVoice;
          }

          // Adjust to be "softer" (slightly lower pitch and slower rate)
          utterance.rate = 0.9;
          utterance.pitch = 0.9;
          utterance.volume = 1;

          synth.speak(utterance);
        }
      });
  };

  return (
    <Button
      onClick={playAudio}
      variant={variant}
      size={size}
      className={`audio-description-button ${className}`}
      aria-label={`Play audio description: ${text}`}
    >
      <Volume2 className="w-4 h-4" />
    </Button>
  );
};

export default AudioButton;
