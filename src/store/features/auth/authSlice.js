import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	accessToken: "",
	refreshToken: "",
	errorMessage: "",
	successMessage: "",
	showLoading: false,
};
// temp

export function extractErrorMessage(error) {
	return error.response?.data?.message || error.message || error.toString();
}

// temp

export const checkAutoLogin = createAsyncThunk(
	"auth/checkAutoLogin",
	async (tokenDetails) => {
		// const tokenDetailsString = localStorage.getItem("userDetails");

		console.log(tokenDetails);

		const tokenDetailsString = JSON.parse(tokenDetails);

		console.log(tokenDetailsString);

		if (!tokenDetails) {
			// dispatch(logout());

			return;
		}

		// navigate("/dashboard");

		// let expireDate = new Date(tokenDetails.expireDate);
		// let todaysDate = new Date();

		// if (todaysDate > expireDate) {
		// 	dispatch(logout());

		// 	return;
		// }

		// dispatch(loginConfirmedAction(tokenDetails));

		// const timer = expireDate.getTime() - todaysDate.getTime();
		// runLogoutTimer(dispatch, timer, navigate);

		return tokenDetailsString; // You can return any data you want from the async thunk
	}
);

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
			state.refreshToken = "";
			state.errorMessage = "";
			state.successMessage = "";
		},

		setUserDetailsFromLocalStorage: (state) => {
			const userDetailsString = localStorage.getItem("userDetails");
			if (userDetailsString) {
				const userDetails = JSON.parse(userDetailsString);
				state.email = userDetails.email || "";
				state.accessToken = userDetails.accessToken || "";
				state.refreshToken = userDetails.refreshToken || "";
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

export const selectIsAuthenticated = (state) => {
	return !!state.auth.accessToken;
};

// Export reducer
export default authSlice.reducer;

// export function saveTokenInLocalStorage(tokenDetails) {
// 	tokenDetails.expireDate = new Date(
// 		new Date().getTime() + tokenDetails.expiresIn * 1000
// 	);
// 	localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
// }

// export function runLogoutTimer(dispatch, timer, navigate) {
// 	setTimeout(() => {
// 		dispatch(Logout(navigate));
// 		dispatch(logout());
// 	}, timer);
// }
