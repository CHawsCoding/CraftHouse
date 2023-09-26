import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { useQuery } from '@apollo/client'; // Import useQuery
import { SEARCH_DIYS } from '../utils/queries'; // Import your GraphQL query

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data } = useQuery(SEARCH_DIYS, {
    variables: { searchTerm },
  });

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

 // ...

return (
  <div className="flex justify-center">
    <div className="w-[600px] relative">
      <div className="relative">
        <input
          className="w-full p-4 rounded-full bg-slate-800"
          type="search"
          name="search"
          id="search"
          placeholder="Search for DIYs"
          value={searchTerm}
          onChange={handleChange}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-pink-500 hover:bg-pink-600 rounded-full">
          <AiOutlineSearch />
        </button>
      </div>

      {/* Display search results */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data && data.searchDIYs.length > 0 ? (
            <ul>
              {data.searchDIYs.map((diy) => (
                <li key={diy._id}>{diy.title}</li>
              ))}
            </ul>
          ) : (
            searchTerm && <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  </div>
);
};

export default SearchBar;