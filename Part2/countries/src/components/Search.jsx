const Search = ({ search, handleSearchChange }) => {
  return (
    <div>
      <label htmlFor="search">Find countries </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
