import React from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface AudioButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

const AudioButton: React.FC<AudioButtonProps> = ({ 
  text, 
  className = '', 
  variant = 'default',
  size = 'sm'
}) => {
  const playAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
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