import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

import handmade from '../images/handmade.png';

function Navbar() {
  const logout = () => {
    Auth.logout();
  };

  return (
    <nav className='flex justify-between'>
        <img src = {handmade} alt = "handmade" width="50px" />
      <Link to="/">Home</Link>
      {Auth.loggedIn() ? (
        <>
          <Link to="/create">Create</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/explore">Explore</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
