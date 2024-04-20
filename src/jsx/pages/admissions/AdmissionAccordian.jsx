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
];

export const AdmissionAccordian = () => {
	return (
		<>
			<Accordion
				className="accordion accordion-with-icon"
				defaultActiveKey="0"
				alwaysOpen
			>
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
