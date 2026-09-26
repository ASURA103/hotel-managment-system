import Input from "../Components/input.jsx";
import React from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AuthShell, { AuthHeading, ExpiredNote } from "../Components/ui/AuthShell.jsx";
import { saveSession } from "../lib/session.js";
import { errorMessage } from "../lib/api.js";

const AdminAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: "",
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
      const response = await axios.post(`${B_URL}/admin/signin`, formData);
      saveSession({ token: response.data.token, name: response.data.username, type: "admin" });
      toast.success("Signin Successful");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1200);
    } catch (error) {
      toast.error(errorMessage(error, "Invalid credentials"));
      console.log("Error while signing in", error);
      setBusy(false);
    }
  }

  return (
    <AuthShell image="/footer.avif" eyebrow="Admin" caption="Keep DreamStay running smoothly.">
      <form onSubmit={handleSubmit}>
        <p className="eyebrow mb-8">Admin</p>
        <ExpiredNote />
        <AuthHeading title="Sign in" subtitle="Enter your credentials to sign in" />
        <div className="flex flex-col gap-5">
          <Input type="text" placeholder="Username" name="Username" id="username" autoComplete="username" value={formData.username} onChange={(e) => handlechange("username", e)} />
          <Input type="password" placeholder="Password" name="Password" id="password" autoComplete="current-password" value={formData.password} onChange={(e) => handlechange("password", e)} />
          <button type="submit" disabled={busy} className="btn btn-primary w-full">
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </form>
      <Toaster richColors position="top-center" />
    </AuthShell>
  );
};

export default AdminAuth;
