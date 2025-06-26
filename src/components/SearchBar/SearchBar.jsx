import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/movies/slice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by title or actor..."
        style={{ padding: '8px', width: '100%' }}
      />
    </div>
  );
};

export default SearchBar;
