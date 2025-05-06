import { useState, useEffect } from 'react';

/**
 * A custom hook that creates a typing effect for text.
 * @param text - The text to be typed out character by character
 * @param speed - The typing speed in milliseconds per character (default: 30)
 * @returns The text that has been typed out so far
 */
export function useTypingEffect(text: string | undefined | null, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    
    if (!text) {
      setIsComplete(true);
      return;
    }
    
    let i = 0;
    // Use setTimeout for better performance compared to setInterval
    const typeNextCharacter = () => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        setTimeout(typeNextCharacter, speed);
      } else {
        setIsComplete(true);
      }
    };
    
    // Start typing
    setTimeout(typeNextCharacter, speed);
    
    // Cleanup function to handle unmounting or text changes
    return () => {
      // No explicit cleanup needed with setTimeout approach
    };
  }, [text, speed]);

  return { displayedText, isComplete };
} 