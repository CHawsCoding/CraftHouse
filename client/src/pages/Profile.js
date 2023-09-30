import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import profile from '../images/profile.png';
import explore from '../images/explore.jpg';
import SavedDIY from './savedDIY';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const user = data.me;

  return (
    <div className="explore-container bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${explore})`, }}>
    <div className="flex flex-col items-center p-4">
      {/* Profile Picture */}
      <div className="rounded-full w-20 h-20 overflow-hidden bg-gray-300">
        
        <img src= { profile } alt="Profile" className="object-cover w-full h-full" />
      </div>
      <h2 className="text-2xl font-semibold mt-4">My Profile</h2>
      <p className="text-gray-200">Username: {user.username}</p>
      <p className="text-gray-200">Email: {user.email}</p>

    </div>
    <h3 className="font-semibold mt-4 text-center text-3xl text-pink-600 underline ">My DIYs</h3>
     <SavedDIY />
    </div>
  );
}

export default Profile;