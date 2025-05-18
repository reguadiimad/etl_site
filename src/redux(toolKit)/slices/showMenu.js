import { createSlice } from '@reduxjs/toolkit';


const initialState = {

  showMenu:true, // Default language
};

const showMenuSlice = createSlice({
  name: 'showMenu',
  initialState,
  reducers: {
    setShowMenu: (state, action) => {
      state.showMenu = action.payload; // Update the language
    }
  }
});

export const { setShowMenu } = showMenuSlice.actions;
export default showMenuSlice.reducer;
