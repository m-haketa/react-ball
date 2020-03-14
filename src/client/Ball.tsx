import React from 'react';

interface BallProps {
  x: number;
  y: number;
  z: number;
}

export const Ball: React.FC<BallProps> = ball => {
  return (
    <>
      <radialGradient id="grad" fx="70%" fy="20%">
        <stop offset="0%" stopColor="#fff" />
        <stop offset="50%" stopColor="#fb0" />
        <stop offset="90%" stopColor="#c90" />
        <stop offset="100%" stopColor="#a80" />
      </radialGradient>
      <circle cx={ball.x} cy={ball.y} r={10} fill="#aaa"></circle>
      <circle
        cx={ball.x}
        cy={ball.y - ball.z}
        r={10}
        fill="url(#grad)"
      ></circle>
    </>
  );
};
