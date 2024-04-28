import React, { useState, useEffect } from "react";
import { Row, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

import { getEnquiries, deleteEnquiry } from "../../../services/EnquiryService";

import DatePicker from "react-datepicker";
import moment from "moment";

const theadData = [
	{ heading: "Sr.no", sortingVale: "sno", sortable: true },
	{ heading: "Enquiry Date", sortingVale: "enquiryDate", sortable: true },
	{ heading: "Name", sortingVale: "name", sortable: true },
	{ heading: "Parent's Name", sortingVale: "parentName", sortable: true },
	{ heading: "Class", sortingVale: "class", sortable: true },
	{ heading: "Mobile", sortingVale: "contactNo", sortable: true },
	// { heading: "Previous School", sortingVale: "previousSchool", sortable: true }, commented for now
	{ heading: "Village", sortingVale: "villageOrCity", sortable: true },
	// { heading: "District", sortingVale: "district", sortable: true }, commented for now
	{ heading: "Followup Date", sortingVale: "followUpDate", sortable: true },
	// { heading: "Parent's concern", sortingVale: "parentConcern", sortable: true }, commented for now
	{ heading: "Actions", sortingVale: "", sortable: false },
];

// dd-mm-yy

const EnquiryList = () => {
	const navigate = useNavigate();

	const [rows, setRows] = useState(10);

	const [totalRecords, setTotalRecords] = useState();

	const [currentPage, setCurrentPage] = useState();

	const [pageno, setPageNo] = useState(1);

	const [basicModal, setBasicModal] = useState(false);

	const [filterCriteria, setFilterCriteria] = useState(null);

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	useEffect(() => {
		if (startDate && endDate !== null) {
			handleDate(startDate, endDate);
		}
	}, [startDate, endDate]);

	const [tableData, setTableData] = useState([]);
	const [iconData, setIconDate] = useState({ complete: false, ind: Number });

	function SortingData(name) {
		const sortedPeople = [...tableData];
		switch (name) {
			case "sno":
				sortedPeople.sort((a, b) => {
					return a.id - b.id;
				});
				break;
			case "enquiryDate":
			case "name":
			case "parentName":
			case "class":
			case "previousSchool":
			case "villageOrCity":
			case "district":
			case "contactNo":
			case "followUpDate":
			case "parentConcern":
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
	}

	const [search, setSearch] = useState("");

	function DataSearch(e) {
		setSearch(e.target.value);

		getEnquiries({
			limit: rows,
			pno: 1,
			searchString: e.target.value,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				console.log(resp.data.data);
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
	}

	const [unchecked, setUnChecked] = useState(true);

	const [selectedIds, setSelectedIds] = useState([]);

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

	useEffect(() => {
		getEnquiries({
			limit: rows,
			pno: pageno,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				console.log(resp.data.data);
				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	useEffect(() => {
		const selectedRows = tableData.filter((data) => data.inputchecked);
		const ids = selectedRows.map((data) => data.id);
		setSelectedIds(ids);
	}, [tableData]);

	const handlePageChange = (page, rows) => {
		setPageNo(page);
		// setUnChecked(true);
		if (unchecked === false) setUnChecked(true);
		handleCheckedAll(false); // in testing phase

		getEnquiries({
			limit: rows,
			pno: page,
			searchString: search,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				console.log(resp.data.data);
				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	};

	const handleReset = () => {
		getEnquiries({
			limit: rows,
			pno: pageno,
		})
			.then((resp) => {
				const updatedRows = resp.data.data.rows.map((row) => {
					return { ...row, inputchecked: false };
				});

				console.log(resp.data.data);
				setTotalRecords(resp.data.data.totalRecords);
				setTableData(updatedRows);
				setCurrentPage(resp.data.data.currentPno);
				setFilterCriteria((prevCriteria) => null);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	};

	const handleDate = (start, end) => {
		getEnquiries({
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
				setStartDate(null);
				setEndDate(null);
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

	const handleDelete = (ids) => {
		console.log(ids);
		deleteEnquiry(ids)
			.then((resp) => {
				if (resp.status === 200) {
					getEnquiries({
						limit: rows,
						pno: 1,
					})
						.then((resp) => {
							const updatedRows = resp.data.data.rows.map((row) => {
								return { ...row, inputchecked: false };
							});

							console.log(resp.data.data);
							setTotalRecords(resp.data.data.totalRecords);
							setTableData(updatedRows);
							setCurrentPage(resp.data.data.currentPno);
						})
						.catch((error) => {
							console.error("Error fetching enquiries:", error);
						});
				}
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
		setBasicModal(false);
	};

	return (
		<>
			<Row>
				<div className="col-lg-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Enquiry List</h4>
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
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
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

										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: ".5rem",
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													width: "150px",
												}}
											>
												<label htmlFor="sdt">From:</label>

												<DatePicker
													selected={startDate}
													onChange={(date) => setStartDate(date)}
													className="form-control"
													maxDate={new Date()}
													id="sdt"
												/>
											</div>

											<div
												style={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													width: "150px",
												}}
											>
												<label htmlFor="edt">To:</label>
												<DatePicker
													selected={endDate}
													onChange={(date) => setEndDate(date)}
													className="form-control"
													maxDate={new Date()}
													id="edt"
												/>
											</div>
										</div>

										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: ".5rem",
											}}
										>
											<label>
												Search :
												<input
													type="search"
													placeholder=""
													onChange={DataSearch}
												/>
											</label>
										</div>
									</div>

									<div className="cus_ovrfx">
										<table className="display dataTable no-footer w-100 ">
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
																		SortingData(item.sortingVale);
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
																			style={{ opacity: "0.3" }}
																		/>
																	)}
																	{item.sortable &&
																		ind === iconData.ind &&
																		(iconData.complete ? (
																			<i
																				className="fa fa-arrow-down ms-2 fs-12"
																				style={{ opacity: "0.7" }}
																			/>
																		) : (
																			<i
																				className="fa fa-arrow-up ms-2 fs-12"
																				style={{ opacity: "0.7" }}
																			/>
																		))}
																</span>
															)}
														</th>
													))}
												</tr>
											</thead>
											<tbody>
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
															{moment(data.enquiryDate).format("DD/MM/YY")}
														</td>
														<td>{data.name}</td>
														<td>{data.parentName}</td>
														<td>{data.class}</td>
														<td>{data.contactNo}</td>
														{/* <td>{data.previousSchool || "N/A"}</td> */}
														<td>{data.villageOrCity || "N/A"}</td>
														{/* <td>{data.district || "N/A"}</td> */}
														<td>
															{moment(data.followUpDate).format("DD/MM/YY") ||
																"N/A"}
														</td>
														{/* <td>{data.parentConcern || "N/A"}</td> */}

														<td>
															<span
																className="btn btn-xs sharp btn-primary me-1"
																onClick={() => {
																	navigate("/update-enquiry", {
																		state: {
																			id: data.id,
																			class: data.class,
																		},
																	});
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
										onClick={() => handleDelete({ id: selectedIds })}
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

export default EnquiryList;
