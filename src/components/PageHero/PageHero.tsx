import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";
import Reveal from "../Reveal/Reveal";

const shimmer = keyframes`
  0% { transform: translateX(-20%) rotate(8deg); opacity: 0.35; }
  50% { opacity: 0.55; }
  100% { transform: translateX(20%) rotate(8deg); opacity: 0.35; }
`;

const Wrap = styled.section`
  position: relative;
  overflow: hidden;
  color: ${COLORS.white};
  background:
    radial-gradient(ellipse 80% 90% at 100% 10%, rgba(243, 112, 33, 0.35), transparent 55%),
    radial-gradient(ellipse 60% 70% at 0% 100%, rgba(0, 0, 0, 0.28), transparent 50%),
    linear-gradient(125deg, ${COLORS.redDeep} 0%, ${COLORS.redDark} 42%, ${COLORS.red} 100%);
  padding-top: 48px;
  padding-bottom: 44px;
  ${contentPadX}
  border-bottom: 4px solid ${COLORS.gold};

  @media (max-width: 640px) {
    padding-top: 32px;
    padding-bottom: 30px;
  }
`;

const Pattern = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.55) 1px, transparent 0);
  background-size: 18px 18px;
`;

const Glow = styled.div`
  pointer-events: none;
  position: absolute;
  top: -40%;
  right: -10%;
  width: 55%;
  height: 180%;
  background: linear-gradient(90deg, transparent, rgba(243, 112, 33, 0.22), transparent);
  animation: ${shimmer} 8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  ${contentWidth}
`;

const Copy = styled.div`
  min-width: 0;
  max-width: 720px;
`;

const Kicker = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${COLORS.gold};
  color: ${COLORS.white};
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.68rem;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
`;

const Title = styled.h1`
  font-size: clamp(1.9rem, 5vw, 3rem);
  letter-spacing: -0.04em;
  margin-bottom: 10px;
  line-height: 1.05;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  @media (max-width: 640px) {
    font-size: clamp(1.45rem, 7vw, 1.85rem);
    line-height: 1.12;
  }
`;

const Rule = styled.div`
  width: 72px;
  height: 3px;
  border-radius: 4px;
  background: linear-gradient(90deg, ${COLORS.gold}, transparent);
  margin-bottom: 12px;
`;

const Lead = styled.p`
  max-width: 560px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

const Body = styled.div`
  ${contentWidth}
  padding-top: 32px;
  padding-bottom: 72px;
  ${contentPadX}

  @media (max-width: 640px) {
    padding-top: 20px;
    padding-bottom: 48px;
  }
`;

const Card = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-top: 4px solid ${COLORS.gold};
  padding: 22px;
  box-shadow: 0 10px 28px rgba(0, 56, 32, 0.06);
  line-height: 1.65;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 16px 36px rgba(0, 56, 32, 0.1);
    }
  }

  @media (max-width: 640px) {
    padding: 16px 14px;
  }

  h3 {
    margin: 16px 0 8px;
    color: ${COLORS.redDark};

    @media (max-width: 640px) {
      font-size: 1.05rem;
    }
  }

  ul {
    margin-left: 18px;
  }

  p {
    @media (max-width: 640px) {
      font-size: 0.9rem;
      line-height: 1.55;
    }
  }
`;

export const PageHero: React.FC<{ kicker?: string; title: string; lead?: string }> = ({
  kicker,
  title,
  lead,
}) => (
  <Wrap>
    <Pattern />
    <Glow />
    <Inner>
      <Copy>
        {kicker && (
          <Reveal variant="fade" delay={40} duration={700} margin="0px">
            <Kicker>{kicker}</Kicker>
          </Reveal>
        )}
        <Reveal variant="up" delay={100} duration={800} margin="0px">
          <Title>{title}</Title>
        </Reveal>
        <Reveal variant="fade" delay={180} duration={700} margin="0px">
          <Rule />
        </Reveal>
        {lead && (
          <Reveal variant="up" delay={220} duration={800} margin="0px">
            <Lead>{lead}</Lead>
          </Reveal>
        )}
      </Copy>
    </Inner>
  </Wrap>
);

export const PageBody: React.FC<{ children: React.ReactNode }> = ({ children }) => <Body>{children}</Body>;

export const PageCard = Card;
