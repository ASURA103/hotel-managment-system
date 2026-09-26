import { verifyToken } from "./tokens.js"

// Accepts "Authorization: Bearer <token>". Every failure is a 401 (never a crash);
// on success sets req.userId (account id, as before) and req.role.
function authMiddleware(req,res,next){
    const [scheme, token] = (req.headers.authorization || "").split(" ")
    if (scheme !== "Bearer" || !token || token === "null" || token === "undefined") {
        return res.status(401).json({msg:"token is required"})
    }
    try {
        const payload = verifyToken(token)
        if (typeof payload !== "object" || !payload.id || !payload.role) {
            // tokens issued before roles existed: the user has to sign in again
            return res.status(401).json({msg:"please sign in again"})
        }
        req.userId = payload.id
        req.role = payload.role
        next()
    } catch (error) {
        console.log("error in auth middleware", error.message);
        res.status(401).json({msg: "error in token"})
    }
}

export default authMiddleware
