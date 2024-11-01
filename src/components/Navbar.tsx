import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isLoggedIn = false; // Toggle this to false for non-logged-in users
  const userProfilePicture = 'logo192.png'; // Path to the user's profile image or a default image

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            {/* Logo */}
            <Link to="/">
              <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
          <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
              }
            >
              Feeds
            </NavLink>

            <NavLink
              to="/submit-feedback"
              className={({ isActive }) =>
                isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
              }
            >
              Submit Feedback
            </NavLink>

            {/* Login/Profile */}
            {isLoggedIn ? (
              <div className="ml-4 relative">
                <img
                  className="h-8 w-8 rounded-full object-cover cursor-pointer"
                  src={userProfilePicture}
                  alt="User Profile"
                />
              </div>
            ) : (
              <Link to="/login" className="ml-4 text-gray-700 hover:text-gray-900">Login</Link>
            )}
          </div>

          {/* Hamburger Button for Mobile */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">Feedback List</Link>
          <Link to="/submit-feedback" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">Submit Feedback</Link>

          {/* Mobile view login/profile */}
          {isLoggedIn ? (
            <div className="px-3 py-2 rounded-md">
              <img
                className="h-8 w-8 rounded-full object-cover cursor-pointer"
                src={userProfilePicture}
                alt="User Profile"
              />
            </div>
          ) : (
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
