import { createContext, useContext, useMemo, useState } from "react";

export type AuthModalMode = "signin" | "signup" | "forgot";

interface AuthModalContextValue {
  open: (mode?: AuthModalMode) => void;
  close: () => void;
  isOpen: boolean;
  mode: AuthModalMode;
  setMode: (mode: AuthModalMode) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>("signin");

  const value = useMemo(
    () => ({
      isOpen,
      mode,
      setMode,
      open: (next: AuthModalMode = "signin") => {
        setMode(next);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    [isOpen, mode]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
};
