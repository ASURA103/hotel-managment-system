import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { B_URL } from "../../config.js";
import { toast, Toaster } from "sonner";
import axios from "axios";
import HotelForm from "../Components/HotelForm.jsx";
import PageHeader from "../Components/ui/PageHeader.jsx";
import { errorMessage } from "../lib/api.js";

// Works as its own page (/seller/add) and inside the owner dashboard (`embedded`).
export const AddHotel = ({ embedded = false, onDone }) => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function handleSubmit(formData) {
    setBusy(true);
    try {
      await axios.post(`${B_URL}/owner/addhotel`, formData);
      toast.success("Hotel added");
      setTimeout(() => {
        if (embedded && onDone) onDone();
        else navigate("/seller/dashboard");
      }, 1200);
    } catch (error) {
      toast.error(errorMessage(error, "error adding Hotel"));
      console.log("error adding Hotel", error);
      setBusy(false);
    }
  }

  return (
    <div className={embedded ? "" : "container-page min-h-screen bg-bg py-12"}>
      <PageHeader eyebrow="Your property" title="Add Hotel" subtitle="Guests see these details when they search and book." />
      <HotelForm submitLabel="Add hotel" busy={busy} onSubmit={handleSubmit} />
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default AddHotel;
