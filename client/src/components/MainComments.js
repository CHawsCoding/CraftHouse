import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../utils/queries';
import { GiNothingToSay } from 'react-icons/gi';

function MainComments({ DIYId }) {
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { DIYId },
    refetchQueries: [{ query: GET_COMMENTS, variables: { DIYId } }],
  });

  const [showAllComments, setShowAllComments] = useState(false);

  if (loading) return <div className="text-center py-8">Loading comments...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const comments = data.getComments;

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="mt-4">
      {comments.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <p className="font-semibold text-gray-600 text-xs">{comments[0].user.username} :</p>
            <GiNothingToSay size={18} className="text-gray-700 ml-2" />
          </div>
          <p className="text-gray-500 bg-slate-800 p-4 rounded">{comments[0].content}</p>
        </div>
      )}

      {comments.length > 1 && (
        <div className="mb-4">
          <button
            onClick={toggleShowAllComments}
            className="text-yellow-500 cursor-pointer"
          >
            {showAllComments ? 'Hide Comments' : 'View All Comments'}
          </button>
        </div>
      )}

      {showAllComments && (
        <div className="bg-gray-500 p-4 rounded-lg shadow-lg">
          {comments.slice(1).map((comment, index) => (
            <div key={index} className="mb-4 bg-gray-300 rounded shadow-lg p-2">
              <p className="font-semibold text-indigo-700">{comment.user.username}</p>
              <p className="text-gray-800">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainComments;
