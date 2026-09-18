import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { COLORS } from "../constants/colors";
import { apiService } from "../services/api";
import { trackEvent } from "../utils/analytics";
import PasswordInput from "./PasswordInput/PasswordInput";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(29, 15, 8, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 2100;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 16px;
  padding-top: calc(72px + 16px);
  padding-bottom: max(16px, env(safe-area-inset-bottom));

  @media (max-width: 900px) {
    padding-top: calc(56px + 12px);
  }

  @media (max-width: 640px) {
    padding-top: calc(54px + 10px);
  }
`;

const Card = styled.div`
  background: ${COLORS.white};
  max-width: 420px;
  width: 100%;
  border-radius: 16px;
  padding: 24px;

  @media (max-width: 640px) {
    padding: 20px 16px;
    border-radius: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${COLORS.line};
  font-size: 16px;
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 380px) {
    flex-direction: column;
  }
`;

const Btn = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  min-height: 48px;
  background: ${({ $primary }) => ($primary ? COLORS.red : COLORS.line)};
  color: ${({ $primary }) => ($primary ? COLORS.white : COLORS.ink)};

  &:disabled {
    cursor: wait;
    opacity: 0.8;
  }
`;

interface Props {
  entrantId: string;
  accountSetupToken?: string;
  defaultEmail?: string;
  onClose: () => void;
}

const OptionalAccountModal: React.FC<Props> = ({
  entrantId,
  accountSetupToken,
  defaultEmail = "",
  onClose,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pinEnter = () => {
      document
        .getElementById("enter")
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    };
    pinEnter();
    const frame = window.requestAnimationFrame(pinEnter);
    const later = window.setTimeout(pinEnter, 200);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(later);
    };
  }, []);

  const skip = () => {
    trackEvent("optional_account_skip");
    onClose();
  };

  const submit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const result = (await apiService.optionalRegister({
        entrantId,
        email,
        password,
        accountSetupToken,
      })) as { emailSent?: boolean; devOtp?: string };
      setPassword("");
      setConfirmPassword("");
      setStep("otp");
      if (result.devOtp) {
        setDevOtp(result.devOtp);
        setOtp(result.devOtp);
        toast.info("Email SMTP not configured — use the code shown below.");
      } else {
        toast.success("Check your email for a verification code.");
      }
      trackEvent("optional_account_accept");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not create account",
      );
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setLoading(true);
    try {
      await apiService.verifyOtp(email, otp);
      toast.success(
        "Account verified. You can log in next time with just your code.",
      );
      setEmail("");
      setOtp("");
      setDevOtp("");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <Overlay>
      <Card>
        <h3>Create an account? Optional.</h3>
        <p style={{ margin: "8px 0 16px", color: COLORS.muted }}>
          Next time you only need to enter your code. You can skip and keep
          using your name + phone.
        </p>
        {step === "form" ? (
          <>
            <label>Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <label>Password</label>
            <PasswordInput
              wrapStyle={{ marginTop: 8, marginBottom: 12 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <label>Confirm password</label>
            <PasswordInput
              wrapStyle={{ marginTop: 8, marginBottom: 12 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Row>
              <Btn onClick={skip}>Skip</Btn>
              <Btn $primary disabled={loading} onClick={submit}>
                Create account
              </Btn>
            </Row>
          </>
        ) : (
          <>
            {devOtp && (
              <p
                style={{
                  marginBottom: 10,
                  color: COLORS.red,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textAlign: "center",
                }}
              >
                {devOtp}
              </p>
            )}
            <label>Verification code</label>
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Row>
              <Btn onClick={skip}>Later</Btn>
              <Btn $primary disabled={loading} onClick={verify}>
                {loading ? "Verifying…" : "Verify"}
              </Btn>
            </Row>
          </>
        )}
      </Card>
    </Overlay>,
    document.body,
  );
};

export default OptionalAccountModal;
