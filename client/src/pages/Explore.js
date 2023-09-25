import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_DIYS } from '../utils/queries';

function Explore() {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_ALL_DIYS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  const DIYs = data.DIYs; // Extract DIY data from the response

  return (
    <div>
      <h2>Explore DIYs</h2>
      {DIYs.map((DIY) => (
        <div key={DIY._id}>
          <h3>{DIY.title}</h3>
          <p>{DIY.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Explore;

