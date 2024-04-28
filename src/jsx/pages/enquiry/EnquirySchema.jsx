import * as Yup from "yup";

export const validationEnquirySchema = Yup.object({
	name: Yup.string()
		.required("Field is required.")
		.max(15, "Max 15 characters."),
	lastName: Yup.string().max(15, "Max 15 characters."),
	parentName: Yup.string()
		.required("Field is required.")
		.max(20, "Max 20 characters."),
	contactNo: Yup.string().matches(
		/^\d{10}$/,
		"Contact Number must be 10 digits."
	),
	// class: Yup.mixed().required(),
	class: Yup.string().required("Please select a class"),

	// enquiryDate: Yup.date().required("Enquiry Date is required"), Commented as it is not required.
});
