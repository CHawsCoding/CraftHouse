import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SAVED_DIYS } from '../utils/queries';

function SavedDIY({ userId }) {
  const { loading, error, data } = useQuery(GET_SAVED_DIYS, {
    variables: { userId },
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const savedDIYs = data.getSavedDIYs;

  return (
    <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 mt-4 ml-4 mr-4">
      {savedDIYs.map((diy) => (
        <div
          key={diy._id}
          className="border rounded-lg shadow-md overflow-hidden"
        >
          {/* DIY content */}
          <div className="p-4">
            <h4 className="text-yellow-500 text-lg font-semibold text-center">{diy.title}</h4>
          </div>
          <div className="p-4 border-t border-gray-400">
            <p className="text-sm text-gray-200">Description: {diy.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default SavedDIY;
