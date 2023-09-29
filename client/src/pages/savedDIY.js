import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SAVED_DIYS } from '../utils/queries'; // Create this query

function SavedDIY() {
  // Fetch saved DIYs for the logged-in user
  const { loading, error, data } = useQuery(GET_SAVED_DIYS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const savedDIYs = data.savedDIYs; 

  return (
    <div>
      <h3>My Saved DIYs</h3>
      <ul>
        {savedDIYs.map((diy) => (
          <li key={diy._id}>
            <h4>{diy.title}</h4>
            <p>{diy.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedDIY;
