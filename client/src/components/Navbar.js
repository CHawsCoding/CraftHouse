import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import handmade from '../images/handmade.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = () => {
    Auth.logout();
  };

  return (
    <nav className='flex justify-between items-center p-4'>
      <img src={handmade} alt='handmade' width='50px' />
      <div className='hidden md:flex space-x-4'>
        <Link to='/'>Home</Link>
        {Auth.loggedIn() ? (
          <>
           <Link to='/explore'>Explore</Link>
            <Link to='/create'>Create</Link>
            <Link to='/profile'>Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/explore'>Explore</Link>
            <Link to='/login'>Login</Link>
            
          </>
        )}
      </div>
      <div className='md:hidden'>
        <button onClick={toggleMenu} className='text-2xl'>
          &#9776;
        </button>
      </div>
      {isOpen && (
        <div className='md:hidden fixed inset-0 bg-black z-10'>
          <div className='flex flex-col items-center pt-20'>
            <Link to='/' onClick={closeMenu} className='mb-4'>
              Home
            </Link>
            <Link to='/explore' onClick={closeMenu} className='mb-4'>
              Explore
            </Link>
            {Auth.loggedIn() ? (
              <>
                <Link to='/create' onClick={closeMenu} className='mb-4'>
                  Create
                </Link>
                <Link to='/profile' onClick={closeMenu} className='mb-4'>
                  Profile
                </Link>

                <button onClick={() => { logout(); closeMenu(); }}>Logout</button>
              </>
            ) : (
              <>
                <Link to='/login' onClick={closeMenu} className='mb-4'>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
