import * as Yup from "yup";

const MAX_FILE_SIZE = 2000000; // 2 MB

export const validationAdmissionSchema = Yup.object({
	// ADMISSION DETAILS

	session: Yup.string().required("Session is required"),

	admissionNo: Yup.string().required("Field is required"),
	// .matches(/^[0-9]+$/, "Admission no should have digits"), // Maybe removed

	firstName: Yup.string()
		.required("Field is required")
		.max(20, "Max 20 characters"),

	lastName: Yup.string().max(20, "Max 20 characters"),

	contactNo: Yup.string().matches(
		/^\d{10}$/,
		"Contact Number must be 10 digits"
	),

	fatherName: Yup.string()
		.required("Field is required")
		.max(20, "Max 20 characters"),

	classId: Yup.string().required("Please select a class"),

	sectionId: Yup.string().required("Please select a section"),

	studentType: Yup.string().required("Please select an option"),

	staffNo: Yup.string().matches(/^\d{10}$/, {
		message: "Staff Number must be 10 digits",
		excludeEmptyString: true,
	}),

	// STUDENT DETAILS

	aadharNo: Yup.string().matches(/^\d{12}$/, {
		message: "Aadhar Number must be 12 digits.",
		excludeEmptyString: true,
	}),

	// FAMILY DETAILS

	fatherMobileNo: Yup.string().matches(/^\d{10}$/, {
		message: "Mobile Number must be 10 digits",
		excludeEmptyString: true,
	}),

	fatherAadharNo: Yup.string().matches(/^\d{12}$/, {
		message: "Aadhar Number must be 12 digits.",
		excludeEmptyString: true,
	}),

	fatherEmail: Yup.string().email("Invalid email address"),

	motherMobileNo: Yup.string().matches(/^\d{10}$/, {
		message: "Mobile Number must be 10 digits",
		excludeEmptyString: true,
	}),

	motherAadharNo: Yup.string().matches(/^\d{12}$/, {
		message: "Aadhar Number must be 12 digits.",
		excludeEmptyString: true,
	}),

	motherEmail: Yup.string().email("Invalid email address"),

	// IFSCCode: Yup.string().matches(/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/, {
	// 	message: "Invalid Format",
	// 	excludeEmptyString: true,
	// }),

	// uploadPanCard: Yup.mixed()
	// 	.test("fileFormat", "Invalid Format", (file) => {
	// 		if (file) {
	// 			const supportedFormats = ["jpg", "gif", "png", "jpeg", "svg", "webp"];
	// 			return supportedFormats.includes(file.name.split(".").pop());
	// 		}
	// 		return true;
	// 	})
	// 	.test("fileSize", "Max allowed size is 2MB", (file) => {
	// 		if (!file) return true;
	// 		return file.size <= MAX_FILE_SIZE;
	// 	}),
});
