import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaTicketAlt, FaCheckCircle, FaTrophy, FaSearch } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import { PageHero } from "../../components/PageHero/PageHero";
import Reveal from "../../components/Reveal/Reveal";
import { apiService } from "../../services/api";
import { RootState } from "../../redux/store";
import { trackEvent } from "../../utils/analytics";
import * as S from "./Dashboard.styles";

interface DashboardData {
  fullName: string;
  validCodeCount: number;
  drawEntryCount: number;
  progressTowardNextEntry: number;
  codes: { code: string; usedAt?: string }[];
  entries: { id: string; submittedAt: string; isWinner: boolean; prizeTier?: string }[];
}

const Dashboard: React.FC = () => {
  const auth = useSelector((s: RootState) => s.auth);
  const [data, setData] = useState<DashboardData | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const loadLoggedIn = async () => {
    try {
      setBusy(true);
      const result = (await apiService.dashboard()) as DashboardData;
      setData(result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load dashboard");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn && auth.role !== "admin") loadLoggedIn();
  }, [auth.isLoggedIn, auth.role]);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBusy(true);
      const result = (await apiService.lookupEntries(
        email.trim() ? { email: email.trim() } : { fullName: fullName.trim(), phone: phone.trim() }
      )) as DashboardData;
      setData(result);
      setFullName("");
      setPhone("");
      setEmail("");
      trackEvent("dashboard_lookup");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No entries found");
    } finally {
      setBusy(false);
    }
  };

  const progressPct = data ? Math.min(100, (data.progressTowardNextEntry / 4) * 100) : 0;
  const codesToNext = data ? Math.max(0, 4 - data.progressTowardNextEntry) : 4;

  return (
    <Layout>
      <PageHero
        kicker="My entries"
        title="Your campaign dashboard"
        lead="Track submitted codes, entries accumulated, and progress toward the next entry. Guests can look up with name + phone or email."
      />
      <S.Page>
        <S.Wrap>
          {!auth.isLoggedIn && !data && (
            <Reveal>
              <S.LookupCard>
                <h2>Look up your entries</h2>
                <p className="lead">
                  Use the same details you entered when submitting codes. No account required.
                </p>
                <form onSubmit={lookup}>
                  <S.Label>Full name</S.Label>
                  <S.Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="As on your entry"
                    autoComplete="name"
                  />
                  <S.Label>Phone</S.Label>
                  <S.Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1…"
                    autoComplete="tel"
                  />
                  <S.Or>or email</S.Or>
                  <S.Label>Email</S.Label>
                  <S.Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                  <S.Btn type="submit" disabled={busy}>
                    <FaSearch style={{ marginRight: 8 }} />
                    {busy ? "Searching…" : "Find my entries"}
                  </S.Btn>
                </form>
              </S.LookupCard>
            </Reveal>
          )}

          {data && (
            <Reveal>
              <>
              <S.HeroCard>
                <h2>{data.fullName}</h2>
                <p className="sub">
                  {auth.isLoggedIn ? "Signed-in dashboard" : "Guest lookup"} · Every 4 validated codes = 1 entry
                </p>
                <S.Stats>
                  <S.Stat>
                    <strong>{data.validCodeCount}</strong>
                    <span>Valid codes</span>
                  </S.Stat>
                  <S.Stat>
                    <strong>{data.drawEntryCount}</strong>
                    <span>Entries</span>
                  </S.Stat>
                  <S.Stat>
                    <strong>
                      {data.progressTowardNextEntry}/4
                    </strong>
                    <span>Next entry</span>
                  </S.Stat>
                </S.Stats>
                <S.ProgressWrap>
                  <div className="label">
                    <span>Progress to next entry</span>
                    <span>
                      {codesToNext === 0 ? "Ready — next code unlocks another entry" : `${codesToNext} more code${codesToNext === 1 ? "" : "s"}`}
                    </span>
                  </div>
                  <S.ProgressBar>
                    <i style={{ width: `${progressPct}%` }} />
                  </S.ProgressBar>
                </S.ProgressWrap>
                <S.CtaStrip>
                  <S.LinkBtn as={Link} to="/#enter">
                    Submit another code
                  </S.LinkBtn>
                  {!auth.isLoggedIn && (
                    <S.LinkGhost type="button" onClick={() => setData(null)}>
                      Look up someone else
                    </S.LinkGhost>
                  )}
                </S.CtaStrip>
              </S.HeroCard>

              <S.Grid>
                <S.Card>
                  <h3>
                    <FaCheckCircle /> Submitted codes
                  </h3>
                  <p className="hint">Successfully redeemed alphanumeric crowns</p>
                  {data.codes.length === 0 ? (
                    <S.Empty>
                      <strong>No codes yet</strong>
                      Enter a code on the homepage to get started.
                    </S.Empty>
                  ) : (
                    <S.List>
                      {data.codes.map((c) => (
                        <S.Row key={c.code + (c.usedAt || "")}>
                          <div className="icon">
                            <FaTicketAlt />
                          </div>
                          <div className="meta">
                            <strong>{c.code}</strong>
                            <span>{c.usedAt ? new Date(c.usedAt).toLocaleString() : "Redeemed"}</span>
                          </div>
                          <span className="tag">Valid</span>
                        </S.Row>
                      ))}
                    </S.List>
                  )}
                </S.Card>

                <S.Card>
                  <h3>
                    <FaTrophy /> Entries
                  </h3>
                  <p className="hint">Entries in the Grand Prize and Secondary Prize draws</p>
                  {data.entries.length === 0 ? (
                    <S.Empty>
                      <strong>No entries yet</strong>
                      Submit 4 validated codes to earn your first entry.
                    </S.Empty>
                  ) : (
                    <S.List>
                      {data.entries.map((entry, idx) => (
                        <S.Row key={entry.id}>
                          <div className="icon">
                            <FaTicketAlt />
                          </div>
                          <div className="meta">
                            <strong>Entry #{idx + 1} · …{entry.id.slice(-6)}</strong>
                            <span>{new Date(entry.submittedAt).toLocaleDateString()}</span>
                          </div>
                          {entry.isWinner ? (
                            <span className="tag win">Winner · {entry.prizeTier}</span>
                          ) : (
                            <span className="tag">In pool</span>
                          )}
                        </S.Row>
                      ))}
                    </S.List>
                  )}
                </S.Card>
              </S.Grid>
            </>
            </Reveal>
          )}

          {auth.isLoggedIn && !data && busy && (
            <S.Empty>
              <strong>Loading your entries…</strong>
            </S.Empty>
          )}
        </S.Wrap>
      </S.Page>
    </Layout>
  );
};

export default Dashboard;
