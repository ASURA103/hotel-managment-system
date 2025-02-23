import React from "react";
import Input from "../Components/input";
import { B_URL } from "../../config";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post(`${B_URL}/owner/signup`, data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.ownername);
      localStorage.setItem("type","owner")
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
    <div className=" text-[#03045e] font-bold">
      <div className="content-center w-[300px] ml-6 pt-6">
        <h1 className="text-center text-4xl font-extrabold ">
          <i className="rounded-md shadow-current shadow-md px-1 cursor-none">
            Hotel Owner
          </i>
        </h1>
      </div>
      <div className=" ml-6  rounded-md p-5 w-[300px] shadow-xl shadow-current bg-[#caf0f8]  rounded-[9vh] ">
        <div className="flex flex-col gap-2">
          <h1 className="text-center text-3xl font-extrabold cursor-none ">
            SIGN UP
          </h1>
          <p className="text-gray-400 text-center cursor-none">
            Enter your credentials to signup
          </p>
        </div>
        <div className="rounded-b-[3vh] shadow-lg shadow-current pl-1">
          <Input
            type="text"
            placeholder="name "
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
            placeholder="****"
            name="Password"
            id="password"
            onChange={(e) => handleChange("password", e)}
          />{" "}
          <br />
          <button
            className="w-[100%] bg-secondary hover:bg-priamry transition-all ease-linear duration-300 h-10 rounded-md "
            onClick={handleSubmit}
          >
            <b className="shadow-lg px-1 pb-[2px] hover:shadow-current hover:border-[#03045e] hover:border-2 rounded-[30%]">
              Signup
            </b>
          </button>
          <p className="text-gray-500 text-center">
            Already have a account ?{" "}
            <a
              className="underline cursor-pointer hover:text-[#03045e] "
              onClick={() => {
                authType("signin");
              }}
            >
              Signin
            </a>
          </p>
          <Toaster />
        </div>
      </div>
    </div>
  );
};
export default SellerSignup;
