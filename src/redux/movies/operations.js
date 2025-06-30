import { createAsyncThunk } from '@reduxjs/toolkit';
import { moviesService } from '../../api/moviesApi';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
    async (
      params = { limit: 10, offset: 0 },
      { rejectWithValue }
    ) => {
    try {
      const raw = await moviesService.listRaw(params);
      return {
        items: raw.data,
        total: raw.meta.total,
        limit: params.limit,
        offset: params.offset,
      };
    } catch (err) {
      return rejectWithValue(err.message || err.toString());
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await moviesService.getById(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || err.toString());
    }
  }
);

export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movieData, { rejectWithValue }) => {
    try {
      const data = await moviesService.add(movieData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || err.toString());
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id, { rejectWithValue }) => {
    try {
      await moviesService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || err.toString());
    }
  }
);

export const importMovies = createAsyncThunk(
  'movies/importMovies',
  async (file, { rejectWithValue }) => {
    try {
      const data = await moviesService.import(file);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || err.toString());
    }
  }
);