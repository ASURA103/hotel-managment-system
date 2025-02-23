import React from "react";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import footerImage from "/footer.avif"; // Import image correctly

const Footer = () => {
  const navigate = useNavigate();

  function seller() {
    navigate("seller/auth");
  }
  function owner() {
    navigate("admin/auth");
  }

  return (
    <div className="bg-[#90e0ef] text-[#03045e] text-center w-full py-10">
      {/* Background Image Section */}
      <div className="relative">
        <img
          src={footerImage}
          alt="Footer Background"
          className="w-full h-72 object-cover object-center"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40" />
      </div>

      {/* Footer Links Section */}
      <div className="container mx-auto px-6 py-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-lg">We provide the best hotel experiences for travelers around the world.</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a  className="hover:text-blue-600">Home</a>
              </li>
              <li>
                <a  className="hover:text-blue-600">About Us</a>
              </li>
              <li>
                <a className="hover:text-blue-600">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Owner Services</h2>
            <ul className="space-y-2">
              <li>
                <a
                  onClick={owner}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Admin Login
                </a>
              </li>
              <li>
                <a
                  onClick={seller}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Hotel Owner
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
            <ul className="space-y-2">
              <li>
                <a  className="hover:text-blue-600">Give Feedback</a>
              </li>
              <li>
                <a className="hover:text-blue-600">Read Reviews</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-4 bg-[#03045e] text-white">
        <p className="text-lg">&copy; 2025 DreamStay. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
