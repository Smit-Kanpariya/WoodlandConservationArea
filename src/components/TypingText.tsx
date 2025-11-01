import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const TypingText: React.FC<TypingTextProps> = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseDuration = 2000,
  className = ""
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (isTyping) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsTyping(false), pauseDuration);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isTyping ? typingSpeed : deletingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return <span className={className}>{currentText}</span>;
};

export default TypingText;