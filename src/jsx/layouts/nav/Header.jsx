import React, { useContext } from "react";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

/// Image
import profile from "../../../assets/images/profile/education/pic1.jpg";
// import avatar from "../../../assets/images/avatar/1.jpg";

import { ThemeContext } from "../../../context/ThemeContext";
import Logout from "../nav/Logout";

const Header = ({ onNote }) => {
	const { background, changeBackground } = useContext(ThemeContext);
	const handleThemeMode = () => {
		if (background.value === "dark") {
			changeBackground({ value: "light", label: "Light" });
		} else {
			changeBackground({ value: "dark", label: "Dark" });
		}
	};

	return (
		<>
			<div className="header">
				<div className="header-content">
					<nav className="navbar navbar-expand">
						<div className="collapse navbar-collapse justify-content-between">
							<div className="header-left">
								{/* <div className="search_bar dropdown">
                    <span className="search_icon p-3 c-pointer" data-bs-toggle="dropdown">
                        <i className="mdi mdi-magnify"></i>
                    </span>
                    <div className="dropdown-menu p-0 m-0">
                        <form>
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                </div> */}
							</div>
							<ul className="navbar-nav header-right ">
								{/* <li className="nav-item dropdown notification_dropdown">
									<Link
										to={"#"}
										className={`nav-link bell dlab-theme-mode p-0 ${
											background.value === "dark" ? "active" : ""
										}`}
										onClick={() => handleThemeMode()}
									>
										<i id="icon-light" className="fas fa-sun"></i>
										<i id="icon-dark" className="fas fa-moon"></i>
									</Link>
								</li> */}

								{/* <Dropdown
									as="li"
									className="nav-item dropdown notification_dropdown"
								>
									<Dropdown.Toggle
										variant=""
										as="a"
										className="nav-link bell bell-link i-false c-pointer"
										onClick={() => onNote()}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="22.871"
											viewBox="0 0 24 22.871"
										>
											<g data-name="Layer 2" transform="translate(-2 -2)">
												<path
													id="Path_9"
													data-name="Path 9"
													d="M23.268,2H4.73A2.733,2.733,0,0,0,2,4.73V17.471A2.733,2.733,0,0,0,4.73,20.2a.911.911,0,0,1,.91.91v1.94a1.82,1.82,0,0,0,2.83,1.514l6.317-4.212a.9.9,0,0,1,.5-.153h4.436a2.742,2.742,0,0,0,2.633-2L25.9,5.462A2.735,2.735,0,0,0,23.268,2Zm.879,2.978-3.539,12.74a.915.915,0,0,1-.88.663H15.292a2.718,2.718,0,0,0-1.514.459L7.46,23.051v-1.94a2.733,2.733,0,0,0-2.73-2.73.911.911,0,0,1-.91-.91V4.73a.911.911,0,0,1,.91-.91H23.268a.914.914,0,0,1,.879,1.158Z"
													transform="translate(0 0)"
												/>
												<path
													id="Path_10"
													data-name="Path 10"
													d="M7.91,10.82h4.55a.91.91,0,1,0,0-1.82H7.91a.91.91,0,1,0,0,1.82Z"
													transform="translate(-0.45 -0.63)"
												/>
												<path
													id="Path_11"
													data-name="Path 11"
													d="M16.1,13H7.91a.91.91,0,1,0,0,1.82H16.1a.91.91,0,1,0,0-1.82Z"
													transform="translate(-0.45 -0.99)"
												/>
											</g>
										</svg>
										<span className="badge light text-white bg-primary rounded-circle">
											26
										</span>
									</Dropdown.Toggle>
								</Dropdown> */}

								{/* <Dropdown
									as="li"
									className="nav-item dropdown notification_dropdown"
								>
									<Dropdown.Toggle
										className="nav-link i-false c-pointer icon-bell-effect"
										variant=""
										as="a"
									>
										<svg
											id="icon-user"
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="feather feather-bell"
										>
											<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
											<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
										</svg>
										<div className="pulse-css"></div>
									</Dropdown.Toggle>
									<Dropdown.Menu
										align="end"
										className="mt-3 dropdown-menu dropdown-menu-right"
									>
										<ul className="list-unstyled">
											<li className="media dropdown-item align-items-center gap-3">
												<span className="success">
													<i className="ti-user"></i>
												</span>
												<div className="media-body">
													<Link to={"#"}>
														<p>
															<strong>Martin</strong> has added a{" "}
															<strong>customer</strong> Successfully
														</p>
													</Link>
												</div>
												<span className="notify-time">3:20 am</span>
											</li>
											<li className="media dropdown-item align-items-center gap-3">
												<span className="primary">
													<i className="ti-shopping-cart"></i>
												</span>
												<div className="media-body">
													<Link to={"#"}>
														<p>
															<strong>Jennifer</strong> purchased Light
															Dashboard 2.0.
														</p>
													</Link>
												</div>
												<span className="notify-time">3:20 am</span>
											</li>
											<li className="media dropdown-item align-items-center gap-3">
												<span className="danger">
													<i className="ti-bookmark"></i>
												</span>
												<div className="media-body">
													<Link to={"#"}>
														<p>
															<strong>Robin</strong> marked a{" "}
															<strong>ticket</strong> as unsolved.
														</p>
													</Link>
												</div>
												<span className="notify-time">3:20 am</span>
											</li>
											<li className="media dropdown-item align-items-center gap-3">
												<span className="primary">
													<i className="ti-heart"></i>
												</span>
												<div className="media-body">
													<Link to={"#"}>
														<p>
															<strong>David</strong> purchased Light Dashboard
															1.0.
														</p>
													</Link>
												</div>
												<span className="notify-time">3:20 am</span>
											</li>
											<li className="media dropdown-item align-items-center gap-3">
												<span className="success">
													<i className="ti-image"></i>
												</span>
												<div className="media-body">
													<Link to={"#"}>
														<p>
															<strong> James.</strong> has added a
															<strong>customer</strong> Successfully
														</p>
													</Link>
												</div>
												<span className="notify-time">3:20 am</span>
											</li>
										</ul>
										<Link className="all-notification" to="#">
											See all notifications <i className="ti-arrow-right" />
										</Link>
									</Dropdown.Menu>
								</Dropdown> */}

								{/* <Dropdown as="li" className="nav-item  notification_dropdown">
									<Dropdown.Toggle
										variant=""
										as="a"
										className="nav-link  ai-icon i-false c-pointer"
										role="button"
										data-toggle="dropdown"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="23.262"
											height="24"
											viewBox="0 0 23.262 24"
										>
											<g id="icon" transform="translate(-1565 90)">
												<path
													id="setting_1_"
													data-name="setting (1)"
													d="M30.45,13.908l-1-.822a1.406,1.406,0,0,1,0-2.171l1-.822a1.869,1.869,0,0,0,.432-2.385L28.911,4.293a1.869,1.869,0,0,0-2.282-.818l-1.211.454a1.406,1.406,0,0,1-1.88-1.086l-.213-1.276A1.869,1.869,0,0,0,21.475,0H17.533a1.869,1.869,0,0,0-1.849,1.567L15.47,2.842a1.406,1.406,0,0,1-1.88,1.086l-1.211-.454a1.869,1.869,0,0,0-2.282.818L8.126,7.707a1.869,1.869,0,0,0,.432,2.385l1,.822a1.406,1.406,0,0,1,0,2.171l-1,.822a1.869,1.869,0,0,0-.432,2.385L10.1,19.707a1.869,1.869,0,0,0,2.282.818l1.211-.454a1.406,1.406,0,0,1,1.88,1.086l.213,1.276A1.869,1.869,0,0,0,17.533,24h3.943a1.869,1.869,0,0,0,1.849-1.567l.213-1.276a1.406,1.406,0,0,1,1.88-1.086l1.211.454a1.869,1.869,0,0,0,2.282-.818l1.972-3.415a1.869,1.869,0,0,0-.432-2.385ZM27.287,18.77l-1.211-.454a3.281,3.281,0,0,0-4.388,2.533l-.213,1.276H17.533l-.213-1.276a3.281,3.281,0,0,0-4.388-2.533l-1.211.454L9.75,15.355l1-.822a3.281,3.281,0,0,0,0-5.067l-1-.822L11.721,5.23l1.211.454A3.281,3.281,0,0,0,17.32,3.151l.213-1.276h3.943l.213,1.276a3.281,3.281,0,0,0,4.388,2.533l1.211-.454,1.972,3.414h0l-1,.822a3.281,3.281,0,0,0,0,5.067l1,.822ZM19.5,7.375A4.625,4.625,0,1,0,24.129,12,4.63,4.63,0,0,0,19.5,7.375Zm0,7.375A2.75,2.75,0,1,1,22.254,12,2.753,2.753,0,0,1,19.5,14.75Z"
													transform="translate(1557.127 -90)"
												/>
											</g>
										</svg>
										<span className="badge light text-white bg-primary rounded-circle">
											15
										</span>
									</Dropdown.Toggle>
									<Dropdown.Menu
										align="right"
										className="mt-3 dropdown-menu dropdown-menu-end"
									>
										<div className="widget-timeline dlab-scroll style-1 p-3 height370">
											<ul className="timeline">
												<li>
													<div className="timeline-badge primary" />
													<Link
														className="timeline-panel c-pointer text-muted"
														to="#"
													>
														<span>10 minutes ago</span>
														<h6 className="mb-0">
															Youtube, a video-sharing website, goes live{" "}
															<strong className="text-primary">$500</strong>.
														</h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge info"></div>
													<Link
														className="timeline-panel c-pointer text-muted"
														to="#"
													>
														<span>20 minutes ago</span>
														<h6 className="mb-0">
															New order placed{" "}
															<strong className="text-info">#XF-2356.</strong>
														</h6>
														<p className="mb-0">
															Quisque a consequat ante Sit amet magna at
															volutapt...
														</p>
													</Link>
												</li>
												<li>
													<div className="timeline-badge danger"></div>
													<Link
														className="timeline-panel c-pointer text-muted"
														to="#"
													>
														<span>30 minutes ago</span>
														<h6 className="mb-0">
															john just buy your product{" "}
															<strong className="text-warning">
																Sell $250
															</strong>
														</h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge success"></div>
													<Link
														className="timeline-panel c-pointer text-muted"
														to="#"
													>
														<span>15 minutes ago</span>
														<h6 className="mb-0">
															StumbleUpon is acquired by eBay.{" "}
														</h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge warning"></div>
													<Link
														className="timeline-panel c-pointer text-muted"
														to="#"
													>
														<span>20 minutes ago</span>
														<h6 className="mb-0">
															Mashable, a news website and blog, goes live.
														</h6>
													</Link>
												</li>
												<li>
													<div className="timeline-badge dark"></div>
													<Link
														className="timeline-panel c-pointer text-muted"
														to="#"
													>
														<span>20 minutes ago</span>
														<h6 className="mb-0">
															Mashable, a news website and blog, goes live.
														</h6>
													</Link>
												</li>
											</ul>
										</div>
									</Dropdown.Menu>
								</Dropdown> */}

								<Dropdown as="li" className="nav-item header-profile">
									<Dropdown.Toggle
										to={"#"}
										className="nav-link i-false"
										as="div"
									>
										<img src={profile} width="20" alt="" />
									</Dropdown.Toggle>
									<Dropdown.Menu
										align="end"
										className="mt-3 dropdown-menu dropdown-menu-right "
									>
										<Link
											to={"/app-profile"}
											className="dropdown-item ai-icon icon-bell-effect"
										>
											<svg
												id="icon-user1"
												xmlns="http://www.w3.org/2000/svg"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												className="feather feather-user"
											>
												<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
												<circle cx="12" cy="7" r="4"></circle>
											</svg>
											<span className="ms-2">Profile </span>
										</Link>
										<Logout />
									</Dropdown.Menu>
								</Dropdown>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Header;
