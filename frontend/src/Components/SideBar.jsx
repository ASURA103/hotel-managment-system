import React from "react";
import { Link } from "react-router-dom";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTheme } from "./ThemeContext";

// Dashboard navigation. `details` = [{ name, set, key? }]; `active` highlights the current page.
// Accepts both setShowSideBar and setShowSidebar (callers used different spellings).
const SideBar = ({ details, setShowSideBar, setShowSidebar, active, subtitle, onLogout }) => {
  const closeOnMobile = setShowSideBar || setShowSidebar;
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-full w-72 flex-col border-r border-line bg-surface">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 px-6 pb-8 pt-7">
        <img src="/logo1.webp" alt="" className="h-10 w-auto" />
        <span>
          <span className="block font-display text-xl leading-none text-ink">DreamStay</span>
          {subtitle && <span className="eyebrow mt-1 block">{subtitle}</span>}
        </span>
      </Link>

      {/* Menu items */}
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {details.map((item, index) => {
          const isActive = active !== undefined && (item.key ?? item.name) === active;
          return (
            <button
              type="button"
              key={index}
              onClick={() => {
                item.set();
                // Close the sidebar automatically on mobile
                if (window.innerWidth < 1024 && closeOnMobile) {
                  closeOnMobile(false);
                }
              }}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive ? "bg-primary text-primaryInk shadow-soft" : "text-ink hover:bg-surface2"
              }`}
            >
              {item.name}
              {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primaryInk" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-line p-4">
        <button type="button" onClick={toggleTheme} className="btn btn-ghost justify-start">
          {theme === "dark" ? <BsSun size={15} /> : <BsMoonStars size={15} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        {onLogout && (
          <button type="button" onClick={onLogout} className="btn justify-start text-danger hover:bg-danger/10">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
