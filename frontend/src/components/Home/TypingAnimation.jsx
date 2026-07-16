import { useState, useEffect } from "react";

const TypingAnimation = ({ codeblock, typingSpeed = 100, textColor }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true); // State to control typing
  const [isPaused, setIsPaused] = useState(false); // State to control pause after typing

  // Replace tabs with spaces for visual representation and split into lines
  const formattedCode = codeblock.replace(/\t/g, "    ").split("\n");

  useEffect(() => {
    if (isTyping) {
      const typeNextCharacter = () => {
        if (lineIndex < formattedCode.length) {
          const currentLine = formattedCode[lineIndex];

          if (charIndex < currentLine.length) {
            // Add next character of the current line
            setDisplayedText((prev) => prev + currentLine.charAt(charIndex));
            setCharIndex((prev) => prev + 1);
          } else {
            // Move to the next line if it's not the last line
            if (lineIndex < formattedCode.length - 1) {
              setDisplayedText((prev) => prev + "\n");
            }
            // Reset character index and line index
            setCharIndex(0);
            setLineIndex((prev) => prev + 1);
          }
        } else {
          // Stop typing and start the pause
          setIsTyping(false);
          setIsPaused(true); // Start pause after finishing typing
          setTimeout(() => {
            setDisplayedText(""); // Clear the text
            setLineIndex(0); // Reset to the first line
            setCharIndex(0); // Reset character index
            setIsPaused(false); // Resume typing
            setIsTyping(true); // Start typing again
          }, 2000); // Wait for 2 seconds
        }
      };

      const typingInterval = setInterval(typeNextCharacter, typingSpeed);

      // Cleanup the interval on component unmount
      return () => clearInterval(typingInterval);
    }
  }, [lineIndex, charIndex, formattedCode, typingSpeed, isTyping]);

  return (
    <div className={`${textColor}`} style={{ position: "relative" }}>
      <pre
        style={{
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          display: "inline",
        }}
      >
        {displayedText}
      </pre>
      <span className="cursor" style={{ opacity: isPaused ? 0 : 1 }}>
        |
      </span>
    </div>
  );
};

export default TypingAnimation;
