import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DIYS } from '../utils/queries';
import { ADD_COMMENT, ADD_LIKE, REMOVE_LIKE, SAVE_DIY } from '../utils/mutations';

import { SlLike } from 'react-icons/sl';
import { SlDislike } from 'react-icons/sl';
import { FaRegComment } from 'react-icons/fa';
import { HiOutlineSaveAs } from 'react-icons/hi';

import explore from '../images/explore2.png';

function Explore() {
  const { loading, error, data } = useQuery(GET_ALL_DIYS);
  const [showDetails, setShowDetails] = useState({});
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  // const [savedDIYs, setSavedDIYs] = useState([]);

  const [addLikeMutation] = useMutation(ADD_LIKE);
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [removeLikeMutation] = useMutation(REMOVE_LIKE);
  const [saveDIYMutation] = useMutation(SAVE_DIY);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const DIYs = data.DIYs;

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="explore-container bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(${explore})`, }}>
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-center mb-8 text-white">Explore DIYs</h2>
        <div className="grid grid-cols-1 mr-5 ml-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <ul className={`mt-4 ${showDetails[DIY._id] ? 'block' : 'hidden'}`}>
                  {DIY.materialsUsed.map((material) => (
                    <li key={material} className="text-gray-700">
                      {material}
                    </li>
                  ))}
                </ul>
                <p className={`text-gray-700 ${showDetails[DIY._id] ? 'block' : 'hidden'}`}>
                  {DIY.instructions}
                </p>
                <p className={`text-gray-700 ${showDetails[DIY._id] ? 'block' : 'hidden'}`}>
                  By: {DIY.user.username}
                </p>
              </div>
              <div className="flex justify-between px-6 py-4 bg-gray-100 border-t border-gray-200">
                <SlLike className="text-pink-600 hover:scale-125 cursor-pointer" onClick={() => handleLike(DIY._id)}/>
                <SlDislike className="text-pink-600 hover:scale-125 cursor-pointer" onClick={() => handleDislike(DIY._id)}/>
                <HiOutlineSaveAs className="text-pink-600 hover:scale-125 cursor-pointer" onClick={() => handleSave(DIY._id)}/>
                <span className='text-black'>{likes[DIY._id] || 0} Likes</span>
              </div>
              {/* Comment section */}
              <div className="relative">
                <form className="commentForm" onSubmit={(e) => handleComment(e, DIY._id)}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="text-black p-2 w-full"
                    name="commentInput"
                    onClick={
                      () => {
                        if (localStorage.getItem('id_token')) {
                          return;
                        } else {
                          alert('Please log in to comment');
                        }
                      }
                    }
                  />
                  <button
                    type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-white hover:scale-125 rounded-full cursor-pointer">
                    <FaRegComment className="text-pink-600" />
                  </button>
                </form>
              </div>
              <div className="text-center p-4">
                <button
                  onClick={() => toggleDetails(DIY._id)}
                  className="text-pink-600 font-semibold underline cursor-pointer"
                >
                  {showDetails[DIY._id] ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
