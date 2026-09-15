import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft, FaTicketAlt, FaUser, FaSignOutAlt, FaBars, FaHome } from "react-icons/fa";
import { apiService } from "../../services/api";
import { COLORS } from "../../constants/colors";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/auth";
import * as S from "./AdminDashboard.styles";

const Back = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 7px 11px;
  border-radius: 8px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.white};
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;

  &:hover {
    border-color: ${COLORS.red};
    color: ${COLORS.red};
  }
`;

const Meta = styled.p`
  color: ${COLORS.muted};
  margin-bottom: 10px;
  font-size: 0.85rem;
`;

const EntrantDetail: React.FC = () => {
  const { entrantId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((s: RootState) => s.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!auth.isLoggedIn || auth.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!entrantId) return;
    apiService.adminEntrant(entrantId).then((res) => setData(res as Record<string, unknown>));
  }, [entrantId]);

  const entrant = (data?.entrant || {}) as Record<string, unknown>;
  const codes = (data?.codes || []) as Record<string, unknown>[];
  const entries = (data?.entries || []) as Record<string, unknown>[];

  return (
    <S.Shell>
      <S.MobileToggle type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
        <FaBars />
      </S.MobileToggle>
      <S.Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <S.Sidebar $open={menuOpen}>
        <S.SidebarHeader>
          <span>Vitalize Your Game</span>
          <strong>Admin Panel</strong>
        </S.SidebarHeader>
        <S.SidebarMenu>
          <S.MenuItem $active onClick={() => navigate("/admin/dashboard")}>
            <FaUser /> User detail
          </S.MenuItem>
          <S.MenuItem
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            <FaArrowLeft /> Back to users
          </S.MenuItem>
        </S.SidebarMenu>
        <S.SidebarFooter>
          <S.LogoutBtn type="button" onClick={() => navigate("/")}>
            <FaHome /> Back to site
          </S.LogoutBtn>
          <S.LogoutBtn
            type="button"
            onClick={() => {
              dispatch(logout());
              navigate("/", { replace: true });
            }}
          >
            <FaSignOutAlt /> Logout
          </S.LogoutBtn>
        </S.SidebarFooter>
      </S.Sidebar>

      <S.Main>
        <Back type="button" onClick={() => navigate("/admin/dashboard")}>
          <FaArrowLeft /> Back to All Users
        </Back>
        <S.PageHead>
          <div>
            <h1>{String(entrant.fullName || "User")}</h1>
            <p>Codes redeemed and draw entries for this campaign user.</p>
          </div>
        </S.PageHead>
        <Meta>
          {String(entrant.phone || "—")} · {String(entrant.email || "No email")} ·{" "}
          {entrant.hasAccount ? "Has account" : "Guest"} · {entrant.isActive ? "Active" : "Blocked"}
        </Meta>

        <S.KpiGrid>
          <S.Kpi>
            <span>Valid codes</span>
            <strong>{String(entrant.validCodeCount ?? codes.length)}</strong>
          </S.Kpi>
          <S.Kpi $accent={COLORS.gold}>
            <span>Draw entries</span>
            <strong>{String(entrant.drawEntryCount ?? entries.length)}</strong>
          </S.Kpi>
          <S.Kpi $accent={COLORS.success}>
            <span>Progress</span>
            <strong>{String(Number(entrant.validCodeCount || 0) % 4)}/4</strong>
          </S.Kpi>
          <S.Kpi $accent={COLORS.redDark}>
            <span>Status</span>
            <strong style={{ fontSize: "1.1rem" }}>{entrant.isActive ? "Active" : "Blocked"}</strong>
          </S.Kpi>
        </S.KpiGrid>

        <S.Panel>
          <h2>
            <FaTicketAlt style={{ marginRight: 8 }} /> Redeemed codes
          </h2>
          {codes.length === 0 ? (
            <S.Empty>
              <strong>No codes</strong>
            </S.Empty>
          ) : (
            <S.TableWrap>
              <S.Table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Status</th>
                    <th>Used</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((c) => (
                    <tr key={String(c._id)}>
                      <td>
                        <code>{String(c.code)}</code>
                      </td>
                      <td>
                        <S.Badge $tone={String(c.status) === "used" ? "ok" : "warn"}>{String(c.status)}</S.Badge>
                      </td>
                      <td>{c.usedAt ? new Date(String(c.usedAt)).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.TableWrap>
          )}
        </S.Panel>

        <S.Panel>
          <h2>
            <FaUser style={{ marginRight: 8 }} /> Draw entries
          </h2>
          {entries.length === 0 ? (
            <S.Empty>
              <strong>No draw entries yet</strong>
            </S.Empty>
          ) : (
            <S.TableWrap>
              <S.Table>
                <thead>
                  <tr>
                    <th>Entry ID</th>
                    <th>Winner</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e) => (
                    <tr key={String(e._id)}>
                      <td>
                        <code>…{String(e._id).slice(-8)}</code>
                      </td>
                      <td>
                        <S.Badge $tone={e.isWinner ? "ok" : "gold"}>
                          {e.isWinner ? String(e.prizeTier || "yes") : "in pool"}
                        </S.Badge>
                      </td>
                      <td>{e.createdAt ? new Date(String(e.createdAt)).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </S.Table>
            </S.TableWrap>
          )}
        </S.Panel>
      </S.Main>
    </S.Shell>
  );
};

export default EntrantDetail;
