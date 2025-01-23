import React, { useState } from "react";
import UserSignin from "../Model/userSignIn";
import UserSignup from "../Model/userSignup";
import hotel from "/U1.jpg";
import h from "/L6.jpg";
import u from "/L12.avif";

const UserAuth = () => {
  const [position, setPosition] = useState("signup");
  return (
    <div
      className=" relative  h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${h})`, height: ``, width: `` }}
    >
      <div className="z-0 min-h-screen grid grid-cols-2 bg-priamrybg">
        <UserSignup position={setPosition} />
        <UserSignin position={setPosition} />
      </div>
      <div
        className={`bg-cover bg-center min-h-screen w-[50%] backdrop-blur-md absolute transition-all ease-linear duration-300 top-0 ${
          position === "signup" ? "translate-x-[50vw]" : "translate-x-0"
        }`}
        style={{ backgroundImage: `url(${position === "signup" ? hotel : u})` }}
      >
        {" "}
        {position === "signup" ? (
          <h1 className="flex justify-center text-white text-4xl w-[100%] h-screen ">
            {" "}
            Welcome to the  <span className="ml-2 font-bold text-6xl text-blue-500 ">DreamStay</span>{" "}
          </h1>
        ) : (
          <h1 className="flex justify-center items-center text-white text-4xl w-[100%] h-screen pb-[20vh]">
            {" "}
            Ready for an Adventure{" "}
          </h1>
        )}{" "}
      </div>
    </div>
  );
};
export default UserAuth;
