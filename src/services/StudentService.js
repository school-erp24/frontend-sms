import AxiosInstance from "./AxiosInstance";

export function postAdmissionForm(formData) {
	return AxiosInstance.post("/school/student/create", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}

export function updateAdmissionForm(formData) {
	return AxiosInstance.post("/school/student/update", formData, {
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

export function createStudentType(studentType) {
	return AxiosInstance.post("/school/student-type/create", studentType);
}

export function updateStudentType(studentType) {
	return AxiosInstance.post("/school/student-type/update", studentType);
}

export function getStudentType() {
	return AxiosInstance.get("/school/student-type/get");
}

export function getStudentList(params) {
	return AxiosInstance.get("/school/student/get", {
		params: params,
	});
}
