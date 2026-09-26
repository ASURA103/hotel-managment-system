import { Navigate } from "react-router-dom";
import { getRole, getToken, loginPathFor } from "../lib/session.js";

// Route guard: renders children only for a signed-in account of the given role.
// The API checks roles too; this just avoids showing a page that can't load.
export default function RequireRole({ role, children }) {
  if (!getToken() || getRole() !== role) {
    return <Navigate to={loginPathFor(role)} replace />;
  }
  return children;
}
