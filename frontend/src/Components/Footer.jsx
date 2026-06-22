import React from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import footerImage from "/footer.avif";

const Footer = () => {
  const navigate = useNavigate();

  function seller() {
    navigate("seller/auth");
  }

  function owner() {
    navigate("admin/auth");
  }

  return (
    <footer className="w-full mt-16">
      {/* Hero Image */}

      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <img
          src={footerImage}
          alt="Footer Background"
          className="w-full h-full object-cover object-center"
        />

        <div
          className="
            absolute inset-0

            bg-black/50
            dark:bg-black/70

            backdrop-blur-[1px]
          "
        />

        <div
          className="
            absolute inset-0

            flex flex-col

            justify-center
            items-center

            px-6

            text-center
          "
        >
          <h1
            className="
              text-3xl md:text-5xl

              font-bold

              text-white

              drop-shadow-lg
            "
          >
            DreamStay
          </h1>

          <p
            className="
              mt-4

              text-gray-200

              max-w-2xl

              text-sm md:text-lg
            "
          >
            Discover the best hotels and unforgettable stays around the world.
          </p>
        </div>
      </div>

      {/* Footer Content */}

      <div
        className="
          bg-sky-100
          dark:bg-slate-900

          text-slate-800
          dark:text-slate-200

          py-12

          px-6 md:px-12
        "
      >
        <div
          className="
            max-w-7xl

            mx-auto

            grid

            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-10
          "
        >
          {/* About */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              About Us
            </h2>

            <p className="leading-7 text-slate-600 dark:text-slate-300">
              We provide the best hotel experiences for travelers around
              the world with comfort, luxury and unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">
              <li>
                <a className="cursor-pointer hover:text-blue-600 transition">
                  Home
                </a>
              </li>

              <li>
                <a className="cursor-pointer hover:text-blue-600 transition">
                  About Us
                </a>
              </li>

              <li>
                <a className="cursor-pointer hover:text-blue-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Owner Services */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Owner Services
            </h2>

            <ul className="space-y-3">
              <li>
                <a
                  onClick={owner}
                  className="
                    cursor-pointer

                    hover:text-blue-600

                    transition
                  "
                >
                  Admin Login
                </a>
              </li>

              <li>
                <a
                  onClick={seller}
                  className="
                    cursor-pointer

                    hover:text-blue-600

                    transition
                  "
                >
                  Hotel Owner
                </a>
              </li>
            </ul>
          </div>

          {/* Feedback */}

          <div>
            <h2 className="text-2xl font-bold mb-5">
              Feedback
            </h2>

            <ul className="space-y-3">
              <li>
                <a className="cursor-pointer hover:text-blue-600 transition">
                  Give Feedback
                </a>
              </li>

              <li>
                <a className="cursor-pointer hover:text-blue-600 transition">
                  Read Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div
        className="
          bg-[#03045e]
          dark:bg-black

          text-white

          py-5

          text-center
        "
      >
        <p className="text-sm md:text-lg">
          &copy; 2025 DreamStay. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;