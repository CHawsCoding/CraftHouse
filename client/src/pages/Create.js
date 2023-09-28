import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DIY } from '../utils/mutations';

function Create() {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    materialsUsed: '',
    instructions: '',
    file: null, //add a file property to hold the uploaded file
  });

  const [addDIY, { error }] = useMutation(ADD_DIY);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormState({
      ...formState,
      file: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!formState.file) {
      alert('Please select an image for the item.'); // You can use a more user-friendly UI element here.
      return;
    }

    // Split materialsUsed and images into arrays
    const materialsUsedArray = formState.materialsUsed.split(',').map((material) => material.trim());

  
    try {
      const { data } = await addDIY({
        variables: {
          ...formState,
          materialsUsed: materialsUsedArray.join(', '),
        },
      });
  
      console.log('New DIY created:', data.addDIY);

      setSuccessMessage('DIY successfully created!');

    } catch (err) {
      console.error(err);
    }

    setFormState({
      title: '',
      description: '',
      materialsUsed: '',
      instructions: '',
      file: null, //reset the file property
    });
  };

return (
  <div className="max-w-md mx-auto p-4">
    <h2 className="text-2xl font-semibold mb-4">Create a New DIY</h2>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formState.title}
            onChange={handleInputChange}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={formState.description}
            onChange={handleInputChange}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="materialsUsed" className="block text-gray-700 font-bold mb-2">
            Materials Used (comma-separated):
          </label>
          <input
            type="text"
            name="materialsUsed"
            id="materialsUsed"
            value={formState.materialsUsed}
            onChange={handleInputChange}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-gray-700 font-bold mb-2">
            Instructions:
          </label>
          <textarea
            name="instructions"
            id="instructions"
            value={formState.instructions}
            onChange={handleInputChange}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
            Images (comma-separated URLs):
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            name="file"
            id="file"
            onChange={handleFileUpload}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
          <img src={formState.file ? URL.createObjectURL(formState.file) : ''} alt="Selected" />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Create DIY
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">Error: {error.message}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
    </div>
  );
}

export default Create;
