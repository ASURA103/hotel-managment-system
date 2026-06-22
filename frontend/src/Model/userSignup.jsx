import Input from "../Components/input.jsx";
import React from "react";
import axios from "axios";
import { B_URL } from "../../config.js";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const UserSignup = ({ position }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  function handlechange(type, e) {
    setFormData({
      ...formData,
      [type]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {
      const response = await axios.post(
        `${B_URL}/user/signup`,
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("type", "user");

      toast.success("Signup Successful");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Invalid credentials");
      console.log("error while signup", error);
    }
  }

  return (
    <div
      className="
      min-h-screen

      flex items-center justify-center

      px-4 py-10

      bg-gradient-to-br
      from-sky-100
      via-cyan-100
      to-blue-200

      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-800
    "
    >
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

        hover:shadow-cyan-300/30
      "
      >
        
        {/* Heading */}

        <div className="text-center mb-8">
          <h1
            className="
            text-4xl
            font-extrabold

            text-[#03045e]
            dark:text-white
          "
          >
            SIGN UP
          </h1>

          <p
            className="
            mt-2

            text-gray-500
            dark:text-gray-400
          "
          >
            Enter your credentials to signup
          </p>
        </div>
        {/* Home Button */}

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

        {/* Form */}

        <div className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="Name"
            name="Name"
            id="name"
            onChange={(e) => handlechange("name", e)}
          />

          <Input
            type="text"
            placeholder="username"
            name="Username"
            id="username"
            onChange={(e) => handlechange("username", e)}
          />

          <Input
            type="email"
            placeholder="name@gmail.com"
            name="Email"
            id="email"
            onChange={(e) => handlechange("email", e)}
          />

          <Input
            type="password"
            placeholder="********"
            name="Password"
            id="password"
            onChange={(e) => handlechange("password", e)}
          />

          <button
            onClick={handleSubmit}
            className="
            w-full

            py-3

            rounded-xl

            bg-blue-600
            hover:bg-blue-700

            dark:bg-blue-500
            dark:hover:bg-blue-600

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
              onClick={() => position("signin")}
              className="
              cursor-pointer

              font-semibold

              text-blue-600
              dark:text-cyan-400

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

export default UserSignup;