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
  <div className="bg-white dark:bg-slate-950 transition-colors duration-300">

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

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">

        <h1
          ref={titleRef}
          className="whitespace-nowrap text-5xl md:text-7xl font-extrabold"
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
          className="mt-5 text-sm md:text-xl font-semibold uppercase tracking-[0.3em]"
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

    <div className="relative -mt-10 md:-mt-14 z-10 px-4">
      <SearchBar />
    </div>

    {/* HOTELS */}

    <section className="bg-gray-50 dark:bg-slate-950 py-20">

      <div className="text-center mb-16 px-4">

        <h2 className="text-3xl md:text-5xl font-bold text-blue-700 dark:text-blue-400">
          Our Popular Hotels
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4">
          Hand-picked premium stays for you
        </p>

      </div>

      <div
        className="
          grid

          grid-cols-1

          sm:grid-cols-2

          lg:grid-cols-3

          gap-8

          px-4

          md:px-8

          max-w-7xl

          mx-auto
        "
      >

        {hotels.map((h, i) => (

          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="
              bg-white

              dark:bg-slate-900

              rounded-3xl

              overflow-hidden

              shadow-xl

              hover:shadow-2xl

              hover:-translate-y-2

              transition-all

              duration-300

              transform-gpu
            "
          >

            <img
              src={h.img}
              alt={h.name}
              className="
                w-full

                h-64

                md:h-72

                object-cover
              "
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {h.name}
              </h3>

              <p className="flex items-center text-gray-600 dark:text-gray-300 mt-3">

                <IoLocation className="mr-2 text-blue-500" />

                {h.location}

              </p>

              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-5">
                Facilities Provided:
              </h4>

              <ul className="list-disc pl-5 mt-3 text-gray-600 dark:text-gray-300 space-y-1">

                {h.facilities && h.facilities.length > 0 ? (

                  h.facilities.map((facility, index) => (
                    <li key={index}>
                      {facility}
                    </li>
                  ))

                ) : (

                  <li>Room Service</li>

                )}

              </ul>

              <p className="text-green-600 dark:text-green-400 text-2xl font-extrabold mt-6">

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
