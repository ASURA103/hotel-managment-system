import mongoose from "mongoose"
import env from "../../infrastructure/env.js"
import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId: process.env.AWS,
    secretAccessKey: process.env.AWS_SK, 
    region: 'ap-south-1' 
});
export const s3 = new AWS.S3()

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
