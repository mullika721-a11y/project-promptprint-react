import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Heart, LogOut } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged in user
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        }`}
      >
        {/* Main Header Container */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left area */}
            <div className="flex items-center gap-4"></div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                  placeholder="Search for custom prompts, designs..."
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                to="/about"
                className="hidden lg:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/faqs"
                className="hidden lg:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                FAQs
              </Link>

              <div className="h-6 w-px bg-gray-200 hidden lg:block" />

              <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors relative group">
                <Heart className="w-6 h-6" />
              </button>

              <Link to="/cart">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative">
                  <ShoppingBag className="w-6 h-6" />
                </button>
              </Link>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                    Hi, {user}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all transform hover:-translate-y-0.5"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Navigation (Categories) */}
        <div className="border-t border-gray-100 bg-white/50 backdrop-blur-sm hidden md:block">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 h-12 text-sm overflow-x-auto no-scrollbar">
              {[
                "Products",
                "Featured",
                "New Arrivals",
                "Trending",
                "Best Sellers",
              ].map((item, idx) => (
                <button
                  key={item}
                  className={`font-medium whitespace-nowrap transition-colors relative group ${
                    idx === 0
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute -bottom-3.5 left-0 w-full h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ${
                      idx === 0 ? "scale-x-100" : ""
                    }`}
                  />
                </button>
              ))}
              <div className="flex-1" />
              <div className="flex items-center text-gray-500 text-xs gap-4">
                <span>Free Shipping on Orders over $50</span>
                <span>•</span>
                <span>Global Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
