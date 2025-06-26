import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  searchQuery: '',
  sortBy: 'asc',
};

const moviesSlice = createSlice({
  name: 'movies',
    initialState, 
  reducers: {
    addMovie(state, action) {
      state.items.push(action.payload);
    },
    deleteMovie(state, action) {
      state.items = state.items.filter(movie => movie.id !== action.payload);
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { addMovie, deleteMovie, setSearchQuery, setSortBy } = moviesSlice.actions;
export default moviesSlice.reducer;
