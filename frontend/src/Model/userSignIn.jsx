import Input from "../Components/input.jsx";
import React from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { AuthHeading, ExpiredNote } from "../Components/ui/AuthShell.jsx";
import { saveSession } from "../lib/session.js";
import { errorMessage } from "../lib/api.js";

const UserSignin = ({ position }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [busy, setBusy] = React.useState(false);

  function handlechange(type, e) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const response = await axios.post(`${B_URL}/user/signin`, formData);
      saveSession({ token: response.data.token, name: response.data.name, type: "user" });
      toast.success("Signin Successful");
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(errorMessage(error, "Invalid credentials"));
      console.log("error while signin up", error);
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md animate-fade-up">
        <div className="mb-8 flex items-center justify-between">
          <p className="eyebrow">Welcome back</p>
          <button type="button" onClick={() => navigate("/")} aria-label="Home" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:bg-surface">
            <HiHome size={18} />
          </button>
        </div>
        <ExpiredNote />
        <AuthHeading title="Sign in" subtitle="Enter your credentials to continue" />

        <div className="flex flex-col gap-5">
          <Input type="email" placeholder="name@gmail.com" name="Email" id="email" autoComplete="email" value={formData.email} onChange={(e) => handlechange("email", e)} />
          <Input type="password" placeholder="********" name="Password" id="password" autoComplete="current-password" value={formData.password} onChange={(e) => handlechange("password", e)} />
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? "Signing in…" : "Sign In"}
          </button>
          <p className="text-center text-sm text-muted">
            Create new account?{" "}
            <button type="button" onClick={() => position("signup")} className="font-semibold text-ink underline-offset-4 hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </form>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default UserSignin;
