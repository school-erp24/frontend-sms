import AxiosInstance from "./AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getAdmissionSetting() {
	return AxiosInstance.get(BASE_URL + "/school/table-list/get");
}

export function getFollowUp(params) {
	return AxiosInstance.get(BASE_URL + "/school/dashboard/enquiry/count", {
		params: params,
	});
}

export function postAdmissionSetting(rows) {
	return AxiosInstance.post(BASE_URL + "/school/table-list/update", rows);
}

export function getClasses() {
	return AxiosInstance.get(BASE_URL + "/school/class/get");
}

export function createClasses(classes) {
	return AxiosInstance.post(BASE_URL + "/school/class/create", classes);
}
