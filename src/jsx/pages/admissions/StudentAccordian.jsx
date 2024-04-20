import React, { useState } from "react";
import Select from "react-select";
import { DatePicker } from "rsuite";
import { Accordion } from "react-bootstrap";

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

const Accordian = [
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
];

export const StudentAccordian = () => {
	return (
		<>
			<Accordion className="accordion accordion-with-icon">
				{Accordian.map((d, i) => (
					<Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
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
			</Accordion>
		</>
	);
};
