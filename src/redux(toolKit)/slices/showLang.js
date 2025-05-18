import { createSlice } from '@reduxjs/toolkit';


const initialState = {

  showLang:true, // Default language
};

const contentSlice = createSlice({
  name: 'showLang',
  initialState,
  reducers: {
    setShowLang: (state, action) => {
      state.showLang = action.payload; // Update the language
    }
  }
});

export const { setShowLang } = contentSlice.actions;
export default contentSlice.reducer;
