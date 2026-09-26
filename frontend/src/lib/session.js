// The signed-in account lives in localStorage under the keys the app already uses.
const KEYS = ["token", "name", "type"];

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("type"); // "user" | "owner" | "admin"
export const getName = () => localStorage.getItem("name");

export function saveSession({ token, name, type }) {
  localStorage.setItem("token", token);
  localStorage.setItem("name", name ?? "");
  localStorage.setItem("type", type);
}

// Signs out without touching other preferences (e.g. the theme).
export function clearSession() {
  KEYS.forEach((k) => localStorage.removeItem(k));
}

export const loginPathFor = (role) =>
  role === "owner" ? "/seller/auth" : role === "admin" ? "/admin/auth" : "/user/auth";
