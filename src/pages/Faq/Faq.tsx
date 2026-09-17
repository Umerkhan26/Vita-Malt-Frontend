import styled from "styled-components";
import type { ReactNode } from "react";
import Layout from "../../components/Layout/Layout";
import { PageHero, PageBody } from "../../components/PageHero/PageHero";
import Reveal from "../../components/Reveal/Reveal";
import { COLORS } from "../../constants/colors";

const Intro = styled.p`
  max-width: 720px;
  color: ${COLORS.muted};
  line-height: 1.65;
  font-size: 1.02rem;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    font-size: 0.92rem;
    margin-bottom: 16px;
    line-height: 1.55;
  }
`;

const Flavours = styled.ul`
  margin: 0 0 24px 1.15rem;
  color: ${COLORS.muted};
  line-height: 1.55;
  font-size: 0.98rem;

  li + li {
    margin-top: 4px;
  }
`;

const List = styled.div`
  display: grid;
  gap: 10px;
`;

const Item = styled.details`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-left: 4px solid ${COLORS.gold};
  padding: 16px 18px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.22s ease;

  &[open] {
    border-color: ${COLORS.line};
    border-left-color: ${COLORS.red};
    box-shadow: 0 8px 24px rgba(0, 56, 32, 0.08);
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 56, 32, 0.07);
    }
  }

  summary {
    font-weight: 800;
    cursor: pointer;
    line-height: 1.4;
    color: ${COLORS.ink};
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    min-height: 44px;
    padding: 2px 0;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: "+";
      flex-shrink: 0;
      color: ${COLORS.gold};
      font-weight: 800;
    }
  }

  &[open] summary::after {
    content: "−";
  }

  .body {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid ${COLORS.line};
    color: ${COLORS.muted};
    line-height: 1.65;
    font-size: 0.98rem;
  }

  .body p {
    margin-bottom: 10px;
  }

  .body p:last-child {
    margin-bottom: 0;
  }

  .body ul,
  .body ol {
    margin: 0 0 10px 1.15rem;
  }

  .body li + li {
    margin-top: 4px;
  }

  .body table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 4px;
    font-size: 0.92rem;
  }

  .body th,
  .body td {
    border: 1px solid ${COLORS.line};
    padding: 8px 10px;
    text-align: left;
  }

  .body th {
    background: ${COLORS.paper};
    color: ${COLORS.redDeep};
    font-weight: 800;
  }

  .body strong.important {
    color: ${COLORS.redDeep};
  }

  @media (max-width: 640px) {
    padding: 14px 14px;

    summary {
      font-size: 0.92rem;
      line-height: 1.35;
    }

    .body {
      font-size: 0.88rem;
      line-height: 1.55;
    }
  }
`;

const Support = styled.p`
  margin-top: 28px;
  padding: 16px 18px;
  background: ${COLORS.paper};
  border-radius: 4px;
  border-left: 4px solid ${COLORS.red};
  color: ${COLORS.muted};
  line-height: 1.55;

  a {
    color: ${COLORS.red};
    font-weight: 800;
  }
`;

