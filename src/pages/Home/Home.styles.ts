import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";

const softPulse = keyframes`
  0%, 100% { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); }
  50% { box-shadow: 0 10px 28px rgba(243, 112, 33, 0.45); }
`;

export const Hero = styled.section`
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  aspect-ratio: 1920 / 700;
  padding-bottom: 16px;
  box-sizing: content-box;
  background: linear-gradient(
    90deg,
    #b4e0ea 0%,
    #b6e0e6 5%,
    #b6dee5 10%,
    #bde0e4 15%,
    #c0e0e0 20%,
    #c7e2e0 25%,
    #cae1dc 30%,
    #d4e3d9 35%,
    #e3eadc 40%,
    #dcdfce 45%,
    #e0ddc5 50%,
    #e6e0c2 55%,
    #e7daac 60%,
    #e9d49d 65%,
    #e9c984 70%,
    #ebc678 75%,
    #ecbd64 80%,
    #f1b857 85%,
    #f4b244 90%,
    #f4ab3d 95%,
    #f9a534 100%
  );
  color: ${COLORS.white};
  overflow: hidden;

  @media (min-width: 901px) and (max-width: 1535px) {
    padding-bottom: 24px;
  }

  @media (min-width: 1536px) {
    padding-bottom: 16px;
  }

  @media (max-width: 900px) {
    aspect-ratio: auto;
    height: auto;
    min-height: 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: ${COLORS.redDeep};
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: auto;
  max-width: none;
  aspect-ratio: 1920 / 700;
  object-fit: contain;
  object-position: center top;
  transform: none;
  animation: none;

  @media (max-width: 900px) {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    min-height: 0;
    max-width: 100%;
    aspect-ratio: 1920 / 700;
    object-fit: contain;
    object-position: center center;
    background: ${COLORS.redDeep};
    animation: none;
  }
`;

export const HeroShade = styled.div`
  display: none;
`;

export const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  box-sizing: border-box;

  @media (max-width: 900px) {
    position: relative;
    inset: auto;
    pointer-events: auto;
    padding: 16px 22px 18px;
    background: ${COLORS.redDeep};
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  @media (max-width: 380px) {
    padding: 14px 16px 16px;
    gap: 10px;
  }
`;

export const HeroTop = styled.div`
  pointer-events: auto;
  position: absolute;
  /* Sit in the sky band above “WIN THE” */
  top: 1.05%;
  left: 10.6%;
  right: auto;
  width: auto;
  max-width: min(420px, 42%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 3;

  /* Laptop: keep a little air under the badge above WIN THE */
  @media (min-width: 901px) and (max-width: 1535px) {
    top: 0.2%;
  }

  @media (min-width: 1536px) {
    top: 1.05%;
  }

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    left: auto;
    max-width: none;
    width: 100%;
  }
`;

export const HeroBottom = styled.div`
  pointer-events: auto;
  position: absolute;
  top: auto;
  bottom: 10px;
  left: 10.6%;
  right: auto;
  width: auto;
  max-width: min(520px, 48%);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  gap: 10px;
  box-sizing: border-box;
  z-index: 3;
  background: transparent;

  a {
    box-sizing: border-box;
    height: 34px;
    min-height: 34px;
    padding: 0 16px;
    font-size: 0.74rem;
    line-height: 1;
    border: 2px solid ${COLORS.gold};
    white-space: nowrap;
  }

  a:last-of-type {
    background: #00613a;
    border-color: #00613a;
    color: #ffffff;
    backdrop-filter: none;
  }

  @media (min-width: 901px) and (max-width: 1535px) {
    top: auto;
    bottom: 8px;
    gap: 8px;

    a {
      height: 32px;
      min-height: 32px;
      padding: 0 14px;
      font-size: 0.72rem;
      line-height: 1;
    }
  }

  @media (min-width: 1280px) and (max-width: 1535px) {
    top: auto;
    bottom: 8px;

    a {
      height: 34px;
      min-height: 34px;
      padding: 0 16px;
      font-size: 0.74rem;
    }
  }

  @media (min-width: 1536px) {
    top: auto;
    bottom: 10px;
    gap: 10px;

    a {
      height: 36px;
      min-height: 36px;
      padding: 0 18px;
      font-size: 0.78rem;
    }
  }

  @media (max-width: 900px) {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    max-width: none;
    width: 100%;
    justify-content: stretch;
    gap: 10px;

    a {
      padding: 15px 16px;
      font-size: 0.88rem;
      min-height: 48px;
      white-space: normal;
    }
  }
`;

export const Kicker = styled.p`
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.white};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.76rem;
  line-height: 1;
  padding: 7px 12px;
  border-radius: 4px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  margin: 0;
  animation: ${softPulse} 3.2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  /* Laptop: shorter badge so it clears WIN THE */
  @media (min-width: 901px) and (max-width: 1535px) {
    font-size: 0.62rem;
    padding: 5px 9px;
    letter-spacing: 0.06em;
  }

  @media (max-width: 900px) {
    font-size: 0.7rem;
    padding: 7px 10px;
    animation: none;
  }
