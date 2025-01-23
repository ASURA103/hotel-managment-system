import React from "react";
import Input from "../Components/input.jsx";
import { useNavigate } from "react-router-dom";
import { B_URL } from "../../config.js";
import { toast, Toaster } from "sonner";
import Select, { Option } from "../Components/select.jsx";
import axios from "axios";

export const AddHotel = () => {
  const navigate = useNavigate();
  const [details, setDetails] = React.useState({
    name: "",
    area: "",
    city: "",
    state: "",
    price: null,
    unmarriedFriendly: null,
    image: null,
    AcRoomA: null,
    NonAcRoomA: null,
    TotalAc: null,
    TotalNonAc: null,
  });
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  function handleChange(type,e) {
    setDetails({
      ...details,
      [type]: e.target.value
    });
  }
  async function handleSubmit() {
    let formData = new FormData();
      formData.append("name", details.name);
      formData.append("area", details.area) 
      formData.append("city", details.city) 
      formData.append("state", details.state)
      formData.append("price", details.price) 
      formData.append("unmarriedFriendly", details.unmarriedFriendly) 
      formData.append("file", details.image) 
      formData.append("AcRoomA", details.AcRoomA) 
      formData.append("NonAcRoomA", details.NonAcRoomA) 
      formData.append("TotalAc", details.TotalAc) 
      formData.append("TotalNonAc", details.TotalNonAc)

    try {
      const response = await axios.post(`${B_URL}/owner/addhotel`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("Hotel added");
      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("error adding Hotel");
      console.log("error adding Hotel", error);
    }
  }
  return (
    <div className="m-5 p-5">
      
      
      
      <div className="  rounded-md bg-gray-400 w-[300px] shadow-lg shadow-current p-5">
      <h1 className='text-center text-4xl font-extrabold '><i className='rounded-md shadow-black shadow-md px-1 cursor-none '>Add Hotel </i></h1>
        <div className=" mb-5  p-5 rounded-md bg-gray-400  shadow-lg shadow-current">
          <Input
            type="text"
            placeholder="name"
            name="Name"
            id="name"
            onChange={(e) =>{handleChange("name",e);
            }}
          />

          <Input
            type="text"
            placeholder="area"
            name="Area"
            id="area"
            onChange={(e) =>{handleChange("area",e);
            }}
          />

          <Input
            type="text"
            placeholder="city"
            name="City"
            id="city"
            onChange={(e) =>{handleChange("city",e);
            }}
          />

          <Select title="State" onChange={(e)=>handleChange("state",e)}>
            <Option value="">Select</Option>
            {states.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="Rs"
            name="Price"
            id="price"
            onChange={(e) =>{handleChange("price",e);
            }}
          />
            <Select title="Unmarried Friendly" onChange={(e)=>{handleChange("unmarriedFriendly",e)}}>
              <Option value="true">Select</Option>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>

          <Input
            type="file"
            placeholder="Image"
            name="Image"
            id="image"
            onChange={(e)=>{setDetails({...details,image: e.target.files[0]})}} />

          <Select title="Ac Room Available" onChange={(e)=>{handleChange("AcRoomA",e)}}>
              <Option value="true">Select</Option>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>

          <Select title="Non-Ac Room Available" onChange={(e)=>{handleChange("NonAcRoomA",e)}}>
            <Option value="true">Select</Option>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>

          <Input
            type="number"
            placeholder="Number of rooms"
            name="Total Ac Rooms"
            id="TotalAc"
            onChange={(e) =>{handleChange("TotalAc",e)}}
          />

          <Input
            type="number"
            placeholder="Number of rooms"
            name="Total Non-Ac Rooms"
            id="TotalNonAc"
            onChange={(e) =>{handleChange("TotalNonAc",e) }}
          />

<button className='w-[100%] bg-secondary hover:bg-priamry transition-all ease-linear duration-300 h-10 rounded-md ' onClick={handleSubmit}><b className="shadow-md rounded">SUBMIT</b></button>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default AddHotel;
