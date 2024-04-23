import AxiosInstance from "./AxiosInstance";

export function getClass() {
	return AxiosInstance.get("/school/class/get");
}

export function getSections(params) {
	return AxiosInstance.get("/school/section/get", {
		params: params,
	});
}
