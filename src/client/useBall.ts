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
  vzBounceLimit: 5,
  vzBounceRate: 0.15,
  AirResistance: 0.95,
  FricitionalResistance: 0.85,
  Interval: 50
};

export const useBall = (
  props?: typeof initProps
): Position & { moveTo: typeof moveTo } => {
  const {
    distanceVerocityRatio,
    vz_xyRatio,
    az,
    vzBounceLimit,
    vzBounceRate,
    AirResistance,
    FricitionalResistance,
    Interval
  } = Object.assign({}, { ...initProps }, props ? props : {});

  const [ball, setBall] = useState({
    x: 100,
    y: 100,
    z: 30,
    vx: 0,
    vy: 0,
    vz: 0
  });

  const moveTo = ({ x, y }: { x: number; y: number }): void => {
    setBall(prevBall => ({
      ...prevBall,
      vx: (x - prevBall.x) * distanceVerocityRatio,
      vy: (y - prevBall.y) * distanceVerocityRatio,
      vz: Math.sqrt((x - prevBall.x) ** 2 + (y - prevBall.y) ** 2) * vz_xyRatio
    }));
  };

  const move = (): boolean => {
    if (
      Math.abs(ball.vx) <= 0.5 &&
      Math.abs(ball.vy) <= 0.5 &&
      Math.abs(ball.vz) <= 0.5 &&
      ball.z === 0
    ) {
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
        prevBall.z <= 0 && prevBall.vz < 0
          ? prevBall.vz < -vzBounceLimit
            ? prevBall.vz * -vzBounceRate
            : 0
          : prevBall.vz + az
    }));
    return true;
  };

  useEffect(() => {
    if (ball.z > 0 || ball.vx != 0 || ball.vy != 0 || ball.vz != 0) {
      setTimeout(move, Interval);
    }
  });

  return { x: ball.x, y: ball.y, z: ball.z, moveTo };
};
