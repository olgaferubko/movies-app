import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMovies,
  fetchMovieById,
  addMovie,
  deleteMovie,
  importMovies,
} from './operations';

const initialState = {
  items: [],
  current: null,
  total: 0,
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        const { items, total, offset } = action.payload;
        state.total = total;
        state.items = offset > 0
          ? state.items.concat(items)
          : items;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchMovieById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        state.total += 1;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((m) => m.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(importMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(importMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        const imported = action.payload;
        state.items = state.items.concat(imported);
        state.total += Array.isArray(imported) ? imported.length : 0;
      })
      .addCase(importMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;