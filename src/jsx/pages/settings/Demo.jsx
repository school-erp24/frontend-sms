import React, { useEffect, useState } from "react";

import PageTitle from "../../layouts/PageTitle";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { createClasses } from "../../../services/SettingsService";
import { getClass } from "../../../services/CommonService";

const ClassSetting = () => {
	const navigate = useNavigate();
	const [sections, setSections] = useState([
		// {
		// 	id: 2,
		// 	class: "2nd",
		// 	Sections: ["B", "C", "D"],
		// },
		// {
		// 	id: 1,
		// 	class: "1st",
		// 	Sections: ["A", "B"],
		// },
	]);
	const [idCounter, setIdCounter] = useState(1);

	const handleAddSection = () => {
		setSections([{ tid: idCounter, class: "", sections: [] }, ...sections]);
		setIdCounter(idCounter + 1);
	};

	const handleChange = (tid, field, value) => {
		setSections(
			sections.map((section) =>
				section.tid === tid ? { ...section, [field]: value } : section
			)
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const sectionsWithSectionList = sections.map((section) => ({
			...section,
			sectionList: section.sections.map((sectionName) => ({
				section: sectionName,
			})),
		}));

		createClasses({ data: sectionsWithSectionList }).then((res) => {
			console.log(res);
		});
	};

	useEffect(() => {
		console.log({ data: sections });
	}, [sections]);

	useEffect(() => {
		getClass()
			.then((resp) => {
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
				setSections(updatedData);
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
								<form
									action="#"
									method="post"
									id="addStaffForm"
									onSubmit={handleSubmit}
								>
									{sections.map((section, index) => (
										<div className="col-md-6" key={index}>
											<div className="row">
												<div className="col">
													<div className="form-group">
														<label
															className="form-label"
															htmlFor={`class_${section.tid}`}
														>
															Class
														</label>
														<input
															placeholder=""
															id={`class_${section.tid}`}
															type="text"
															className="form-control"
															value={section.class}
															onChange={(e) =>
																handleChange(
																	section.tid,
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
															htmlFor={`section_${section.tid}`}
														>
															Section
														</label>
														<input
															placeholder=""
															id={`section_${section.tid}`}
															type="text"
															className="form-control"
															required
															value={section.sections.join(",")} // Ensure correct value assignment
															onChange={(e) =>
																handleChange(
																	section.tid,
																	"sections",
																	e.target.value.split(",")
																)
															}
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
										className="btn"
										style={{ border: "1px solid #888888" }}
										onClick={() => navigate("/dashboard")}
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
