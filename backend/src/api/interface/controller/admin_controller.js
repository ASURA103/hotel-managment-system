import { adminSigninValidator, idValidator } from "../../config/helper/validators.js"
import admin from "../../config/schema/admin.schema.js"
import bookings from "../../config/schema/booking.schema.js"
import hotel from "../../config/schema/hotel.schema.js"
import owner from "../../config/schema/owner.schema.js"
import { sendWarningMail } from "../lib/mailer.js"
import { hashPassword, isHashed, verifyPassword } from "../lib/passwords.js"
import { ROLES, signToken } from "../lib/tokens.js"

const MAX_ADMINS = 3

export const adminSignin = async(req,res) =>{
    const body = req.body
    try {
        const success = adminSigninValidator.safeParse(body)
        if(!success.success){
            return res.status(400).json({msg: "input not in format"})
        }
        const response = await admin.findOne({
            username: body.username
        })
        if(!response || !(await verifyPassword(body.password, response.password))){
            return res.status(401).json({
                msg: "user not found"
            })
        }
        if (!isHashed(response.password)) {
            // Existing admin stored in plain text: upgrade to bcrypt now that the password is verified.
            response.password = await hashPassword(body.password)
            await response.save()
        }
        const token = signToken(response._id, ROLES.ADMIN)

        res.json({
            username: response.username,
            token: token
        })
    } catch (error) {
        console.log("error while admin signin",error)
        return res.status(500).json({msg: "error while signin up"})
    }
}
export const AddAdmine = async(req,res)=>{
    const body =req.body
    try {
        const success = adminSigninValidator.safeParse(body)
        if(!success.success){
            return res.status(400).json({msg: "input not in format "})
        }
        const admins = await admin.countDocuments({})
        if (admins >= MAX_ADMINS){
            return res.status(409).json({msg: " maximum admin reached"})
        }
        const respones = await admin.create({
            username: body.username,
            password: await hashPassword(body.password)
        })
        const token = signToken(respones._id, ROLES.ADMIN)

        res.json({
            token: token
        })
    } catch (error) {
        if (error?.code === 11000) {
            return res.status(409).json({msg: "admin already exists"})
        }
        console.log("error while adding admin ",error)
        res.status(500).json({
            msg: "error while adding admin"
        })

    }
}
export const AllBookings = async(req,res)=>{
    try {
        const response = await bookings.find({})
        .populate({
            path: 'hotelId',
            select: 'name area city state price Image isDeleted'
        })
        .populate({
            path: "bookedBy",
            select: 'name email'
        })
        .lean()
        res.json(response)
    } catch (error) {
        console.log("error while feting all bookings",error)
        res.status(500).json({
            msg: "error while fetching al bookings"
        })
    }
}

export const AllHotels = async(req,res)=>{
    try{
        const response = await hotel.find({ isDeleted: { $ne: true } }).lean()
        res.json({hotels: response})
    }catch(error){
        console.log("error while getting all hotels",error)
        res.status(500).json({
            msg: "error while getting hotels"
        })
    }
}


export const deleteHotel = async(req,res)=>{
    const parsed = idValidator.safeParse(req.body)
    if (!parsed.success) {
        return res.status(400).json({ msg: "hotel id is required" })
    }
    try {
        // Soft delete: the hotel is hidden everywhere, its bookings are kept.
        const respones = await hotel.updateOne(
            { _id: parsed.data.id, isDeleted: { $ne: true } },
            { $set: { isDeleted: true, deletedAt: new Date() } },
        )
        if (!respones.matchedCount) {
            return res.status(404).json({ msg: "hotel not found" })
        }
        res.json({msg: "hotel deleted"})
    } catch (error) {
        console.log("error while deleting hotel",error)
        res.status(500).json({
            msg: "errro while deleting hotel"
        })
    }
}


export const sendWarning = async(req,res)=>{
    const body = req.body;
    try {
        const user = await owner.findOne({
            _id: body.createdBy
        }).lean()
        if (!user) {
            return res.status(404).json({ msg: "owner not found" })
        }
        await sendWarningMail(user.email)
        res.json({
            msg: "warning send"
        })
    } catch (error) {
        console.log("error while sending warning",error)
        res.status(500).json({
            msg: "error whiel sending warning"
        })
    }
}
