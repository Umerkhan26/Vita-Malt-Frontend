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
  background: #e6ebe8;
  width: 100%;
  overflow-x: hidden;
  font-size: 13px;
  color: #122018;
  -webkit-font-smoothing: antialiased;
`;

export const Sidebar = styled.aside<{ $open?: boolean }>`
  width: 200px;
  background: #0b241c;
  color: ${COLORS.white};
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0 auto 0 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.25s ease;
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 900px) {
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
    width: min(220px, 86vw);
  }
`;

export const SidebarHeader = styled.div`
  padding: 14px 12px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.12);

  span {
    display: block;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
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
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255,255,255,0.68)")};
  background: ${({ $active }) => ($active ? "rgba(255,255,255,0.12)" : "transparent")};
  border-radius: 6px;
  border-left: 2px solid ${({ $active }) => ($active ? COLORS.gold : "transparent")};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  font-size: 12.5px;
  transition: background 0.12s ease, color 0.12s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
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
    background: rgba(255, 255, 255, 0.12);
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
  border: 1px solid rgba(255, 255, 255, 0.18);
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
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
`;

export const Overlay = styled.div<{ $open?: boolean }>`
  display: none;
  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(15, 47, 34, 0.45);
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
    background: #0f2f22;
    color: white;
    box-shadow: 0 4px 12px rgba(15, 47, 34, 0.25);
    cursor: pointer;
  }
`;

export const Main = styled.main`
  flex: 1;
  margin-left: 200px;
  padding: 8px 12px 12px;
  min-height: 100vh;
  width: calc(100% - 200px);
  box-sizing: border-box;
  animation: ${fadeUp} 0.2s ease;

  @media (max-width: 900px) {
    margin-left: 0;
    width: 100%;
    padding: 46px 8px 12px;
  }
`;

export const PageHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 6px;

  h1 {
    font-size: 15px;
    color: #0f2f22;
    letter-spacing: -0.02em;
    line-height: 1.15;
    font-weight: 800;
  }

  p {
    display: none;
  }
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 6px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Kpi = styled.div<{ $accent?: string }>`
  background: ${COLORS.white};
  border-radius: 6px;
  padding: 6px 9px 7px;
  border: 1px solid #d5ded8;
  border-top: 2px solid ${({ $accent }) => $accent || COLORS.red};

  span {
    display: block;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #7a8a80;
    margin-bottom: 2px;
  }

  strong {
    display: block;
    font-size: 17px;
    letter-spacing: -0.03em;
    color: #122018;
    line-height: 1;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  small {
    display: block;
    margin-top: 3px;
    color: #6a7a72;
    font-size: 10.5px;
    line-height: 1.25;
  }
`;

export const Panel = styled.section`
  background: ${COLORS.white};
  border-radius: 6px;
  padding: 8px 10px;
  margin-bottom: 6px;
  border: 1px solid #d0d9d3;

  h2 {
    font-size: 12.5px;
    margin-bottom: 0;
    color: #0f2f22;
    letter-spacing: -0.01em;
    font-weight: 800;
  }

  .sub {
    display: none;
  }
`;

export const Split = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 6px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  table {
    min-width: 420px;
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
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid #e8eee9;
`;

export const SearchInput = styled.input`
  width: 200px;
  max-width: 100%;
  flex: 0 0 auto;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid #c5d0c9;
  background: #fff;
  font-size: 12px;
  color: #122018;
  height: 30px;
  box-sizing: border-box;

  &::placeholder {
    color: #8a9790;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    box-shadow: 0 0 0 2px rgba(0, 107, 63, 0.12);
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
  border: 1px solid #c5d0c9;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%235c6b62' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px 12px;
  font-weight: 600;
  font-size: 12px;
  color: #122018;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    box-shadow: 0 0 0 2px rgba(0, 107, 63, 0.12);
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
  border: 1px solid #c5d0c9;
  background: #fff;
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
    background: ${COLORS.red};
    color: ${COLORS.white};
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;

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
  border: 1px dashed #c5d0c9;
  background: #f3f6f4;
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

export const TableWrap = styled.div`
  overflow: auto;
  max-height: min(78vh, 820px);
  border-radius: 6px;
  border: 1px solid #d0d9d3;
  -webkit-overflow-scrolling: touch;
  background: #fff;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 12px;
  min-width: 560px;

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    text-align: left;
    padding: 5px 8px;
    background: #f4f7f5;
    color: #4d5c55;
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 800;
    white-space: nowrap;
    border-bottom: 1px solid #d0d9d3;
  }

  td {
    padding: 3px 8px;
    border-bottom: 1px solid #eef2f0;
    vertical-align: middle;
    background: #fff;
    color: #122018;
    max-width: 280px;
    line-height: 1.25;
  }

  tbody tr:nth-child(even) td {
    background: #fafbfa;
  }

  td strong {
    font-size: 12px;
    font-weight: 700;
    color: #0f2f22;
  }

  td code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 11px;
    background: #eef3f0;
    padding: 1px 4px;
    border-radius: 3px;
    color: #0f2f22;
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
  background: ${({ $top }) => ($top ? "#fff1e0" : "#eef2f0")};
  color: ${({ $top }) => ($top ? "#a85500" : "#5c6b62")};
  font-weight: 800;
  font-size: 10.5px;
  border: 1px solid ${({ $top }) => ($top ? "#f0d2a8" : "transparent")};
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
      ? "#e4f3ea"
      : $tone === "warn" || $tone === "gold"
        ? "#fff1e0"
        : $tone === "bad"
          ? "#fdeceb"
          : $tone === "info"
            ? "#e6f0eb"
            : "#eef2f0"};
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
  background: ${({ $ghost, $danger }) => ($ghost ? "#fff" : $danger ? "#b42318" : COLORS.red)};
  border: 1px solid
    ${({ $ghost, $danger }) => ($ghost ? "#c5d0c9" : $danger ? "#b42318" : COLORS.red)};

  &:hover {
    filter: brightness(0.97);
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
    filter: brightness(0.97);
  }