`;

export const HeroTitle = styled.h1`
  max-width: 620px;
  font-size: clamp(1.9rem, 4vw, 3.4rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
  margin-bottom: 12px;
  text-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);

  /* Desktop: same rhythm as laptop — gap after title */
  @media (min-width: 1536px) {
    max-width: 600px;
    font-size: clamp(2.1rem, 2.35vw, 3rem);
    line-height: 1.06;
    margin-bottom: 16px;
  }
`;

export const HeroLead = styled.p`
  max-width: 520px;
  font-size: clamp(0.92rem, 1.25vw, 1.05rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
  margin-bottom: 22px;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }

  /* Desktop: subtitle → buttons gap like laptop */
  @media (min-width: 1536px) {
    max-width: 500px;
    font-size: 1.02rem;
    line-height: 1.55;
    margin-bottom: 24px;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    justify-content: stretch;
  }
`;

export const GoldBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(8px, 0.85vw, 11px) clamp(14px, 1.45vw, 20px);
  border-radius: 4px;
  background: ${COLORS.gold};
  color: ${COLORS.white};
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(0.72rem, 0.95vw, 0.82rem);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  white-space: nowrap;
  flex: 0 0 auto;
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s ease,
    background 0.2s ease,
    filter 0.2s ease;

  &:hover {
    background: ${COLORS.goldSoft};
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(243, 112, 33, 0.4);
    filter: brightness(1.04);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 15px 16px;
    font-size: 0.88rem;
    white-space: normal;
    min-height: 48px;
  }

  @media (hover: none) {
    &:hover {
      transform: none;
      filter: none;
    }
  }
`;

