import Input from "../Components/input.jsx";
import React from "react";
import axios from "axios"
import {B_URL} from '../../config.js'
import { Toaster ,toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
const UserSignup = ({position}) => {
    const navigate= useNavigate()
    const [formData,setFormData] = React.useState({
        name:"",
        username:"",
        email: "",
        password:""
    }) 

    function handlechange(type,e){
        setFormData(
            {
                ...formData,
                [type]: e.target.value
            }
        )
    }
    
    async function handleSubmit() 
    {
    try {
        const response = await axios.post(`${B_URL}/user/signup`,formData)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("name",response.data.name)
        toast.success("Signup Successful")
        setTimeout(()=>{
            navigate("/")
        },2000)
         }
     catch (error) {
        toast.error("Invalid credentials")
        console.log("error while signup".error)
    }    
    }
    return(
        <div className='flex font-bold items-center justify-center text-[#03045e]  min-h-screen  '>
        <div className='border-2 border-borders bg-[#caf0f8] rounded-[6vh]  shadow-xl  shadow-current w-[400px]   p-6'>
        <div className='flex flex-col gap-2'>
        <h1 className='text-center text-3xl font-extrabold cursor-none '>SIGN UP</h1>
        <p className='text-gray-400 text-center cursor-non'>Enter your credentials to signup</p>
        </div>
      <div className='flex flex-col gap-4 shadow-lg shadow-current rounded-b-[3vh] pl-1'>
      <Input type="text" placeholder="Name" name="Name" id="name" onChange={(e)=>handlechange("name",e)} />
      <Input type="text" placeholder="username" name="Username" id="username" onChange={(e)=>handlechange("username",e)} />
      <Input type="email" placeholder="name@gmail.com" name="Email" id="email" onChange={(e)=>handlechange("email",e)} />
      <Input type="password" placeholder="****" name="Password" id="password" onChange={(e)=>handlechange("password",e)} />
      <button className='w-[100%] bg-secondary hover:bg-priamry transition-all ease-linear duration-300 h-10 rounded-md ' onClick={handleSubmit}><b className="shadow-lg px-1 pb-[2px] hover:shadow-current hover:border-[#03045e] hover:border-2 rounded-[30%] ">Signup</b></button>
      <p className='text-gray-600 text-center '>Already have a account? <a className='underline cursor-pointer hover:text-[#03045e]' onClick={()=>position("signin")}>Sign in</a></p>
      </div>
      </div>
      <Toaster />
        </div>
    )

    }
    export default UserSignup

