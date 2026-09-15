import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { PageHero, PageBody } from "../../components/PageHero/PageHero";
import { COLORS } from "../../constants/colors";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Doc = styled.article`
  animation: ${fadeUp} 0.45s ease both;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-top: 4px solid ${COLORS.gold};
  padding: 28px 24px;
  box-shadow: 0 12px 32px rgba(0, 56, 32, 0.06);

  @media (max-width: 640px) {
    padding: 18px 14px;
  }
`;

const Section = styled.section`
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${COLORS.line};

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    color: ${COLORS.redDeep};
    margin-bottom: 10px;

    @media (max-width: 640px) {
      font-size: 1.02rem;
    }
  }

  p {
    color: ${COLORS.muted};
    line-height: 1.65;
    margin-bottom: 10px;
    font-size: 0.98rem;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 640px) {
      font-size: 0.9rem;
      line-height: 1.55;
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
`;

const ContactLink = styled(Link)`
  color: ${COLORS.red};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${COLORS.redDark};
  }
`;

/**
 * Privacy page content from official FAQ/T&C personal-information wording
 * (Vitalize_Your_Game_Revised_FAQ_TC- v2).
 */
const Privacy: React.FC = () => (
  <Layout>
    <PageHero
      kicker="Legal"
      title="Privacy"
      lead="How we use personal information for Vitalize Your Game."
    />
    <PageBody>
      <Doc>
        <Section>
          <h3>How your information is used</h3>
          <p>
            Your personal information will only be used to verify your entries, contact you if you win, and arrange your
            prize. Your information will be kept secure.
          </p>
        </Section>

        <Section>
          <h3>What we collect when you enter</h3>
          <p>When you submit a promotional code, we may collect:</p>
          <ul>
            <li>Full legal name</li>
            <li>Phone number</li>
            <li>Email address (optional)</li>
            <li>Confirmation that you are 18 years or older</li>
            <li>Your promotional code</li>
          </ul>
        </Section>

        <Section>
          <h3>Who runs the promotion</h3>
          <p>
            The &quot;Vitalize Your Game&quot; Promotion is conducted by St. Vincent Brewery Ltd. (&quot;SVBL&quot; or
            &quot;the Promoter&quot;).
          </p>
        </Section>

        <Section>
          <h3>Questions</h3>
          <p>
            For questions about entries, code validation or prize claims, contact Campaign Support:{" "}
            <a href="mailto:drinkvitamalt@gmail.com">drinkvitamalt@gmail.com</a>
            . You can also use the <ContactLink to="/contact">Contact page</ContactLink>.
          </p>
          <p>
            See the full <ContactLink to="/terms">Terms &amp; Conditions</ContactLink> and{" "}
            <ContactLink to="/faq">FAQs</ContactLink> for complete promotion rules.
          </p>
        </Section>
      </Doc>
    </PageBody>
  </Layout>
);

export default Privacy;
