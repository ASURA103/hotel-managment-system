import owner from "../../config/schema/owner.schema.js"
import { ownerSigninValidator,ownerSignupValidator } from "../../config/helper/validators.js";
import hotel from "../../config/schema/hotel.schema.js";
import bookings from "../../config/schema/booking.schema.js";
import { hashPassword, verifyPassword } from "../lib/passwords.js";
import { ROLES, signToken } from "../lib/tokens.js";

const withoutPassword = ({ password, ...rest } = {}) => rest;

export const ownerSignup = async( req , res) =>{
    const body = req.body;
    console.log(withoutPassword(body))
    try {
        const success = ownerSignupValidator.safeParse(body)
        if(!success.success){
            console.log(success.error.flatten().fieldErrors)
            return res.status(400).json({msg: "Data not in format"})
        }
        const check = await owner.findOne({email: body.email}).select("_id").lean()
        if(check){
            return res.status(401).json({msg: "owner already exists"})
        }
        const hashedPass = await hashPassword(body.password);
        const response = await owner.create({
            name: body.name,
            phone:body.phone,
            email: body.email,
            idProof: body.idProof,
            password: hashedPass
        })
        const token = signToken(response._id, ROLES.OWNER)
        res.json({
            ownername: response.name,
            token: token
        })
    } catch (error) {
        if (error?.code === 11000) {
            return res.status(401).json({msg: "owner already exists"})
        }
        console.log("error while signinup",error)
        return res.status(500).json({msg: "error while signinup"})
    }
}

export const ownerSignin = async(req,res) =>{
    const body = req.body
    try {
        const success = ownerSigninValidator.safeParse(body)
        if(!success.success){
            return res.status(400).json({msg: "data not in format"})
        }
        const response = await owner.findOne({
            email: body.email,
        })
        if(!response || response == null){
            return res.status(401).json({msg: "owner not found"})
        }
        const compare = await verifyPassword(body.password, response.password)
        if(!compare){
            return res.status(401).json({msg: "incorrect password"})
        }
        const token = signToken(response._id, ROLES.OWNER)
        res.json({
            ownername: response.name,
            token: token
        })

    } catch (error) {
        console.log("error while signing up",error)
        res.status(500).json({msg: "error while signing up"})
    }
}

export const hotelBookings = async(req,res)=>{
    try {
        // All of the owner's hotels, including removed ones, so their bookings stay visible.
        const hotels = await hotel.find({ createdBy: req.userId }).select("_id").lean()
        const books = await bookings.find({ hotelId: { $in: hotels.map((h) => h._id) } })
        .populate({
            path:'hotelId',
            select:'name Image isDeleted area city state price'
        })
        .populate({
            path:'bookedBy',
            select: 'name email'
        })
        .lean()
        res.json(books)
    } catch (error) {
        console.log("error while fetching booking of hotel",error)
        res.status(500).json({msg: "error whil fetching booking of hotel"})
    }
}
