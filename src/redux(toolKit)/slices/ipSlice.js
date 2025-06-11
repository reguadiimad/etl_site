// src/store/slices/ipSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk to fetch IP
export const fetchIpAddress = createAsyncThunk('ip/fetchIpAddress', async () => {
  const res = await fetch('https://api.ipify.org?format=json')
  const data = await res.json()
  return data.ip
})

const ipSlice = createSlice({
  name: 'ip',
  initialState: {
    address: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIpAddress.fulfilled, (state, action) => {
      state.address = action.payload
    })
  },
})

export default ipSlice.reducer
