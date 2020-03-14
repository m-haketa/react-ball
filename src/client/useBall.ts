import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
  z: number;
}

const initProps = {
  distanceVerocityRatio: 0.09,
  vz_xyRatio: 0.1,
  az: -2,
  vzBounceRate: 0.15,
  AirResistance: 0.95,
  FricitionalResistance: 0.85,
  Interval: 50
};

const calculateNorm = (...params: number[]): number => {
  return Math.sqrt(
    params.reduce((acc, value) => {
      acc += value ** 2;
      return acc;
    }, 0)
  );
};

const roundTo = (num: number, digit: number): number =>
  Math.round(num * 10 ** digit) / 10 ** digit;

export const useBall = (
  props?: typeof initProps
): Position & { onMouseUp: typeof onMouseUp } => {
  const {
    distanceVerocityRatio,
    vz_xyRatio,
    az,
    vzBounceRate,
    AirResistance,
    FricitionalResistance,
    Interval
  } = Object.assign({}, initProps, props ? props : {});

  const [ball, setBall] = useState({
    x: 100,
    y: 100,
    z: 100,
    vx: 0,
    vy: 0,
    vz: 0
  });

  const moveTo = ({ x, y }: { x: number; y: number }): void => {
    setBall(prevBall => ({
      ...prevBall,
      vx: (x - prevBall.x) * distanceVerocityRatio,
      vy: (y - prevBall.y) * distanceVerocityRatio,
      vz: calculateNorm(x - prevBall.x, y - prevBall.y) * vz_xyRatio
    }));
  };

  const onMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();

    pt.x = e.clientX;
    pt.y = e.clientY;

    const ctm = svg.getScreenCTM();
    if (ctm) {
      const cursorPt = pt.matrixTransform(ctm.inverse());
      moveTo({ x: cursorPt.x, y: cursorPt.y });
    }
  };

  const move = (): boolean => {
    if (calculateNorm(ball.vx, ball.vy, ball.vz) <= 1 && ball.z === 0) {
      setBall(prevBall => ({
        ...prevBall,
        vx: 0,
        vy: 0,
        vz: 0
      }));
      return false;
    }

    setBall(prevBall => ({
      ...prevBall,
      x: prevBall.x + prevBall.vx,
      y: prevBall.y + prevBall.vy,
      z: Math.max(prevBall.z + prevBall.vz, 0),
      vx:
        prevBall.vx *
        (prevBall.z === 0 ? FricitionalResistance : AirResistance),
      vy:
        prevBall.vy *
        (prevBall.z === 0 ? FricitionalResistance : AirResistance),
      vz:
        prevBall.z + prevBall.vz < 0
          ? roundTo(prevBall.vz * -vzBounceRate, 2)
          : prevBall.vz + az
    }));
    return true;
  };

  useEffect(() => {
    if (ball.z > 0 || ball.vx != 0 || ball.vy != 0 || ball.vz != 0) {
      setTimeout(move, Interval);
    }
  });

  return { x: ball.x, y: ball.y, z: ball.z, onMouseUp };
};
