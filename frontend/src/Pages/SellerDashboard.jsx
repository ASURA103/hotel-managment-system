import React, { useEffect, useState } from "react";
import SellerSideBar from "../Model/sellerSideBar.jsx";
import NavbarShow from "../Components/NavbarShow.jsx";
import { useNavigate } from "react-router-dom";
import SDashboard from "../Model/sDashboard.jsx";

const SellerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("type") !== "owner"
    ) {
      navigate("/seller/auth");
    }
  }, [navigate]);

  const [page, setPage] = useState("myhotel");
  const [showSidebar, setShowSidebar] = useState(true);

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div
      className="
        min-h-screen
        flex

        bg-gradient-to-br
        from-sky-50
        via-white
        to-cyan-50

        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950

        overflow-hidden
      "
    >
      {/* Sidebar */}

      <div
        className={`
          fixed lg:relative
          z-40

          h-screen

          ${
            showSidebar
              ? "translate-x-0"
              : "-translate-x-full lg:-translate-x-[25vw]"
          }

          transition-all
          duration-300
          ease-in-out
        `}
      >
        <SellerSideBar
          page={page}
          setPage={setPage}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />

        {/* Logout Button */}

        <div className="px-4 py-4 bg-white dark:bg-slate-900">
          <button
            onClick={handleLogout}
            className="
              w-full

              py-3

              rounded-2xl

              bg-red-600
              hover:bg-red-700

              text-white
              font-bold

              shadow-lg
              hover:shadow-red-500/30

              hover:scale-[1.02]

              transition-all
              duration-300
            "
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay on Mobile */}

      {showSidebar && (
        <div
          className="
            fixed inset-0

            bg-black/40

            backdrop-blur-sm

            z-30

            lg:hidden
          "
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Navbar Toggle */}

      <div className="fixed top-5 left-5 z-50">
        <NavbarShow
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
      </div>

      {/* Main Content */}

      <div
        className={`
          flex-1

          pt-20

          transition-all
          duration-300

          ${
            showSidebar
              ? "lg:ml-0"
              : "lg:w-[95vw]"
          }
        `}
      >
        <div
          className="
            p-4 md:p-6

            rounded-3xl

            min-h-[calc(100vh-5rem)]

            transition-all
            duration-300
          "
        >
          <SDashboard page={page} />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;