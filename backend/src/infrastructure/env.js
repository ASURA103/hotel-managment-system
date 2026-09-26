import dotenv from "dotenv";
dotenv.config()

const env={
    PORT:process.env.PORT || 8080,
    MONGO_URL:process.env.MONGO_URL ||"",
    SECRET_KEY:process.env.SECRET_KEY || "",
    AWS:process.env.AWS ||"",
    AWS_SK:process.env.AWS_SK ||"",
    MAILER_ID: process.env.MAILER_ID || "",
    MAILER_PASS: process.env.MAILER_PASS || "",
    CLOUD_DOMAIN: process.env.CLOUD_DOMAIN || "",
    // Optional; defaults are the values the code used before, so production needs no new variables.
    AWS_REGION: process.env.AWS_REGION || "ap-south-1",
    S3_BUCKET: process.env.S3_BUCKET || "projects012",
    // LOCAL-TEST-ONLY: points S3 at the test fake / local MinIO (docker-compose). Leave unset in production.
    S3_ENDPOINT: process.env.S3_ENDPOINT || ""
}

export default env