import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { PageHero } from "../../components/PageHero/PageHero";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";
import { apiService } from "../../services/api";
import { useAuthModal } from "../../context/AuthModalContext";

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

const Card = styled.div`
  max-width: 460px;
  margin: 0 auto;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.line};
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 12px 32px rgba(20, 20, 20, 0.05);

  @media (max-width: 640px) {
    padding: 18px 16px;
    border-radius: 14px;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 800;
  font-size: 0.8rem;
  margin: 10px 0 6px;
  color: ${COLORS.muted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.paper};
  font-size: 16px;
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
`;

const Btn = styled.button`
  width: 100%;
  margin-top: 14px;
  padding: 14px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  cursor: pointer;
  min-height: 48px;
`;

const Hint = styled.p`
  margin-top: 10px;
  color: ${COLORS.muted};
  font-size: 0.88rem;
  line-height: 1.5;
`;

const DevOtp = styled.div`
  margin: 12px 0;
  padding: 12px;
  border-radius: 12px;
  background: #fff1f2;
  border: 1px dashed ${COLORS.red};
  color: ${COLORS.redDark};
  font-weight: 800;
  letter-spacing: 0.18em;
  text-align: center;
  font-size: 1.35rem;
`;

const Switch = styled.button`
  display: block;
  width: 100%;
  margin-top: 14px;
  color: ${COLORS.red};
  font-weight: 700;
  cursor: pointer;
  text-align: center;
`;

const ForgotPassword: React.FC = () => {
  const modal = useAuthModal();
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDevOtp("");
    try {
      const result = (await apiService.forgotPassword(email.trim())) as { message?: string; devOtp?: string };
      setStep("otp");
      if (result.devOtp) {
        setDevOtp(result.devOtp);
        setOtp(result.devOtp);
        toast.info("Use the code shown below.");
      } else {
        toast.success(result.message || "Check your email for a code.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.verifyResetOtp(email.trim(), otp.trim());
      toast.success("Code verified.");
      setStep("password");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await apiService.resetPassword({ email: email.trim(), otp: otp.trim(), password });
      toast.success("Password updated. Sign in now.");
      setEmail("");
      setOtp("");
      setDevOtp("");
      setPassword("");
      setConfirm("");
      setStep("email");
      modal.open("signin");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHero
        kicker="Account"
        title="Forgot password"
        lead="We’ll email a 6-digit code, then you can set a new password."
      />
      <Wrap>
        <Card>
          {step === "email" && (
            <form onSubmit={sendCode}>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Btn type="submit" disabled={loading}>
                {loading ? "Sending…" : "Send code"}
              </Btn>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyCode}>
              <Hint>Code sent to {email}</Hint>
              {devOtp && <DevOtp>{devOtp}</DevOtp>}
              <Label>Reset code</Label>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} required inputMode="numeric" />
              <Btn type="submit" disabled={loading}>
                {loading ? "Checking…" : "Verify code"}
              </Btn>
              <Switch type="button" onClick={() => setStep("email")}>
                Change email / resend
              </Switch>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={updatePassword}>
              <Label>New password</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Hint>8+ characters with a letter, number, and special character.</Hint>
              <Label>Confirm password</Label>
              <PasswordInput
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Btn type="submit" disabled={loading}>
                {loading ? "Updating…" : "Update password"}
              </Btn>
            </form>
          )}

          <Switch type="button" onClick={() => modal.open("signin")}>
            Back to sign in
          </Switch>
        </Card>
      </Wrap>
    </Layout>
  );
};

export default ForgotPassword;
