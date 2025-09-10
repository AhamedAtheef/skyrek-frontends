import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#121218] text-white py-6 px-4 md:px-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Logo / Text */}
        <div className="text-center md:text-left">
          <h3 className="text-xl 2xl:text-[22px] font-bold text-[#fdb42d]" id="premiumtext">CBC Cosmetics</h3>
          <p className="text-sm text-gray-400 mt-2">
            Glow with confidence ✨
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fdb42d] text-[#121218] hover:bg-blue-500 hover:text-white  transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fdb42d] text-[#121218] hover:bg-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/94750943802?text=Hello%2C%20I%20want%20to%20inquire%20about%20my%20order"
            target="_blank"
            rel="noopener noreferrer"
            typeof="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fdb42d] text-[#121218] hover:bg-green-500 transition"
          >
            <FaWhatsapp />
          </a>

        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CBC Cosmetics. All rights reserved.
      </div>
    </footer>
  );
}
