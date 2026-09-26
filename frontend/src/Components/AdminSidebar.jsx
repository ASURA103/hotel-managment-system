import React from 'react'
import { useNavigate } from "react-router-dom"
import SideBar from './SideBar.jsx'
import { clearSession } from '../lib/session.js'

const AdminSidebar = ({ setPage, page, setShowSidebar }) => {
  const navigate = useNavigate()

  const items = [
    {
      key: "allhotel",
      name: "All Hotels",
      set: () => setPage("allhotel")
    },
    {
      key: "allbooking",
      name: "All Bookings",
      set: () => setPage("allbooking")
    },
    {
      key: "add",
      name: "Add Admin",
      set: () => setPage("add")
    }
  ]

  function handleLogout() {
    clearSession()
    navigate("/")
  }

  return (
    <SideBar details={items} active={page} subtitle="Admin" setShowSidebar={setShowSidebar} onLogout={handleLogout} />
  )
}

export default AdminSidebar
