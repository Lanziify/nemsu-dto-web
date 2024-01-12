import React from "react";
import { useSpring, animated } from "react-spring";

function AnimatedNumber(props) {
  const { num } = useSpring({
    from: { num: 0 },
    num: props.number,
    delay: 0,
    config: { mass: 2.3, tension: 18, friction: 12.5 },
  });

  const formattedNumber = num.to((n) => {
    if (n < 1000) {
      return n.toFixed(0);
    } else if (n < 1000000) {
      return n % 1000 === 0 ? (n / 1000).toFixed(0) + "k" : (n / 1000).toFixed(1) + "k";
    } else {
      return n % 1000000 === 0 ? (n / 1000000).toFixed(0) + "m" : (n / 1000000).toFixed(1) + "m";
    }
  });

  return <animated.div className={`font-mono ${props.className}`}>{formattedNumber}</animated.div>;
}

export default AnimatedNumber;
