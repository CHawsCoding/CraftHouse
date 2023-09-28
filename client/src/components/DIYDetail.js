import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_DIY } from '../utils/queries';

const DIYDetail = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(QUERY_DIY, {
    variables: { id },
  });

  const diy = data?.DIY || {}; // Ensure a default value for diy

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">{diy.title}</h2>
          {/* Render the image at the top and centered */}
          <img
            src={diy.images[0]} // Assuming the first image is the main image
            alt={`${diy.title} image`}
            className="max-w-full rounded-lg shadow-md"
          />
          
          <p className="text-gray-600 mt-2">{diy.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Instructions</h3>
          <p className="mt-2">{diy.instructions}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Materials Used</h3>
          <p className="mt-2">{diy.materialsUsed}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Images</h3>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {diy.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="max-w-full rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DIYDetail;
