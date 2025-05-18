import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scrollVal",
  initialState: null, 
  reducers: {
    setScrollVal: (state, action) => action.payload, 
  },
});

export const { setScrollVal } = scrollSlice.actions;

export default scrollSlice.reducer;