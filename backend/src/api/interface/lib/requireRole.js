// Use after authMiddleware: lets the request through only for the given roles ("user", "owner", "admin").
export default function requireRole(...roles) {
    return (req, res, next) =>
        roles.includes(req.role) ? next() : res.status(403).json({ msg: "You don't have access to this" })
}
