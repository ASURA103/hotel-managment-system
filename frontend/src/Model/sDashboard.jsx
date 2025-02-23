import React from 'react'
import Bookings from './Bookings.jsx'
import AddHotel from '../Pages/addHotel.jsx'
import HotelList from '../Pages/HotelList.jsx'
import EditHotel from '../Pages/EditHotel.jsx'

const SDashboard = ({page}) => {
    if(page=="bookings") return<Bookings />
    else if(page=="add") return<AddHotel />
    else if(page=="edit") return<EditHotel />
    else return< HotelList />
}

export default SDashboard