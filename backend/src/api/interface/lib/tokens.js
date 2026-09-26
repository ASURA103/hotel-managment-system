import jwt from "jsonwebtoken"
import env from "../../../infrastructure/env.js"

export const ROLES = Object.freeze({ USER: "user", OWNER: "owner", ADMIN: "admin" })

// Tokens carry the account id and its role. No expiry by design: a session lasts until the
// user logs out or clears browser data. Rotating SECRET_KEY signs everyone out.
export const signToken = (id, role) => jwt.sign({ id: String(id), role }, env.SECRET_KEY)

export const verifyToken = (token) => jwt.verify(token, env.SECRET_KEY)
