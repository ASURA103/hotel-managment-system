import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import StayCard, { StayCardSkeleton } from "../Components/ui/StayCard.jsx";
import EmptyState from "../Components/ui/EmptyState.jsx";
import { B_URL } from "../../config.js";
import { getRole, getToken } from "../lib/session.js";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  const [hotels, setHotels] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const loadHotels = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await axios.get(`${B_URL}/user/hotels`, { params: { limit: 6 } });
      setHotels(Array.isArray(response.data) ? response.data : []);
      setStatus("ready");
    } catch (error) {
      console.error("Error loading hotels", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  /* Hero: the video scrubs with scroll while the section is pinned. */
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    // Load only metadata first (fast first paint). Fetch the full video on the first scroll or
    // touch — that's when scrubbing starts — so visitors who never scroll don't download it.
    const interactions = ["scroll", "wheel", "touchstart", "keydown", "pointerdown"];
    const loadFullVideo = () => {
      video.preload = "auto";
      interactions.forEach((e) => window.removeEventListener(e, loadFullVideo));
    };
    interactions.forEach((e) => window.addEventListener(e, loadFullVideo, { passive: true, once: true }));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Text shows immediately; it never waits for the video.
      if (reduceMotion) {
        gsap.set(textRef.current.children, { opacity: 1 });
        return;
      }
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12 },
      );
    }, hero);

    const init = () => {
      ctx.add(() => {
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

        if (!reduceMotion) {
          gsap.to(textRef.current, {
            y: -120,
            opacity: 0.2,
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 },
          });
        }
      });
    };

    if (video.readyState >= 1) init();
    else video.addEventListener("loadedmetadata", init, { once: true });

    return () => {
      interactions.forEach((e) => window.removeEventListener(e, loadFullVideo));
      video.removeEventListener("loadedmetadata", init);
      ctx.revert(); // removes only this page's triggers and tweens
    };
  }, []);

  function handleBook(hotel) {
    if (getToken() && getRole() === "user") navigate("/book", { state: hotel });
    else navigate("/user/auth");
  }

  return (
    <div className="bg-bg transition-colors duration-300">
      <Navbar />

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/v1.mp4"
          poster="/hero-poster.webp"
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1512]/55 via-[#0E1512]/35 to-[#0E1512]/80" />

        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div ref={textRef} className="container-page text-center md:text-left">
            <p className="eyebrow !text-[#CDAA6E] opacity-0">DreamStay</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-[#F7F3EC] opacity-0 md:text-7xl">
              Where every stay feels like a dream
            </h1>
            <p className="mt-6 max-w-xl text-base text-[#EEEAE1]/80 opacity-0 md:text-lg">
              Search hotels, check room availability and book your stay.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <div className="relative z-10 -mt-24 px-4 md:-mt-28">
        <SearchBar />
      </div>

      {/* HOTELS (from the database) */}
      <section className="container-page py-24" id="stays">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Our collection</p>
            <h2 className="title-section mt-2">Our popular hotels</h2>
            <p className="mt-2 text-muted">Hand-picked premium stays for you</p>
          </div>
        </div>

        {status === "loading" && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => <StayCardSkeleton key={i} />)}
          </div>
        )}

        {status === "error" && (
          <EmptyState
            title="We couldn't load hotels"
            text="Check your connection and try again."
            action={<button type="button" onClick={loadHotels} className="btn btn-outline">Try again</button>}
          />
        )}

        {status === "ready" && hotels.length === 0 && (
          <EmptyState
            title="No hotels listed yet"
            text="Hotels appear here as soon as owners add them."
            action={<button type="button" onClick={() => navigate("/seller/auth")} className="btn btn-primary">List your property</button>}
          />
        )}

        {status === "ready" && hotels.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel, i) => (
              <StayCard key={hotel._id} hotel={hotel} index={i} onBook={handleBook} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
