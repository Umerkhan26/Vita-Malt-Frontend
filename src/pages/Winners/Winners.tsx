import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrophy, FaTv, FaGift, FaShareAlt } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { PageHero } from "../../components/PageHero/PageHero";
import Reveal from "../../components/Reveal/Reveal";
import { apiService } from "../../services/api";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:3001/api").replace(/\/api\/?$/, "");

const mediaUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
};

const Wrap = styled.div`
  ${contentWidth}
  ${contentPadX}
  padding-top: 28px;
  padding-bottom: 64px;

  @media (max-width: 640px) {
    padding-top: 20px;
    padding-bottom: 48px;
  }
`;

const Intro = styled.p`
  max-width: 640px;
  color: ${COLORS.muted};
  line-height: 1.6;
  font-size: 1.02rem;
  margin-bottom: 32px;

  @media (max-width: 640px) {
    font-size: 0.92rem;
    margin-bottom: 22px;
    line-height: 1.55;
  }
`;

const Tier = styled.section`
  margin-bottom: 36px;
`;

const TierHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${COLORS.line};

  h2 {
    font-size: clamp(1.15rem, 2.5vw, 1.35rem);
    letter-spacing: -0.02em;
  }

  span {
    display: inline-flex;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background: ${COLORS.red};
    color: ${COLORS.white};
    font-size: 1rem;
    box-shadow: 0 6px 16px rgba(177, 18, 38, 0.22);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Card = styled.article`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(20, 20, 20, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 32px rgba(74, 8, 16, 0.1);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const Photo = styled.div<{ $src?: string }>`
  height: 160px;
  background: ${({ $src }) =>
    $src ? `url(${$src}) center/cover` : `linear-gradient(145deg, ${COLORS.redDeep}, ${COLORS.red})`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.gold};
  font-size: 2.2rem;
`;

const Body = styled.div`
  padding: 16px;

  strong {
    display: block;
    margin-bottom: 4px;
    font-size: 1.02rem;
  }

  p {
    color: ${COLORS.muted};
    font-size: 0.92rem;
    line-height: 1.45;
  }
`;

const Share = styled.button`
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${COLORS.red};
  font-weight: 700;
  font-size: 0.88rem;
  cursor: pointer;
  transition: color 0.15s ease;
  min-height: 44px;
  padding: 8px 0;

  &:hover {
    color: ${COLORS.redDark};
  }
`;

const Empty = styled.div`
  background: ${COLORS.white};
  border: 1px dashed ${COLORS.line};
  border-radius: 18px;
  padding: 28px 22px;
  color: ${COLORS.muted};
  line-height: 1.6;

  strong {
    display: block;
    color: ${COLORS.redDeep};
    font-size: 1.05rem;
    margin-bottom: 8px;
  }

  p {
    max-width: 520px;
  }
`;

const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.paper};
  color: ${COLORS.red};
  font-size: 1.25rem;
  margin-bottom: 14px;
  border: 1px solid ${COLORS.line};
`;

interface Winner {
  _id: string;
  displayName: string;
  prizeLabel: string;
  photoUrl?: string;
  tier: string;
}

const Winners: React.FC = () => {
  const [data, setData] = useState<{ instant: Winner[]; grand: Winner[]; secondary: Winner[] }>({
    instant: [],
    grand: [],
    secondary: [],
  });

  useEffect(() => {
    apiService
      .winners()
      .then((res) => setData(res as typeof data))
      .catch(() => undefined);
  }, []);

  const share = async (winner: Winner) => {
    const text = `${winner.displayName} won ${winner.prizeLabel} in the Vita Malt 2026 campaign!`;
    if (navigator.share) {
      await navigator.share({ title: "Vita Malt Winner", text, url: window.location.href });
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${window.location.href}`)}`);
  };

  const Section = ({
    title,
    icon,
    items,
    emptyTitle,
    empty,
  }: {
    title: string;
    icon: React.ReactNode;
    items: Winner[];
    emptyTitle: string;
    empty: string;
  }  ) => (
    <Reveal>
      <Tier>
        <TierHead>
          <span>{icon}</span>
          <h2>{title}</h2>
        </TierHead>
        {items.length === 0 ? (
          <Empty>
            <EmptyIcon>{icon}</EmptyIcon>
            <strong>{emptyTitle}</strong>
            <p>{empty}</p>
          </Empty>
        ) : (
          <Grid>
            {items.map((w) => (
              <Card key={w._id}>
                <Photo $src={mediaUrl(w.photoUrl) || undefined}>
                  {!w.photoUrl && <FaTrophy />}
                </Photo>
                <Body>
                  <strong>{w.displayName}</strong>
                  <p>{w.prizeLabel}</p>
                  <Share onClick={() => share(w)}>
                    <FaShareAlt /> Share
                  </Share>
                </Body>
              </Card>
            ))}
          </Grid>
        )}
      </Tier>
    </Reveal>
  );

  return (
    <Layout>
      <PageHero
        kicker="Showcase"
        title="Winners"
        lead="Instant win winners are featured throughout the campaign. Grand and secondary prizes are announced after the November 23 draw."
      />
      <Wrap>
        <Reveal>
          <Intro>
            Winners appear here as prizes are handed over and verified. Share a win to spread the word — every crown could
            be your next moment.
          </Intro>
        </Reveal>
        <Section
          title="Instant win"
          icon={<FaGift />}
          items={data.instant}
          emptyTitle="No instant winners yet"
          empty="Instant win winners appear here after they redeem at the SVBL office and their photo is published by admin."
        />
        <Section
          title="Grand prize"
          icon={<FaTv />}
          items={data.grand}
          emptyTitle="Grand prize pending"
          empty="1 grand prize winner will be drawn electronically on November 23, 2026 after verification."
        />
        <Section
          title="Secondary prizes"
          icon={<FaTrophy />}
          items={data.secondary}
          emptyTitle="Secondary winners pending"
          empty="2 secondary prize winners will be selected in the same draw and announced after verification."
        />
      </Wrap>
    </Layout>
  );
};

export default Winners;
