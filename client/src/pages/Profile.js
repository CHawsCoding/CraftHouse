import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { REMOVE_DIY } from '../utils/mutations';

import { RiDeleteBin5Fill } from 'react-icons/ri';
import { SiQuicklook } from 'react-icons/si';

import profile from '../images/profile.png';
import SavedDIY from './savedDIY';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);
  const [deleteDIYMutation] = useMutation(REMOVE_DIY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const user = data.me;

  const handleDeleteDIY = async (diyId) => {
    try {
      await deleteDIYMutation({
        variables: { DIYId: diyId },
        refetchQueries: [{ query: GET_ME }], // Refetch the user data after deletion
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-8">
        <div className="flex flex-col items-center">
          <div className="rounded-full w-32 h-32 overflow-hidden">
            <img src={profile} alt="Profile" className="object-cover w-full h-full" />
          </div>
          <h2 className="text-2xl font-semibold mt-4">My Profile</h2>
          <p className="text-gray-500">Username: {user.username}</p>
          <p className="text-gray-500">Email: {user.email}</p>
        </div>

        <div className="mt-8">
          <div className="border-b border-t m-5 p-2 border-gray-500">
            <h3 className="text-3xl font-semibold text-yellow-500 text-center">My DIYs</h3>
          </div>
          {user.DIYs.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">No DIYs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
              {user.DIYs.map((diy) => (
                <div key={diy._id} className="bg-bl border rounded-lg shadow-md overflow-hidden" style={{ width: '100%', height: '100%' }}>
                  <img src={diy.images[0]} alt="my DIY" className="object-cover w-full h-40" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{diy.title}</h4>
                  </div>
                  <div className="flex justify-between p-4 border-t border-gray-300">
                    <Link to={`/diy/${diy._id}`} className="block p-4 hover:bg-gray-900">
                      <SiQuicklook size={24} className="text-green-700" />
                    </Link>
                    <button
                      className="block p-4 hover:bg-gray-900"
                      onClick={() => handleDeleteDIY(diy._id)}
                    >
                      <RiDeleteBin5Fill size={24} className="text-red-900" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SavedDIY />
      </div>
    </div>
  );
}

export default Profile;