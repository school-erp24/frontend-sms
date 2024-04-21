import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Accordion } from "react-bootstrap";

import { getClass, getSections } from "../../../services/CommonService";

export const AdmissionAccordian = ({ admissionRows }) => {
	const [startDate, setStartDate] = useState(new Date());
	const [classOptions, setClassOptions] = useState([]);
	const [sectionOptions, setSectionOptions] = useState([]);
	const [selectedClass, setSelectedClass] = useState("");
	const [selectedSection, setSelectedSection] = useState("");

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

	const handleGetSections = (id) => {
		getSections({ classId: id }).then((resp) => {
			const options = resp.data.data.rows.map((option) => ({
				value: option.section,
				label: option.section,
			}));
			setSectionOptions(options);
		});
	};

	useEffect(() => {
		console.log(sectionOptions);
	}, [sectionOptions]);

	return (
		<>
			<Accordion
				className="accordion accordion-with-icon"
				defaultActiveKey="0"
				alwaysOpen
			>
				<Accordion.Item className="accordion-item" eventKey="0">
					<Accordion.Header className="accordion-header rounded-lg">
						<span className="accordion-header-icon"></span>
						<span className="accordion-header-text">Admission Details</span>
						<span className="accordion-header-indicator indicator-bordered"></span>
					</Accordion.Header>
					<Accordion.Collapse eventKey="0">
						<div className="accordion-body">
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
										<div>
											<DatePicker
												selected={startDate}
												onChange={(date) => setStartDate(date)}
												className="form-control"
											/>
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

								{admissionRows.find(
									(row) => row.field === "Last Name" && row.status === "1"
								) && (
									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label" htmlFor="last_name">
												Last Name
											</label>
											<input
												placeholder="Enter Last Name"
												id="last_name"
												type="text"
												className="form-control"
												required
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
												setSelectedClass(selectedOption.value);
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
											}}
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
						</div>
					</Accordion.Collapse>
				</Accordion.Item>
			</Accordion>
		</>
	);
};
