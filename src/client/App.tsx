import React from 'react';
import { useBall } from './useBall';
import './style.css';

//onMouseDown={} onMouseMove={} onMouseUp={}
export const App: React.FC = () => {
  const ball = useBall();
  const onMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();

    pt.x = e.clientX;
    pt.y = e.clientY;

    const ctm = svg.getScreenCTM();
    if (ctm) {
      const cursorPt = pt.matrixTransform(ctm.inverse());
      ball.moveTo({ x: cursorPt.x, y: cursorPt.y });
    }
  };

  return (
    <main id="app">
      <svg width={400} height={300} onMouseUp={onMouseUp} className="SvgFrame">
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
      </svg>
    </main>
  );
};
