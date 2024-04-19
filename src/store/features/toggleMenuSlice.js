import { createSlice } from "@reduxjs/toolkit";

const toggleMenuSlice = createSlice({
	name: "toggleMenu",
	initialState: false,
	reducers: {
		toggleMenu: (state) => !state,
	},
});

export const { toggleMenu } = toggleMenuSlice.actions;
export default toggleMenuSlice.reducer;
