import React, { useContext } from 'react';
import { ContextData } from '../Context/ContextProvider';

const Header = () => {

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return (
    <div>
      <div className="navbar bg-red-300 justify-center">
        <div className="navbar-center">
          <button className="custom-button alt text-2xl" style={{ backgroundColor: '#CC2A41' }}>Score : <span className='font-bold'> 0</span></button>
          {/* <div> Time:   <p>Time: {formatTime(time)}</p></div> */}
        
        </div>
      </div>
    </div>
  );
}

export default Header;
