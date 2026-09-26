import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import HotelImage from './ui/HotelImage.jsx'
import BookingCard from './ui/BookingCard.jsx'
import { formatPrice } from '../lib/format.js'

// Horizontal hotel row with a main action button; extra actions go in `children`.
const HotelCard = ({ item, buttonName, buttonClick, children }) => {
  return (
    <div className='card card-hover flex w-full flex-col overflow-hidden animate-fade-up md:flex-row'>
      <HotelImage src={item.Image} alt={item.name} className='h-48 w-full shrink-0 md:h-auto md:w-60' />

      <div className='flex flex-1 flex-col justify-between gap-5 p-6 md:flex-row md:items-center'>
        <div>
          <h3 className='font-display text-2xl leading-tight text-ink'>{item.name}</h3>
          <p className='mt-1.5 flex items-center gap-1.5 text-sm text-muted'>
            <IoLocationOutline className='text-brass' />
            {item.area}, {item.city}
          </p>
          <p className='mt-3 text-lg font-semibold text-ink'>
            {formatPrice(item.price)} <span className='text-sm font-normal text-muted'>/ night</span>
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <button type='button' className='btn btn-outline btn-sm' onClick={buttonClick}>
            {buttonName}
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}

export default HotelCard

// A booking as admins see it: hotel, guest and stay details.
export const AdminBookingCard = ({ item, index }) => <BookingCard booking={item} index={index} showGuest />
