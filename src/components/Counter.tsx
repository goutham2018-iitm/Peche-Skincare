"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimal?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  easingFunction?: "linear" | "easeOut" | "easeInOut" | "bounce";
  onComplete?: () => void;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimal = 0,
  duration = 2000,
  delay = 0,
  threshold = 0, // safer for iOS Safari
  className = "",
  easingFunction = "easeOut",
  onComplete,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>();

  // Easing functions
  const easing = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2,
    bounce: (t: number) => {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) {
        return n1 * t * t;
      } else if (t < 2 / d1) {
        return n1 * (t -= 1.5 / d1) * t + 0.75;
      } else if (t < 2.5 / d1) {
        return n1 * (t -= 2.25 / d1) * t + 0.9375;
      } else {
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
      }
    },
  };

  const animateCounter = useCallback(() => {
    if (hasAnimated) return;

    setHasAnimated(true);
    const startTime = performance.now();
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing[easingFunction](progress);
      const currentValue =
        startValue + (endValue - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
        onComplete?.();
      }
    };

    if (delay > 0) {
      setTimeout(() => requestAnimationFrame(animate), delay);
    } else {
      requestAnimationFrame(animate);
    }
  }, [value, duration, delay, easingFunction, hasAnimated, onComplete]);

  useEffect(() => {
    // Fallback if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) {
      animateCounter();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounter();
        }
      },
      {
        threshold, // set to 0 for max compatibility
        rootMargin: "0px 0px -10% 0px", // trigger slightly before full visibility
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateCounter, isVisible, threshold]);

  // Reset function for re-triggering animation
  const reset = useCallback(() => {
    setHasAnimated(false);
    setIsVisible(false);
    setCount(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Format displayed value
  const formatValue = (val: number) => {
    if (decimal === 0) {
      return Math.floor(val).toLocaleString();
    }
    return val.toFixed(decimal);
  };

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-300 ${
        isVisible
          ? "opacity-100 transform-none"
          : "opacity-0 translate-y-4"
      } ${className}`}
      data-testid="counter"
    >
      <span
        className={`inline-block ${
          hasAnimated && isVisible ? "animate-pulse-once" : ""
        }`}
        aria-live="polite"
        aria-label={`${prefix}${formatValue(count)}${suffix}`}
      >
        {prefix}
        {formatValue(count)}
        {suffix}
      </span>
    </span>
  );
}

// Optional hook to externally reset counter
// export function useCounterReset(
//   counterRef: React.RefObject<{ reset: () => void }>
// ) {
//   return useCallback(() => {
//     counterRef.current?.reset();
//   }, [counterRef]);
// }

/* Add this CSS to globals.css or Tailwind config:
@keyframes pulse-once {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.animate-pulse-once {
  animation: pulse-once 0.6s ease-in-out;
}
*/
