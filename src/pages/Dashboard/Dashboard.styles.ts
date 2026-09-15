import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";

const rise = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(232, 185, 35, 0.35); }
  50% { box-shadow: 0 0 0 10px rgba(232, 185, 35, 0); }
`;

export const Page = styled.div`
  background:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(177, 18, 38, 0.06), transparent 60%),
    ${COLORS.paper};
  min-height: 60vh;
`;

export const Wrap = styled.div`
  ${contentWidth}
  padding-top: 28px;
  padding-bottom: 72px;
  ${contentPadX}
  animation: ${rise} 0.4s ease;

  @media (max-width: 640px) {
    padding-top: 18px;
    padding-bottom: 48px;
  }
`;
export const LookupCard = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 22px;
  padding: 28px 24px;
  box-shadow: 0 16px 40px rgba(20, 20, 20, 0.06);
  max-width: 520px;
  margin: 0 auto;

  h2 {
    font-size: 1.45rem;
    letter-spacing: -0.03em;
    margin-bottom: 6px;
  }

  .lead {
    color: ${COLORS.muted};
    margin-bottom: 18px;
    line-height: 1.55;
    font-size: 0.95rem;
  }

  @media (max-width: 640px) {
    padding: 18px 16px;
    border-radius: 16px;

    h2 {
      font-size: 1.25rem;
    }

    .lead {
      font-size: 0.88rem;
    }
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${COLORS.muted};
  margin: 12px 0 6px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.paper};
  font-size: 16px;
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    outline: 2px solid rgba(177, 18, 38, 0.18);
    border-color: ${COLORS.red};
  }
`;

export const Btn = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.redDark} 100%);
  color: white;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  min-height: 48px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(177, 18, 38, 0.28);
  }
`;

export const GhostBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: transparent;
  font-weight: 700;
  cursor: pointer;
  color: ${COLORS.ink};

  &:hover {
    background: ${COLORS.paper};
  }
`;

export const Or = styled.p`
  text-align: center;
  margin: 14px 0 4px;
  color: ${COLORS.muted};
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const HeroCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  padding: 26px 24px 22px;
  color: ${COLORS.white};
  margin-bottom: 16px;
  background:
    radial-gradient(ellipse 70% 90% at 100% 0%, rgba(232, 185, 35, 0.35), transparent 55%),
    linear-gradient(125deg, ${COLORS.redDeep} 0%, ${COLORS.red} 100%);
  box-shadow: 0 18px 40px rgba(74, 8, 16, 0.28);

  h2 {
    font-size: clamp(1.4rem, 3vw, 1.85rem);
    letter-spacing: -0.03em;
    margin-bottom: 4px;
  }

  .sub {
    opacity: 0.9;
    font-size: 0.92rem;
    margin-bottom: 18px;
  }
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.div`
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  padding: 14px;
  backdrop-filter: blur(6px);

  strong {
    display: block;
    font-size: 1.55rem;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  span {
    display: block;
    margin-top: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    opacity: 0.85;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
`;

export const ProgressWrap = styled.div`
  margin-top: 18px;

  .label {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
    font-weight: 700;
    margin-bottom: 8px;
    opacity: 0.95;
    gap: 8px;

    @media (max-width: 560px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      font-size: 0.78rem;
    }
  }
`;

export const ProgressBar = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border-radius: 999px;
  height: 12px;
  overflow: hidden;

  i {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldSoft});
    transition: width 0.5s ease;
    animation: ${pulse} 2.4s ease-in-out infinite;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 28px rgba(20, 20, 20, 0.04);

  @media (max-width: 640px) {
    padding: 16px;
    border-radius: 14px;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    margin-bottom: 4px;

    svg {
      color: ${COLORS.red};
    }
  }

  .hint {
    color: ${COLORS.muted};
    font-size: 0.85rem;
    margin-bottom: 12px;
  }
`;

export const List = styled.ul`
  list-style: none;
  max-height: 340px;
  overflow-y: auto;
`;

export const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${COLORS.line};
  font-size: 0.92rem;

  &:last-child {
    border-bottom: none;
  }

  .icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: rgba(177, 18, 38, 0.08);
    color: ${COLORS.red};
    flex-shrink: 0;
  }

  .meta {
    min-width: 0;
    flex: 1;

    strong {
      display: block;
      letter-spacing: 0.02em;
    }

    span {
      color: ${COLORS.muted};
      font-size: 0.8rem;
    }
  }

  .tag {
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 4px 9px;
    border-radius: 999px;
    background: rgba(232, 185, 35, 0.2);
    color: #7a5a00;
  }

  .tag.win {
    background: rgba(31, 122, 77, 0.14);
    color: ${COLORS.success};
  }
`;

export const CtaStrip = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 560px) {
    flex-direction: column;

    a,
    button {
      width: 100%;
      justify-content: center;
      min-height: 48px;
      box-sizing: border-box;
    }
  }
`;

export const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: white;
  font-weight: 800;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    background: ${COLORS.redDark};
  }
`;

export const LinkGhost = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.white};
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
`;

export const Empty = styled.div`
  text-align: center;
  padding: 28px 12px;
  color: ${COLORS.muted};
  font-size: 0.92rem;

  strong {
    display: block;
    color: ${COLORS.ink};
    margin-bottom: 6px;
  }
`;
