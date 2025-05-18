import { createSlice } from "@reduxjs/toolkit";

const indexSlice = createSlice({
  name: "indexSlice",
  initialState: 0,
  reducers: {
    setIsHome: (state, action) => action.payload, 
  },
});

export const { setIndex } = indexSlice.actions;

export default indexSlice.reducer;