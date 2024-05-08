import AxiosInstance from "./AxiosInstance";

export function getTransportList() {
	return AxiosInstance.get("/school/transport/get");
}
