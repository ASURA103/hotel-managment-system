import React from 'react'
import SideBar from '../Components/SideBar.jsx'

const SellerSideBar = ({page,setPage,setShowSidebar,showSidebar,onLogout}) => {
    const items = [{
      key: "myhotel",
      name: "My Hotels",
      set: ()=>setPage("myhotel")
    },{
      key: "add",
      name: "Add Hotel",
      set: ()=>setPage("add")
    },{
      key: "bookings",
      name: "Bookings",
      set: ()=>setPage("bookings")
    }]
  return (
    <SideBar
      details={items}
      active={page === "edit" ? "myhotel" : page}
      subtitle="Owner"
      setShowSidebar={setShowSidebar}
      showSidebar={showSidebar}
      onLogout={onLogout}
    />
  )
}

export default SellerSideBar
