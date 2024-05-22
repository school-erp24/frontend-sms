import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
	createEnquiry,
	getVillage,
	getDistrict,
} from "../../../services/EnquiryService";
import { getClass } from "../../../services/CommonService";
import { validationEnquirySchema } from "./EnquirySchema";
import PageTitle from "../../layouts/PageTitle";
import { toast } from "react-toastify";

const AddEnquiry = () => {
	const initialState = {
		name: "",
		lastName: "",
		parentName: "",
		contactNo: "",
		class: "",
		previousSchool: "",
		villageOrCity: "",
		district: "",
		parentConcern: "",
		enquiryDate: "",
		followUpDate: "",
	};

	const navigate = useNavigate();

	const [village, setVillage] = useState(null);
	const [district, setDistrict] = useState(null);

	const [enquiryModal, setEnquiryModal] = useState(false);

	const today = moment();
	const [enquiryDate, setEnquiryDate] = useState(today.toDate());
	const [followUpDate, setFollowUpDate] = useState(
		moment(today).add(7, "days").toDate()
	);

	const [formData, setFormData] = useState(getFormValues);
	const [className, setClassName] = useState(null);

	const [options, setOptions] = useState([]);
	const [creatableOptionsForVillage, setCreatableOptionsForVillage] = useState(
		[]
	);
	const [creatableOptionsForDistrict, setCreatableOptionsForDistrict] =
		useState([]);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleDropdown = (field, value) => {
		setFormData({
			...formData,
			[field]: value ? value.value : "",
		});
	};

	const confirmSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedFormData = {
				...formData,
				enquiryDate: moment
					.utc(enquiryDate)
					.local()
					.format("YYYY-MM-DD HH:mm:ss"),
				followUpDate: moment
					.utc(followUpDate)
					.local()
					.format("YYYY-MM-DD HH:mm:ss"),
			};

			await validationEnquirySchema.validate(updatedFormData, {
				abortEarly: false,
			});

			setEnquiryModal(true);
		} catch (error) {
			const newErrors = {};

			error.inner.forEach((err) => {
				newErrors[err.path] = err.message;
			});

			setErrors(newErrors);
		}
	};

	const handleSubmit = (flag) => {
		if (flag === "no") {
			//setFormData(initialState);
			setEnquiryModal(false);
			//navigate("/enquiry-list");
			//localStorage.removeItem("enquiry-form");
			setErrors({});
			return
		}
		createEnquiry({
			...formData,
			enquiryDate: moment
				.utc(enquiryDate)
				.local()
				.format("YYYY-MM-DD HH:mm:ss"),
			followUpDate: moment
				.utc(followUpDate)
				.local()
				.format("YYYY-MM-DD HH:mm:ss"),
		})
			.then((resp) => {
				if (resp.status === 200) {
					if (flag === "yes") {
						setFormData(initialState);
						setEnquiryDate(today.toDate());
						setFollowUpDate(moment(today).add(7, "days").toDate());
						setEnquiryModal(false);
						setVillage(null);
						setDistrict(null);
						setClassName("");
						localStorage.removeItem("enquiry-form");
						window.scrollTo(0, 0);
						setErrors({});
					}
				}
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
				toast.error(error.response.data.message || "Something went wrong")
			});
	};

	useEffect(() => {
		getClass().then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.class,
				label: option.class,
			}));
			setOptions(options);
		});
	}, []);

	useEffect(() => {
		getVillage().then((resp) => {
			const options = resp.data.data.map((option) => ({
				value: option.name,
				label: option.name,
			}));
			setCreatableOptionsForVillage(options);
		});
	}, []);

	useEffect(() => {
		getDistrict().then((resp) => {
			const options = resp.data.data.map((option) => ({
				value: option.name,
				label: option.name,
			}));
			setCreatableOptionsForDistrict(options);
		});
	}, []);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	function getFormValues() {
		const storedValues = localStorage.getItem("enquiry-form");
		if (!storedValues) return initialState;

		const parsedValues = JSON.parse(storedValues);

		if (parsedValues.villageOrCity) {
			const villageOrCity = {
				value: parsedValues.villageOrCity,
				label: parsedValues.villageOrCity,
			};
			setVillage(villageOrCity);
		}

		if (parsedValues.district) {
			const district = {
				value: parsedValues.district,
				label: parsedValues.district,
			};

			setDistrict(district);
		}
		if (parsedValues.enquiryDate)
			setEnquiryDate(moment(parsedValues.enquiryDate).toDate());
		if (parsedValues.followUpDate)
			setFollowUpDate(moment(parsedValues.followUpDate).toDate());

		return parsedValues;
	}

	useEffect(() => {
		localStorage.setItem("enquiry-form", JSON.stringify(formData));
	}, [formData]);

	return (
		<>
			<PageTitle activeMenu={"Add Enquiry"} motherMenu={"Enquiry Management"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<form onSubmit={confirmSubmit}>
								<div className="row">
									{/* Enquiry Date */}
									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label" htmlFor="datepicker">
												Enquiry Date <span className="text-danger">*</span>
											</label>

											<div>
												<DatePicker
													showIcon
													icon={"far fa-calendar"}
													selected={enquiryDate}
													onChange={(date) => {
														setEnquiryDate(date);
														setFormData((prevState) => ({
															...prevState,
															enquiryDate: moment
																.utc(date)
																.local()
																.format("YYYY-MM-DD HH:mm:ss"),
														}));
													}}
													className="form-control"
													maxDate={new Date()}
													dateFormat="dd/MM/yy"
												/>
											</div>
										</div>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label" htmlFor="name">
												First Name <span className="text-danger">*</span>
											</label>
											<input
												placeholder="Enter First Name"
												id="name"
												type="text"
												className="form-control"
												value={formData.name}
												onChange={handleChange}
											/>
											{errors.name && (
												<p className="text-danger">{errors.name}</p>
											)}
										</div>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label" htmlFor="lastName">
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

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label" htmlFor="parentName">
												Parent's Name <span className="text-danger">*</span>
											</label>
											<input
												placeholder="Enter Parent's Name"
												id="parentName"
												type="text"
												className="form-control"
												value={formData.parentName}
												onChange={handleChange}
											/>
											{errors.parentName && (
												<p className="text-danger">{errors.parentName}</p>
											)}
										</div>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label" htmlFor="class">
												Seeking Class <span className="text-danger">*</span>
											</label>
											<Select
												isSearchable={false}
												options={options}
												className="custom-react-select"
												onChange={(selectedOption) => {
													setFormData({
														...formData,
														class: selectedOption.value,
													});
													setClassName(selectedOption);
												}}
												value={className}
												id="class"
												placeholder=""
											/>
											{errors.class && (
												<p className="text-danger">{errors.class}</p>
											)}
										</div>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label" htmlFor="contactNo">
												Contact Number <span className="text-danger">*</span>
											</label>
											<input
												placeholder="Enter Contact Number"
												id="contactNo"
												type="text"
												className="form-control"
												maxLength="10"
												value={formData.contactNo}
												onChange={handleChange}
											/>
											{errors.contactNo && (
												<p className="text-danger">{errors.contactNo}</p>
											)}
										</div>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label">Village / City</label>

											<CreatableSelect
												id="villageOrCity"
												isClearable
												placeholder=""
												options={creatableOptionsForVillage}
												className="custom-react-select"
												onChange={(selectedOption) => {
													handleDropdown("villageOrCity", selectedOption);
													setVillage(selectedOption);
												}}
												onCreateOption={(inputValue) => {
													const newValue = {
														value: inputValue,
														label: inputValue,
													};
													setCreatableOptionsForVillage([
														...creatableOptionsForVillage,
														newValue,
													]);
													handleDropdown("villageOrCity", newValue);
													setVillage(newValue);
												}}
												value={village}
												noOptionsMessage={() => null}
												formatCreateLabel={() => undefined}
												promptTextCreator={() => false}
											/>
										</div>
									</div>

									<div className="col-sm-4">
										<div className="form-group">
											<label className="form-label">District</label>

											<CreatableSelect
												id="district"
												isClearable
												placeholder=""
												options={creatableOptionsForDistrict}
												className="custom-react-select"
												onChange={(selectedOption) => {
													handleDropdown("district", selectedOption);
													setDistrict(selectedOption);
												}}
												onCreateOption={(inputValue) => {
													const newValue = {
														value: inputValue,
														label: inputValue,
													};
													setCreatableOptionsForDistrict([
														...creatableOptionsForDistrict,
														newValue,
													]);
													handleDropdown("district", newValue);
													setDistrict(newValue);
												}}
												value={district}
												noOptionsMessage={() => null}
												formatCreateLabel={() => undefined}
												promptTextCreator={() => false}
											/>
										</div>
									</div>

									<div className="col-sm-4" style={{ zIndex: 0 }}>
										<div className="form-group">
											<label className="form-label" htmlFor="followUpDate">
												Follow-up Date
											</label>
											<div>
												<DatePicker
													showIcon
													icon={"far fa-calendar"}
													selected={followUpDate}
													onChange={(date) => {
														setFollowUpDate(date);
														setFormData((prevState) => ({
															...prevState,
															followUpDate: moment
																.utc(date)
																.local()
																.format("YYYY-MM-DD HH:mm:ss"),
														}));
													}}
													className="form-control"
													minDate={new Date().setDate(new Date().getDate() + 7)}
													dateFormat="dd/MM/yy"
												/>
											</div>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label" htmlFor="previousSchool">
												Previous School
											</label>
											<input
												placeholder="Enter Previous School"
												id="previousSchool"
												type="text"
												className="form-control"
												value={formData.previousSchool}
												onChange={handleChange}
											/>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label" htmlFor="remarks">
												Remarks
											</label>
											<textarea
												placeholder="Enter Remarks"
												id="remarks"
												className="form-control"
												value={formData.remarks}
												onChange={handleChange}
											/>
										</div>
									</div>

									<div className="col-lg-12 col-md-12 col-sm-12">
										<button type="submit" className="btn btn-primary me-1">
											Submit
										</button>
										<button
											className="btn btn-danger light"
											onClick={() => navigate("/enquiry-list")}
										>
											Cancel
										</button>
									</div>
								</div>
							</form>

							<Modal
								className="fade"
								show={enquiryModal}
								onHide={setEnquiryModal}
								centered
							>
								<Modal.Header>
									<Modal.Title>Alert</Modal.Title>
									<Button
										variant=""
										className="btn-close"
										onClick={() => setEnquiryModal(false)}
									></Button>
								</Modal.Header>
								<Modal.Body>Would you like to add enquiry?</Modal.Body>
								<Modal.Footer>
									<Button
										onClick={() => {
											handleSubmit("no");
										}}
										variant="danger light"
									>
										No
									</Button>
									<Button
										variant="primary"
										onClick={() => {
											handleSubmit("yes");
										}}
									>
										Yes
									</Button>
								</Modal.Footer>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddEnquiry;
