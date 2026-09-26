import mongoose from "mongoose"
import bookings from "../config/schema/booking.schema.js"

// Room types used by the UI and stored on bookings: "AC" and "NonAc".
// Anything else (e.g. no type chosen in search) is treated as AC, as the app did before.
export const capacityField = (roomType) => (roomType === "NonAc" ? "TotalNonAc" : "TotalAc")
const bookingTypeMatch = (roomType) => (roomType === "NonAc" ? { $ne: "AC" } : "AC")

// Rooms already booked per hotel for one room type, for bookings overlapping [from, to]
// (inclusive, same overlap rule as before). One aggregate for any number of hotels.
export async function bookedRoomsByHotel(hotelIds, from, to, roomType) {
    if (!hotelIds.length) return new Map()
    const ids = hotelIds.map((id) => new mongoose.Types.ObjectId(String(id)))
    const rows = await bookings.aggregate([
        { $match: { hotelId: { $in: ids }, RoomType: bookingTypeMatch(roomType), fromDate: { $lte: to }, toDate: { $gte: from } } },
        { $unwind: "$hotelId" },
        { $match: { hotelId: { $in: ids } } },
        { $group: { _id: "$hotelId", rooms: { $sum: "$rooms" } } },
    ])
    return new Map(rows.map((r) => [String(r._id), r.rooms]))
}

// Free rooms of that type once `booked` rooms are taken. A request fits when this is ≥ the rooms asked for.
export const roomsLeft = (hotelDoc, roomType, booked = 0) =>
    (Number(hotelDoc[capacityField(roomType)]) || 0) - booked
