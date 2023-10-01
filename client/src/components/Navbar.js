import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

import { VscBellDot } from 'react-icons/vsc';
import logo from '../images/logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

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
      <img src={logo} alt='logo' className='w-10' />
      <div className='hidden md:flex space-x-4'>
        <Link to='/' className={location.pathname === '/' ? 'text-yellow-500' : ''}>Home</Link> 
        {Auth.loggedIn() ? (
          <>
            <Link to='/explore' className={location.pathname === '/explore' ? 'text-yellow-500' : ''}>Explore</Link> 
            <Link to='/create' className={location.pathname === '/create' ? 'text-yellow-500' : ''}>Create</Link> 
            <Link to='/profile' className={location.pathname === '/profile' ? 'text-yellow-500' : ''}>Profile</Link> 
            <button onClick={logout}>Logout</button>
            <VscBellDot className='text-pink-600 hover:animate-bounce' />
          </>
        ) : (
          <>
            <Link to='/explore' className={location.pathname === '/explore' ? 'text-yellow-500' : ''}>Explore</Link> 
            <Link to='/login' className={location.pathname === '/login' ? 'text-yellow-500' : ''}>Login</Link> 
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
