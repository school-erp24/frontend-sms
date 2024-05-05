import React, { useState, useEffect } from "react";
import { Row, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";

import Pagination from "../../components/Pagination";
import { getAdmissionList } from "../../../services/StudentService";

const theadData = [
	{ heading: "Admission Date", sortingValue: "admissionDate", sortable: true },
	{ heading: "Student Name", sortingValue: "firstName", sortable: true },
	{ heading: "Class", sortingValue: "class", sortable: true }, // get this sorted out
	{ heading: "Section", sortingValue: "section", sortable: true }, // this too
	{ heading: "Father's Name", sortingValue: "fatherName", sortable: true },
	{ heading: "Contact no", sortingValue: "contactNo", sortable: true },
	{ heading: "Fees Status", sortingValue: "feeStatus", sortable: true }, // this too
	{ heading: "Actions", sortingValue: "", sortable: false },
];

const AdmissionList = () => {
	const navigate = useNavigate();

	const [rows, setRows] = useState(10);

	const [totalRecords, setTotalRecords] = useState();

	const [currentPage, setCurrentPage] = useState();

	const [pageno, setPageNo] = useState(1);

	const [basicModal, setBasicModal] = useState(false);

	const [filterCriteria, setFilterCriteria] = useState(null);

	const [startDate, setStartDate] = useState(null);

	const [endDate, setEndDate] = useState(null);

	const [search, setSearch] = useState("");

	const [unchecked, setUnChecked] = useState(true);

	const [selectedIds, setSelectedIds] = useState([]);

	const [tableData, setTableData] = useState([]);

	const [iconData, setIconDate] = useState({ complete: false, ind: Number });

	const SortData = (name) => {
		const sortedPeople = [...tableData];
		switch (name) {
			case "sno":
				sortedPeople.sort((a, b) => {
					return a.id - b.id;
				});
				break;
			case "admissionDate":
			case "firstName":
			case "class":
			case "section":
			case "fatherName":
			case "contactNo":
			case "feeStatus":
				sortedPeople.sort((a, b) => {
					return iconData.complete
						? a[name].localeCompare(b[name])
						: b[name].localeCompare(a[name]);
				});
				break;

			default:
				break;
		}
		setTableData(sortedPeople);
	};

	const Search = (e) => {
		setSearch(e.target.value);

		getAdmissionList({
			limit: rows,
			pno: 1,
			searchString: e.target.value,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
				setFilterCriteria((prevCriteria) => ({
					...prevCriteria,
					searchQuery: e.target.value,
				}));
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	};

	const handleChecked = (id) => {
		let tempFeeData = tableData.map((data) => {
			if (id === data.id) {
				return { ...data, inputchecked: !data.inputchecked };
			}
			return data;
		});

		setTableData(tempFeeData);
	};

	const handleCheckedAll = (value) => {
		const updatedFeeData = tableData.map((item) => ({
			...item,
			inputchecked: value,
		}));
		setTableData(updatedFeeData);
		setUnChecked(!unchecked);
	};

	const handlePageChange = (page, rows) => {
		setPageNo(page);
		// setUnChecked(true);
		if (unchecked === false) {
			setUnChecked(true);
			handleCheckedAll(false);
		}

		getAdmissionList({
			limit: rows,
			pno: page,
			searchString: search,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	};

	const handleReset = () => {
		getAdmissionList({
			limit: rows,
			pno: pageno,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				setStartDate(null);
				setEndDate(null);
				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
				setFilterCriteria((prevCriteria) => null);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	};

	const handleDateFilter = (start, end) => {
		getAdmissionList({
			limit: rows,
			pno: 1,
			fromDate: start,
			toDate: end,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
				setFilterCriteria((prevCriteria) => ({
					...prevCriteria,
					start,
					end,
				}));
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	};

	// const handleDelete = (ids) => {
	// 	deleteEnquiry(ids)
	// 		.then((resp) => {
	// 			if (resp.status === 200) {
	// 				getAdmissionList({
	// 					limit: rows,
	// 					pno: 1,
	// 				})
	// 					.then((resp) => {
	// 						const updatedRows = resp.data.data.rows.map((row) => {
	// 							return { ...row, inputchecked: false };
	// 						});

	// 						setTotalRecords(resp.data.data.totalRecords);
	// 						setTableData(updatedRows);
	// 						setCurrentPage(resp.data.data.currentPno);
	// 					})
	// 					.catch((error) => {
	// 						console.error("Error fetching enquiries:", error);
	// 					});
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error fetching enquiries:", error);
	// 		});
	// 	setBasicModal(false);
	// };

	useEffect(() => {
		if (startDate && endDate !== null) {
			handleDateFilter(startDate, endDate);
		}
	}, [startDate, endDate]);

	useEffect(() => {
		const selectedRows = tableData.filter((data) => data.inputchecked);
		const ids = selectedRows.map((data) => data.id);
		setSelectedIds(ids);
	}, [tableData]);

	useEffect(() => {
		getAdmissionList({
			limit: rows,
			pno: pageno,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	return (
		<>
			<Row>
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Admission List</h4>
							<span style={{ display: "flex", gap: ".5rem" }}>
								<Link to={"/add-admission"} className="btn btn-primary">
									+ Admission
								</Link>

								<Link to={"/add-enquiry"} className="btn btn-primary">
									+ Add New
								</Link>

								<Link
									to={""}
									className="btn btn-primary"
									style={{
										backgroundColor: "white",
										color: "#25D366",
										borderColor: "#25D366",
									}}
								>
									<i className="fa-brands fa-whatsapp"></i>
								</Link>

								<Link
									to={"#"}
									className="btn btn-danger"
									style={{ backgroundColor: "white", color: "#ff1616" }}
									onClick={() => setBasicModal(true)}
								>
									<i className="fa-regular fa-trash-can"></i>
								</Link>
							</span>
						</div>
						<div className="card-body">
							<div className="table-responsive">
								<div id="holidayList" className="dataTables_wrapper no-footer">
									<div className="justify-content-between d-sm-flex">
										<div className="cus_flexc">
											<Link to={""} className="btn btn-primary">
												Print
											</Link>

											<Link
												to={""}
												className="btn btn-primary"
												style={{ marginLeft: "5px" }}
												onClick={handleReset}
											>
												Reset
											</Link>
										</div>

										<div className="cus_flexcg8">
											<div className="cus_rangedp">
												<label htmlFor="sdt">From:</label>

												<DatePicker
													selected={startDate}
													onChange={(date) => setStartDate(date)}
													className="form-control"
													maxDate={new Date()}
													id="sdt"
													dateFormat="dd/MM/yy"
												/>
											</div>

											<div className="cus_rangedp">
												<label htmlFor="edt">To:</label>
												<DatePicker
													selected={endDate}
													onChange={(date) => setEndDate(date)}
													className="form-control"
													maxDate={new Date()}
													id="edt"
													dateFormat="dd/MM/yy"
												/>
											</div>
										</div>

										<div className="cus_flexcg8">
											<label>
												Search :
												<input type="search" placeholder="" onChange={Search} />
											</label>
										</div>
									</div>

									<div className="cus_ovrfx">
										<table className="display dataTable no-footer w-100">
											<thead>
												<tr>
													{theadData.map((item, ind) => (
														<th
															key={ind}
															onClick={() => {
																if (item.sortable) {
																	if (ind === 0) {
																		// handleCheckedAll(unchecked);
																	} else {
																		SortData(item.sortingValue);
																		setIconDate((prevState) => ({
																			complete: !prevState.complete,
																			ind: ind,
																		}));
																	}
																}
															}}
														>
															{ind === 0 ? (
																<div className="form-check custom-checkbox cus_nolp">
																	<input
																		type="checkbox"
																		className="cus_checkbox"
																		id="checkAll"
																		checked={!unchecked}
																		onChange={(e) =>
																			handleCheckedAll(e.target.checked)
																		}
																	/>
																	<label
																		className="form-check-label"
																		htmlFor="checkAll"
																	></label>
																</div>
															) : (
																<span>
																	{item.heading}
																	{item.sortable && ind !== iconData.ind && (
																		<i
																			className="fa fa-sort ms-2 fs-12"
																			style={{
																				opacity: "0.3",
																				cursor: "pointer",
																			}}
																		/>
																	)}
																	{item.sortable &&
																		ind === iconData.ind &&
																		(iconData.complete ? (
																			<i
																				className="fa fa-arrow-down ms-2 fs-12"
																				style={{
																					opacity: "0.7",
																					cursor: "pointer",
																				}}
																			/>
																		) : (
																			<i
																				className="fa fa-arrow-up ms-2 fs-12"
																				style={{
																					opacity: "0.7",
																					cursor: "pointer",
																				}}
																			/>
																		))}
																</span>
															)}
														</th>
													))}
												</tr>
											</thead>
											<tbody className="cus_up">
												{tableData.map((data, ind) => (
													<tr key={ind}>
														<td>
															<div className="form-check custom-checkbox cus_nolp">
																<input
																	type="checkbox"
																	className="cus_checkbox"
																	id={`checkbox-${ind}`}
																	checked={data.inputchecked}
																	onChange={() => handleChecked(data.id)}
																/>

																<label
																	className="form-check-label"
																	htmlFor={`checkbox-${ind}`}
																></label>
															</div>
														</td>

														{/* Render other table cells */}

														<td>
															{moment(data.admissionDate).format("DD/MM/YY")}
														</td>
														<td>{data.firstName || "N/A"}</td>
														<td>{data.class || "N/A"}</td>
														<td>{data.section || "N/A"}</td>
														<td>{data.fatherName}</td>
														<td>{data.contactNo}</td>
														<td>{"feeStatus"}</td>

														<td>
															<span
																className="btn btn-xs sharp btn-primary me-1"
																onClick={() => {}}
															>
																<i className="fa fa-pencil" />
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									<div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
										<div className="dataTables_info"></div>

										<Pagination
											totalItems={totalRecords}
											rows={rows}
											onPageChange={handlePageChange}
											filterCriteria={filterCriteria}
										/>
									</div>
								</div>
							</div>

							{/* <!-- Modal --> */}
							<Modal
								className="fade"
								show={basicModal}
								onHide={setBasicModal}
								centered
							>
								<Modal.Header>
									<Modal.Title>Delete Enquiries</Modal.Title>
									<Button
										variant=""
										className="btn-close"
										onClick={() => setBasicModal(false)}
									></Button>
								</Modal.Header>
								<Modal.Body>Are you sure?</Modal.Body>
								<Modal.Footer>
									<Button
										onClick={() => setBasicModal(false)}
										variant="danger light"
									>
										Close
									</Button>
									<Button
										variant="primary"
										// onClick={() => handleDelete({ id: selectedIds })}
									>
										Delete
									</Button>
								</Modal.Footer>
							</Modal>
						</div>
					</div>
				</div>
			</Row>
		</>
	);
};

export default AdmissionList;
