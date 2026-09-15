import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { COLORS } from "../../constants/colors";
import { apiService } from "../../services/api";
import { login } from "../../redux/slices/auth";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import logo from "../../assets/vita-malt-logo.png";

const shimmer = keyframes`
  0% { transform: translateX(-20%) rotate(8deg); opacity: 0.35; }
  50% { opacity: 0.55; }
  100% { transform: translateX(20%) rotate(8deg); opacity: 0.35; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 90% at 100% 10%, rgba(243, 112, 33, 0.3), transparent 55%),
    radial-gradient(ellipse 60% 70% at 0% 100%, rgba(0, 0, 0, 0.28), transparent 50%),
    linear-gradient(125deg, ${COLORS.redDeep} 0%, ${COLORS.redDark} 42%, ${COLORS.red} 100%);
  padding: 24px 16px;
`;

const Pattern = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.55) 1px, transparent 0);
  background-size: 18px 18px;
`;

const Glow = styled.div`
  pointer-events: none;
  position: absolute;
  top: -40%;
  right: -10%;
  width: 55%;
  height: 180%;
  background: linear-gradient(90deg, transparent, rgba(246, 213, 107, 0.16), transparent);
  animation: ${shimmer} 8s ease-in-out infinite;
`;

const Card = styled.form`
  position: relative;
  z-index: 1;
  width: min(420px, 100%);
  background: ${COLORS.white};
  padding: 32px 28px 28px;
  border-radius: 22px;
  border: 2px solid ${COLORS.gold};
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  animation: ${fadeUp} 0.5s ease both;

  @media (max-width: 480px) {
    padding: 26px 20px 22px;
  }
`;

const Logo = styled.img`
  display: block;
  height: 52px;
  width: auto;
  margin: 0 auto 16px;
`;

const Kicker = styled.p`
  text-align: center;
  display: inline-block;
  width: 100%;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.68rem;
  color: ${COLORS.red};
  margin-bottom: 6px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: ${COLORS.redDeep};
  margin-bottom: 6px;
`;

const Lead = styled.p`
  text-align: center;
  color: ${COLORS.muted};
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 22px;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 0.84rem;
  margin: 12px 0 6px;
  color: ${COLORS.ink};
`;

const Input = styled.input`
  width: 100%;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.paper};
  font-size: 1rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.gold};
    box-shadow: 0 0 0 3px rgba(232, 185, 35, 0.25);
  }
`;

const Btn = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  border-radius: 12px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: ${COLORS.redDark};
  }

  &:active {
    transform: scale(0.99);
  }
`;

const Footnote = styled.p`
  text-align: center;
  margin-top: 16px;
  font-size: 0.78rem;
  color: ${COLORS.muted};
  line-height: 1.45;
`;

function AdminLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = (await apiService.adminLogin(identifier, password)) as {
        token: string;
        user: { _id: string; fullName: string; role: string };
      };
      dispatch(
        login({
          token: data.token,
          userId: data.user._id,
          username: data.user.fullName,
          role: data.user.role,
        })
      );
      setIdentifier("");
      setPassword("");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Admin login failed");
    }
  };

  return (
    <Wrap>
      <Pattern />
      <Glow />
      <Card onSubmit={onSubmit}>
        <Logo src={logo} alt="Vita Malt" />
        <Kicker>Staff only</Kicker>
        <Title>SVBL Admin</Title>
        <Lead>Campaign management — authorized personnel only.</Lead>
        <Label htmlFor="admin-email">Email</Label>
        <Input
          id="admin-email"
          type="email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
          required
        />
        <Label htmlFor="admin-password">Password</Label>
        <PasswordInput
          id="admin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <Btn type="submit">Sign in</Btn>
        <Footnote>Unauthorized access is prohibited. All activity is logged.</Footnote>
      </Card>
    </Wrap>
  );
}

export default AdminLogin;
