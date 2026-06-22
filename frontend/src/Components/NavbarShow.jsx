import React from "react";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const NavbarShow = ({ showSidebar, setShowSidebar }) => {
  return (
    <div
      className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-full p-1 cursor-pointer flex justify-center items-center z-10 bg-white dark:bg-gray-800 text-black dark:text-white"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      {showSidebar ? (
        <IoClose className="text-3xl" />
      ) : (
        <MdMenu className="text-3xl" />
      )}
    </div>
  );
};

export default NavbarShow;