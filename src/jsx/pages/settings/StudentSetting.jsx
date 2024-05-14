import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

import {
	createStudentType,
	getStudentType,
	updateStudentType,
} from "../../../services/StudentService";
import PageTitle from "../../layouts/PageTitle";

const StudentSetting = () => {
	const [studentTypeSettings, setStudentTypeSettings] = useState([]);

	const [studentType, setStudentType] = useState("");
	const [selectedStudentType, setSelectedStudentType] = useState({});
	const [updateModal, setUpdateModal] = useState(false);

	const handleAddSection = (e) => {
		e.preventDefault();
		if (studentType) {
			createStudentType({ studentType }).then((res) => {
				console.log(res);
				getStudentTypeData();
			});

			setStudentType("");
		}
	};

	const getStudentTypeData = () => {
		getStudentType()
			.then((resp) => {
				const rowData = resp.data.data.rows;

				console.log(rowData);
				setStudentTypeSettings(rowData);
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	};

	const handleUpdateStudentType = () => {
		updateStudentType(selectedStudentType)
			.then((resp) => {
				setSelectedStudentType({});
				setUpdateModal(false);
				getStudentTypeData();
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
				setUpdateModal(false);
			});
	};

	useEffect(() => {
		getStudentTypeData();
	}, []);

	return (
		<>
			<PageTitle activeMenu={"Student Setup"} motherMenu={"Settings"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<form action="#" method="post" id="addStaffForm">
									<div className="row">
										<div className="col-sm-4">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Student Type
												</label>
												<input
													placeholder=""
													id="class_field"
													type="text"
													className="form-control"
													required
													value={studentType}
													onChange={(e) => setStudentType(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</form>

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
									Add
								</Link>

								<div className="row" style={{ margin: "0" }}>
									<div
										className="d-flex justify-content-center flex-nowrap"
										style={{
											maxHeight: "300px",
											overflowY: "auto",
										}}
									>
										<table className="display dataTable no-footer w-100">
											<thead className="cus_stickythead">
												<tr>
													<th>Sno.</th>
													<th>Sections</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody className="cus_up">
												{studentTypeSettings.map((student, index) => (
													<tr key={student.id}>
														<td>{index + 1}</td>
														<td>{student.studentType}</td>

														<td>
															<span
																className="btn btn-xs sharp btn-primary me-1"
																onClick={() => {
																	setSelectedStudentType({
																		id: student.id,
																		studentType: student.studentType,
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

								<Modal
									className="fade"
									show={updateModal}
									onHide={setUpdateModal}
									centered
									size="lg"
								>
									<Modal.Header>
										<Modal.Title>Update Student Type</Modal.Title>
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
												<div className="col-sm-5">
													<div className="form-group">
														<label className="form-label" htmlFor="class_field">
															Student Type
														</label>
														<input
															placeholder=""
															type="text"
															className="form-control"
															required
															value={selectedStudentType.studentType}
															onChange={(e) =>
																setSelectedStudentType({
																	...selectedStudentType,
																	studentType: e.target.value,
																})
															}
														/>
													</div>
												</div>
											</div>
										</div>
									</Modal.Body>
									<Modal.Footer>
										<Button
											onClick={() => {
												setUpdateModal(false);
												setSelectedStudentType({});
											}}
											variant="danger light"
										>
											Close
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												handleUpdateStudentType();
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

export default StudentSetting;
