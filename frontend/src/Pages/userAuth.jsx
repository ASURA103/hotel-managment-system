import React, { useState } from "react";
import UserSignin from "../Model/userSignIn";
import UserSignup from "../Model/userSignup";

// Optimized copies of the original photos (U1.jpg, L12.avif stay in /public).
const signupImage = "/U1.webp";
const signinImage = "/L12.avif";

// Both forms sit side by side on large screens; a photo panel slides over the one not in use.
// Small screens show only the active form.
const UserAuth = () => {
  const [position, setPosition] = useState(
    new URLSearchParams(window.location.search).get("expired") ? "signin" : "signup",
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className={position === "signup" ? "block" : "hidden lg:block"}>
          <UserSignup position={setPosition} />
        </div>
        <div className={position === "signin" ? "block" : "hidden lg:block"}>
          <UserSignin position={setPosition} />
        </div>
      </div>

      <div
        className={`absolute top-0 hidden h-full w-1/2 overflow-hidden transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:block ${
          position === "signup" ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <img key={position} src={position === "signup" ? signupImage : signinImage} alt="" className="absolute inset-0 h-full w-full object-cover animate-fade-in" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1512]/80 via-[#0E1512]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="eyebrow !text-[#CDAA6E]">DreamStay</p>
          <p className="mt-3 max-w-md font-display text-4xl leading-tight text-[#F7F3EC]">
            {position === "signup" ? "Your next stay starts here." : "Welcome back."}
          </p>
          <button
            type="button"
            onClick={() => setPosition(position === "signup" ? "signin" : "signup")}
            className="btn mt-6 border border-[#F7F3EC]/40 text-[#F7F3EC] hover:bg-[#F7F3EC]/10"
          >
            {position === "signup" ? "I already have an account" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
