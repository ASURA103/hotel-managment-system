import React from "react";
import Input from "../Components/input.jsx";
import { B_URL } from "../../config.js";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { AuthHeading, ExpiredNote } from "../Components/ui/AuthShell.jsx";
import { saveSession } from "../lib/session.js";
import { errorMessage } from "../lib/api.js";

const SellerSignin = ({ authType }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
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
    setBusy(true);
    try {
      const response = await axios.post(`${B_URL}/owner/signin`, formData);
      saveSession({ token: response.data.token, name: response.data.ownername, type: "owner" });
      toast.success("Signin Successful");
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
        <p className="eyebrow">Hotel Owner Portal</p>
        <button type="button" onClick={() => navigate("/")} aria-label="Home" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-surface">
          <FaHome size={16} />
        </button>
      </div>
      <ExpiredNote />
      <AuthHeading title="Sign in" subtitle="Enter your credentials to sign in" />

      <div className="flex flex-col gap-5">
        <Input type="email" placeholder="name@gmail.com" name="Email" id="email" autoComplete="email" value={formData.email} onChange={(e) => handleChange("email", e)} />
        <Input type="password" placeholder="*****" name="Password" id="password" autoComplete="current-password" value={formData.password} onChange={(e) => handleChange("password", e)} />
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? "Signing in…" : "Sign In"}
        </button>
        <p className="text-center text-sm text-muted">
          Don't have an account?{" "}
          <button type="button" onClick={() => authType("signup")} className="font-semibold text-ink underline-offset-4 hover:underline">
            Signup
          </button>
        </p>
      </div>
      <Toaster position="top-center" richColors />
    </form>
  );
};

export default SellerSignin;
