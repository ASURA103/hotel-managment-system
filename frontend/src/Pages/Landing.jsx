import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import hotel from "/L4.jpg";
import h from "/L6.jpg";
import { IoLocation } from "react-icons/io5";

export const Landing = () => {
  return (
    <div className=" bg-[#90e0ef] text-[#03045e] ">
      <div className="relative z-20 ">
        <Navbar />
      </div>
      <div className="text-center w-full   font-bold absolute top-[11vh]">
        <h1 className="text-2xl  ">Unfogettable stays awaits on </h1>
        <h1 className="text-9xl ">DreamStay</h1>
      </div>
      <div className="  w-[100%] h-[100%]  ">
        <div
          className={
            "   shadow-xl shadow-current relative top-[30vh] mx-[22vh] h-screen w-[150vh]  h-[60vh] rounded-[10vh] border-none bg-cover bg-center    text-center content-center"
          }
          style={{
            backgroundImage: `url(${hotel})`,
            height: ``,
            width: ``,
          }}
        >
          <h1 className="text-4xl font-extrabold text-white">
            {" "}
            Explore Your{" "}
            <span className="text-blue-600 font-[]greate vibes]">Dreams</span>
          </h1>
          <h1 className="text-4xl font-extrabold text-white">
            {" "}
            With The{" "}
            <span className="text-blue-600 font-[]greate vibes]">
              DreamStay
            </span>
          </h1>
        </div>

        <div
          className={" mt-[40vh] h-screen bg-cover bg-center    "}
          style={{ backgroundImage: `url(${h})`, height: ``, width: `` }}
        >
          <div className=" px-[48vh] relative top-[-13vh]   z-10  ">
            <SearchBar  />
          </div>
          <div className="">
            <div className="flex px-2  w-full ">
              <div className="w-1/2">
                <h1 className="text-4xl font-bold  text-center">
                  {" "}
                  Our Popular Hotels We
                </h1>
                <h1 className="text-4xl font-bold  text-center">
                  Recomend for you{" "}
                </h1>
              </div>
              <div className="w-1/2 text-gray-100 text-center">
                <h1 className="">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </h1>
                <h1>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis, hic! Quibusdam dolorum modi recusandae,
                </h1>
              </div>
            </div>

            <div className="  m-2  flex justify-between py-3 px-3">
              <div className="w-[50vh] h-[75vh] transition-all-ease-linear duration-500    hover:shadow-xl hover:shadow-blue-500 bg-[#caf0f8] shadow-lg  shadow-current border-gray-500 rounded-[10vh] border-2 hover:w-[60vh] hover:h-[65vh]">
                <img
                  src="L3.avif"
                  alt=""
                  className="h-[26vh] w-full rounded-t-[10vh] shadow-md shadow-current object-cover object-center "
                />
                <div className="pl-1">
                  <h1 className="font-bold text-2xl">Taj Lake Palace </h1>
                  <p className="flex">
                    <IoLocation className="text-blue-400 text-2xl" /> Jagat
                    Niwas Palace, Lake Pichola, Udaipur, Rajasthan
                  </p>
                  <h1 className="text-xl font-bold">Facilities Provided</h1>
                  <ul className="list-disc list-inside pl-1">
                    <li>
                      <span className="font-bold">
                        Spa and Wellness Facilities
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">Swimming Pools:</span>Outdoor
                      and indoor pools, often with poolside service.
                    </li>
                    <li>
                      <span className="font-bold">
                        Fine Dining Restaurants:
                      </span>
                      Award-winning restaurants with gourmet cuisine and
                      top-notch service
                    </li>
                    <li >
                      <span className="font-bold">Room Service:</span>24/7 room
                      service with a diverse menu.
                    </li>
                    <li className="pl-1">
                      <span className="font-bold">Valet Parking:</span>
                      Convenient and secure parking services.
                    </li>
                  </ul>
                  <h1 className="text-green-600 font-bold text-xl pl-5 ml-3  ">
                    {" "}
                    ₹1999<span className="text-black">/</span>
                    <span className="text-gray-500 text-sm font-normal">
                      Night
                    </span>
                  </h1>
                </div>
              </div>
              <div className="w-[50vh] h-[75vh] transition-all-ease-linear duration-500    hover:shadow-xl hover:shadow-blue-500 bg-[#caf0f8] shadow-lg  shadow-current border-gray-500 hover:w-[60vh] hover:h-[65vh] rounded-[10vh] border-2">
                <img
                  src="L3.avif"
                  alt=""
                  className="h-[26vh] w-full rounded-t-[10vh] shadow-md shadow-current object-cover object-center "
                />
                <div className="pl-1">
                  <h1 className="font-bold text-2xl">The Imperial</h1>
                  <p className="flex">
                    <IoLocation className="text-blue-400 text-2xl" /> Janpath,
                    New Delhi, Delhi 110001
                  </p>
                  <h1 className="text-xl font-bold">Facilities Provided</h1>
                  <ul className="list-disc list-inside pl-1">
                    <li>
                      <span className="font-bold">
                        Spa and Wellness Facilities
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">Swimming Pools:</span>Outdoor
                      and indoor pools, often with poolside service.
                    </li>
                    <li>
                      <span className="font-bold">
                        Fine Dining Restaurants:
                      </span>
                      Award-winning restaurants with gourmet cuisine and
                      top-notch service
                    </li>
                    <li>
                      <span className="font-bold">Room Service:</span>24/7 room
                      service with a diverse menu.
                    </li>
                    <li>
                      <span className="font-bold">Valet Parking:</span>
                      Convenient and secure parking services.
                    </li>
                  </ul>
                  <h1 className="text-green-600 font-bold text-xl pl-4  ">
                    {" "}
                    ₹1200<span className="text-black">/</span>
                    <span className="text-gray-500 text-sm font-normal">
                      Night
                    </span>
                  </h1>
                </div>
              </div>
              <div className="w-[50vh] h-[75vh] transition-all-ease-linear duration-500    hover:shadow-xl hover:shadow-blue-500 bg-[#caf0f8] shadow-lg  shadow-current border-gray-50                                                        0 rounded-[10vh] border-2 hover:w-[60vh]  hover:h-[65vh]">
                <img
                  src="L3.avif"
                  alt=""
                  className="h-[26vh] w-full rounded-t-[10vh] shadow-md shadow-current object-cove object-center "
                />
                <div className="pl-1">
                  <h1 className="font-bold text-2xl">Taj Mahal Palace</h1>
                  <p className="flex">
                    <IoLocation className="text-blue-400 text-2xl" /> Apollo
                    Bandar, Mumbai, Maharashtra 400001
                  </p>
                  <h1 className="text-xl font-bold">Facilities Provided</h1>
                  <ul className="list-disc list-inside pl-1">
                    <li>
                      <span className="font-bold">
                        Spa and Wellness Facilities
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">Swimming Pools:</span>Outdoor
                      and indoor pools, often with poolside service.
                    </li>
                    <li>
                      <span className="font-bold">
                        Fine Dining Restaurants:
                      </span>
                      Award-winning restaurants with gourmet cuisine and
                      top-notch service
                    </li>
                    <li>
                      <span className="font-bold">Room Service:</span>24/7 room
                      service with a diverse menu.
                    </li>
                    <li>
                      <span className="font-bold">Valet Parking:</span>
                      Convenient and secure parking services.
                    </li>
                  </ul>
                  <h1 className="text-green-600  font-bold text-xl pl-4  ">
                    {" "}
                    ₹2500<span className="text-black">/</span>
                    <span className="text-gray-500 text-sm font-normal">
                      Night
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#03045e] pt-5 ">
        <h1 className="text-center text-4xl text-white ">Exclusive deals on</h1>
        <h1 className="text-center text-white text-9xl font-bold">DreamStay</h1>
        <div className="px-5">
          <div>
            <div className=" bg-[#00b4d8] text-2xl rounded-[10vh] w-[50%] h-[50vh] p-5 text-white">
              <p className="text-5xl pl-2">hotels</p>
              <p className=" w-[253px]">Your dream destination awaits, book moments, make <br></br> memories</p>
            </div>
            <div>
              <div>

            </div>
            <div></div></div>
          </div>
          <div>
            <div>
              <div>

            </div>
            <div></div></div>
            <div></div>
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};
export default Landing;
