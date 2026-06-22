import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";
import { FaHotel } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

import { useTheme } from "./ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const [openMenu, setOpenMenu] = useState(false);

  function userauth() {
    navigate("/user/auth");
    setOpenMenu(false);
  }

  function seller() {
    navigate("/seller/auth");
    setOpenMenu(false);
  }

  function Landing() {
    navigate("/");
    setOpenMenu(false);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
    setOpenMenu(false);
  }

  return (
    <>
      {/* NAVBAR */}

      <div
        className="
          fixed top-0 left-0 z-[1000]

          w-full h-20

          bg-white/80
          dark:bg-slate-950/80

          backdrop-blur-xl

          border-b
          border-slate-200
          dark:border-slate-800

          shadow-sm
        "
      >
        <nav className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* LOGO */}

          <div
            onClick={Landing}
            className="cursor-pointer flex items-center"
          >
            <img
              src="/logo.png"
              alt="DreamStay"
              className="h-14 md:h-16 object-contain"
            />
          </div>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-5">
            {/* List Property */}

            <div
              onClick={seller}
              className="
                flex items-center gap-3

                px-4 py-2

                rounded-2xl

                bg-cardLight
                dark:bg-cardDark

                shadow-md

                cursor-pointer

                hover:scale-[1.02]

                transition-all
              "
            >
              <FaHotel className="text-2xl text-primary" />

              <div>
                <h1 className="font-semibold text-textLight dark:text-textDark">
                  List Property
                </h1>

                <p className="text-xs text-mutedLight dark:text-mutedDark">
                  Grow your business
                </p>
              </div>
            </div>

            {/* Theme */}

            <button
              onClick={toggleTheme}
              className="
                p-3

                rounded-full

                bg-cardLight
                dark:bg-cardDark

                shadow-md

                text-textLight
                dark:text-textDark

                hover:scale-105

                transition-all
              "
            >
              {theme === "dark" ? (
                <BsSunFill size={18} />
              ) : (
                <BsMoonStarsFill size={18} />
              )}
            </button>

            {/* User */}

            {localStorage.getItem("token") &&
            localStorage.getItem("type") === "user" ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/bookings")}
                  className="
                    px-5 py-2

                    rounded-xl

                    bg-primary

                    text-white

                    hover:bg-secondary

                    transition
                  "
                >
                  My Bookings
                </button>

                <div className="relative group">
                  <div
                    className="
                      w-12 h-12

                      rounded-full

                      bg-primary

                      text-white

                      flex items-center justify-center

                      font-bold text-xl
                    "
                  >
                    {localStorage
                      .getItem("name")
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div
                    className="
                      absolute right-0 top-14

                      opacity-0
                      invisible

                      group-hover:opacity-100
                      group-hover:visible

                      transition-all
                    "
                  >
                    <button
                      onClick={handleLogout}
                      className="
                        px-5 py-2

                        rounded-xl

                        bg-red-600

                        text-white

                        hover:bg-red-700
                      "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <VscAccount
                size={34}
                onClick={userauth}
                className="
                  cursor-pointer

                  text-textLight
                  dark:text-textDark

                  hover:scale-110

                  transition
                "
              />
            )}
          </div>

          {/* MOBILE RIGHT */}

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <BsSunFill
                  size={22}
                  className="text-textDark"
                />
              ) : (
                <BsMoonStarsFill
                  size={22}
                  className="text-textLight"
                />
              )}
            </button>

            <button onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? (
                <HiX size={32} />
              ) : (
                <HiOutlineMenuAlt3 size={32} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}

      <div
        className={`
          md:hidden

          fixed top-20 left-0 right-0

          z-[999]

          bg-white
          dark:bg-slate-950

          border-b

          border-slate-200
          dark:border-slate-800

          shadow-2xl

          transition-all duration-300 ease-in-out

          ${
            openMenu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }
        `}
      >
        <div className="flex flex-col gap-4 p-5">
          <button
            onClick={seller}
            className="text-left text-lg hover:text-primary transition"
          >
            List Property
          </button>

          {localStorage.getItem("token") &&
            localStorage.getItem("type") === "user" && (
              <>
                <button
                  onClick={() => {
                    navigate("/bookings");
                    setOpenMenu(false);
                  }}
                  className="text-left text-lg hover:text-primary transition"
                >
                  My Bookings
                </button>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 text-lg hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}

          {!localStorage.getItem("token") && (
            <button
              onClick={userauth}
              className="text-left text-lg hover:text-primary transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;