import { createSlice } from "@reduxjs/toolkit";

const isHomeSlice = createSlice({
  name: "isHome",
  initialState: true, // Start with `true` as default since `Home` might be rendered first.
  reducers: {
    setIsHome: (state, action) => action.payload, // Update the `isHome` state based on payload.
  },
});

export const { setIsHome } = isHomeSlice.actions;

export default isHomeSlice.reducer;