export const GhostBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(8px, 0.85vw, 11px) clamp(14px, 1.45vw, 20px);
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  color: ${COLORS.white};
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(0.72rem, 0.95vw, 0.82rem);
  background: rgba(0, 56, 32, 0.55);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  flex: 0 0 auto;
  backdrop-filter: blur(6px);
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s ease,
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: rgba(0, 56, 32, 0.78);
    border-color: ${COLORS.gold};
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 900px) {
    width: 100%;
    padding: 15px 16px;
    font-size: 0.88rem;
    white-space: normal;
    min-height: 48px;
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

export const DateBar = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: ${COLORS.white};
  font-family: "Montserrat", system-ui, sans-serif;
  border-top: 4px solid ${COLORS.gold};
  background:
    radial-gradient(ellipse 42% 140% at 0% 50%, rgba(243, 112, 33, 0.32), transparent 62%),
    radial-gradient(ellipse 40% 140% at 100% 50%, rgba(255, 196, 90, 0.14), transparent 64%),
    linear-gradient(180deg, #0a7a4a 0%, ${COLORS.red} 46%, ${COLORS.redDark} 100%);

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    pointer-events: none;
    height: 100%;
  }

  &::before {
    left: -36px;
    top: 0;
    width: min(28vw, 280px);
    transform: rotate(-11deg);
    opacity: 0.7;
    background:
      linear-gradient(166deg, transparent 0 28%, #ffb138 29% 42%, transparent 43%),
      linear-gradient(172deg, transparent 0 54%, ${COLORS.gold} 55% 68%, transparent 69%);
    clip-path: polygon(0 8%, 100% 0, 86% 28%, 100% 48%, 70% 62%, 94% 86%, 0 100%);
  }

  &::after {
    right: -40px;
    bottom: 0;
    width: min(26vw, 260px);
    transform: rotate(10deg);
    opacity: 0.65;
    background:
      linear-gradient(166deg, transparent 0 24%, #31a36d 25% 40%, transparent 41%),
      linear-gradient(173deg, transparent 0 52%, #ffc65a 53% 66%, transparent 67%);
    clip-path: polygon(18% 0, 100% 8%, 100% 100%, 0 92%, 22% 68%, 4% 48%, 28% 28%);
  }
`;

export const DateInner = styled.div`
  ${contentWidth}
  ${contentPadX}
  position: relative;
  z-index: 1;
  padding-top: 28px;
  padding-bottom: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  text-align: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0;
    padding-top: 18px;
    padding-bottom: 18px;
    text-align: left;
  }

  @media (max-width: 380px) {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  @media (min-width: 1536px) {
    padding-top: 34px;
    padding-bottom: 34px;
    gap: 20px;
  }
`;

export const DateItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  padding: 4px 18px;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 18%;
    bottom: 18%;
    width: 2px;
    border-radius: 99px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(243, 112, 33, 0.2) 18%,
      ${COLORS.gold} 50%,
      rgba(243, 112, 33, 0.2) 82%,
      transparent 100%
    );
  }

  strong {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    color: ${COLORS.gold};
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding-bottom: 7px;

    svg {
      flex-shrink: 0;
      font-size: 0.95rem;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      width: 36px;
      height: 3px;
      border-radius: 3px;
      background: ${COLORS.gold};
      transform: translateX(-50%) rotate(-1deg);
    }
  }

  span {
    color: #ffffff;
    font-size: clamp(0.92rem, 1.35vw, 1.08rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.35;
  }

  @media (hover: hover) {
    strong {
      transition: color 0.2s ease;
    }

    &:hover strong {
      color: ${COLORS.goldSoft};
    }
  }

  @media (max-width: 900px) {
    align-items: flex-start;
    padding: 14px 4px 14px 14px;
    gap: 6px;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    &:not(:last-child)::after {
      display: none;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 16px;
      bottom: 16px;
      width: 3px;
      border-radius: 99px;
      background: ${COLORS.gold};
    }

    strong {
      justify-content: flex-start;
      font-size: 0.68rem;
      padding-bottom: 6px;

      &::after {
        left: 0;
        transform: rotate(-1deg);
      }
    }

    span {
      font-size: 0.92rem;
    }
  }

  @media (max-width: 380px) {
    padding: 12px 4px 12px 12px;

    span {
      font-size: 0.86rem;
    }
  }

  @media (min-width: 1536px) {
    padding: 6px 24px;
    gap: 10px;

    strong {
      font-size: 0.8rem;

      svg {
        font-size: 1.05rem;
      }

      &::after {
        width: 42px;
        height: 4px;
      }
    }

    span {
      font-size: 1.12rem;
    }
  }
`;

/** Full-bleed section with distinct surface tones */
export const Section = styled.section<{ $tone?: "white" | "paper" | "blush" | "ink" | "soft" }>`
  padding-top: clamp(64px, 8vw, 96px);
  padding-bottom: clamp(64px, 8vw, 96px);
  ${contentPadX}
  position: relative;
  overflow-x: clip;
  scroll-margin-top: 72px;
  background: ${({ $tone }) => {
    switch ($tone) {
      case "white":
        return COLORS.white;
      case "blush":
        return "linear-gradient(180deg, #e8f6ee 0%, #d8efe3 55%, #f3faf5 100%)";
      case "ink":
        return `linear-gradient(145deg, ${COLORS.redDeep} 0%, ${COLORS.red} 100%)`;
      case "soft":
        return `linear-gradient(180deg, #e7f3ec 0%, ${COLORS.paper} 100%)`;
      case "paper":
      default:
        return COLORS.paper;
    }
  }};
  color: ${({ $tone }) => ($tone === "ink" ? COLORS.white : COLORS.ink)};

  @media (max-width: 900px) {
    padding-top: 40px;
    padding-bottom: 40px;
    scroll-margin-top: 56px;
  }

  @media (max-width: 640px) {
    padding-top: 36px;
    padding-bottom: 36px;
    scroll-margin-top: 54px;
  }

  @media (max-width: 380px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  ${({ $tone }) =>
    $tone === "white"
      ? `
    &::before {
      content: "";
      pointer-events: none;
      position: absolute;
      inset: 0;
      opacity: 0.45;
      background-image: radial-gradient(circle at 1px 1px, rgba(0, 107, 63, 0.08) 1px, transparent 0);
      background-size: 22px 22px;
    }
  `
      : ""}
`;

export const SectionInner = styled.div`
  position: relative;
  z-index: 1;
  ${contentWidth}
`;

export const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  align-items: stretch;

  > * {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  > * > * {
    flex: 1;
    height: 100%;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 380px) {
    gap: 10px;
  }
`;

/** Campaign "How to enter" — compact art match (no bottles) */
export const HowEnterSection = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  /* Short band — crop the photo, don’t stretch empty sky */
  padding: clamp(28px, 3.5vw, 40px) 0 clamp(32px, 4vw, 48px);
  background-color: #c8dfd0;
  background-position: center 48%;
  background-size: cover;
  background-repeat: no-repeat;
  color: #004b23;
  font-family: "Montserrat", system-ui, sans-serif;
  ${contentPadX}
  scroll-margin-top: 72px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
      ellipse 62% 58% at 50% 40%,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.12) 58%,
      transparent 78%
    );
  }

  @media (max-width: 900px) {
    padding-top: 28px;
    padding-bottom: 36px;
  }

  @media (max-width: 640px) {
    padding-top: 24px;
    padding-bottom: 32px;
  }

  /* Large desktop only — laptop layout remains unchanged */
  @media (min-width: 1536px) {
    min-height: 500px;
    padding: 52px clamp(24px, 3vw, 40px) 64px;
    background-position: center 48%;
  }
`;

export const HowEnterInner = styled.div`
  position: relative;
  z-index: 1;
  ${contentWidth}
  max-width: 876px;

  /* Match the How it works starting edge on laptop screens */
  @media (min-width: 901px) and (max-width: 1535px) {
    max-width: 1176px;
  }

  @media (min-width: 1536px) {
    max-width: 1320px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 1720px) {
    max-width: 1400px;
  }
`;

export const HowEnterStage = styled.div`
  position: relative;
