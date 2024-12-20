import React from 'react'
// import errorPage from "../../public/assets/images/errorPage.png"
import { NavLink } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div>


<div className="hero bg-[#16171b] min-h-screen">
<div className="hero-content text-center">
  <div className="max-w-md">
    <p className="py-6">
        <img  className="w-[100%] ml-5" src="./../public/assets/images/errorPage.png" alt="" />
    </p>


<NavLink to={'/home'}>

    <button className="btn btn-primary">Reset</button>
    
</NavLink>
  </div>
</div>
</div>
          
      
    </div>
  )
}

export default ErrorPage
