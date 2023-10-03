import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'; //we use Link to navigate other pages

// Import queries and mutations
import { GET_SAVED_DIYS } from '../utils/queries';
import { REMOVE_SAVED_DIY } from '../utils/mutations';

function SavedDIY({ userId }) {
  const { loading, error, data } = useQuery(GET_SAVED_DIYS, {
    variables: { userId },
  });
  const [removeSavedDIYMutation] = useMutation(REMOVE_SAVED_DIY); // Mutation to remove a saved DIY

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const savedDIYs = data.getSavedDIYs;

  // Function to handle removing a saved DIY
  const handleRemoveSavedDIY = async (diyId) => {
    try {
      await removeSavedDIYMutation({ 
        variables: { DIYId: diyId }, // Pass the DIY's id to the mutation
        refetchQueries: [{ query: GET_SAVED_DIYS, variables: { userId } }], // Refetch the user data after deletion this makes the page update automatically
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border-b border-t m-5 p-2 border-gray-500">
        <h3 className="text-3xl font-semibold text-yellow-500 text-center">My Saved DIYs</h3>
      </div>
      {savedDIYs.length === 0 ? ( // Check if there are no saved DIYs
        <p className="text-center text-gray-500 mt-4">No saved DIYs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 mt-4 ml-4 mr-4">
          {savedDIYs.map((diy) => (
            <div
              key={diy._id}
              className="border rounded-lg shadow-md overflow-hidden" style={{ width: '100%', height: '100%' }}
            >
              {/* DIY content */}
              <div className="p-4">
                <h4 className="text-gray-500 text-lg font-semibold text-center">{diy.title}</h4>
              </div>
              {/* DIY image */}
              <div className="flex justify-center border-t">
                <img
                  src={diy.images[0]}
                  alt="DIY"
                  className="object-cover w-full h-40"
                />
              </div>
              {/* View DIY */}
              <Link to={`/diy/${diy._id}`} className="block p-4 hover:bg-gray-900">
                <h3 className="text-lg text-yellow-500 hover:text-yellow-600 font-semibold mb-2 text-center underline">View</h3>
              </Link>
              <div className="flex justify-between p-4 border-t border-gray-300">
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveSavedDIY(diy._id)}
                >
                  Remove from saved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedDIY;