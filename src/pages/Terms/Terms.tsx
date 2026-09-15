import styled, { keyframes } from "styled-components";
import Layout from "../../components/Layout/Layout";
import { PageHero, PageBody } from "../../components/PageHero/PageHero";
import { COLORS } from "../../constants/colors";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Shell = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
  animation: ${fadeUp} 0.45s ease both;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Toc = styled.nav`
  position: sticky;
  top: 76px;

  .toc-desktop {
    background: ${COLORS.paper};
    border: 1px solid ${COLORS.line};
    border-left: 3px solid ${COLORS.gold};
    border-radius: 0 4px 4px 0;
    padding: 16px 14px 14px;
  }

  .toc-mobile {
    display: none;
  }

  h2 {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${COLORS.redDeep};
    margin-bottom: 10px;
    font-weight: 800;
  }

  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 2px;
  }

  a {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 6px;
    align-items: baseline;
    padding: 8px 6px;
    color: ${COLORS.ink};
    text-decoration: none;
    font-weight: 700;
    font-size: 0.84rem;
    line-height: 1.35;
    border-radius: 4px;
    transition: background 0.15s ease, color 0.15s ease;

    span {
      color: ${COLORS.gold};
      font-weight: 800;
      font-variant-numeric: tabular-nums;
    }

    &:hover {
      background: rgba(0, 107, 63, 0.06);
      color: ${COLORS.red};
    }
  }

  @media (max-width: 900px) {
    position: static;

    .toc-desktop {
      display: none;
    }

    .toc-mobile {
      display: block;
      background: ${COLORS.white};
      border: 1px solid ${COLORS.line};
      border-left: 3px solid ${COLORS.gold};
      border-radius: 0 4px 4px 0;
      padding: 4px 12px 8px;
    }

    summary {
      list-style: none;
      cursor: pointer;
      font-weight: 800;
      font-size: 0.84rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: ${COLORS.redDeep};
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      &::-webkit-details-marker {
        display: none;
      }

      &::after {
        content: "+";
        color: ${COLORS.gold};
        font-size: 1.1rem;
      }
    }

    details[open] summary::after {
      content: "−";
    }

    ol {
      padding-bottom: 6px;
    }

    a {
      min-height: 40px;
      align-items: center;
      font-size: 0.9rem;
      padding: 8px 4px;
    }
  }
`;

const Doc = styled.article`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-top: 4px solid ${COLORS.gold};
  padding: 28px 24px;
  box-shadow: 0 12px 32px rgba(0, 56, 32, 0.06);
  min-width: 0;

  @media (max-width: 640px) {
    padding: 18px 16px;
  }
`;

const Intro = styled.p`
  color: ${COLORS.muted};
  line-height: 1.65;
  font-size: 0.98rem;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLORS.line};
`;

const Section = styled.section`
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${COLORS.line};
  scroll-margin-top: 80px;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    font-size: 0.92rem;
    letter-spacing: 0.04em;
    color: ${COLORS.redDark};
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: 800;
  }

  p {
    color: ${COLORS.muted};
    line-height: 1.65;
    margin-bottom: 10px;
    font-size: 0.98rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 0 0 10px 1.15rem;
    color: ${COLORS.muted};
    line-height: 1.55;
    font-size: 0.98rem;
  }

  li + li {
    margin-top: 4px;
  }

  a {
    color: ${COLORS.red};
    font-weight: 800;
  }

  strong.important {
    color: ${COLORS.redDeep};
  }
`;

const Updated = styled.p`
  margin-top: 20px;
  color: ${COLORS.muted};
  font-size: 0.88rem;
  font-weight: 700;
`;

