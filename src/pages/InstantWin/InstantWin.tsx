import Layout from "../../components/Layout/Layout";
import { PageHero, PageBody } from "../../components/PageHero/PageHero";
import Reveal from "../../components/Reveal/Reveal";
import {
  AddressBlock,
  BannerKicker,
  BannerLead,
  BannerTitle,
  ClaimBanner,
  Content,
  Intro,
  Note,
  PrizeList,
  Section,
  SectionTitle,
  Steps,
} from "./InstantWin.styles";

const InstantWin: React.FC = () => (
  <Layout>
    <PageHero
      kicker="Redeem in person"
      title="Instant win"
      lead="If under the crown shows an Instant Win prize, do not enter it online — claim it at Campden Park."
    />
    <PageBody>
      <Content>
        <Reveal>
          <Intro>
            Instant wins are self-evident at purchase. They are not part of the digital sweepstakes draw and cannot be
            submitted on this website. Keep your winning crown until redemption is complete.
          </Intro>
        </Reveal>

        <Reveal delay={80}>
          <ClaimBanner>
            <BannerKicker>In-person claim required</BannerKicker>
            <BannerTitle>St. Vincent Brewery Ltd. — Campden Park</BannerTitle>
            <BannerLead>
              Bring the physical winning crown and a valid government-issued photo ID proving you are 18 or older. Staff
              will verify the prize and complete handover in person — no website form, no code entry.
            </BannerLead>
            <AddressBlock>
              <strong>Redemption location</strong>
              <p>St. Vincent Brewery Ltd.</p>
              <p>Campden Park, Saint Vincent and the Grenadines</p>
              <small>
                Confirm office hours with Campaign Support before travelling:{" "}
                <a href="mailto:drinkvitamalt@gmail.com">drinkvitamalt@gmail.com</a>
              </small>
            </AddressBlock>
          </ClaimBanner>
        </Reveal>

        <Reveal delay={60}>
          <Section>
            <SectionTitle>How to redeem — 4 steps</SectionTitle>
            <Steps>
              <li>
                <span>1</span>
                <div>
                  <strong>Check under the crown</strong>
                  If you see an Instant Win prize, do not type anything on this site.
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Keep the crown</strong>
                  Do not discard or damage it — staff need the physical crown to verify your win.
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Bring valid photo ID</strong>
                  You must be 18+ and reside in Saint Vincent and the Grenadines. SVBL employees, agencies, family and
                  household members are not eligible.
                </div>
              </li>
              <li>
                <span>4</span>
                <div>
                  <strong>Visit Campden Park</strong>
                  Claim at the St. Vincent Brewery Ltd. office by the redemption deadline stated by the Promoter.
                </div>
              </li>
            </Steps>
          </Section>
        </Reveal>

        <Reveal delay={80}>
          <Section>
            <SectionTitle>Prizes under the crown</SectionTitle>
            <PrizeList>
              <li>Vita Malt 4-packs</li>
              <li>Vita Malt-branded merchandise</li>
              <li>Mobile phone credit</li>
              <li>Amazon gift cards</li>
              <li>Apple AirPods</li>
            </PrizeList>
          </Section>
        </Reveal>

        <Reveal delay={100}>
          <Section>
            <SectionTitle>Winners page</SectionTitle>
            <Note>
              Instant win winners may be featured on the campaign winners page after prize handover. Consent is collected
              verbally when your photo is taken — there is no on-site website consent flow.
            </Note>
          </Section>
        </Reveal>
      </Content>
    </PageBody>
  </Layout>
);

export default InstantWin;
