import AxiosInstance from "./AxiosInstance";

export function getEnquiries(params) {
	return AxiosInstance.get("/school/enquiry/get", {
		params: params,
	});
}

export function createEnquiry(enquiryData) {
	return AxiosInstance.post("/school/enquiry/create", enquiryData);
}

export function updateEnquiry(enquiryData) {
	return AxiosInstance.post("/school/enquiry/update", enquiryData);
}

export function deleteEnquiry(ids) {
	return AxiosInstance.post("/school/enquiry/delete", ids);
}

export function getVillage() {
	return AxiosInstance.get("/school/village/get");
}

export function getDistrict() {
	return AxiosInstance.get("/school/district/get");
}
