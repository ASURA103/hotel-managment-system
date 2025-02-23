import React from 'react'
import SideBar from '../Components/SideBar.jsx'

const SellerSideBar = ({page,setPage,setShowSidebar,showSidebar}) => {
    const items = [{
      name: "My Hotels",
      set: ()=>setPage("myhotel")
    },{
      name: "Add Hotel",
      set: ()=>setPage("add")
    },{
      name: "Bookings",
      set: ()=>setPage("bookings")
    }]
  return (
    <SideBar details={items} setShowSidebar={setShowSidebar} showSidebar={showSidebar}  />
  )
}

export default SellerSideBar