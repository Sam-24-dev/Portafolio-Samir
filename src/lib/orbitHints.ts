export type OrbitHintPlacement = 'top' | 'bottom' | 'left' | 'right';

export const getOrbitHintPlacement = (angle: number): OrbitHintPlacement => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  if (sin <= -0.35) {
    return 'top';
  }

  if (sin >= 0.35) {
    return 'bottom';
  }

  if (cos >= 0) {
    return 'right';
  }

  return 'left';
};
