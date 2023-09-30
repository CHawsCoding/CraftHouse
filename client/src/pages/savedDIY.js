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
    <div className="container mx-auto py-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4 ml-6 mr-6">
      {savedDIYs.map((diy) => (
        <div
          key={diy._id}
          className="border rounded-lg shadow-md overflow-hidden"
        >
          {/* DIY content */}
          <div className="p-4">
            <h4 className="underline text-lg font-semibold text-center">{diy.title}</h4>
          </div>
          {/* Additional DIY details */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-200">Images: {diy.images}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default SavedDIY;
