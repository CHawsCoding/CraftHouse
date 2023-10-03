import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_POPULAR_DIYS } from '../utils/queries';

function PopularDIYs() {
  const { loading, error, data } = useQuery(GET_POPULAR_DIYS);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const popularDIYs = data.popular_DIYS; 

//   console.log(popularDIYs);

  return (
    <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold text-center text-yellow-500 mb-4 border border-yellow-500 rounded">Popular DIYs</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {popularDIYs.map((popularDIY) => (
          <div key={popularDIY._id} className="bg-white rounded-lg shadow-lg p-4 m-5 ">
            <img
              src={popularDIY.images[0]} 
              alt={popularDIY.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-xl text-yellow-600 font-semibold mb-2">{popularDIY.title}</h2>
            <p className="text-gray-600">{popularDIY.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularDIYs;
