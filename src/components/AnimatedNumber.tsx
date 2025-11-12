import React from 'react';
import useCountUp from '../hooks/useCountUp';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  start?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration,
  start = 0,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}) => {
  const animatedValue = useCountUp(value, duration, start);
  const formatted = `${prefix}${animatedValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return <span className={className}>{formatted}</span>;
};

export default AnimatedNumber;