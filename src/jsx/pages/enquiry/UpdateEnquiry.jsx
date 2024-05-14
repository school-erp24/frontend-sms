import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import moment from "moment";
import { toast } from "react-toastify";

import {
	getEnquiries,
	updateEnquiry,
	getDistrict,
	getVillage,
} from "../../../services/EnquiryService";
import { getClass } from "../../../services/CommonService";
import { validationEnquirySchema } from "./EnquirySchema";
import PageTitle from "../../layouts/PageTitle";

const UpdateEnquiry = () => {
	const { id } = useParams();
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

	const [classFlag, setClassFlag] = useState("");

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

	const handleDropdown = (field, value) => {
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
		getEnquiries({ id: id })
			.then((resp) => {
				const rowData = resp.data?.data?.rows[0];
				if (rowData) {
					setFormData(rowData);
					setEnquiryDate(new Date(rowData.enquiryDate));
					setFollowUpDate(new Date(rowData.followUpDate));
					setClassFlag(rowData.class);
					console.log(rowData.class);
					setVillage({
						value: rowData.villageOrCity,
						label: rowData.villageOrCity,
					});
					setDistrict({
						value: rowData.district,
						label: rowData.district,
					});
				} else {
					toast.error("No data found");
					navigate("/enquiry-list");
				}
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
											<label className="form-label">
												Seeking Class <span className="text-danger">*</span>
											</label>
											<Select
												isSearchable={false}
												placeholder=""
												value={{
													value: classFlag,
													label: classFlag,
												}}
												options={options}
												className="custom-react-select"
												onChange={(selectedOption) => {
													setFormData({
														...formData,
														class: selectedOption.value,
													});
													setClassFlag(selectedOption.value);
												}}
											/>
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
												type="text"
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateEnquiry;
