import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Accordion } from "react-bootstrap";
import { toast } from "react-toastify";
import PageTitle from "../../layouts/PageTitle";
import { useNavigate, useParams } from "react-router-dom";

import { initialState } from "./initialState";
import { getAdmissionSetting } from "../../../services/SettingsService";
import {
	getClass,
	getSections,
	getCaste,
	getReligion,
} from "../../../services/CommonService";
import { getTransportList } from "../../../services/TransportService";
import {
	updateAdmissionForm,
	getStudentType,
	getStudentList,
} from "../../../services/StudentService";
import { validationAdmissionSchema } from "./AdmissionSchema";

const UpdateAdmissionForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const today = moment();
	const [formData, setFormData] = useState(initialState);

	const [classFlag, setClassFlag] = useState("");

	const [admissionDetailsFields, setAdmissionDetailsFields] = useState([]);
	const [admissionDate, setAdmissionDate] = useState(moment(today).toDate());
	const [classOptions, setClassOptions] = useState([]);
	const [sectionOptions, setSectionOptions] = useState([]);
	const [transportOptions, setTransportOptions] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedSection, setSelectedSection] = useState(null);
	const [studentOptions, setStudentOptions] = useState([]);
	const [selectedStudentType, setSelectedStudentType] = useState(null);
	const [selectedTransport, setSelectedTransport] = useState(null);

	const [studentDetailsFields, setStudentDetailsFields] = useState([]);
	const [DOB, setDOB] = useState(moment(today).toDate());
	const [selectedCaste, setSelectedCaste] = useState(null);
	const [selectedReligion, setSelectedReligion] = useState(null);
	const [religionOptions, setReligionOptions] = useState([]);
	const [casteOptions, setCasteOptions] = useState([]);

	const [familyDetailsFields, setFamilyDetailsFields] = useState([]);

	const [uploadDocuments, setUploadDocuments] = useState([]);

	const [errors, setErrors] = useState({});

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedFormData = {
				...formData,
				admissionDate: moment
					.utc(admissionDate)
					.local()
					.format("YYYY-MM-DD HH:mm:ss"),
				DOB: moment.utc(DOB).local().format("YYYY-MM-DD HH:mm:ss"),
			};
			await validationAdmissionSchema.validate(updatedFormData, {
				abortEarly: false,
			});

			updateAdmissionForm(updatedFormData)
				.then((resp) => {
					if (resp.status === 200) {
						setFormData(initialState);
						setSelectedClass(null);
						setSelectedSection(null);
						toast.success("Admission updated");
						// navigate("/admission-list");
					}
				})
				.catch((error) => {
					console.error("Error submitting form:", error);
				});
		} catch (error) {
			const newErrors = {};

			error.inner.forEach((err) => {
				newErrors[err.path] = err.message;
			});

			setErrors(newErrors);
		}
	};

	useEffect(() => {
		getAdmissionSetting()
			.then((resp) => {
				setAdmissionDetailsFields(resp.data.data.rows[0].list);
				setStudentDetailsFields(resp.data.data.rows[1].list);
				setFamilyDetailsFields(resp.data.data.rows[2].list);
				setUploadDocuments(resp.data.data.rows[3].list);
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
		getTransportList().then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.pickUp,
				label: option.pickUp,
				id: option.id,
			}));
			setTransportOptions(options);
		});
	}, []);

	useEffect(() => {
		getStudentType().then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.studentType,
				label: option.studentType,
				id: option.id,
			}));
			setStudentOptions(options);
		});
	}, []);

	useEffect(() => {
		getReligion().then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.religion,
				label: option.religion,
				id: option.id,
			}));
			setReligionOptions(options);
		});
	}, []);

	useEffect(() => {
		getCaste().then((resp) => {
			const options = resp.data.data.map((option) => ({
				value: option.caste,
				label: option.caste,
				id: option.id,
			}));
			setCasteOptions(options);
		});
	}, []);

	useEffect(() => {
		getStudentList({ id }).then((resp) => {
			const mainObject = {
				...resp.data.data.rows[0],
				...resp.data.data.rows[0].Family,
			};

			setAdmissionDate(new Date(resp.data.data.rows[0].admissionDate));
			setDOB(new Date(resp.data.data.rows[0].DOB));
			setSelectedClass(resp.data.data.rows[0].className);
			setSelectedSection(resp.data.data.rows[0].sectionName);
			setSelectedStudentType(resp.data.data.rows[0].studentType);
			setClassFlag(resp.data.data.rows[0].classId);
			setSelectedTransport(resp.data.data.rows[0].transport);
			setSelectedCaste(resp.data.data.rows[0].caste);
			setSelectedReligion(resp.data.data.rows[0].religion);
			delete mainObject.Family;
			console.log(mainObject);

			setFormData(mainObject);
		});
	}, []);

	useEffect(() => {
		if (classFlag) {
			getSections({ classId: classFlag }).then((resp) => {
				const options = resp.data.data.rows.map((option) => ({
					value: option.section,
					label: option.section,
					id: option.id,
				}));
				setSectionOptions(options);
			});
		}
	}, [classFlag]);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<>
			<PageTitle
				activeMenu={"Update Admission Form"}
				motherMenu={"Admissions"}
			/>
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
													<div className="col-sm-4">
														<div className="form-group">
															<label className="form-label" htmlFor="session">
																Session <span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter session"
																id="session"
																type="text"
																className="form-control"
																value={formData.session}
																onChange={handleChange}
															/>
															{errors.session && (
																<p className="text-danger">{errors.session}</p>
															)}
														</div>
													</div>

													{/* Admission Date */}
													<div className="col-sm-4">
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
																	onChange={(date) => {
																		setAdmissionDate(date);
																		setFormData((prevState) => ({
																			...prevState,
																			admissionDate: moment
																				.utc(admissionDate)
																				.local()
																				.format("YYYY-MM-DD HH:mm:ss"),
																		}));
																	}}
																	className="form-control"
																	dateFormat="dd/MM/yy"
																/>
															</div>
														</div>
													</div>

													{/* Admission No */}
													<div className="col-sm-4">
														<div className="form-group">
															<label
																className="form-label"
																htmlFor="admissionNo"
															>
																Admission No
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter Admission no"
																id="admissionNo"
																type="text"
																className="form-control"
																value={formData.admissionNo}
																onChange={handleChange}
															/>
															{errors.admissionNo && (
																<p className="text-danger">
																	{errors.admissionNo}
																</p>
															)}
														</div>
													</div>

													<div className="col-sm-4">
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
																value={formData.firstName}
																onChange={handleChange}
															/>
															{errors.firstName && (
																<p className="text-danger">
																	{errors.firstName}
																</p>
															)}
														</div>
													</div>

													{admissionDetailsFields.find(
														(row) =>
															row.field === "Last Name" && row.status === "1"
													) && (
														<div className="col-sm-4">
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

													<div className="col-sm-4">
														<div className="form-group">
															<label className="form-label" htmlFor="contactNo">
																Contact No
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter Contact No"
																id="contactNo"
																type="text"
																className="form-control"
																value={formData.contactNo}
																onChange={handleChange}
																maxLength="10"
															/>
															{errors.contactNo && (
																<p className="text-danger">
																	{errors.contactNo}
																</p>
															)}
														</div>
													</div>

													<div className="col-sm-4">
														<div className="form-group">
															<label className="form-label">
																Class
																<span className="text-danger">*</span>
															</label>
															<Select
																isSearchable={false}
																options={classOptions}
																className="custom-react-select"
																placeholder="Select class"
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
															{errors.classId && (
																<p className="text-danger">{errors.classId}</p>
															)}
														</div>
													</div>

													<div className="col-sm-4">
														<div className="form-group">
															<label className="form-label">
																Section
																<span className="text-danger">*</span>
															</label>
															<Select
																isSearchable={false}
																placeholder="Select section"
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
															{errors.sectionId && (
																<p className="text-danger">
																	{errors.sectionId}
																</p>
															)}
														</div>
													</div>

													<div className="col-sm-4">
														<div className="form-group">
															<label
																className="form-label"
																htmlFor="fatherName"
															>
																Father's Name
																<span className="text-danger">*</span>
															</label>
															<input
																placeholder="Enter Father Name"
																id="fatherName"
																type="text"
																className="form-control"
																value={formData.fatherName}
																onChange={handleChange}
															/>
															{errors.fatherName && (
																<p className="text-danger">
																	{errors.fatherName}
																</p>
															)}
														</div>
													</div>

													{/* Student Type */}
													<div className="col-sm-4">
														<div className="form-group">
															<label className="form-label">Student Type</label>
															<Select
																isSearchable={false}
																options={studentOptions}
																placeholder="Select student type"
																className="custom-react-select"
																value={{
																	label: selectedStudentType,
																	value: selectedStudentType,
																}}
																onChange={(selectedOption) => {
																	setSelectedStudentType(selectedOption.value);
																	setFormData({
																		...formData,
																		studentType: selectedOption.id,
																	});
																}}
															/>
															{errors.studentType && (
																<p className="text-danger">
																	{errors.studentType}
																</p>
															)}
														</div>
													</div>

													<div className="col-sm-4">
														<div className="form-group">
															<label className="form-label" htmlFor="staffNo">
																Staff No.
															</label>
															<input
																placeholder="Enter Staff no"
																id="staffNo"
																type="text"
																className="form-control"
																value={formData.staffNo}
																onChange={handleChange}
																maxLength="10"
															/>
															{errors.staffNo && (
																<p className="text-danger">{errors.staffNo}</p>
															)}
														</div>
													</div>

													{/* RTE */}
													{admissionDetailsFields.find(
														(row) => row.field === "RTE" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="rte">
																	RTE
																</label>
																<div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="rteOptions"
																			id="rte1"
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
																			name="rteOptions"
																			id="rte2"
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
													{admissionDetailsFields.find(
														(row) =>
															row.field === "RTE application no." &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="rteApplicationNo"
																>
																	RTE application No.
																</label>
																<input
																	placeholder="Enter RTE application no"
																	id="rteApplicationNo"
																	type="text"
																	className="form-control"
																	value={formData.rteApplicationNo}
																	onChange={handleChange}
																	readOnly={formData.rte !== "Yes"}
																/>
															</div>
														</div>
													)}

													{/* Availing Transport */}
													{admissionDetailsFields.find(
														(row) =>
															row.field === "Availing Transport" &&
															row.status === "1"
													) && (
														<div className="col-sm-2">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="availingTransport"
																>
																	Transport access
																</label>
																<div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="transportOptions"
																			id="ta1"
																			value="Yes"
																			checked={
																				formData.availingTransport === "Yes"
																			}
																			onChange={(e) =>
																				handleRadioButton(
																					e,
																					"availingTransport"
																				)
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
																			name="transportOptions"
																			id="ta2"
																			value="No"
																			checked={
																				formData.availingTransport === "No"
																			}
																			onChange={(e) =>
																				handleRadioButton(
																					e,
																					"availingTransport"
																				)
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

													{/* Transport */}
													{admissionDetailsFields.find(
														(row) =>
															row.field === "Transport" && row.status === "1"
													) && (
														<div className="col-sm-6">
															<div className="form-group">
																<label className="form-label">Transport</label>
																<Select
																	isSearchable={false}
																	placeholder={"Select Transport"}
																	options={transportOptions}
																	className="custom-react-select"
																	value={{
																		label: selectedTransport,
																		value: selectedTransport,
																	}}
																	onChange={(selectedOption) => {
																		setSelectedTransport(selectedOption.value);
																		setFormData({
																			...formData,
																			transportId: selectedOption.id,
																		});
																	}}
																/>
															</div>
														</div>
													)}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="gender">
																	Gender
																</label>
																<div>
																	<div className="form-check form-check-inline">
																		<input
																			className="form-check-input"
																			type="radio"
																			name="genderOptions1"
																			id="g1"
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
																			name="genderOptions2"
																			id="g2"
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
														(row) =>
															row.field === "D.O.B." && row.status === "1"
													) && (
														<div className="col-sm-4">
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
																		onChange={(date) => {
																			setDOB(date);
																			setFormData((prevState) => ({
																				...prevState,
																				DOB: moment
																					.utc(DOB)
																					.local()
																					.format("YYYY-MM-DD HH:mm:ss"),
																			}));
																		}}
																		className="form-control"
																		dateFormat="dd/MM/yy"
																	/>
																</div>
															</div>
														</div>
													)}

													{/* Age */}
													{studentDetailsFields.find(
														(row) => row.field === "Age" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="age">
																	Age
																</label>
																<input
																	placeholder="Enter age"
																	id="age"
																	type="text"
																	className="form-control"
																	value={formData.age}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="height">
																	Height
																</label>
																<input
																	placeholder="Enter height"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="weight">
																	Weight
																</label>
																<input
																	placeholder="Enter weight"
																	id="weight"
																	type="text"
																	className="form-control"
																	value={formData.weight}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Blood Group */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Blood group" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="bloodGroup"
																>
																	Blood Group
																</label>
																<input
																	placeholder="Enter Blood group"
																	id="bloodGroup"
																	type="text"
																	className="form-control"
																	value={formData.bloodGroup}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Caste */}
													{studentDetailsFields.find(
														(row) => row.field === "Caste" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label">Caste</label>
																<Select
																	isSearchable={false}
																	options={casteOptions}
																	className="custom-react-select"
																	value={{
																		label: selectedCaste,
																		value: selectedCaste,
																	}}
																	onChange={(selectedOption) => {
																		setSelectedCaste(selectedOption.value);
																		setFormData({
																			...formData,
																			caste: selectedOption.value,
																		});
																	}}
																/>
															</div>
														</div>
													)}

													{/* Religion */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Religion" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label">Religion</label>
																<Select
																	isSearchable={false}
																	options={religionOptions}
																	className="custom-react-select"
																	value={{
																		label: selectedReligion,
																		value: selectedReligion,
																	}}
																	onChange={(selectedOption) => {
																		setSelectedReligion(selectedOption.value);
																		setFormData({
																			...formData,
																			religion: selectedOption.value,
																		});
																	}}
																/>
															</div>
														</div>
													)}

													{/* Nationality */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Nationality" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="nationality"
																>
																	Nationality
																</label>
																<input
																	placeholder="Enter Nationality"
																	id="nationality"
																	type="text"
																	className="form-control"
																	value={formData.nationality}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="aadharNo"
																>
																	Aadhar No.
																</label>
																<input
																	placeholder="Enter Aadhar no"
																	id="aadharNo"
																	type="text"
																	className="form-control"
																	value={formData.aadharNo}
																	onChange={handleChange}
																	maxLength="12"
																/>
																{errors.aadharNo && (
																	<p className="text-danger">
																		{errors.aadharNo}
																	</p>
																)}
															</div>
														</div>
													)}

													{/* Registration No */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Registration No." &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="registrationNo"
																>
																	Registration No
																</label>
																<input
																	placeholder="Enter Registration no."
																	id="registrationNo"
																	type="text"
																	className="form-control"
																	value={formData.registrationNo}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="udiseNo">
																	UDISE No.
																</label>
																<input
																	placeholder="Enter UDISE no"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="familyId"
																>
																	Family ID
																</label>
																<input
																	placeholder="Enter Family id"
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
															Previous Qualifications Details
														</h4>
													</div>

													{/*Previous School name */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "previous School name" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="schoolName"
																>
																	Previous School Name
																</label>
																<input
																	placeholder="Previous school"
																	id="schoolName"
																	type="text"
																	className="form-control"
																	value={formData.schoolName}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Previous class */}
													{studentDetailsFields.find(
														(row) =>
															row.field === "Previous class" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="previousClass"
																>
																	Previous class
																</label>
																<input
																	placeholder="Previous class"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="passYear"
																>
																	Pass year
																</label>
																<input
																	placeholder="Enter Pass year"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="obtMarks"
																>
																	Marks Obtained
																</label>
																<input
																	placeholder="Enter marks"
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
														(row) =>
															row.field === "percentage" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="percentage"
																>
																	Percentage
																</label>
																<input
																	placeholder="Enter percentage"
																	id="percentage"
																	type="text"
																	className="form-control"
																	value={formData.percentage}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherName"
																>
																	Father's Name
																</label>
																<input
																	placeholder="Enter Father Name"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherQualification"
																>
																	Qualification
																</label>
																<input
																	placeholder="Enter qualification"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherOccupation"
																>
																	Occupation
																</label>
																<input
																	placeholder="Enter Occupation"
																	id="fatherOccupation"
																	type="text"
																	className="form-control"
																	value={formData.fatherOccupation}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Address */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Address" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="Address">
																	Address
																</label>
																<input
																	placeholder="Enter Address"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherMobileNo"
																>
																	Mobile No
																</label>
																<input
																	placeholder="Enter Mobile no"
																	id="fatherMobileNo"
																	type="text"
																	className="form-control"
																	value={formData.fatherMobileNo}
																	onChange={handleChange}
																/>
																{errors.fatherMobileNo && (
																	<p className="text-danger">
																		{errors.fatherMobileNo}
																	</p>
																)}
															</div>
														</div>
													)}

													{/* Father Email */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Email" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherEmail"
																>
																	Email
																</label>
																<input
																	placeholder="Enter Email"
																	id="fatherEmail"
																	type="text"
																	className="form-control"
																	value={formData.fatherEmail}
																	onChange={handleChange}
																/>
																{errors.fatherEmail && (
																	<p className="text-danger">
																		{errors.fatherEmail}
																	</p>
																)}
															</div>
														</div>
													)}

													{/* Father Income */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Income" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherIncome"
																>
																	Income
																</label>
																<input
																	placeholder="Enter Income"
																	id="fatherIncome"
																	type="text"
																	className="form-control"
																	value={formData.fatherIncome}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Father Aadhar no. */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Father Aadhar Card No" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherAadharNo"
																>
																	Father Aadhar no.
																</label>
																<input
																	placeholder="Enter Aadhar no"
																	id="fatherAadharNo"
																	type="text"
																	className="form-control"
																	value={formData.fatherAadharNo}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherName"
																>
																	Mother's Name
																</label>
																<input
																	placeholder="Enter Mother Name"
																	id="motherName"
																	type="text"
																	className="form-control"
																	value={formData.motherName}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherQualification"
																>
																	Qualification
																</label>
																<input
																	placeholder="Enter qualification"
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherOccupation"
																>
																	Occupation
																</label>
																<input
																	placeholder="Enter Occupation"
																	id="motherOccupation"
																	type="text"
																	className="form-control"
																	value={formData.motherOccupation}
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
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherMobileNo"
																>
																	Mobile No
																</label>
																<input
																	placeholder="Enter Mobile no"
																	id="motherMobileNo"
																	type="text"
																	className="form-control"
																	value={formData.motherMobileNo}
																	onChange={handleChange}
																/>
																{errors.motherMobileNo && (
																	<p className="text-danger">
																		{errors.motherMobileNo}
																	</p>
																)}
															</div>
														</div>
													)}

													{/* Mother Email */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Email" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherEmail"
																>
																	Email
																</label>
																<input
																	placeholder="Enter email"
																	id="motherEmail"
																	type="text"
																	className="form-control"
																	value={formData.motherEmail}
																	onChange={handleChange}
																/>
																{errors.motherEmail && (
																	<p className="text-danger">
																		{errors.motherEmail}
																	</p>
																)}
															</div>
														</div>
													)}

													{/* Mother Income */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Income" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherIncome"
																>
																	Income
																</label>
																<input
																	placeholder="Enter income"
																	id="motherIncome"
																	type="text"
																	className="form-control"
																	value={formData.motherIncome}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* Mother Aadhar no. */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Mother Aadhar Card No" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherAadharNo"
																>
																	Mother Aadhar no.
																</label>
																<input
																	placeholder="Enter Aadhar no"
																	id="motherAadharNo"
																	type="text"
																	className="form-control"
																	value={formData.motherAadharNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Bank Account Details
														</h4>
													</div>

													{/* Bank Name*/}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Bank Name" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="bankName"
																>
																	Bank Name
																</label>
																<input
																	placeholder="Enter Bank name"
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
													{familyDetailsFields.find(
														(row) =>
															row.field === "Bank Branch" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="bankBranch"
																>
																	Bank Branch
																</label>
																<input
																	placeholder="Enter branch"
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
													{familyDetailsFields.find(
														(row) =>
															row.field === "IFSC Code" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="IFSCCode"
																>
																	IFSC Code
																</label>
																<input
																	placeholder="Enter IFSC code"
																	id="IFSCCode"
																	type="text"
																	className="form-control"
																	value={formData.IFSCCode}
																	onChange={handleChange}
																/>
																{errors.IFSCCode && (
																	<p className="text-danger">
																		{errors.IFSCCode}
																	</p>
																)}
															</div>
														</div>
													)}

													{/* Account No. */}
													{familyDetailsFields.find(
														(row) =>
															row.field === "Account No." && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="accountNo"
																>
																	Account No.
																</label>
																<input
																	placeholder="Enter account no"
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
													{familyDetailsFields.find(
														(row) =>
															row.field === "PAN No." && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label className="form-label" htmlFor="panNo">
																	PAN No.
																</label>
																<input
																	placeholder="Enter PAN no."
																	id="panNo"
																	type="text"
																	className="form-control"
																	value={formData.panNo}
																	onChange={handleChange}
																/>
															</div>
														</div>
													)}

													{/* PAN Photo*/}
													{/* {familyDetailsFields.find(
														(row) =>
															row.field === "Upload PAN Card" &&
															row.status === "1"
													) && ( */}
													<div className="col-sm-4">
														<div className="form-group fallback w-100">
															<label
																className="form-label"
																htmlFor="uploadPanCard"
															>
																Upload Pan Card
															</label>
															<input
																type="file"
																className="form-control"
																id="uploadPanCard"
																data-default-file=""
																onChange={handleFileChange}
															/>
															{errors.uploadPanCard && (
																<p className="text-danger">
																	{errors.uploadPanCard}
																</p>
															)}
														</div>
													</div>
													{/* )} */}
												</div>
											</div>
										</Accordion.Collapse>
									</Accordion.Item>
								</Accordion>

								{/* DOCUMENTS DETAILS ACCORDIAN */}
								<Accordion className="accordion accordion-with-icon">
									<Accordion.Item className="accordion-item" eventKey="0">
										<Accordion.Header className="accordion-header rounded-lg">
											<span className="accordion-header-icon"></span>
											<span className="accordion-header-text">
												Upload Documents
											</span>
											<span className="accordion-header-indicator indicator-bordered"></span>
										</Accordion.Header>
										<Accordion.Collapse eventKey="0">
											<div className="accordion-body">
												<div className="row">
													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Student's Section
														</h4>
													</div>
													{/* Student Photo*/}
													{uploadDocuments.find(
														(row) =>
															row.field === "Student Photo" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
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

													{/* Aadhar Card */}
													{uploadDocuments.find(
														(row) =>
															row.field === "Aadhar card" && row.status === "1"
													) && (
														<div className="col-sm-4">
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
													{uploadDocuments.find(
														(row) =>
															row.field === "Birth Certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
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
													{uploadDocuments.find(
														(row) =>
															row.field === "Transfer Certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
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

													{/* Caste Certificate */}
													{uploadDocuments.find(
														(row) =>
															row.field === "Caste Certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
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

													{/* Character Certificate */}
													{uploadDocuments.find(
														(row) =>
															row.field === "Character Certificate" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group fallback w-100">
																<label
																	className="form-label"
																	htmlFor="characterCertificate"
																>
																	Character Certificate
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="characterCertificate"
																	onChange={handleFileChange}
																/>
															</div>
														</div>
													)}

													<div className="col-sm-12">
														<h4 style={{ textAlign: "center" }}>
															Parent's Section
														</h4>
													</div>

													{/* Father Photo*/}
													{uploadDocuments.find(
														(row) =>
															row.field === "Father Photo" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherPhoto"
																>
																	Father Photo
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

													{/* Father aadhar card*/}
													{uploadDocuments.find(
														(row) =>
															row.field === "Father Aadhar Card" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="fatherAadharCard"
																>
																	Father Aadhar Card
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

													{/* Mother Photo*/}
													{uploadDocuments.find(
														(row) =>
															row.field === "Mother Photo" && row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherPhoto"
																>
																	Mother Photo
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

													{/* Mother Aadhar*/}
													{uploadDocuments.find(
														(row) =>
															row.field === "Mother Aadhar Card" &&
															row.status === "1"
													) && (
														<div className="col-sm-4">
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="motherAadharCard"
																>
																	Mother Aadhar Card
																</label>
																<input
																	type="file"
																	className="form-control"
																	data-default-file=""
																	id="motherAadharCard"
																	onChange={handleFileChange}
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

export default UpdateAdmissionForm;
