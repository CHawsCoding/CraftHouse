import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DIYS } from '../utils/queries';

import { BiSolidLike } from 'react-icons/bi';
import { BiSolidDislike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

function Explore() {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_ALL_DIYS);
  const [showDetails, setShowDetails] = useState({});

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const DIYs = data.DIYs; // Extract DIY data from the response

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">Explore DIYs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIYs.map((DIY) => (
          <div key={DIY._id} className="border rounded-lg shadow-md overflow-hidden">
            {DIY.images && DIY.images.length > 0 && (
              <img 
              src={DIY.images[0]}
               alt={DIY.title}
                className="w-full h-48 object-cover"
                 />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{DIY.title}</h3>
              <p className="text-gray-700">{DIY.description}</p>
              <ul className={`mt-4 ${showDetails[DIY._id] ? 'block' : 'hidden'}`}>
                {DIY.materialsUsed.map((material) => (
                  <li key={material} className="text-gray-700">
                    {material}
                  </li>
                ))}
              </ul>
              <p className={`text-gray-700 ${showDetails[DIY._id] ? 'block' : 'hidden'}`}>
                {DIY.instructions}
              </p>
              <p className={`text-gray-700 ${showDetails[DIY._id] ? 'block' : 'hidden'}`}>
                By: {DIY.user.username}
              </p>
            </div>
            <div className="flex justify-between px-6 py-4 bg-gray-100 border-t border-gray-200">
              <BiSolidLike className=" text-pink-600 hover:scale-125" />
              <BiSolidDislike className=" text-pink-600 hover:scale-125" />
            </div>
            <div className="relative">
              <form className="commentForm">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="text-black p-2 w-full"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-white hover:scale-125 rounded-full"
                >
                  <FaRegComment className=" text-pink-600" />
                </button>
              </form>
            </div>
            <div className="text-center p-4">
              <button
                onClick={() => toggleDetails(DIY._id)}
                className="text-pink-600 font-semibold underline cursor-pointer"
              >
                {showDetails[DIY._id] ? 'Show Less' : 'Learn More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
