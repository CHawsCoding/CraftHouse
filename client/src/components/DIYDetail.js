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
import Comments from '../components/Comments';

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
    <div className="min-h-screen border-white py-12">
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold text-gray-400 mt-4 mb-4 underline">
            {diy.title}
          </h2>
          {/* Render the image at the top and centered */}
          <img
            src={diy.images[0]} alt={`${diy.title} image`} className="w-2/4 rounded-lg border shadow-md"/>
        </div>

        <table className="table-auto w-full mt-8 border">
          <tbody>
            <tr className="border-b-2 border-gray-400">
              <td className="text-gray-400 font-semibold text-2xl border-r-2 border-gray-400 pr-4">Description</td>
              <td className="text-gray-400">{diy.description}</td>
            </tr>
            <tr className="border-b-2 border--400">
              <td className="text-gray-400 font-semibold text-2xl border-r-2 border-gray-400 pr-4">Materials</td>
              <td className="text-gray-400">
                <ul className="list-disc list-inside">
                  {diy.materialsUsed.map((material, index) => (
                    <li className='border p-2' key={index}>{material}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="border-b-2 border-gray-400">
              <td className="text-gray-400 font-semibold text-2xl border-r-2 border-gray-400 pr-4">Instructions</td>
              <td className="text-gray-400 text-justify">{diy.instructions}</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between px-6 py-4 mt-5 border-b border-gray-200">
          <SlLike size={24} className="text-pink-600 hover:scale-125 cursor-pointer" onClick={() => handleLike(diy._id)}/>
                <SlDislike size={24} className="text-pink-600 hover:scale-125 cursor-pointer" onClick={() => handleDislike(diy._id)}/>
                <HiOutlineSaveAs size={24} className="text-pink-600 hover:scale-125 cursor-pointer" onClick={() => handleSave(diy._id)}/>
          </div>

          <Likes DIYId={diy._id} />

          <div className="relative">
          <form className="mt-4"  onSubmit={(e) => handleComment(e, diy._id)}>
            <textarea name="commentInput"
              className="w-full h-16 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Write your comment here..."/>
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-white hover:scale-125 rounded-full cursor-pointer">
            <FaRegComment className="text-pink-600" />
            </button> 
          </form>
        </div>

        

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-400">Comments</h3>
          <Comments DIYId={diy._id} comments={comments[diy._id]} />
        </div>
      </div>
    </div>
  );
};

export default DIYDetail;
