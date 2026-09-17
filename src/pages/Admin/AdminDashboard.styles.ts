import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/colors";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmerMove = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f3f5f4;
  width: 100%;
  overflow-x: hidden;
  font-size: 13px;
  color: #122018;
  -webkit-font-smoothing: antialiased;
`;

export const Sidebar = styled.aside<{ $open?: boolean }>`
  width: 200px;
  background:
    radial-gradient(circle at 12% 8%, rgba(243, 112, 33, 0.18), transparent 26%),
    linear-gradient(165deg, ${COLORS.redDeep} 0%, #082d20 52%, ${COLORS.redDark} 100%);
  color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0 auto 0 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.25s ease;
  border-right: 1px solid rgba(243, 112, 33, 0.22);
  box-shadow: 10px 0 30px rgba(0, 56, 32, 0.12);

  @media (max-width: 900px) {
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
    width: min(220px, 86vw);
  }
`;

export const SidebarHeader = styled.div`
  padding: 14px 12px 12px;
  border-bottom: 1px solid rgba(243, 112, 33, 0.2);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.1));

  span {
    display: block;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.58);
    font-weight: 700;
    margin-bottom: 3px;
  }

  strong {
    font-size: 13px;
    letter-spacing: -0.02em;
    display: block;
    line-height: 1.25;
    font-weight: 800;
  }
`;

export const SidebarMenu = styled.nav`
  padding: 8px 6px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const MenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 9px;
  text-align: left;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255,255,255,0.72)")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(90deg, rgba(243,112,33,0.2), rgba(255,255,255,0.1))"
      : "transparent"};
  border-radius: 6px;
  border-left: 2px solid ${({ $active }) => ($active ? COLORS.gold : "transparent")};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  font-size: 12.5px;
  transition: background 0.12s ease, color 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    background: linear-gradient(90deg, rgba(243, 112, 33, 0.12), rgba(255, 255, 255, 0.07));
    color: #fff;
  }

  svg {
    font-size: 12px;
    flex-shrink: 0;
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  }

  .count {
    margin-left: auto;
    font-size: 10px;
    font-weight: 700;
    background: rgba(243, 112, 33, 0.22);
    color: #fff;
    padding: 1px 6px;
    border-radius: 999px;
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 0 8px;
  margin-top: auto;
`;

export const LogoutBtn = styled.button`
  margin: 0 8px;
  padding: 7px 10px;
  background: transparent;
  border: 1px solid rgba(243, 112, 33, 0.32);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: rgba(243, 112, 33, 0.14);
    border-color: rgba(243, 112, 33, 0.58);
    color: #fff;
  }
`;

export const Overlay = styled.div<{ $open?: boolean }>`
  display: none;
  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 34, 20, 0.58);
    backdrop-filter: blur(3px);
    z-index: 999;
  }
`;

export const MobileToggle = styled.button`
  display: none;
  @media (max-width: 900px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 998;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: linear-gradient(145deg, ${COLORS.redDeep}, ${COLORS.red});
    color: white;
    box-shadow:
      inset 0 0 0 1px rgba(243, 112, 33, 0.42),
      0 6px 18px rgba(0, 56, 32, 0.3);
    cursor: pointer;
  }
`;

export const Main = styled.main`
  flex: 1;
  margin-left: 200px;
  padding: 16px 18px 28px;
  min-height: 100vh;
  width: calc(100% - 200px);
  box-sizing: border-box;
  animation: ${fadeUp} 0.2s ease;

  @media (max-width: 900px) {
    margin-left: 0;
    width: 100%;
    padding: 52px 12px 20px;
  }
