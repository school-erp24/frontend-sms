import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	getAdmissionSetting,
	postAdmissionSetting,
} from "../../../services/SettingsService";
import { toast } from "react-toastify";
import { Accordion } from "react-bootstrap";

const AdmissionSetting = () => {
	const navigate = useNavigate();

	const [admissionDetailsFields, setAdmissionDetailsFields] = useState({
		list: [],
	});
	const [familyDetailsFields, setFamilyDetailsFields] = useState({
		list: [],
	});
	const [studentDetailsFields, setStudentDetailsFields] = useState({
		list: [],
	});
	const [uploadDocuments, setUploadDocuments] = useState({
		list: [],
	});

	useEffect(() => {
		getAdmissionSetting()
			.then((resp) => {
				console.log(resp.data.data.rows);

				setAdmissionDetailsFields(resp.data.data.rows[0]);
				setStudentDetailsFields(resp.data.data.rows[1]);
				setFamilyDetailsFields(resp.data.data.rows[2]);
				setUploadDocuments(resp.data.data.rows[3]);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	// const handleCheckboxChange = (index, rows, setRows) => {
	// 	const updatedRows = [...rows];
	// 	updatedRows[index].status = updatedRows[index].status === 1 ? 0 : 1;
	// 	setRows(updatedRows);
	// };

	const handleCheckboxChange = (index, object, setObject) => {
		const updatedObject = { ...object };
		const updatedList = [...updatedObject.list];
		updatedList[index] = {
			...updatedList[index],
			status: updatedList[index].status === "1" ? "0" : "1",
		};
		updatedObject.list = updatedList;
		setObject(updatedObject);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postAdmissionSetting({
			list: [
				admissionDetailsFields,
				studentDetailsFields,
				familyDetailsFields,
				uploadDocuments,
			],
		})
			.then((resp) => {
				if (resp.status === 200) {
					toast.success("Sucessfully Updated");
				}
			})
			.catch((error) => {
				console.error("Error submitting", error);
				toast.error("Update failed");
			});
	};

	useEffect(() => {
		console.log({
			list: [
				admissionDetailsFields,
				studentDetailsFields,
				familyDetailsFields,
				uploadDocuments,
			],
		});
	}, [
		admissionDetailsFields,
		studentDetailsFields,
		familyDetailsFields,
		uploadDocuments,
	]);

	return (
		<>
			<PageTitle activeMenu={"Admission Setup"} motherMenu={"Settings"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<form
									action="#"
									method="post"
									id="addStaffForm"
									onSubmit={handleSubmit}
								>
									{/* Admission Details */}
									<Accordion
										className="accordion accordion-with-icon"
										defaultActiveKey="0"
										alwaysOpen
									>
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Admission Details
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{admissionDetailsFields?.list.map((row, index) => (
															<div className="col-sm-4" key={index}>
																<div className="form-group">
																	<label
																		className="form-label"
																		htmlFor="class_field"
																	>
																		{row.field}
																	</label>
																	<div className="input-group mb-3">
																		<div className="input-group-text">
																			<input
																				type="checkbox"
																				className="checkbox"
																				checked={row.status === "1"}
																				disabled={row.default === "true"}
																				onChange={() =>
																					handleCheckboxChange(
																						index,
																						admissionDetailsFields,
																						setAdmissionDetailsFields
																					)
																				}
																			/>
																		</div>
																		<input
																			type="text"
																			className="form-control"
																			readOnly
																		/>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</Accordion.Collapse>
										</Accordion.Item>
									</Accordion>

									{/* Student Details */}
									<Accordion className="accordion accordion-with-icon">
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Student Details
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{studentDetailsFields?.list.map((row, index) => (
															<div className="col-sm-4" key={index}>
																<div className="form-group">
																	<label
																		className="form-label"
																		htmlFor="class_field"
																	>
																		{row.field}
																	</label>
																	<div className="input-group mb-3">
																		<div className="input-group-text">
																			<input
																				type="checkbox"
																				className="checkbox"
																				checked={row.status === "1"}
																				disabled={row.default === "true"}
																				onChange={() =>
																					handleCheckboxChange(
																						index,
																						studentDetailsFields,
																						setStudentDetailsFields
																					)
																				}
																			/>
																		</div>
																		<input
																			type="text"
																			className="form-control"
																			readOnly
																		/>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</Accordion.Collapse>
										</Accordion.Item>
									</Accordion>

									{/* Family Details */}
									<Accordion className="accordion accordion-with-icon">
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Family Details
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{familyDetailsFields?.list.map((row, index) => (
															<div className="col-sm-4" key={index}>
																<div className="form-group">
																	<label
																		className="form-label"
																		htmlFor="class_field"
																	>
																		{row.field}
																	</label>
																	<div className="input-group mb-3">
																		<div className="input-group-text">
																			<input
																				type="checkbox"
																				className="checkbox"
																				checked={row.status === "1"}
																				disabled={row.default === "true"}
																				onChange={() =>
																					handleCheckboxChange(
																						index,
																						familyDetailsFields,
																						setFamilyDetailsFields
																					)
																				}
																			/>
																		</div>
																		<input
																			type="text"
																			className="form-control"
																			readOnly
																		/>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</Accordion.Collapse>
										</Accordion.Item>
									</Accordion>

									{/* Upload Documents */}
									<Accordion className="accordion accordion-with-icon">
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Upload Documents
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{uploadDocuments?.list.map((row, index) => (
															<div className="col-sm-4" key={index}>
																<div className="form-group">
																	<label
																		className="form-label"
																		htmlFor="class_field"
																	>
																		{row.field}
																	</label>
																	<div className="input-group mb-3">
																		<div className="input-group-text">
																			<input
																				type="checkbox"
																				className="checkbox"
																				checked={row.status === "1"}
																				disabled={row.default === "true"}
																				onChange={() =>
																					handleCheckboxChange(
																						index,
																						uploadDocuments,
																						setUploadDocuments
																					)
																				}
																			/>
																		</div>
																		<input
																			type="text"
																			className="form-control"
																			readOnly
																		/>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</Accordion.Collapse>
										</Accordion.Item>
									</Accordion>

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

export default AdmissionSetting;
