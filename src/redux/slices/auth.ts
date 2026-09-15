import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  username: string | null;
  role: string | null;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  if (token && userId && username) {
    return { isLoggedIn: true, token, userId, username, role: role || null };
  }

  return { isLoggedIn: false, token: null, userId: null, username: null, role: null };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userId: string; username: string; role?: string }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.role = action.payload.role || null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("role", action.payload.role || "");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.username = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
