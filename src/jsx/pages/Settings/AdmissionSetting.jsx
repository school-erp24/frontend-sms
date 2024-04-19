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
	const [rows, setRows] = useState([]);
	const [id, setId] = useState(0);

	useEffect(() => {
		getAdmissionSetting()
			.then((resp) => {
				setId(resp.data.data.rows[0].id);
				console.log(resp.data.data.rows[0].list);
				setRows(resp.data.data.rows[0].list);
			})
			.catch((error) => {
				console.error("Error fetching enquiries:", error);
			});
	}, []);

	const handleCheckboxChange = (index) => {
		const updatedRows = [...rows];
		updatedRows[index].status = updatedRows[index].status === "1" ? "0" : "1";
		setRows(updatedRows);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postAdmissionSetting({ id, list: rows })
			.then((resp) => {
				if (resp.status === 200) {
					toast.success("Sucessfully Updated");
				}
			})
			.catch((error) => {
				console.error("Error submitting", error);
				toast.success("Update failed");
			});
	};

	useEffect(() => {
		console.log(rows);
	}, [rows]);

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
									<div className="table-responsive">
										<div id="job_data" className="dataTables_wrapper">
											<table
												className="display w-100 dataTable "
												id="example5"
												role="grid"
												aria-describedby="example5_info"
											>
												<thead>
													<tr role="row">
														<th style={{ width: "177px" }}>Sno</th>
														<th style={{ width: "177px" }}>Field</th>
														<th style={{ width: "278px" }}>Enable</th>
													</tr>
												</thead>

												<tbody>
													{rows.map((row, index) => (
														<tr key={index}>
															<td>{index + 1}</td>
															<td>{row.field}</td>
															<td>
																<input
																	type="checkbox"
																	className="checkbox"
																	checked={row.status === "1"}
																	disabled={row.default === "true"}
																	onChange={() => handleCheckboxChange(index)}
																/>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
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
