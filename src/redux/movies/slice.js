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
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.data)
            ? payload.data
            : [];
        state.items = list;
        state.total = list.length;
      })
      .addCase(fetchMovies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(fetchMovieById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.current = payload;
      })
      .addCase(fetchMovieById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(addMovie.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.unshift(payload);
        state.total += 1;
      })
      .addCase(addMovie.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(deleteMovie.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, { payload: id }) => {
        state.isLoading = false;
        state.items = state.items.filter(m => m.id !== id);
        state.total -= 1;
      })
      .addCase(deleteMovie.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(importMovies.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(importMovies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const imported = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.data)
            ? payload.data
            : [];
        state.items = state.items.concat(imported);
        state.total += imported.length;
      })
      .addCase(importMovies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default moviesSlice.reducer;