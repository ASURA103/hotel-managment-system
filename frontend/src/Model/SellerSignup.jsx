import React from "react";
import Input from "../Components/input";
import { B_URL } from "../../config";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { AuthHeading } from "../Components/ui/AuthShell.jsx";
import { saveSession } from "../lib/session.js";
import { errorMessage } from "../lib/api.js";

const SellerSignup = ({ authType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    idProof: "",
    password: "",
  });
  const [busy, setBusy] = React.useState(false);

  function handleChange(type, e) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...formData,
      phone: parseInt(formData.phone),
    };
    setBusy(true);
    try {
      const response = await axios.post(`${B_URL}/owner/signup`, data);
      saveSession({ token: response.data.token, name: response.data.ownername, type: "owner" });
      toast.success("Signup Successful");
      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 1200);
    } catch (error) {
      toast.error(errorMessage(error, "Invalid Credentials"));
      console.log(error);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex items-center justify-between">
        <p className="eyebrow">Hotel Owner</p>
        <button type="button" onClick={() => navigate("/")} aria-label="Home" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-surface">
          <HiHome size={18} />
        </button>
      </div>
      <AuthHeading title="Create owner account" subtitle="Join DreamStay and list your properties" />

      <div className="flex flex-col gap-5">
        <Input type="text" placeholder="name" name="Name" id="name" autoComplete="name" value={formData.name} onChange={(e) => handleChange("name", e)} />
        <Input type="email" placeholder="name@gmail.com" name="Email" id="email" autoComplete="email" value={formData.email} onChange={(e) => handleChange("email", e)} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input type="number" placeholder="9876543210" name="Phone" id="phone" autoComplete="tel" value={formData.phone} onChange={(e) => handleChange("phone", e)} />
          <Input type="text" placeholder="FGHSJKD4" name="Id Proof" id="idproof" value={formData.idProof} onChange={(e) => handleChange("idProof", e)} />
        </div>
        <Input type="password" placeholder="At least 6 characters" name="Password" id="password" minLength={6} autoComplete="new-password" value={formData.password} onChange={(e) => handleChange("password", e)} />
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? "Creating account…" : "Sign Up"}
        </button>
        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <button type="button" onClick={() => authType("signin")} className="font-semibold text-ink underline-offset-4 hover:underline">
            Sign In
          </button>
        </p>
      </div>
      <Toaster position="top-right" richColors />
    </form>
  );
};

export default SellerSignup;
