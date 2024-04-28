import React, { useEffect, useState } from "react";

import PageTitle from "../../layouts/PageTitle";
import { useNavigate, Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Modal, Button } from "react-bootstrap";

import { components } from "../../components/SelectStyles";
import { createClasses } from "../../../services/SettingsService";
import { getClass } from "../../../services/CommonService";

const ClassSetting = () => {
	const [classSettings, setClassSettings] = useState([
		{ tid: 1, class: "", sections: [] },
	]);
	const [idCounter, setIdCounter] = useState(1);

	const [cls, setCls] = useState("");
	const [enquiryModal, setEnquiryModal] = useState(false);

	const [inputValue, setInputValue] = useState("");
	const [value, setValue] = useState([]);

	// const handleAddSection = () => {
	// 	// Add a new section with default values to the classSettings array
	// 	const newSection = {
	// 		tid: idCounter,
	// 		class: cls,
	// 		sectionList: value.map((option) => ({ section: option.value })),
	// 	};
	// 	setClassSettings((prevSettings) => [...prevSettings, newSection]);
	// 	setIdCounter(idCounter + 1); // Increment the id counter

	// 	// Clear the input field value and selected options
	// 	setInputValue("");
	// 	setValue([]);
	// 	setCls("");
	// };

	const handleAddSection = (e) => {
		e.preventDefault();

		// Add a new section with default values to the classSettings array
		const newSection = {
			tid: idCounter,
			class: cls,
			sectionList: value.map((option) => ({ section: option.value })),
			sections: value.map((option) => option.value),
		};
		const updatedClassSettings = [...classSettings, newSection];
		setClassSettings(updatedClassSettings);
		setIdCounter(idCounter + 1); // Increment the id counter

		createClasses({ data: updatedClassSettings }).then((res) => {
			console.log(res);
		});

		// Clear the input field value and selected options
		setInputValue("");
		setValue([]);
		setCls("");
	};

	const handleKeyDown = (event) => {
		if (!inputValue) return;
		switch (event.key) {
			case "Enter":
			case "Tab":
				setValue((prev) => [...prev, createOption(inputValue)]);
				setInputValue("");
				event.preventDefault();
		}
	};

	const createOption = (label) => ({
		label,
		value: label,
	});

	useEffect(() => {
		console.log(classSettings);
	}, [classSettings]);

	useEffect(() => {
		console.log(cls, value, inputValue);
	}, [cls, value]);

	useEffect(() => {
		getClass()
			.then((resp) => {
				console.log(resp);

				const updatedData = resp.data.data.rows.map((classObj, index) => {
					// Extract section names from sectionList array
					const sectionsArray = classObj.sectionList.map(
						(section) => section.section
					);

					// Return the updated class object with sections as an array
					return {
						...classObj,
						sections: sectionsArray, // Assign the sections as an array
						tid: index + 1,
					};
				});

				console.log(updatedData);
				setClassSettings(updatedData);
				setIdCounter(updatedData.length + 1);
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	}, []);

	return (
		<>
			<PageTitle activeMenu={"Class Setup"} motherMenu={"Settings"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<Link
									onClick={handleAddSection}
									className="btn btn-primary"
									style={{
										width: "max-content",
										height: "max-content",
										marginLeft: "15px",
										marginBottom: "1rem",
										border: "transparent",
									}}
								>
									+ Add
								</Link>
								<form action="#" method="post" id="addStaffForm">
									<div className="row">
										<div className="col">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Class
												</label>
												<input
													placeholder=""
													id="class_field"
													type="text"
													className="form-control"
													required
													value={cls}
													onChange={(e) => setCls(e.target.value)}
												/>
											</div>
										</div>
										<div className="col">
											<div className="form-group">
												<label className="form-label" htmlFor="section_field">
													Section
												</label>
												<CreatableSelect
													className="custom-react-select"
													components={components}
													inputValue={inputValue}
													isClearable
													isMulti
													menuIsOpen={false}
													onChange={(newValue) => {
														setValue(newValue);
													}}
													onInputChange={(newValue) => {
														setInputValue(newValue);
													}}
													onKeyDown={(e) => handleKeyDown(e)}
													value={value}
													placeholder=""
												/>
											</div>
										</div>
									</div>
								</form>

								<table className="display dataTable no-footer w-50 ">
									<thead>
										<tr>
											<th>Class</th>
											<th>Sections</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{/* Render each section in the table */}
										{classSettings.map((section, index) => (
											<tr key={section.id}>
												<td>{section.class}</td>
												<td>{section.sections.join(", ")}</td>

												<td>
													<span
														className="btn btn-xs sharp btn-primary me-1"
														onClick={() => {
															// navigate("/update-enquiry", {
															// 	state: {
															// 		id: data.id,
															// 		class: data.class,
															// 	},
															// });
															setEnquiryModal(true);
														}}
													>
														<i className="fa fa-pencil" />
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>

								{/* <button type="submit" className="btn btn-primary me-1">
										Submit
									</button>
									<button
										type="submit"
										className="btn"
										style={{ border: "1px solid #888888" }}
									>
										Cancel
									</button> */}

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
												// handleSubmit("no");
											}}
											variant="danger light"
										>
											No
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												// handleSubmit("yes");
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
			</div>
		</>
	);
};

export default ClassSetting;
