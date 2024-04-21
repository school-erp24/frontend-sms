import AxiosInstance from "./AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getClass() {
	return AxiosInstance.get(BASE_URL + "/school/class/get");
}

export function getSections(params) {
	return AxiosInstance.get(BASE_URL + "/school/section/get", {
		params: params,
	});
}
