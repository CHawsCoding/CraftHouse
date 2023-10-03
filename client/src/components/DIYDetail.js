import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_DIY, GET_COMMENTS } from '../utils/queries';
import {
  ADD_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  SAVE_DIY,
} from '../utils/mutations';

import { SlLike } from 'react-icons/sl';
import { SlDislike } from 'react-icons/sl';
import { FaRegComment } from 'react-icons/fa';
import { HiOutlineSaveAs } from 'react-icons/hi';

import Likes from '../components/Likes';
import Comments from '../components/MainComments';

const DIYDetail = () => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [isSaved, setIsSaved] = useState(false); // Track whether DIY is saved

  const [addLikeMutation] = useMutation(ADD_LIKE);
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [removeLikeMutation] = useMutation(REMOVE_LIKE);
  const [saveDIYMutation] = useMutation(SAVE_DIY);

  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_DIY, {
    variables: { id },
  });

  const diy = data?.DIY || {};

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // console.log(diy);

  const handleLike = async (id) => {
    try {
      const { data } = await addLikeMutation({
        variables: { DIYId: id },
      });

      const updatedLikes = data.addLike.likes;
      setLikes((prevLikes) => ({
        ...prevLikes,
        [id]: updatedLikes,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (id) => {
    try {
      const { data } = await removeLikeMutation({
        variables: { DIYId: id },
      });

      const updatedLikes = data.removeLike.likes;
      setLikes((prevLikes) => ({
        ...prevLikes,
        [id]: updatedLikes,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (e, id) => {
    e.preventDefault(); // Prevent the default form submission
    const commentInput = e.target.commentInput.value;
    try {
      const { data } = await addCommentMutation({
        variables: { DIYId: id, content: commentInput },
      });

      const updatedComments = data.addComment.comments;
      setComments((prevComments) => ({
        ...prevComments,
        [id]: updatedComments,
      }));
      e.target.commentInput.value = '';
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (id) => {
    try {
      const { data } = await saveDIYMutation({
        variables: { DIYId: id },
      });
      setIsSaved(true); // Update the state to indicate that DIY is saved
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto bg-slate-950 py-12 m-5">
      <div className="max-w-6xl mx-auto p-6 rounded-lg bg-gray-900 shadow-xlg">
        <h2 className="text-4xl text-center font-semibold text-yellow-500 mb-4">
          {diy.title}
        </h2>
        <div className="flex justify-center border border-gray-700 rounded ">
          {/* Render the image at the top and centered */}
          <img
            src={diy.images[0]} alt={`${diy.title} image`} className="w-full max-w-lg rounded-lg shadow-lg"/>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-300 mb-2 p-2">Description</h3>
          <p className="text-gray-400">{diy.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-300 mb-2 p-2">Materials</h3>
          <ul className="list-disc list-inside text-gray-400">
            {diy.materialsUsed.map((material, index) => (
              <li className="mb-2 p-1" key={index}>
                {material}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-300 mb-2 p-2">Instructions</h3>
          <ol className="list-decimal list-inside text-gray-400 p-3">
            {diy.instructions.map((instruction, index) => (
              <li className="mb-2 p-1" key={index}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-between mt-8">
          <div className="flex space-x-4">
            <SlLike
              size={24}
              className="text-yellow-500 cursor-pointer hover:text-yellow-600" onClick={() => handleLike(diy._id)} />
            <SlDislike
              size={24}
              className="text-red-500 cursor-pointer hover:text-red-600" onClick={() => handleDislike(diy._id)} />
            <HiOutlineSaveAs
              size={24}
              className={`cursor-pointer ${ isSaved ? 'text-green-500' : 'text-gray-400' } hover:text-green-600`} onClick={() => handleSave(diy._id)}/>
          </div>
          <Likes DIYId={diy._id} />
        </div>

        <div className="mt-8 relative">
          <h3 className="text-xl font-semibold text-gray-200">Comments</h3>
          <form onSubmit={(e) => handleComment(e, diy._id)} className="mt-4">
            <textarea
              name="commentInput"
              className="w-full h-20 px-3 py-2 border text-gray-500 rounded-md focus:outline-none focus:border-yellow-500"
              placeholder="Write your comment here..." />
            <button
              type="submit"
              className="absolute right-4 top-2/3 -translate-y-1/2 p-3 bg-white rounded-full hover:scale-105 hover:bg-gray-100 focus:outline-none">
              <FaRegComment size={24} className="text-pink-600" />
            </button>
          </form>
        </div>

        <Comments DIYId={diy._id} comments={comments[diy._id]} />
      </div>
    </div>
  );
};

export default DIYDetail;