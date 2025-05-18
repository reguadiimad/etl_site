import { createSlice } from '@reduxjs/toolkit';
import presntion from '../../Models/Home/Datas/presontionData.json'


const initialState = {
  language: 'fr',
  showLang:false, // Default language
  presntion // Use imported JSON as the initial state content
};

const contentSlice = createSlice({
  name: 'presntion',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload; // Update the language
    }
  }
});

export const { setLanguage } = contentSlice.actions;
export default contentSlice.reducer;
