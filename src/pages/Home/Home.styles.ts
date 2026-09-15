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
  /* Match official banner ratio so desktop/laptop never crop WIN THE / prizes */
  aspect-ratio: 1920 / 700;
  background: ${COLORS.redDeep};
  color: ${COLORS.white};
  overflow: hidden;

  @media (max-width: 900px) {
    aspect-ratio: auto;
    height: auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  min-height: 100%;
  /* contain + matching aspect = full creative visible, no crop */
  object-fit: contain;
  object-position: center center;
  /* No zoom on desktop — scale shifts the green prize box onto the CTAs */
  transform: none;
  animation: none;

  @media (max-width: 900px) {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    min-height: 0;
    max-width: 100%;
    /* Show full creative on phones — no crop */
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
    padding: 14px 22px 16px;
    gap: 10px;
  }
`;

export const HeroTop = styled.div`
  pointer-events: auto;
  position: absolute;
  /* Sit in the sky band above “WIN THE” (~8% from top in banner art) */
  top: 1.8%;
  left: 10.6%;
  right: auto;
  width: auto;
  max-width: min(420px, 42%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 3;

  /* Laptop: pull badge up + keep clear air above WIN THE */
  @media (min-width: 901px) and (max-width: 1535px) {
    top: 0.35%;
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
  /*
    Banner green prize box ends ~90.6% from top (image geometry).
    Pin CTAs just under it — same % on laptop + desktop so they never sit on the card.
  */
  top: 91.45%;
  bottom: auto;
  left: 10.6%;
  right: auto;
  width: auto;
  max-width: min(520px, 48%);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  z-index: 3;

  a {
    padding: 10px 18px;
    font-size: 0.8rem;
    line-height: 1.05;
    min-height: 0;
    white-space: nowrap;
  }

  /* Laptop / mid screens: more gap under green box (buttons were flush) */
  @media (min-width: 901px) and (max-width: 1535px) {
    top: 93.1%;
    gap: 8px;

    a {
      padding: 7px 12px;
      font-size: 0.68rem;
      line-height: 1;
    }
  }

  @media (min-width: 1280px) and (max-width: 1535px) {
    top: 92.7%;

    a {
      padding: 8px 14px;
      font-size: 0.72rem;
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
  background:
    linear-gradient(90deg, rgba(243, 112, 33, 0.18), transparent 40%, transparent 60%, rgba(243, 112, 33, 0.12)),
    ${COLORS.red};
  color: ${COLORS.white};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const DateInner = styled.div`
  ${contentWidth}
  ${contentPadX}
  padding-top: 22px;
  padding-bottom: 22px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;

  strong {
    display: block;
    color: ${COLORS.gold};
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  > div {
    position: relative;
    transition: transform 0.25s ease;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      right: -8px;
      top: 12%;
      bottom: 12%;
      width: 1px;
      background: rgba(255, 255, 255, 0.18);
    }

    @media (hover: hover) {
      &:hover {
        transform: translateY(-2px);
      }
    }
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 10px;
    padding-top: 16px;
    padding-bottom: 16px;
    text-align: left;

    strong {
      font-size: 0.7rem;
      margin-bottom: 2px;
    }

    > div {
      padding: 12px 14px;
      background: rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      font-size: 0.9rem;
      line-height: 1.4;

      &::after {
        display: none;
      }
    }
  }

  @media (max-width: 380px) {
    padding-top: 14px;
    padding-bottom: 14px;
    gap: 8px;

    > div {
      padding: 10px 12px;
      font-size: 0.86rem;
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
  }

  @media (max-width: 640px) {
    padding-top: 36px;
    padding-bottom: 36px;
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

export const PrizeSection = styled(Section).attrs({ $tone: "ink" as const })`
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(ellipse 42% 80% at 0% 55%, rgba(243, 112, 33, 0.24), transparent 68%),
    radial-gradient(ellipse 45% 75% at 100% 25%, rgba(255, 166, 67, 0.2), transparent 68%),
    linear-gradient(140deg, #003820 0%, #004d2c 54%, #006b3f 100%);

  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    top: -20%;
    right: -5%;
    width: 45%;
    height: 140%;
    max-width: 100%;
    background: radial-gradient(ellipse, rgba(243, 112, 33, 0.28), transparent 65%);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.12;
    background-image:
      linear-gradient(115deg, transparent 46%, rgba(255,255,255,0.28) 47%, transparent 48%),
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0);
    background-size: 100% 100%, 26px 26px;
  }
`;

export const SectionInner = styled.div`
  position: relative;
  z-index: 1;
  ${contentWidth}
`;

export const SectionHead = styled.div<{ $light?: boolean }>`
  max-width: 760px;
  margin-bottom: 36px;

  h2 {
    font-size: clamp(1.65rem, 3.8vw, 3rem);
    letter-spacing: -0.035em;
    margin-bottom: 12px;
    position: relative;
  }

  h2::after {
    content: "";
    display: block;
    width: 56px;
    height: 3px;
    margin-top: 12px;
    border-radius: 4px;
    background: linear-gradient(90deg, ${COLORS.gold}, transparent);
  }

  p {
    color: ${({ $light }) => ($light ? "rgba(255,255,255,0.82)" : COLORS.muted)};
    font-size: clamp(0.95rem, 2.5vw, 1.08rem);
    line-height: 1.65;
  }

  @media (max-width: 640px) {
    margin-bottom: 20px;

    h2 {
      font-size: clamp(1.35rem, 6.5vw, 1.75rem);
      margin-bottom: 8px;
      line-height: 1.15;
    }

    h2::after {
      margin-top: 10px;
      width: 44px;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.55;
    }
  }
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
    padding: 28px 0 36px;
  }

  @media (max-width: 640px) {
    padding: 24px 0 32px;
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
  margin: 0 auto 20px;

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
    text-align: center;

    p {
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (min-width: 901px) and (max-width: 1535px) {
    max-width: 1090px;
  }

  @media (max-width: 640px) {
    margin-bottom: 18px;

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
    max-width: 1180px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 28px;

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
    flex: 1;
    height: 100%;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin: 0 auto;
    gap: 28px;
  }

  @media (min-width: 901px) and (max-width: 1535px) {
    max-width: 1090px;
  }

  @media (min-width: 1536px) {
    max-width: 1180px;
    margin-left: 0;
    margin-right: 0;
    gap: 36px;
  }
`;

export const HowEnterCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 220px;
  box-sizing: border-box;
  background: #ffffff;
  border: none;
  border-top: 4px solid #f15a24;
  border-radius: 16px;
  padding: 44px 18px 10px;
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
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
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
    text-align: center;
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
    text-align: center;
    color: #333333;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(0.76rem, 1.15vw, 0.86rem);
    font-weight: 400;
    line-height: 1.35;
  }

  @media (max-width: 640px) {
    height: auto;
    min-height: 230px;
    padding: 34px 16px 16px;
    border-radius: 14px;

    .badge {
      width: 48px;
      height: 48px;
      font-size: 0.92rem;
    }

    h3 {
      margin: 12px 0 10px;
      font-size: 1.05rem;
    }

    p {
      font-size: 0.82rem;
    }
  }

  @media (min-width: 1536px) {
    height: 280px;
    padding: 54px 26px 18px;
    border-top-width: 5px;
    border-radius: 19px;

    .badge {
      width: 64px;
      height: 64px;
      font-size: 1.25rem;
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
      max-width: 20rem;
      font-size: 0.94rem;
      line-height: 1.42;
    }
  }
`;

export const HowEnterIcon = styled.div`
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 54px;
  flex: 0 0 54px;

  img {
    display: block;
    width: auto;
    max-width: none;
    object-fit: contain;
  }

  /* Icons ~1/4–1/3 of card height like image 1 */
  img.cart {
    width: 52px;
    height: auto;
  }

  img.crown {
    width: 126px;
    height: auto;
    transform: translateY(-6px);
  }

  img.ticket {
    width: 92px;
    height: auto;
  }

  img.upload {
    width: 44px;
    height: auto;
  }

  @media (max-width: 640px) {
    height: 50px;
    flex-basis: 50px;
    padding-top: 8px;

    img.cart,
    img.crown {
      height: auto;
    }

    img.cart {
      width: 48px;
    }

    img.crown {
      width: 110px;
    }

    img.ticket {
      width: 82px;
      height: auto;
    }

    img.upload {
      width: 40px;
      height: auto;
    }
  }

  @media (min-width: 1536px) {
    height: 64px;
    flex-basis: 64px;
    padding-top: 10px;
    gap: 10px;

    img.cart {
      width: 62px;
    }

    img.crown {
      width: 148px;
    }

    img.ticket {
      width: 108px;
    }

    img.upload {
      width: 52px;
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
    padding: 38px 0 46px;

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
    display: inline-block;
    position: relative;
    margin: 0 0 15px;
    color: #15352a;
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: clamp(2.2rem, 4.5vw, 3.2rem);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  h2::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    height: 5px;
    border-radius: 4px;
    background: #f37021;
  }

  p {
    margin: 0;
    color: #52645a;
    font-size: clamp(0.85rem, 1.4vw, 0.98rem);
    font-weight: 500;
    line-height: 1.45;
  }

  @media (max-width: 900px) {
    max-width: 660px;
  }

  @media (max-width: 640px) {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      font-size: 2rem;
    }
  }

  @media (min-width: 1536px) {
    max-width: 1160px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 30px;

    h2 {
      font-size: 3.5rem;
    }

    p {
      font-size: 1.05rem;
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
    max-width: 1160px;
    margin-left: 0;
    margin-right: 0;
    gap: 36px;
  }
`;

export const HowWorksCard = styled.article`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
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
    color: #006b3f;
    font-size: clamp(1.02rem, 1.55vw, 1.18rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  p,
  ul {
    margin: 0;
    color: #526158;
    font-size: clamp(0.77rem, 1.12vw, 0.88rem);
    font-weight: 500;
    line-height: 1.45;
  }

  ul {
    padding-left: 1.05rem;
  }

  li + li {
    margin-top: 5px;
  }

  @media (max-width: 760px) {
    min-height: 250px;
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
      font-size: 0.92rem;
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

export const PrizeGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: clamp(18px, 2.4vw, 28px);
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

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 380px) {
    gap: 10px;
  }
`;

export const PrizeCard = styled.article<{ $featured?: boolean }>`
  position: relative;
  overflow: hidden;
  background: ${({ $featured }) =>
    $featured
      ? "linear-gradient(145deg, rgba(0,35,20,0.78), rgba(0,77,44,0.74))"
      : "linear-gradient(155deg, #ffffff 0%, #f5fbf7 100%)"};
  color: ${({ $featured }) => ($featured ? COLORS.white : COLORS.ink)};
  border: 1px solid ${({ $featured }) => ($featured ? "rgba(243,112,33,0.75)" : "rgba(255,255,255,0.72)")};
  border-top: 5px solid ${COLORS.gold};
  border-radius: 18px;
  padding: clamp(24px, 3vw, 32px);
  min-height: 310px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: ${({ $featured }) =>
    $featured ? "0 24px 58px rgba(0,0,0,0.3)" : "0 18px 42px rgba(0,0,0,0.18)"};
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    border-color 0.2s ease;
  backdrop-filter: ${({ $featured }) => ($featured ? "blur(12px)" : "none")};

  &::after {
    content: "";
    position: absolute;
    right: -58px;
    bottom: -62px;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background: ${({ $featured }) =>
      $featured
        ? "radial-gradient(circle, rgba(243,112,33,0.34), transparent 68%)"
        : "radial-gradient(circle, rgba(0,107,63,0.12), transparent 68%)"};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ $featured }) =>
      $featured ? "0 28px 60px rgba(0,0,0,0.35)" : "0 20px 44px rgba(0,0,0,0.18)"};
    border-color: ${({ $featured }) => ($featured ? "rgba(243,112,33,0.7)" : "rgba(243,112,33,0.25)")};
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 640px) {
    min-height: 0;
    padding: 20px 18px;

    h3 {
      font-size: 1.15rem;
    }

    ul {
      margin-left: 16px;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  }

  small {
    display: inline-block;
    background: ${({ $featured }) => ($featured ? COLORS.gold : COLORS.paper)};
    color: ${COLORS.redDeep};
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.72rem;
    padding: 6px 10px;
    border-radius: 999px;
    margin-bottom: 14px;
  }

  h3 {
    position: relative;
    z-index: 1;
    font-size: clamp(1.3rem, 2.2vw, 1.65rem);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  ul {
    position: relative;
    z-index: 1;
    margin-left: 18px;
    line-height: 1.75;
    color: ${({ $featured }) => ($featured ? "rgba(255,255,255,0.9)" : COLORS.muted)};
    flex: 1;
  }
`;

export const EnterWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const EnterCopy = styled.div`
  h2 {
    display: inline-block;
    position: relative;
    font-size: clamp(2rem, 3.8vw, 2.9rem);
    font-weight: 900;
    letter-spacing: -0.03em;
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
    color: ${COLORS.muted};
    line-height: 1.7;
    margin-bottom: 14px;
    font-size: 1.02rem;
  }

  @media (max-width: 640px) {
    h2 {
      font-size: clamp(1.4rem, 6.5vw, 1.85rem);
      margin-bottom: 10px;
      line-height: 1.15;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.55;
      margin-bottom: 10px;
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

  &:focus-within {
    box-shadow:
      0 30px 68px rgba(0, 107, 63, 0.2),
      0 0 0 3px rgba(0,107,63,0.07);
  }

  @media (max-width: 640px) {
    padding: 20px 18px;
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
  }
`;

export const SplitBandTitle = styled.h2`
  font-size: clamp(1.9rem, 3.6vw, 2.7rem);
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  font-weight: 900;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: clamp(1.35rem, 6.5vw, 1.75rem);
    margin-bottom: 8px;
  }
`;

export const SplitBandSubTitle = styled.h3`
  color: ${COLORS.gold};
  margin-bottom: 10px;
  font-size: clamp(1.35rem, 2.3vw, 1.75rem);
  font-weight: 900;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 1.05rem;
  }
`;

export const SplitBandLead = styled.p`
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.02rem;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    line-height: 1.55;
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

export const FaqList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const FaqItem = styled.details`
  background: linear-gradient(145deg, #ffffff, #f8fcf9);
  border: 1px solid rgba(0, 107, 63, 0.12);
  border-radius: 14px;
  border-left: 5px solid ${COLORS.gold};
  padding: 20px 22px;
  box-shadow: 0 10px 26px rgba(0, 56, 32, 0.07);
  transition:
    border-color 0.2s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &[open] {
    border-color: ${COLORS.line};
    border-left-color: ${COLORS.red};
    box-shadow: 0 18px 38px rgba(0, 56, 32, 0.13);
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px rgba(0, 56, 32, 0.08);
    }
  }

  summary {
    font-weight: 800;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    min-height: 44px;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: "+";
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(243, 112, 33, 0.12);
      color: ${COLORS.gold};
      font-weight: 800;
      font-size: 1.15rem;
      line-height: 1;
      transition: transform 0.2s ease;
    }
  }

  &[open] summary::after {
    content: "–";
    color: ${COLORS.red};
  }

  p {
    margin-top: 8px;
    color: ${COLORS.muted};
    line-height: 1.55;
  }

  @media (max-width: 640px) {
    padding: 16px 16px;

    summary {
      font-size: 0.92rem;
      line-height: 1.35;
    }

    p {
      font-size: 0.88rem;
    }
  }
`;

export const MoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 22px;
  color: ${COLORS.red};
  font-weight: 800;
  text-decoration: none;
  min-height: 44px;
  padding: 10px 16px;
  border: 1px solid rgba(0, 107, 63, 0.2);
  border-radius: 999px;
  transition: color 0.2s ease, transform 0.2s ease, gap 0.2s ease;
  gap: 4px;

  &:hover {
    color: ${COLORS.redDark};
    transform: translateX(4px);
  }

  @media (max-width: 640px) {
    margin-top: 16px;
    font-size: 0.95rem;
  }
`;

export const LegalBand = styled.div`
  background:
    linear-gradient(90deg, rgba(243,112,33,0.08), transparent 24%, transparent 76%, rgba(0,107,63,0.08)),
    #f5efe8;
  padding-top: 28px;
  padding-bottom: 56px;
  ${contentPadX}

  @media (max-width: 640px) {
    padding-top: 20px;
    padding-bottom: 40px;
  }

  @media (max-width: 380px) {
    padding-top: 16px;
    padding-bottom: 32px;
  }
`;

export const LegalNote = styled.p`
  ${contentWidth}
  color: ${COLORS.muted};
  font-size: 0.9rem;
  line-height: 1.65;
  padding: 20px 22px;
  border-left: 4px solid ${COLORS.gold};
  border-radius: 0 12px 12px 0;
  background: rgba(255, 255, 255, 0.58);

  @media (max-width: 640px) {
    font-size: 0.84rem;
    line-height: 1.55;
  }
`;
