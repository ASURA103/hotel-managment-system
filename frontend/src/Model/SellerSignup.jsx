import React from "react";
import Input from "../Components/input";
import { B_URL } from "../../config";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const SellerSignup = ({ authType }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    idproof: "",
    password: "",
  });

  function handleChange(type, e) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit() {
    const data = {
      ...formData,
      phone: parseInt(formData.phone),
    };

    try {
      const response = await axios.post(
        `${B_URL}/owner/signup`,
        data
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.ownername);
      localStorage.setItem("type", "owner");

      toast.success("Signup Successful");

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

      px-4 py-10

      bg-gradient-to-br
      from-orange-100
      via-amber-100
      to-yellow-100

      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-800

      relative
    "
    >
      {/* HOME BUTTON */}

      <button
        onClick={() => navigate("/")}
        className="
          fixed top-6 left-6 z-50

          w-12 h-12

          rounded-full

          bg-white/80
          dark:bg-slate-900/80

          backdrop-blur-lg

          border
          border-gray-200
          dark:border-slate-700

          shadow-lg

          flex items-center justify-center

          text-[#03045e]
          dark:text-white

          hover:scale-110
          hover:shadow-xl

          transition-all duration-300
        "
      >
        <HiHome size={24} />
      </button>

      {/* CARD */}

      <div
        className="
        w-full max-w-md

        backdrop-blur-xl

        bg-white/80
        dark:bg-slate-900/80

        border
        border-white/30
        dark:border-slate-700

        rounded-[2rem]

        shadow-2xl

        px-8 py-10

        transition-all duration-300

        hover:shadow-orange-300/30
      "
      >
        {/* TOP TITLE */}

        <div className="text-center mb-8">
          <h1
            className="
            text-4xl

            font-extrabold

            text-orange-600
            dark:text-orange-400
          "
          >
            Hotel Owner
          </h1>

          <p
            className="
            mt-2

            text-gray-500
            dark:text-gray-400
          "
          >
            Join DreamStay and list your properties
          </p>
        </div>

        {/* FORM */}

        <div className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="name"
            name="Name"
            id="name"
            onChange={(e) => handleChange("name", e)}
          />

          <Input
            type="email"
            placeholder="name@gmail.com"
            name="Email"
            id="email"
            onChange={(e) => handleChange("email", e)}
          />

          <Input
            type="number"
            placeholder="9876543210"
            name="Phone"
            id="phone"
            onChange={(e) => handleChange("phone", e)}
          />

          <Input
            type="text"
            placeholder="FGHSJKD4"
            name="Id Proof"
            id="idproof"
            onChange={(e) => handleChange("idProof", e)}
          />

          <Input
            type="password"
            placeholder="********"
            name="Password"
            id="password"
            onChange={(e) => handleChange("password", e)}
          />

          <button
            onClick={handleSubmit}
            className="
            w-full

            py-3

            rounded-xl

            bg-orange-500
            hover:bg-orange-600

            dark:bg-orange-500
            dark:hover:bg-orange-600

            text-white

            font-bold
            text-lg

            shadow-lg

            hover:scale-[1.02]

            transition-all duration-300
          "
          >
            Sign Up
          </button>

          <p
            className="
            text-center

            text-gray-500
            dark:text-gray-400
          "
          >
            Already have an account?{" "}
            <span
              onClick={() => authType("signin")}
              className="
              cursor-pointer

              font-semibold

              text-orange-600
              dark:text-orange-400

              hover:underline
            "
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default SellerSignup;