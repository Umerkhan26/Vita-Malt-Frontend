import { useState, type CSSProperties, type InputHTMLAttributes } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { COLORS } from "../../constants/colors";

const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

const Field = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 42px 12px 14px;
  border-radius: 12px;
  border: 1px solid ${COLORS.line};
  background: ${COLORS.paper};
  font-size: 16px;
  min-height: 48px;
  color: ${COLORS.ink};
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    outline: none;
    border-color: ${COLORS.red};
    box-shadow: 0 0 0 3px rgba(0, 107, 63, 0.12);
  }
`;

const Toggle = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${COLORS.muted};
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    color: ${COLORS.ink};
    background: rgba(0, 0, 0, 0.04);
  }

  svg {
    font-size: 15px;
  }
`;

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  wrapClassName?: string;
  wrapStyle?: CSSProperties;
};

/** Password field with show / hide toggle. */
const PasswordInput: React.FC<Props> = ({ wrapClassName, wrapStyle, className, style, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <Wrap className={wrapClassName} style={wrapStyle}>
      <Field
        {...props}
        className={className}
        style={style}
        type={show ? "text" : "password"}
        autoComplete={props.autoComplete || "current-password"}
      />
      <Toggle
        type="button"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((v) => !v)}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </Toggle>
    </Wrap>
  );
};

export default PasswordInput;
