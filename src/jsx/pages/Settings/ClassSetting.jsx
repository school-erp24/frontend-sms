import React, { useEffect, useState } from "react";

import PageTitle from "../../layouts/PageTitle";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { components } from "../../components/SelectStyles";

const ClassSetting = () => {
	// const [sections, setSections] = useState([
	// 	{
	// 		id: 1,
	// 		class: "2nd",
	// 		section: ["A", "B", "C"],
	// 	},
	// 	{
	// 		id: 2,
	// 		class: "3rd",
	// 		section: ["A", "B", "C"],
	// 	},
	// 	{
	// 		id: 3,
	// 		class: "4th",
	// 		section: ["A", "B", "C"],
	// 	},
	// ]);

	const [sections, setSections] = useState([{ id: 1, class: "", section: [] }]);
	const [idCounter, setIdCounter] = useState(2);

	const handleAddSection = () => {
		setSections([{ id: idCounter, class: "", section: [] }, ...sections]);
		setIdCounter(idCounter + 1); // Increment the id counter
	};

	const handleClassChange = (id, field, value) => {
		setSections(
			sections.map((section) =>
				section.id === id ? { ...section, [field]: value } : section
			)
		);
	};

	const handleSectionChange = (id, newValue) => {
		setSections(
			sections.map((section) =>
				section.id === id
					? { ...section, section: [...section.section, ...newValue] }
					: section
			)
		);
	};

	const handleKeyDown = (event, id) => {
		if (!inputValue) return;
		switch (event.key) {
			case "Enter":
			case "Tab":
				setValue((prev) => [...prev, createOption(inputValue)]);
				console.log(inputValue, id);
				handleSectionChange(id, inputValue);
				setInputValue("");
				event.preventDefault();
		}
	};

	const createOption = (label) => ({
		label,
		value: label,
	});

	const [inputValue, setInputValue] = useState("");
	const [value, setValue] = useState([]); // most important

	useEffect(() => {
		console.log(sections);
	}, [sections]);

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
									{sections.map((section) => (
										<div className="col-md-6" key={section.id}>
											<div className="row">
												<div className="col">
													<div className="form-group">
														<label
															className="form-label"
															htmlFor={`class_${section.id}`}
														>
															Class
														</label>
														<input
															placeholder=""
															id={`class_${section.id}`}
															type="text"
															className="form-control"
															required
															value={section.class}
															onChange={(e) =>
																handleClassChange(
																	section.id,
																	"class",
																	e.target.value
																)
															}
														/>
													</div>
												</div>
												<div className="col">
													<div className="form-group">
														<label
															className="form-label"
															htmlFor={`section_${section.id}`}
														>
															Section
														</label>
														{/* <input
															placeholder=""
															id={`section_${section.id}`}
															type="text"
															className="form-control"
															required
															value={section.section}
															onChange={(e) =>
																handleChange(
																	section.id,
																	"section",
																	e.target.value
																)
															}
														/> */}

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
																// handleSectionChange(section.id, newValue);
															}}
															onKeyDown={(e) => handleKeyDown(e, section.id)}
															placeholder="Type something and press enter..."
															value={value}
														/>
													</div>
												</div>
											</div>
										</div>
									))}

									<button type="submit" className="btn btn-primary me-1">
										Submit
									</button>
									<button
										type="submit"
										className="btn"
										style={{ border: "1px solid #888888" }}
									>
										Cancel
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClassSetting;
