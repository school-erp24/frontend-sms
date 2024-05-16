import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
	getConfigSettings,
	createConfigSettings,
} from "../../../services/SettingsService";
import PageTitle from "../../layouts/PageTitle";

const ConfigSetting = () => {
	const [configSettings, setConfigSettings] = useState([]);

	const [admissionNoSeq, setAdmissionNoSeq] = useState("");
	const [rollNoSeq, setRollNoSeq] = useState("");

	const handleAddConfig = (e) => {
		e.preventDefault();
		if (admissionNoSeq !== "" && rollNoSeq !== "") {
			toast.error("Config already exists");
			return;
		}

		if (admissionNoSeq && rollNoSeq) {
			createConfigSettings({ admissionNoSeq, rollNoSeq }).then((res) => {
				console.log(res);
				getConfigData();
			});

			// setAdmissionNoSeq("");
			// setRollNoSeq("");
		}
	};

	const getConfigData = () => {
		getConfigSettings()
			.then((resp) => {
				const rowData = resp.data.data;

				console.log(rowData);
				setConfigSettings(rowData);
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
													required
													value={admissionNoSeq}
													onChange={(e) => setAdmissionNoSeq(e.target.value)}
													readOnly={configSettings[0]?.exist === 1}
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
													required
													value={rollNoSeq}
													onChange={(e) => setRollNoSeq(e.target.value)}
													readOnly={configSettings[1]?.exist === 1}
												/>
											</div>
										</div>
									</div>
								</form>

								<Link
									onClick={handleAddConfig}
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfigSetting;
