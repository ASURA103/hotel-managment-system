import multer from "multer"
import { randomUUID } from "crypto"
import { s3 } from "../../config/db.js"
import path from "path"
import env from "../../../infrastructure/env.js"
import { HttpError } from "../lib/httpError.js"

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"])
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024

// Uploads stay in memory and go straight to S3: nothing is written to the server's disk.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
  fileFilter: (req, file, cb) =>
    IMAGE_TYPES.has(file.mimetype)
      ? cb(null, true)
      : cb(new HttpError(400, "Only JPG, PNG, WEBP or AVIF images are allowed")),
})

export const fileUpload = async(file)=>{
    const filename = `${file.fieldname}-${Date.now()}-${randomUUID().slice(0, 8)}${path.extname(file.originalname).toLowerCase()}`
    const params = {
        Bucket: env.S3_BUCKET,
        Key: filename,
        Body : file.buffer,
        ContentType: file.mimetype,
    }
    // Awaited: if S3 rejects the upload, the caller gets the error and no hotel is saved.
    await s3.upload(params).promise()
    // Kept from the original code; the signed URL isn't used by callers (see DEAD_CODE_AND_UNUSED.md).
    // It is no longer logged, because it grants temporary access to the object.
    s3.getSignedUrl('getObject',{
        Bucket: env.S3_BUCKET,
        Key: filename
    })
    return {
      filename: filename
    }
  }
