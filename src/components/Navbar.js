import React, { useState } from "react";
// import { useRoute } from "../context/RouteContext";
import Link from "../context/Link";

function Navbar({onpagechange}) {
  const [menuOpen, setMenuOpen] = useState(false);
  // const navigate = useRoute();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold cursor-pointer hover:opacity-90">
          Xeno CRM
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to={"/"} >
          <button onClick = {onpagechange}>
          Home
          </button>
            
          </Link>
          <Link to={"/login"} onClick = {onpagechange}>
            Login
          </Link>
          <Link to={"/signup"} onClick = {onpagechange}>
            Signup
          </Link>
          <Link to={"/"} onClick = {onpagechange}>
            Home
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 text-white px-6 py-4 space-y-4">
          <a href="#home" className="block text-lg hover:underline">
            Home
          </a>
          <a href="#login" className="block text-lg hover:underline">
            Login
          </a>
          <a href="#signup" className="block text-lg hover:underline">
            Signup
          </a>
          <a href="#about" className="block text-lg hover:underline">
            About
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
