import axios from "axios";

import { logout, setUserDetailsFromLocalStorage } from "./authSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (userData, dispatch) => {
	try {
		const response = await axios.post(
			BASE_URL + "/admin/school/login",
			userData
		);

		if (response.data) {
			localStorage.setItem(
				"userDetails",
				JSON.stringify(response.data.data[0])
			);
			dispatch(setUserDetailsFromLocalStorage());
			return response.data.data[0];
		}
	} catch (error) {
		alert("Invalid Credentials");
		throw error;
	}
};

export const checkAutoLogin = (tokenDetails, dispatch, navigate) => {
	if (!tokenDetails) {
		dispatch(logout());
		navigate("/login");
		return;
	}

	const tokenDetailsString = JSON.parse(tokenDetails);

	dispatch(setUserDetailsFromLocalStorage());

	navigate("/dashboard");

	return tokenDetailsString;
};

export const checkIfAuthenticated = (tokenDetails, dispatch, navigate) => {
	if (!tokenDetails) {
		dispatch(logout());
		navigate("/login");

		return;
	}

	const tokenDetailsString = JSON.parse(tokenDetails);

	dispatch(setUserDetailsFromLocalStorage());

	return tokenDetailsString;
};

export const handleLogout = (dispatch, navigate) => {
	dispatch(logout());
	navigate("/login");

	return;
};

const authService = {
	login,
	checkAutoLogin,
	checkIfAuthenticated,
	handleLogout,
};

export default authService;
