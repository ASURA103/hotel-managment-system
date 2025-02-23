import React from "react";
import Input from "../Components/input.jsx";
import { B_URL } from "../../config.js";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

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
      toast.success("Signin Successful");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("type","owner")
      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    }
  }
  return (
    <div className="justify-center items-center  w-full h-screen ">
      <div className="w-[600px] h-[600px] p-6">
        <div className="content-center w-[300px]">
          <h1 className="text-center text-4xl font-extrabold ">
            <i className="rounded-md shadow-current shadow-md px-1 cursor-none">
              Hotel Owner
            </i>
          </h1>
        </div>
        <div className="border-2 w-[300px] bg-[#caf0f8] rounded-[9vh] shadow-xl shadow-current p-6 text-[#03045e] font-bold">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-3xl font-extrabold cursor-none">
              SIGN IN
            </h1>
            <p className="text-gray-400 text-center cursor-none">
              Enter your credentials to sign in
            </p>
          </div>
          <div className="rounded-b-[3vh] pl-1 shadow-lg shadow-current">
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
            <button
              className="w-[100%] bg-secondary hover:bg-priamry transition-all ease-linear duration-300 h-10 rounded-md"
              onClick={handleSubmit}
            >
              <b className="shadow-lg px-1 pb-[2px] hover:shadow-current hover:border-[#03045e] hover:border-2 rounded-[30%]">
                Sign in
              </b>
            </button>
            <p className="text-gray-500 pl-2">
              Don't have a account?{" "}
              <a
                className="underline cursor-pointer hover:text-[#03045e]"
                onClick={() => {
                  authType("signup");
                }}
              >
                Signup
              </a>
            </p>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
};
export default SellerSignin;
