import mongoose from "mongoose"
import env from "../../infrastructure/env.js"
import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId: env.AWS,
    secretAccessKey: env.AWS_SK,
    region: env.AWS_REGION
});
// LOCAL-TEST-ONLY branch: S3_ENDPOINT is only set for tests / local MinIO.
export const s3 = new AWS.S3(env.S3_ENDPOINT ? { endpoint: env.S3_ENDPOINT, s3ForcePathStyle: true } : {})

async function dbConnection(){
    await mongoose
       .connect(env.MONGO_URL)
       .then(()=>{
        console.log("mongo database connected")
       })
       .catch((err)=>{
        console.log("Error while connecting mogoose",err)
       })
}

export default dbConnection
