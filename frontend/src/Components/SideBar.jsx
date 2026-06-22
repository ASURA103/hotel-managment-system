import React from "react";

const SideBar = ({ details, setShowSideBar, showSideBar }) => {
  return (
    <div
      className={`
        fixed lg:static top-0 left-0 z-40
        w-[75vw] sm:w-[50vw] md:w-[35vw] xl:w-[20vw]
        min-h-screen

        bg-[#FFAE27] dark:bg-gray-900
        border-r border-orange-300 dark:border-gray-700

        flex flex-col items-center

        transform transition-transform duration-300 ease-in-out

        ${
          showSideBar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      {/* Logo */}
      <div className="text-3xl font-logo text-center pt-8 pb-14 relative w-full text-white dark:text-orange-400">
        DreamStay
      </div>

      {/* Menu Items */}
      {details.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            item.set();

            // Close sidebar automatically on mobile
            if (window.innerWidth < 1024) {
              setShowSideBar(false);
            }
          }}
          className="
            text-lg
            h-16 w-full

            flex items-center justify-center

            font-bold
            text-white dark:text-gray-100

            border-b border-orange-300 dark:border-gray-700

            cursor-pointer

            hover:bg-[#FF840C]
            dark:hover:bg-gray-800

            transition-all duration-300 ease-linear
          "
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SideBar;