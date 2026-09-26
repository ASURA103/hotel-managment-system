import React from "react";
import { Link } from "react-router-dom";
import footerImage from "/footer.avif";

const Column = ({ title, children }) => (
  <div>
    <h2 className="eyebrow mb-4">{title}</h2>
    <ul className="space-y-2.5 text-sm text-muted">{children}</ul>
  </div>
);

const itemClass = "transition hover:text-ink";

const Footer = () => {
  return (
    <footer className="mt-24 w-full" id="about">
      {/* Image band */}
      <div className="relative h-72 w-full overflow-hidden md:h-96">
        <img src={footerImage} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1512]/85 via-[#0E1512]/40 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <p className="eyebrow !text-[#CDAA6E]">DreamStay</p>
          <p className="mt-3 max-w-xl font-display text-3xl leading-tight text-[#EEEAE1] md:text-5xl">
            Discover the best hotels and unforgettable stays around the world.
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-line bg-surface2/60">
        <div className="container-page grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h2 className="eyebrow mb-4">About Us</h2>
            <p className="text-sm leading-7 text-muted">
              We provide the best hotel experiences for travelers around the world with comfort, luxury and
              unforgettable memories.
            </p>
          </div>

          <Column title="Quick Links">
            <li><Link to="/" className={itemClass}>Home</Link></li>
            <li><a href="#about" className={itemClass}>About Us</a></li>
            <li><span>Contact</span></li>
          </Column>

          <Column title="Owner Services">
            <li><Link to="/admin/auth" className={itemClass}>Admin Login</Link></li>
            <li><Link to="/seller/auth" className={itemClass}>Hotel Owner</Link></li>
          </Column>

          <Column title="Feedback">
            <li><span>Give Feedback</span></li>
            <li><span>Read Reviews</span></li>
          </Column>
        </div>

        <div className="hairline" />
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} DreamStay. All rights reserved.</p>
          <p className="font-display text-sm italic">Where every stay feels like a dream.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
