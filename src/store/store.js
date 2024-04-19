import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import toggleMenuReducer from "./features/toggleMenuSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sideMenu: toggleMenuReducer,
	},
});
