import bcrypt from "bcryptjs"
import crypto from "node:crypto"

const ROUNDS = 10 // same cost the app already used

export const hashPassword = (plain) => bcrypt.hash(plain, ROUNDS)

export const isHashed = (stored) => typeof stored === "string" && /^\$2[aby]\$\d{2}\$/.test(stored)

// Checks a password against a stored bcrypt hash. Older admin records hold plain text;
// those are compared in constant time so the caller can re-hash them after a successful login.
export async function verifyPassword(plain, stored) {
    if (isHashed(stored)) return bcrypt.compare(String(plain), stored)
    const a = Buffer.from(String(plain))
    const b = Buffer.from(String(stored ?? ""))
    return a.length === b.length && crypto.timingSafeEqual(a, b)
}
