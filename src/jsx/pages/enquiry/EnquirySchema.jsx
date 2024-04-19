import * as Yup from "yup";

export const validationEnquirySchema = Yup.object({
	name: Yup.string()
		.required("Field is required.")
		.max(30, "Max 30 characters."),
	parentName: Yup.string()
		.required("Field is required.")
		.max(30, "Max 30 characters."),
	contactNo: Yup.string().matches(
		/^\d{10}$/,
		"Contact Number must be 10 digits."
	),
	// enquiryDate: Yup.date().required("Enquiry Date is required"), Commented as it is not required.
	// class: Yup.string().required("Select an option"), Commented as it is not required.
});
