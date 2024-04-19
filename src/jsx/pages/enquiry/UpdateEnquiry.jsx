import React, { useState, useEffect } from "react";
import { DatePicker } from "rsuite";
import { useLocation, useNavigate } from "react-router-dom";

import {
	getEnquiries,
	updateEnquiry,
	getClass,
	getDistrict,
	getVillage,
} from "../../../services/EnquiryService";
import { validationEnquirySchema } from "./EnquirySchema";

import PageTitle from "../../layouts/PageTitle";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const UpdateEnquiry = () => {
	const location = useLocation();
	const data = location.state;
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		enquiryDate: "",
		name: "",
		parentName: "",
		contactNo: "",
		class: "",
		previousSchool: "",
		villageOrCity: "",
		district: "",
		remarks: "",
		parentConcern: "",
		followUpDate: "",
	});

	const [enquiryDate, setEnquiryDate] = useState(null);
	const [followUpDate, setFollowUpDate] = useState(null);

	const [creatableOptionsForVillage, setCreatableOptionsForVillage] = useState(
		[]
	);
	const [creatableOptionsForDistrict, setCreatableOptionsForDistrict] =
		useState([]);

	const [village, setVillage] = useState(null);
	const [district, setDistrict] = useState(null);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleChange1 = (field, value) => {
		setFormData({
			...formData,
			[field]: value ? value.value : "",
		});
	};

	const [options, setOptions] = useState([]);

	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
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

			const resp = await updateEnquiry(updatedFormData);
			if (resp.status === 200) {
				navigate("/enquiry-list");
			}
		} catch (error) {
			const newErrors = {};

			error.inner.forEach((err) => {
				newErrors[err.path] = err.message;
			});

			setErrors(newErrors);
			console.error("Error fetching enquiries:", error);
		}
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
		getEnquiries({ id: data.id })
			.then((resp) => {
				setFormData(resp.data.data.rows[0]);

				setEnquiryDate(new Date(resp.data.data.rows[0].enquiryDate));
				setFollowUpDate(new Date(resp.data.data.rows[0].followUpDate));
				setVillage({
					value: resp.data.data.rows[0].villageOrCity,
					label: resp.data.data.rows[0].villageOrCity,
				});
				setDistrict({
					value: resp.data.data.rows[0].district,
					label: resp.data.data.rows[0].district,
				});
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<>
			<PageTitle
				activeMenu={"Update Enquiry"}
				motherMenu={"Enquiry Management"}
			/>
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<form onSubmit={(e) => handleSubmit(e)}>
								<div className="row">
									<div className="col-sm-6" style={{ zIndex: 0 }}>
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
													value: data.class,
													label: data.class,
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
													handleChange1("villageOrCity", selectedOption);
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
													handleChange1("villageOrCity", newValue);
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
													handleChange1("district", selectedOption);
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
													handleChange1("district", newValue);
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
													placeholder="Follow up Date"
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
											<input
												placeholder="Enter Remarks"
												id="remarks"
												type="text"
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
											onClick={() => navigate("/all-enquiries")}
										>
											Cancel
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateEnquiry;
