import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useQuery } from '@apollo/client'; // Import useQuery
import { SEARCH_DIYS } from '../utils/queries'; // Import your GraphQL query

import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Create state for holding search term
  const { loading, data } = useQuery(SEARCH_DIYS, { // Use useQuery hook to make query request
    variables: { searchTerm },
    skip: !searchTerm,
  });

  const handleChange = (event) => { 
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm('');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="w-[600px] relative">
        <div className="relative">
          <input
            className="w-full p-4 rounded-full bg-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
            type="search"
            name="search"
            id="search"
            placeholder="Search for DIYs"
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-yellow-500 hover:bg-yellow-600 rounded-full"
          >
            <AiOutlineSearch />
          </button>
        </div>

        {/* Display search results */}
        {searchTerm && (
          <div className="absolute top-full left-0 right-0 bg-slate-800 bg-opacity-80 backdrop-blur-md rounded-b-lg overflow-hidden z-10">
            {loading ? (
              <div className="p-4 text-gray-600">Searching...</div>
            ) : (
              data.searchDIYs.length > 0 ? (
                data.searchDIYs.map((DIY) => (
                  <Link
                    key={DIY._id}
                    to={`/diy/${DIY._id}`}
                    className="block p-4 hover:bg-gray-900 border-b border-gray-200"
                    onClick={clearSearch} // Clear search term when a result is clicked
                  >
                    <h3 className="text-yellow-500 text-lg">{DIY.title}</h3>
                    <p className="text-white">{DIY.description}</p>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-gray-600">No results found.</div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
