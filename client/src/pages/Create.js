import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DIY } from '../utils/mutations';

function Create() {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    materialsUsed: [''],
    instructions: '',
    images: '',
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

  const handleMaterialChange = (event, index) => {
    const newMaterialsUsed = [...formState.materialsUsed];
    newMaterialsUsed[index] = event.target.value;

    setFormState({
      ...formState,
      materialsUsed: newMaterialsUsed,
    });
  };

  const addMaterialField = () => {
    setFormState({
      ...formState,
      materialsUsed: [...formState.materialsUsed, ''], // Add an empty string for a new field
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Remove empty materials fields
    const materialsUsedArray = formState.materialsUsed.filter((material) => material.trim() !== '');
    const imagesArray = formState.images.split(',').map((image) => image.trim());

    try {
      const { data } = await addDIY({
        variables: {
          ...formState,
          materialsUsed: materialsUsedArray,
          images: imagesArray.join(', '), 
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
      materialsUsed: [''], // Reset to one empty field
      instructions: '',
      images: '',
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
          <label htmlFor="materialsUsed" className="block text-gray-400 font-bold mb-2">
            Materials Used:
          </label>
          {formState.materialsUsed.map((material, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name="materialsUsed"
                value={material}
                onChange={(event) => handleMaterialChange(event, index)}
                required
                className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
              {index === formState.materialsUsed.length - 1 && (
                <button
                  type="button"
                  onClick={addMaterialField}
                  className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 ml-2"
                >
                  +
                </button>
              )}
            </div>
          ))}
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
            type="text"
            name="images"
            id="images"
            value={formState.images}
            onChange={handleInputChange}
            required
            className="text-black w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
          <img src={formState.file ? URL.createObjectURL(formState.file) : ''} alt="Selected" />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Create DIY
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error.message}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
    </div>
  );
}

export default Create;
