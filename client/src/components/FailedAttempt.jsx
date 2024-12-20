import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      <div className="hero bg-[#191919] min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <p className="py-6">
            <video
          autoPlay
          loop
          muted
          className="w-[100%] ml-5"
        >
          <source src="../../public/assets/images/Failed.mp4" type="video/mp4" />
        </video>
            </p>
            <p className='text-base-300 text-opacity-50'> You've reached the attempt limit</p>
            <NavLink to={'/home'}>
              <button className="btn btn-primary mt-3">Reset</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