`;

export const PageHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;

  h1 {
    font-size: 15px;
    color: ${COLORS.redDeep};
    letter-spacing: -0.02em;
    line-height: 1.15;
    font-weight: 800;
  }

  p {
    font-size: 12px;
    color: #5c6b62;
    margin-top: 2px;
    font-weight: 500;
  }
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Kpi = styled.div<{ $accent?: string }>`
  background: linear-gradient(150deg, ${COLORS.white} 0%, #f7fcf8 100%);
  border-radius: 6px;
  padding: 6px 9px 7px;
  border: 1px solid rgba(0, 107, 63, 0.13);
  border-top: 2px solid ${({ $accent }) => $accent || COLORS.red};
  box-shadow:
    0 7px 18px rgba(0, 56, 32, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;

  &:hover {
    border-color: rgba(0, 107, 63, 0.24);
    box-shadow: 0 10px 24px rgba(0, 56, 32, 0.11);
    transform: translateY(-1px);
  }

  span {
    display: block;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 2px;
  }

  strong {
    display: block;
    font-size: 17px;
    letter-spacing: -0.03em;
    color: ${COLORS.ink};
    line-height: 1;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  small {
    display: block;
    margin-top: 3px;
    color: ${COLORS.muted};
    font-size: 10.5px;
    line-height: 1.25;
  }
`;

export const Panel = styled.section`
  background: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 16px;
  border: 1px solid #e4ebe6;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);

  h2 {
    font-size: 12.5px;
    margin-bottom: 0;
    color: ${COLORS.redDeep};
    letter-spacing: -0.01em;
    font-weight: 800;
  }

  .sub {
    font-size: 12px;
    color: #6a7a72;
    margin: 2px 0 10px;
    line-height: 1.4;
  }
`;

export const Split = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  table {
    min-width: 420px;
  }

  > section {
    margin-bottom: 0;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-bottom: 6px;
  padding: 0;
  background: transparent;
  border: none;

  > * {
    flex: 0 0 auto;
  }
`;

export const ToolbarActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-left: auto;
`;

export const Pager = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 10px;
  padding: 0;
  border: none;
  min-height: 32px;
  overflow-x: auto;

  @media (max-width: 720px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

export const PagerMeta = styled.span`
  font-size: 12px;
  color: #5c6b62;
  font-weight: 600;
  white-space: nowrap;
  margin-right: auto;
`;

export const PagerControls = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  width: 200px;
  max-width: 100%;
  flex: 0 0 auto;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid ${COLORS.line};
  background: linear-gradient(150deg, #ffffff, #f4faf6);
  font-size: 12px;
  color: ${COLORS.ink};
  height: 30px;
  box-sizing: border-box;

  &::placeholder {
    color: #84938a;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    background: #fff;
    box-shadow: 0 0 0 2px rgba(0, 107, 63, 0.13), 0 5px 14px rgba(0, 56, 32, 0.08);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

export const Input = SearchInput;

export const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: auto;
  min-width: 0;
  max-width: 100%;
  flex: 0 0 auto;
  height: 30px;
  padding: 0 28px 0 10px;
  border-radius: 6px;
  border: 1px solid ${COLORS.line};
  background-color: #f7fbf8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%235c6b62' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px 12px;
  font-weight: 600;
  font-size: 12px;
  color: ${COLORS.ink};
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    background-color: #fff;
    box-shadow: 0 0 0 2px rgba(0, 107, 63, 0.13), 0 5px 14px rgba(0, 56, 32, 0.08);
  }

  option {
    font-weight: 500;
  }
`;

export const Area = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid ${COLORS.line};
  background: linear-gradient(150deg, #fff, #f4faf6);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  margin-bottom: 6px;
`;

export const FileRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;

  label {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 6px 10px;
    border-radius: 6px;
    background: linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDark});
    color: ${COLORS.white};
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 0 5px 14px rgba(0, 77, 44, 0.16);

    input {
      display: none;
    }
  }

  span {
    font-size: 12px;
    color: #5c6b62;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 6px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FileLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px dashed rgba(0, 107, 63, 0.28);
  background: linear-gradient(145deg, #f3faf5, #eaf5ee);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #5c6b62;
  margin-bottom: 6px;
  input {
    display: none;
  }
  strong {
    color: ${COLORS.red};
  }
`;

export const Summary = styled.p`
  font-size: 11px;
  color: #6a7a72;
  margin-bottom: 4px;
  font-weight: 600;
`;

export const Check = styled.input.attrs({ type: "checkbox" })`
  width: 15px;
  height: 15px;
  margin: 0;
  accent-color: ${COLORS.red};
  cursor: pointer;
  vertical-align: middle;
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  overflow-y: visible;
  border-radius: 6px;
  border: 1px solid #e2e8e4;
  background: #fff;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  min-width: 720px;

  thead th {
    text-align: left;
    padding: 6px 10px;
    background: #f7faf8;
    color: #3d4a43;
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 700;
    white-space: nowrap;
    border-bottom: 1px solid #e2e8e4;
  }

  td {
    padding: 5px 10px;
    border-bottom: 1px solid #eef2ef;
    vertical-align: middle;
    background: #fff;
    color: ${COLORS.ink};
    max-width: 280px;
    line-height: 1.2;
    white-space: nowrap;
  }

  tbody tr:nth-child(even) td {
    background: #fbfcfc;
  }

  td strong {
    font-size: 12px;
    font-weight: 650;
    color: #122018;
  }

  td code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 11px;
    background: #f1f5f2;
    padding: 1px 5px;
    border-radius: 3px;
    color: #163127;
    font-weight: 650;
  }

  tbody tr:hover td {
    background: #f3f8f5;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export const Num = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  font-size: 12.5px;
  color: #0f2f22;
`;

export const Rank = styled.span<{ $top?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${({ $top }) =>
    $top ? "linear-gradient(145deg, #fff4e8, #ffe5c7)" : "linear-gradient(145deg, #eef6f1, #e5efe9)"};
  color: ${({ $top }) => ($top ? "#a85500" : "#5c6b62")};
  font-weight: 800;
  font-size: 10.5px;
  border: 1px solid ${({ $top }) => ($top ? "rgba(243,112,33,0.35)" : "rgba(0,107,63,0.08)")};
`;

export const CellMeta = styled.span`
  display: block;
  margin-top: 0;
  font-size: 10px;
  color: #7a8a80;
  font-weight: 500;
  line-height: 1.2;
`;

export const Muted = styled.span`
  color: #7a8a80;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 3px;
  align-items: center;
`;

export const Badge = styled.span<{ $tone?: "ok" | "warn" | "bad" | "info" | "neutral" | "gold" }>`
  display: inline-flex;
  align-items: center;
  padding: 0 5px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-transform: capitalize;
  white-space: nowrap;
  line-height: 1.55;
  background: ${({ $tone }) =>
    $tone === "ok"
      ? "linear-gradient(145deg, #e5f5eb, #d9efe2)"
      : $tone === "warn" || $tone === "gold"
        ? "linear-gradient(145deg, #fff4e8, #ffe5c7)"
        : $tone === "bad"
          ? "linear-gradient(145deg, #fff0ef, #fbe1df)"
          : $tone === "info"
            ? "linear-gradient(145deg, #e8f4ed, #dcece3)"
            : "linear-gradient(145deg, #f0f5f2, #e8efeb)"};
  color: ${({ $tone }) =>
    $tone === "ok"
      ? "#1a6b42"
      : $tone === "warn" || $tone === "gold"
        ? "#a85500"
        : $tone === "bad"
          ? "#b42318"
          : "#0f2f22"};
`;

export const Action = styled.button<{ $ghost?: boolean; $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 5px 9px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 11.5px;
  font-weight: 700;
  height: 28px;
  white-space: nowrap;
  color: ${({ $ghost, $danger }) => ($ghost ? "#122018" : $danger ? "#fff" : "#fff")};
  background: ${({ $ghost, $danger }) =>
    $ghost
      ? "linear-gradient(145deg, #fff, #f3f9f5)"
      : $danger
        ? "linear-gradient(135deg, #c62828, #9f1f1f)"
        : `linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDark})`};
  border: 1px solid
    ${({ $ghost, $danger }) => ($ghost ? COLORS.line : $danger ? "#b42318" : COLORS.red)};
  box-shadow: ${({ $ghost }) => ($ghost ? "none" : "0 5px 13px rgba(0, 77, 44, 0.14)")};
  transition: filter 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    filter: brightness(1.03);
    box-shadow: 0 7px 17px rgba(0, 77, 44, 0.2);
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const IconBtn = styled.button<{ $tone?: "view" | "block" | "delete" }>`
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $tone }) => ($tone === "delete" ? "#b42318" : $tone === "block" ? "#a85500" : COLORS.red)};
  font-size: 10px;
  font-weight: 700;
  background: ${({ $tone }) =>
    $tone === "block" ? "#fff1e0" : $tone === "delete" ? "#fdeceb" : "#e6f0eb"};
  border: 1px solid
    ${({ $tone }) => ($tone === "block" ? "#f0d2a8" : $tone === "delete" ? "#f0c4c2" : "#c5ddd0")};

  svg {
    flex-shrink: 0;
  }

  &:hover {
    filter: brightness(0.98);
    box-shadow: 0 4px 10px rgba(0, 56, 32, 0.1);
  }
