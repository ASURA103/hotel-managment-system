import React from "react";
import Input from "../Components/input.jsx";
import { B_URL } from "../../config.js";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const SellerSignin = ({ authType }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(type, e) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {
      const response = await axios.post(`${B_URL}/owner/signin`, formData);

      localStorage.setItem("name", response.data.ownername);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type", "owner");

      toast.success("Signin Successful");

      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    }
  }

  return (
    <div
      className="
      min-h-screen
      flex items-center justify-center
      px-4

      bg-gradient-to-br
      from-sky-200
      via-cyan-100
      to-blue-200

      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-800

      transition-all duration-500

      relative
    "
    >
      {/* HOME BUTTON */}

      <button
        onClick={() => navigate("/")}
        className="
          absolute

          top-6 left-6

          w-12 h-12

          rounded-full

          bg-white/70
          dark:bg-slate-800/80

          backdrop-blur-lg

          shadow-lg

          flex items-center justify-center

          text-[#03045e]
          dark:text-sky-300

          hover:scale-110

          hover:bg-white
          dark:hover:bg-slate-700

          transition-all duration-300
        "
      >
        <FaHome size={20} />
      </button>

      {/* MAIN CARD */}

      <div
        className="
          w-full
          max-w-md

          bg-white/40
          dark:bg-slate-900/60

          backdrop-blur-xl

          border

          border-white/40
          dark:border-slate-700

          rounded-[40px]

          shadow-2xl

          p-8

          text-[#03045e]
          dark:text-white

          transition-all duration-500
        "
      >
        {/* HEADER */}

        <div className="mb-8">
          <h1
            className="
            text-center

            text-4xl

            font-extrabold

            text-[#03045e]

            dark:text-sky-300
          "
          >
            DreamStay
          </h1>

          <p
            className="
            text-center

            text-lg

            mt-2

            text-[#0077b6]

            dark:text-slate-300
          "
          >
            Hotel Owner Portal
          </p>
        </div>

        {/* SIGNIN HEADER */}

        <div className="flex flex-col gap-2 mb-6">
          <h1
            className="
            text-center

            text-3xl

            font-extrabold

            dark:text-white
          "
          >
            SIGN IN
          </h1>

          <p
            className="
            text-center

            font-medium

            text-gray-600

            dark:text-slate-400
          "
          >
            Enter your credentials to sign in
          </p>
        </div>

        {/* INPUTS */}

        <div className="flex flex-col gap-5">
          <Input
            type="email"
            placeholder="name@gmail.com"
            name="Email"
            id="email"
            onChange={(e) => handleChange("email", e)}
          />

          <Input
            type="password"
            placeholder="*****"
            name="Password"
            id="password"
            onChange={(e) => handleChange("password", e)}
          />

          {/* BUTTON */}

          <button
            onClick={handleSubmit}
            className="
              w-full

              h-12

              rounded-xl

              bg-blue-600
              dark:bg-sky-500

              text-white

              font-bold

              text-lg

              hover:bg-blue-700
              dark:hover:bg-sky-600

              shadow-lg

              hover:shadow-xl

              transition-all duration-300
            "
          >
            Sign In
          </button>

          {/* SIGNUP */}

          <p
            className="
            text-center

            font-medium

            text-gray-700

            dark:text-slate-300
          "
          >
            Don't have an account?{" "}
            <span
              onClick={() => authType("signup")}
              className="
                text-blue-700

                dark:text-sky-400

                cursor-pointer

                hover:underline

                hover:text-blue-900

                dark:hover:text-sky-300

                transition
              "
            >
              Signup
            </span>
          </p>
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
};

export default SellerSignin;