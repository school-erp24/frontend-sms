import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearMessages } from "../../../store/features/auth/authSlice";
import {
	checkAutoLogin,
	login,
} from "../../../store/features/auth/authService";

import { toast } from "react-toastify";

// image
import logoFull from "../../../assets/images/logo-full.png";

function Login() {
	const [email, setEmail] = useState("subramanyam@gmail.com");

	const [pwd, setPwd] = useState("Dpschool@1");

	// const [email, setEmail] = useState("");

	// const [pwd, setPwd] = useState("");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const errorMessage = useSelector((state) => state.auth.errorMessage);
	const successMessage = useSelector((state) => state.auth.successMessage);

	const handleLogin = async (e, dispatch) => {
		e.preventDefault();
		dispatch(clearMessages());

		try {
			const userDetails = await login({ email, pwd }, dispatch);
			// console.log("Login successful!", userDetails);
			navigate("/dashboard");
			toast.success("Login sucessful");
		} catch (error) {
			console.error("Login failed:", error);
			toast.error("Login failed");
		}
	};

	useEffect(() => {
		checkAutoLogin(localStorage.getItem("userDetails"), dispatch, navigate);
	}, []);

	return (
		<div className="fix-wrapper">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-5 col-md-6">
						<div className="card mb-0 h-auto">
							<div className="card-body">
								<div className="text-center mb-2">
									<Link to={"/dashboard"}>
										<img src={logoFull} alt="logo" />
									</Link>
								</div>

								<h4 className="text-center mb-4">Sign in your account</h4>
								{/* {errorMessage && (
									<div className="text-danger p-1 my-2">{errorMessage}</div>
								)} */}
								{/* {successMessage && (
									<div className="text-danger p-1 my-2">{successMessage}</div>
								)} */}
								<form
									onSubmit={(e) => {
										handleLogin(e, dispatch);
									}}
								>
									<div className="mb-3">
										<label className="mb-1">
											<strong>Email</strong>
										</label>
										<input
											type="email"
											className="form-control"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Type Your Email Address"
											required
										/>
										{/* {errors.email && (
											<div className="text-danger fs-12">{errors.email}</div>
										)} */}
									</div>
									<div className="mb-3">
										<label className="mb-1">
											<strong>Password</strong>
										</label>
										<input
											type="password"
											className="form-control"
											value={pwd}
											placeholder="Type Your Password"
											onChange={(e) => setPwd(e.target.value)}
											required
										/>
										{/* {errors.password && (
											<div className="text-danger fs-12">{errors.password}</div>
										)} */}
									</div>
									{/* <div className="row d-flex justify-content-between mt-4 mb-2">
										<div className="mb-3">
											<div className="form-check custom-checkbox ms-1">
												<input
													type="checkbox"
													className="form-check-input"
													id="basic_checkbox_1"
												/>
												<label
													className="form-check-label"
													htmlFor="basic_checkbox_1"
												>
													Remember my preference
												</label>
											</div>
										</div>
									</div> */}
									<div className="text-center">
										<button type="submit" className="btn btn-primary btn-block">
											Sign Me In
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
