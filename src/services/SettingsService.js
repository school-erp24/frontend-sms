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

export function updateClasses(classes) {
	return AxiosInstance.post("/school/class/update", classes);
}

export function getConfigSettings() {
	return AxiosInstance.get("/school/admin/settings/get");
}

export function updateConfigSettings(config) {
	return AxiosInstance.post("/school/admin/settings/update", config);
}

export function getLatestSession() {
	return AxiosInstance.get("/school/session/get?admission=2");
}

export function getSessionList() {
	return AxiosInstance.get("/school/session/get");
}

export function createSession(session) {
	return AxiosInstance.post("/school/session/create", session);
}

export function updateSession(session) {
	return AxiosInstance.post("/school/session/update", session);
}

export function deleteSession(session) {
	return AxiosInstance.post("/school/session/delete", session);
}
