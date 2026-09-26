import React, { useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { B_URL } from '../../config.js'
import HotelForm from '../Components/HotelForm.jsx'
import PageHeader from '../Components/ui/PageHeader.jsx'
import EmptyState from '../Components/ui/EmptyState.jsx'
import { errorMessage } from '../lib/api.js'

// Owner dashboard page: edit one of the owner's hotels (opened from My Hotels → Edit).
export const EditHotel = ({ hotel, onDone }) => {
  const [busy, setBusy] = useState(false)

  if (!hotel?._id) {
    return (
      <EmptyState
        title="Choose a hotel to edit"
        text="Open My Hotels and press Edit on the hotel you want to change."
        action={onDone && <button type="button" className="btn btn-outline" onClick={onDone}>Go to My Hotels</button>}
      />
    )
  }

  async function handleSubmit(formData) {
    formData.append('id', hotel._id)
    setBusy(true)
    try {
      await axios.put(`${B_URL}/owner/updatehotel`, formData)
      toast.success('Hotel updated')
      setTimeout(() => onDone && onDone(), 900)
    } catch (error) {
      toast.error(errorMessage(error, 'error while updating'))
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Edit hotel"
        title={hotel.name}
        subtitle="Changes show on your listing straight away."
        actions={onDone && <button type="button" className="btn btn-outline" onClick={onDone}>Cancel</button>}
      />
      <HotelForm key={hotel._id} initial={hotel} requireImage={false} submitLabel="Save changes" busy={busy} onSubmit={handleSubmit} />
      <Toaster richColors position="top-center" />
    </div>
  )
}
export default EditHotel
