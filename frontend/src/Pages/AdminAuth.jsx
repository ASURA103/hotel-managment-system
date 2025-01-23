import Input from "../Components/input.jsx";
import React from "react";
import axios from "axios"
import {B_URL} from '../../config.js'
import { Toaster ,toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
const AdminAuth = ({position}) => {
    const navigate= useNavigate()
    const [formData,setFormData] = React.useState({
        username: "",
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
        const response = await axios.post(`${B_URL}/admin/signin`,formData)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("name",response.data.username)
        toast.success("Signin Successful")
        setTimeout(()=>{
            navigate("/admin/dashboard")
        },2000)
         }
     catch (error) {
        toast.error("Invalid credentials")
        console.log("error while signin up".error)
    }    
    }
    return(
        <div className='flex items-center justify-center  min-h-screen '>
        
        <div className='border-2 border-borders w-[300px] bg-gray-300 rounded-md shadow-lg shadow-current p-6'>
          <div className='flex flex-col gap-2'>
          <h1 className='text-center text-3xl font-extrabold cursor-none'>SIGN IN</h1>
          <p className='text-gray-400 text-center cursor-none'>Enter your credentials to sign in</p>
          </div>
        <div className='flex flex-col gap-4 rounded-md shadow-lg shadow-current pl-1'>
        <Input type="text" placeholder="username" name="Name" id="username" onChange={(e)=>handlechange("username",e)} />
        <Input type="password" placeholder="****" name="Password" id="password" onChange={(e)=>handlechange("password",e)} />
        <button className='w-[100%] bg-secondary hover:bg-priamry transition-all ease-linear duration-300 h-10 rounded-md' onClick={handleSubmit}><b className="rounded-md shadow-md">Sign in</b></button>
        
        </div>
        </div>
  
        <Toaster/>
        </div>

    )

    }
    export default AdminAuth