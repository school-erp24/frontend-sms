import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import {
	getTransportList,
	createTransportSetting,
	updateTransportSetting,
	deleteTransport,
} from "../../../services/TransportService";
import PageTitle from "../../layouts/PageTitle";

const TransportSetting = () => {
	const [transportSettings, setTransportSettings] = useState([]);

	const [pickUp, setPickUp] = useState("");
	const [distance, setDistance] = useState("");
	const [amount, setAmount] = useState("");
	const [transportId, setTransportId] = useState("");

	const [selectedTransport, setSelectedTransport] = useState({});
	const [updateModal, setUpdateModal] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);

	const handleAddSection = (e) => {
		e.preventDefault();
		if (pickUp && distance && amount) {
			createTransportSetting({ pickUp, distance, amount }).then((res) => {
				console.log(res);
				getTransportData();
			});

			setPickUp("");
			setDistance("");
			setAmount("");
		}
	};

	const getTransportData = () => {
		getTransportList()
			.then((resp) => {
				const rowData = resp.data.data.rows;

				console.log(rowData);
				setTransportSettings(rowData);
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	};

	const handleUpdateTransport = () => {
		updateTransportSetting(selectedTransport)
			.then((resp) => {
				setSelectedTransport({});
				setUpdateModal(false);
				getTransportData();
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
				setUpdateModal(false);
			});
	};

	const deleteTransportData = () => {
		deleteTransport({ id: transportId })
			.then((resp) => {
				toast.success("Data deleted");
				setConfirmModal(false);
				setTransportId("");
				getTransportData();
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	};

	useEffect(() => {
		getTransportData();
	}, []);

	return (
		<>
			<PageTitle activeMenu={"Transport Setup"} motherMenu={"Settings"} />
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
													Pickpoint
												</label>
												<input
													placeholder=""
													type="text"
													className="form-control"
													required
													value={pickUp}
													onChange={(e) => setPickUp(e.target.value)}
												/>
											</div>
										</div>

										<div className="col-sm-3">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Distance
												</label>
												<input
													placeholder=""
													type="text"
													className="form-control"
													required
													value={distance}
													onChange={(e) => setDistance(e.target.value)}
												/>
											</div>
										</div>

										<div className="col-sm-3">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Monthly amount
												</label>
												<input
													placeholder=""
													type="text"
													className="form-control"
													required
													value={amount}
													onChange={(e) => setAmount(e.target.value)}
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
													<th>Transport Details</th>
													<th>Actions</th>
												</tr>
											</thead>
											<tbody className="cus_up">
												{transportSettings.map((transport, index) => (
													<tr key={transport.id}>
														<td>{index + 1}</td>
														<td>{transport.transport}</td>

														<td>
															<span
																className="btn btn-xs sharp btn-primary me-1"
																onClick={() => {
																	setSelectedTransport({
																		id: transport.id,
																		pickUp: transport.pickUp,
																		distance: transport.distance,
																		amount: transport.amount,
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
																	setTransportId(transport.id);
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
										<Modal.Title>Update Transport Details</Modal.Title>
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
															Pickup
														</label>
														<input
															placeholder=""
															type="text"
															className="form-control"
															required
															value={selectedTransport.pickUp}
															onChange={(e) =>
																setSelectedTransport({
																	...selectedTransport,
																	pickUp: e.target.value,
																})
															}
														/>
													</div>
												</div>

												<div className="col-sm-3">
													<div className="form-group">
														<label className="form-label" htmlFor="class_field">
															Distance
														</label>
														<input
															placeholder=""
															type="text"
															className="form-control"
															required
															value={selectedTransport.distance}
															onChange={(e) =>
																setSelectedTransport({
																	...selectedTransport,
																	distance: e.target.value,
																})
															}
														/>
													</div>
												</div>

												<div className="col-sm-3">
													<div className="form-group">
														<label className="form-label" htmlFor="class_field">
															Amount
														</label>
														<input
															placeholder=""
															type="text"
															className="form-control"
															required
															value={selectedTransport.amount}
															onChange={(e) =>
																setSelectedTransport({
																	...selectedTransport,
																	amount: e.target.value,
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
												setSelectedTransport({});
											}}
											variant="danger light"
										>
											Close
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												handleUpdateTransport();
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
										<p>Delete Transport Details?</p>
									</Modal.Body>
									<Modal.Footer>
										<Button
											onClick={() => {
												setConfirmModal(false);
												setTransportId("");
											}}
											variant="danger light"
										>
											No
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												deleteTransportData();
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

export default TransportSetting;
