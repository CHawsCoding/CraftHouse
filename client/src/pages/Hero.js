import React from 'react';

import hero from '../images/hero.png';

const imageUrls = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
];

function Hero() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap-reverse items-center">
        {/* Big Picture on the Right */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <img
            src={hero}
            alt="Big Image"
            className="w-full h-auto"
          />
        </div>

        {/* Text Content on the Left */}
        <div className="w-full md:w-1/2 md:pr-8">
          <h1 className="text-2xl font-bold mb-4 ml-10">Sample Picture Gallery</h1>
          <p className="mb-4 ml-20">
            Sample text
          </p>
          <p className="mb-4 ml-20">
           sample text
          </p>
          {/* Add more text content as needed */}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="relative group">
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="w-full h-auto cursor-pointer transition transform duration-300 scale-100 group-hover:scale-105"
            />
          </div>
          
        ))}
      </div>

      <section className="popular-diy-section bg-pink-100 py-12 mt-6">
        <div className="container mx-auto">
          <h2 className="text-3xl text-black font-semibold text-center mb-6">Popular DIYs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add popular DIYs here */}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Hero;
