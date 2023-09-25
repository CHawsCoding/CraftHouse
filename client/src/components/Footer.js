import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import social media icons from react-icons

function Footer() {
  return (
    <footer className="bg-black w-full overflow-hidden text-pink-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/4">
            <div className="flex items-center mb-4">
              <FaFacebook className="mr-2" size={24} />
              <FaTwitter className="mr-2" size={24} />
              <FaInstagram size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Terms of Use</h2>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
