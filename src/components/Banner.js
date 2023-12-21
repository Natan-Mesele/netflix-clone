import React from 'react'
import '../components/Banner.css'

function Banner() {
  return (
    <header className='banner' style={{
        background: `url('https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }}>
        <div className='banner__contents'>
            <h1 className='banner__title'>Movie Name</h1>
            <div className='banner__buttons'>
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className='banner__description'>This is a test description</h1>
        </div>
        <div className='banner-fadeBottom'>

        </div>
    </header>
  )
}

export default Banner