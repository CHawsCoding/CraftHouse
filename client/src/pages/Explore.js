import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DIYS } from '../utils/queries';

function Explore() {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_ALL_DIYS);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const DIYs = data.DIYs; // Extract DIY data from the response

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
