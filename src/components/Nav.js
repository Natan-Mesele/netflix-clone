import React, { useState, useEffect } from 'react'
import '../components/Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false)
        }
    }

    useEffect (() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

  return (
    <div>
       <div className={`nav ${show && 'nav__black'}`}>
        <div className='nav-content'>
            <img className='nav__logo'
            src='https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png' 
            alt=''/>
            <img className='nav__avater'
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' 
            alt=''/>
        </div>
       </div>
    </div>
  )
}

export default Nav