`;

export const HowEnterHead = styled.div`
  text-align: left;
  width: 100%;
  max-width: 840px;
  margin: 0 auto 48px;

  h2 {
    margin: 0 0 8px;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(2.2rem, 4.8vw, 3rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }

  .how {
    color: #004b23;
    font-weight: 900;
  }

  .enter {
    position: relative;
    display: inline-block;
    color: #f26522;
    font-weight: 900;
    padding-bottom: 6px;
  }

  .enter::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 6px;
    border-radius: 3px 8px 3px 6px / 4px 6px 3px 5px;
    background: #004b23;
    transform: rotate(-1deg);
  }

  p {
    margin: 0;
    max-width: 34rem;
    color: #1a2e22;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(0.8rem, 1.4vw, 0.92rem);
    font-weight: 500;
    line-height: 1.4;
  }

  @media (max-width: 900px) {
    text-align: left;
    margin-bottom: 44px;

    p {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media (min-width: 901px) and (max-width: 1535px) {
    max-width: 1090px;
    margin-bottom: 48px;

    p {
      max-width: none;
      white-space: nowrap;
    }
  }

  @media (max-width: 640px) {
    margin-bottom: 42px;

    h2 {
      font-size: clamp(1.85rem, 8.5vw, 2.25rem);
    }

    .enter::after {
      height: 5px;
    }

    p {
      font-size: 0.82rem;
      padding: 0 6px;
    }
  }

  @media (min-width: 1536px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 56px;

    h2 {
      font-size: 4rem;
      margin-bottom: 12px;
    }

    .enter::after {
      height: 8px;
    }

    p {
      max-width: 42rem;
      font-size: 1rem;
    }
  }
`;

export const HowEnterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(20px, 2.4vw, 26px);
  align-items: stretch;
  max-width: 840px;
  margin: 0 auto;

  > * {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  > * > * {
    flex: 1 1 auto;
    height: 100%;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    gap: 28px;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 100%;
  }

  @media (min-width: 901px) and (max-width: 1535px) {
    max-width: 1090px;
  }

  @media (min-width: 1536px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    gap: 36px;
  }
`;

export const HowEnterCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
  height: 100%;
  min-height: 0;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  border: none;
  border-top: 4px solid #f15a24;
  border-radius: 16px;
  padding: 42px 20px 16px;
  box-shadow: 0 10px 24px rgba(0, 40, 24, 0.12);
  font-family: "Montserrat", system-ui, sans-serif;
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(0, 40, 24, 0.15);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }

  /* Step number — green disc + short orange rule under it (image 1) */
  .badge {
    position: absolute;
    top: 0;
    left: 22px;
    z-index: 2;
    transform: translateY(-50%);
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(145deg, #11814f 0%, #00613a 100%);
    color: #ffffff;
    font-family: "Montserrat", system-ui, sans-serif;
    font-weight: 800;
    font-size: 1.15rem;
    letter-spacing: 0.02em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #ffffff;
    box-shadow:
      0 0 0 2px rgba(243, 112, 33, 0.28),
      inset 0 0 0 1px rgba(255, 255, 255, 0.3),
      0 5px 12px rgba(0, 56, 32, 0.3);
  }

  .badge::after {
    content: "";
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: 38px;
    height: 4px;
    border-radius: 2px;
    background: #f15a24;
  }

  h3 {
    margin: 3px 0 8px;
    width: 100%;
    padding: 0 4px;
    text-align: left;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(1rem, 1.55vw, 1.12rem);
    font-weight: 800;
    color: #004b23;
    line-height: 1.08;
    letter-spacing: -0.015em;
  }

  p {
    margin: 0;
    width: 100%;
    padding: 0 4px;
    flex: 0 0 auto;
    text-align: left;
    color: #333333;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(0.76rem, 1.15vw, 0.86rem);
    font-weight: 400;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  @media (max-width: 640px) {
    height: auto;
    min-height: 0;
    padding: 32px 16px 14px;
    border-radius: 14px;

    .badge {
      width: 48px;
      height: 48px;
      font-size: 0.92rem;
      left: 20px;
    }

    h3 {
      margin: 12px 0 10px;
      font-size: 1.05rem;
    }

    p {
      font-size: 0.82rem;
    }
  }

  @media (max-width: 360px) {
    min-height: 0;
    padding: 32px 14px 12px;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.79rem;
    }
  }

  @media (min-width: 1536px) {
    min-height: 0;
    padding: 48px 26px 16px;
    border-top-width: 5px;
    border-radius: 19px;

    .badge {
      width: 64px;
      height: 64px;
      font-size: 1.25rem;
      left: 30px;
    }

    .badge::after {
      top: calc(100% + 9px);
      width: 42px;
      height: 5px;
    }

    h3 {
      margin: 5px 0 11px;
      font-size: 1.28rem;
    }

    p {
      font-size: 0.94rem;
      line-height: 1.42;
    }
  }
`;

export const HowEnterIcon = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin-top: auto;
  padding-top: 8px;
  pointer-events: none;

  .icon-cluster {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 120px;
    margin: 0 auto;
  }

  img {
    display: block;
    width: auto;
    max-width: 100%;
    height: 56px;
    object-fit: contain;
    object-position: center;
    filter: drop-shadow(0 6px 10px rgba(0, 45, 27, 0.12));
  }

  img.cart {
    height: 64px;
  }

  img.crown {
    height: 54px;
  }

  img.ticket {
    height: 50px;
  }

  img.upload {
    height: 44px;
  }

  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0 2px;

    .icon-cluster {
      width: 112px;
      gap: 8px;
      margin: 0 auto;
    }

    img {
      flex: 0 0 auto;
      min-width: 0;
      width: auto;
      max-width: 72px;
      height: 48px;
      margin: 0;
      object-fit: contain;
      object-position: center;
    }

    img.cart {
      height: 48px;
      max-width: 72px;
      /* rays sit on the left of the file — shift so the cart body hits the slot center */
      object-position: 68% 50%;
    }

    img.crown {
      height: 44px;
      max-width: 88px;
    }

    img.ticket {
      height: 42px;
      max-width: 52px;
    }

    img.upload {
      height: 38px;
      max-width: 38px;
    }
  }

  @media (max-width: 640px) {
    margin-top: auto;
    padding-top: 8px;
    gap: 8px;
    justify-content: center;
    align-items: center;

    .icon-cluster {
      width: 112px;
    }

    img {
      height: 48px;
      max-width: 72px;
    }

    img.cart {
      height: 48px;
      max-width: 72px;
    }

    img.crown {
      height: 44px;
      max-width: 88px;
    }

    img.ticket {
      height: 42px;
      max-width: 52px;
    }

    img.upload {
      height: 38px;
      max-width: 38px;
    }
  }

  @media (min-width: 1536px) {
    margin-top: auto;
    padding-top: 10px;
    gap: 12px;

    .icon-cluster {
      width: 132px;
      gap: 12px;
    }

    img {
      height: 60px;
    }

    img.cart {
      height: 70px;
    }

    img.crown {
      height: 58px;
    }

    img.ticket {
      height: 54px;
    }

    img.upload {
      height: 48px;
    }
  }
`;

/** “How it works” campaign panel */
export const HowWorksSection = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(46px, 6vw, 72px) 0 clamp(52px, 6.5vw, 80px);
  background-color: #eef7e9;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #173328;
  font-family: "Montserrat", system-ui, sans-serif;
  ${contentPadX}
  scroll-margin-top: 72px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    pointer-events: none;
    width: min(24vw, 300px);
    height: 116px;
    opacity: 0.7;
  }

  &::before {
    top: 8px;
    left: -138px;
    transform: rotate(-8deg);
    border-radius: 48% 52% 42% 58%;
    background:
      linear-gradient(166deg, transparent 0 25%, #ffb138 26% 40%, transparent 41%),
      linear-gradient(172deg, transparent 0 51%, #f37021 52% 65%, transparent 66%),
      linear-gradient(178deg, transparent 0 73%, #ffc65a 74% 82%, transparent 83%);
    clip-path: polygon(0 8%, 100% 0, 83% 21%, 100% 35%, 72% 48%, 94% 62%, 64% 72%, 80% 89%, 0 100%);
  }

  &::after {
    right: -142px;
    bottom: 0;
    transform: rotate(-9deg);
    border-radius: 52% 48% 58% 42%;
    background:
      linear-gradient(166deg, transparent 0 24%, #0b8754 25% 39%, transparent 40%),
      linear-gradient(173deg, transparent 0 50%, #006b3f 51% 64%, transparent 65%),
      linear-gradient(179deg, transparent 0 72%, #31a36d 73% 81%, transparent 82%);
    clip-path: polygon(20% 4%, 100% 0, 100% 100%, 0 91%, 18% 73%, 0 60%, 28% 47%, 7% 30%);
  }

  @media (max-width: 640px) {
    padding-top: 38px;
    padding-bottom: 46px;

    &::before,
    &::after {
      width: 170px;
      height: 76px;
      opacity: 0.5;
    }
  }

  @media (min-width: 1536px) {
    min-height: 510px;
    padding: 70px clamp(24px, 3vw, 40px) 82px;
  }
`;

export const HowWorksInner = styled.div`
  position: relative;
  z-index: 1;
  ${contentWidth}
  max-width: 1176px;

  @media (min-width: 1536px) {
    max-width: 1320px;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: 1720px) {
    max-width: 1400px;
  }
`;

export const HowWorksHead = styled.div`
  max-width: 1090px;
  margin: 0 auto 26px;
  text-align: left;

  h2 {
    margin: 0 0 8px;
    color: #004b23;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(2.2rem, 4.8vw, 3rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }

  .how {
    color: #004b23;
    font-weight: 900;
  }

  .works {
    position: relative;
    display: inline-block;
    color: #f26522;
    font-weight: 900;
    padding-bottom: 6px;
  }

  .works::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 6px;
    border-radius: 3px 8px 3px 6px / 4px 6px 3px 5px;
    background: #004b23;
    transform: rotate(-1deg);
  }

  p {
    margin: 0;
    max-width: 34rem;
    color: #1a2e22;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(0.8rem, 1.4vw, 0.92rem);
    font-weight: 500;
    line-height: 1.4;
  }

  @media (max-width: 900px) {
    max-width: 660px;
    text-align: left;

    p {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media (max-width: 640px) {
    text-align: left;
    margin-bottom: 18px;

    h2 {
      font-size: clamp(1.85rem, 8.5vw, 2.25rem);
    }

    .works::after {
      height: 5px;
    }

    p {
      font-size: 0.82rem;
    }
  }

  @media (min-width: 1536px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 28px;

    h2 {
      font-size: 4rem;
      margin-bottom: 12px;
    }

    .works::after {
      height: 8px;
    }

    p {
      max-width: 42rem;
      font-size: 1rem;
    }
  }
`;

export const HowWorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: clamp(18px, 2.4vw, 28px);
  max-width: 1090px;
  margin: 0 auto;

  > * {
    display: flex;
    min-width: 0;
    height: 100%;
  }

  > * > * {
    flex: 1;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    max-width: 360px;
    gap: 18px;
  }

  @media (min-width: 1536px) {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    gap: 36px;
  }
`;

export const HowWorksCard = styled.article`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 310px;
  padding: 26px 24px 138px;
  border: 1px solid rgba(0, 77, 44, 0.09);
  border-top: 4px solid #f37021;
  border-radius: 10px;
  background:
    linear-gradient(160deg, #ffffff 0%, #ffffff 66%, #f5fbf5 100%);
  box-shadow:
    0 14px 30px rgba(0, 77, 44, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: -16px;
    right: 24%;
    bottom: 30px;
    height: 62px;
    opacity: 0.18;
    transform: rotate(-7deg);
    border-radius: 50%;
    background:
      repeating-linear-gradient(
        -7deg,
        transparent 0 7px,
        #00995a 8px 14px,
        transparent 15px 21px
      );
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    right: -38px;
    bottom: -30px;
    width: 150px;
    height: 205px;
    opacity: 0.16;
    transform: rotate(-8deg);
    background:
      repeating-linear-gradient(90deg, transparent 0 17px, #f3a936 18px 21px),
      linear-gradient(90deg, transparent 44%, #f3a936 45% 55%, transparent 56%);
    clip-path: polygon(46% 0, 54% 0, 58% 22%, 75% 12%, 80% 17%, 62% 32%, 90% 28%, 92% 35%, 63% 42%, 86% 53%, 83% 60%, 60% 51%, 66% 78%, 59% 81%, 51% 56%, 42% 82%, 35% 79%, 42% 52%, 16% 62%, 12% 55%, 38% 42%, 8% 36%, 11% 29%, 41% 33%, 22% 17%, 27% 12%, 44% 23%);
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 77, 44, 0.16);
  }

  .step {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 40px;
    margin-bottom: 13px;
    border-radius: 5px;
    background: linear-gradient(145deg, #0b7b4b, #005d37);
    color: #ffffff;
    font-size: 0.84rem;
    font-weight: 800;
    box-shadow: 0 4px 10px rgba(0, 77, 44, 0.2);
  }

  h3 {
    margin: 0 0 9px;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(1rem, 1.55vw, 1.12rem);
    font-weight: 800;
    color: #004b23;
    line-height: 1.08;
    letter-spacing: -0.015em;
  }

  p,
  ul {
    margin: 0;
    color: #333333;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(0.76rem, 1.15vw, 0.86rem);
    font-weight: 400;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  ul {
    padding-left: 1.05rem;
  }

  li + li {
    margin-top: 5px;
  }

  @media (max-width: 760px) {
    min-height: 315px;
    padding: 22px 18px 148px;
  }

  @media (max-width: 640px) {
    h3 {
      font-size: 1.05rem;
    }

    p,
    ul {
      font-size: 0.82rem;
    }
  }

  @media (max-width: 360px) {
    min-height: 310px;
    padding: 20px 16px 142px;

    h3 {
      font-size: 1rem;
    }

    p,
    ul {
      font-size: 0.79rem;
    }
  }

  @media (min-width: 1536px) {
    min-height: 300px;
    padding: 26px 24px 132px;

    .step {
      width: 48px;
      height: 43px;
      font-size: 0.92rem;
    }

    h3 {
      font-size: 1.28rem;
    }

    p,
    ul {
      font-size: 0.94rem;
      line-height: 1.42;
    }
  }
`;

export const HowWorksIcon = styled.div<{ $kind: "purchase" | "uncap" | "register" }>`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: ${({ $kind }) => ($kind === "uncap" ? "-24px" : "14px")};
  transform: translateX(-50%);
  width: ${({ $kind }) => ($kind === "purchase" ? "164px" : $kind === "uncap" ? "152px" : "126px")};
  height: ${({ $kind }) => ($kind === "purchase" ? "120px" : $kind === "uncap" ? "170px" : "124px")};
  display: flex;
  align-items: flex-end;
  justify-content: center;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center bottom;
    filter: drop-shadow(0 8px 12px rgba(0, 45, 27, 0.18));
  }

  @media (max-width: 380px) {
    bottom: ${({ $kind }) => ($kind === "uncap" ? "-18px" : "12px")};
    width: ${({ $kind }) => ($kind === "purchase" ? "142px" : $kind === "uncap" ? "132px" : "108px")};
    height: ${({ $kind }) => ($kind === "purchase" ? "104px" : $kind === "uncap" ? "148px" : "106px")};
  }

  @media (min-width: 1536px) {
    width: ${({ $kind }) => ($kind === "purchase" ? "176px" : $kind === "uncap" ? "148px" : "126px")};
    height: ${({ $kind }) => ($kind === "purchase" ? "128px" : $kind === "uncap" ? "164px" : "124px")};
  }
`;

export const StepCard = styled.article`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  padding: 28px 24px;
  min-height: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 0 12px 32px rgba(0, 56, 32, 0.06);
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease,
    border-color 0.2s ease;
  border-top: 4px solid ${COLORS.gold};

  @media (max-width: 640px) {
    min-height: 0;
    padding: 20px 18px;

    span {
      width: 40px;
      height: 40px;
      margin-bottom: 12px;
    }

    h3 {
      font-size: 1.08rem;
      margin-bottom: 8px;
    }

    p,
    ul {
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 22px 48px rgba(0, 56, 32, 0.14);
    border-color: rgba(243, 112, 33, 0.35);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }

  span {
    display: inline-flex;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background: ${COLORS.red};
    color: ${COLORS.white};
    font-weight: 800;
    margin-bottom: 14px;
    transition: transform 0.25s ease, background 0.2s ease;
  }

  &:hover span {
    transform: scale(1.06);
    background: ${COLORS.redDark};
  }

  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: ${COLORS.redDark};
  }

  p {
    color: ${COLORS.muted};
    line-height: 1.55;
    flex: 1;
  }

  ul {
    margin: 8px 0 0;
    padding-left: 1.1rem;
    color: ${COLORS.muted};
    line-height: 1.55;
    flex: 1;
  }

  li + li {
    margin-top: 6px;
  }
`;

export const EnterWrap = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(380px, 0.9fr);
  gap: clamp(28px, 3.5vw, 52px);
  align-items: start;

  > * {
    min-width: 0;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 28px;
    align-items: start;
  }

  @media (max-width: 480px) {
    gap: 22px;
  }
`;

export const EnterCopy = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: auto;
  justify-content: flex-start;

  h2 {
    display: inline-block;
    position: relative;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(2.2rem, 4.8vw, 3rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
    margin-bottom: 24px;
    color: ${COLORS.redDeep};
  }

  h2::after {
    content: "";
    position: absolute;
    left: 0;
    right: 18%;
    bottom: -10px;
    height: 5px;
    border-radius: 5px;
    background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldSoft});
  }

  p {
    margin-bottom: 14px;
    max-width: 42rem;
    color: #1a2e22;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(0.8rem, 1.4vw, 0.92rem);
    font-weight: 500;
    line-height: 1.4;
  }

  @media (max-width: 640px) {
    h2 {
      font-size: clamp(1.85rem, 8.5vw, 2.25rem);
      margin-bottom: 20px;
      line-height: 0.95;
    }
    p {
      font-size: 0.82rem;
      line-height: 1.4;
      margin-bottom: 10px;
    }
  }

  @media (min-width: 1536px) {
    h2 {
      font-size: 4rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const EnterProductArt = styled.figure`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  position: relative;
  width: 100%;
  max-width: 42rem;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: auto;
  overflow: visible;
  padding-bottom: 2px;

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    left: 0;
    right: 28%;
    bottom: 1px;
    height: 14px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0, 53, 31, 0.2) 0%, rgba(0, 53, 31, 0) 72%);
    filter: blur(4px);
  }
`;

export const ClassicBottleArt = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: min(170px, 23vw);
  max-width: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 12px;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: contain;
    object-position: left center;
    transform: scale(0.92);
    transform-origin: left center;
  }

  @media (max-width: 820px) {
    width: min(180px, 50vw);
    justify-content: center;
    margin: 8px 0 6px;

    img {
      object-position: center;
      transform-origin: center;
    }
  }
`;

export const EnterCard = styled.form`
  position: relative;
  overflow: hidden;
  background: linear-gradient(150deg, #ffffff 0%, #f8fcf9 100%);
  border: 1px solid rgba(0, 107, 63, 0.14);
  border-radius: 18px;
  border-top: 5px solid ${COLORS.gold};
  padding: clamp(22px, 3vw, 32px);
  box-shadow:
    0 24px 58px rgba(0, 77, 44, 0.15),
    inset 0 1px 0 rgba(255,255,255,0.9);
  transition: box-shadow 0.3s ease;
  min-width: 0;
  max-width: 100%;

  &:focus-within {
    box-shadow:
      0 30px 68px rgba(0, 107, 63, 0.2),
      0 0 0 3px rgba(0,107,63,0.07);
  }

  @media (max-width: 640px) {
    padding: 20px 16px;
    border-radius: 16px;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin: 12px 0 6px;

  @media (max-width: 640px) {
    margin: 10px 0 5px;
    font-size: 0.92rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: #f2f8f4;
  font-size: 16px; /* avoid iOS zoom on focus */
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    background: ${COLORS.white};
    box-shadow: 0 0 0 3px rgba(0, 107, 63, 0.12);
  }

  @media (max-width: 640px) {
    padding: 12px 14px;
    border-radius: 10px;
  }
`;

export const CodeList = styled.div`
  display: grid;
  gap: 10px;
`;

export const CodeRow = styled.div`
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
`;

export const CodeNumber = styled.span`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 107, 63, 0.1);
  color: ${COLORS.redDeep};
  font-size: 0.8rem;
  font-weight: 900;
`;

export const CodeToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0 12px;
  color: ${COLORS.muted};
  font-size: 0.84rem;
  font-weight: 700;

  @media (max-width: 420px) {
    flex-wrap: wrap;
  }
`;

export const CodeStepper = styled.div`
  display: inline-grid;
  grid-template-columns: 34px 38px 34px;
  align-items: center;
  overflow: hidden;
  border: 1px solid rgba(0, 107, 63, 0.18);
  border-radius: 10px;
  background: #f2f8f4;
`;

export const StepperButton = styled.button`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${COLORS.redDeep};
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(0, 107, 63, 0.1);
  }

  &:disabled {
    color: rgba(29, 57, 44, 0.28);
    cursor: not-allowed;
  }

  &:focus-visible {
    position: relative;
    z-index: 1;
    outline: 3px solid rgba(0, 107, 63, 0.2);
    outline-offset: -3px;
  }
`;

export const StepperValue = styled.strong`
  display: grid;
  place-items: center;
  min-height: 34px;
  border-right: 1px solid rgba(0, 107, 63, 0.14);
  border-left: 1px solid rgba(0, 107, 63, 0.14);
  color: ${COLORS.ink};
  font-size: 0.9rem;
`;

export const CodeCounter = styled.span`
  margin-left: auto;
  color: ${COLORS.muted};
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 420px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const Check = styled.label`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 14px 0;
  font-size: 0.92rem;
  padding: 6px 0;
  cursor: pointer;

  input {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  @media (max-width: 640px) {
    font-size: 0.86rem;
    line-height: 1.4;
  }
`;

export const Submit = styled.button`
  width: 100%;
  margin-top: 6px;
  padding: 15px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDark});
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 1.02rem;
  cursor: pointer;
  min-height: 48px;
  transition:
    background 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${COLORS.redDark}, ${COLORS.redDeep});
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(0, 56, 32, 0.22);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
    padding: 14px;
  }
`;

export const Progress = styled.div`
  margin-top: 14px;
  background: #e8f6ee;
  border: 1px solid ${COLORS.line};
  color: ${COLORS.redDark};
  border-radius: 4px;
  padding: 12px 14px;
  font-weight: 700;
  line-height: 1.5;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 0.86rem;
    padding: 10px 12px;
    line-height: 1.45;
  }
`;

export const SplitBand = styled.section`
  position: relative;
  isolation: isolate;
  background:
    radial-gradient(ellipse 45% 90% at 0% 45%, rgba(243, 112, 33, 0.32), transparent 62%),
    radial-gradient(ellipse 42% 80% at 100% 80%, rgba(255, 169, 80, 0.18), transparent 65%),
    linear-gradient(120deg, ${COLORS.redDeep} 0%, ${COLORS.redDark} 52%, ${COLORS.red} 100%);
  color: ${COLORS.white};
  padding-top: clamp(64px, 8vw, 88px);
  padding-bottom: clamp(64px, 8vw, 88px);
  ${contentPadX}
  overflow-x: clip;

  @media (max-width: 640px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  @media (max-width: 380px) {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`;

export const SplitInner = styled.div`
  ${contentWidth}
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(20px, 3vw, 32px);
  align-items: stretch;

  > * {
    display: flex;
    height: 100%;
  }

  > * > div {
    width: 100%;
    padding: clamp(24px, 3vw, 34px);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  > *:last-child > div {
    background: rgba(0, 35, 20, 0.24);
    border-top: 4px solid ${COLORS.gold};
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 18px;

    > * {
      min-width: 0;
    }

    > * > div {
      padding: 22px 20px;
      border-radius: 16px;
    }
  }

  @media (max-width: 360px) {
    > * > div {
      padding: 20px 16px;
    }
  }
`;

export const SplitBandTitle = styled.h2`
  font-family: "Montserrat", system-ui, sans-serif;
  font-size: clamp(2.2rem, 4.8vw, 3rem);
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  font-weight: 900;
  line-height: 0.95;

  @media (max-width: 640px) {
    font-size: clamp(1.85rem, 8.5vw, 2.25rem);
    margin-bottom: 8px;
  }

  @media (min-width: 1536px) {
    font-size: 4rem;
  }
`;

export const SplitBandSubTitle = styled.h3`
  color: ${COLORS.gold};
  margin-bottom: 10px;
  font-family: "Montserrat", system-ui, sans-serif;
  font-size: clamp(2.2rem, 4.8vw, 3rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;

  @media (max-width: 640px) {
    font-size: clamp(1.85rem, 8.5vw, 2.25rem);
  }

  @media (min-width: 1536px) {
    font-size: 4rem;
  }
`;

export const SplitBandLead = styled.p`
  margin: 0;
  font-family: "Montserrat", system-ui, sans-serif;
  font-size: clamp(0.8rem, 1.4vw, 0.92rem);
  font-weight: 500;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.92);

  @media (max-width: 640px) {
    font-size: 0.82rem;
  }

  @media (min-width: 1536px) {
    font-size: 1rem;
  }
`;

export const WhiteBtn = styled.a`
  display: inline-flex;
  margin-top: 16px;
  padding: 12px 18px;
  border-radius: 999px;
  background: ${COLORS.white};
  color: ${COLORS.redDeep};
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s ease,
    background 0.2s ease;
  min-height: 44px;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    background: #fff8f3;
  }

  @media (max-width: 800px) {
    width: 100%;
    box-sizing: border-box;
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;
