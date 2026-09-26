import React, { useState } from 'react'
import Input from '../Components/input.jsx'
import {B_URL} from '../../config.js'
import {Toaster,toast} from "sonner"
import axios from "axios"
import PageHeader from '../Components/ui/PageHeader.jsx'
import { errorMessage } from '../lib/api.js'

const AddAdmin = () => {
  const [data,setData] = useState({
    username: "",
    password: ""
  })
  const [busy, setBusy] = useState(false)

  function handleChange(type,e){
    setData({
      ...data,
      [type]:e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    setBusy(true)
    try {
      await axios.post(`${B_URL}/admin/add`,data)
      toast.success("ADMIN ADDED")
      setData({ username: "", password: "" })
    } catch (error) {
      console.log(error)
      toast.error(errorMessage(error, "error while adding admin"))
    } finally {
      setBusy(false)
    }
  }
  return (
    <div>
      <Toaster richColors position="top-center" />
      <PageHeader eyebrow="Admin" title="Add Admin" subtitle="Up to 3 admins can manage DreamStay." />
      <form onSubmit={(e)=>{handleSubmit(e)}} className='card flex max-w-md flex-col gap-5 p-6 animate-fade-up md:p-8'>
        <Input type="text" placeholder="username" id="Username" name="Username" value={data.username} autoComplete="off" onChange={(e)=>{handleChange("username",e)}} />
        <Input type="password" placeholder="At least 6 characters" id="Password" name="Password" minLength={6} value={data.password} autoComplete="new-password" onChange={(e)=>{handleChange("password",e)}} />
        <button type='submit' disabled={busy} className='btn btn-primary w-full'>{busy ? "Adding…" : "Add Admin"}</button>
      </form>
    </div>
  )
}

export default AddAdmin
