import AxiosInstance from "./AxiosInstance";

export function getAdmissionSetting() {
	return AxiosInstance.get("/school/table-list/get");
}

export function getFollowUp(params) {
	return AxiosInstance.get("/school/dashboard/enquiry/count", {
		params: params,
	});
}

export function postAdmissionSetting(rows) {
	return AxiosInstance.post("/school/table-list/update", rows);
}

export function createClasses(classes) {
	return AxiosInstance.post("/school/class/create", classes);
}
