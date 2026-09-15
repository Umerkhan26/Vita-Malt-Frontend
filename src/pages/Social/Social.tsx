import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaTiktok, FaExternalLinkAlt } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { PageHero } from "../../components/PageHero/PageHero";
import Reveal from "../../components/Reveal/Reveal";
import { apiService } from "../../services/api";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Post = styled.article`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 10px 28px rgba(20, 20, 20, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(74, 8, 16, 0.08);
  }

  @media (max-width: 640px) {
    padding: 14px;
    border-radius: 14px;
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }

  iframe {
    width: 100%;
    max-width: 100%;
    height: 420px;
    border: 0;
    border-radius: 12px;

    @media (max-width: 640px) {
      height: 360px;
    }

    @media (max-width: 380px) {
      height: 300px;
    }
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 800;
  text-transform: capitalize;
  color: ${COLORS.red};
  font-size: 0.92rem;
`;

const Empty = styled.div`
  background: ${COLORS.white};
  border: 1px dashed ${COLORS.line};
  border-radius: 4px;
  padding: 36px 24px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 28px 18px;
  }
`;

const EmptyBadge = styled.span`
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.redDeep};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.68rem;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 14px;
`;

const EmptyTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  letter-spacing: -0.02em;
  margin-bottom: 10px;
  color: ${COLORS.redDeep};
`;

const EmptyLead = styled.p`
  color: ${COLORS.muted};
  line-height: 1.6;
  max-width: 480px;
  margin: 0 auto 20px;
  font-size: 1rem;
`;

const Hint = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 8px;
  text-align: left;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HintCard = styled.div`
  background: ${COLORS.paper};
  border: 1px solid ${COLORS.line};
  border-radius: 14px;
  padding: 16px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${COLORS.gold};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    color: ${COLORS.ink};
  }

  span {
    color: ${COLORS.muted};
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  color: ${COLORS.red};
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  min-height: 44px;
  padding: 8px 0;

  &:hover {
    color: ${COLORS.redDark};
  }
`;

interface SocialPost {
  _id: string;
  platform: string;
  embedUrl: string;
  caption?: string;
}

const iconFor = (platform: string) => {
  if (platform === "facebook") return <FaFacebook />;
  if (platform === "tiktok") return <FaTiktok />;
  return <FaInstagram />;
};

const Social: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);

  useEffect(() => {
    apiService
      .social()
      .then((res) => setPosts((res as { posts: SocialPost[] }).posts || []))
      .catch(() => undefined);
  }, []);

  return (
    <Layout>
      <PageHero
        kicker="Community"
        title="From our socials"
        lead="Featured posts from SVBL / Vita Malt — tap through to like, share, or follow."
      />
      <Wrap>
        {posts.length === 0 ? (
          <Reveal>
            <Empty>
              <EmptyBadge>Coming soon</EmptyBadge>
              <EmptyTitle>Social feed launching with the campaign</EmptyTitle>
              <EmptyLead>
                SVBL will publish featured Instagram and Facebook posts here during the campaign. Follow the brand
                channels and check back for winner announcements and promo moments.
              </EmptyLead>
              <Hint>
                <HintCard>
                  <strong>
                    <FaInstagram /> Instagram
                  </strong>
                  <span>Winner photos and crown moments will be featured here.</span>
                </HintCard>
                <HintCard>
                  <strong>
                    <FaFacebook /> Facebook
                  </strong>
                  <span>Campaign updates and announcement posts pulled onto this page.</span>
                </HintCard>
                <HintCard>
                  <strong>
                    <FaTiktok /> More
                  </strong>
                  <span>Admin can add curated post links anytime from the dashboard.</span>
                </HintCard>
              </Hint>
            </Empty>
          </Reveal>
        ) : (
          <Grid>
            {posts.map((post, i) => (
              <Reveal key={post._id} delay={Math.min(i * 80, 240)}>
                <Post>
                  <Meta>
                    {iconFor(post.platform)} {post.platform}
                  </Meta>
                  {post.caption && (
                    <p style={{ marginBottom: 8, lineHeight: 1.55, color: COLORS.ink }}>{post.caption}</p>
                  )}
                  {post.embedUrl.includes("instagram.com") && (
                    <iframe
                      title={post._id}
                      src={`${post.embedUrl.replace(/\/$/, "")}/embed`}
                      width="100%"
                      height="420"
                      loading="lazy"
                    />
                  )}
                  <LinkBtn href={post.embedUrl} target="_blank" rel="noreferrer">
                    View post <FaExternalLinkAlt />
                  </LinkBtn>
                </Post>
              </Reveal>
            ))}
          </Grid>
        )}
      </Wrap>
    </Layout>
  );
};

export default Social;
