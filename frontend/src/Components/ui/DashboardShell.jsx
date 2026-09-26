import NavbarShow from "../NavbarShow.jsx";

// Layout for the owner and admin dashboards. The sidebar can be opened and closed at every
// screen size (as before); on small screens it slides over the content with an overlay.
export default function DashboardShell({ sidebar, showSidebar, setShowSidebar, children }) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      {/* Overlay on mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-30 bg-[#0E1512]/40 backdrop-blur-sm animate-fade-in lg:hidden" onClick={() => setShowSidebar(false)} />
      )}

      {/* Main content */}
      <main className={`min-h-screen px-4 pb-16 pt-5 transition-[margin] duration-300 ease-out sm:px-6 lg:px-10 ${showSidebar ? "lg:ml-72" : ""}`}>
        <div className="mx-auto max-w-6xl">
          <div className={`relative z-50 mb-6 ${showSidebar ? "max-lg:invisible" : ""}`}>
            <NavbarShow setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
