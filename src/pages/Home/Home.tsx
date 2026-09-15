import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import OptionalAccountModal from "../../components/OptionalAccountModal";
import Reveal from "../../components/Reveal/Reveal";
import { apiService } from "../../services/api";
import { RootState } from "../../redux/store";
import { trackEvent } from "../../utils/analytics";
import hero from "../../assets/vita-malt-hero-banner.jpg";
import howEnterBg from "../../assets/Howtoenterbg.jpg";
import stepIconCart from "../../assets/icon1-clear.png";
import stepIconCrown from "../../assets/icon2-clear.png";
import stepIconTicket from "../../assets/icon3-clear.png";
import stepIconUpload from "../../assets/icon4-clear.png";
import howWorksBg from "../../assets/how-works-bg.jpg";
import howWorksPurchase from "../../assets/how-works-purchase.webp";
import howWorksUncap from "../../assets/how-works-uncap.webp";
import howWorksRegister from "../../assets/how-works-register.webp";
import wetBottles from "../../assets/vita-malt-wet-bottles.webp";
import {
  Hero,
  HeroImage,
  HeroShade,
  HeroContent,
  HeroTop,
  HeroBottom,
  Kicker,
  HeroActions,
  GoldBtn,
  GhostBtn,
  DateBar,
  DateInner,
  Section,
  PrizeSection,
  SectionInner,
  SectionHead,
  HowEnterSection,
  HowEnterInner,
  HowEnterStage,
  HowEnterHead,
  HowEnterGrid,
  HowEnterCard,
  HowEnterIcon,
  HowWorksSection,
  HowWorksInner,
  HowWorksHead,
  HowWorksGrid,
  HowWorksCard,
  HowWorksIcon,
  PrizeGrid,
  PrizeCard,
  EnterWrap,
  EnterCopy,
  EnterProductArt,
  EnterCard,
  Label,
  Input,
  CodeList,
  CodeRow,
  CodeNumber,
  CodeToolbar,
  CodeStepper,
  StepperButton,
  StepperValue,
  CodeCounter,
  Check,
  Submit,
  Progress,
  SplitBand,
  SplitInner,
  SplitBandTitle,
  SplitBandSubTitle,
  SplitBandLead,
  WhiteBtn,
  FaqList,
  FaqItem,
  MoreLink,
  LegalBand,
  LegalNote,
} from "./Home.styles";

