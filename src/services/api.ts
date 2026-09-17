const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const request = async <T>(path: string, options: RequestInit = {}, auth = false): Promise<T> => {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 401 && auth) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data as T;
};

export const apiService = {
  submitCode: (body: Record<string, unknown>) =>
    request("/submit-code", { method: "POST", body: JSON.stringify(body) }, true),
  lookupEntries: (body: Record<string, unknown>) =>
    request("/lookup-entries", { method: "POST", body: JSON.stringify(body) }),
  dashboard: () => request("/me/dashboard", {}, true),
  login: (identifier: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ identifier, password }) }),
  register: (body: Record<string, unknown>) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  optionalRegister: (body: Record<string, unknown>) =>
    request("/auth/register-optional", { method: "POST", body: JSON.stringify(body) }, true),
  verifyOtp: (email: string, otp: string) =>
    request("/auth/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }) }),
  resendOtp: (email: string) =>
    request("/auth/resend-otp", { method: "POST", body: JSON.stringify({ email }) }),
  forgotPassword: (email: string) =>
    request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  verifyResetOtp: (email: string, otp: string) =>
    request("/auth/verify-reset-otp", { method: "POST", body: JSON.stringify({ email, otp }) }),
  resetPassword: (payload: { token?: string; email?: string; otp?: string; password: string }) =>
    request("/auth/reset-password", { method: "POST", body: JSON.stringify(payload) }),
  winners: () => request("/winners"),
  social: () => request("/social"),
  contact: (body: Record<string, unknown>) =>
    request("/contact", { method: "POST", body: JSON.stringify(body) }),
  adminLogin: (identifier: string, password: string) =>
    request("/admin/login", { method: "POST", body: JSON.stringify({ identifier, password }) }),
  adminEntrants: (page = 1, limit = 100, search = "", accountType = "", status = "", sortBy = "codes", minCodes = 0) =>
    request(
      `/admin/entrants?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${
        accountType ? `&accountType=${encodeURIComponent(accountType)}` : ""
      }${status ? `&status=${encodeURIComponent(status)}` : ""}${
        sortBy ? `&sortBy=${encodeURIComponent(sortBy)}` : ""
      }${minCodes > 0 ? `&minCodes=${minCodes}` : ""}`,
      {},
      true
    ),
  adminEntrant: (id: string) => request(`/admin/entrants/${id}`, {}, true),
  adminBlock: (id: string) => request(`/admin/entrants/${id}/block`, { method: "PATCH" }, true),
  adminUnblock: (id: string) => request(`/admin/entrants/${id}/unblock`, { method: "PATCH" }, true),
  adminDeleteEntrant: (id: string) => request(`/admin/entrants/${id}`, { method: "DELETE" }, true),
  adminBulkDeleteEntrants: (ids: string[]) =>
    request("/admin/entrants/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }, true),
  adminImportCodes: (csv: string, batch?: string) =>
    request("/admin/codes/import", { method: "POST", body: JSON.stringify({ csv, batch }) }, true),
  adminCodeStats: () => request("/admin/codes/stats", {}, true),
  adminCodes: (page = 1, search = "", status = "", limit = 100) =>
    request(
      `/admin/codes?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${status ? `&status=${encodeURIComponent(status)}` : ""}`,
      {},
      true
    ),
  adminSubmissions: (page = 1, result = "", search = "", limit = 100) =>
    request(
      `/admin/submissions?page=${page}&limit=${limit}${result ? `&result=${encodeURIComponent(result)}` : ""}&search=${encodeURIComponent(search)}`,
      {},
      true
    ),
  adminDeleteSubmission: (id: string) => request(`/admin/submissions/${id}`, { method: "DELETE" }, true),
  adminBulkDeleteSubmissions: (ids: string[]) =>
    request("/admin/submissions/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }, true),
  adminFlagged: (page = 1, search = "", kind = "", limit = 100) =>
    request(
      `/admin/codes/flagged?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${
        kind ? `&kind=${encodeURIComponent(kind)}` : ""
      }`,
      {},
      true
    ),
  adminWinners: (page = 1, search = "", status = "", limit = 100, tier = "") =>
    request(
      `/admin/winners?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${
        status ? `&status=${encodeURIComponent(status)}` : ""
      }${tier ? `&tier=${encodeURIComponent(tier)}` : ""}`,
      {},
      true
    ),
  adminCreateInstant: (form: FormData) => request("/admin/winners/instant", { method: "POST", body: form }, true),
  adminWinnerAction: (id: string, action: string, notes?: string) =>
    request(`/admin/winners/${id}/action`, { method: "POST", body: JSON.stringify({ action, notes }) }, true),
  adminDeleteWinner: (id: string) => request(`/admin/winners/${id}`, { method: "DELETE" }, true),
  adminRunDraw: () => request("/admin/draw/run", { method: "POST" }, true),
  adminContact: (page = 1, search = "", unread = false, limit = 100) =>
    request(
      `/admin/contact?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${unread ? "&unread=1" : ""}`,
      {},
      true
    ),
  adminSocial: (page = 1, search = "", limit = 100, platform = "") =>
    request(
      `/admin/social?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${
        platform ? `&platform=${encodeURIComponent(platform)}` : ""
      }`,
      {},
      true
    ),
  adminCreateSocial: (body: Record<string, unknown>) =>
    request("/admin/social", { method: "POST", body: JSON.stringify(body) }, true),
  adminDeleteSocial: (id: string) => request(`/admin/social/${id}`, { method: "DELETE" }, true),
  adminBulkDeleteSocial: (ids: string[]) =>
    request("/admin/social/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }, true),
  adminOverview: () => request("/admin/overview", {}, true),
  adminAudit: (page = 1, search = "", limit = 100, actorType = "") =>
    request(
      `/admin/audit?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${
        actorType ? `&actorType=${encodeURIComponent(actorType)}` : ""
      }`,
      {},
      true
    ),
  adminDrawPreview: () => request("/admin/draw/preview", {}, true),
  adminDrawEntries: (page = 1, search = "", limit = 100, winner = "") =>
    request(
      `/admin/draw/entries?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}${
        winner ? `&winner=${encodeURIComponent(winner)}` : ""
      }`,
      {},
      true
    ),
  adminDeleteDrawEntry: (id: string) => request(`/admin/draw/entries/${id}`, { method: "DELETE" }, true),
  adminBulkDeleteDrawEntries: (ids: string[]) =>
    request("/admin/draw/entries/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }, true),
  adminMarkContactRead: (id: string) => request(`/admin/contact/${id}/read`, { method: "PATCH" }, true),
  adminDeleteContact: (id: string) => request(`/admin/contact/${id}`, { method: "DELETE" }, true),
  adminBulkDeleteContact: (ids: string[]) =>
    request("/admin/contact/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }, true),
  adminDeleteAudit: (id: string) => request(`/admin/audit/${id}`, { method: "DELETE" }, true),
  adminBulkDeleteAudit: (ids: string[]) =>
    request("/admin/audit/bulk-delete", { method: "POST", body: JSON.stringify({ ids }) }, true),
  exportEntriesUrl: () => `${API_URL}/admin/export/entries`,
  exportWinnersUrl: () => `${API_URL}/admin/export/winners`,
  exportEntrantsUrl: () => `${API_URL}/admin/export/entrants`,
};
