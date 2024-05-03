import AxiosInstance from "./AxiosInstance";

export function postAdmissionForm(formData) {
	return AxiosInstance.post("/school/student/create", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}

export function getAdmissionList(params) {
	return AxiosInstance.get("/school/student/get?admissionList", {
		params: params,
	});
}

export function getStudentList() {
	return AxiosInstance.get("/school/student/get");
}