/** Official copy — Vitalize_Your_Game_Revised_FAQ_TC- v2 (Section A) */
const faqs: { q: string; body: ReactNode }[] = [
  {
    q: "1. How do I enter?",
    body: (
      <>
        <p>Buy a participating Vita Malt and check under the crown.</p>
        <p>
          If the crown shows an Instant Win prize, keep the crown and redeem the
          prize at the St. Vincent Brewery Ltd. office in Campden Park.
        </p>
        <p>
          If the crown shows a promotional code, enter the code on the official
          promotion website.
        </p>
      </>
    ),
  },
  {
    q: "2. Which Vita Malt flavours are included?",
    body: <p> Classic. Other Vita Malt products are not included.</p>,
  },
  {
    q: "3. Do I need to create an account to participate?",
    body: (
      <p>
        Not for your first entry. You can submit your first promotional code
        without an account. After that, you will need to create an account to
        submit more codes and track your entries.
      </p>
    ),
  },
  {
    q: "4. What information do I need to enter a code?",
    body: (
      <ul>
        <li>Full legal name</li>
        <li>Phone number</li>
        <li>Email address (optional)</li>
        <li>Confirmation that you are 18 years or older</li>
        <li>Your promotional code</li>
      </ul>
    ),
  },
  {
    q: "5. How many codes can I enter?",
    body: (
      <p>
        There is no limit to the number of valid promotional codes you may
        submit during the Promotion Period.
      </p>
    ),
  },
  {
    q: "6. How do I earn entries for the prize draws?",
    body: (
      <>
        <p>
          Every four (4) valid codes = one (1) entry into both the Grand Prize
          draw and the Secondary Prize draw.
        </p>
        <table>
          <thead>
            <tr>
              <th>Valid Codes</th>
              <th>Draw Entries</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td>1</td>
            </tr>
            <tr>
              <td>8</td>
              <td>2</td>
            </tr>
            <tr>
              <td>20</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    q: "7. Can I use the same code more than once?",
    body: (
      <p>
        No. Each promotional code can only be used once. Duplicate codes will be
        rejected.
      </p>
    ),
  },
  {
    q: "8. How can I check my entries?",
    body: (
      <p>
        Entrants may view their submitted codes, total valid codes, and total
        draw entries by logging into their online account, or by searching using
        their full name together with their phone number or email address.
      </p>
    ),
  },
  {
    q: "9. What can I win?",
    body: (
      <>
        <p>
          <strong>Instant Win Prizes</strong>
        </p>
        <ul>
          <li>Vita Malt 4-Packs</li>
          <li>Vita Malt-branded merchandise</li>
          <li>Mobile phone credit</li>
          <li>Amazon Gift Cards</li>
          <li>Apple AirPods</li>
        </ul>
        <p>
          <strong>Secondary Prizes — two (2) winners</strong>
        </p>
        <p>Each Secondary Prize winner will receive:</p>
        <ul>
          <li>
            One (1) year’s supply of Vita Malt — two (2) cases per month for 12
            months
          </li>
          <li>One (1) Nintendo Switch</li>
        </ul>
        <p>
          <strong>Grand Prize — one (1) winner</strong>
        </p>
        <ul>
          <li>85-inch Smart Television</li>
          <li>PlayStation 5 Pro</li>
          <li>Entertainment TV Stand</li>
        </ul>
      </>
    ),
  },
  {
    q: "10. How do I claim an Instant Win prize?",
    body: (
      <p>
        Bring the winning crown and a valid government-issued ID to the St.
        Vincent Brewery Ltd. office in Campden Park. Instant Win prizes must be
        claimed by the redemption deadline stated by the Promoter.
      </p>
    ),
  },
  {
    q: "11. When will the draw take place and winners be announced?",
    body: (
      <p>
        The Grand Prize and Secondary Prize draws will take place within 14 days
        after the Promotion ends. Winners will be announced on the official
        campaign website, SVBL&apos;s official social media pages and/or
        selected media outlets.
      </p>
    ),
  },
  {
    q: "12. How will winners be contacted?",
    body: (
      <p>
        Winners may be contacted by phone or email using the details submitted
        with their entry. The Promoter will make at least three (3) attempts to
        contact a winner over two (2) business days. If the winner cannot be
        reached within that period, an alternate winner may be selected.
      </p>
    ),
  },
  {
    q: "13. Where do Grand Prize and Secondary Prize winners collect their prizes?",
    body: (
      <p>
        Prizes must be collected in person at the St. Vincent Brewery Ltd.
        office in Campden Park. Winners must present valid government-issued ID
        and collect their prize within fourteen (14) calendar days of
        notification. Unclaimed prizes may be forfeited and an alternate winner
        may be selected.
      </p>
    ),
  },
  {
    q: "14. Who can enter?",
    body: (
      <>
        <p>You must:</p>
        <ul>
          <li>Be 18 years or older at the time of entry</li>
          <li>Reside in Saint Vincent and the Grenadines</li>
          <li>Meet all other requirements in these Terms</li>
        </ul>
      </>
    ),
  },
  {
    q: "15. What if my code is rejected?",
    body: (
      <p>
        Check that the code was entered correctly. A code may also be rejected
        if it has already been used or is not in the promotional database. If
        you believe there is an error, contact Campaign Support.
      </p>
    ),
  },
  {
    q: "16. Do I need to keep my crowns?",
    body: (
      <>
        <p>
          Yes. Please keep all promotional crowns until the Promotion and prize
          draws are complete.
        </p>
        <p>Instant Win crowns must be presented when collecting your prize.</p>
        <p>
          Crowns with promotional codes should also be kept, as you may be asked
          to present them to verify your entries if you are selected as a
          winner.
        </p>
        <p>
          <strong className="important">Important:</strong> Failure to present a
          qualifying crown when requested may result in the related entry being
          disqualified.
        </p>
      </>
    ),
  },
  {
    q: "17. How is my personal information used?",
    body: (
      <p>
        Your personal information will only be used to verify your entries,
        contact you if you win, and arrange your prize. Your information will be
        kept secure.
      </p>
    ),
  },
  {
    q: "18. Who do I contact for help?",
    body: (
      <p>
        Campaign Support:{" "}
        <a
          href="mailto:drinkvitamalt@gmail.com"
          style={{ color: COLORS.red, fontWeight: 800 }}
        >
          drinkvitamalt@gmail.com
        </a>
      </p>
    ),
  },
];

const Faq: React.FC = () => (
  <Layout>
    <PageHero
      kicker="Vitalize Your Game"
      title="Frequently asked questions"
      lead="Official Promotion FAQs — St. Vincent Brewery Ltd."
    />
    <PageBody>
      <Reveal>
        <Intro>
          These FAQs and Terms &amp; Conditions (&quot;Terms&quot;) apply to the
          Vita Malt &quot;Vitalize Your Game&quot; promotion conducted by St.
          Vincent Brewery Ltd. (&quot;SVBL&quot; or &quot;the Promoter&quot;).
          By entering, you agree to these Terms.
        </Intro>
      </Reveal>
      <Reveal delay={60}>
        <Intro style={{ marginBottom: 8, fontWeight: 700, color: COLORS.ink }}>
          Participating Vita Malt flavours:
        </Intro>
      </Reveal>
      <Reveal delay={100}>
        <Flavours>
          {/* <li>Ginger</li> */}
          <li>Classic</li>
          {/* <li>Ginseng</li> */}
          {/* <li>Coconut Hibiscus</li> */}
        </Flavours>
      </Reveal>
      <Reveal delay={120}>
        <Intro style={{ marginTop: -8 }}>
          Only specially marked crowns on these flavours are included in the
          Promotion.
        </Intro>
      </Reveal>
      <List>
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={Math.min(i * 35, 180)}>
            <Item>
              <summary>{item.q}</summary>
              <div className="body">{item.body}</div>
            </Item>
          </Reveal>
        ))}
      </List>
      <Reveal>
        <Support>
          Campaign Support:{" "}
          <a href="mailto:drinkvitamalt@gmail.com">drinkvitamalt@gmail.com</a>
        </Support>
      </Reveal>
    </PageBody>
  </Layout>
);

export default Faq;
