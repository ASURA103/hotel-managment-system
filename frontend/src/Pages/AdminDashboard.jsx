import React, { useState } from 'react'
import AdminSidebar from '../Components/AdminSidebar.jsx'
import AdminPage from '../Model/AdminPage.jsx'
import DashboardShell from '../Components/ui/DashboardShell.jsx'

const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 1024

const AdminDashboard = () => {
  const [showSidebar,setShowSidebar] = useState(isDesktop)
  const [page,setPage] = useState("allhotel")
  return (
    <DashboardShell
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      sidebar={<AdminSidebar setPage={setPage} page={page} setShowSidebar={setShowSidebar} />}
    >
      <AdminPage page={page} />
    </DashboardShell>
  )
}

export default AdminDashboard
