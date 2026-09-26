import React, { useCallback, useEffect, useState } from 'react'
import { B_URL } from '../../config.js'
import axios from "axios"
import HotelCard from '../Components/HotelCard.jsx'
import { toast, Toaster } from 'sonner'
import PageHeader from '../Components/ui/PageHeader.jsx'
import EmptyState from '../Components/ui/EmptyState.jsx'
import { errorMessage } from '../lib/api.js'

const AllHotel = () => {
  const [data,setData]  =useState([])
  const [loading, setLoading] = useState(true)
  const [confirmId, setConfirmId] = useState(null)

  const serverCall = useCallback(async () => {
    try {
      const response = await axios.get(`${B_URL}/admin/allhotels`)
      setData(response.data.hotels || [])
    } catch (error) {
      toast.error(errorMessage(error, "error while getting hotels"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(()=>{
    serverCall()
  },[serverCall])

  async function handleDelete(id){
    if (confirmId !== id) {
      setConfirmId(id)
      toast("Press Delete again to confirm")
      return
    }
    try {
      await axios.delete(`${B_URL}/admin/deleteHotel`,{
        data: {id:id},
      })
      toast.success("hotel deleted")
      setConfirmId(null)
      await serverCall()
    } catch (error) {
      toast.error(errorMessage(error, "error while deleting hotel"))
    }
  }

  async function handleWarning(id){
    try {
      await axios.post(`${B_URL}/admin/sendwarning`,{createdBy: id})
      toast.success("warning send")
    } catch (error) {
      console.log(error)
      toast.error(errorMessage(error, "error while sending warning"))
    }
  }

  return (
    <>
    <PageHeader eyebrow="Admin" title="All Hotels" subtitle={loading ? "Loading…" : `${data.length} listed hotels`} />
    <div className='flex flex-col gap-5'>
      {loading && Array.from({ length: 3 }, (_, i) => <div key={i} className='skeleton h-40 w-full' />)}
      {!loading && data.length === 0 && <EmptyState title="No hotels listed" text="Hotels added by owners appear here." />}
      {
        data.map((item)=>(
          <HotelCard
            key={item._id}
            item={item}
            buttonName={confirmId === item._id ? "Confirm delete" : "Delete"}
            buttonClick={()=>{handleDelete(item._id)}}
          >
            <button type='button' onClick={()=>{handleWarning(item.createdBy)}} className='btn btn-sm btn-danger'>Warning</button>
          </HotelCard>
        ))
      }
    </div>
    <Toaster richColors position="top-center" />
    </>
  )
}

export default AllHotel
