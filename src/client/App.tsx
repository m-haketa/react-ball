import React from 'react';
import { useBall } from './useBall';
import { Ball } from './Ball';

import './style.css';

//onMouseDown={} onMouseMove={} onMouseUp={}
export const App: React.FC = () => {
  const { onMouseUp, ...ballPosition } = useBall();

  return (
    <main id="app">
      <svg width={400} height={300} onMouseUp={onMouseUp} className="SvgFrame">
        <Ball {...ballPosition}></Ball>
      </svg>
    </main>
  );
};
