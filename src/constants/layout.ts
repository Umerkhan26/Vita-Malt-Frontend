import { css } from "styled-components";

/** Comfortable width for laptop / standard screens */
export const CONTENT_MAX = "1120px";

/** Wide monitors only (true desktop) */
export const CONTENT_MAX_DESKTOP = "1320px";
export const CONTENT_MAX_WIDE = "1400px";

/** Side gutters — generous on phones (primary use) */
export const CONTENT_PAD = "clamp(22px, 5.5vw, 28px)";
export const CONTENT_PAD_MOBILE = "22px";
export const CONTENT_PAD_DESKTOP = "clamp(24px, 3vw, 40px)";

/** Apply to any centered content column — laptop first, widen only on large desktops */
export const contentWidth = css`
  width: 100%;
  max-width: ${CONTENT_MAX};
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1536px) {
    max-width: ${CONTENT_MAX_DESKTOP};
  }

  @media (min-width: 1720px) {
    max-width: ${CONTENT_MAX_WIDE};
  }
`;

/** Horizontal page gutters — never zero these out with padding shorthand */
export const contentPadX = css`
  padding-left: ${CONTENT_PAD};
  padding-right: ${CONTENT_PAD};

  @media (max-width: 900px) {
    padding-left: ${CONTENT_PAD_MOBILE};
    padding-right: ${CONTENT_PAD_MOBILE};
  }

  @media (max-width: 480px) {
    padding-left: 18px;
    padding-right: 18px;
  }

  @media (max-width: 360px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (min-width: 1536px) {
    padding-left: ${CONTENT_PAD_DESKTOP};
    padding-right: ${CONTENT_PAD_DESKTOP};
  }
`;
