import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries';

function Comments({ DIYId }) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { DIYId },
  });

  // State variables to track displayed comments and whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div className="text-center py-8">Loading comments...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const comments = data.getComments;

  // Function to open the comments modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the comments modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-4">
      {comments.length > 0 && (
        <div className="mb-2 ml-2">
          <p className="font-semibold text-indigo-700">{comments[0].user.username}</p>
          <p className="text-gray-200">{comments[0].content}</p>
        </div>
      )}

      {comments.length > 1 && (
        <button onClick={openModal} className="text-pink-600 cursor-pointer">
          View All Comments
        </button>
      )}

      {/* Comments Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black z-50 overflow-y-auto">
          <div className="bg-black p-4 border-white rounded-lg shadow-lg w-11/12 max-w-xl border"> 
            {comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold text-indigo-700">{comment.user.username}</p>
                <p className="text-gray-200">{comment.content}</p>
                <span className="border-t border-gray-500 block my-2"></span>
              </div>
            ))}
            <button onClick={closeModal} className="text-pink-600 cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
