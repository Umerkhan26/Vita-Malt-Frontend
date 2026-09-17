import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUsers,
  FaTicketAlt,
  FaTrophy,
  FaDice,
  FaChartPie,
  FaDatabase,
  FaClipboardList,
  FaUpload,
  FaDownload,
  FaSignOutAlt,
  FaBars,
  FaEye,
  FaBan,
  FaTrash,
  FaCheckCircle,
  FaMedal,
  FaHome,
} from "react-icons/fa";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/slices/auth";
import { apiService } from "../../services/api";
import { COLORS } from "../../constants/colors";
import { parseCodesFromCsv } from "../../utils/parseCodesCsv";
import { detectSocialPlatform } from "../../utils/socialEmbed";
import * as S from "./AdminDashboard.styles";

type View =
  | "overview"
  | "users"
  | "leaderboard"
  | "submissions"
  | "entries"
  | "codes"
  | "flagged"
  | "winners"
  | "draw"
  | "social"
  | "contact"
  | "audit";

type Module = "overview" | "users" | "leaderboard" | "codes" | "activity" | "prizes" | "tools";

const MODULES: { id: Module; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <FaChartPie /> },
  { id: "users", label: "Users", icon: <FaUsers /> },
  { id: "leaderboard", label: "Leaderboard", icon: <FaMedal /> },
  { id: "codes", label: "Codes", icon: <FaDatabase /> },
  { id: "activity", label: "Activity", icon: <FaClipboardList /> },
  { id: "prizes", label: "Prizes", icon: <FaTrophy /> },
  { id: "tools", label: "Support", icon: <FaTicketAlt /> },
];

const resultTone = (r: string): "ok" | "warn" | "bad" | "neutral" => {
  if (r === "success") return "ok";
  if (r === "duplicate") return "warn";
  if (r === "invalid" || r === "blocked") return "bad";
  return "neutral";
};