/** Official copy — Vitalize_Your_Game_Revised_FAQ_TC- v2 (Section B) */
const sections = [
  { id: "promoter", n: "1", title: "Promoter" },
  { id: "eligibility", n: "2", title: "Eligibility" },
  { id: "promotion-period", n: "3", title: "Promotion Period" },
  { id: "participating-products", n: "4", title: "Participating Products" },
  { id: "how-to-enter", n: "5", title: "How to Enter" },
  { id: "entry-rules", n: "6", title: "Entry Rules" },
  { id: "code-verification", n: "7", title: "Code and Entry Verification" },
  { id: "selection-contact", n: "8", title: "Selection and Contact of Winners" },
  { id: "prizes", n: "9", title: "Prizes" },
  { id: "prize-claims", n: "10", title: "Prize Claims" },
  { id: "keeping-crowns", n: "11", title: "Keeping Promotional Crowns" },
  { id: "publicity", n: "12", title: "Publicity" },
  { id: "technical-liability", n: "14", title: "Technical Issues and Liability" },
  { id: "modification", n: "15", title: "Modification or Termination" },
  { id: "governing-law", n: "16", title: "Governing Law" },
  { id: "contact", n: "17", title: "Contact" },
] as const;

const TocLinks = () => (
  <ol>
    {sections.map((s) => (
      <li key={s.id}>
        <a href={`#${s.id}`}>
          <span>{s.n}.</span>
          {s.title}
        </a>
      </li>
    ))}
  </ol>
);