const Home: React.FC = () => {
  const auth = useSelector((s: RootState) => s.auth);
  const [codes, setCodes] = useState([""]);
  const [fullName, setFullName] = useState(auth.username || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [isOver18, setIsOver18] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    message: string;
    validCodeCount: number;
    drawEntryCount: number;
    progressTowardNextEntry: number;
    codesUntilNextEntry: number;
    promptCreateAccount: boolean;
    accountSetupToken?: string;
    entrant: { _id: string; email?: string };
  } | null>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState<{ current: number; total: number } | null>(null);

  const filledCodeCount = codes.filter((value) => value.trim()).length;

  const updateCode = (index: number, value: string) => {
    setCodes((current) => current.map((code, codeIndex) => (codeIndex === index ? value.toUpperCase() : code)));
  };

  const increaseCodeCount = () => setCodes((current) => [...current, ""]);

  const decreaseCodeCount = () => {
    setCodes((current) => (current.length === 1 ? current : current.slice(0, -1)));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submittedCodes = codes.map((value) => value.trim().toUpperCase()).filter(Boolean);
    if (!submittedCodes.length) {
      toast.error("Enter at least one crown code");
      return;
    }
    if (new Set(submittedCodes).size !== submittedCodes.length) {
      toast.error("Remove duplicate codes before submitting");
      return;
    }

    setLoading(true);
    trackEvent("submit_start", { codeCount: submittedCodes.length });
    const failedCodes: { code: string; message: string }[] = [];
    let acceptedCount = 0;
    let latestData: NonNullable<typeof result> | null = null;

    for (let index = 0; index < submittedCodes.length; index += 1) {
      const submittedCode = submittedCodes[index];
      setSubmissionProgress({ current: index + 1, total: submittedCodes.length });
      const payload: Record<string, unknown> = { code: submittedCode };
      if (!auth.isLoggedIn) {
        payload.fullName = fullName;
        payload.phone = phone;
        payload.email = email || undefined;
        payload.dateOfBirth = dob || undefined;
        payload.isOver18 = isOver18;
      }

      try {
        const data = (await apiService.submitCode(payload)) as NonNullable<typeof result>;
        latestData = data;
        acceptedCount += 1;
      } catch (error) {
        failedCodes.push({
          code: submittedCode,
          message: error instanceof Error ? error.message : "Submission failed",
        });
      }
    }

    if (latestData) {
      setResult(latestData);
      setCodes(failedCodes.length ? failedCodes.map(({ code }) => code) : [""]);
      if (!auth.isLoggedIn) {
        if (!failedCodes.length) {
          setFullName("");
          setPhone("");
          setEmail("");
          setDob("");
          setIsOver18(false);
        }
      }
      trackEvent("submit_success", {
        codeCount: acceptedCount,
        createdDrawEntry: (latestData as { createdDrawEntry?: boolean }).createdDrawEntry,
      });
      if (latestData.promptCreateAccount) setShowAccount(true);
    }

    if (!failedCodes.length) {
      toast.success(`${acceptedCount} code${acceptedCount === 1 ? "" : "s"} accepted`);
    } else if (acceptedCount) {
      toast.warning(
        `${acceptedCount} accepted, ${failedCodes.length} failed. Failed codes remain in the form.`
      );
    } else {
      trackEvent("submit_fail");
      toast.error(
        failedCodes.length === 1
          ? failedCodes[0].message
          : `All ${failedCodes.length} codes failed. Please review and try again.`
      );
    }

    setSubmissionProgress(null);
    setLoading(false);
  };

  return (
    <Layout>
      <Hero>
        <HeroImage src={hero} alt="Vitalize Your Game — Win the ultimate entertainment package" />
        <HeroShade />
        <HeroContent>
          <HeroTop>
            <Kicker>Sep 18 – Nov 20, 2026</Kicker>
          </HeroTop>
          <HeroBottom>
            <HeroActions>
              <GoldBtn href="#enter">Submit your code</GoldBtn>
              <GhostBtn href="#how-to-enter">See how to enter</GhostBtn>
            </HeroActions>
          </HeroBottom>
        </HeroContent>
      </Hero>

      <Reveal variant="up" delay={60}>
        <DateBar>
          <DateInner>
            <div>
              <strong>Campaign window</strong>
              September 18 – November 20, 2026
            </div>
            <div>
              <strong>Winner draw</strong>
              Within 14 days after campaign close
            </div>
            <div>
              <strong>Eligibility</strong>
              18+ · Saint Vincent and the Grenadines
            </div>
          </DateInner>
        </DateBar>
      </Reveal>

      <HowEnterSection
        id="how-to-enter"
        style={{ backgroundImage: `url(${howEnterBg})` }}
      >
        <HowEnterInner>
          <HowEnterStage>
            <Reveal>
              <HowEnterHead>
                <h2>
                  <span className="how">How to </span>
                  <span className="enter">enter</span>
                </h2>
                <p>Three steps from shelf to draw entry — submit one code or several codes together.</p>
              </HowEnterHead>
            </Reveal>
            <HowEnterGrid>
              <Reveal delay={0}>
                <HowEnterCard>
                  <span className="badge">01</span>
                  <h3>Buy Vita Malt</h3>
                  <p>
                    Pick up participating Ginger, Classic, Ginseng, or Coconut Hibiscus during the promotion period.
                  </p>
                  <HowEnterIcon>
                    <img className="cart" src={stepIconCart} alt="" aria-hidden />
                  </HowEnterIcon>
                </HowEnterCard>
              </Reveal>
              <Reveal delay={100}>
                <HowEnterCard>
                  <span className="badge">02</span>
                  <h3>Check under the crown</h3>
                  <p>Find either an Instant Win prize or a promotional alphanumeric code.</p>
                  <HowEnterIcon>
                    <img className="crown" src={stepIconCrown} alt="" aria-hidden />
                  </HowEnterIcon>
                </HowEnterCard>
              </Reveal>
              <Reveal delay={200}>
                <HowEnterCard>
                  <span className="badge">03</span>
                  <h3>Upload 4 codes for the Grand Prize</h3>
                  <p>
                    Every 4 valid codes = 1 draw entry. Codes can be entered separately — no need to submit all four at
                    once.
                  </p>
                  <HowEnterIcon>
                    <img className="ticket" src={stepIconTicket} alt="" aria-hidden />
                    <img className="upload" src={stepIconUpload} alt="" aria-hidden />
                  </HowEnterIcon>
                </HowEnterCard>
              </Reveal>
            </HowEnterGrid>
          </HowEnterStage>
        </HowEnterInner>
      </HowEnterSection>

      <HowWorksSection id="how-it-works" style={{ backgroundImage: `url(${howWorksBg})` }}>
        <HowWorksInner>
          <Reveal>
            <HowWorksHead>
              <h2>How it works</h2>
              <p>Built for quick entry after a store purchase — from phone, no friction.</p>
            </HowWorksHead>
          </Reveal>
          <HowWorksGrid>
            <Reveal delay={0}>
              <HowWorksCard>
                <span className="step">01</span>
                <h3>Purchase</h3>
                <p>Buy participating Vita Malt at any supermarket, shop, or retailer during the promotion period.</p>
                <HowWorksIcon $kind="purchase">
                  <img src={howWorksPurchase} alt="" aria-hidden />
                </HowWorksIcon>
              </HowWorksCard>
            </Reveal>
            <Reveal delay={110}>
              <HowWorksCard>
                <span className="step">02</span>
                <h3>Uncap &amp; scan</h3>
                <p>Check under the crown for a promotional code or an Instant Win.</p>
                <HowWorksIcon $kind="uncap">
                  <img src={howWorksUncap} alt="" aria-hidden />
                </HowWorksIcon>
              </HowWorksCard>
            </Reveal>
            <Reveal delay={220}>
              <HowWorksCard>
                <span className="step">03</span>
                <h3>Register your entries</h3>
                <ul>
                  <li>Complete registration with name and contact details.</li>
                  <li>Upload codes on this website for registration and submission.</li>
                </ul>
                <HowWorksIcon $kind="register">
                  <img src={howWorksRegister} alt="" aria-hidden />
                </HowWorksIcon>
              </HowWorksCard>
            </Reveal>
          </HowWorksGrid>
        </HowWorksInner>
      </HowWorksSection>

      <Section id="enter" $tone="blush">
        <SectionInner>
          <EnterWrap>
            <Reveal variant="left">
              <EnterCopy>
                <h2>Submit your crown code</h2>
                <p>
                  First-time entry asks for your full name, phone, optional email, date of birth, and 18+ confirmation.
                  Name + phone keep your entries together — no login required.
                </p>
                <p>
                  After a successful first code you can optionally create a password so next time you only enter the
                  code. Skipping is fully supported.
                </p>
                <p>Codes are single-use and checked instantly against the official master list.</p>
                <EnterProductArt>
                  <img
                    src={wetBottles}
                    alt="Vita Malt Classic, Ginger, Ginseng, and Coconut and Hibiscus bottles"
                  />
                </EnterProductArt>
              </EnterCopy>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <EnterCard onSubmit={onSubmit}>
                <Label htmlFor="code-1">Crown codes</Label>
                <CodeToolbar>
                  <span>How many codes?</span>
                  <CodeStepper aria-label="Number of crown codes">
                    <StepperButton
                      type="button"
                      onClick={decreaseCodeCount}
                      disabled={codes.length === 1}
                      aria-label="Remove one code field"
                    >
                      −
                    </StepperButton>
                    <StepperValue aria-live="polite">{codes.length}</StepperValue>
                    <StepperButton type="button" onClick={increaseCodeCount} aria-label="Add one code field">
                      +
                    </StepperButton>
                  </CodeStepper>
                  <CodeCounter>
                    {filledCodeCount} of {codes.length} filled
                  </CodeCounter>
                </CodeToolbar>
                <CodeList>
                  {codes.map((code, index) => (
                    <CodeRow key={index}>
                      <CodeNumber aria-hidden>{index + 1}</CodeNumber>
                      <Input
                        id={`code-${index + 1}`}
                        value={code}
                        onChange={(e) => updateCode(index, e.target.value)}
                        placeholder="Type your code"
                        autoCapitalize="characters"
                        required={index === 0}
                      />
                    </CodeRow>
                  ))}
                </CodeList>
                {!auth.isLoggedIn && (
                  <>
                    <Label>Full name</Label>
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <Label>Phone</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <Label>Email (optional)</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Label>Date of birth</Label>
                    <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                    <Check>
                      <input type="checkbox" checked={isOver18} onChange={(e) => setIsOver18(e.target.checked)} />
                      I confirm I am 18 or older and agree to the Terms & Conditions.
                    </Check>
                  </>
                )}
                <Submit type="submit" disabled={loading}>
                  {submissionProgress
                    ? `Submitting ${submissionProgress.current} of ${submissionProgress.total}…`
                    : `Submit ${filledCodeCount || ""} code${filledCodeCount === 1 ? "" : "s"}`.replace("  ", " ")}
                </Submit>
                {result && (
                  <Progress>
                    {result.message}
                    <br />
                    Valid codes: {result.validCodeCount} · Draw entries: {result.drawEntryCount} · Progress:{" "}
                    {result.progressTowardNextEntry}/4
                    {result.codesUntilNextEntry > 0 ? ` · ${result.codesUntilNextEntry} more to your next entry` : ""}
                  </Progress>
                )}
              </EnterCard>
            </Reveal>
          </EnterWrap>
        </SectionInner>
      </Section>

      <PrizeSection id="prizes">
        <SectionInner>
          <Reveal>
            <SectionHead $light>
              <h2>Prizes worth showing up for</h2>
              <p>
                Instant wins are redeemed in person at SVBL. Grand and secondary prizes are drawn electronically after
                the campaign closes.
              </p>
            </SectionHead>
          </Reveal>
          <PrizeGrid>
            <Reveal delay={0} variant="up">
              <PrizeCard $featured>
                <small>Grand prize · 1 winner</small>
                <h3>Ultimate entertainment package</h3>
                <ul>
                  <li>85&quot; smart TV</li>
                  <li>PS5 Pro</li>
                  <li>Surround sound system</li>
                  <li>Entertainment TV stand</li>
                </ul>
              </PrizeCard>
            </Reveal>
            <Reveal delay={140} variant="up">
              <PrizeCard>
                <small>Secondary · 2 winners</small>
                <h3>Play + sip all year</h3>
                <ul>
                  <li>One (1) year’s supply of Vita Malt — two (2) cases per month for 12 months</li>
                  <li>One (1) Nintendo Switch</li>
                </ul>
              </PrizeCard>
            </Reveal>
            <Reveal delay={240} variant="up">
              <PrizeCard>
                <small>Instant win · under the crown</small>
                <h3>Redeem in person</h3>
                <ul>
                  <li>Vita Malt 4-packs</li>
                  <li>Vita Malt merch</li>
                  <li>Mobile phone credit</li>
                  <li>Amazon gift cards</li>
                  <li>Apple AirPods</li>
                </ul>
              </PrizeCard>
            </Reveal>
          </PrizeGrid>
        </SectionInner>
      </PrizeSection>

      <SplitBand>
        <SplitInner>
          <Reveal variant="left">
            <div>
              <SplitBandTitle>Found an instant win?</SplitBandTitle>
              <SplitBandLead>
                Do not enter it on the website. Bring the winning crown and a valid photo ID to the SVBL head office.
                Instant win winners may be featured on the winners page after prize handover.
              </SplitBandLead>
              <WhiteBtn href="/instant-win">How to redeem</WhiteBtn>
            </div>
          </Reveal>
          <Reveal variant="right" delay={140}>
            <div>
              <SplitBandSubTitle>Track your entries</SplitBandSubTitle>
              <SplitBandLead>
                Signed-in users see a dashboard automatically. Guests can look up submitted codes and entry counts with
                name + phone, or email.
              </SplitBandLead>
              <WhiteBtn href="/dashboard">View my entries</WhiteBtn>
            </div>
          </Reveal>
        </SplitInner>
      </SplitBand>

      <Section $tone="soft">
        <SectionInner>
          <Reveal>
            <SectionHead>
              <h2>Quick answers</h2>
              <p>Everything you need before you type a code.</p>
            </SectionHead>
          </Reveal>
          <FaqList>
            <Reveal delay={0}>
              <FaqItem>
                <summary>Do I need an account?</summary>
                <p>
                  Not for your first entry. You can submit your first promotional code without an account. After that,
                  you will need to create an account to submit more codes and track your entries.
                </p>
              </FaqItem>
            </Reveal>
            <Reveal delay={100}>
              <FaqItem>
                <summary>How do draw entries work?</summary>
                <p>
                  Every four (4) valid codes = one (1) entry into both the Grand Prize draw and the Secondary Prize draw.
                </p>
              </FaqItem>
            </Reveal>
            <Reveal delay={180}>
              <FaqItem>
                <summary>Can a code be reused?</summary>
                <p>No. Each promotional code can only be used once. Duplicate codes will be rejected.</p>
              </FaqItem>
            </Reveal>
          </FaqList>
          <Reveal delay={220}>
            <MoreLink href="/faq">Read the full FAQ →</MoreLink>
          </Reveal>
        </SectionInner>
      </Section>

      <Reveal variant="fade">
        <LegalBand>
          <LegalNote>
            Must be 18+ and reside in Saint Vincent and the Grenadines. Employees of SVBL, affiliates, agencies, their
            immediate family, and household members are not eligible. Keep promotional crowns until draws are complete.
            Instant Win crowns must be presented at Campden Park. Registrant data is used only to verify entries, contact
            winners, and arrange prizes. See full Terms &amp; Conditions for details.
          </LegalNote>
        </LegalBand>
      </Reveal>

      {showAccount && result && (
        <OptionalAccountModal
          entrantId={result.entrant._id}
          accountSetupToken={result.accountSetupToken}
          defaultEmail={result.entrant.email || email}
          onClose={() => setShowAccount(false)}
        />
      )}
    </Layout>
  );
};

export default Home;
