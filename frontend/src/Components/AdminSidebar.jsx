import React from 'react'
import { useNavigate } from "react-router-dom"

const AdminSidebar = ({ setPage }) => {

  const navigate = useNavigate()

  const items = [
    {
      name: "All Hotels",
      set: () => setPage("allhotel")
    },
    {
      name: "All Bookings",
      set: () => setPage("allbooking")
    },
    {
      name: "Add Admin",
      set: () => setPage("add")
    }
  ]

  function handleLogout() {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div
      className='
        w-full
        xl:w-[20vw]

        min-h-screen

        bg-[#FFAE27]
        dark:bg-slate-900

        border-r
        border-orange-300
        dark:border-slate-700

        flex flex-col

        items-center

        relative

        shadow-xl
      '
    >

      {/* Logo */}

      <div
        className='
          text-3xl

          font-logo

          text-center

          pt-8
          pb-12

          w-full

          text-white

          border-b

          border-orange-400
          dark:border-slate-700

          tracking-wide
        '
      >
        Stayhub
      </div>

      {/* Menu Items */}

      <div className='w-full flex flex-col mt-2'>

        {
          items.map((item, index) => (

            <div
              key={index}
              onClick={item.set}
              className='
                text-lg

                cursor-pointer

                h-16

                w-full

                flex

                items-center

                justify-center

                font-bold

                text-white

                border-b

                border-orange-300
                dark:border-slate-700

                hover:bg-[#FF840C]

                dark:hover:bg-slate-800

                hover:pl-3

                transition-all

                duration-300
              '
            >
              {item.name}
            </div>

          ))
        }

      </div>

      {/* Logout */}

      <div
        className='
          absolute

          bottom-6

          w-40

          bg-red-500

          hover:bg-red-600

          text-white

          text-xl

          p-3

          rounded-xl

          text-center

          font-bold

          cursor-pointer

          shadow-lg

          transition-all

          duration-300

          hover:scale-105
        '
        onClick={handleLogout}
      >
        Logout
      </div>

    </div>
  )
}

export default AdminSidebar