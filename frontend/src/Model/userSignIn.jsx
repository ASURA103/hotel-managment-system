import Input from "../Components/input.jsx";
import React from "react";
import axios from "axios"
import {B_URL} from '../../config.js'
import { Toaster ,toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
const UserSignin = ({position}) => {
    const navigate= useNavigate()
    const [formData,setFormData] = React.useState({
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
        const response = await axios.post(`${B_URL}/user/signin`,formData)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("name",response.data.name)
        
        toast.success("Signin Successful")
        setTimeout(()=>{
            navigate("/")
        },2000)
         }
     catch (error) {
        toast.error("Invalid credentials")
        console.log("error while signin up".error)
    }    
    }
    return(
        <div className='flex items-center justify-center opacity-95 text-[#03045e] font-bold   min-h-screen '>
        
        <div className='border-2  w-[300px] bg-[#caf0f8]  rounded-[9vh] shadow-xl shadow-current p-6'>
          <div className='flex flex-col gap-2'>
          <h1 className='text-center text-3xl font-extrabold cursor-none'>SIGN IN</h1>
          <p className='text-gray-400 text-center cursor-none'>Enter your credentials to sign in</p>
          </div>
        <div className='flex flex-col gap-4 rounded-b-[3vh] shadow-lg shadow-current pl-1'>
        <Input type="email" placeholder="name@gmail.com" name="Email" id="email" onChange={(e)=>handlechange("email",e)} />
        <Input type="password" placeholder="****" name="Password" id="password" onChange={(e)=>handlechange("password",e)} />
        <button className='w-[100%] bg-secondary hover:bg-priamry transition-' onClick={handleSubmit}><b className="shadow-lg px-1 pb-[2px] hover:shadow-current hover:border-[#03045e] hover:border-2 rounded-[30%]">Sign in</b></button>
        <p className='text-gray-500 pl-2'>Create new account ! <a className='underline cursor-pointer hover:text-[#03045e] ' onClick={()=>position("signup")}>Sign Up</a></p>
        </div>
        </div>
  
        <Toaster/>
        </div>

    )

    }
    export default UserSignin

