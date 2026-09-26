import axios from "axios";
import { clearSession, getRole, getToken, loginPathFor } from "./session.js";

let installed = false;

// Adds app-wide behaviour to the default axios instance, so every existing call benefits.
export function setupApi() {
  if (installed) return;
  installed = true;

  axios.interceptors.request.use((config) => {
    const token = getToken();
    const hasAuth = config.headers?.Authorization || config.headers?.authorization;
    if (token && !hasAuth) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // A signed-in request was rejected (e.g. a token from before roles existed): sign in again.
      if (error.response?.status === 401 && getToken()) {
        const login = loginPathFor(getRole());
        clearSession();
        if (window.location.pathname !== login) window.location.assign(`${login}?expired=1`);
      }
      return Promise.reject(error);
    },
  );
}

// The server's message when it sent one, otherwise the given fallback.
export const errorMessage = (error, fallback) => error?.response?.data?.msg || fallback;
