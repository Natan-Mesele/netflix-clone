import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition duration-500 ease-in-out ${show ? 'bg-black' : 'bg-transparent'
          }`}
      >
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/">
            <img
              className="w-36 md:w-48 object-contain"
              src="nmov.png"
              alt="Logo"
            />
          </Link>
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
