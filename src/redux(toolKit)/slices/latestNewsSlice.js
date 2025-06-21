// src/features/news/newsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace with your actual API endpoint
const API_URL = 'http://macbook-pro-2.local:8000/api/news/latest-translated/';

export const fetchLatestNews = createAsyncThunk(
  'news/fetchLatestNews',
  async () => {
    const response = await axios.get(API_URL);
    return response.data; // this should be the translated news array
  }
);

const latestNewsSlice = createSlice({
  name: 'latestNews',
  initialState: {
    latest: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.latest = action.payload;
      })
      .addCase(fetchLatestNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default latestNewsSlice.reducer;
