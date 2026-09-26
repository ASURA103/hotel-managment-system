import React from "react";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

// Opens / closes the dashboard sidebar on small screens.
const NavbarShow = ({ showSidebar, setShowSidebar }) => {
  return (
    <button
      type="button"
      aria-label={showSidebar ? "Close menu" : "Open menu"}
      aria-expanded={showSidebar}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-soft transition hover:border-ink/40"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      {showSidebar ? <IoClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
    </button>
  );
};

export default NavbarShow;
