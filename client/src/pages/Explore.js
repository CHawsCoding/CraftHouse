import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DIYS} from '../utils/queries';
import { Link } from 'react-router-dom';
import { ADD_COMMENT, ADD_LIKE, REMOVE_LIKE, SAVE_DIY } from '../utils/mutations';

import { SlLike } from 'react-icons/sl';
import { SlDislike } from 'react-icons/sl';
import { HiOutlineSaveAs } from 'react-icons/hi';

import Likes from '../components/Likes';
import Comments from '../components/Comments';

function Explore({ primaryColor }) {
  const { loading, error, data } = useQuery(GET_ALL_DIYS);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  // const [savedDIYs, setSavedDIYs] = useState([]);

  const [addLikeMutation] = useMutation(ADD_LIKE);
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [removeLikeMutation] = useMutation(REMOVE_LIKE);
  const [saveDIYMutation] = useMutation(SAVE_DIY);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8">Error! {error.message}</div>;

  const DIYs = data && data.DIYs ? data.DIYs : [];


  const handleLike = async (id) => {
    try {
      const { data } = await addLikeMutation({
        variables: { DIYId: id },
        refetchQueries: [{ query: GET_ALL_DIYS }],
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
        refetchQueries: [{ query: GET_ALL_DIYS }],
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
    <div style={{ backgroundColor: primaryColor, color: 'white', padding: '16px' }} className="explore-container">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 text-yellow-600">Explore DIYs</h2>
        <div className="grid grid-cols-1 mr-5 ml-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DIYs.map((DIY, index) => (
            <div key={DIY._id} className="bg-gray-900 border border-gray-300 rounded-lg shadow-md transition transform duration-300 hover:scale-105 overflow-hidden">
              {DIY.images && DIY.images.length > 0 && (
                <img
                  src={DIY.images[0]}
                  alt={DIY.title}
                  className="w-1/2 object-cover mx-auto"
                />
              )}
              <div className="p-6 border-t">              
                  <h3 className="text-xl text-gray-500 font-semibold mb-2 text-center underline">{DIY.title}</h3>
              </div>
              <div className="text-center p-4">               
                  <p className="text-gray-400">{DIY.description}</p>
                <Link to={`/diy/${DIY._id}`} className="block p-4 hover:bg-gray-900">
                  <h3 className="text-lg text-yellow-500 hover:text-yellow-600 font-semibold mb-2 text-center underline">Learn More</h3>
                </Link>
              </div>
              <div className='flex flex-auto border-b border-gray-500'>
                <Likes DIYId={DIY._id} />
              </div>

              {/* users interaction section */}
              <div className="flex justify-between px-6 py-4">
                <SlLike size={24} className="text-white-600 hover:text-yellow-500 hover:scale-125 cursor-pointer" onClick={() => handleLike(DIY._id)}/>
                <SlDislike size={24} className="text-white-600 hover:text-yellow-500 hover:scale-125 cursor-pointer" onClick={() => handleDislike(DIY._id)}/>
                <HiOutlineSaveAs size={24} className="text-white-600 hover:text-yellow-500 hover:scale-125 cursor-pointer" onClick={() => handleSave(DIY._id)}/>
              </div>

              {/* Comment section */}
              <div className="relative">
                <form className="commentForm" onSubmit={(e) => handleComment(e, DIY._id)}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="text-yellow-50 p-2 w-full bg-slate-500"
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
                </form>
                <Comments DIYId={DIY._id} />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;