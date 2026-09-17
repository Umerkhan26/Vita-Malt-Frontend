import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaTiktok, FaExternalLinkAlt } from "react-icons/fa";
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
  padding-top: 32px;
  padding-bottom: 72px;

  @media (max-width: 640px) {
    padding-top: 22px;
    padding-bottom: 52px;
  }
`;

const Intro = styled.p`
  max-width: 640px;
  color: ${COLORS.muted};
  line-height: 1.6;
  font-size: 1.02rem;
  margin: 0 0 28px;

  @media (max-width: 640px) {
    font-size: 0.92rem;
    margin-bottom: 20px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 18px;
    max-width: 520px;
    margin-inline: auto;
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }
`;

const Post = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 56, 32, 0.07);
  min-width: 0;

  @media (max-width: 640px) {
    border-radius: 16px;
  }
`;

const Head = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 12px;
  min-height: 62px;
  flex-shrink: 0;
`;

const PlatformIcon = styled.span<{ $platform: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: #fff;
  font-size: 15px;
  background: ${({ $platform }) =>
    $platform === "facebook"
      ? "#1877F2"
      : $platform === "tiktok"
        ? "#111"
        : "linear-gradient(135deg, #f58529, #dd2a7b 52%, #8134af)"};
`;

const HeadCopy = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 0.92rem;
    font-weight: 800;
    color: ${COLORS.ink};
    text-transform: capitalize;
    letter-spacing: -0.01em;
  }

  span {
    display: block;
    font-size: 0.78rem;
    color: ${COLORS.muted};
    margin-top: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Cover = styled.a<{ $platform: string }>`
  display: block;
  position: relative;
  flex-shrink: 0;
  aspect-ratio: 4 / 3;
  background: ${({ $platform }) =>
    $platform === "facebook"
      ? "linear-gradient(160deg, #1877F2 0%, #0d47a1 100%)"
      : $platform === "tiktok"
        ? "linear-gradient(160deg, #111 0%, #333 100%)"
        : "linear-gradient(135deg, #f58529, #dd2a7b 52%, #8134af)"};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .fallback {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 52px;
    color: rgba(255, 255, 255, 0.88);
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 14px 16px 4px;
  display: flex;
  flex-direction: column;
`;

const Excerpt = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${COLORS.muted};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: calc(0.9rem * 1.5 * 3);
`;

const Foot = styled.footer`
  padding: 12px 14px 14px;
  margin-top: auto;
  flex-shrink: 0;
`;

const LinkBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 0.88rem;
  text-decoration: none;
  box-shadow: 0 8px 18px rgba(0, 107, 63, 0.18);

  &:hover {
    background: ${COLORS.redDark};
  }
`;

const Empty = styled.div`
  background: ${COLORS.white};
  border: 1px dashed ${COLORS.line};
  border-radius: 16px;
  padding: 36px 24px;
  text-align: center;

  @media (max-width: 640px) {
    padding: 28px 18px;
  }
`;

const EmptyBadge = styled.span`
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.white};
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

interface SocialPost {
  _id: string;
  platform: string;
  embedUrl: string;
  caption?: string;
  previewTitle?: string;
  previewDescription?: string;
  previewImage?: string;
}

const iconFor = (platform: string) => {
  if (platform === "facebook") return <FaFacebook />;
  if (platform === "tiktok") return <FaTiktok />;
  return <FaInstagram />;
};

const openLabel = (platform: string) => {
  if (platform === "facebook") return "Open on Facebook";
  if (platform === "tiktok") return "Open on TikTok";
  if (platform === "instagram") return "Open on Instagram";
  return "View original post";
};

const Social: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    apiService
      .social()
      .then((res) => setPosts((res as { posts: SocialPost[] }).posts || []))
      .catch(() => undefined)
      .finally(() => setLoaded(true));
  }, []);

  return (
    <Layout>
      <PageHero
        kicker="Community"
        title="From our socials"
        lead="Featured posts from SVBL / Vita Malt — tap through to like, share, or follow."
      />
      <Wrap>
        {!loaded ? null : posts.length === 0 ? (
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
          <>
            <Intro>
              {posts.length} featured {posts.length === 1 ? "post" : "posts"} from the campaign. Open a card to view it
              on the original channel.
            </Intro>
            <Grid>
              {posts.map((post, i) => {
                const pageName = post.previewTitle || "Featured post";
                const text = post.previewDescription || post.caption || "";
                return (
                  <Reveal key={post._id} delay={Math.min(i * 80, 240)} style={{ height: "100%", display: "flex" }}>
                    <Post>
                      <Head>
                        <PlatformIcon $platform={post.platform}>{iconFor(post.platform)}</PlatformIcon>
                        <HeadCopy>
                          <strong>{post.platform}</strong>
                          <span>{pageName}</span>
                        </HeadCopy>
                      </Head>
                      <Cover
                        href={post.embedUrl}
                        target="_blank"
                        rel="noreferrer"
                        $platform={post.platform}
                        aria-label={openLabel(post.platform)}
                      >
                        {post.previewImage ? (
                          <img src={mediaUrl(post.previewImage)} alt="" />
                        ) : (
                          <span className="fallback">{iconFor(post.platform)}</span>
                        )}
                      </Cover>
                      <Body>
                        <Excerpt>{text || pageName}</Excerpt>
                      </Body>
                      <Foot>
                        <LinkBtn href={post.embedUrl} target="_blank" rel="noreferrer">
                          {openLabel(post.platform)} <FaExternalLinkAlt />
                        </LinkBtn>
                      </Foot>
                    </Post>
                  </Reveal>
                );
              })}
            </Grid>
          </>
        )}
      </Wrap>
    </Layout>
  );
};

export default Social;