const Terms: React.FC = () => (
  <Layout>
    <PageHero
      kicker="Legal"
      title="Terms & Conditions"
      lead="Vitalize Your Game — Official Promotion Terms · St. Vincent Brewery Ltd."
    />
    <PageBody>
      <Shell>
        <Toc aria-label="Terms sections">
          <div className="toc-desktop">
            <h2>Contents</h2>
            <TocLinks />
          </div>

          <details className="toc-mobile">
            <summary>Contents</summary>
            <TocLinks />
          </details>
        </Toc>

        <Doc>
          <Intro>
            These FAQs and Terms &amp; Conditions (&quot;Terms&quot;) apply to the Vita Malt &quot;Vitalize Your
            Game&quot; promotion conducted by St. Vincent Brewery Ltd. (&quot;SVBL&quot; or &quot;the Promoter&quot;). By
            entering, you agree to these Terms.
          </Intro>

          <Section id="promoter">
            <h3>1. Promoter</h3>
            <p>
              The &quot;Vitalize Your Game&quot; Promotion (&quot;Promotion&quot;) is conducted by St. Vincent Brewery
              Ltd. (&quot;SVBL&quot; or &quot;the Promoter&quot;).
            </p>
          </Section>

          <Section id="eligibility">
            <h3>2. Eligibility</h3>
            <p>
              The Promotion is open to persons residing in Saint Vincent and the Grenadines who are 18 years of age or
              older at the time of entry. Employees of the Promoter, its affiliates, advertising and promotion agencies,
              their immediate family members, and persons living in the same household are not eligible.
            </p>
          </Section>

          <Section id="promotion-period">
            <h3>3. Promotion Period</h3>
            <p>
              The Promotion starts on September 18, 2026 and ends on November 20, 2026. Entries submitted outside this
              period will not be accepted.
            </p>
          </Section>

          <Section id="participating-products">
            <h3>4. Participating Products</h3>
            <p>
              Only specially marked crowns on Vita Malt Ginger, Classic, Ginseng and Coconut Hibiscus are included. Other
              Vita Malt products are not eligible.
            </p>
          </Section>

          <Section id="how-to-enter">
            <h3>5. How to Enter</h3>
            <p>
              Purchase a participating Vita Malt and check under the crown. An Instant Win crown may be redeemed at the
              St. Vincent Brewery Ltd. office. A promotional code must be submitted on the official promotion website with
              the entrant&apos;s full name, phone number and confirmation that the entrant is 18 years or older. Email may
              be provided where requested but is optional unless otherwise stated on the entry form.
            </p>
          </Section>

          <Section id="entry-rules">
            <h3>6. Entry Rules</h3>
            <p>
              There is no limit to the number of valid codes an entrant may submit during the Promotion Period. Every four
              (4) valid codes equal one (1) entry into both the Grand Prize and Secondary Prize draws. Each code may only
              be used once. Duplicate, invalid or previously used codes will be rejected.
            </p>
          </Section>

          <Section id="code-verification">
            <h3>7. Code and Entry Verification</h3>
            <p>
              The Promoter may verify any code or entry. The Promoter may reject or disqualify entries that are
              fraudulent, improperly obtained, altered, duplicated, generated or submitted using automated methods, or
              otherwise do not comply with these Terms. The Promoter may request reasonable proof to confirm the validity
              of an entry or a winner&apos;s eligibility.
            </p>
          </Section>

          <Section id="selection-contact">
            <h3>8. Selection and Contact of Winners</h3>
            <p>
              After the Promotion closes, Grand Prize and Secondary Prize winners will be selected by electronic random
              draw from all valid draw entries. Winners will be contacted using the information provided at entry. The
              Promoter will make at least three (3) attempts over five (5) business days. If a winner cannot be reached,
              does not meet the eligibility requirements, or fails required verification, an alternate winner may be
              selected.
            </p>
          </Section>

          <Section id="prizes">
            <h3>9. Prizes</h3>
            <p>
              Instant Win prizes include Vita Malt 4-Packs, Vita Malt-branded merchandise, mobile phone credit, Amazon
              Gift Cards and Apple AirPods. There will be two (2) Secondary Prize winners and one (1) Grand Prize winner.
              The Grand Prize is an 85-inch Television, PlayStation 5 Pro, Surround Sound System and Entertainment TV
              Stand. Prizes are non-transferable and cannot be exchanged for cash unless the Promoter states otherwise. If
              a prize becomes unavailable for reasons outside the Promoter&apos;s reasonable control, the Promoter may
              substitute a prize of equal or greater value.
            </p>
          </Section>

          <Section id="prize-claims">
            <h3>10. Prize Claims</h3>
            <p>
              Instant Win prizes must be claimed using the original winning crown, valid government-issued ID and any
              other reasonable verification requested by the Promoter. Grand Prize and Secondary Prize winners must
              collect their prizes at the St. Vincent Brewery Ltd. office in Campden Park with valid government-issued ID
              within thirty (30) calendar days of notification. Prizes not collected within the required period may be
              forfeited. Winners are responsible for any taxes or statutory charges associated with their prize.
            </p>
          </Section>

          <Section id="keeping-crowns">
            <h3>11. Keeping Promotional Crowns</h3>
            <p>Please keep all promotional crowns until the Promotion and prize draws are complete.</p>
            <p>Instant Win crowns must be presented when collecting your prize.</p>
            <p>
              Crowns with promotional codes should also be kept, as you may be asked to present them to verify your
              entries if you are selected as a winner.
            </p>
            <p>
              <strong className="important">Important:</strong> Failure to present a qualifying crown when requested may
              result in the related entry being disqualified.
            </p>
          </Section>

          <Section id="publicity">
            <h3>12. Publicity</h3>
            <p>
              Winners may be asked to take part in reasonable publicity related to the Promotion, including photographs,
              video and prize-presentation content. Any use of a winner&apos;s name or likeness will be subject to
              applicable law and any consent required.
            </p>
          </Section>

          <Section id="technical-liability">
            <h3>14. Technical Issues and Liability</h3>
            <p>
              To the extent permitted by law, the Promoter is not responsible for lost, late, misdirected, incomplete or
              damaged entries, or for technical failures outside its reasonable control that affect participation in the
              Promotion. Nothing in these Terms excludes any liability that cannot legally be excluded.
            </p>
          </Section>

          <Section id="modification">
            <h3>15. Modification or Termination</h3>
            <p>
              The Promoter may modify, suspend or end the Promotion where unforeseen circumstances, fraud, technical
              problems or other events outside its reasonable control affect the fairness, security or integrity of the
              Promotion. Any material change will be communicated through appropriate campaign channels, subject to
              applicable law.
            </p>
          </Section>

          <Section id="governing-law">
            <h3>16. Governing Law</h3>
            <p>The Promotion and these Terms are governed by the laws of Saint Vincent and the Grenadines.</p>
          </Section>

          <Section id="contact">
            <h3>17. Contact</h3>
            <p>
              For questions about entries, code validation or prize claims, contact Campaign Support:{" "}
              <a href="mailto:drinkvitamalt@gmail.com">drinkvitamalt@gmail.com</a>
            </p>
          </Section>

          <Updated>Last updated: 12 August 2026</Updated>
        </Doc>
      </Shell>
    </PageBody>
  </Layout>
);

export default Terms;
