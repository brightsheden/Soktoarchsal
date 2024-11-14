import React from "react";
import "./MovingBubbles.css";

const MovingBubbles = () => {
  return (
    <div className="bubbles-container">
      <svg width="100%" height="100%">
        {Array.from({ length: 20 }).map((_, i) => (
          <circle
            key={i}
            className="bubble"
            cx={`${Math.random() * 100}%`}
            cy="100%"
            r={`${Math.random() * 8 + 5}`} // random radius between 5 and 13
          />
        ))}
      </svg>
    </div>
  );
};

export default MovingBubbles;
