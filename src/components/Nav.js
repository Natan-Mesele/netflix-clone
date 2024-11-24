import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Nav({ onSearch }) {
  const [show, handleShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Call the onSearch function passed as a prop
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition duration-500 ease-in-out ${show ? "bg-black" : "bg-transparent"
          }`}
      >
        <div className="flex justify-between items-center px-8 py-4">
          {/* Logo that navigates to Home */}
          <Link to="/">
            <img
              className="w-36 md:w-48 object-contain"
              src="nmov.png"
              alt="Logo"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow max-w-md mx-4">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for movies..."
            />
          </div>

          {/* User Avatar */}
          <img
            className="w-10 h-10 rounded-full object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
