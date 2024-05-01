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
		],
	},
];
