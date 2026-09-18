import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { COLORS } from "../../constants/colors";
import { apiService } from "../../services/api";
import { login } from "../../redux/slices/auth";
import { useAuthModal } from "../../context/AuthModalContext";
import { trackEvent } from "../../utils/analytics";
import PasswordInput from "../PasswordInput/PasswordInput";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(20, 8, 10, 0.72);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  padding-top: max(14px, env(safe-area-inset-top));
  padding-bottom: max(14px, env(safe-area-inset-bottom));

  @media (max-width: 640px) {
    align-items: flex-start;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const Card = styled.div`
  width: min(460px, 100%);
  max-height: 92vh;
  overflow: auto;
  background: ${COLORS.white};
  border-radius: 18px;
  padding: 24px 20px 20px;
  position: relative;

  @media (max-width: 640px) {
    max-height: none;
    border-radius: 14px;
    padding: 20px 16px 16px;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${COLORS.paper};
  cursor: pointer;
  color: ${COLORS.ink};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 6px;
`;

const Sub = styled.p`
  color: ${COLORS.muted};
  margin-bottom: 16px;
  font-size: 0.92rem;
  line-height: 1.45;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 0.84rem;
  margin: 10px 0 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${COLORS.line};
  border-radius: 12px;
  font-size: 16px;
  background: ${COLORS.paper};
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
`;

const Check = styled.label`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin: 14px 0;
  font-size: 0.88rem;
  color: ${COLORS.ink};
  cursor: pointer;
  padding: 4px 0;

  input {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

const Submit = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 14px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  cursor: pointer;
  min-height: 48px;
  font-size: 1rem;

  &:disabled {
    cursor: wait;
    opacity: 0.8;
  }
`;

const Switch = styled.button`
  display: block;
  width: 100%;
  margin-top: 14px;
  color: ${COLORS.red};
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  min-height: 44px;
  padding: 10px 0;
`;

const RowBetween = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 4px 0 2px;
`;

const LinkBtn = styled.button`
  color: ${COLORS.red};
  font-weight: 700;
  font-size: 0.84rem;
  cursor: pointer;
  min-height: 40px;
  padding: 8px 4px;
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

const Hint = styled.p`
  margin-top: 10px;
  color: ${COLORS.muted};
  font-size: 0.8rem;
  line-height: 1.4;
`;

const AuthModal: React.FC = () => {
  const { isOpen, close, mode, setMode } = useAuthModal();
  const dispatch = useDispatch();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [isOver18, setIsOver18] = useState(false);
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotDevOtp, setForgotDevOtp] = useState("");
  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "password">("email");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetForgotState = () => {
    setForgotStep("email");
    setForgotOtp("");
    setForgotDevOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const clearAuthFields = () => {
    setIdentifier("");
    setPassword("");
    setSignupConfirm("");
    setFullName("");
    setPhone("");
    setEmail("");
    setDob("");
    setIsOver18(false);
    setOtp("");
    setDevOtp("");
    setForgotEmail("");
    setStep("form");
    resetForgotState();
  };

  const handleClose = () => {
    clearAuthFields();
    close();
  };

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = (await apiService.login(identifier, password)) as {
        token: string;
        user: { _id: string; fullName: string; role: string };
      };
      dispatch(login({ token: data.token, userId: data.user._id, username: data.user.fullName, role: data.user.role }));
      trackEvent("login");
      toast.success("Welcome back");
      clearAuthFields();
      close();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== signupConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const result = (await apiService.register({
        fullName,
        phone,
        email,
        dateOfBirth: dob,
        isOver18,
        password,
      })) as { emailSent?: boolean; devOtp?: string };
      setPassword("");
      setSignupConfirm("");
      setFullName("");
      setPhone("");
      setDob("");
      setIsOver18(false);
      setStep("otp");
      if (result.devOtp) {
        setDevOtp(result.devOtp);
        setOtp(result.devOtp);
        toast.info("Email SMTP not configured — use the code shown below.");
      } else {
        setDevOtp("");
        toast.success("Check your email for a verification code.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.verifyOtp(email, otp);
      toast.success("Account verified. Sign in to continue.");
      setMode("signin");
      setIdentifier(email);
      setPassword("");
      setOtp("");
      setDevOtp("");
      setEmail("");
      setStep("form");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const onForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setForgotDevOtp("");
    try {
      const result = (await apiService.forgotPassword(forgotEmail.trim())) as {
        message?: string;
        emailSent?: boolean;
        devOtp?: string;
      };
      setForgotStep("otp");
      if (result.devOtp) {
        setForgotDevOtp(result.devOtp);
        setForgotOtp(result.devOtp);
        toast.info("SMTP issue — use the code shown below.");
      } else {
        toast.success(result.message || "Check your email for a 6-digit code.");
      }
      trackEvent("forgot_password");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const onForgotVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.verifyResetOtp(forgotEmail.trim(), forgotOtp.trim());
      toast.success("Code verified. Set your new password.");
      setForgotStep("password");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const onForgotResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await apiService.resetPassword({
        email: forgotEmail.trim(),
        otp: forgotOtp.trim(),
        password: newPassword,
      });
      toast.success("Password updated. Sign in with your new password.");
      setMode("signin");
      setIdentifier(forgotEmail.trim());
      setPassword("");
      setForgotEmail("");
      resetForgotState();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={handleClose}>
      <Card onClick={(e) => e.stopPropagation()}>
        <Close onClick={handleClose} aria-label="Close">
          <FaTimes />
        </Close>

        {mode === "forgot" ? (
          <>
            {forgotStep === "email" && (
              <>
                <Title>Forgot password</Title>
                <Sub>Enter your account email. We&apos;ll send a 6-digit reset code.</Sub>
                <form onSubmit={onForgotEmail}>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    autoComplete="email"
                  />
                  <Submit type="submit" disabled={loading}>
                    {loading ? "Sending…" : "Send code"}
                  </Submit>
                </form>
              </>
            )}

            {forgotStep === "otp" && (
              <>
                <Title>Enter reset code</Title>
                <Sub>
                  {forgotDevOtp
                    ? "Email delivery failed — use the code shown below."
                    : `We sent a 6-digit code to ${forgotEmail}.`}
                </Sub>
                {forgotDevOtp && <DevOtp>{forgotDevOtp}</DevOtp>}
                <form onSubmit={onForgotVerifyOtp}>
                  <Label>Reset code</Label>
                  <Input
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    placeholder="6-digit code"
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                  />
                  <Submit type="submit" disabled={loading}>
                    {loading ? "Checking…" : "Verify code"}
                  </Submit>
                </form>
                <Switch type="button" onClick={() => setForgotStep("email")} disabled={loading}>
                  Resend / change email
                </Switch>
              </>
            )}

            {forgotStep === "password" && (
              <>
                <Title>Set new password</Title>
                <Sub>Choose a strong password, then sign in again.</Sub>
                <form onSubmit={onForgotResetPassword}>
                  <Label>New password</Label>
                  <PasswordInput
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <Hint>8+ characters with a letter, number, and special character.</Hint>
                  <Label>Confirm password</Label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <Submit type="submit" disabled={loading}>
                    {loading ? "Updating…" : "Update password"}
                  </Submit>
                </form>
              </>
            )}

            <Switch
              type="button"
              onClick={() => {
                setMode("signin");
                resetForgotState();
              }}
            >
              Back to sign in
            </Switch>
          </>
        ) : mode === "signin" ? (
          <>
            <Title>Sign in</Title>
            <Sub>Returning entrants can sign in and submit codes faster.</Sub>
            <form onSubmit={onSignIn}>
              <Label>Email or phone</Label>
              <Input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoComplete="username"
              />
              <Label>Password</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <RowBetween>
                <LinkBtn
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setForgotEmail(identifier.includes("@") ? identifier : "");
                    resetForgotState();
                  }}
                >
                  Forgot password?
                </LinkBtn>
              </RowBetween>
              <Submit type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Submit>
            </form>
            <Switch
              type="button"
              onClick={() => {
                setMode("signup");
                setStep("form");
              }}
            >
              New here? Create an account
            </Switch>
          </>
        ) : step === "otp" ? (
          <>
            <Title>Verify email</Title>
            <Sub>
              {devOtp
                ? "SMTP is not set on the server yet, so your code is shown here for testing."
                : `We sent a 6-digit code to ${email}.`}
            </Sub>
            {devOtp && <DevOtp>{devOtp}</DevOtp>}
            <form onSubmit={onVerify}>
              <Label>Verification code</Label>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <Submit type="submit" disabled={loading}>
                {loading ? "Verifying…" : "Verify"}
              </Submit>
            </form>
          </>
        ) : (
          <>
            <Title>Sign up</Title>
            <Sub>Optional — you can also enter codes as a guest with name + phone.</Sub>
            <form onSubmit={onSignUp}>
              <Label>Full name</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Label>Date of birth</Label>
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
              <Label>Password</Label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Hint>8+ characters with a letter, number, and special character.</Hint>
              <Label>Confirm password</Label>
              <PasswordInput
                value={signupConfirm}
                onChange={(e) => setSignupConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <Check>
                <input type="checkbox" checked={isOver18} onChange={(e) => setIsOver18(e.target.checked)} />
                I am 18+ and agree to the Terms & Conditions.
              </Check>
              <Submit type="submit" disabled={loading}>
                {loading ? "Creating…" : "Create account"}
              </Submit>
            </form>
            <Switch type="button" onClick={() => setMode("signin")}>
              Already have an account? Sign in
            </Switch>
          </>
        )}
      </Card>
    </Overlay>
  );
};

export default AuthModal;
