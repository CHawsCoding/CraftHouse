import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import profile from '../images/profile.png';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const user = data.me;

  return (
    <div className="flex flex-col items-center p-4">
      {/* Profile Picture */}
      <div className="rounded-full w-20 h-20 overflow-hidden bg-gray-300">
        
        <img src= { profile } alt="Profile" className="object-cover w-full h-full" />
      </div>
      <h2 className="text-2xl font-semibold mt-4">My Profile</h2>
      <p className="text-gray-700">Username: {user.username}</p>
      <p className="text-gray-700">Email: {user.email}</p>

      
      <div className="mt-8">
        <h3 className="text-xl font-semibold">My DIYs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          
          {user.DIYs.map((diy) => (
            <div
              key={diy._id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              {/* DIY content */}
              <div className="p-4">
                <h4 className=" underline text-lg font-semibold">{diy.title}</h4>
                <p className="text-gray-700">{diy.description}</p>
              </div>
              {/* Additional DIY details */}
              <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Materials Used: {diy.materialsUsed}</p>
                <p className="text-sm text-gray-500">Instructions: {diy.instructions}</p>
                <p className="text-sm text-gray-500">Images: {diy.images}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
