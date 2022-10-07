import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   msg: "",
   isSidebarVisible: false,
};

const modalSlice = createSlice({
   name: "modal",
   initialState,
   reducers: {
      toggleSidebar: (state, action) => {
         state.isSidebarVisible = action.payload;
      },
   },
});

export const { toggleSidebar } = modalSlice.actions;

export default modalSlice.reducer;
