import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";

const heroZoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.045); }
`;

const softPulse = keyframes`
  0%, 100% { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25); }
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
  transform-origin: center center;
  animation: ${heroZoom} 22s ease-out forwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

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
  /* Same pin on laptop + desktop — above “WIN THE”, left with prize column */
  top: 4%;
  left: 10.6%;
  right: auto;
  width: auto;
  max-width: min(420px, 42%);
  margin: 0;
  padding: 0;
  box-sizing: border-box;

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
  /* Desktop: under prize list, left-aligned with green box */
  top: auto;
  bottom: 2%;
  left: 10.6%;
  right: auto;
  width: auto;
  max-width: min(520px, 48%);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;

  /* Laptop only: tiny lift from bottom — not enough to hit the green prize box */
  @media (min-width: 901px) and (max-width: 1535px) {
    top: auto;
    bottom: 0.5%;
    left: 10.6%;

    a {
      padding: 10px 18px;
      font-size: 0.8rem;
      line-height: 1.1;
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
  }
`;

export const Kicker = styled.p`
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.white};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  animation: ${softPulse} 3.2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 380px) {
    gap: 10px;
  }
`;

export const StepCard = styled.article`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  padding: 28px 24px;
  min-height: 200px;
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
  }

  ul {
    margin: 8px 0 0;
    padding-left: 1.1rem;
    color: ${COLORS.muted};
    line-height: 1.55;
  }

  li + li {
    margin-top: 6px;
  }
`;

export const PrizeGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 18px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  @media (max-width: 380px) {
    gap: 10px;
  }
`;

export const PrizeCard = styled.article<{ $featured?: boolean }>`
  background: ${({ $featured }) => ($featured ? "rgba(0,0,0,0.28)" : COLORS.white)};
  color: ${({ $featured }) => ($featured ? COLORS.white : COLORS.ink)};
  border: 1px solid ${({ $featured }) => ($featured ? "rgba(243,112,33,0.45)" : "transparent")};
  border-radius: 4px;
  padding: 28px;
  min-height: 300px;
  box-shadow: ${({ $featured }) => ($featured ? "0 20px 50px rgba(0,0,0,0.25)" : "0 12px 32px rgba(0,0,0,0.12)")};
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    border-color 0.2s ease;
  backdrop-filter: ${({ $featured }) => ($featured ? "blur(8px)" : "none")};

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
    border-radius: 4px;
    margin-bottom: 14px;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  ul {
    margin-left: 18px;
    line-height: 1.75;
    color: ${({ $featured }) => ($featured ? "rgba(255,255,255,0.9)" : COLORS.muted)};
  }
`;

export const EnterWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(28px, 4vw, 48px);
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const EnterCopy = styled.div`
  h2 {
    font-size: clamp(2rem, 3.8vw, 2.9rem);
    letter-spacing: -0.03em;
    margin-bottom: 14px;
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
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-top: 4px solid ${COLORS.gold};
  padding: clamp(22px, 3vw, 32px);
  box-shadow: 0 22px 56px rgba(0, 107, 63, 0.12);
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 26px 64px rgba(0, 107, 63, 0.18);
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
  background: ${COLORS.paper};
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
  background: ${COLORS.red};
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
    background: ${COLORS.redDark};
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
  background:
    radial-gradient(ellipse 50% 80% at 0% 50%, rgba(243, 112, 33, 0.22), transparent 55%),
    linear-gradient(120deg, ${COLORS.redDeep} 0%, ${COLORS.redDark} 55%, ${COLORS.red} 100%);
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
  gap: clamp(24px, 4vw, 40px);
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const SplitBandTitle = styled.h2`
  font-size: clamp(1.9rem, 3.6vw, 2.7rem);
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  line-height: 1.1;

  @media (max-width: 640px) {
    font-size: clamp(1.35rem, 6.5vw, 1.75rem);
    margin-bottom: 8px;
  }
`;

export const SplitBandSubTitle = styled.h3`
  color: ${COLORS.gold};
  margin-bottom: 10px;
  font-size: 1.2rem;
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
  border-radius: 4px;
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
  gap: 12px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const FaqItem = styled.details`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-left: 4px solid ${COLORS.gold};
  padding: 18px 20px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &[open] {
    border-color: ${COLORS.line};
    border-left-color: ${COLORS.red};
    box-shadow: 0 12px 28px rgba(0, 56, 32, 0.1);
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
  padding: 8px 0;
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
  background: #f3ebe3;
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

  @media (max-width: 640px) {
    font-size: 0.84rem;
    line-height: 1.55;
  }
`;
