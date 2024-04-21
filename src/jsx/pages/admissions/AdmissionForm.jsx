import React, { useState, useEffect } from "react";
import Select from "react-select";
// import { DatePicker } from "rsuite";
import DatePicker from "react-datepicker";

import { Accordion } from "react-bootstrap";

import PageTitle from "../../layouts/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { AdmissionAccordian } from "./AdmissionAccordian";
import { StudentAccordian } from "./StudentAccordian";
import { getAdmissionSetting } from "../../../services/SettingsService";
import { getClass, getSections } from "../../../services/CommonService";

const options1 = [
	{ value: "1", label: "Department" },
	{ value: "2", label: "HTML" },
	{ value: "3", label: "CSS" },
	{ value: "4", label: "JavaScript" },
	{ value: "4", label: "Angular" },
	{ value: "4", label: "React" },
	{ value: "4", label: "VueJs" },
	{ value: "4", label: "Ruby" },
	{ value: "4", label: "PHP" },
	{ value: "4", label: "ASP.NET" },
	{ value: "4", label: "Python" },
	{ value: "4", label: "MySQL" },
];

const CustomAccordion = [
	{
		title: "Admission Details",
		content: (
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Session <span className="text-danger">*</span>
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="datepicker1">
							Admission Date <span className="text-danger">*</span>
						</label>
						<div className="input-hasicon mb-xl-0 mb-3">
							<DatePicker
								placeholder="Admission Date"
								className="picker-suit"
							/>
							<div className="icon">
								<i className="far fa-calendar" />
							</div>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Admission No <span className="text-danger">*</span>
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Roll no. <span className="text-danger">*</span>
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							First Name <span className="text-danger">*</span>
						</label>
						<input
							placeholder="Enter First Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Last Name
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">
							Class
							<span className="text-danger">*</span>
						</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">
							Section
							<span className="text-danger">*</span>
						</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Father's Name <span className="text-danger">*</span>
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Contact No <span className="text-danger">*</span>
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>
			</div>
		),
		bg: "primary",
	},
	{
		title: "Student's Details",
		content: (
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Gender
						</label>
						<div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="inlineRadio1"
									value="option1"
								/>
								<label className="form-check-label" htmlFor="inlineRadio1">
									Option 1
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="inlineRadio2"
									value="option2"
								/>
								<label className="form-check-label" htmlFor="inlineRadio2">
									Option 2
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="inlineRadio3"
									value="option3"
								/>
								<label className="form-check-label" htmlFor="inlineRadio3">
									Disabled
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="datepicker1">
							Date of Birth
						</label>
						<div className="input-hasicon mb-xl-0 mb-3">
							<DatePicker
								placeholder="Admission Date"
								className="picker-suit"
							/>
							<div className="icon">
								<i className="far fa-calendar" />
							</div>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Blood Group
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Height
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Weight
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Aadhar No.
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">Transport</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">Religion</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">Student Type</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">Caste</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label">Nationality</label>
						<Select
							isSearchable={false}
							defaultValue={options1[0]}
							options={options1}
							className="custom-react-select"
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Registration No
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							CRN No.
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							RTE
						</label>
						<div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="inlineRadio1"
									value="option1"
								/>
								<label className="form-check-label" htmlFor="inlineRadio1">
									Option 1
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="inlineRadio2"
									value="option2"
								/>
								<label className="form-check-label" htmlFor="inlineRadio2">
									Option 2
								</label>
							</div>
							<div className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="inlineRadio3"
									value="option3"
								/>
								<label className="form-check-label" htmlFor="inlineRadio3">
									RTE
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							RTE application
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							UDISE No.
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Family ID
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group fallback w-100">
						<label className="form-label" htmlFor="first_name">
							Student Photo
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group fallback w-100">
						<label className="form-label" htmlFor="first_name">
							Caste Certificate
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group fallback w-100">
						<label className="form-label" htmlFor="first_name">
							Aadhar Card
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group fallback w-100">
						<label className="form-label" htmlFor="first_name">
							Birth Certificate
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group fallback w-100">
						<label className="form-label" htmlFor="first_name">
							Transfer Certificate
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-12">
					<h4 style={{ textAlign: "center" }}>
						Previous Qualifications Details
					</h4>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Obtained Marks
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Percentage
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							School Name
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-12">
					<h4 style={{ textAlign: "center" }}>Government Portal ID</h4>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Student Govt ID
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Family Govt ID
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-12">
					<h4 style={{ textAlign: "center" }}>Bank Account Details </h4>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Bank Name
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Bank Branch
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							IFSC Code
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Account No.
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							PAN No.
						</label>
						<input
							placeholder=""
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>
			</div>
		),

		bg: "info",
	},

	{
		title: "Family Details",
		content: (
			<div className="row">
				<div className="col-sm-12">
					<h4 style={{ textAlign: "center" }}>Father's Details</h4>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Father's Name
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Qualification
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Occupation
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Income
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Aadhar Card
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Photo
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Address
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Mobile No
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Email
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-12">
					<h4 style={{ textAlign: "center" }}>Mother's Details</h4>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Mother's Name
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Qualification
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Occupation
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Income
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Aadhar Card
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Photo
						</label>
						<input
							type="file"
							className="form-control"
							data-default-file=""
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Address
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Mobile No
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group">
						<label className="form-label" htmlFor="first_name">
							Email
						</label>
						<input
							placeholder="Enter Last Name"
							id="first_name"
							type="text"
							className="form-control"
							required
						/>
					</div>
				</div>
			</div>
		),
		bg: "primary",
	},
];

