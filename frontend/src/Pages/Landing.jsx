// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../Components/Navbar.jsx";
// import Footer from "../Components/Footer.jsx";
// import SearchBar from "../Components/SearchBar.jsx";
// import { IoLocation } from "react-icons/io5";
//
// const Landing = () => {
//   const videoRef = useRef(null);
//   const [videoDone, setVideoDone] = useState(false);
//
//   useEffect(() => {
//     const video = videoRef.current;
//
//     const handleScroll = () => {
//       if (!videoDone && video) {
//         const rect = video.getBoundingClientRect();
//         if (rect.top < window.innerHeight && rect.bottom > 0) {
//           video.play();
//           document.body.style.overflow = "hidden"; // lock scroll
//         }
//       }
//     };
//
//     const handleVideoEnd = () => {
//       setVideoDone(true);
//       document.body.style.overflow = "auto"; // unlock scroll
//     };
//
//     window.addEventListener("scroll", handleScroll);
//     if (video) {
//       video.addEventListener("ended", handleVideoEnd);
//     }
//
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (video) {
//         video.removeEventListener("ended", handleVideoEnd);
//       }
//     };
//   }, [videoDone]);
//
//   return (
//     <div className=" bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 min-h-screen text-gray-800">
//       <Navbar />
//
//       {/* Hero Section */}
//       <div className="text-center w-full relative top-[13vh] z-10">
//         <h1 className="text-4xl text-gray-900 font-semibold">
//           Unforgettable stays await on
//         </h1>
//         <h1 className="text-[20vh] font-extrabold text-blue-100 mt-4 animate-fadeInUp">
//           DreamStay
//         </h1>
//       </div>
//
//       {/* Scroll-triggered Video Section */}
//       <div className="relative top-[13vh] w-full h-[80vh] overflow-hidden">
//         <video
//           ref={videoRef}
//           className="absolute inset-0 w-full h-full object-cover"
//           src="/public/v1.mp4" // ✅ your video file
//           type="video/mp4"
//           muted
//           playsInline
//           controls={false}
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-white animate-fadeInDown">
//             Explore your Dreams
//           </h1>
//           <h2 className="text-4xl md:text-6xl font-extrabold text-white animate-fadeInDown">
//             With{" "}
//             <span className="text-5xl md:text-7xl font-extrabold text-yellow-400 mt-4 animate-fadeInUp">
//               DreamStay
//             </span>
//           </h2>
//         </div>
//       </div>
//
//       {/* Search Bar Section */}
//       <div className="relative  mt-[-40px]">
//         <SearchBar />
//       </div>
//
//       <div className="w-full bg-gray-50 py-16">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-blue-700">Our Popular Hotels</h2>
//           <p className="text-xl text-gray-600">
//             We recommend these luxurious stays for you
//           </p>
//         </div>
//         <div className="flex justify-around space-x-8 px-4">
//           {/* Hotel Card 1 */}
//           <div className="max-w-xs bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
//             <img
//               src="L5.avif"
//               alt="Taj Lake Palace"
//               className="w-full h-56 object-cover rounded-t-lg"
//             />
//             <div className="p-4">
//               <h3 className="text-2xl font-semibold text-blue-600">
//                 Taj Lake Palace
//               </h3>
//               <p className="flex items-center text-gray-600">
//                 <IoLocation className="text-blue-500 text-xl mr-2" />
//                 Jagat Niwas Palace, Lake Pichola, Udaipur, Rajasthan
//               </p>
//               <h4 className="text-lg font-semibold text-gray-800 mt-2">
//                 Facilities Provided:
//               </h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>Spa and Wellness</li>
//                 <li>Swimming Pools</li>
//                 <li>Fine Dining</li>
//                 <li>Room Service</li>
//                 <li>Valet Parking</li>
//               </ul>
//               <h3 className="text-green-600 text-xl font-bold mt-3">
//                 ₹1999 / Night
//               </h3>
//             </div>
//           </div>
//
//           {/* Hotel Card 2 */}
//           <div className="max-w-xs bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
//             <img
//               src="L3.avif"
//               alt="The Imperial"
//               className="w-full h-56 object-cover rounded-t-lg"
//             />
//             <div className="p-4">
//               <h3 className="text-2xl font-semibold text-blue-600">
//                 The Imperial
//               </h3>
//               <p className="flex items-center text-gray-600">
//                 <IoLocation className="text-blue-500 text-xl mr-2" />
//                 Janpath, New Delhi, Delhi 110001
//               </p>
//               <h4 className="text-lg font-semibold text-gray-800 mt-2">
//                 Facilities Provided:
//               </h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>Spa and Wellness</li>
//                 <li>Swimming Pools</li>
//                 <li>Fine Dining</li>
//                 <li>Room Service</li>
//                 <li>Valet Parking</li>
//               </ul>
//               <h3 className="text-green-600 text-xl font-bold mt-3">
//                 ₹1200 / Night
//               </h3>
//             </div>
//           </div>
//
//           {/* Hotel Card 3 */}
//           <div className="max-w-xs bg-white shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
//             <img
//               src="L17.avif"
//               alt="Taj Mahal Palace"
//               className="w-full h-56 object-cover rounded-t-lg"
//             />
//             <div className="p-4">
//               <h3 className="text-2xl font-semibold text-blue-600">
//                 Taj Mahal Palace
//               </h3>
//               <p className="flex items-center text-gray-600">
//                 <IoLocation className="text-blue-500 text-xl mr-2" />
//                 Apollo Bandar, Mumbai, Maharashtra 400001
//               </p>
//               <h4 className="text-lg font-semibold text-gray-800 mt-2">
//                 Facilities Provided:
//               </h4>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>Spa and Wellness</li>
//                 <li>Swimming Pools</li>
//                 <li>Fine Dining</li>
//                 <li>Room Service</li>
//                 <li>Valet Parking</li>
//               </ul>
//               <h3 className="text-green-600 text-xl font-bold mt-3">
//                 ₹2500 / Night
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//
//       {/* Exclusive Deals Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-800 py-16 text-center text-white">
//         <h2 className="text-4xl font-bold">Exclusive Deals on DreamStay</h2>
//         <p className="text-lg mt-4">Your dream destination is just a booking away</p>
//         <button className="mt-8 bg-yellow-400 text-xl font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-all">
//           Book Now & Save More!
//         </button>
//       </div>
//
//       <Footer />
//     </div>
//   );
// };
//
// export default Landing;

import React, { useEffect, useRef } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import { IoLocation } from "react-icons/io5";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hotels = [
  {
    img: "L5.avif",
    name: "Taj Lake Palace",
    location: "Udaipur",
    price: "₹1999 / Night",
  },
  {
    img: "L3.avif",
    name: "The Imperial",
    location: "New Delhi",
    price: "₹1200 / Night",
  },
  {
    img: "L17.avif",
    name: "Taj Mahal Palace", 
    location: "Mumbai",
    price: "₹1900 / Night",
  },
  {
    img: "L8.avif",
    name: "Leela Palace",
    location: "Bengaluru",
    price: "₹1800 / Night",
  },
  {
    img: "L11.avif",
    name: "Oberoi Udaivilas",
    location: "Udaipur",
    price: "₹2500 / Night",
  },
  {
    img: "L14.avif",
    name: "ITC Grand Chola",
    location: "Chennai",
    price: "₹1600 / Night",
  },
];

const Landing = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);

  /* HERO VIDEO TEXT + SCROLL */
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const init = () => {
      // Video scrub scroll
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "+=1200",
        scrub: 0.6,
        pin: true,
        onUpdate: (self) => {
          if (!isNaN(video.duration)) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });

      // Initial SpaceX-style animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, skewX: 10, filter: "blur(20px)" },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, letterSpacing: "0.4em", filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.1em",
          filter: "blur(0px)",
          duration: 1.6,
          delay: 0.3,
          ease: "power4.out",
        }
      );

      // Scroll-driven 3D text movement
      gsap.to(titleRef.current, {
        y: -150,
        rotateX: 15,
        rotateY: 10,
        scale: 0.9,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      gsap.to(subtitleRef.current, {
        y: -100,
        rotateX: 10,
        rotateY: -8,
        scale: 0.95,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });

      // Floating wave effect
      gsap.to([titleRef.current, subtitleRef.current], {
        y: "+=6",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    video.addEventListener("loadedmetadata", init);

    return () => {
      video.removeEventListener("loadedmetadata", init);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* HOTEL CARDS 3D ON SCROLL */
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, rotateY: i % 2 === 0 ? -40 : 40, z: -200 },
        {
          opacity: 1,
          rotateY: 0,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ perspective: "1600px" }}
      >
        <video
          ref={videoRef}
          src="/v1.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 bg-black/45" />

        {/* CENTERED HERO TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <h1
            ref={titleRef}
            className="whitespace-nowrap text-4xl md:text-6xl font-extrabold"
            style={{
              background: "linear-gradient(180deg,#e6f7ff,#9fdcff,#1fa2ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 30px rgba(79,172,254,.6), 0 0 60px rgba(31,162,255,.4)",
            }}
          >
            DREAMSTAY
          </h1>

          <h2
            ref={subtitleRef}
            className="mt-4 text-sm md:text-lg font-semibold uppercase tracking-widest"
            style={{
              color: "#cceeff",
              textShadow: "0 0 25px rgba(79,172,254,.6)",
            }}
          >
            Where every stay feels like a dream
          </h2>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="relative -mt-12 z-10">
        <SearchBar />
      </div>

      {/* POPULAR HOTELS */}
      <section className="bg-gray-50 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-blue-700">
            Our Popular Hotels
          </h2>
          <p className="text-xl text-gray-600 mt-2">
            Hand-picked premium stays for you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 px-6">
          {hotels.map((h, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform-gpu"
            >
              <img
                src={h.img}
                alt={h.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-blue-700">{h.name}</h3>
                <p className="flex items-center text-gray-600 mt-2">
                  <IoLocation className="mr-2 text-blue-500" />
                  {h.location}
                </p>
                <h4 className="text-lg font-semibold text-gray-800 mt-2">
                  Facilities Provided:
                </h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <h3 className="text-2xl font-bold text-blue-700">
                    {h.name || "No Name Available"}
                  </h3>
                  <p className="flex items-center text-gray-600 mt-2">
                    <IoLocation className="mr-2 text-blue-500" />
                    {h.location || "Location not specified"}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-2">
                    Facilities Provided:
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {h.facilities && h.facilities.length > 0 ? (
                      h.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))
                    ) : (
                      <li>Room Service</li>
                    )}
                  </ul>
                  <p className="text-green-600 text-xl font-extrabold mt-4">
                    {h.price || "Price not available"}
                  </p>
                </ul>
                <p className="text-green-600 text-xl font-extrabold mt-4">
                  {h.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
