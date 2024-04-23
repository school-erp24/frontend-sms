import AxiosInstance from "./AxiosInstance";

export function postAdmissionForm(formData) {
	return AxiosInstance.post("/school/student/create", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
