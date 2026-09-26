import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { BsMoonStars, BsSun } from "react-icons/bs";

import { useTheme } from "./ThemeContext";
import { clearSession, getName, getRole, getToken } from "../lib/session.js";

const dashboardFor = { owner: "/seller/dashboard", admin: "/admin/dashboard" };

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  const signedIn = Boolean(getToken());
  const role = getRole();
  const isGuest = signedIn && role === "user";
  const dashboard = signedIn ? dashboardFor[role] : undefined;
  const initial = (getName() || "D").charAt(0).toUpperCase();

  function go(path) {
    navigate(path);
    setOpenMenu(false);
  }

  function handleLogout() {
    clearSession();
    go("/");
  }

  const ThemeButton = ({ className = "" }) => (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink/50 hover:bg-surface ${className}`}
    >
      {theme === "dark" ? <BsSun size={16} /> : <BsMoonStars size={16} />}
    </button>
  );

  return (
    <>
      <header className="fixed left-0 top-0 z-[1000] h-20 w-full border-b border-line/70 bg-bg/80 backdrop-blur-xl">
        <nav className="container-page flex h-full items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpenMenu(false)}>
            <img src="/logo1.webp" alt="" className="h-11 w-auto" />
            <span className="font-display text-2xl tracking-tight text-ink">DreamStay</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => go("/seller/auth")} className="btn btn-ghost">
              List your property
            </button>

            <ThemeButton />

            {isGuest && (
              <button type="button" onClick={() => go("/bookings")} className="btn btn-outline">
                My bookings
              </button>
            )}

            {dashboard && (
              <button type="button" onClick={() => go(dashboard)} className="btn btn-outline">
                Dashboard
              </button>
            )}

            {signedIn ? (
              <div className="group relative">
                <button
                  type="button"
                  aria-label="Account"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg text-primaryInk"
                >
                  {initial}
                </button>
                <div className="invisible absolute right-0 top-12 w-44 translate-y-1 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="card p-1.5">
                    <button type="button" onClick={handleLogout} className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-danger transition hover:bg-danger/10">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => go("/user/auth")} className="btn btn-primary">
                Sign in
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeButton />
            <button
              type="button"
              aria-label={openMenu ? "Close menu" : "Open menu"}
              aria-expanded={openMenu}
              onClick={() => setOpenMenu(!openMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
            >
              {openMenu ? <HiX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed left-0 right-0 top-20 z-[999] border-b border-line bg-bg shadow-lift transition duration-300 ease-out md:hidden ${
          openMenu ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          <button type="button" onClick={() => go("/seller/auth")} className="rounded-xl px-3 py-3 text-left text-base text-ink hover:bg-surface2">
            List your property
          </button>

          {isGuest && (
            <button type="button" onClick={() => go("/bookings")} className="rounded-xl px-3 py-3 text-left text-base text-ink hover:bg-surface2">
              My bookings
            </button>
          )}

          {dashboard && (
            <button type="button" onClick={() => go(dashboard)} className="rounded-xl px-3 py-3 text-left text-base text-ink hover:bg-surface2">
              Dashboard
            </button>
          )}

          {signedIn ? (
            <button type="button" onClick={handleLogout} className="rounded-xl px-3 py-3 text-left text-base font-semibold text-danger hover:bg-danger/10">
              Logout
            </button>
          ) : (
            <button type="button" onClick={() => go("/user/auth")} className="btn btn-primary mt-2">
              Sign in
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
