// export const MenuList = [
// 	//Dashboard
// 	{
// 		title: "Main Menu",
// 		classsChange: "menu-title",
// 		extraclass: "first",
// 		accessRights: ["School Admin", "Accountant 1", "Accountant 2", "Staff"],
// 	},
// 	//Dashboard
// 	{
// 		title: "Dashboard",
// 		iconStyle: <i className="la la-home" />,
// 		to: "dashboard",
// 		accessRights: ["School Admin", "Accountant 1", "Accountant 2", "Staff"],
// 	},

// 	// Enquiry Management
// 	{
// 		title: "Enquiry Management",
// 		classsChange: "mm-collapse",
// 		iconStyle: <i className="la la-comment" />,
// 		content: [
// 			{
// 				title: "Add Enquiry",
// 				to: "add-enquiry",
// 			},
// 			{
// 				title: "Enquiry List",
// 				to: "enquiry-list",
// 			},
// 		],
// 		accessRights: ["School Admin", "Accountant 1", "Accountant 2", "Staff"],
// 	},

// 	// Admission Management
// 	{
// 		title: "Admissions",
// 		classsChange: "mm-collapse",
// 		iconStyle: <i className="la la-file" />,
// 		content: [
// 			{
// 				title: "Add Admission",
// 				to: "add-admission",
// 			},

// 			{
// 				title: "Admission List",
// 				to: "admission-list",
// 			},
// 		],
// 		accessRights: ["School Admin", "Accountant 1", "Accountant 2", "Staff"],
// 	},

// 	// Student Management
// 	{
// 		title: "Student Management",
// 		classsChange: "mm-collapse",
// 		iconStyle: <i className="la la-user" />,
// 		content: [
// 			{
// 				title: "Student List",
// 				to: "student-list",
// 			},
// 		],
// 		accessRights: ["School Admin", "Accountant 1"],
// 	},

// 	// Settings
// 	{
// 		title: "Settings",
// 		classsChange: "mm-collapse",

// 		iconStyle: <i className="la la-gear" />,
// 		content: [
// 			{
// 				title: "Class Setting",
// 				to: "class-setting",
// 			},
// 			{
// 				title: "Admission Setting",
// 				to: "admission-setting",
// 			},
// 		],
// 		accessRights: ["School Admin", "Accountant 1", "Accountant 2", "Staff"],
// 	},
// ];

export const MenuList = [
	//Dashboard
	{
		title: "Main Menu",
		classsChange: "menu-title",
		extraclass: "first",
	},
	//Dashboard
	{
		title: "Dashboard",
		iconStyle: <i className="la la-home" />,
		to: "dashboard",
	},

	// Enquiry Management
	{
		title: "Enquiry Management",
		classsChange: "mm-collapse",
		iconStyle: <i className="la la-comment" />,
		content: [
			{
				title: "Add Enquiry",
				to: "add-enquiry",
			},
			{
				title: "Enquiry List",
				to: "enquiry-list",
			},
		],
	},

	// Admission Management
	{
		title: "Admissions",
		classsChange: "mm-collapse",
		iconStyle: <i className="la la-file" />,
		content: [
			{
				title: "Add Admission",
				to: "add-admission",
			},

			{
				title: "Admission List",
				to: "admission-list",
			},
		],
	},

	// Student Management
	{
		title: "Student Management",
		classsChange: "mm-collapse",
		iconStyle: <i className="la la-user" />,
		content: [
			{
				title: "Student List",
				to: "student-list",
			},
		],
	},

	// Settings
	{
		title: "Settings",
		classsChange: "mm-collapse",

		iconStyle: <i className="la la-gear" />,
		content: [
			{
				title: "Class Setting",
				to: "class-setting",
			},
			{
				title: "Admission Setting",
				to: "admission-setting",
			},
			{
				title: "Student Setting",
				to: "student-setting",
			},
			{
				title: "Transport Setting",
				to: "transport-setting",
			},
			{
				title: "Config Setting",
				to: "config-setting",
			},
		],
	},
];
