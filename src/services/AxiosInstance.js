import axios from "axios";
import globalRouter from "../globalRouter";
import { toast } from "react-toastify";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

let refresh = false;

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
		if (error.response && error.response.status === 401 && !refresh) {
			refresh = true;

			toast.error("Unauthorized, Login again");
			localStorage.removeItem("userDetails");
			// globalRouter.navigate("/login");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
