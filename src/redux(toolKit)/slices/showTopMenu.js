import { createSlice } from '@reduxjs/toolkit';


const initialState = {

  showTopMenu:true,
};

const showTopMenuSlice = createSlice({
  name: 'showTopMenu',
  initialState,
  reducers: {
    setShowTopMenu: (state, action) => {
      state.showTopMenu = action.payload; 
    }
  }
});

export const { setShowTopMenu } = showTopMenuSlice.actions;
export default showTopMenuSlice.reducer;
