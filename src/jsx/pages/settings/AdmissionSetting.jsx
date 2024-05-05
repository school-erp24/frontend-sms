import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
	getAdmissionSetting,
	postAdmissionSetting,
} from "../../../services/SettingsService";
import { toast } from "react-toastify";

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
									<h4 style={{ margin: "7px 0" }}>Admission Details</h4>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr role="row">
													<th style={{ width: "177px" }}>Sno</th>
													<th style={{ width: "177px" }}>Field</th>
													<th style={{ width: "278px" }}>Enable</th>
												</tr>
											</thead>

											<tbody>
												{admissionRows.map((row, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{row.field}</td>
														<td>
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
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Student Details */}
									<h4 style={{ margin: "7px 0" }}>Student Details</h4>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr role="row">
													<th style={{ width: "177px" }}>Sno</th>
													<th style={{ width: "177px" }}>Field</th>
													<th style={{ width: "278px" }}>Enable</th>
												</tr>
											</thead>

											<tbody>
												{studentDetails.map((row, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{row.field}</td>
														<td>
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
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Previous Qualifications Details */}
									<h4 style={{ margin: "7px 0" }}>
										Previous Qualifications Details
									</h4>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr role="row">
													<th style={{ width: "177px" }}>Sno</th>
													<th style={{ width: "177px" }}>Field</th>
													<th style={{ width: "278px" }}>Enable</th>
												</tr>
											</thead>

											<tbody>
												{previousDetails.map((row, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{row.field}</td>
														<td>
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
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Government Portal ID */}
									<h4 style={{ margin: "7px 0" }}>Government Portal ID</h4>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr role="row">
													<th style={{ width: "177px" }}>Sno</th>
													<th style={{ width: "177px" }}>Field</th>
													<th style={{ width: "278px" }}>Enable</th>
												</tr>
											</thead>

											<tbody>
												{govtDetails.map((row, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{row.field}</td>
														<td>
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
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Bank Account Details*/}
									<h4 style={{ margin: "7px 0" }}>Bank Account Details</h4>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr role="row">
													<th style={{ width: "177px" }}>Sno</th>
													<th style={{ width: "177px" }}>Field</th>
													<th style={{ width: "278px" }}>Enable</th>
												</tr>
											</thead>

											<tbody>
												{bankDetails.map((row, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{row.field}</td>
														<td>
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
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>

									{/* Family Details*/}
									<h4 style={{ margin: "7px 0" }}>Family Details</h4>
									<div className="table-responsive">
										<table className="table table-bordered">
											<thead>
												<tr role="row">
													<th style={{ width: "177px" }}>Sno</th>
													<th style={{ width: "177px" }}>Field</th>
													<th style={{ width: "278px" }}>Enable</th>
												</tr>
											</thead>

											<tbody>
												{familyDetails.map((row, index) => (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>{row.field}</td>
														<td>
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
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
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