`;

export const Empty = styled.div`
  text-align: center;
  padding: 18px 12px;
  color: #6a7a72;
  font-size: 12px;
  background:
    radial-gradient(circle at 1px 1px, rgba(0, 107, 63, 0.06) 1px, transparent 0) 0 0 / 18px 18px,
    linear-gradient(145deg, #f5faf6, #edf6f0);
  border-radius: 6px;
  border: 1px dashed rgba(0, 107, 63, 0.22);

  strong {
    display: block;
    color: #122018;
    margin-bottom: 3px;
    font-size: 12.5px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 6px;
`;

export const Chip = styled.span`
  display: inline-flex;
  padding: 3px 7px;
  border-radius: 5px;
  background: linear-gradient(145deg, #f3f9f5, #eaf3ed);
  border: 1px solid rgba(0, 107, 63, 0.12);
  font-size: 11px;
  font-weight: 600;
  color: #3d4a43;
`;

export const MsgCard = styled.div<{ $unread?: boolean }>`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid rgba(0, 107, 63, 0.12);
  border-left: 3px solid ${({ $unread }) => ($unread ? COLORS.gold : COLORS.line)};
  background: ${({ $unread }) =>
    $unread ? "linear-gradient(145deg, #fffaf5, #fff4e8)" : "linear-gradient(145deg, #fff, #f7fbf8)"};
  margin-bottom: 6px;
  box-shadow: 0 6px 16px rgba(0, 56, 32, 0.055);

  header {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    margin-bottom: 4px;
  }
  p {
    line-height: 1.4;
    font-size: 12.5px;
    color: #3d4a43;
  }
  time {
    color: #7a8a80;
    font-size: 11px;
    margin-left: auto;
  }
`;

export const DrawHero = styled.div`
  border-radius: 8px;
  padding: 12px 14px;
  color: white;
  background:
    radial-gradient(circle at 88% 18%, rgba(243, 112, 33, 0.3), transparent 28%),
    linear-gradient(135deg, ${COLORS.redDeep} 0%, ${COLORS.redDark} 54%, ${COLORS.red} 100%);
  margin-bottom: 8px;
  box-shadow:
    inset 0 0 0 1px rgba(243, 112, 33, 0.28),
    0 12px 28px rgba(0, 56, 32, 0.18);

  h2 {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 800;
  }
  p {
    opacity: 0.92;
    max-width: 640px;
    line-height: 1.4;
    margin-bottom: 10px;
    font-size: 12px;
  }
`;

export const SubTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 6px;
  padding: 2px;
  background: linear-gradient(145deg, #fff, #f1f8f3);
  border: 1px solid rgba(0, 107, 63, 0.14);
  border-radius: 6px;
  width: fit-content;
  max-width: 100%;
  box-shadow: 0 5px 14px rgba(0, 56, 32, 0.055);
`;

export const SubTab = styled.button<{ $active?: boolean }>`
  padding: 4px 9px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: ${({ $active }) =>
    $active ? `linear-gradient(135deg, ${COLORS.redDeep}, ${COLORS.red})` : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "#5c6b62")};

  &:hover {
    background: ${({ $active }) =>
      $active ? `linear-gradient(135deg, ${COLORS.redDeep}, ${COLORS.red})` : "#eaf5ee"};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 35, 20, 0.58);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  padding: 12px;
`;

export const ModalCard = styled.div`
  width: min(440px, 100%);
  background:
    radial-gradient(circle at 96% 4%, rgba(243, 112, 33, 0.09), transparent 24%),
    linear-gradient(150deg, ${COLORS.white}, #f7fcf8);
  border-radius: 8px;
  border: 1px solid rgba(0, 107, 63, 0.15);
  box-shadow:
    inset 0 3px 0 ${COLORS.gold},
    0 22px 54px rgba(0, 56, 32, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  padding: 12px 14px;
  max-height: min(90vh, 600px);
  overflow: auto;

  h2 {
    font-size: 14px;
    color: ${COLORS.redDeep};
    margin-bottom: 2px;
  }
  .sub {
    font-size: 12px;
    color: #5c6b62;
    margin-bottom: 10px;
    line-height: 1.35;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid ${COLORS.line};
`;

export const ShimmerBlock = styled.div<{ $h?: number; $w?: string; $r?: number }>`
  height: ${({ $h }) => $h || 12}px;
  width: ${({ $w }) => $w || "100%"};
  max-width: 100%;
  border-radius: ${({ $r }) => $r ?? 4}px;
  background: linear-gradient(90deg, #dfebe3 0%, #f6fbf7 40%, #dfebe3 80%);
  background-size: 200% 100%;
  animation: ${shimmerMove} 1.15s ease-in-out infinite;
`;

export const ShimmerActions = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const BusyOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3000;
  background: rgba(0, 35, 20, 0.4);
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;
`;

export const BusyCard = styled.div`
  background: linear-gradient(150deg, #fff, #f4faf6);
  border-radius: 12px;
  padding: 22px 28px;
  border: 1px solid rgba(0, 107, 63, 0.15);
  box-shadow:
    inset 0 3px 0 ${COLORS.gold},
    0 20px 50px rgba(0, 56, 32, 0.24);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 160px;

  span {
    font-size: 13px;
    font-weight: 700;
    color: ${COLORS.redDeep};
  }
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid #dceae1;
  border-top-color: ${COLORS.red};
  animation: ${spin} 0.7s linear infinite;
`;

export const ConfirmCard = styled.div`
  width: min(400px, 100%);
  background:
    radial-gradient(circle at 94% 6%, rgba(243, 112, 33, 0.09), transparent 25%),
    linear-gradient(150deg, ${COLORS.white}, #f7fcf8);
  border-radius: 10px;
  border: 1px solid rgba(0, 107, 63, 0.15);
  box-shadow:
    inset 0 3px 0 ${COLORS.gold},
    0 22px 54px rgba(0, 56, 32, 0.25);
  padding: 16px 16px 14px;

  h2 {
    font-size: 15px;
    color: ${COLORS.redDeep};
    margin-bottom: 6px;
    font-weight: 800;
  }

  p {
    font-size: 13px;
    color: #5c6b62;
    line-height: 1.45;
    margin-bottom: 14px;
  }
`;

/** Aliases used by existing JSX */
export const Page = Main;
export const Inner = styled.div``;
export const ModuleBar = styled.div`
  display: none;
`;
export const ModuleTab = styled.button`
  display: none;
`;

export const CampaignBanner = styled.div<{ $tone?: "upcoming" | "live" | "ended" }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid ${({ $tone }) =>
    $tone === "live" ? "rgba(0, 107, 63, 0.22)" : $tone === "ended" ? "rgba(180, 35, 24, 0.2)" : "rgba(243, 112, 33, 0.28)"};
  background: ${({ $tone }) =>
    $tone === "live"
      ? "linear-gradient(135deg, #e8f7ee, #f7fcf9)"
      : $tone === "ended"
        ? "linear-gradient(135deg, #fdeeee, #fff8f7)"
        : "linear-gradient(135deg, #fff6ea, #fffdf8)"};

  strong {
    display: block;
    font-size: 15px;
    color: ${COLORS.redDeep};
    font-weight: 800;
  }

  span {
    display: block;
    margin-top: 3px;
    font-size: 12.5px;
    color: #5c6b62;
  }
`;

export const ProgressTrack = styled.div`
  height: 10px;
  border-radius: 999px;
  background: #e6f0ea;
  overflow: hidden;
  margin: 8px 0 6px;
`;

export const ProgressFill = styled.i<{ $pct: number; $tone?: string }>`
  display: block;
  height: 100%;
  width: ${({ $pct }) => `${Math.min(100, Math.max(0, $pct))}%`};
  background: ${({ $tone }) => $tone || `linear-gradient(90deg, ${COLORS.red}, ${COLORS.gold})`};
  border-radius: 999px;
`;

export const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
  color: #5c6b62;
  font-weight: 600;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 0 0 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.button`
  text-align: left;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 107, 63, 0.12);
  background: linear-gradient(160deg, #fff, #f7fbf8);
  cursor: pointer;

  &:hover {
    border-color: rgba(0, 107, 63, 0.28);
    box-shadow: 0 8px 18px rgba(0, 56, 32, 0.08);
  }

  span {
    display: block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${COLORS.muted};
  }

  strong {
    display: block;
    margin-top: 4px;
    font-size: 22px;
    font-weight: 800;
    color: ${COLORS.redDeep};
    font-variant-numeric: tabular-nums;
  }

  small {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #5c6b62;
    line-height: 1.35;
  }
`;

export const CheckList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: #122018;
    line-height: 1.35;
  }

  b {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 11px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .ok {
    background: #d8f0e0;
    color: ${COLORS.red};
  }

  .wait {
    background: #fff0d8;
    color: #a85500;
  }
`;
