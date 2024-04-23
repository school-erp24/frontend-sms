import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { Accordion } from "react-bootstrap";

import PageTitle from "../../layouts/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";

import { initialState } from "./initialState";
import { getAdmissionSetting } from "../../../services/SettingsService";
import { getClass, getSections } from "../../../services/CommonService";
import { postAdmissionForm } from "../../../services/StudentService";

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

const AdmissionForm = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialState);

	const [admissionDetailsFields, setAdmissionDetailsFields] = useState([]);
	const [admissionDate, setAdmissionDate] = useState(new Date());
	const [classOptions, setClassOptions] = useState([]);
	const [sectionOptions, setSectionOptions] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedSection, setSelectedSection] = useState(null);

	const [studentDetailsFields, setStudentDetailsFields] = useState([]);
	const [DOB, setDOB] = useState(new Date());

	const [familyDetailsFields, setFamilyDetailsFields] = useState([]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleRadioButton = (e, field) => {
		const { value } = e.target;
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData({
			...formData,
			[e.target.id]: file,
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

	const handleSubmit = (e) => {
		e.preventDefault();
		postAdmissionForm({
			...formData,
			admissionDate: admissionDate.toISOString().split("T")[0],
			DOB: DOB.toISOString().split("T")[0],
		})
			.then((resp) => {
				if (resp.status === 200) {
					setFormData(initialState);
					setSelectedClass(null);
					setSelectedSection(null);
					alert("done");
				}
			})
			.catch((error) => {
				console.error("Error submitting form:", error);
			});
	};

	useEffect(() => {
		getAdmissionSetting()
			.then((resp) => {
				setAdmissionDetailsFields(resp.data.data.rows[0].list);

				const mergedStudentDetails = [
					...resp.data.data.rows[1].list,
					...resp.data.data.rows[2].list,
					...resp.data.data.rows[3].list,
					...resp.data.data.rows[4].list,
				];

				setStudentDetailsFields(mergedStudentDetails);
				setFamilyDetailsFields(resp.data.data.rows[5].list);
				console.log(resp.data.data.rows[5].list);
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
							<form onSubmit={handleSubmit}>
								{/* ADMISSION DETAILS ACCORDIAN */}
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

													{/* Admission No */}
													<div className="col-sm-6">
														<div className="form-group">
															<label
																className="form-label"
																htmlFor="admissionNo"
															>
																Admission No
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
																First Name
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

													{admissionDetailsFields.find(
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
																value={{
																	label: selectedClass,
																	value: selectedClass,
																}}
																onChange={(selectedOption) => {
																	handleGetSections(selectedOption.id);
																	setSelectedClass(selectedOption.value);
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
																value={{
																	label: selectedSection,
																	value: selectedSection,
																}}
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
																Father's Name
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

								{/* STUDENT DETAILS ACCORDIAN */}
								<Accordion className="accordion accordion-with-icon">
									<Accordion.Item className="accordion-item" eventKey="0">
										<Accordion.Header className="accordion-header rounded-lg">
											<span className="accordion-header-icon"></span>
											<span className="accordion-header-text">
												Student Details
											</span>
											<span className="accordion-header-indicator indicator-bordered"></span>
										</Accordion.Header>
										<Accordion.Collapse eventKey="0">
											<div className="accordion-body">
												<div className="row">
													{/* Gender */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Gender" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="gender">
																	Gender
																</label>
																<div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="Male"
																			id="inlineRadio1"
																			value="Male"
																			checked={formData.gender === "Male"}
																			onChange={(e) =>
																				handleRadioButton(e, "gender")
																			}
																		/>
																		<label
																			className="form-check-label"
																			htmlFor="inlineRadio1"
																		>
																			Male
																		</label>
																	</div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="Female"
																			id="inlineRadio1"
																			value="Female"
																			checked={formData.gender === "Female"}
																			onChange={(e) =>
																				handleRadioButton(e, "gender")
																			}
																		/>
																		<label
																			className="form-check-label"
																			htmlFor="inlineRadio1"
																		>
																			Female
																		</label>
																	</div>
																</div>
															</div>
														</div>
													)}
													{/* DOB */}
													{studentDetailsFields.find(
														(row) => row.field === "D.O.B" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="datepicker1"
																>
																	Date of Birth
																</label>
																<div>
																	<DatePicker
																		selected={DOB}
																		onChange={(date) => setDOB(date)}
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													)}
													{/* Blood Group */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Blood group" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="bloodGroup"
																>
																	Blood Group
																</label>
																<input
																	placeholder=""
																	id="bloodGroup"
																	type="text"
																	className="form-control"
																	value={formData.bloodGroup}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* Height */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Height" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="height">
																	Height
																</label>
																<input
																	placeholder=""
																	id="height"
																	type="text"
																	className="form-control"
																	value={formData.height}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* Weight */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "weight" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="weight">
																	Weight
																</label>
																<input
																	placeholder=""
																	id="weight"
																	type="text"
																	className="form-control"
																	value={formData.weight}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* Aadhar No. */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Adhar no." && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="aadharCard"
																>
																	Aadhar No.
																</label>
																<input
																	placeholder=""
																	id="aadharCard"
																	type="text"
																	className="form-control"
																	value={formData.aadharCard}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* Transport */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Transport" && row.status === "1"
													) && (
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
													)}
													{/* Religion */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Religion" && row.status === "1"
													) && (
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
													)}
													{/* Student Type */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Student Type" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label">
																	Student Type
																</label>
																<Select
																	isSearchable={false}
																	defaultValue={options1[0]}
																	options={options1}
																	className="custom-react-select"
																/>
															</div>
														</div>
													)}
													{/* Caste */}
													{studentDetailsFields.find(
														(row) => row.field === "Caste" && row.status === "1"
													) && (
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
													)}
													{/* Nationality */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Nationality" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label">
																	Nationality
																</label>
																<Select
																	isSearchable={false}
																	defaultValue={options1[0]}
																	options={options1}
																	className="custom-react-select"
																/>
															</div>
														</div>
													)}
													{/* Registration No */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Registration No." &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="registrationNo"
																>
																	Registration No
																</label>
																<input
																	placeholder=""
																	id="registrationNo"
																	type="text"
																	className="form-control"
																	value={formData.registrationNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* CRN No */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "CRN No." && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="crnNo">
																	CRN No.
																</label>
																<input
																	placeholder=""
																	id="crnNo"
																	type="text"
																	className="form-control"
																	value={formData.crnNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* RTE */}
													{studentDetailsFields.find(
														(row) => row.field === "RTE" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="rte">
																	RTE
																</label>
																<div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="inlineRadioOptions"
																			id="inlineRadio1"
																			value="Yes"
																			checked={formData.rte === "Yes"}
																			onChange={(e) =>
																				handleRadioButton(e, "rte")
																			}
																		/>

																		<label
																			className="form-check-label"
																			htmlFor="inlineRadio1"
																		>
																			Yes
																		</label>
																	</div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="inlineRadioOptions"
																			id="inlineRadio2"
																			value="No"
																			checked={formData.rte === "No"}
																			onChange={(e) =>
																				handleRadioButton(e, "rte")
																			}
																		/>

																		<label
																			className="form-check-label"
																			htmlFor="inlineRadio2"
																		>
																			No
																		</label>
																	</div>
																</div>
															</div>
														</div>
													)}
													{/* RTE application no*/}
													{studentDetailsFields.find(
														(row) =>
															row.field === "RTE application no." &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="rteApplicationNo"
																>
																	RTE application No.
																</label>
																<input
																	placeholder=""
																	id="rteApplicationNo"
																	type="text"
																	className="form-control"
																	value={formData.rteApplicationNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* UDISE No.*/}
													{studentDetailsFields.find(
														(row) =>
															row.field === "UDISE No." && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="udiseNo">
																	UDISE No.
																</label>
																<input
																	placeholder=""
																	id="udiseNo"
																	type="text"
																	className="form-control"
																	value={formData.udiseNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* Family ID */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Family ID" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="familyId"
																>
																	Family ID
																</label>
																<input
																	placeholder=""
																	id="familyId"
																	type="text"
																	className="form-control"
																	value={formData.familyId}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
													{/* Student Photo*/}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Student Photo" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group fallback w-100">
																<label
																	className="form-label"
																	htmlFor="studentPhoto"
																>
																	Student Photo
																</label>
																<input
																	type="file"
																	className="form-control"
																	id="studentPhoto"
																	data-default-file=""
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}
													{/* Caste Certificate */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Caste certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group fallback w-100">
																<label
																	className="form-label"
																	htmlFor="casteCertificate"
																>
																	Caste Certificate
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="casteCertificate"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}
													{/* Aadhar Card */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Adhar card" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group fallback w-100">
																<label
																	className="form-label"
																	htmlFor="aadharCard"
																>
																	Aadhar Card
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="aadharCard"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}
													{/* Birth Certificate */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "birth certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group fallback w-100">
																<label
																	className="form-label"
																	htmlFor="birthCertificate"
																>
																	Birth Certificate
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="birthCertificate"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													{/* Transfer Certificate */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "transfer certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group fallback w-100">
																<label
																	className="form-label"
																	htmlFor="transferCertificate"
																>
																	Transfer Certificate
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="transferCertificate"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Previous Qualifications Details
														</h4>
													</div>

													{/* Previous class */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Previous class" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="previousClass"
																>
																	Previous class
																</label>
																<input
																	placeholder=""
																	id="previousClass"
																	type="text"
																	className="form-control"
																	value={formData.previousClass}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Pass year */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Pass year" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="passYear"
																>
																	Pass year
																</label>
																<input
																	placeholder=""
																	id="passYear"
																	type="text"
																	className="form-control"
																	value={formData.passYear}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Obt. Marks*/}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Obt. Marks" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="obtMarks"
																>
																	Obtained Marks
																</label>
																<input
																	placeholder=""
																	id="obtMarks"
																	type="text"
																	className="form-control"
																	value={formData.obtMarks}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Percentage*/}
													{studentDetailsFields.find(
														(row) => row.field === "% age" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="age">
																	Percentage
																</label>
																<input
																	placeholder=""
																	id="age"
																	type="text"
																	className="form-control"
																	value={formData.age}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* School name */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "School name" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="schoolName"
																>
																	School Name
																</label>
																<input
																	placeholder=""
																	id="schoolName"
																	type="text"
																	className="form-control"
																	value={formData.schoolName}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Government Portal ID
														</h4>
													</div>

													{/* Student Govt ID */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Student ID" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="studentId"
																>
																	Student Govt ID
																</label>
																<input
																	placeholder=""
																	id="studentId"
																	type="text"
																	className="form-control"
																	value={formData.studentId}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Family Govt ID */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Family ID" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="familyId"
																>
																	Family Govt ID
																</label>
																<input
																	placeholder=""
																	id="familyId"
																	type="text"
																	className="form-control"
																	value={formData.familyId}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Bank Account Details{" "}
														</h4>
													</div>

													{/* Bank Name*/}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Bank Name" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="bankName"
																>
																	Bank Name
																</label>
																<input
																	placeholder=""
																	id="bankName"
																	type="text"
																	className="form-control"
																	value={formData.bankName}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Bank Branch*/}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Bank Branch" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="bankBranch"
																>
																	Bank Branch
																</label>
																<input
																	placeholder=""
																	id="bankBranch"
																	type="text"
																	className="form-control"
																	value={formData.bankBranch}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* IFSC Code */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "IFSC Code" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="IFSCCode"
																>
																	IFSC Code
																</label>
																<input
																	placeholder=""
																	id="IFSCCode"
																	type="text"
																	className="form-control"
																	value={formData.IFSCCode}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Account No. */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Account No." && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="accountNo"
																>
																	Account No.
																</label>
																<input
																	placeholder=""
																	id="accountNo"
																	type="text"
																	className="form-control"
																	value={formData.accountNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* PAN No. */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "PAN No." && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="panNo">
																	PAN No.
																</label>
																<input
																	placeholder=""
																	id="panNo"
																	type="text"
																	className="form-control"
																	value={formData.panNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
												</div>
											</div>
										</Accordion.Collapse>
									</Accordion.Item>
								</Accordion>

								{/* FAMILY DETAILS ACCORDIAN */}
								<Accordion className="accordion accordion-with-icon">
									<Accordion.Item className="accordion-item" eventKey="0">
										<Accordion.Header className="accordion-header rounded-lg">
											<span className="accordion-header-icon"></span>
											<span className="accordion-header-text">
												Family Details
											</span>
											<span className="accordion-header-indicator indicator-bordered"></span>
										</Accordion.Header>
										<Accordion.Collapse eventKey="0">
											<div className="accordion-body">
												<div className="row">
													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Father's Details
														</h4>
													</div>

													{/* Father name */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father name" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherName"
																>
																	Father's Name
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="fatherName"
																	type="text"
																	className="form-control"
																	value={formData.fatherName}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father Qualification */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Qualification" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherQualification"
																>
																	Qualification
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="fatherQualification"
																	type="text"
																	className="form-control"
																	value={formData.fatherQualification}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father Occupation */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Occupation" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherOccupation"
																>
																	Occupation
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="fatherOccupation"
																	type="text"
																	className="form-control"
																	value={formData.fatherOccupation}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father Income */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Income" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherIncome"
																>
																	Income
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="fatherIncome"
																	type="text"
																	className="form-control"
																	value={formData.fatherIncome}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father aadhar card*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father adhar card" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherAadharCard"
																>
																	Aadhar Card
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="fatherAadharCard"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													{/* Father Photo*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Photo" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherPhoto"
																>
																	Photo
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="fatherPhoto"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													{/* Address */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Address" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="Address">
																	Address
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="Address"
																	type="text"
																	className="form-control"
																	value={formData.Address}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father Mobile no */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Mobile no" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherMobileNo"
																>
																	Mobile No
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="fatherMobileNo"
																	type="text"
																	className="form-control"
																	value={formData.fatherMobileNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father Email */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Email" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherEmail"
																>
																	Email
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="fatherEmail"
																	type="text"
																	className="form-control"
																	value={formData.fatherEmail}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Mother's Details
														</h4>
													</div>

													{/* Mother name*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother name" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherEmail"
																>
																	Mother's Name
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="motherEmail"
																	type="text"
																	className="form-control"
																	value={formData.motherEmail}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Qualification*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Qualification" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherQualification"
																>
																	Qualification
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="motherQualification"
																	type="text"
																	className="form-control"
																	value={formData.motherQualification}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Occupation */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Occupation" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherOccupation"
																>
																	Occupation
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="motherOccupation"
																	type="text"
																	className="form-control"
																	value={formData.motherOccupation}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Income */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Income" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherIncome"
																>
																	Income
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="motherIncome"
																	type="text"
																	className="form-control"
																	value={formData.motherIncome}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Aadhar*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother adhard" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="MotherAadharCard"
																>
																	Aadhar Card
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="MotherAadharCard"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Photo*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Photo" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherPhoto"
																>
																	Photo
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="motherPhoto"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													{/* Address */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Address" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label" htmlFor="Address">
																	Address
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="Address"
																	type="text"
																	className="form-control"
																	value={formData.Address}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Mobile */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Mobile no" &&
															row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherMobileNo"
																>
																	Mobile No
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="motherMobileNo"
																	type="text"
																	className="form-control"
																	value={formData.motherMobileNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Email */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Email" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherEmail"
																>
																	Email
																</label>
																<input
																	placeholder="Enter Last Name"
																	id="motherEmail"
																	type="text"
																	className="form-control"
																	value={formData.motherEmail}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}
												</div>
											</div>
										</Accordion.Collapse>
									</Accordion.Item>
								</Accordion>

								<div className="col-lg-12 col-md-12 col-sm-12">
									<button type="submit" className="btn btn-primary me-1">
										Submit
									</button>
									<button
										className="btn btn-danger light"
										onClick={() => navigate("/dashboard")}
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
