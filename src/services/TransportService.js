import AxiosInstance from "./AxiosInstance";

export function getTransportList() {
	return AxiosInstance.get("/school/transport/get");
}

export function createTransportSetting(transport) {
	return AxiosInstance.post("/school/transport/create", transport);
}

export function updateTransportSetting(transport) {
	return AxiosInstance.post("/school/transport/update", transport);
}
export function deleteTransport(id) {
	return AxiosInstance.post("/school/transport/delete", id);
}