const fmtWhen = (v: unknown) => {
  if (!v) return "—";
  const d = new Date(String(v));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
type PageMeta = { page: number; totalPages: number; totalCount: number; hasNextPage: boolean; hasPrevPage: boolean };
const emptyMeta = (): PageMeta => ({ page: 1, totalPages: 1, totalCount: 0, hasNextPage: false, hasPrevPage: false });
const PAGE_SIZE = 100;

const pickMeta = (data: Record<string, unknown>): PageMeta => ({
  page: Number(data.page) || 1,
  totalPages: Number(data.totalPages) || 1,
  totalCount: Number(data.totalCount) || 0,
  hasNextPage: Boolean(data.hasNextPage),
  hasPrevPage: Boolean(data.hasPrevPage),
});

const AdminDashboard: React.FC = () => {
  const auth = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const initialModule = (() => {
    const m = searchParams.get("module");
    if (
      m === "users" ||
      m === "leaderboard" ||
      m === "codes" ||
      m === "activity" ||
      m === "prizes" ||
      m === "tools"
    ) {
      return m;
    }
    return "overview";
  })();
  const [module, setModule] = useState<Module>(initialModule);
  const [codesTab, setCodesTab] = useState<"codes" | "flagged">("codes");
  const [activityTab, setActivityTab] = useState<"submissions" | "entries">("submissions");
  const [prizesTab, setPrizesTab] = useState<"winners" | "draw">("winners");
  const [toolsTab, setToolsTab] = useState<"contact" | "social" | "audit">("audit");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDlg, setConfirmDlg] = useState<{
    title: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    onConfirm: () => Promise<void>;
  } | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [overview, setOverview] = useState<Record<string, unknown> | null>(null);
  const [entrants, setEntrants] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userSortBy, setUserSortBy] = useState("newest");
  const [userMinCodes, setUserMinCodes] = useState("");
  const [usersMeta, setUsersMeta] = useState<PageMeta>(emptyMeta);
  const [submissions, setSubmissions] = useState<Record<string, unknown>[]>([]);
  const [subPage, setSubPage] = useState(1);
  const [subSearch, setSubSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [subMeta, setSubMeta] = useState<PageMeta>(emptyMeta);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [codeRows, setCodeRows] = useState<Record<string, unknown>[]>([]);
  const [codesPage, setCodesPage] = useState(1);
  const [codesSearch, setCodesSearch] = useState("");
  const [codesStatus, setCodesStatus] = useState("");
  const [codesMeta, setCodesMeta] = useState<PageMeta>(emptyMeta);
  const [flagged, setFlagged] = useState<Record<string, unknown>[]>([]);
  const [flaggedPage, setFlaggedPage] = useState(1);
  const [flaggedSearch, setFlaggedSearch] = useState("");
  const [flaggedKind, setFlaggedKind] = useState("");
  const [flaggedMeta, setFlaggedMeta] = useState<PageMeta>(emptyMeta);
  const [winners, setWinners] = useState<Record<string, unknown>[]>([]);
  const [winnersPage, setWinnersPage] = useState(1);
  const [winnersSearch, setWinnersSearch] = useState("");
  const [winnersStatus, setWinnersStatus] = useState("");
  const [winnersTier, setWinnersTier] = useState("");
  const [winnersMeta, setWinnersMeta] = useState<PageMeta>(emptyMeta);
  const [modal, setModal] = useState<null | "import" | "instant" | "social">(null);
  const [csv, setCsv] = useState("");
  const [csvFileName, setCsvFileName] = useState("");
  const [instantName, setInstantName] = useState("");
  const [instantPrize, setInstantPrize] = useState("");
  const [instantPhoto, setInstantPhoto] = useState<File | null>(null);
  const [socialUrl, setSocialUrl] = useState("");
  const [socialCaption, setSocialCaption] = useState("");
  const [socialPosts, setSocialPosts] = useState<Record<string, unknown>[]>([]);
  const [socialPage, setSocialPage] = useState(1);
  const [socialSearch, setSocialSearch] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialMeta, setSocialMeta] = useState<PageMeta>(emptyMeta);
  const [messages, setMessages] = useState<Record<string, unknown>[]>([]);
  const [contactPage, setContactPage] = useState(1);
  const [contactSearch, setContactSearch] = useState("");
  const [contactUnread, setContactUnread] = useState(false);
  const [contactMeta, setContactMeta] = useState<PageMeta>(emptyMeta);
  const [audit, setAudit] = useState<Record<string, unknown>[]>([]);
  const [auditPage, setAuditPage] = useState(1);
  const [auditSearch, setAuditSearch] = useState("");
  const [auditActorType, setAuditActorType] = useState("");
  const [auditMeta, setAuditMeta] = useState<PageMeta>(emptyMeta);
  const [drawPreview, setDrawPreview] = useState<Record<string, unknown> | null>(null);
  const [drawEntries, setDrawEntries] = useState<Record<string, unknown>[]>([]);
  const [entriesPage, setEntriesPage] = useState(1);
  const [entriesSearch, setEntriesSearch] = useState("");
  const [entriesWinner, setEntriesWinner] = useState("");
  const [entriesMeta, setEntriesMeta] = useState<PageMeta>(emptyMeta);

  const view: View =
    module === "overview"
      ? "overview"
      : module === "users"
        ? "users"
        : module === "leaderboard"
          ? "leaderboard"
          : module === "codes"
            ? codesTab
            : module === "activity"
              ? activityTab
              : module === "prizes"
                ? prizesTab
                : toolsTab;

  useEffect(() => {
    setSelectedIds([]);
  }, [view, page, socialPage, contactPage, auditPage, subPage, entriesPage]);

  useEffect(() => {
    if (!auth.isLoggedIn || auth.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  useEffect(() => {
    const m = searchParams.get("module");
    if (
      m === "users" ||
      m === "leaderboard" ||
      m === "codes" ||
      m === "activity" ||
      m === "prizes" ||
      m === "tools" ||
      m === "overview"
    ) {
      setModule(m === "overview" ? "overview" : m);
      if (m === "leaderboard") {
        setUserSortBy("codes");
        setPage(1);
      }
      if (m === "users") {
        setUserSortBy("newest");
        setUserMinCodes("");
        setPage(1);
      }
    }
  }, [searchParams]);

  const goModule = (id: Module) => {
    setModule(id);
    if (id === "leaderboard") {
      setUserSortBy("codes");
      setPage(1);
    }
    if (id === "users") {
      setUserSortBy("newest");
      setUserMinCodes("");
      setPage(1);
    }
    if (id === "overview") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ module: id }, { replace: true });
    }
    setMenuOpen(false);
  };

  const withLoad = async (fn: () => Promise<void>) => {
    setLoading(true);
    try {
      await fn();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const withBusy = async (label: string, fn: () => Promise<void>) => {
    setBusy(label);
    try {
      await fn();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(null);
    }
  };

  const askConfirm = (opts: {
    title: string;
    message: string;
    confirmLabel?: string;
    danger?: boolean;
    onConfirm: () => Promise<void>;
  }) => setConfirmDlg(opts);

  const selectableIds = (rows: Record<string, unknown>[]) =>
    rows.filter((row) => row.role !== "admin").map((row) => String(row._id));

  const pageSelected = (ids: string[]) => ids.length > 0 && ids.every((id) => selectedIds.includes(id));

  const toggleSelected = (id: string) => {
    setSelectedIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const togglePage = (ids: string[]) => {
    setSelectedIds((cur) => {
      if (ids.length > 0 && ids.every((id) => cur.includes(id))) {
        return cur.filter((id) => !ids.includes(id));
      }
      return [...new Set([...cur, ...ids])];
    });
  };

  const checkTh = (ids: string[]) => (
    <th style={{ width: 28 }}>
      <S.Check
        checked={pageSelected(ids)}
        onChange={() => togglePage(ids)}
        aria-label="Select all on this page"
      />
    </th>
  );

  const checkTd = (id: string, disabled = false) => (
    <td>
      <S.Check
        checked={selectedIds.includes(id)}
        disabled={disabled}
        onChange={() => toggleSelected(id)}
        aria-label="Select row"
      />
    </td>
  );

  const bulkDeleteBtn = (
    title: string,
    message: string,
    run: (ids: string[]) => Promise<unknown>,
    after: () => Promise<void>
  ) =>
    selectedIds.length > 0 ? (
      <S.Action
        $danger
        onClick={() =>
          askConfirm({
            title,
            message: `${message} ${selectedIds.length} selected. This cannot be undone.`,
            confirmLabel: `Delete ${selectedIds.length}`,
            danger: true,
            onConfirm: async () => {
              const ids = [...selectedIds];
              setConfirmDlg(null);
              await withBusy("Deleting…", async () => {
                const result = (await run(ids)) as { deleted?: number };
                setSelectedIds([]);
                await after();
                toast.success(`Deleted ${result?.deleted ?? ids.length}`);
              });
            },
          })
        }
      >
        <FaTrash /> Delete {selectedIds.length} selected
      </S.Action>
    ) : null;

  const renderTableShimmer = (
    cols: { label: string; width?: string; kind?: "text" | "badge" | "num" | "rank" | "actions" | "action" | "code" }[],
    rows = 10
  ) => (
    <S.TableWrap>
      <S.Table>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.label}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td key={`${c.label}-${i}`}>
                  {c.kind === "rank" ? (
                    <S.ShimmerBlock $h={20} $w="22px" $r={5} />
                  ) : c.kind === "badge" ? (
                    <S.ShimmerBlock $h={18} $w="58px" $r={4} />
                  ) : c.kind === "num" ? (
                    <S.ShimmerBlock $h={12} $w="28px" />
                  ) : c.kind === "code" ? (
                    <S.ShimmerBlock $h={18} $w="76px" $r={4} />
                  ) : c.kind === "actions" ? (
                    <S.ShimmerActions>
                      <S.ShimmerBlock $h={24} $w="24px" $r={4} />
                      <S.ShimmerBlock $h={24} $w="24px" $r={4} />
                      <S.ShimmerBlock $h={24} $w="24px" $r={4} />
                    </S.ShimmerActions>
                  ) : c.kind === "action" ? (
                    <S.ShimmerBlock $h={24} $w="24px" $r={4} />
                  ) : (
                    <S.ShimmerBlock $h={12} $w={c.width || "72%"} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </S.Table>
    </S.TableWrap>
  );

  const usersShimmer = () =>
    renderTableShimmer([
      { label: "Select" },
      { label: "Name", width: "52%" },
      { label: "Phone", width: "78%" },
      { label: "Email", width: "85%" },
      { label: "Type", kind: "badge" },
      { label: "Status", kind: "badge" },
      { label: "Actions", kind: "actions" },
    ]);

  const leaderboardShimmer = () =>
    renderTableShimmer([
      { label: "Select" },
      { label: "Rank", kind: "rank" },
      { label: "Name", width: "55%" },
      { label: "Phone", width: "78%" },
      { label: "Type", kind: "badge" },
      { label: "Codes", kind: "num" },
      { label: "Tickets", kind: "num" },
      { label: "Next ticket", width: "40px" },
      { label: "Status", kind: "badge" },
      { label: "Actions", kind: "actions" },
    ]);

  const codesShimmer = () =>
    renderTableShimmer([
      { label: "Code", kind: "code" },
      { label: "Status", kind: "badge" },
      { label: "Batch", width: "70%" },
      { label: "Used by", width: "55%" },
      { label: "Used at", width: "60%" },
    ]);

  const entriesShimmer = () =>
    renderTableShimmer([
      { label: "Ticket ID", kind: "code" },
      { label: "Person", width: "55%" },
      { label: "Status", kind: "badge" },
      { label: "Created", width: "65%" },
    ]);

  const submissionsShimmer = () =>
    renderTableShimmer([
      { label: "Code", kind: "code" },
      { label: "Person", width: "55%" },
      { label: "Result", kind: "badge" },
      { label: "Note", width: "70%" },
      { label: "When", width: "60%" },
    ]);

  const winnersShimmer = () =>
    renderTableShimmer([
      { label: "Winner", width: "55%" },
      { label: "Tier", kind: "badge" },
      { label: "Status", kind: "badge" },
      { label: "Prize", width: "70%" },
      { label: "Actions", kind: "actions" },
    ]);

  const flaggedShimmer = () =>
    renderTableShimmer([
      { label: "Code", kind: "code" },
      { label: "Status", kind: "badge" },
      { label: "Duplicate attempts", kind: "num" },
    ]);

  const auditShimmer = () =>
    renderTableShimmer([
      { label: "Select" },
      { label: "Event", width: "50%" },
      { label: "Actor", width: "50%" },
      { label: "Role", kind: "badge" },
      { label: "Target", width: "50%" },
      { label: "Code", kind: "code" },
      { label: "Tier", kind: "badge" },
      { label: "Detail", width: "70%" },
      { label: "When", width: "55%" },
      { label: "Actions", kind: "action" },
    ]);

  const contactShimmer = () =>
    renderTableShimmer([
      { label: "Select" },
      { label: "Name", width: "50%" },
      { label: "Email", width: "70%" },
      { label: "Message", width: "85%" },
      { label: "Status", kind: "badge" },
      { label: "When", width: "55%" },
      { label: "Actions", kind: "actions" },
    ]);

  const loadOverview = useCallback(async () => {
    setOverview((await apiService.adminOverview()) as Record<string, unknown>);
  }, []);

  const loadEntrants = useCallback(async () => {
    const minCodes = Number(userMinCodes) || 0;
    const data = (await apiService.adminEntrants(
      page,
      PAGE_SIZE,
      search,
      accountType,
      userStatus,
      userSortBy,
      minCodes
    )) as Record<string, unknown> & {
      items: Record<string, unknown>[];
    };
    setEntrants(data.items || []);
    setUsersMeta(pickMeta(data));
  }, [page, search, accountType, userStatus, userSortBy, userMinCodes]);

  const loadSubmissions = useCallback(async () => {
    const data = (await apiService.adminSubmissions(subPage, resultFilter, subSearch)) as Record<string, unknown> & {
      items: Record<string, unknown>[];
    };
    setSubmissions(data.items || []);
    setSubMeta(pickMeta(data));
  }, [subPage, resultFilter, subSearch]);

  const loadStats = useCallback(async () => {
    setStats((await apiService.adminCodeStats()) as Record<string, number>);
  }, []);

  const loadCodesList = useCallback(async () => {
    const data = (await apiService.adminCodes(codesPage, codesSearch, codesStatus)) as Record<string, unknown> & {
      items: Record<string, unknown>[];
    };
    setCodeRows(data.items || []);
    setCodesMeta(pickMeta(data));
  }, [codesPage, codesSearch, codesStatus]);

  const loadFlagged = useCallback(async () => {
    const data = (await apiService.adminFlagged(flaggedPage, flaggedSearch, flaggedKind)) as Record<
      string,
      unknown
    > & {
      items: Record<string, unknown>[];
    };
    setFlagged(data.items || []);
    setFlaggedMeta(pickMeta(data));
  }, [flaggedPage, flaggedSearch, flaggedKind]);

  const loadWinners = useCallback(async () => {
    const data = (await apiService.adminWinners(
      winnersPage,
      winnersSearch,
      winnersStatus,
      PAGE_SIZE,
      winnersTier
    )) as Record<string, unknown> & { items: Record<string, unknown>[] };
    setWinners(data.items || []);
    setWinnersMeta(pickMeta(data));
  }, [winnersPage, winnersSearch, winnersStatus, winnersTier]);

  const loadDrawWinners = useCallback(async () => {
    const data = (await apiService.adminWinners(1, "", "", 100)) as { items: Record<string, unknown>[] };
    setWinners(data.items || []);
  }, []);

  const loadSocial = useCallback(async () => {
    const data = (await apiService.adminSocial(socialPage, socialSearch, PAGE_SIZE, socialPlatform)) as Record<
      string,
      unknown
    > & {
      items: Record<string, unknown>[];
    };
    setSocialPosts(data.items || []);
    setSocialMeta(pickMeta(data));
  }, [socialPage, socialSearch, socialPlatform]);

  const loadContact = useCallback(async () => {
    const data = (await apiService.adminContact(contactPage, contactSearch, contactUnread)) as Record<
      string,
      unknown
    > & { items: Record<string, unknown>[] };
    setMessages(data.items || []);
    setContactMeta(pickMeta(data));
  }, [contactPage, contactSearch, contactUnread]);

  const loadAudit = useCallback(async () => {
    const data = (await apiService.adminAudit(auditPage, auditSearch, PAGE_SIZE, auditActorType)) as Record<
      string,
      unknown
    > & {
      items: Record<string, unknown>[];
    };
    setAudit(data.items || []);
    setAuditMeta(pickMeta(data));
  }, [auditPage, auditSearch, auditActorType]);

  const loadDrawPreview = useCallback(async () => {
    setDrawPreview((await apiService.adminDrawPreview()) as Record<string, unknown>);
  }, []);

  const loadDrawEntries = useCallback(async () => {
    const data = (await apiService.adminDrawEntries(entriesPage, entriesSearch, PAGE_SIZE, entriesWinner)) as Record<
      string,
      unknown
    > & {
      items: Record<string, unknown>[];
    };
    setDrawEntries(data.items || []);
    setEntriesMeta(pickMeta(data));
  }, [entriesPage, entriesSearch, entriesWinner]);

  useEffect(() => {
    if (auth.role !== "admin") return;
    if (view === "overview") withLoad(loadOverview);
    if (view === "users" || view === "leaderboard") withLoad(loadEntrants);
    if (view === "submissions") withLoad(loadSubmissions);
    if (view === "entries") withLoad(loadDrawEntries);
    if (view === "codes")
      withLoad(async () => {
        await loadStats();
        await loadCodesList();
      });
    if (view === "flagged") withLoad(loadFlagged);
    if (view === "winners") withLoad(loadWinners);
    if (view === "draw")
      withLoad(async () => {
        await loadDrawPreview();
        await loadDrawWinners();
      });
    if (view === "social") withLoad(loadSocial);
    if (view === "contact") withLoad(loadContact);
    if (view === "audit") withLoad(loadAudit);
  }, [
    view,
    page,
    search,
    accountType,
    userStatus,
    userSortBy,
    userMinCodes,
    auth.role,
    subPage,
    subSearch,
    resultFilter,
    entriesPage,
    entriesSearch,
    entriesWinner,
    codesPage,
    codesSearch,
    codesStatus,
    flaggedPage,
    flaggedSearch,
    flaggedKind,
    winnersPage,
    winnersSearch,
    winnersStatus,
    winnersTier,
    socialPage,
    socialSearch,
    socialPlatform,
    contactPage,
    contactSearch,
    contactUnread,
    auditPage,
    auditSearch,
    auditActorType,
  ]);

  const renderPager = (meta: PageMeta, setPg: (fn: (p: number) => number) => void, noun = "rows") => (
    <S.Pager>
      <S.PagerMeta>
        {meta.totalCount.toLocaleString()} {noun} · page {meta.page} of {meta.totalPages}
      </S.PagerMeta>
      <S.PagerControls>
        <S.Action $ghost disabled={!meta.hasPrevPage} onClick={() => setPg((p) => Math.max(1, p - 1))}>
          Prev
        </S.Action>
        <S.Chip>
          Page {meta.page} / {meta.totalPages}
        </S.Chip>
        <span style={{ fontSize: "12px", color: "#5c6b62", whiteSpace: "nowrap" }}>
          {meta.totalCount.toLocaleString()} total · {PAGE_SIZE} per page
        </span>
        <S.Action $ghost disabled={!meta.hasNextPage} onClick={() => setPg((p) => p + 1)}>
          Next
        </S.Action>
      </S.PagerControls>
    </S.Pager>
  );

  const download = async (kind: "entries" | "winners" | "users") => {
    const url =
      kind === "entries"
        ? apiService.exportEntriesUrl()
        : kind === "winners"
          ? apiService.exportWinnersUrl()
          : apiService.exportEntrantsUrl();
    const res = await fetch(url, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    if (!res.ok) {
      toast.error("Export failed");
      return;
    }
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download =
      kind === "entries"
        ? "vita-malt-entries.csv"
        : kind === "winners"
          ? "vita-malt-winners.csv"
          : "vita-malt-users.csv";
    a.click();
  };

  const codes = (overview?.codes || {}) as Record<string, number>;
  const sub24 = (overview?.submissions24h || {}) as Record<string, number>;
  const win = (overview?.winners || {}) as Record<string, number>;
  const campaign = (overview?.campaign || {}) as Record<string, string>;
  const recent = (overview?.recentSubmissions || []) as Record<string, unknown>[];
  const recentWinners = (overview?.recentWinners || []) as Record<string, unknown>[];
  const usedPct = Number(
    codes.usedPercent || (codes.total ? (Number(codes.used || 0) / Number(codes.total)) * 100 : 0)
  );

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
          {MODULES.map((item) => (
            <S.MenuItem
              key={item.id}
              $active={module === item.id}
              onClick={() => goModule(item.id)}
            >
              {item.icon}
              {item.label}
              {item.id === "users" && overview?.entrants != null && (
                <span className="count">{Number(overview.entrants)}</span>
              )}
            </S.MenuItem>
          ))}
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
        {module === "codes" && (
          <S.SubTabs>
            <S.SubTab $active={codesTab === "codes"} onClick={() => setCodesTab("codes")}>
              Inventory
            </S.SubTab>
            <S.SubTab $active={codesTab === "flagged"} onClick={() => setCodesTab("flagged")}>
              Flagged
            </S.SubTab>
          </S.SubTabs>
        )}
        {module === "activity" && (
          <S.SubTabs>
            <S.SubTab $active={activityTab === "submissions"} onClick={() => setActivityTab("submissions")}>
              Code attempts
            </S.SubTab>
            <S.SubTab $active={activityTab === "entries"} onClick={() => setActivityTab("entries")}>
              Draw tickets
            </S.SubTab>
          </S.SubTabs>
        )}
        {module === "prizes" && (
          <S.SubTabs>
            <S.SubTab $active={prizesTab === "winners"} onClick={() => setPrizesTab("winners")}>
              Winners
            </S.SubTab>
            <S.SubTab $active={prizesTab === "draw"} onClick={() => setPrizesTab("draw")}>
              Run draw
            </S.SubTab>
          </S.SubTabs>
        )}
        {module === "tools" && (
          <S.SubTabs>
            <S.SubTab $active={toolsTab === "audit"} onClick={() => setToolsTab("audit")}>
              Audit
            </S.SubTab>
            <S.SubTab $active={toolsTab === "contact"} onClick={() => setToolsTab("contact")}>
              Inbox
            </S.SubTab>
            <S.SubTab $active={toolsTab === "social"} onClick={() => setToolsTab("social")}>
              Social
            </S.SubTab>
          </S.SubTabs>
        )}

        {view === "overview" && (
          <>
            <S.PageHead>
              <div>
                <h1>Overview</h1>
                <p>
                  {campaign.start || "Sep 18"} – {campaign.end || "Nov 20"} · Draw {campaign.draw || "Nov 23"}
                </p>
              </div>
              <S.Action $ghost onClick={() => withLoad(loadOverview)} disabled={loading}>
                Refresh
              </S.Action>
            </S.PageHead>

            {loading || !overview ? (
              <>
                <S.KpiGrid>
                  {[0, 1, 2, 3].map((i) => (
                    <S.Kpi key={i}>
                      <S.ShimmerBlock $h={10} $w="42%" />
                      <S.ShimmerBlock $h={28} $w="36%" style={{ marginTop: 10 }} />
                      <S.ShimmerBlock $h={10} $w="70%" style={{ marginTop: 8 }} />
                    </S.Kpi>
                  ))}
                </S.KpiGrid>
                <S.Split>
                  <S.Panel>
                    <h2>Latest code attempts</h2>
                    {renderTableShimmer(
                      [
                        { label: "Code", kind: "code" },
                        { label: "Person", width: "55%" },
                        { label: "Result", kind: "badge" },
                        { label: "When", width: "40%" },
                      ],
                      5
                    )}
                  </S.Panel>
                  <S.Panel>
                    <h2>Top by codes</h2>
                    {renderTableShimmer(
                      [
                        { label: "Rank", kind: "rank" },
                        { label: "Name", width: "55%" },
                        { label: "Phone", width: "70%" },
                        { label: "Type", kind: "badge" },
                        { label: "Codes", kind: "num" },
                        { label: "Tickets", kind: "num" },
                      ],
                      5
                    )}
                  </S.Panel>
                </S.Split>
              </>
            ) : (
              <>
            <S.KpiGrid>
              <S.Kpi $accent={COLORS.red}>
                <span>People entered</span>
                <strong>{Number(overview?.entrants || 0).toLocaleString()}</strong>
                <small>{Number(overview?.accounts || 0)} registered · {Number(overview?.guests || 0)} guests</small>
              </S.Kpi>
              <S.Kpi $accent={COLORS.gold}>
                <span>Codes used</span>
                <strong>{Number(codes.used || 0).toLocaleString()}</strong>
                <small>{Number(codes.unused || 0).toLocaleString()} still available of {Number(codes.total || 0).toLocaleString()}</small>
              </S.Kpi>
              <S.Kpi $accent={COLORS.success}>
                <span>Draw tickets</span>
                <strong>{Number(overview?.drawEntries || 0).toLocaleString()}</strong>
                <small>Expected from used codes: {Number(overview?.expectedTickets || 0)}</small>
              </S.Kpi>
              <S.Kpi $accent={COLORS.redDark}>
                <span>Last 24 hours</span>
                <strong>{sub24.total || 0}</strong>
                <small>
                  {sub24.success || 0} success · {sub24.duplicate || 0} dupes · {sub24.invalid || 0} invalid
                </small>
              </S.Kpi>
            </S.KpiGrid>

            <S.Panel>
              <h2>Crown code pool</h2>
              <p className="sub">Grand prize inventory loaded for the campaign. 4 validated codes = 1 draw ticket.</p>
              <S.ProgressTrack>
                <S.ProgressFill $pct={usedPct} />
              </S.ProgressTrack>
              <S.ProgressMeta>
                <span>{usedPct.toFixed(1)}% redeemed</span>
                <span>{Number(codes.used || 0).toLocaleString()} used · {Number(codes.unused || 0).toLocaleString()} unused</span>
              </S.ProgressMeta>
            </S.Panel>

            <S.StatGrid>
              <S.StatCard type="button" onClick={() => goModule("codes")}>
                <span>Inventory</span>
                <strong>{Number(codes.total || 0).toLocaleString()}</strong>
                <small>Total unique crown codes in MongoDB</small>
              </S.StatCard>
              <S.StatCard type="button" onClick={() => { goModule("codes"); setCodesTab("flagged"); }}>
                <span>Needs review</span>
                <strong>{Number(codes.flagged || 0).toLocaleString()}</strong>
                <small>Flagged codes or duplicate-attempt rows</small>
              </S.StatCard>
              <S.StatCard type="button" onClick={() => { goModule("tools"); setToolsTab("contact"); }}>
                <span>Support inbox</span>
                <strong>{Number(overview?.unreadMessages || 0).toLocaleString()}</strong>
                <small>Unread contact messages</small>
              </S.StatCard>
            </S.StatGrid>

            <S.Split>
              <S.Panel>
                <h2>Latest code attempts</h2>
                <p className="sub">Most recent redemptions from the site</p>
                {recent.length === 0 ? (
                  <S.Empty>
                    <strong>No activity yet</strong>
                    Attempts appear here once codes are submitted.
                  </S.Empty>
                ) : (
                  <S.TableWrap>
                    <S.Table>
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Person</th>
                          <th>Result</th>
                          <th>When</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recent.map((s) => {
                          const entrant = s.entrant as { fullName?: string; phone?: string } | null;
                          return (
                            <tr key={String(s._id)}>
                              <td>
                                <code>{String(s.codeAttempted)}</code>
                              </td>
                              <td>
                                <strong>{entrant?.fullName || "—"}</strong>
                                {entrant?.phone ? <S.CellMeta>{entrant.phone}</S.CellMeta> : null}
                              </td>
                              <td>
                                <S.Badge $tone={resultTone(String(s.result))}>{String(s.result)}</S.Badge>
                              </td>
                              <td>
                                <S.Muted>{fmtWhen(s.createdAt)}</S.Muted>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </S.Table>
                  </S.TableWrap>
                )}
              </S.Panel>

              <S.Panel>
                <h2>Top by codes</h2>
                <p className="sub">People closest to extra tickets</p>
                {(overview?.topEntrants as Record<string, unknown>[] | undefined)?.length ? (
                  <S.TableWrap>
                    <S.Table>
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Type</th>
                          <th>Codes</th>
                          <th>Tickets</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(overview?.topEntrants as Record<string, unknown>[]).map((e) => (
                          <tr
                            key={String(e._id)}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/admin/entrants/${String(e._id)}`)}
                          >
                            <td>
                              <S.Rank $top={Number(e.rank) <= 3}>{String(e.rank)}</S.Rank>
                            </td>
                            <td>
                              <strong>{String(e.fullName)}</strong>
                            </td>
                            <td>
                              <S.Muted>{String(e.phone || "—")}</S.Muted>
                            </td>
                            <td>
                              <S.Badge $tone={e.hasAccount ? "ok" : "neutral"}>
                                {e.hasAccount ? "Account" : "Guest"}
                              </S.Badge>
                            </td>
                            <td>
                              <S.Num>{String(e.validCodeCount ?? 0)}</S.Num>
                            </td>
                            <td>
                              <S.Num>{String(e.drawEntryCount ?? 0)}</S.Num>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </S.Table>
                  </S.TableWrap>
                ) : (
                  <S.Empty>
                    <strong>No codes yet</strong>
                    Rankings appear after successful submissions.
                  </S.Empty>
                )}
                <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <S.Action
                    $ghost
                    onClick={() => goModule("leaderboard")}
                  >
                    Open leaderboard
                  </S.Action>
                  <S.Action
                    $ghost
                    onClick={() => {
                      goModule("prizes");
                      setPrizesTab("draw");
                    }}
                  >
                    <FaDice /> Draw console
                  </S.Action>
                </div>
              </S.Panel>
            </S.Split>

            <S.Panel>
                <h2>Winners &amp; draw</h2>
                <p className="sub">Published showcase vs pending verification</p>
                {recentWinners.length === 0 ? (
                  <S.Empty>
                    <strong>No winners recorded yet</strong>
                    Instant-win claims and the electronic draw will appear here.
                  </S.Empty>
                ) : (
                  <S.TableWrap>
                    <S.Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Prize</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentWinners.map((w) => (
                          <tr key={String(w._id)}>
                            <td>
                              <strong>{String(w.displayName)}</strong>
                            </td>
                            <td>
                              <S.Muted>{String(w.prizeLabel)}</S.Muted>
                            </td>
                            <td>
                              <S.Badge $tone={String(w.status) === "published" ? "ok" : "warn"}>
                                {String(w.status).replace(/_/g, " ")}
                              </S.Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </S.Table>
                  </S.TableWrap>
                )}
                <S.MetaRow>
                  <S.Chip>Published · {win.published || 0}</S.Chip>
                  <S.Chip>Pending verify · {win.pending || 0}</S.Chip>
                  <S.Chip>7-day attempts · {Number(overview?.submissions7d || 0)}</S.Chip>
                </S.MetaRow>
              </S.Panel>

            <S.Panel>
              <h2>Quick actions</h2>
              <p className="sub">Jump to the work you do most during the campaign</p>
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                <S.Action
                  onClick={() => {
                    goModule("codes");
                    setCodesTab("codes");
                    setModal("import");
                  }}
                >
                  <FaUpload /> Import codes
                </S.Action>
                <S.Action
                  $ghost
                  onClick={() => {
                    goModule("prizes");
                    setPrizesTab("draw");
                  }}
                >
                  <FaDice /> Draw console
                </S.Action>
                <S.Action $ghost onClick={() => download("entries")}>
                  <FaDownload /> Export tickets
                </S.Action>
                <S.Action $ghost onClick={() => goModule("users")}>
                  <FaUsers /> People
                </S.Action>
              </div>
            </S.Panel>
              </>
            )}
          </>
        )}

        {view === "users" && (
          <>
            <S.PageHead>
              <div>
                <h1>Users</h1>
                <p>Search, block, or open a profile. Rankings are under Leaderboard.</p>
              </div>
              <S.Action onClick={() => download("users")}>
                <FaDownload /> Export CSV
              </S.Action>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search name, phone, or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setPage(1);
                  }}
                />
                <S.Select
                  value={accountType}
                  onChange={(e) => {
                    setAccountType(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Account type"
                >
                  <option value="">All types</option>
                  <option value="guest">Guests</option>
                  <option value="account">Accounts</option>
                </S.Select>
                <S.Select
                  value={userStatus}
                  onChange={(e) => {
                    setUserStatus(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Status"
                >
                  <option value="">All statuses</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setPage(1)}>Search</S.Action>
                  {bulkDeleteBtn(
                    "Delete selected users?",
                    "Used codes stay redeemed.",
                    (ids) => apiService.adminBulkDeleteEntrants(ids),
                    loadEntrants
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(usersMeta, setPage, "people")}
              {loading ? (
                usersShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {checkTh(selectableIds(entrants))}
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrants.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <S.Empty>
                            <strong>No users found</strong>
                            Try another search or clear filters.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      entrants.map((e) => (
                        <tr key={String(e._id)}>
                          {checkTd(String(e._id), e.role === "admin")}
                          <td>
                            <strong>{String(e.fullName)}</strong>
                          </td>
                          <td>
                            <S.Muted>{String(e.phone || "—")}</S.Muted>
                          </td>
                          <td>
                            <S.Muted>{String(e.email || "—")}</S.Muted>
                          </td>
                          <td>
                            <S.Badge $tone={e.hasAccount ? "ok" : "neutral"}>
                              {e.hasAccount ? "Account" : "Guest"}
                            </S.Badge>
                          </td>
                          <td>
                            <S.Badge $tone={e.isActive ? "ok" : "bad"}>
                              {e.isActive ? "Active" : "Blocked"}
                            </S.Badge>
                          </td>
                          <td>
                            <S.Actions>
                              <S.IconBtn
                                $tone="view"
                                title="View"
                                onClick={() => navigate(`/admin/entrants/${String(e._id)}`)}
                              >
                                <FaEye />
                              </S.IconBtn>
                              {e.isActive ? (
                                <S.IconBtn
                                  $tone="block"
                                  title="Block"
                                  onClick={() =>
                                    askConfirm({
                                      title: "Block user?",
                                      message: `${String(e.fullName)} will not be able to submit codes until unblocked.`,
                                      confirmLabel: "Block",
                                      danger: true,
                                      onConfirm: async () => {
                                        setConfirmDlg(null);
                                        await withBusy("Blocking…", async () => {
                                          await apiService.adminBlock(String(e._id));
                                          await loadEntrants();
                                        });
                                      },
                                    })
                                  }
                                >
                                  <FaBan />
                                </S.IconBtn>
                              ) : (
                                <S.IconBtn
                                  $tone="view"
                                  title="Unblock"
                                  onClick={() =>
                                    askConfirm({
                                      title: "Unblock user?",
                                      message: `Allow ${String(e.fullName)} to submit codes again?`,
                                      confirmLabel: "Unblock",
                                      onConfirm: async () => {
                                        setConfirmDlg(null);
                                        await withBusy("Unblocking…", async () => {
                                          await apiService.adminUnblock(String(e._id));
                                          await loadEntrants();
                                        });
                                      },
                                    })
                                  }
                                >
                                  <FaCheckCircle />
                                </S.IconBtn>
                              )}
                              <S.IconBtn
                                $tone="delete"
                                title="Delete"
                                onClick={() =>
                                  askConfirm({
                                    title: "Delete user?",
                                    message: "Used codes stay redeemed. This cannot be undone.",
                                    confirmLabel: "Delete",
                                    danger: true,
                                    onConfirm: async () => {
                                      setConfirmDlg(null);
                                      await withBusy("Deleting…", async () => {
                                        await apiService.adminDeleteEntrant(String(e._id));
                                        await loadEntrants();
                                      });
                                    },
                                  })
                                }
                              >
                                <FaTrash />
                              </S.IconBtn>
                            </S.Actions>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "leaderboard" && (
          <>
            <S.PageHead>
              <div>
                <h1>Leaderboard</h1>
                <p>Ranked by codes & tickets. Draw picks winners — this list is monitoring only.</p>
              </div>
              <S.Action onClick={() => download("users")}>
                <FaDownload /> Export CSV
              </S.Action>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search name, phone, or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setPage(1);
                  }}
                />
                <S.Select
                  value={userSortBy}
                  onChange={(e) => {
                    setUserSortBy(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Sort by"
                >
                  <option value="codes">Most codes</option>
                  <option value="entries">Most tickets</option>
                  <option value="newest">Newest</option>
                </S.Select>
                <S.Select
                  value={accountType}
                  onChange={(e) => {
                    setAccountType(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Account type"
                >
                  <option value="">All types</option>
                  <option value="guest">Guests</option>
                  <option value="account">Accounts</option>
                </S.Select>
                <S.Select
                  value={userMinCodes}
                  onChange={(e) => {
                    setUserMinCodes(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Minimum codes"
                >
                  <option value="">Any codes</option>
                  <option value="1">1+ codes</option>
                  <option value="4">4+ (1+ ticket)</option>
                  <option value="8">8+ codes</option>
                  <option value="20">20+ codes</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setPage(1)}>Apply</S.Action>
                  {bulkDeleteBtn(
                    "Delete selected users?",
                    "Used codes stay redeemed.",
                    (ids) => apiService.adminBulkDeleteEntrants(ids),
                    loadEntrants
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(usersMeta, setPage, "people")}
              {loading ? (
                leaderboardShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {checkTh(selectableIds(entrants))}
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Codes</th>
                      <th>Tickets</th>
                      <th>Next ticket</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrants.length === 0 ? (
                      <tr>
                        <td colSpan={11}>
                          <S.Empty>
                            <strong>No matches</strong>
                            Clear filters or wait for code submissions.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      entrants.map((e) => (
                        <tr key={String(e._id)}>
                          {checkTd(String(e._id), e.role === "admin")}
                          <td>
                            <S.Rank $top={Number(e.rank) > 0 && Number(e.rank) <= 3}>
                              {String(e.rank ?? "—")}
                            </S.Rank>
                          </td>
                          <td>
                            <strong>{String(e.fullName)}</strong>
                          </td>
                          <td>
                            <S.Muted>{String(e.phone || "—")}</S.Muted>
                          </td>
                          <td>
                            <S.Badge $tone={e.hasAccount ? "ok" : "neutral"}>
                              {e.hasAccount ? "Account" : "Guest"}
                            </S.Badge>
                          </td>
                          <td>
                            <S.Num>{String(e.validCodeCount ?? 0)}</S.Num>
                          </td>
                          <td>
                            <S.Num>{String(e.drawEntryCount ?? 0)}</S.Num>
                          </td>
                          <td>
                            <S.Muted>{Number(e.pendingTowardNext ?? 0)} / 4</S.Muted>
                          </td>
                          <td>
                            <S.Badge $tone={e.isActive ? "ok" : "bad"}>
                              {e.isActive ? "Active" : "Blocked"}
                            </S.Badge>
                          </td>
                          <td>
                            <S.Actions>
                              <S.IconBtn
                                $tone="view"
                                title="View"
                                onClick={() => navigate(`/admin/entrants/${String(e._id)}`)}
                              >
                                <FaEye />
                              </S.IconBtn>
                              {e.role !== "admin" && (
                                <S.IconBtn
                                  $tone="delete"
                                  title="Delete"
                                  onClick={() =>
                                    askConfirm({
                                      title: "Delete user?",
                                      message: "Used codes stay redeemed. This cannot be undone.",
                                      confirmLabel: "Delete",
                                      danger: true,
                                      onConfirm: async () => {
                                        setConfirmDlg(null);
                                        await withBusy("Deleting…", async () => {
                                          await apiService.adminDeleteEntrant(String(e._id));
                                          await loadEntrants();
                                        });
                                      },
                                    })
                                  }
                                >
                                  <FaTrash />
                                </S.IconBtn>
                              )}
                            </S.Actions>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "entries" && (
          <>
            <S.PageHead>
              <div>
                <h1>Draw tickets</h1>
                <p>1 ticket = 4 valid codes. Pool for the electronic draw.</p>
              </div>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search name or phone…"
                  value={entriesSearch}
                  onChange={(e) => setEntriesSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEntriesPage(1);
                  }}
                />
                <S.Select
                  value={entriesWinner}
                  onChange={(e) => {
                    setEntriesWinner(e.target.value);
                    setEntriesPage(1);
                  }}
                  aria-label="Winner filter"
                >
                  <option value="">All tickets</option>
                  <option value="pool">In draw pool</option>
                  <option value="winner">Won a prize</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setEntriesPage(1)}>Search</S.Action>
                  <S.Action $ghost onClick={() => download("entries")}>
                    <FaDownload /> Export CSV
                  </S.Action>
                  {bulkDeleteBtn(
                    "Delete selected tickets?",
                    "These tickets will leave the draw pool. Winning tickets are kept. Redeemed codes stay used.",
                    (ids) => apiService.adminBulkDeleteDrawEntries(ids),
                    loadDrawEntries
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(entriesMeta, setEntriesPage, "tickets")}
              {loading ? (
                entriesShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {checkTh(selectableIds(drawEntries.filter((row) => !row.isWinner)))}
                      <th>Ticket ID</th>
                      <th>Person</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {drawEntries.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <S.Empty>
                            <strong>No tickets yet</strong>
                            Tickets appear once someone banks 4 valid codes.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      drawEntries.map((e) => {
                        const entrant = e.entrant as {
                          fullName?: string;
                          phone?: string;
                          _id?: string;
                        } | null;
                        return (
                          <tr key={String(e._id)}>
                            {checkTd(String(e._id), Boolean(e.isWinner))}
                            <td>
                              <code>…{String(e._id).slice(-8)}</code>
                            </td>
                            <td>
                              <strong>{entrant?.fullName || "—"}</strong>
                              {entrant?.phone ? <S.CellMeta>{entrant.phone}</S.CellMeta> : null}
                            </td>
                            <td>
                              <S.Badge $tone={e.isWinner ? "ok" : "neutral"}>
                                {e.isWinner ? String(e.prizeTier || "Winner") : "In pool"}
                              </S.Badge>
                            </td>
                            <td>
                              <S.Muted>{fmtWhen(e.createdAt)}</S.Muted>
                            </td>
                            <td>
                              {!e.isWinner ? (
                                <S.IconBtn
                                  $tone="delete"
                                  title="Delete"
                                  onClick={() =>
                                    askConfirm({
                                      title: "Delete ticket?",
                                      message: "This ticket will leave the draw pool. Redeemed codes stay used.",
                                      confirmLabel: "Delete",
                                      danger: true,
                                      onConfirm: async () => {
                                        setConfirmDlg(null);
                                        await withBusy("Deleting…", async () => {
                                          await apiService.adminDeleteDrawEntry(String(e._id));
                                          await loadDrawEntries();
                                        });
                                      },
                                    })
                                  }
                                >
                                  <FaTrash />
                                </S.IconBtn>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "submissions" && (
          <>
            <S.PageHead>
              <div>
                <h1>Code attempts</h1>
                <p>Success, duplicate, invalid, or blocked redemptions.</p>
              </div>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search by code…"
                  value={subSearch}
                  onChange={(e) => setSubSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSubPage(1);
                  }}
                />
                <S.Select
                  value={resultFilter}
                  onChange={(e) => {
                    setResultFilter(e.target.value);
                    setSubPage(1);
                  }}
                >
                  <option value="">All results</option>
                  <option value="success">Success</option>
                  <option value="duplicate">Duplicate</option>
                  <option value="invalid">Invalid</option>
                  <option value="blocked">Blocked</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setSubPage(1)}>Search</S.Action>
                  {bulkDeleteBtn(
                    "Delete selected attempts?",
                    "These log rows will be removed. Redeemed codes stay used.",
                    (ids) => apiService.adminBulkDeleteSubmissions(ids),
                    loadSubmissions
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(subMeta, setSubPage, "attempts")}
              {loading ? (
                submissionsShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {checkTh(selectableIds(submissions))}
                      <th>Code</th>
                      <th>Person</th>
                      <th>Result</th>
                      <th>Note</th>
                      <th>When</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          <S.Empty>
                            <strong>No attempts yet</strong>
                            Submissions will show up as codes are entered.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      submissions.map((s) => {
                        const entrant = s.entrant as { fullName?: string; phone?: string } | null;
                        return (
                          <tr key={String(s._id)}>
                            {checkTd(String(s._id))}
                            <td>
                              <code>{String(s.codeAttempted)}</code>
                            </td>
                            <td>
                              <strong>{entrant?.fullName || "—"}</strong>
                              {entrant?.phone ? <S.CellMeta>{entrant.phone}</S.CellMeta> : null}
                            </td>
                            <td>
                              <S.Badge $tone={resultTone(String(s.result))}>{String(s.result)}</S.Badge>
                            </td>
                            <td>
                              <S.Muted>{String(s.reason || "—")}</S.Muted>
                            </td>
                            <td>
                              <S.Muted>{fmtWhen(s.createdAt)}</S.Muted>
                            </td>
                            <td>
                              <S.IconBtn
                                $tone="delete"
                                title="Delete"
                                onClick={() =>
                                  askConfirm({
                                    title: "Delete attempt?",
                                    message: "This log row will be removed. Redeemed codes stay used.",
                                    confirmLabel: "Delete",
                                    danger: true,
                                    onConfirm: async () => {
                                      setConfirmDlg(null);
                                      await withBusy("Deleting…", async () => {
                                        await apiService.adminDeleteSubmission(String(s._id));
                                        await loadSubmissions();
                                      });
                                    },
                                  })
                                }
                              >
                                <FaTrash />
                              </S.IconBtn>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "codes" && (
          <>
            <S.PageHead>
              <h1>Code inventory</h1>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <S.Action onClick={() => setModal("import")}>
                  <FaUpload /> Import CSV
                </S.Action>
                <S.Action $ghost onClick={() => download("entries")}>
                  <FaDownload /> Export tickets
                </S.Action>
                <S.Action $ghost onClick={() => download("winners")}>
                  <FaDownload /> Export winners
                </S.Action>
              </div>
            </S.PageHead>
            <S.KpiGrid>
              <S.Kpi>
                <span>Total</span>
                <strong>{stats.total || 0}</strong>
              </S.Kpi>
              <S.Kpi $accent={COLORS.success}>
                <span>Unused</span>
                <strong>{stats.unused || 0}</strong>
              </S.Kpi>
              <S.Kpi $accent={COLORS.red}>
                <span>Used</span>
                <strong>{stats.used || 0}</strong>
              </S.Kpi>
              <S.Kpi $accent="#8a6a00">
                <span>Dup attempts</span>
                <strong>{stats.duplicateAttempts || 0}</strong>
              </S.Kpi>
            </S.KpiGrid>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search code or batch…"
                  value={codesSearch}
                  onChange={(e) => setCodesSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setCodesPage(1);
                  }}
                />
                <S.Select
                  value={codesStatus}
                  onChange={(e) => {
                    setCodesStatus(e.target.value);
                    setCodesPage(1);
                  }}
                >
                  <option value="">All statuses</option>
                  <option value="unused">Unused</option>
                  <option value="used">Used</option>
                  <option value="flagged">Flagged</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setCodesPage(1)}>Search</S.Action>
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(codesMeta, setCodesPage, "codes")}
              {loading ? (
                codesShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Status</th>
                      <th>Batch</th>
                      <th>Used by</th>
                      <th>Used at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codeRows.length === 0 ? (
                      <tr>
                        <td colSpan={5}>
                          <S.Empty>
                            <strong>No codes found</strong>
                            Import a master list or adjust filters.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      codeRows.map((c) => {
                        const usedBy = c.usedBy as { fullName?: string; phone?: string } | null;
                        return (
                          <tr key={String(c._id)}>
                            <td>
                              <code>{String(c.code)}</code>
                            </td>
                            <td>
                              <S.Badge
                                $tone={
                                  String(c.status) === "used"
                                    ? "ok"
                                    : String(c.status) === "flagged"
                                      ? "bad"
                                      : "neutral"
                                }
                              >
                                {String(c.status)}
                              </S.Badge>
                            </td>
                            <td>
                              <S.Muted>{String(c.sourceBatch || "—")}</S.Muted>
                            </td>
                            <td>
                              {usedBy?.fullName ? <strong>{usedBy.fullName}</strong> : <S.Muted>—</S.Muted>}
                              {usedBy?.phone ? <S.CellMeta>{usedBy.phone}</S.CellMeta> : null}
                            </td>
                            <td>
                              <S.Muted>{fmtWhen(c.usedAt)}</S.Muted>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "flagged" && (
          <>
            <S.PageHead>
              <div>
                <h1>Flagged codes</h1>
                <p>Repeat attempts or flagged status for review.</p>
              </div>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search code…"
                  value={flaggedSearch}
                  onChange={(e) => setFlaggedSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setFlaggedPage(1);
                  }}
                />
                <S.Select
                  value={flaggedKind}
                  onChange={(e) => {
                    setFlaggedKind(e.target.value);
                    setFlaggedPage(1);
                  }}
                  aria-label="Flag type"
                >
                  <option value="">All issues</option>
                  <option value="flagged">Flagged only</option>
                  <option value="duplicates">Duplicates only</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setFlaggedPage(1)}>Search</S.Action>
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(flaggedMeta, setFlaggedPage, "codes")}
              {loading ? (
                flaggedShimmer()
              ) : flagged.length === 0 ? (
                <S.Empty>
                  <strong>All clear</strong>
                  No flagged codes or duplicate spikes right now.
                </S.Empty>
              ) : (
                <S.TableWrap>
                  <S.Table>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Duplicate attempts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flagged.map((c) => (
                        <tr key={String(c._id)}>
                          <td>
                            <code>{String(c.code)}</code>
                          </td>
                          <td>
                            <S.Badge $tone={String(c.status) === "flagged" ? "bad" : "warn"}>
                              {String(c.status)}
                            </S.Badge>
                          </td>
                          <td>
                            <S.Num>{String(c.duplicateAttemptCount)}</S.Num>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </S.Table>
                </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "winners" && (
          <>
            <S.PageHead>
              <div>
                <h1>Winners</h1>
                <p>Verify, publish, and manage instant wins.</p>
              </div>
              <S.Action onClick={() => setModal("instant")}>Add instant win</S.Action>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search name or prize…"
                  value={winnersSearch}
                  onChange={(e) => setWinnersSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setWinnersPage(1);
                  }}
                />
                <S.Select
                  value={winnersStatus}
                  onChange={(e) => {
                    setWinnersStatus(e.target.value);
                    setWinnersPage(1);
                  }}
                >
                  <option value="">All statuses</option>
                  <option value="published">Published</option>
                  <option value="pending_verification">Pending verification</option>
                  <option value="verified">Verified</option>
                  <option value="disqualified">Disqualified</option>
                </S.Select>
                <S.Select
                  value={winnersTier}
                  onChange={(e) => {
                    setWinnersTier(e.target.value);
                    setWinnersPage(1);
                  }}
                  aria-label="Prize tier"
                >
                  <option value="">All tiers</option>
                  <option value="grand">Grand</option>
                  <option value="secondary">Secondary</option>
                  <option value="instant">Instant</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setWinnersPage(1)}>Search</S.Action>
                  <S.Action $ghost onClick={() => download("winners")}>
                    <FaDownload /> Export CSV
                  </S.Action>
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(winnersMeta, setWinnersPage, "winners")}
              {loading ? (
                winnersShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      <th>Winner</th>
                      <th>Tier</th>
                      <th>Status</th>
                      <th>Prize</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.length === 0 ? (
                      <tr>
                        <td colSpan={5}>
                          <S.Empty>
                            <strong>No winners yet</strong>
                            Run the draw or add an instant win to get started.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      winners.map((w) => (
                        <tr key={String(w._id)}>
                          <td>
                            <strong>{String(w.displayName)}</strong>
                          </td>
                          <td>
                            <S.Badge $tone="info">{String(w.tier)}</S.Badge>
                          </td>
                          <td>
                            <S.Badge
                              $tone={
                                String(w.status) === "published"
                                  ? "ok"
                                  : String(w.status) === "pending_verification"
                                    ? "warn"
                                    : String(w.status) === "disqualified"
                                      ? "bad"
                                      : "neutral"
                              }
                            >
                              {String(w.status).replace(/_/g, " ")}
                            </S.Badge>
                          </td>
                          <td>{String(w.prizeLabel)}</td>
                          <td>
                            <S.Actions>
                              <S.Action
                                $ghost
                                onClick={() =>
                                  apiService.adminWinnerAction(String(w._id), "verify").then(loadWinners)
                                }
                              >
                                Verify
                              </S.Action>
                              <S.Action
                                $ghost
                                onClick={() =>
                                  apiService
                                    .adminWinnerAction(String(w._id), "publish")
                                    .then(() => {
                                      toast.success("Published + notify queued");
                                      loadWinners();
                                    })
                                }
                              >
                                Publish
                              </S.Action>
                              <S.Action
                                $ghost
                                onClick={() =>
                                  askConfirm({
                                    title: "Disqualify winner?",
                                    message: `${String(w.displayName)} will be marked disqualified.`,
                                    confirmLabel: "Disqualify",
                                    danger: true,
                                    onConfirm: async () => {
                                      setConfirmDlg(null);
                                      await withBusy("Updating…", async () => {
                                        await apiService.adminWinnerAction(String(w._id), "disqualify");
                                        await loadWinners();
                                      });
                                    },
                                  })
                                }
                              >
                                DQ
                              </S.Action>
                              <S.Action
                                $danger
                                onClick={() =>
                                  askConfirm({
                                    title: "Delete winner?",
                                    message: "This winner record will be removed permanently.",
                                    confirmLabel: "Delete",
                                    danger: true,
                                    onConfirm: async () => {
                                      setConfirmDlg(null);
                                      await withBusy("Deleting…", async () => {
                                        await apiService.adminDeleteWinner(String(w._id));
                                        await loadWinners();
                                      });
                                    },
                                  })
                                }
                              >
                                Delete
                              </S.Action>
                            </S.Actions>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "draw" && (
          <>
            <S.PageHead>
              <div>
                <h1>Run draw</h1>
                <p>1 grand + 2 secondary from the ticket pool.</p>
              </div>
            </S.PageHead>
            <S.DrawHero>
              <h2>Draw console</h2>
              <p>
                Eligible tickets: <strong>{Number(drawPreview?.eligibleEntries || 0)}</strong> · Distinct people:{" "}
                <strong>{Number(drawPreview?.distinctEntrants || 0)}</strong>
                {drawPreview?.drawAlreadyRun ? " · Draw already run — re-run blocked." : ""}
              </p>
              <S.Action
                onClick={() =>
                  askConfirm({
                    title: "Run official draw?",
                    message: "This selects 1 grand + 2 secondary winners from the ticket pool. It cannot be undone.",
                    confirmLabel: "Run draw",
                    danger: true,
                    onConfirm: async () => {
                      setConfirmDlg(null);
                      await withBusy("Running draw…", async () => {
                        await apiService.adminRunDraw();
                        toast.success("Draw complete — winners pending verification");
                        await loadDrawPreview();
                        await loadDrawWinners();
                      });
                    },
                  })
                }
                disabled={Boolean(drawPreview?.drawAlreadyRun)}
              >
                <FaDice /> Run official draw
              </S.Action>
            </S.DrawHero>
            <S.Panel>
              <h2>Grand & secondary winners</h2>
              <p className="sub">Verify on the Winners tab before publishing.</p>
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      <th>Winner</th>
                      <th>Tier</th>
                      <th>Status</th>
                      <th>Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {winners.filter((w) => ["grand", "secondary"].includes(String(w.tier))).length === 0 ? (
                      <tr>
                        <td colSpan={4}>
                          <S.Empty>
                            <strong>No draw winners yet</strong>
                            Run the draw when the campaign is ready.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      winners
                        .filter((w) => ["grand", "secondary"].includes(String(w.tier)))
                        .map((w) => (
                          <tr key={String(w._id)}>
                            <td>
                              <strong>{String(w.displayName)}</strong>
                            </td>
                            <td>
                              <S.Badge $tone="info">{String(w.tier)}</S.Badge>
                            </td>
                            <td>
                              <S.Badge
                                $tone={
                                  String(w.status) === "published"
                                    ? "ok"
                                    : String(w.status) === "pending_verification"
                                      ? "warn"
                                      : "neutral"
                                }
                              >
                                {String(w.status).replace(/_/g, " ")}
                              </S.Badge>
                            </td>
                            <td>{String(w.prizeLabel)}</td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
            </S.Panel>
          </>
        )}

        {view === "social" && (
          <>
            <S.PageHead>
              <div>
                <h1>Social</h1>
                <p>Embeds for the public Social page.</p>
              </div>
              <S.Action onClick={() => setModal("social")}>Add post</S.Action>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search URL or caption…"
                  value={socialSearch}
                  onChange={(e) => setSocialSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSocialPage(1);
                  }}
                />
                <S.Select
                  value={socialPlatform}
                  onChange={(e) => {
                    setSocialPlatform(e.target.value);
                    setSocialPage(1);
                  }}
                  aria-label="Platform"
                >
                  <option value="">All platforms</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                  <option value="other">Other</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setSocialPage(1)}>Search</S.Action>
                  {bulkDeleteBtn(
                    "Remove selected posts?",
                    "These embeds will be removed from the public Social page.",
                    (ids) => apiService.adminBulkDeleteSocial(ids),
                    loadSocial
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(socialMeta, setSocialPage, "posts")}
              {socialPosts.length === 0 ? (
                <S.Empty>
                  <strong>No posts yet</strong>
                  Add campaign social URLs to populate the public feed.
                </S.Empty>
              ) : (
                <S.TableWrap>
                  <S.Table>
                    <thead>
                      <tr>
                        {checkTh(selectableIds(socialPosts))}
                        <th>Post</th>
                        <th>Caption</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {socialPosts.map((p) => (
                        <tr key={String(p._id)}>
                          {checkTd(String(p._id))}
                          <td style={{ maxWidth: 320, wordBreak: "break-all" }}>
                            <S.Muted>{String(p.embedUrl)}</S.Muted>
                            {p.platform ? <S.CellMeta>{String(p.platform)}</S.CellMeta> : null}
                          </td>
                          <td>{String(p.caption || "—")}</td>
                          <td>
                            <S.Action
                              $danger
                              onClick={() =>
                                askConfirm({
                                  title: "Remove social post?",
                                  message: "This embed will be removed from the public Social page.",
                                  confirmLabel: "Remove",
                                  danger: true,
                                  onConfirm: async () => {
                                    setConfirmDlg(null);
                                    await withBusy("Removing…", async () => {
                                      await apiService.adminDeleteSocial(String(p._id));
                                      await loadSocial();
                                    });
                                  },
                                })
                              }
                            >
                              Remove
                            </S.Action>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </S.Table>
                </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "contact" && (
          <>
            <S.PageHead>
              <div>
                <h1>Inbox</h1>
                <p>Contact form messages.</p>
              </div>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search name, email, or message…"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setContactPage(1);
                  }}
                />
                <S.Select
                  value={contactUnread ? "unread" : ""}
                  onChange={(e) => {
                    setContactUnread(e.target.value === "unread");
                    setContactPage(1);
                  }}
                >
                  <option value="">All messages</option>
                  <option value="unread">Unread only</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setContactPage(1)}>Search</S.Action>
                  {bulkDeleteBtn(
                    "Delete selected messages?",
                    "These contact messages will be removed.",
                    (ids) => apiService.adminBulkDeleteContact(ids),
                    loadContact
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(contactMeta, setContactPage, "messages")}
              {loading ? (
                contactShimmer()
              ) : messages.length === 0 ? (
                <S.Empty>
                  <strong>Inbox empty</strong>
                  New contact form submissions will land here.
                </S.Empty>
              ) : (
                <S.TableWrap>
                  <S.Table>
                    <thead>
                      <tr>
                        {checkTh(selectableIds(messages))}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>When</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((m) => (
                        <tr key={String(m._id)}>
                          {checkTd(String(m._id))}
                          <td>
                            <strong>{String(m.name)}</strong>
                          </td>
                          <td>
                            <S.Muted>{String(m.email || "—")}</S.Muted>
                          </td>
                          <td style={{ whiteSpace: "normal", maxWidth: 360 }}>
                            {String(m.message)}
                          </td>
                          <td>
                            <S.Badge $tone={m.isRead ? "neutral" : "warn"}>{m.isRead ? "Read" : "New"}</S.Badge>
                          </td>
                          <td>
                            <S.Muted>{fmtWhen(m.createdAt)}</S.Muted>
                          </td>
                          <td>
                            <S.Actions>
                              {!m.isRead && (
                                <S.Action
                                  $ghost
                                  onClick={() =>
                                    apiService.adminMarkContactRead(String(m._id)).then(loadContact)
                                  }
                                >
                                  Mark read
                                </S.Action>
                              )}
                              <S.IconBtn
                                $tone="delete"
                                title="Delete"
                                onClick={() =>
                                  askConfirm({
                                    title: "Delete message?",
                                    message: "This contact message will be removed.",
                                    confirmLabel: "Delete",
                                    danger: true,
                                    onConfirm: async () => {
                                      setConfirmDlg(null);
                                      await withBusy("Deleting…", async () => {
                                        await apiService.adminDeleteContact(String(m._id));
                                        await loadContact();
                                      });
                                    },
                                  })
                                }
                              >
                                <FaTrash />
                              </S.IconBtn>
                            </S.Actions>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </S.Table>
                </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}

        {view === "audit" && (
          <>
            <S.PageHead>
              <div>
                <h1>Audit</h1>
                <p>Activity log + CSV exports.</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <S.Action $ghost onClick={() => download("users")}>
                  <FaDownload /> Users
                </S.Action>
                <S.Action $ghost onClick={() => download("entries")}>
                  <FaDownload /> Tickets
                </S.Action>
                <S.Action $ghost onClick={() => download("winners")}>
                  <FaDownload /> Winners
                </S.Action>
              </div>
            </S.PageHead>
            <S.Panel>
              <S.Toolbar>
                <S.SearchInput
                  placeholder="Search events…"
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setAuditPage(1);
                  }}
                />
                <S.Select
                  value={auditActorType}
                  onChange={(e) => {
                    setAuditActorType(e.target.value);
                    setAuditPage(1);
                  }}
                  aria-label="Actor type"
                >
                  <option value="">All actors</option>
                  <option value="admin">Admin</option>
                  <option value="entrant">Users / guests</option>
                  <option value="system">System</option>
                </S.Select>
                <S.ToolbarActions>
                  <S.Action onClick={() => setAuditPage(1)}>Search</S.Action>
                  {bulkDeleteBtn(
                    "Delete selected events?",
                    "These audit log rows will be removed.",
                    (ids) => apiService.adminBulkDeleteAudit(ids),
                    loadAudit
                  )}
                </S.ToolbarActions>
              </S.Toolbar>
              {renderPager(auditMeta, setAuditPage, "events")}
              {loading ? (
                auditShimmer()
              ) : (
              <S.TableWrap>
                <S.Table>
                  <thead>
                    <tr>
                      {checkTh(selectableIds(audit))}
                      <th>Event</th>
                      <th>Actor</th>
                      <th>Role</th>
                      <th>Target</th>
                      <th>Code</th>
                      <th>Tier</th>
                      <th>Detail</th>
                      <th>When</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.length === 0 ? (
                      <tr>
                        <td colSpan={10}>
                          <S.Empty>
                            <strong>No audit events</strong>
                            Admin actions will appear here.
                          </S.Empty>
                        </td>
                      </tr>
                    ) : (
                      audit.map((a) => (
                        <tr key={String(a._id)}>
                          {checkTd(String(a._id))}
                          <td>
                            <strong>{String(a.eventLabel || a.action)}</strong>
                          </td>
                          <td>
                            <strong>{String(a.actorName || "—")}</strong>
                            {a.actorPhone ? <S.CellMeta>{String(a.actorPhone)}</S.CellMeta> : null}
                          </td>
                          <td>
                            <S.Badge
                              $tone={
                                a.actorRoleLabel === "Admin"
                                  ? "info"
                                  : a.actorRoleLabel === "Account"
                                    ? "ok"
                                    : a.actorRoleLabel === "Guest"
                                      ? "neutral"
                                      : "neutral"
                              }
                            >
                              {String(a.actorRoleLabel || a.actorType || "System")}
                            </S.Badge>
                          </td>
                          <td>{String(a.target || "—")}</td>
                          <td>
                            {a.code && a.code !== "—" ? <code>{String(a.code)}</code> : <S.Muted>—</S.Muted>}
                          </td>
                          <td>
                            {a.tier && a.tier !== "—" ? (
                              <S.Badge $tone="info">{String(a.tier)}</S.Badge>
                            ) : (
                              <S.Muted>—</S.Muted>
                            )}
                          </td>
                          <td>
                            <S.Muted>{String(a.detail || "—")}</S.Muted>
                          </td>
                          <td>
                            <S.Muted>{fmtWhen(a.createdAt)}</S.Muted>
                          </td>
                          <td>
                            <S.IconBtn
                              $tone="delete"
                              title="Delete"
                              onClick={() =>
                                askConfirm({
                                  title: "Delete event?",
                                  message: "This audit log row will be removed.",
                                  confirmLabel: "Delete",
                                  danger: true,
                                  onConfirm: async () => {
                                    setConfirmDlg(null);
                                    await withBusy("Deleting…", async () => {
                                      await apiService.adminDeleteAudit(String(a._id));
                                      await loadAudit();
                                    });
                                  },
                                })
                              }
                            >
                              <FaTrash />
                            </S.IconBtn>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </S.Table>
              </S.TableWrap>
              )}
            </S.Panel>
          </>
        )}
      </S.Main>

      {modal === "import" && (
        <S.ModalBackdrop onClick={() => setModal(null)}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>Import codes</h2>
            <p className="sub">
              CSV of GRAND PRIZE ENTRY Print Text/Code only. Instant-win skipped.
            </p>
            <S.FileRow>
              <label htmlFor="codes-csv-modal">
                <FaUpload /> Choose CSV file
                <input
                  id="codes-csv-modal"
                  type="file"
                  accept=".csv,text/csv,.txt"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      const text = await file.text();
                      const parsed = parseCodesFromCsv(text);
                      if (!parsed.length) {
                        toast.error("No valid grand-prize codes found in that file");
                        return;
                      }
                      setCsv(parsed.join("\n"));
                      setCsvFileName(`${file.name} · ${parsed.length} codes`);
                      toast.info(`Loaded ${parsed.length} codes from ${file.name}`);
                    } catch {
                      toast.error("Could not read that file");
                    } finally {
                      e.target.value = "";
                    }
                  }}
                />
              </label>
              {csvFileName ? (
                <span>{csvFileName}</span>
              ) : (
                <span>No file selected</span>
              )}
            </S.FileRow>
            {csv && (
              <S.Summary>
                Ready to import {csv.split("\n").filter(Boolean).length} codes
              </S.Summary>
            )}
            <S.ModalActions>
              <S.Action $ghost onClick={() => setModal(null)}>
                Cancel
              </S.Action>
              <S.Action
                onClick={async () => {
                  const codes = parseCodesFromCsv(csv);
                  if (!codes.length) {
                    toast.error("Choose a CSV file first");
                    return;
                  }
                  setModal(null);
                  await withBusy("Importing codes…", async () => {
                    const res = (await apiService.adminImportCodes(codes.join("\n"), `ui-${Date.now()}`)) as {
                      inserted: number;
                      skipped: number;
                    };
                    toast.success(`Inserted ${res.inserted}, skipped ${res.skipped}`);
                    setCsv("");
                    setCsvFileName("");
                    await loadStats();
                    await loadCodesList();
                  });
                }}
              >
                <FaUpload /> Import codes
              </S.Action>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalBackdrop>
      )}

      {modal === "instant" && (
        <S.ModalBackdrop onClick={() => setModal(null)}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>Add instant win</h2>
            <p className="sub">Shown on the public Winners page after publish.</p>
            <S.FormGrid>
              <S.Input
                placeholder="Display name"
                value={instantName}
                onChange={(e) => setInstantName(e.target.value)}
              />
              <S.Input
                placeholder="Prize label"
                value={instantPrize}
                onChange={(e) => setInstantPrize(e.target.value)}
              />
            </S.FormGrid>
            <S.FileLabel>
              <FaUpload />
              {instantPhoto ? (
                <span>
                  Photo: <strong>{instantPhoto.name}</strong>
                </span>
              ) : (
                <span>
                  Optional photo · <strong>Choose file</strong>
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setInstantPhoto(e.target.files?.[0] || null)}
              />
            </S.FileLabel>
            <S.ModalActions>
              <S.Action $ghost onClick={() => setModal(null)}>
                Cancel
              </S.Action>
              <S.Action
                onClick={async () => {
                  if (!instantName.trim() || !instantPrize.trim()) {
                    toast.error("Name and prize required");
                    return;
                  }
                  const form = new FormData();
                  form.append("displayName", instantName.trim());
                  form.append("prizeLabel", instantPrize.trim());
                  form.append("status", "published");
                  if (instantPhoto) form.append("photo", instantPhoto);
                  setModal(null);
                  await withBusy("Publishing…", async () => {
                    await apiService.adminCreateInstant(form);
                    toast.success("Instant winner published");
                    setInstantName("");
                    setInstantPrize("");
                    setInstantPhoto(null);
                    await loadWinners();
                  });
                }}
              >
                Publish
              </S.Action>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalBackdrop>
      )}

      {modal === "social" && (
        <S.ModalBackdrop onClick={() => setModal(null)}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h2>Add post</h2>
            <p className="sub">
              Paste a public post URL (Share → Copy link is fine, including facebook.com/share/p/…). It appears on the site Social feed.
            </p>
            <S.FormGrid style={{ gridTemplateColumns: "1fr" }}>
              <S.Input
                style={{ width: "100%", flex: "1 1 auto", minWidth: 0 }}
                placeholder="https://www.instagram.com/p/…"
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
              />
              <S.Input
                style={{ width: "100%", flex: "1 1 auto", minWidth: 0 }}
                placeholder="Caption (optional)"
                value={socialCaption}
                onChange={(e) => setSocialCaption(e.target.value)}
              />
            </S.FormGrid>
            {socialUrl.trim() ? (
              <p className="sub" style={{ marginTop: 8 }}>
                Detected: {detectSocialPlatform(socialUrl)}
              </p>
            ) : null}
            <S.ModalActions>
              <S.Action $ghost onClick={() => setModal(null)}>
                Cancel
              </S.Action>
              <S.Action
                onClick={async () => {
                  if (!socialUrl.trim()) {
                    toast.error("URL required");
                    return;
                  }
                  const payload = {
                    platform: detectSocialPlatform(socialUrl),
                    embedUrl: socialUrl.trim(),
                    caption: socialCaption.trim(),
                  };
                  setModal(null);
                  await withBusy("Adding post…", async () => {
                    await apiService.adminCreateSocial(payload);
                    setSocialUrl("");
                    setSocialCaption("");
                    toast.success("Post added");
                    await loadSocial();
                  });
                }}
              >
                Add post
              </S.Action>
            </S.ModalActions>
          </S.ModalCard>
        </S.ModalBackdrop>
      )}

      {busy && (
        <S.BusyOverlay>
          <S.BusyCard>
            <S.Spinner />
            <span>{busy}</span>
          </S.BusyCard>
        </S.BusyOverlay>
      )}

      {confirmDlg && (
        <S.ModalBackdrop onClick={() => setConfirmDlg(null)}>
          <S.ConfirmCard onClick={(e) => e.stopPropagation()}>
            <h2>{confirmDlg.title}</h2>
            <p>{confirmDlg.message}</p>
            <S.ModalActions>
              <S.Action $ghost onClick={() => setConfirmDlg(null)}>
                Cancel
              </S.Action>
              <S.Action
                $danger={confirmDlg.danger}
                onClick={() => void confirmDlg.onConfirm()}
              >
                {confirmDlg.confirmLabel || "Confirm"}
              </S.Action>
            </S.ModalActions>
          </S.ConfirmCard>
        </S.ModalBackdrop>
      )}
    </S.Shell>
  );
};

export default AdminDashboard;