`;

export const Empty = styled.div`
  text-align: center;
  padding: 18px 12px;
  color: #6a7a72;
  font-size: 12px;
  background: #f3f6f4;
  border-radius: 6px;
  border: 1px dashed #d0dad4;

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
  background: #f3f6f4;
  border: 1px solid #e0e8e3;
  font-size: 11px;
  font-weight: 600;
  color: #3d4a43;
`;

export const MsgCard = styled.div<{ $unread?: boolean }>`
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #e0e8e3;
  border-left: 3px solid ${({ $unread }) => ($unread ? COLORS.gold : "#e0e8e3")};
  background: ${({ $unread }) => ($unread ? "#fffaf5" : "#fff")};
  margin-bottom: 6px;

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
  background: linear-gradient(135deg, #0c281e 0%, ${COLORS.red} 100%);
  margin-bottom: 8px;

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
  background: #fff;
  border: 1px solid #d5ded8;
  border-radius: 6px;
  width: fit-content;
  max-width: 100%;
`;

export const SubTab = styled.button<{ $active?: boolean }>`
  padding: 4px 9px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: ${({ $active }) => ($active ? "#0f2f22" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "#5c6b62")};

  &:hover {
    background: ${({ $active }) => ($active ? "#0f2f22" : "#f3f6f4")};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(15, 47, 34, 0.45);
  display: grid;
  place-items: center;
  padding: 12px;
`;

export const ModalCard = styled.div`
  width: min(440px, 100%);
  background: ${COLORS.white};
  border-radius: 8px;
  border: 1px solid #d5ded8;
  box-shadow: 0 16px 40px rgba(15, 47, 34, 0.2);
  padding: 12px 14px;
  max-height: min(90vh, 600px);
  overflow: auto;

  h2 {
    font-size: 14px;
    color: #122018;
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
  border-top: 1px solid #eef2f0;
`;

export const ShimmerBlock = styled.div<{ $h?: number; $w?: string; $r?: number }>`
  height: ${({ $h }) => $h || 12}px;
  width: ${({ $w }) => $w || "100%"};
  max-width: 100%;
  border-radius: ${({ $r }) => $r ?? 4}px;
  background: linear-gradient(90deg, #e8eee9 0%, #f5f8f6 40%, #e8eee9 80%);
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
  background: rgba(15, 47, 34, 0.28);
  display: grid;
  place-items: center;
`;

export const BusyCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 22px 28px;
  border: 1px solid #d0d9d3;
  box-shadow: 0 16px 40px rgba(15, 47, 34, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 160px;

  span {
    font-size: 13px;
    font-weight: 700;
    color: #0f2f22;
  }
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid #e4ebe7;
  border-top-color: ${COLORS.red};
  animation: ${spin} 0.7s linear infinite;
`;

export const ConfirmCard = styled.div`
  width: min(400px, 100%);
  background: ${COLORS.white};
  border-radius: 10px;
  border: 1px solid #d0d9d3;
  box-shadow: 0 16px 40px rgba(15, 47, 34, 0.22);
  padding: 16px 16px 14px;

  h2 {
    font-size: 15px;
    color: #0f2f22;
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
