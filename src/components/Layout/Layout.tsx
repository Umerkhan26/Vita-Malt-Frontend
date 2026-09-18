import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { COLORS } from "../../constants/colors";
import { contentWidth, contentPadX } from "../../constants/layout";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/auth";
import {
  AuthModalProvider,
  useAuthModal,
} from "../../context/AuthModalContext";
import AuthModal from "../AuthModal/AuthModal";
import { PageEnter } from "../Reveal/Reveal";
import logo from "../../assets/vita-malt-logo.png";

const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.line};
  box-shadow: 0 4px 24px rgba(0, 56, 32, 0.08);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${COLORS.redDeep},
      ${COLORS.gold},
      ${COLORS.red}
    );
  }
`;

const TopInner = styled.div`
  ${contentWidth}
  ${contentPadX}
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 900px) {
    height: 56px;
    padding-left: 22px;
    padding-right: 22px;
  }

  @media (max-width: 640px) {
    height: 54px;
  }

  @media (max-width: 480px) {
    padding-left: 18px;
    padding-right: 18px;
  }

  @media (max-width: 360px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;

  img {
    height: 52px;
    width: auto;
    max-width: 150px;
    object-fit: contain;
  }

  @media (min-width: 1536px) {
    img {
      height: 62px;
      max-width: 176px;
    }
  }

  @media (max-width: 900px) {
    img {
      height: 40px;
      max-width: 120px;
    }
  }
`;

const NavLinks = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 22px;
  flex: 1;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${COLORS.ink};
    font-size: 1.05rem;
    font-weight: 800;
    white-space: nowrap;
  }

  a:hover {
    color: ${COLORS.red};
  }

  a.active {
    color: ${COLORS.red};
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4px;
      height: 2px;
      border-radius: 999px;
      background: ${COLORS.gold};
    }
  }

  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? "flex" : "none")};
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background: ${COLORS.white};
    border-bottom: 1px solid ${COLORS.line};
    flex-direction: column;
    align-items: stretch;
    padding: 4px 12px 12px;
    gap: 0;
    z-index: 999;
    box-shadow: 0 10px 20px rgba(20, 20, 20, 0.08);
    max-height: min(70vh, 520px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    a {
      padding: 14px 10px;
      border-bottom: 1px solid ${COLORS.line};
      font-size: 0.95rem;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
  }

  @media (min-width: 1536px) {
    gap: 28px;

    a {
      font-size: 1.12rem;
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const Ghost = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: 1.5px solid ${COLORS.red};
  color: ${COLORS.red};
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  background: transparent;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: rgba(0, 107, 63, 0.08);
    transform: translateY(-1px);
  }
`;

const Primary = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background: ${COLORS.red};
  color: ${COLORS.white};
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${COLORS.redDark};
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0, 56, 32, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DesktopAuth = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileAuth = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 8px 4px;
    border-top: 1px solid ${COLORS.line};
    margin-top: 4px;

    button {
      width: 100%;
      justify-content: center;
      padding: 14px 14px;
      font-size: 0.95rem;
      min-height: 48px;
    }
  }
`;

const Welcome = styled.span`
  font-weight: 700;
  color: ${COLORS.ink};
  font-size: 0.95rem;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

const Burger = styled.button`
  display: none;
  color: ${COLORS.red};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 10px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: transparent;

  @media (max-width: 900px) {
    display: inline-flex;
  }
`;

const HeaderSpacer = styled.div`
  height: 72px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    height: 56px;
  }

  @media (max-width: 640px) {
    height: 54px;
  }
`;

const Page = styled.main`
  min-height: calc(100vh - 280px);
`;

const FooterWrap = styled.footer`
  position: relative;
  background:
    radial-gradient(
      ellipse 70% 60% at 100% 0%,
      rgba(243, 112, 33, 0.22),
      transparent 55%
    ),
    ${COLORS.redDeep};
  color: ${COLORS.white};
  padding-top: 52px;
  padding-bottom: max(24px, env(safe-area-inset-bottom));
  ${contentPadX}
  border-top: 3px solid ${COLORS.gold};

  @media (max-width: 640px) {
    padding-top: 36px;
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
`;

const FooterGrid = styled.div`
  ${contentWidth}
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 28px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 20px;

    > * {
      min-width: 0;
    }
  }
`;

const FooterLogo = styled.img`
  height: 72px;
  width: auto;
  background: ${COLORS.white};
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  @media (max-width: 520px) {
    height: 56px;
    padding: 6px 8px;
  }
`;

