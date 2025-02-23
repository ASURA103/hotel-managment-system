import React from 'react'
import AllBookings from './ALLBookings.jsx'
import AllHotel from './AllHotel.jsx'
import AddAdmin from './AddAdmin.jsx'

const AdminPage = ({page}) => {
  if(page=== "allbooking") return <AllBookings />
  else if(page==="allhotel") return <AllHotel />
  else if(page==="add") return <AddAdmin />
}

export default AdminPage