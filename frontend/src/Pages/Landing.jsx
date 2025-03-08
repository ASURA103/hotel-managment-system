import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import hotelImage from "/L4.jpg";
import { IoLocation } from "react-icons/io5";

const Landing = () => {
  return (
    <div className=" bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 min-h-screen text-gray-800">
      <Navbar />

      {/* Hero Section */}

      <div className="text-center w-full relative top-[13vh] z-10">
         <h1 className="text-4xl text-gray-900 font-semibold">Unforgettable stays await on</h1>
         <h1  className="text-[20vh] font-extrabold text-blue-100 mt-4 animate-fadeInUp">DreamStay</h1>
       </div>

      <div className="relative top-[13vh] w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${hotelImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white animate-fadeInDown">Explore your Dreams</h1>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white animate-fadeInDown">With <span  className="text-5xl md:text-7xl font-extrabold text-yellow-400 mt-4 animate-fadeInUp"> DreamStay </span></h2>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="relative  mt-[-40px]">
        <SearchBar />
      </div>

      <div className="w-full bg-gray-50 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700">Our Popular Hotels</h2>
          <p className="text-xl text-gray-600">We recommend these luxurious stays for you</p>
        </div>
        <div className="flex justify-around space-x-8 px-4">
          {/* Hotel Card 1 */}
          <div className="max-w-xs bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <img
              src="L5.avif"
              alt="Taj Lake Palace"
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-blue-600">Taj Lake Palace</h3>
              <p className="flex items-center text-gray-600">
                <IoLocation className="text-blue-500 text-xl mr-2" />
                Jagat Niwas Palace, Lake Pichola, Udaipur, Rajasthan
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mt-2">Facilities Provided:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Spa and Wellness</li>
                <li>Swimming Pools</li>
                <li>Fine Dining</li>
                <li>Room Service</li>
                <li>Valet Parking</li>
              </ul>
              <h3 className="text-green-600 text-xl font-bold mt-3">₹1999 / Night</h3>
            </div>
          </div>

          {/* Hotel Card 2 */}
          <div className="max-w-xs bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <img
              src="L3.avif"
              alt="The Imperial"
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-blue-600">The Imperial</h3>
              <p className="flex items-center text-gray-600">
                <IoLocation className="text-blue-500 text-xl mr-2" />
                Janpath, New Delhi, Delhi 110001
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mt-2">Facilities Provided:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Spa and Wellness</li>
                <li>Swimming Pools</li>
                <li>Fine Dining</li>
                <li>Room Service</li>
                <li>Valet Parking</li>
              </ul>
              <h3 className="text-green-600 text-xl font-bold mt-3">₹1200 / Night</h3>
            </div>
          </div>

          {/* Hotel Card 3 */}
          <div className="max-w-xs bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <img
              src="L17.avif"
              alt="Taj Mahal Palace"
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-blue-600">Taj Mahal Palace</h3>
              <p className="flex items-center text-gray-600">
                <IoLocation className="text-blue-500 text-xl mr-2" />
                Apollo Bandar, Mumbai, Maharashtra 400001
              </p>
              <h4 className="text-lg font-semibold text-gray-800 mt-2">Facilities Provided:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Spa and Wellness</li>
                <li>Swimming Pools</li>
                <li>Fine Dining</li>
                <li>Room Service</li>
                <li>Valet Parking</li>
              </ul>
              <h3 className="text-green-600 text-xl font-bold mt-3">₹2500 / Night</h3>
            </div>
          </div>
        </div>
      </div>


      {/* Exclusive Deals Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 text-center text-white">
        <h2 className="text-4xl font-bold">Exclusive Deals on DreamStay</h2>
        <p className="text-lg mt-4">Your dream destination is just a booking away</p>
        <button className="mt-8 bg-yellow-400 text-xl font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-all">
          Book Now & Save More!
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
