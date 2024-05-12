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

	return (
		<>
			<PageTitle activeMenu={"Test Setup"} motherMenu={"Settings"} />
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
													Roll no. sequence
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
										<div className="col-sm-4">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Admission no. sequence
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
									</div>
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
