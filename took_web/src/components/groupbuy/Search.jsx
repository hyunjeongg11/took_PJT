import React, { useState } from 'react';
import { searchPlaces } from '../../utils/map';
import searchIcon from '../../assets/taxi/search.png';

const Search = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  setLatitude,
  setLongitude,
}) => {
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async () => {
    if (value.trim()) {
      try {
        const searchResults = await searchPlaces(value);
        setResults(searchResults);
        setShowDropdown(true);
      } catch (error) {
        console.error('검색 오류:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelect = (place) => {
    onChange({ target: { name, value: place.place_name } });
    setLatitude(place.y);
    setLongitude(place.x);
    setShowDropdown(false);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="my-2">
      <div className="flex justify-end items-center text-sm font-normal text-black w-full">
        <span className="mr-12">{label}</span>
        <div className="flex items-center flex-grow justify-end">
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onClick={handleFocus}
            className="text-black py-2 text-xs rounded-md border border-collapse placeholder-neutral-300 font-medium text-right pr-2 focus:border-b-main"
          />
          <button
            className="ml-2 text-xs font-bold text-white rounded-md flex items-center justify-center"
            onClick={handleSearch}
          >
            <img src={searchIcon} alt="검색" className="w-7 opacity-70" />
          </button>
        </div>
      </div>
      {showDropdown && (
        <ul className="mt-2 border border-neutral-300 rounded-md bg-white max-h-60 overflow-y-auto shadow-md">
          {results.map((place) => (
            <li
              key={place.id}
              className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
