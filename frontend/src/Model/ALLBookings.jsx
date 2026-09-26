import React, { useState } from 'react'
import { B_URL } from '../../config.js'
import axios from "axios"
import { AdminBookingCard } from '../Components/HotelCard.jsx'
import PageHeader from '../Components/ui/PageHeader.jsx'
import EmptyState from '../Components/ui/EmptyState.jsx'
import { BookingCardSkeleton } from '../Components/ui/BookingCard.jsx'

const AllBookings = () => {
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    React.useEffect(()=>{
        async function serverCall(){
            try {
                const response = await axios.get(`${B_URL}/admin/getallbookings`)
                setData(Array.isArray(response.data) ? response.data : [])
            } catch (error) {
                console.log("error while fetching all bookings", error)
            } finally {
                setLoading(false)
            }
        }
        serverCall()
    },[])
  return (
    <>
    <PageHeader eyebrow="Admin" title="All Bookings" subtitle={loading ? "Loading…" : `${data.length} bookings`} />
    <div className='flex flex-col gap-6'>
        {loading && Array.from({ length: 3 }, (_, i) => <BookingCardSkeleton key={i} />)}
        {!loading && data.length === 0 && <EmptyState title="No bookings yet" text="Bookings from every hotel appear here." />}
        {
            data.map((item,index)=>(
                <AdminBookingCard key={item._id} item={item} index={index} />
            ))
        }
    </div>
    </>
  )
}

export default AllBookings
