const Filter = ({ search, setSearch }) => {
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
