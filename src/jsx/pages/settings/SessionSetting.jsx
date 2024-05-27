import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import {
	getSessionList,
	createSession,
	updateSession,
	deleteSession,
} from "../../../services/SettingsService";
import PageTitle from "../../layouts/PageTitle";

const SessionSetting = () => {
	const [sessionSettings, setSessionSettings] = useState([]);

	const [session, setSession] = useState("");
	const [sessionId, setSessionId] = useState("");

	const [selectedSession, setSelectedSession] = useState({});
	console.log(selectedSession);
	const [updateModal, setUpdateModal] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);

	const handleAddSection = (e) => {
		e.preventDefault();
		if (session) {
			createSession({ session }).then((res) => {
				console.log(res);
				getSessionData();
			});

			setSession("");
		}
	};

	const getSessionData = () => {
		getSessionList()
			.then((resp) => {
				const rowData = resp.data.data;

				console.log(rowData);
				setSessionSettings(rowData);
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	};

	const handleUpdateSession = () => {
		updateSession(selectedSession)
			.then((resp) => {
				setSelectedSession({});
				setUpdateModal(false);
				getSessionData();
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
				setUpdateModal(false);
			});
	};

	const deleteSessionData = () => {
		deleteSession({ id: sessionId })
			.then((resp) => {
				toast.success("Data deleted");
				setConfirmModal(false);
				setSessionId("");
				getSessionData();
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	};

	useEffect(() => {
		getSessionData();
	}, []);

	return (
		<>
			<PageTitle activeMenu={"Session Setup"} motherMenu={"Settings"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<form action="#" method="post" id="addStaffForm">
									<div className="row">
										<div className="col-sm-6">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Session
												</label>
												<input
													placeholder=""
													type="text"
													className="form-control"
													required
													value={session}
													onChange={(e) => setSession(e.target.value)}
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
													<th>Session</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody className="cus_up">
												{sessionSettings.map((session, index) => (
													<tr key={session.id}>
														<td>{index + 1}</td>
														<td>{session.session}</td>

														<td>
															<span
																className="btn btn-xs sharp btn-primary me-1"
																onClick={() => {
																	setSelectedSession({
																		id: session.id,
																		session: session.session,
																	});
																	setUpdateModal(true);
																}}
															>
																<i className="fa fa-pencil" />
															</span>

															<span
																className="btn btn-xs sharp btn-danger me-1"
																style={{
																	backgroundColor: "white",
																	color: "#ff1616",
																}}
																onClick={() => {
																	setSessionId(session.id);
																	setConfirmModal(true);
																}}
															>
																<i className="fa-regular fa-trash-can"></i>
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
												<div className="col-sm-6">
													<div className="form-group">
														<label className="form-label" htmlFor="class_field">
															Session
														</label>
														<input
															placeholder=""
															type="text"
															className="form-control"
															required
															value={selectedSession.session}
															onChange={(e) =>
																setSelectedSession({
																	...selectedSession,
																	session: e.target.value,
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
												setSelectedSession({});
											}}
											variant="danger light"
										>
											Close
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												handleUpdateSession();
											}}
										>
											Submit
										</Button>
									</Modal.Footer>
								</Modal>

								<Modal
									className="fade"
									show={confirmModal}
									onHide={setConfirmModal}
									centered
									size="md"
								>
									<Modal.Header>
										<Modal.Title>Confirm</Modal.Title>
										<Button
											variant=""
											className="btn-close"
											onClick={() => setConfirmModal(false)}
										></Button>
									</Modal.Header>
									<Modal.Body>
										<p>Delete Session Details?</p>
									</Modal.Body>
									<Modal.Footer>
										<Button
											onClick={() => {
												setConfirmModal(false);
												setSessionId("");
											}}
											variant="danger light"
										>
											No
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												deleteSessionData();
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

export default SessionSetting;
