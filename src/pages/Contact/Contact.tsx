import { useState } from "react";
import styled from "styled-components";
import { FaEnvelope, FaIdCard, FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { PageHero } from "../../components/PageHero/PageHero";
import Reveal from "../../components/Reveal/Reveal";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";
import { apiService } from "../../services/api";

const Wrap = styled.div`
  ${contentWidth}
  ${contentPadX}
  padding-top: 28px;
  padding-bottom: 64px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding-top: 20px;
    padding-bottom: 48px;
  }
`;

const Info = styled.div`
  h2 {
    font-size: clamp(1.35rem, 3vw, 1.6rem);
    letter-spacing: -0.02em;
    margin-bottom: 10px;
    color: ${COLORS.redDeep};
  }

  > p {
    color: ${COLORS.muted};
    line-height: 1.6;
    margin-bottom: 20px;
    font-size: 1rem;
  }
`;

const TopicList = styled.ul`
  list-style: none;
  margin: 0 0 24px;
  padding: 0;
  display: grid;
  gap: 10px;
`;

const Topic = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-left: 3px solid ${COLORS.gold};
  line-height: 1.45;
  color: ${COLORS.ink};
  font-size: 0.95rem;
  transition: transform 0.22s ease, box-shadow 0.22s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateX(4px);
      box-shadow: 0 8px 20px rgba(0, 56, 32, 0.08);
    }
  }

  svg {
    color: ${COLORS.red};
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const MetaNote = styled.p`
  font-size: 0.88rem;
  color: ${COLORS.muted};
  line-height: 1.55;
  padding-top: 16px;
  border-top: 1px solid ${COLORS.line};
`;

const FormCard = styled.form`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  border-radius: 4px;
  border-top: 4px solid ${COLORS.gold};
  padding: 24px;
  box-shadow: 0 14px 36px rgba(0, 56, 32, 0.08);
  transition: box-shadow 0.25s ease;

  &:focus-within {
    box-shadow: 0 18px 44px rgba(0, 56, 32, 0.14);
  }

  @media (max-width: 640px) {
    padding: 20px 18px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
`;

const FormLead = styled.p`
  color: ${COLORS.muted};
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 0.84rem;
  margin: 14px 0 6px;
  color: ${COLORS.ink};
`;

const Input = styled.input`
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.paper};
  font-size: 16px;
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    box-shadow: 0 0 0 3px rgba(0, 107, 63, 0.12);
  }
`;

const Area = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.paper};
  font-family: inherit;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    box-shadow: 0 0 0 3px rgba(0, 107, 63, 0.12);
  }

  @media (max-width: 640px) {
    min-height: 120px;
  }
`;

const Btn = styled.button`
  width: 100%;
  margin-top: 18px;
  padding: 14px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  min-height: 48px;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: ${COLORS.redDark};
  }

  &:active {
    transform: scale(0.99);
  }
`;

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.contact({ name, email, phone, message });
      toast.success("Message sent — support will get back to you.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send");
    }
  };

  return (
    <Layout>
      <PageHero
        kicker="Support"
        title="Contact us"
        lead="Questions about codes, entries, or prize redemption? Send a message and SVBL support will follow up."
      />
      <Wrap>
        <Reveal variant="left">
          <Info>
            <h2>How we can help</h2>
            <p>
              Use this form for campaign support. For instant-win redemption, visit the SVBL office with your crown and
              photo ID — that cannot be handled by email.
            </p>
            <TopicList>
              <Topic>
                <FaQuestionCircle /> Code not accepting or already used
              </Topic>
              <Topic>
                <FaIdCard /> Entry count looks wrong on My Entries
              </Topic>
              <Topic>
                <FaEnvelope /> Account or password help
              </Topic>
              <Topic>
                <FaQuestionCircle /> Winner verification questions
              </Topic>
            </TopicList>
            <MetaNote>
              Campaign Support:{" "}
              <a href="mailto:drinkvitamalt@gmail.com" style={{ color: COLORS.red, fontWeight: 800 }}>
                drinkvitamalt@gmail.com
              </a>
              <br />
              Must be 18+ and reside in Saint Vincent and the Grenadines. Campaign: Sep 18 – Nov 20, 2026.
            </MetaNote>
          </Info>
        </Reveal>
        <Reveal variant="right" delay={120}>
          <FormCard onSubmit={onSubmit}>
            <FormTitle>Send a message</FormTitle>
            <FormLead>
              We typically respond during business hours. Include your phone if you entered as a guest.
            </FormLead>
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
            <Label htmlFor="contact-phone">Phone</Label>
            <Input
              id="contact-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Optional — helps match your entries"
            />
            <Label htmlFor="contact-message">Message</Label>
            <Area
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              required
            />
            <Btn type="submit">Send message</Btn>
          </FormCard>
        </Reveal>
      </Wrap>
    </Layout>
  );
};

export default Contact;
