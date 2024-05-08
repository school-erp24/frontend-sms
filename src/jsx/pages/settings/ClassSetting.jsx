import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Modal, Button } from "react-bootstrap";

import { components } from "../../components/SelectStyles";
import {
	createClasses,
	updateClasses,
} from "../../../services/SettingsService";
import { getClass } from "../../../services/CommonService";
import PageTitle from "../../layouts/PageTitle";

const ClassSetting = () => {
	const [classSettings, setClassSettings] = useState([
		// { tid: 1, class: "", sections: [] },
	]);
	const [idCounter, setIdCounter] = useState(1);

	const [cls, setCls] = useState("");
	const [selectedClass, setSelectedClass] = useState({});
	const [updateModal, setUpdateModal] = useState(false);

	const [inputValue, setInputValue] = useState("");
	const [value, setValue] = useState([]);

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
		setIdCounter(idCounter + 1);

		createClasses({ data: updatedClassSettings }).then((res) => {
			console.log(res);
			getClassData();
		});

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
		console.log(selectedClass);
	}, [selectedClass]);

	const getClassData = () => {
		getClass()
			.then((resp) => {
				const updatedData = resp.data.data.rows.map((classObj, index) => {
					const sectionsArray = classObj.sectionList.map(
						(section) => section.section
					);

					return {
						...classObj,
						sections: sectionsArray,
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
	};

	useEffect(() => {
		getClassData();
	}, []);

	const handleCheckboxChange = (sectionId, sectionName) => {
		setSelectedClass((prevState) => {
			const updatedSectionList = prevState.sectionList.map((section) => {
				if (section.id === sectionId) {
					const updatedStatus = section.status === 1 ? 0 : 1;
					return { ...section, status: updatedStatus };
				}
				return section;
			});

			return { ...prevState, sectionList: updatedSectionList };
		});
	};

	const handleSectionNameChange = (sectionId, newSectionName) => {
		setSelectedClass((prevState) => {
			const updatedSectionList = prevState.sectionList.map((section) => {
				if (section.id === sectionId) {
					return { ...section, section: newSectionName };
				}
				return section;
			});

			return { ...prevState, sectionList: updatedSectionList };
		});
	};

	const handleUpdateClass = () => {
		updateClasses(selectedClass)
			.then((resp) => {
				console.log(resp.status);
				setSelectedClass({});
				setUpdateModal(false);
				getClassData();
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
				setUpdateModal(false);
				// alert(error.message);
			});
	};

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
										<div className="col-sm-4">
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
										<div className="col-sm-8">
											<div className="form-group">
												<label className="form-label" htmlFor="section_field">
													Sections
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

								<div className="row" style={{ margin: "0" }}>
									<div className="col-md-8 offset-md-2">
										<table className="table table-bordered">
											<thead>
												<tr>
													<th>Class</th>
													<th>Sections</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody>
												{classSettings.map((section, index) => (
													<tr key={section.id}>
														<td>{section.class}</td>
														<td>{section.sections.join(", ")}</td>

														<td>
															<span
																className="btn btn-xs sharp btn-primary me-1"
																onClick={() => {
																	setSelectedClass({
																		id: section.id,
																		class: section.class,
																		sectionList: section.sectionList,
																		status: section.status,
																	});
																	setUpdateModal(true);
																}}
															>
																<i className="fa fa-pencil" />
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>

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
									show={updateModal}
									onHide={setUpdateModal}
									centered
									size="lg"
								>
									<Modal.Header>
										<Modal.Title>Update Class</Modal.Title>
										<Button
											variant=""
											className="btn-close"
											onClick={() => setUpdateModal(false)}
										></Button>
									</Modal.Header>
									<Modal.Body>
										<div
											className="container"
											style={{
												maxHeight: "400px",
												overflow: "scroll",
												scrollbarWidth: "auto",
											}}
										>
											<div className="row ">
												<div className="col-sm-3">
													<div className="form-group">
														<label className="form-label" htmlFor="class_field">
															Class
														</label>
														<input
															placeholder=""
															type="text"
															className="form-control"
															required
															defaultValue={
																selectedClass ? selectedClass.class : ""
															}
														/>
													</div>
												</div>
											</div>

											<div className="row">
												{selectedClass &&
													selectedClass.sectionList &&
													selectedClass.sectionList.map((section) => (
														<div className="col-sm-3" key={section.id}>
															<div className="form-group">
																<label
																	className="form-label"
																	htmlFor="class_field"
																>
																	Section
																</label>
																<div className="input-group mb-3">
																	<div className="input-group-text">
																		<input
																			type="checkbox"
																			checked={section.status === 1}
																			onChange={() =>
																				handleCheckboxChange(
																					section.id,
																					section.section
																				)
																			}
																		/>
																	</div>
																	<input
																		type="text"
																		className="form-control"
																		defaultValue={section.section}
																		onChange={(e) =>
																			handleSectionNameChange(
																				section.id,
																				e.target.value
																			)
																		}
																	/>
																</div>
															</div>
														</div>
													))}
											</div>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button
											onClick={() => {
												setUpdateModal(false);
												setSelectedClass({});
											}}
											variant="danger light"
										>
											Close
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												handleUpdateClass();
											}}
										>
											Submit
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
