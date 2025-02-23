import React, { useState } from 'react'
import { B_URL } from '../../config.js'
import axios from "axios"
import { AdminBookingCard } from '../Components/HotelCard.jsx'
const AllBookings = () => {
    const [data,setData] = useState([])
    React.useEffect(()=>{
        async function serverCall(){
            const response = await axios.get(`${B_URL}/admin/getallbookings`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(response.data)
            console.log(response.data)
        }
        serverCall()
    },[])
  return (
    <div className='flex flex-col items-center'>
        {
            data.map((item,index)=>(
                <AdminBookingCard key={index} item={item} />
            ))
        }
    </div>
  )
}

export default AllBookings