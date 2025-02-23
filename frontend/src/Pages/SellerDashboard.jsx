// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import HotelList from "./HotelList.jsx";

// const SellerDashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       navigate("/seller/auth");
//     }
//   }, [navigate]);

//   function addhotel() {
//     navigate("/seller/add");
//   }

//   function dash() {
//     navigate("/seller/dashboard");
//   }
//   function edit() {
//     navigate("/seller/dashboard");
//   }

//   function Landing() {
//     navigate("/");
//   }
//   return (
//     <div className="p-2  h-[100vh] flex">
//       <div>
//         <nav className="block  bg-gray-500 w-[20vh] shadow-lg shadow-current   rounded-md p-3">
//           <div className="text-center  mb-3   " onClick={Landing}>
//             <i className="  bg-black text-white hover:bg-white hover:text-black  font-extrabold text-4xl cursor-pointer rounded-md shadow-lg shadow-current px-1">
//               Home
//             </i>
//           </div>

//           <div className="">
//             <i
//               className=" bg-black text-white hover:bg-white hover:text-black   cursor-pointer text-2xl font-extrabold shadow-md shadow-current rounded-md "
//               onClick={dash}
//             >
//               Dashboard
//             </i>
//           </div>

//           <div className="m-1 mt-3">
//             <b
//               className=" bg-black text-white hover:bg-white hover:text-black rounded-md px-1 cursor-pointer shadow-md font-bold "
//               onClick={addhotel}
//             >
//               addhotel{" "}
//             </b>
//           </div>
//           <div className="m-1">
//             <b
//               className=" bg-black text-white hover:bg-white hover:text-black rounded-md px-1  cursor-pointer shadow-md font-bold "
//               onClick={edit}
//             >
//               Hotels Bookings{" "}
//             </b>
//           </div>
//           <div className="m-1">
//             <b className=" bg-black text-white hover:bg-white hover:text-black rounded-md px-1  cursor-pointer shadow-md font-bold ">
//               My Hotels{" "}
//             </b>
//           </div>
//         </nav>
//       </div>

//       <div className=" w-[100%] bg-[#023e8a] ml-3 border-4 shadow-lg shadow-current rounded-md ">
//         <HotelList />
//       </div>
//     </div>
//   );
// };
// export default SellerDashboard;

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
      navigate("seller/auth");
    }
  }, [navigate]);
  const [page, setPage] = useState("myhotel");
  const [showSidebar, setShowSidebar] = useState(true);

  function handleLogout() {
    localStorage.clear()
    navigate("/");
  }

  return (
    <div className="flex">
      <div
        className={`${showSidebar? "translate-x-0" : "translate-x-[-25vw]"} transition-all ease-linear duration-300`}
      >
        <SellerSideBar
          page={page}
          setPage={setPage}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
        />
        <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-b-lg w-full"
                  >
                    Logout
                  </button>
      </div>
      <div className="absolute top-5 left-5"><NavbarShow setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      </div>
      <div
        className={`${
          showSidebar ? "w-[75vw]" : "w-[95vw] translate-x-[-12vw] "
        }`}
      >
       <SDashboard page={page} />
      </div>
    </div>
  );
};

export default SellerDashboard;
