import AxiosInstance from "./AxiosInstance";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getEnquiries(params) {
	return AxiosInstance.get(BASE_URL + "/school/enquiry/get", {
		params: params,
	});
}

export function createEnquiry(enquiryData) {
	return AxiosInstance.post(BASE_URL + "/school/enquiry/create", enquiryData);
}

export function updateEnquiry(enquiryData) {
	return AxiosInstance.post(BASE_URL + "/school/enquiry/update", enquiryData);
}

export function deleteEnquiry(ids) {
	return AxiosInstance.post(BASE_URL + "/school/enquiry/delete", ids);
}

export function getClass() {
	return AxiosInstance.get(BASE_URL + "/school/class/get");
}

export function getVillage() {
	return AxiosInstance.get(BASE_URL + "/school/village/get");
}

export function getDistrict() {
	return AxiosInstance.get(BASE_URL + "/school/district/get");
}
