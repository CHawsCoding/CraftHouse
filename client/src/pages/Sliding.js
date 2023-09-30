import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import sliding from '../images/sliding.jpg';
import sliding2 from '../images/sliding2.jpg';
import sliding3 from '../images/sliding3.jpg';
import sliding4 from '../images/sliding4.jpg';
import sliding5 from '../images/sliding5.jpg';
import sliding6 from '../images/sliding6.jpg';

const imageUrls = [
  sliding,
  sliding2,
  sliding3,
  sliding4,
  sliding5,
  sliding6,
];

function Sliding() {
    return (
      <div className="container mx-auto p-4 bg-black">
        <h1 className="text-2xl font-bold mb-4">Image Slider</h1>
        <div className="carousel-container">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000} // Change slide every 3 seconds
            className="slider" // Add a class to the Carousel component
          >
            {imageUrls.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="slider-image" // Add a class to the img element
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
  
  export default Sliding;