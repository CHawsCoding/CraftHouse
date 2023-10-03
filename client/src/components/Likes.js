import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_LIKED_USERS } from "../utils/queries";
import { NEW_LIKE_SUBSCRIPTION } from "../utils/subscriptions";
import { useSubscription } from "@apollo/client"; // Import useSubscription

function Likes({ DIYId }) {
  const { loading, error, data, refetch } = useQuery(GET_LIKED_USERS, {
    variables: { DIYId },
  });

  const [localLikedUsers, setLocalLikedUsers] = useState([]);

  useEffect(() => {
    if (data && data.getLikedUsers) {
      setLocalLikedUsers(data.getLikedUsers);
    }
  }, [data]);

  // Subscribe to new likes
  const { data: newLikeData } = useSubscription(NEW_LIKE_SUBSCRIPTION, {
    variables: { DIYId }, // Pass DIYId to the subscription
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8">Error! {error.message}</div>;

  const likedUsers = data.getLikedUsers;

  console.log(likedUsers);

  // Check if there's new like data from the subscription
  if (newLikeData && newLikeData.newLike) {
    // Add the new like user to the likedUsers array
    setLocalLikedUsers((prevUsers) => [...prevUsers, newLikeData.newLike.user]);
    refetch(); // Refetch the query to update the cache
  }

  const uniqueUsernames = new Set();

  localLikedUsers.forEach((likedUser) => {
    uniqueUsernames.add(likedUser.username);
  });

  const uniqueUsernamesArray = Array.from(uniqueUsernames);

  const totalLikes = localLikedUsers.length;

  return (
    <div className="ml-2">
      {totalLikes === 0 ? (
        <p className="text-gray-600">0 likes</p>
      ) : (
        <>
          {uniqueUsernamesArray.length === 1 ? (
            <p className="text-gray-600">
              {" "}
              {uniqueUsernamesArray[0]} likes this
            </p>
          ) : (
            <p className="text-gray-600">
              {" "}
              {uniqueUsernamesArray[0]} and {uniqueUsernamesArray.length - 1}{" "}
              others liked this
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Likes;
