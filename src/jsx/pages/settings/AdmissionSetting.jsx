import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
	getAdmissionSetting,
	postAdmissionSetting,
} from "../../../services/SettingsService";
import { toast } from "react-toastify";
import { Accordion } from "react-bootstrap";

const AdmissionSetting = () => {
	const navigate = useNavigate();
	const [admissionRows, setAdmissionRows] = useState([]);
	const [studentDetails, setStudentDetails] = useState([]);
	const [previousDetails, setPreviousDetails] = useState([]);
	const [govtDetails, setGovtDetails] = useState([]);
	const [bankDetails, setBankDetails] = useState([]);
	const [familyDetails, setFamilyDetails] = useState([]);

	useEffect(() => {
		getAdmissionSetting()
			.then((resp) => {
				console.log(resp.data.data);

				setAdmissionRows(resp.data.data.rows[0].list);
				setStudentDetails(resp.data.data.rows[1].list);
				setPreviousDetails(resp.data.data.rows[2].list);
				setGovtDetails(resp.data.data.rows[3].list);
				setBankDetails(resp.data.data.rows[4].list);
				setFamilyDetails(resp.data.data.rows[5].list);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	const handleCheckboxChange = (index, rows, setRows) => {
		const updatedRows = [...rows];
		updatedRows[index].status = updatedRows[index].status === "1" ? "0" : "1";
		setRows(updatedRows);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postAdmissionSetting({
			list: [
				{
					id: 3,
					tableName: "Admission",
					list: admissionRows,
				},
				{
					id: 4,
					tableName: "Student Details",
					list: studentDetails,
				},
				{
					id: 5,
					tableName: "Previous Qualifications Details:",
					list: previousDetails,
				},
				{
					id: 6,
					tableName: "Govt Portal ID",
					list: govtDetails,
				},
				{
					id: 7,
					tableName: "Bank Account Details",
					list: bankDetails,
				},
				{
					id: 8,
					tableName: "Family Details",
					list: familyDetails,
				},
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
														{admissionRows.map((row, index) => (
															<div className="col-sm-4">
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
																						admissionRows,
																						setAdmissionRows
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
									<Accordion
										className="accordion accordion-with-icon"
										defaultActiveKey="0"
										alwaysOpen
									>
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
														{studentDetails.map((row, index) => (
															<div className="col-sm-4">
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
																						studentDetails,
																						setStudentDetails
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

									{/* Previous Qualifications Details */}
									<Accordion
										className="accordion accordion-with-icon"
										defaultActiveKey="0"
										alwaysOpen
									>
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Previous Qualifications Details
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{previousDetails.map((row, index) => (
															<div className="col-sm-4">
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
																						previousDetails,
																						setPreviousDetails
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

									{/* Government Portal ID */}
									<Accordion
										className="accordion accordion-with-icon"
										defaultActiveKey="0"
										alwaysOpen
									>
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Government Portal ID
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{govtDetails.map((row, index) => (
															<div className="col-sm-4">
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
																						govtDetails,
																						setGovtDetails
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

									{/* Bank Account Details*/}
									<Accordion
										className="accordion accordion-with-icon"
										defaultActiveKey="0"
										alwaysOpen
									>
										<Accordion.Item className="accordion-item" eventKey="0">
											<Accordion.Header className="accordion-header rounded-lg">
												<span className="accordion-header-icon"></span>
												<span className="accordion-header-text">
													Bank Account Details
												</span>
												<span className="accordion-header-indicator indicator-bordered"></span>
											</Accordion.Header>
											<Accordion.Collapse eventKey="0">
												<div className="accordion-body">
													<div className="row">
														{bankDetails.map((row, index) => (
															<div className="col-sm-4">
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
																						bankDetails,
																						setBankDetails
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

									{/* Family Details*/}
									<Accordion
										className="accordion accordion-with-icon"
										defaultActiveKey="0"
										alwaysOpen
									>
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
														{familyDetails.map((row, index) => (
															<div className="col-sm-4">
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
																						familyDetails,
																						setFamilyDetails
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
