import React, { useState, useEffect } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { DatePicker } from "rsuite";

import {
	createEnquiry,
	getClass,
	getVillage,
	getDistrict,
} from "../../../services/EnquiryService";
import { validationEnquirySchema } from "./EnquirySchema";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import PageTitle from "../../layouts/PageTitle";

const AddEnquiry = () => {
	const initialState = {
		name: "",
		parentName: "",
		contactNo: "",
		class: "1st",
		previousSchool: "",
		villageOrCity: "",
		district: "",
		remarks: "",
		parentConcern: "",
		enquiryDate: "",
		followUpDate: "",
	};

	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialState);

	const [enquiryModal, setEnquiryModal] = useState(false);

	const today = new Date();
	const [enquiryDate, setEnquiryDate] = useState(today);
	const [followUpDate, setFollowUpDate] = useState(
		new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
	);

	const [village, setVillage] = useState(null);
	const [district, setDistrict] = useState(null);

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

	const [options, setOptions] = useState([]);
	const [creatableOptionsForVillage, setCreatableOptionsForVillage] = useState(
		[]
	);
	const [creatableOptionsForDistrict, setCreatableOptionsForDistrict] =
		useState([]);

	const [errors, setErrors] = useState({});

	const confirmSubmit = async (e) => {
		e.preventDefault();
		try {
			const updatedFormData = {
				...formData,
				enquiryDate: enquiryDate.toISOString().split("T")[0],
				followUpDate: followUpDate.toISOString().split("T")[0],
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
		createEnquiry({
			...formData,
			enquiryDate: enquiryDate.toISOString().split("T")[0],
			followUpDate: followUpDate.toISOString().split("T")[0],
		})
			.then((resp) => {
				if (resp.status === 200) {
					if (flag === "yes") {
						setFormData(initialState);
						setEnquiryModal(false);
					}
					if (flag === "no") {
						setFormData(initialState);
						setEnquiryModal(false);
						navigate("/enquiry-list");
					}
				}
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
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
		console.log(errors);
	}, [errors]);

	return (
		<>
			<PageTitle activeMenu={"Add Enquiry"} motherMenu={"Enquiry Management"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<form onSubmit={confirmSubmit}>
								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label" htmlFor="datepicker">
												Enquiry Date <span className="text-danger">*</span>
											</label>
											<div className="input-hasicon mb-xl-0 mb-3">
												<DatePicker
													placeholder="Enquiry Date"
													className="picker-suit"
													value={enquiryDate}
													onChange={(date) => setEnquiryDate(date)}
													disabledDate={(date) => date > new Date()}
												/>
												<div className="icon">
													<i className="far fa-calendar" />
												</div>
											</div>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label" htmlFor="name">
												Name <span className="text-danger">*</span>
											</label>
											<input
												placeholder="Enter Name"
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

									<div className="col-sm-6">
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

									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label">
												Class <span className="text-danger">*</span>
											</label>
											<Select
												isSearchable={false}
												defaultValue={{
													value: "1st",
													label: "1st",
												}}
												options={options}
												className="custom-react-select"
												onChange={(selectedOption) => {
													setFormData({
														...formData,
														class: selectedOption.value,
													});
												}}
											/>
										</div>
									</div>

									<div className="col-sm-6">
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
												pattern="[0-9]{10}"
												value={formData.contactNo}
												onChange={handleChange}
											/>
											{errors.contactNo && (
												<p className="text-danger">{errors.contactNo}</p>
											)}
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
											<label className="form-label">Village / City</label>

											<CreatableSelect
												id="villageOrCity"
												isClearable
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
											/>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label">District</label>

											<CreatableSelect
												id="district"
												isClearable
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
											/>
										</div>
									</div>

									<div className="col-sm-6" style={{ zIndex: 0 }}>
										<div className="form-group">
											<label className="form-label" htmlFor="followUpDate">
												Follow-up Date
											</label>
											<div className="input-hasicon mb-xl-0 mb-3">
												<DatePicker
													placeholder="Follow-up Date"
													className="picker-suit"
													value={followUpDate}
													onChange={(date) => setFollowUpDate(date)}
													disabledDate={(date) =>
														date <
														new Date(
															new Date().setDate(new Date().getDate() - 1)
														)
													}
												/>

												<div className="icon">
													<i className="far fa-calendar" />
												</div>
											</div>
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

									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label" htmlFor="parentConcern">
												Parent's Concern
											</label>
											<textarea
												placeholder="Enter Parent's Concern"
												id="parentConcern"
												className="form-control"
												value={formData.parentConcern}
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