const AdmissionForm = () => {
	const initialState = {
		session: "",
		admissionDate: "",
		admissionNo: "",
		rollNo: "",
		firstName: "",
		lastName: "",
		classId: "",
		sectionId: "",
		fatherName: "",
		contactNo: "",
	};

	const [formData, setFormData] = useState(initialState);

	const [admissionRows, setAdmissionRows] = useState([]);
	const [admissionDate, setAdmissionDate] = useState(new Date());
	const [classOptions, setClassOptions] = useState([]);
	const [sectionOptions, setSectionOptions] = useState([]);
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSection, setSelectedSection] = useState("");

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleGetSections = (id) => {
		getSections({ classId: id }).then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.section,
				label: option.section,
				id: option.id,
			}));
			setSectionOptions(options);
		});
	};

	useEffect(() => {
		getAdmissionSetting()
			.then((resp) => {
				setAdmissionRows(resp.data.data.rows[0].list);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	useEffect(() => {
		getClass().then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.class,
				label: option.class,
				id: option.id,
			}));
			setClassOptions(options);
		});
	}, []);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<>
			<PageTitle activeMenu={"Admission Form"} motherMenu={"Admissions"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<form action="#" method="post" id="addStaffForm">
								{/* <Accordion
									className="accordion accordion-with-icon"
									defaultActiveKey="0"
									alwaysOpen
								>
									{CustomAccordion.map((d, i) => (
										<Accordion.Item
											className="accordion-item"
											key={i}
											eventKey={`${i}`}
										>
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">{d.title}</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey={`${i}`}>
												<div className="accordion-body">{d.content}</div>
											</Accordion.Collapse>
										</Accordion.Item>
									))}
								</Accordion> */}

								<Accordion
									className="accordion accordion-with-icon"
									defaultActiveKey="0"
									alwaysOpen
								>
									<Accordion.Item className="accordion-item" eventKey="0">
										<Accordion.Header className="accordion-header rounded-lg">
											<span className="accordion-header-icon"></span>
											<span className="accordion-header-text">
												Admission Details
											</span>
											<span className="accordion-header-indicator indicator-bordered"></span>
										</Accordion.Header>
										<Accordion.Collapse eventKey="0">
											<div className="accordion-body">
												<div className="row">
													{/* Session */}
													<div className="col-sm-6">
														<div className="form-group">
															<label className="form-label" htmlFor="session">
																Session <span className="text-danger">*</span>
															</label>
															<input
																placeholder=""
																id="session"
																type="text"
																className="form-control"
																required
																value={formData.session}
																onChange={handleChange}
															/>
														</div>
													</div>

													{/* Admission Date */}
													<div className="col-sm-6">
														<div className="form-group">
															<label
																className="form-label"
																htmlFor="admissionDate"
															>
																Admission Date
																<span className="text-danger">*</span>
															</label>
															<div>
																<DatePicker
																	selected={admissionDate}
																	onChange={(date) => setAdmissionDate(date)}
																	className="form-control"
																/>
															</div>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<label
																className="form-label"
																htmlFor="admissionNo"
															>
																Admission No{" "}
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder=""
																id="admissionNo"
																type="text"
																className="form-control"
																required
																value={formData.admissionNo}
																onChange={handleChange}
															/>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<label className="form-label" htmlFor="rollNo">
																Roll no. <span className="text-danger">*</span>
															</label>
															<input
																placeholder=""
																id="rollNo"
																type="text"
																className="form-control"
																required
																value={formData.rollNo}
																onChange={handleChange}
															/>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<label className="form-label" htmlFor="firstName">
																First Name{" "}
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter First Name"
																id="firstName"
																type="text"
																className="form-control"
																required
																value={formData.firstName}
																onChange={handleChange}
															/>
														</div>
													</div>

													{admissionRows.find(
														(row) =>
															row.field === "Last Name" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="lastName"
																>
																	Last Name
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="lastName"
																	type="text"
																	className="form-control"
																	value={formData.lastName}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-6">
														<div className="form-group">
															<label className="form-label">
																Class
																<span className="text-danger">*</span>
															</label>
															<Select
																isSearchable={false}
																options={classOptions}
																className="custom-react-select"
																onChange={(selectedOption) => {
																	handleGetSections(selectedOption.id);
																	// setSelectedClass(selectedOption.value);
																	setFormData({
																		...formData,
																		classId: selectedOption.id,
																	});
																}}
															/>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<label className="form-label">
																Section
																<span className="text-danger">*</span>
															</label>
															<Select
																isSearchable={false}
																options={sectionOptions}
																className="custom-react-select"
																onChange={(selectedOption) => {
																	setSelectedSection(selectedOption.value);
																	setFormData({
																		...formData,
																		sectionId: selectedOption.id,
																	});
																}}
															/>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<label
																className="form-label"
																htmlFor="fatherName"
															>
																Father's Name{" "}
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter Last Name"
																id="fatherName"
																type="text"
																className="form-control"
																required
																value={formData.fatherName}
																onChange={handleChange}
															/>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<label className="form-label" htmlFor="contactNo">
																Contact No{" "}
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter Last Name"
																id="contactNo"
																type="text"
																className="form-control"
																required
																value={formData.contactNo}
																onChange={handleChange}
															/>
														</div>
													</div>
												</div>
											</div>
										</Accordion.Collapse>
									</Accordion.Item>
								</Accordion>
								<StudentAccordian />

								<div className="col-lg-12 col-md-12 col-sm-12">
									<button type="submit" className="btn btn-primary me-1">
										Submit
									</button>
									<button
										type="submit"
										className="btn"
										style={{ border: "1px solid #888888" }}
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdmissionForm;
