import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full  bg-[rgba(46,64,109,0.7)] backdrop-blur-md border-t border-[rgba(255,255,255,0.08)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Logo & Tagline */}
        <div className="flex-1 min-w-[180px]">
          <div className="text-3xl font-extrabold text-[#FFD600] mb-2">Mebius</div>
          <div className="text-gray-300 text-sm mb-4">Premium Products, Trendy Tech</div>
          <div className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} Mebius. All rights reserved.</div>
        </div>
        {/* About */}
        <div className="flex-1 min-w-[150px]">
          <div className="font-semibold text-lg mb-2 text-[#FFD600]">About</div>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>Our Story</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 min-w-[150px]">
          <div className="font-semibold text-lg mb-2 text-[#FFD600]">Contact</div>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>Email: hello@mebius.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Location: New York, USA</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div className="flex-1 min-w-[200px]">
          <div className="font-semibold text-lg mb-2 text-[#FFD600]">Newsletter</div>
          <div className="text-gray-300 text-sm mb-2">Get the latest updates and offers.</div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="rounded-lg px-3 py-2 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD600] border border-white/20"
              disabled
            />
            <button
              type="button"
              className="bg-[#FFD600] text-black font-bold px-4 py-2 rounded-lg shadow hover:bg-yellow-400 transition"
              disabled
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
} 