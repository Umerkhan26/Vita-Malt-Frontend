import styled from "styled-components";
import { COLORS } from "../../constants/colors";
import { contentWidth } from "../../constants/layout";

export const Content = styled.div`
  ${contentWidth}
  display: grid;
  gap: 32px;

  @media (max-width: 640px) {
    gap: 22px;
  }
`;

export const Intro = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  color: ${COLORS.ink};
  max-width: 720px;

  @media (max-width: 640px) {
    font-size: 0.92rem;
    line-height: 1.55;
  }
`;

export const ClaimBanner = styled.aside`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 80% at 100% 0%, rgba(243, 112, 33, 0.28), transparent 55%),
    linear-gradient(135deg, ${COLORS.redDeep} 0%, ${COLORS.red} 100%);
  color: ${COLORS.white};
  border-radius: 4px;
  padding: 28px 24px;
  border: 2px solid ${COLORS.gold};
  box-shadow: 0 16px 40px rgba(0, 56, 32, 0.2);

  @media (max-width: 640px) {
    padding: 18px 14px;
  }
`;

export const BannerKicker = styled.span`
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.redDeep};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.68rem;
  padding: 5px 10px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const BannerTitle = styled.h2`
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  letter-spacing: -0.02em;
  margin-bottom: 10px;
  line-height: 1.15;

  @media (max-width: 640px) {
    font-size: clamp(1.2rem, 5.5vw, 1.45rem);
  }
`;

export const BannerLead = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 16px;
  max-width: 560px;

  @media (max-width: 640px) {
    font-size: 0.9rem;
    line-height: 1.55;
  }
`;

export const AddressBlock = styled.address`
  font-style: normal;
  background: rgba(0, 0, 0, 0.22);
  border-left: 3px solid ${COLORS.gold};
  border-radius: 0 12px 12px 0;
  padding: 14px 16px;
  line-height: 1.55;

  strong {
    display: block;
    color: ${COLORS.goldSoft};
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  p {
    margin-bottom: 4px;
  }

  small {
    display: block;
    margin-top: 8px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.88rem;

    a {
      color: ${COLORS.goldSoft};
      font-weight: 800;
    }
  }
`;

export const Section = styled.section``;

export const SectionTitle = styled.h3`
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid ${COLORS.line};
  color: ${COLORS.redDeep};
`;

export const PrizeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  li {
    background: ${COLORS.white};
    border: 1px solid ${COLORS.line};
    border-radius: 12px;
    padding: 12px 14px;
    font-weight: 700;
    color: ${COLORS.ink};
    line-height: 1.4;

    @media (max-width: 640px) {
      font-size: 0.9rem;
      padding: 12px;
    }
  }
`;

export const Steps = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;

  li {
    display: grid;
    grid-template-columns: 36px 1fr;
    gap: 12px;
    align-items: start;
    line-height: 1.55;
    color: ${COLORS.muted};
  }

  span {
    display: inline-flex;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background: ${COLORS.red};
    color: ${COLORS.white};
    font-weight: 800;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  strong {
    display: block;
    color: ${COLORS.ink};
    margin-bottom: 2px;
  }
`;

export const Note = styled.p`
  color: ${COLORS.muted};
  line-height: 1.6;
  font-size: 0.95rem;
`;
