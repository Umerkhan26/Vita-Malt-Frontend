import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
`;

const Btn = styled.button`
  width: 100%;
  margin-top: 14px;
  padding: 14px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: white;
  font-weight: 800;
  cursor: pointer;
  min-height: 48px;
`;

const Hint = styled.p`
  margin-top: 10px;
  color: ${COLORS.muted};
  font-size: 0.84rem;
`;

const Warn = styled.p`
  color: ${COLORS.red};
  font-weight: 700;
  line-height: 1.5;
`;

/** Legacy token-link page — prefer Sign in → Forgot password (OTP flow). */
const ResetPassword: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const modal = useAuthModal();
  const token = useMemo(() => params.get("token") || "", [params]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Use Forgot password to get a reset code.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await apiService.resetPassword({ token, password });
      toast.success("Password updated.");
      setPassword("");
      setConfirm("");
      modal.open("signin");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHero kicker="Account" title="Set a new password" lead="Complete your password reset below." />
      <Wrap>
        <Card>
          {!token ? (
            <Warn>
              Password reset now uses an email code. Open Sign in → Forgot password.
            </Warn>
          ) : (
            <form onSubmit={onSubmit}>
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
        </Card>
      </Wrap>
    </Layout>
  );
};

export default ResetPassword;
