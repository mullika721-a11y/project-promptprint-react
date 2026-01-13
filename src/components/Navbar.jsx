import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { dataTerst } from "../data/dataTest";
import { Menu, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="m-4 border-b border-gray-100 pb-4">
      {/* ================= Line 1 ================= */}
      <div className="w-full flex justify-between items-center h-16 relative">
        {/* Left */}
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Center */}
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 flex gap-3 items-center font-bold"
        >
          <img
            src="Project Logo.jpg"
            alt="logo"
            width={40}
            className="rounded-full"
          />
          Prompt Print Shop
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link to="/about">About</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/membership">Membership</Link>

          <Link
            to="/cart"
            className="relative border border-gray-300 rounded-full p-2 hover:bg-gray-100"
          >
            <ShoppingBag />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {dataTerst.length}
            </span>
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-black text-white px-3 py-1 hover:bg-white hover:text-black border"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="rounded-full border border-black px-3 py-1 hover:bg-black hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>

      {/* ================= Line 2 ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        {/* Category buttons */}
        <div className="flex gap-2">
          <Link
            to="/men"
            className="px-4 py-2 rounded-full border hover:bg-gray-100"
          >
            Men
          </Link>
          <Link
            to="/women"
            className="px-4 py-2 rounded-full border hover:bg-gray-100"
          >
            Women
          </Link>
          <Link
            to="/children"
            className="px-4 py-2 rounded-full border hover:bg-gray-100"
          >
            Children
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 px-4 py-2 rounded-full w-72"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="7" />
            <line x1="15" y1="15" x2="20" y2="20" />
          </svg>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </nav>
  );
}
