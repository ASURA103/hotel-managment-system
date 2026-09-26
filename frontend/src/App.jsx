import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import PageLoader from "./Components/ui/PageLoader.jsx";
import RequireRole from "./Components/RequireRole.jsx";

// Each page is its own chunk, loaded when first visited.
const Landing = lazy(() => import("./Pages/Landing"));
const UserAuth = lazy(() => import("./Pages/userAuth"));
const SellerAuth = lazy(() => import("./Pages/SellerAuth"));
const AddHotel = lazy(() => import("./Pages/addHotel"));
const SellerDashboard = lazy(() => import("./Pages/SellerDashboard"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const AdminAuth = lazy(() => import("./Pages/AdminAuth"));
const Searchpage = lazy(() => import("./Pages/Searchpage"));
const Book = lazy(() => import("./Model/Book"));
const UBookings = lazy(() => import("./Pages/UBookings"));

function NotFound() {
  return (
    <main className="container-page flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="eyebrow">404</p>
      <h1 className="title-section">This page checked out</h1>
      <p className="text-muted">The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary mt-2">Back to DreamStay</Link>
    </main>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/user/auth" element={<UserAuth />} />
            <Route path="/seller/auth" element={<SellerAuth />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/seller/add" element={<RequireRole role="owner"><AddHotel /></RequireRole>} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/admin/dashboard" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
            <Route path="/search" element={<Searchpage />} />
            <Route path="/book" element={<Book />} />
            <Route path="/bookings" element={<UBookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
