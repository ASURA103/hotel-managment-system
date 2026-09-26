// An error with an HTTP status whose message is safe to show to the client.
export class HttpError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}

// Last middleware: turns thrown errors into JSON responses instead of Express's HTML page.
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err)
    if (err?.name === "MulterError") {
        const msg = err.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller" : err.message
        return res.status(400).json({ msg })
    }
    if (err instanceof HttpError) return res.status(err.status).json({ msg: err.message })
    if (err?.type === "entity.parse.failed") return res.status(400).json({ msg: "Invalid JSON body" })
    console.error("unhandled error", err)
    res.status(500).json({ msg: "Something went wrong" })
}
