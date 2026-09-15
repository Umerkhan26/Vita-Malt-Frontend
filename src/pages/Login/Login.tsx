import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { COLORS } from "../../constants/colors";
import { apiService } from "../../services/api";
import { login } from "../../redux/slices/auth";
import { trackEvent } from "../../utils/analytics";

const Wrap = styled.div`
  max-width: 440px;
  margin: 32px auto 48px;
  background: white;
  padding: 24px;
  border-radius: 16px;

  @media (max-width: 640px) {
    margin: 20px 14px 40px;
    padding: 18px 16px;
    border-radius: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0 14px;
  border-radius: 10px;
  border: 1px solid ${COLORS.line};
  font-size: 16px;
  min-height: 48px;
  -webkit-appearance: none;
  appearance: none;
`;

const Btn = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  cursor: pointer;
  min-height: 48px;
`;

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = (await apiService.login(identifier, password)) as {
        token: string;
        user: { _id: string; fullName: string; role: string };
      };
      dispatch(login({ token: data.token, userId: data.user._id, username: data.user.fullName, role: data.user.role }));
      trackEvent("login");
      toast.success("Welcome back");
      setIdentifier("");
      setPassword("");
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <Layout>
      <Wrap>
        <h1>Login</h1>
        <p style={{ color: COLORS.muted, margin: "8px 0 16px" }}>
          Optional accounts only. Guests can still enter codes and look up entries with name + phone.
        </p>
        <form onSubmit={onSubmit}>
          <label>Email or phone</label>
          <Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          <label>Password</label>
          <PasswordInput
            wrapStyle={{ margin: "8px 0 14px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <Btn type="submit">Sign in</Btn>
        </form>
        <p style={{ marginTop: 14 }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
      </Wrap>
    </Layout>
  );
};

export default Login;
