import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageIndex: 0, // Default page index
};

const pageIndexSlice = createSlice({
  name: 'pageIndexSlice',
  initialState,
  reducers: {
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload; // Corrected from state.language to state.pageIndex
    }
  }
});

export const { setPageIndex } = pageIndexSlice.actions;
export default pageIndexSlice.reducer;
