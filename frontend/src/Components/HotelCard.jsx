import React from 'react'

const HotelCard = ({ item, buttonName, buttonClick, children }) => {

  console.log(item)

  return (
    <div
      className='
        w-full md:w-[90%] lg:w-[80%]

        bg-white dark:bg-gray-800

        border border-gray-200 dark:border-gray-700

        rounded-2xl

        shadow-lg hover:shadow-2xl

        transition-all duration-300

        flex flex-col md:flex-row

        justify-between

        gap-6

        p-4 md:p-6

        items-center
      '
    >
      {/* Image */}

      <div
        className='
          w-full md:w-40

          h-52 md:h-40

          rounded-xl

          overflow-hidden

          shadow-md

          bg-center bg-cover
        '
        style={{
          background: `url(${item.Image})`,
          backgroundSize: "cover"
        }}
      ></div>

      {/* Details */}

      <ul className='flex-1 text-center md:text-left'>
        <li className='text-2xl font-bold text-gray-800 dark:text-white'>
          {item.name}
        </li>

        <li className='text-lg font-medium text-gray-600 dark:text-gray-300 mt-2'>
          {item.area}, {item.city}
        </li>

        <li className='text-2xl font-bold text-blue-600 dark:text-blue-400 mt-3'>
          $ {item.price}
        </li>
      </ul>

      {/* Buttons */}

      <div className='flex flex-wrap justify-center gap-3'>
        <button
          className='
            bg-secondaryC

            hover:opacity-90

            text-white

            px-5 py-3

            rounded-xl

            font-bold

            uppercase

            shadow-md hover:shadow-lg

            transition-all duration-300
          '
          onClick={buttonClick}
        >
          {buttonName}
        </button>

        {children}
      </div>
    </div>
  )
}

export default HotelCard



export const AdminBookingCard = ({ item }) => {

  return (
    <div
      className='
        w-full md:w-[90%] lg:w-[80%]

        bg-white dark:bg-gray-800

        border border-gray-200 dark:border-gray-700

        rounded-2xl

        shadow-lg hover:shadow-xl

        transition-all duration-300

        p-6

        flex flex-col lg:flex-row

        justify-between

        gap-8

        items-center

        font-primary
      '
    >
      {/* Image */}

      <div
        className='
          w-full md:w-40

          h-52 md:h-40

          rounded-xl

          overflow-hidden

          shadow-md

          bg-center bg-cover
        '
        style={{
          background: `url(${item.hotelId[0].Image})`,
          backgroundSize: "cover"
        }}
      >
      </div>

      {/* Hotel Details */}

      <div className='text-center lg:text-left'>
        <ul className='space-y-2'>
          <li className='font-bold uppercase text-lg text-blue-600 dark:text-blue-400'>
            Hotel Details
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            Hotel Name: {item.hotelId[0].name}
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            Address: {item.hotelId[0].area}
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            Price: {item.hotelId[0].price}
          </li>
        </ul>
      </div>

      {/* User Details */}

      <div className='text-center lg:text-left'>
        <ul className='space-y-2'>
          <li className='font-bold uppercase text-lg text-green-600 dark:text-green-400'>
            User Details
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            Name: {item.bookedBy[0].name}
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            Email: {item.bookedBy[0].email}
          </li>
        </ul>
      </div>

      {/* Booking Details */}

      <div className='text-center lg:text-left'>
        <ul className='space-y-2'>
          <li className='font-bold uppercase text-lg text-orange-600 dark:text-orange-400'>
            Booking Details
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            From: {item.fromDate.slice(0, 10)}
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            To: {item.toDate.slice(0, 10)}
          </li>

          <li className='text-gray-700 dark:text-gray-300'>
            Rooms: {item.rooms}
          </li>
        </ul>
      </div>
    </div>
  )
}