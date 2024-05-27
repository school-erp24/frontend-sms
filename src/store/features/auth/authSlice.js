import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	accessToken: "",
	errorMessage: "",
	successMessage: "",
	showLoading: false,
};
// temp

export function extractErrorMessage(error) {
	return error.response?.data?.message || error.message || error.toString();
}

// temp

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearMessages: (state) => {
			state.errorMessage = "";
			state.successMessage = "";
		},
		logout: (state) => {
			localStorage.removeItem("userDetails");
			state.email = "";
			state.accessToken = "";
			state.errorMessage = "";
			state.successMessage = "";
		},

		setUserDetailsFromLocalStorage: (state) => {
			const userDetailsString = localStorage.getItem("userDetails");
			if (userDetailsString) {
				const userDetails = JSON.parse(userDetailsString);
				state.email = userDetails.email || "";
				state.accessToken = userDetails.accessToken || "";
				state.successMessage = "Login Successfully Completed";
				state.showLoading = false;
			}
		},
		toggleLoading: (state, action) => {
			state.showLoading = action.payload;
		},
	},

	extraReducers: (builder) => {},
});

// Export actions
export const {
	clearMessages,
	logout,
	setUserDetailsFromLocalStorage,
	toggleLoading,
} = authSlice.actions;

// Export selector
export const selectIsAuthenticated = (state) => {
	return !!state.auth.accessToken;
};

// Export reducer
export default authSlice.reducer;
