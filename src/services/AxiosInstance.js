import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: BASE_URL,
// 	headers: {
// 		// "Access-Control-Allow-Origin": "*",
// 		// "ngrok-skip-browser-warning": true,
// 		"Content-Type": "application/json; charset=UTF-8",
// 	},
// });

// axiosInstance.interceptors.request.use((config) => {
// 	const state = store.getState();
// 	const token = state.auth.auth.idToken;
// 	config.params = config.params || {};
// 	config.params["auth"] = token;
// 	return config;
// });

// export default axiosInstance;

const axiosInstance = axios.create({
	// 	baseURL: BASE_URL,
	headers: {
		// "Content-Type": "multipart/form-data",
	},
});

axiosInstance.interceptors.request.use((config) => {
	let user = localStorage.getItem("userDetails");
	user = JSON.parse(user);
	config.headers["Authorization"] = user.accessToken;
	config.headers["ngrok-skip-browser-warning"] = true;
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.status === 200 || response.status === 201) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	(error) => {
		if (error.status) {
			switch (error.response.status) {
				case 401:
					// route this to login page when it is not authenticated
					// window.location.href = "/";
					break;
				case 402:
					//TODO.
					break;
			}
			return Promise.reject(error.response);
		}
	}
);

export default axiosInstance;
