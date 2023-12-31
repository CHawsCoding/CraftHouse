import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries';

import { GiNothingToSay } from 'react-icons/gi';


function Comments({ DIYId }) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { DIYId },
    refetchQueries: [{ query: GET_COMMENTS, variables: { DIYId } }],
  });

  // State variables to track displayed comments and whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

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
           {/* user name and comment icons section */}
          <div className='flex justify-between'>
            <p className="font-semibold text-gray-600 text-xs">{comments[0].user.username} :</p>
            <GiNothingToSay size={18} className='text-gray-700'/>
          </div>
          <p className="text-gray-500 bg-slate-800 p-4 rounded ">{comments[0].content}</p>
        </div>
      )}

      {comments.length > 1 && (
        <button onClick={openModal} className="text-yellow-500 ml-2 cursor-pointer">
          View All Comments
        </button>
      )}
      
        {/* Comments Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black z-50 overflow-y-auto">
          <div ref={modalRef} className="bg-white p-4 border-white rounded-lg shadow-lg w-11/12 max-w-xl border"> 
            {comments.map((comment, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold text-indigo-700">{comment.user.username}</p>
                <p className="text-gray-800">{comment.content}</p>
                <span className="border-t border-gray-500 block my-2"></span>
              </div>
            ))}
            <button onClick={closeModal} className="text-red-700 font-bold cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
