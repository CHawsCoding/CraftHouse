import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const imageUrls = [
  'https://media.gettyimages.com/id/117144601/photo/diy-disaster.jpg?s=612x612&w=0&k=20&c=48S4ySUO3_LIjeRmYRomLSQMAwGs9vZi7EddctODk_w=',
  'https://media.gettyimages.com/id/1065109848/photo/wrapping-presents.jpg?s=612x612&w=0&k=20&c=r9mp-H8Fhrwc-mnB6DA4wSCf8lO1Wa2HeszkYQJSV6M=',
  'https://media.gettyimages.com/id/1014773628/photo/african-jewellery-on-display-at-the-irene-market.jpg?s=612x612&w=0&k=20&c=Vl50Et3OKvmE5WoOEPy1PUeqcojMIbHfAk0GW-gyoZo=',
  'https://media.gettyimages.com/id/171292804/photo/painted-hands-sign-heart.jpg?s=612x612&w=0&k=20&c=m3Pqlj7lxsSMVp68corQ8sGQwtnbMX1HnD98Ja9Beu4=',
  'https://images.pexels.com/photos/5760780/pexels-photo-5760780.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://media.gettyimages.com/id/1255615584/photo/woman-is-coloring-a-chair-at-home.jpg?s=612x612&w=0&k=20&c=xcJ2UPVRWmcD3ot8MV2uUsOVtGKwRgaylTi2R0uDTkc=',
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