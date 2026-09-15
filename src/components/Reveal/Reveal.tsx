import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import styled, { css, keyframes } from "styled-components";

type Variant = "up" | "fade" | "left" | "right" | "scale";

type Props = {
  children: ReactNode;
  /** Animation direction / style */
  variant?: Variant;
  /** Delay in ms after the element enters view */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  /** Root margin for IntersectionObserver */
  margin?: string;
  /** Only animate once (default true) */
  once?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

const motionCss = css<{ $variant: Variant; $shown: boolean; $delay: number; $duration: number }>`
  --reveal-y: ${({ $variant }) => ($variant === "up" ? "36px" : "0")};
  --reveal-x: ${({ $variant }) =>
    $variant === "left" ? "-32px" : $variant === "right" ? "32px" : "0"};
  --reveal-scale: ${({ $variant }) => ($variant === "scale" ? "0.94" : "1")};

  opacity: ${({ $shown }) => ($shown ? 1 : 0)};
  transform: ${({ $shown }) =>
    $shown
      ? "translate3d(0, 0, 0) scale(1)"
      : "translate3d(var(--reveal-x), var(--reveal-y), 0) scale(var(--reveal-scale))"};
  transition:
    opacity ${({ $duration }) => $duration}ms cubic-bezier(0.22, 1, 0.36, 1),
    transform ${({ $duration }) => $duration}ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: ${({ $delay, $shown }) => ($shown ? `${$delay}ms` : "0ms")};
  will-change: ${({ $shown }) => ($shown ? "auto" : "opacity, transform")};

  @media (prefers-reduced-motion: reduce) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
`;

const Box = styled.div<{ $variant: Variant; $shown: boolean; $delay: number; $duration: number }>`
  ${motionCss}
`;

export const Reveal: React.FC<Props> = ({
  children,
  variant = "up",
  delay = 0,
  duration = 750,
  margin = "0px 0px -8% 0px",
  once = true,
  as,
  className,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { root: null, rootMargin: margin, threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [margin, once]);

  return (
    <Box
      as={as}
      ref={ref}
      className={className}
      style={style}
      $variant={variant}
      $shown={shown}
      $delay={delay}
      $duration={duration}
    >
      {children}
    </Box>
  );
};

const pageIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

/** Soft enter when a route mounts */
export const PageEnter = styled.div`
  animation: ${pageIn} 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export default Reveal;
