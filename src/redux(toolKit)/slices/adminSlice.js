import { createSlice } from "@reduxjs/toolkit";

// Retrieve admin info from localStorage
const adminInfo = localStorage.getItem("admin_info");

const initialState = {
  admin: adminInfo ? JSON.parse(adminInfo) : null,
  isAuthenticated: !!adminInfo,
};


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload; // Store full admin object
      state.isAuthenticated = true;
      localStorage.setItem("admin_info", JSON.stringify(action.payload)); // Store in localStorage
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      localStorage.removeItem("admin_info");
       // Remove from localStorage
    },
    updateAdminData: (state, action) => {
      state.admin = action.payload; // Update the admin data
      localStorage.setItem("admin_info", JSON.stringify(action.payload)); // Update in localStorage
    },
    
  },
});

export const { loginAdmin, logoutAdmin, updateAdminData } = adminSlice.actions;

export default adminSlice.reducer;
