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
    <div className="explore-container">
    <div className="flex flex-col items-center p-8">
      {/* Profile Picture */}
      <div className="rounded-full w-20">
        
        <img src= { profile } alt="Profile" className="object-cover w-full h-full" />
      </div>
      <h2 className="text-2xl font-semibold mt-4">My Profile</h2>
      <p className="text-gray-500">Username: {user.username}</p>
      <p className="text-gray-500">Email: {user.email}</p>


      <div className="container mx-auto p-4">
        <h3 className="text-3xl font-semibold text-yellow-500 text-center">My DIYs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">

          {user.DIYs.map((diy) => (
            <div key={diy._id} className="border rounded-lg shadow-md overflow-hidden">
              {/* DIY content */}
              <div className="p-4">
                <h4 className=" underline text-lg font-semibold">{diy.title}</h4>
              </div>
              <div className="p-4 border-t border-gray-400">
                <div className="text-sm text-gray-400"><img src = {diy.images[0]} alt="my DIYs" className="object-cover w-1/2 text-center" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    <h3 className="font-semibold mt-4 text-center text-3xl text-yellow-500 border-t border-gray-500 underline ">My favourites</h3>
     <SavedDIY />
    </div>
  );
}

export default Profile;