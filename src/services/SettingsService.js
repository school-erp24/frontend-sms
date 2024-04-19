import AxiosInstance from "./AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getAdmissionSetting() {
	return AxiosInstance.get(BASE_URL + "/school/table-list/get");
}

export function postAdmissionSetting(rows) {
	return AxiosInstance.post(BASE_URL + "/school/table-list/update", rows);
}
