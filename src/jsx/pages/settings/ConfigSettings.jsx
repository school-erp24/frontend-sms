import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
	getConfigSettings,
	updateConfigSettings,
} from "../../../services/SettingsService";
import PageTitle from "../../layouts/PageTitle";

const ConfigSetting = () => {
	const [configSettings, setConfigSettings] = useState([]);

	const [admissionNoSeq, setAdmissionNoSeq] = useState("");
	const [rollNoSeq, setRollNoSeq] = useState("");

	const handleUpdateConfig = (e) => {
		e.preventDefault();

		if (admissionNoSeq && rollNoSeq) {
			updateConfigSettings({ admissionNoSeq, rollNoSeq })
				.then((res) => {
					console.log(res);
					getConfigData();
					toast.success("Config updated");
				})
				.catch((error) => {
					if (error.response && error.response.status === 422) {
						toast.error("Students exist");
					} else {
						console.error("Error creating config settings:", error);
					}
				});
		}
	};

	const getConfigData = () => {
		getConfigSettings()
			.then((resp) => {
				const rowData = resp.data.data;

				// setConfigSettings(rowData);
				if (rowData.length > 0) {
					setAdmissionNoSeq(rowData[0].admissionNoSeq);
					setRollNoSeq(rowData[1].rollNoSeq);
				}
			})
			.catch((error) => {
				console.error("Error fetching classes:", error);
			});
	};

	useEffect(() => {
		getConfigData();
	}, []);

	return (
		<>
			<PageTitle activeMenu={"Config Setup"} motherMenu={"Settings"} />
			<div className="row">
				<div className="col-xl-12 col-xxl-12 col-sm-12">
					<div className="card">
						<div className="card-body">
							<div className="row">
								<form action="#" method="post" id="addStaffForm">
									<div className="row">
										<div className="col-sm-3">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Admission No. sequence
												</label>
												<input
													placeholder=""
													type="text"
													className="form-control"
													value={admissionNoSeq}
													onChange={(e) => setAdmissionNoSeq(e.target.value)}
												/>
											</div>
										</div>

										<div className="col-sm-3">
											<div className="form-group">
												<label className="form-label" htmlFor="class_field">
													Roll No. sequence
												</label>
												<input
													placeholder=""
													type="text"
													className="form-control"
													value={rollNoSeq}
													onChange={(e) => setRollNoSeq(e.target.value)}
												/>
											</div>
										</div>
									</div>
								</form>

								<Link
									onClick={handleUpdateConfig}
									className="btn btn-primary"
									style={{
										width: "max-content",
										height: "max-content",
										marginLeft: "15px",
										marginBottom: "1rem",
										border: "transparent",
									}}
								>
									Update
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfigSetting;