const FooterCol = styled.div`
  h4 {
    color: ${COLORS.gold};
    margin-bottom: 12px;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 800;
  }
  a,
  p {
    display: block;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    margin-bottom: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  a {
    padding: 10px 0;
    min-height: 40px;
  }
  a:hover {
    color: ${COLORS.gold};
  }
  p {
    margin-bottom: 8px;
  }

  @media (max-width: 520px) {
    a {
      font-size: 0.95rem;
      padding: 12px 0;
    }
  }
`;

const Copy = styled.div`
  ${contentWidth}
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;

  @media (max-width: 520px) {
    margin-top: 18px;
    font-size: 0.75rem;
    line-height: 1.45;
  }
`;

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modal = useAuthModal();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <TopBar>
        <TopInner>
          <LogoLink to="/" aria-label="Vita Malt home">
            <img src={logo} alt="Vita Malt Campaign 2026" />
          </LogoLink>

          <NavLinks $open={open} onClick={() => setOpen(false)}>
            <a href="/#enter">Enter</a>
            <a href="/#how-to-enter">How to enter</a>
            <a href="/#how-it-works">How it works</a>
            <NavLink to="/winners">Winners</NavLink>
            <NavLink to="/social">Social</NavLink>
            <NavLink to="/dashboard">My entries</NavLink>
            <MobileAuth onClick={(e) => e.stopPropagation()}>
              {auth.isLoggedIn ? (
                <>
                  {auth.role === "admin" ? (
                    <Ghost
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        navigate("/admin/dashboard");
                      }}
                    >
                      Admin panel
                    </Ghost>
                  ) : (
                    <Ghost
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        navigate("/dashboard");
                      }}
                    >
                      My entries
                    </Ghost>
                  )}
                  <Primary
                    type="button"
                    onClick={() => {
                      dispatch(logout());
                      setOpen(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </Primary>
                </>
              ) : (
                <>
                  <Ghost
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      modal.open("signin");
                    }}
                  >
                    Sign in
                  </Ghost>
                  <Primary
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      modal.open("signup");
                    }}
                  >
                    Sign up
                  </Primary>
                </>
              )}
            </MobileAuth>
          </NavLinks>

          <Right>
            <DesktopAuth>
              {auth.isLoggedIn ? (
                <>
                  <Welcome>Hi, {auth.username}</Welcome>
                  {auth.role === "admin" ? (
                    <Ghost
                      type="button"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Admin panel
                    </Ghost>
                  ) : (
                    <Ghost type="button" onClick={() => navigate("/dashboard")}>
                      My entries
                    </Ghost>
                  )}
                  <Primary
                    type="button"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    Logout
                  </Primary>
                </>
              ) : (
                <>
                  <Ghost type="button" onClick={() => modal.open("signin")}>
                    Sign in
                  </Ghost>
                  <Primary type="button" onClick={() => modal.open("signup")}>
                    Sign up
                  </Primary>
                </>
              )}
            </DesktopAuth>
            <Burger
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <FaTimes /> : <FaBars />}
            </Burger>
          </Right>
        </TopInner>
      </TopBar>
      <HeaderSpacer />

      <Page>
        {isAdminRoute ? (
          children
        ) : (
          <PageEnter key={location.pathname}>{children}</PageEnter>
        )}
      </Page>

      <FooterWrap>
        <FooterGrid>
          <FooterCol>
            <FooterLogo src={logo} alt="Vita Malt" />
            <p>
              Vitalize Your Game buy participating Vita Malt, check under the
              crown, and enter for Instant Wins plus the Ultimate Entertainment
              Package.
            </p>
            <p>
              Campaign: Sep 18 – Nov 20, 2026 · Support: drinkvitamalt@gmail.com
            </p>
          </FooterCol>
          <FooterCol>
            <h4>Enter</h4>
            <a href="/#enter">Submit a code</a>
            <a href="/#how-it-works">How it works</a>
            <Link to="/instant-win">Instant win redeem</Link>
            <Link to="/dashboard">Look up entries</Link>
          </FooterCol>
          <FooterCol>
            <h4>Campaign</h4>
            <Link to="/winners">Winners</Link>
            <Link to="/social">Social feed</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Support</Link>
          </FooterCol>
          <FooterCol>
            <h4>Legal</h4>
            <Link to="/terms">Terms & Conditions</Link>
            <p>18+ · Saint Vincent and the Grenadines residents only.</p>
          </FooterCol>
        </FooterGrid>
        <Copy>
          © 2026 St. Vincent Brewery Ltd. / Vita Malt Vitalize Your Game. All
          rights reserved.
        </Copy>
      </FooterWrap>
      <AuthModal />
    </>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthModalProvider>
    <Shell>{children}</Shell>
  </AuthModalProvider>
);

export default Layout;
