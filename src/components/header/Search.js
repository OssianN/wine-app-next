import React from 'react';

const Search = ({ searchValue, setSearchValue }) => {
  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        value={searchValue}
        className="search"
        placeholder="search"
      ></input>
    </>
  );
};

export default Search;

const searchableValues = arr =>
  arr[0] === 'title' ||
  arr[0] === 'year' ||
  arr[0] === 'country' ||
  arr[0] === 'price' ||
  arr[0] === 'rating'
    ? arr[1]
    : '';

export const searchFilter = (searchValue, card) =>
  Object.entries(card)
    .map(searchableValues)
    .join('')
    .toLowerCase()
    .match(searchValue.toLowerCase());
