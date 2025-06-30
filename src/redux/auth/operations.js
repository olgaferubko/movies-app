import { createAsyncThunk } from '@reduxjs/toolkit';
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res  = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const json = await res.json();

      if (json.status !== 1) {
        return rejectWithValue(json.error || { message: 'Registration failed' });
      }

      const token = json.token;
      localStorage.setItem('jwt', token);

      return token;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const json = await res.json();
      if (json.status !== 1) {
        return rejectWithValue(json.message || 'Login failed');
      }
      const token = json.token;
      localStorage.setItem('jwt', token);
      return token;
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);