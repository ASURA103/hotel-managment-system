import hotel from "../../config/schema/hotel.schema.js";
import bookings from "../../config/schema/booking.schema.js";
import { fileUpload } from "../model/hotel.model.js";
import env from "../../../infrastructure/env.js";

export const addHotel = async (req, res) => {
  const body = req.body;
  const file = req.file;
  console.log(file);
  console.log(body);
  console.log(env.AWS)
  console.log(env.AWS_SK)

  try {
    const upload = await fileUpload(file)
    const url =`${env.CLOUD_DOMAIN}/${upload.filename}`
    const response = await hotel.create({
      name: body.name,
      area: body.area,
      city: body.city,
      state: body.state,
      price: body.price,
      unmarriedFriendly: body.unmarriedFriendly,
      Image: url,
      AcRoomA: body.AcRoomA,
      NonAcRoomA: body.NonAcRoomA,
      TotalAc: body.TotalAc,
      TotalNonAc: body.TotalNonAc,
      status: true,
      createdBy: req.userId,
    });
    res.json({ msg: "hotel added" });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while adding hotel " });
  }
};

export const updateHotel = async (req, res) => {
  const body = req.body;
  try {
    const response = await hotel.updateOne(
      { createdBy: req.userId },
      {
        name: body.name,
        area: body.area,
        city: body.city,
        state: body.state,
        price: body.price,
        unmarriedFriendly: body.unmarriedFriendly,
        image: url,
        AcRoomA: body.AcRoomA,
        NonAcRoomA: body.NonAcRoomA,
        TotalAc: body.TotalAc,
        TotalNonAc: body.TotalNonAc,
        status: body.status,
        createdBy: req.userId,
      }
    );
    res.json({ msg: "hotel updated" });
  } catch (error) {
    console.log("updating hotel", error);
    return res.status(401).json({ msg: "error while updating" });
  }
};

export const getHotels = async (req, res) => {
  try {
    const userId = req.userId;
    const hotels = await hotel.find({ createdBy: userId });
    res.json(hotels);
  } catch (error) {
    console.log("Error retrieving hotels", error);
    res.status(500).json({ msg: "Error retrieving hotels" });
  }
};

export const delHotel = async (req, res) => {
  try {
    const userId = req.userId;
    const hotels = await hotel.deleteOne({ createdBy: userId });
    res.json({ msg: " Hotel Deleted " });
  } catch (error) {
    console.log("Error  while Deleting Hotel", error);
    res.status(500).json({ msg: "Error  while Deleting Hotel" });
  }
};

export const searchHotel = async(req,res)=>{
  const body = req.body;
  try{
      let hotels = []
      const response = await hotel.find({
          $or: [
              {name: {$regex: new RegExp("^" + body.value ,"i")}},
              {area: {$regex: new RegExp("^" + body.value ,"i")}},
              {city: {$regex: new RegExp("^" + body.value ,"i")}}
          ]
      })
      const checkFromDate = new Date(body.fromDate)
      const checkToDate = new Date(body.toDate)
      console.log(body.fromDate)
      console.log(checkFromDate)
      console.log(checkToDate)
      if(isNaN(checkFromDate) || isNaN(checkToDate) || checkFromDate > checkToDate){
          return res.status(400).json({error: "Invalid Date Range"})
      }
      for (let i = 0;i<response.length;i++){
          const overlappingBookings = await bookings.find({
              hotelId: response[i]._id,
              $and: [
                  {fromDate: {$lte: checkToDate}},
                  {toDate: {$gte: checkFromDate}}
              ]
          })
          
          const roomsBooked = overlappingBookings.reduce((accumulator,item)=> { return accumulator + item.rooms},0)
          console.log(roomsBooked)
          let RoomType = "";
          if(body.RoomType = "AC"){
              RoomType = "TotalAc"
          }else{
              RoomType = "TotalNonAc"
          }
          
            if((response[i][RoomType] - (roomsBooked + body.rooms )) >0 ){ 
            hotels.push(response[i])
          }
        }
      res.json(hotels)
  }catch(error){
      console.log("error while search hotel",error)
      res.json("error while searching hotels")
  }
}

export const bookHotel = async(req,res)=>{
  const body = req.body;
  try {
      const book = await bookings.create({
          fromDate: new Date(body.fromDate),
          toDate: new Date(body.toDate),
          rooms: body.rooms,
          RoomType: body.RoomType,
          bookedBy: req.userId,
          hotelId: body.hotelId
      })

      res.json({
          msg: " hotel booked" 
      })
  } catch (error) {
      console.log("error while booking hotel",error)
      res.status(403).json({msg: "error while booking hotel"})
  }
}

export const myBookings = async(req,res)=>{
  try{
      const book = await bookings.find({bookedBy: req.userId})
      res.json({
          bookings: book
      })
  }catch(error){
      console.log("error while geting my bookings",error)
      res.status(403).json({
          msg: "error while getting my bookings"
      })
  }
}
