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
    CLOUD_DOMAIN: process.env.CLOUD_DOMAIN || ""
}

export default env