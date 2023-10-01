import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4 justify-between border-t border-yellow-600 pt-8">
          <div className="w-full lg:w-1/3 px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
              <div className="flex items-center">
                <FaFacebook className="mr-2 text-yellow-500 hover:text-yellow-600" size={24} />
                <FaTwitter className="mr-2 text-yellow-500 hover:text-yellow-600" size={24} />
                <FaInstagram className="text-yellow-500 hover:text-yellow-600" size={24} />
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
              <p>Stay connected with us on social media for updates and more.</p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>Email: info@craftHouse.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Street, Salt Lake City, Utah</p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Subscription</h2>
              <p>Subscribe us to get updates in a real time</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 mt-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
              <button
                className="w-full mt-4 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md focus:outline-none "
              >
                Subscribe us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
