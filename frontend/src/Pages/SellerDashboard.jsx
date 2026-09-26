import React, { useEffect, useState } from "react";
import SellerSideBar from "../Model/sellerSideBar.jsx";
import { useNavigate } from "react-router-dom";
import SDashboard from "../Model/sDashboard.jsx";
import DashboardShell from "../Components/ui/DashboardShell.jsx";
import { clearSession, getRole, getToken } from "../lib/session.js";

const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 1024;

const SellerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getToken() || getRole() !== "owner") {
      navigate("/seller/auth");
    }
  }, [navigate]);

  const [page, setPage] = useState("myhotel");
  const [showSidebar, setShowSidebar] = useState(isDesktop);
  const [editingHotel, setEditingHotel] = useState(null);

  function handleLogout() {
    clearSession();
    navigate("/");
  }

  function editHotel(hotel) {
    setEditingHotel(hotel);
    setPage("edit");
  }

  return (
    <DashboardShell
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      sidebar={
        <SellerSideBar
          page={page}
          setPage={setPage}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          onLogout={handleLogout}
        />
      }
    >
      <SDashboard
        page={page}
        editingHotel={editingHotel}
        onEdit={editHotel}
        onDone={() => setPage("myhotel")}
      />
    </DashboardShell>
  );
};

export default SellerDashboard;
