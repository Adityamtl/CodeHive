import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const showTooltip = (e) => {
    const { top, left, width } = e.currentTarget.getBoundingClientRect();
    setPosition({ top, left: left + width });
    setShouldRender(true);
    setTimeout(() => setVisible(true), 10);
  };

  const hideTooltip = () => {
    setVisible(false);
    setTimeout(() => setShouldRender(false), 10);
  };

  useEffect(() => {
    const handleTouchStart = () => hideTooltip();
    document.addEventListener("touchstart", handleTouchStart);
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={() => hideTooltip()} // Hides the tooltip on click
    >
      {children}
      {shouldRender &&
        createPortal(
          <div
            className={`fixed bg-black text-gray-200 text-sm font-mono rounded-lg py-2 px-6 z-50 whitespace-nowrap border-[1px] border-gray-700 shadow-lg
              transform transition-all duration-300 ease-in-out
              ${visible ? "opacity-100 translate-x-2" : "opacity-0 -translate-x-2"}`}
            style={{
              top: position.top,
              left: position.left,
              pointerEvents: visible ? "auto" : "none",
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Tooltip;
