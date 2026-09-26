import hotel from "../../config/schema/hotel.schema.js";
import bookings from "../../config/schema/booking.schema.js";
import { fileUpload } from "../model/hotel.model.js";
import env from "../../../infrastructure/env.js";
import { bookingValidator, hotelUpdateValidator, hotelvalidator, idValidator } from "../../config/helper/validators.js";
import { bookedRoomsByHotel, roomsLeft } from "../../services/availability.js";
import { computeBill } from "../../services/pricing.js";

const notRemoved = { isDeleted: { $ne: true } };
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const addHotel = async (req, res) => {
  const body = req.body;
  const file = req.file;
  console.log(file && { fieldname: file.fieldname, originalname: file.originalname, mimetype: file.mimetype, size: file.size });
  console.log(body);
  // The AWS key values are never logged; only whether they are configured.
  console.log("AWS credentials configured:", Boolean(env.AWS && env.AWS_SK));

  const parsed = hotelvalidator.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ msg: "Please fill in every hotel field correctly", errors: parsed.error.flatten().fieldErrors });
  }
  if (!file) {
    return res.status(400).json({ msg: "Hotel image is required" });
  }

  try {
    const upload = await fileUpload(file)
    const url =`${env.CLOUD_DOMAIN}/${upload.filename}`
    const data = parsed.data;
    await hotel.create({
      name: data.name,
      area: data.area,
      city: data.city,
      state: data.state,
      price: String(data.price),
      unmarriedFriendly: data.unmarriedFriendly,
      Image: url,
      AcRoomA: data.AcRoomA,
      NonAcRoomA: data.NonAcRoomA,
      TotalAc: data.TotalAc,
      TotalNonAc: data.TotalNonAc,
      status: true,
      createdBy: req.userId,
    });
    res.json({ msg: "hotel added" });
  } catch (error) {
    console.log("error while adding hotel", error.message);
    return res.status(500).json({ msg: "error while adding hotel " });
  }
};

export const updateHotel = async (req, res) => {
  const parsed = hotelUpdateValidator.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ msg: "data not in format", errors: parsed.error.flatten().fieldErrors });
  }
  const { id, ...fields } = parsed.data;
  const filter = { _id: id, createdBy: req.userId, ...notRemoved };
  try {
    // Check ownership before uploading, so a refused edit never leaves an image in S3.
    const existing = await hotel.findOne(filter).select("_id").lean();
    if (!existing) {
      return res.status(404).json({ msg: "hotel not found" });
    }
    if (fields.price !== undefined) fields.price = String(fields.price);
    if (req.file) {
      const upload = await fileUpload(req.file);
      fields.Image = `${env.CLOUD_DOMAIN}/${upload.filename}`;
    }
    const updated = await hotel.findOneAndUpdate(filter, { $set: fields }, { new: true, runValidators: true }).lean();
    res.json({ msg: "hotel updated", hotel: updated });
  } catch (error) {
    console.log("updating hotel", error.message);
    return res.status(500).json({ msg: "error while updating" });
  }
};

export const getHotels = async (req, res) => {
  try {
    const userId = req.userId;
    const hotels = await hotel.find({ createdBy: userId, ...notRemoved }).lean();
    res.json(hotels);
  } catch (error) {
    console.log("Error retrieving hotels", error);
    res.status(500).json({ msg: "Error retrieving hotels" });
  }
};

export const delHotel = async (req, res) => {
  const parsed = idValidator.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ msg: "hotel id is required" });
  }
  try {
    const userId = req.userId;
    // Soft delete, only the owner's own hotel; bookings stay intact.
    const result = await hotel.updateOne(
      { _id: parsed.data.id, createdBy: userId, ...notRemoved },
      { $set: { isDeleted: true, deletedAt: new Date() } },
    );
    if (!result.matchedCount) {
      return res.status(404).json({ msg: "hotel not found" });
    }
    res.json({ msg: " Hotel Deleted " });
  } catch (error) {
    console.log("Error  while Deleting Hotel", error);
    res.status(500).json({ msg: "Error  while Deleting Hotel" });
  }
};

// Public list for the landing page: newest hotels owners have added (removed ones hidden).
const PUBLIC_HOTEL_FIELDS = "name area city state price Image unmarriedFriendly AcRoomA NonAcRoomA TotalAc TotalNonAc";
export const listHotels = async (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 6, 1), 24);
  try {
    const hotels = await hotel.find(notRemoved).sort({ _id: -1 }).limit(limit).select(PUBLIC_HOTEL_FIELDS).lean();
    res.json(hotels);
  } catch (error) {
    console.log("error while listing hotels", error);
    res.status(500).json({ msg: "error while listing hotels" });
  }
};

export const searchHotel = async(req,res)=>{
  const body = req.body;
  const checkFromDate = new Date(body.fromDate)
  const checkToDate = new Date(body.toDate)
  if(isNaN(checkFromDate) || isNaN(checkToDate) || checkFromDate > checkToDate){
      return res.status(400).json({error: "Invalid Date Range"})
  }
  const roomsWanted = Number(body.rooms) || 1
  try{
      // Prefix match on name, area or city, case-insensitive; user text is escaped.
      // String(body.value) keeps the old behaviour for an empty search (no results).
      const prefix = new RegExp("^" + escapeRegex(String(body.value)), "i")
      const candidates = await hotel.find({
          ...notRemoved,
          $or: [ {name: prefix}, {area: prefix}, {city: prefix} ]
      }).lean()
      const booked = await bookedRoomsByHotel(candidates.map((h) => h._id), checkFromDate, checkToDate, body.RoomType)
      const hotels = candidates.filter(
          (h) => roomsLeft(h, body.RoomType, booked.get(String(h._id))) - roomsWanted >= 0
      )
      res.json(hotels)
  }catch(error){
      console.log("error while search hotel",error)
      res.status(500).json({msg: "error while searching hotels"})
  }
}

export const bookHotel = async(req,res)=>{
  const parsed = bookingValidator.safeParse(req.body)
  if (!parsed.success) {
      return res.status(400).json({ msg: "booking details are incomplete", errors: parsed.error.flatten().fieldErrors })
  }
  const { hotelId, fromDate, toDate, rooms, RoomType } = parsed.data
  try {
      const target = await hotel.findOne({ _id: hotelId, ...notRemoved }).lean()
      if (!target) {
          return res.status(404).json({ msg: "hotel not found" })
      }
      // Check-then-insert: fine for this app's traffic; a transaction would close the small race window.
      const booked = (await bookedRoomsByHotel([target._id], fromDate, toDate, RoomType)).get(String(target._id))
      if (roomsLeft(target, RoomType, booked) - rooms < 0) {
          return res.status(409).json({ msg: "Not enough rooms available for these dates" })
      }
      await bookings.create({
          fromDate,
          toDate,
          rooms,
          bill: computeBill(Number(target.price), rooms, fromDate, toDate),
          RoomType,
          bookedBy: req.userId,
          hotelId: target._id
      })

      res.json({
          msg: " hotel booked"
      })
  } catch (error) {
      console.log("error while booking hotel",error)
      res.status(500).json({msg: "error while booking hotel"})
  }
}

export const myBookings = async(req,res)=>{
  try{
    const book = await bookings.find({bookedBy: req.userId})
    .populate({
        path: 'hotelId',
        select: 'name area city price Image isDeleted'
    })
    .populate({
        path: "bookedBy",
        select: 'name'
    })
    .lean()
      res.json({
          bookings: book
      })
  }catch(error){
      console.log("error while geting my bookings",error)
      res.status(500).json({
          msg: "error while getting my bookings"
      })
  }
}
