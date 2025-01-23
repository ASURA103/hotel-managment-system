import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { B_URL } from '../../config.js'
import { toast, Toaster } from 'sonner'
import SearchBar from '../Components/SearchBar.jsx'
import { useNavigate } from 'react-router-dom'

export const Searchpage = ({}) => {
  const navigate = useNavigate();
    const items = useSelector(state=> state)
    const [loading, setLoading] =useState(true)
    const [hotels, setHotels] = useState([])
    console.log(items)
        useEffect(()=>{
            const fetchHotels = async () =>{
                try{
                    const response = await axios.post(`${B_URL}/user/searchHotel`,items.updateItem)
                    setHotels(response.data)
                    setLoading(false)
                    console.log("search data response", response.data)
                    
                } catch (error){
                    toast.error("error while searching hotels")

                }
            }
            fetchHotels()
        }, [items.updateItem])
        console.log(items)
        console.log("hotels",hotels)

        function Book(hotel){
          navigate("/book", {state:hotel})
        }
  return (
    < > 
    <div className=" bg-[#90e0ef] text-[#03045e] h-screen ">
     <div className=" px-[48vh] z-10  ">
            <SearchBar  />
          </div>
    <Toaster />
    {
        loading ?
        (<div className=''>
            LOADING...
        </div>
        ):(
            <div>
            <div className=''>
            <h1>{hotels.length} found in {items.updateItem.value} </h1>
            <div>
                {}
            </div>
            </div>
            
        
          <div className="hotel-list flex space-x-4 m-4">{hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="hotel-card block bg-[#caf0f8] p-2 rounded-xl  shadow-md shadow-current"
        > 
          <div > 
          <img src={hotel.Image} alt={hotel.name} className="w-[40vh] h-[30vh] rounded-xl "/>
          </div>
          <div className="text-center mb-4 ">
              <i className="font-extrabold text-4xl  ">{hotel.name}</i>
            </div>
          <div className="font-bold">
            <p>Area: {hotel.area}</p>
            <p>City: {hotel.city}</p>
            <p>State: {hotel.state}</p>
            <p>Unmarried Friendly: {hotel.unmarriedFriendly ? "Yes" : "No"}</p>
            <p>AC Rooms Available: {hotel.AcRoomA ? "Yes" : "No"}</p>
            <p>Non-AC Rooms Available: {hotel.NonAcRoomA ? "Yes" : "No"}</p>
            <div className='justify-between flex pr-5'>
            <b className="text-green-600  font-bold text-xl pl-4  ">
                    {" "}
                    ₹{hotel.price}<span className="text-black">/</span>
                    <span className="text-gray-500 text-sm font-normal">
                      Night
                    </span>
                  </b>
                  <button  className='  bg-secondary hover:bg-priamry transition-'onClick={()=>Book(hotel)}><b className="shadow-lg px-1 pb-[2px] hover:shadow-current hover:border-[#03045e] hover:border-2 rounded-[30%]">BOOK NOW</b></button>
                  </div>

          </div>
        </div>
      ))}
      </div>
      </div>
    )
    }
    </div>
    </>
  )
}
export default Searchpage 