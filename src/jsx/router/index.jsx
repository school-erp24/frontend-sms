import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
/// Css
import "./../index.css";
import "./../chart.css";
import "./../step.css";

/// Layout
import Nav from "./../layouts/nav";
import Footer from "./../layouts/Footer";

import { ThemeContext } from "../../context/ThemeContext";
//Scroll To Top
import ScrollToTop from "./../layouts/ScrollToTop";

/// Dashboard
import Home from "../pages/dashboard/Dashboard";
import EmptyPage from "./../pages/dashboard/EmptyPage";

// Enquiry List
import AddEnquiry from "../pages/enquiry/AddEnquiry";
import UpdateEnquiry from "../pages/enquiry/UpdateEnquiry";
import EnquiryList from "../pages/enquiry/EnquiryList";

// Admissions
import AdmissionForm from "../pages/admissions/AdmissionForm";

// Settings
import ClassSetting from "../pages/settings/ClassSetting";
import AdmissionSetting from "../pages/settings/AdmissionSetting";

/// App
import AppProfile from "./../pages/apps/AppProfile";
import PostDetails from "./../pages/apps/PostDetails";
import EditProfile from "../pages/apps/EditProfile";
import Calendar from "./../pages/apps/Calendar/Calendar";

/// Charts
import RechartJs from "./../pages/charts/rechart";
import ChartJs from "./../pages/charts/Chartjs";
import SparklineChart from "./../pages/charts/Sparkline";
import ApexChart from "./../pages/charts/apexcharts";

/// Pages
import Error404 from "./../pages/error/Error404";

const Markup = () => {
	const allroutes = [
		/// Dashboard
		{ url: "", component: <Home /> },
		{ url: "dashboard", component: <Home /> },

		//Enquiry
		{ url: "add-enquiry", component: <AddEnquiry /> },
		{ url: "update-enquiry", component: <UpdateEnquiry /> },
		{ url: "enquiry-list", component: <EnquiryList /> },

		// admissions
		{ url: "add-admission", component: <AdmissionForm /> },

		// settings
		{ url: "class-setting", component: <ClassSetting /> },
		{ url: "admission-setting", component: <AdmissionSetting /> },

		/// Apps
		{ url: "app-profile", component: <AppProfile /> },
		{ url: "post-details", component: <PostDetails /> },
		{ url: "edit-profile", component: <EditProfile /> },
		{ url: "app-calender", component: <Calendar /> },

		/// Chart
		{ url: "chart-sparkline", component: <SparklineChart /> },
		{ url: "chart-chartjs", component: <ChartJs /> },
		{ url: "chart-apexchart", component: <ApexChart /> },
		{ url: "chart-rechart", component: <RechartJs /> },

		/// pages
		{ url: "empty", component: <EmptyPage /> },
	];

	// function NotFound() {
	// 	const url = allroutes.map((route) => route.url);
	// 	let path = window.location.pathname;
	// 	path = path.split("/");
	// 	path = path[path.length - 1];

	// 	if (url.indexOf(path) <= 0) {
	// 		return <Error404 />;
	// 	}
	// }

	function NotFound() {
		return <Error404 />;
	}

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<Routes>
				<Route path="/page-error-404" element={<Error404 />} />
				<Route element={<MainLayout />}>
					{allroutes.map((data, i) => (
						<Route
							key={i}
							exact
							path={`${data.url}`}
							element={data.component}
						/>
					))}
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ScrollToTop />
		</>
	);
};

function Loading() {
	return (
		<div id="preloader">
			<div className="sk-three-bounce">
				<div className="sk-child sk-bounce1"></div>
				<div className="sk-child sk-bounce2"></div>
				<div className="sk-child sk-bounce3"></div>
			</div>
		</div>
	);
}

function MainLayout() {
	const { sidebariconHover } = useContext(ThemeContext);
	const sideMenu = useSelector((state) => state.sideMenu);
	return (
		<>
			<div
				id="main-wrapper"
				className={`show  ${sidebariconHover ? "iconhover-toggle" : ""} ${
					sideMenu ? "menu-toggle" : ""
				}`}
			>
				<Nav />
				<div className="content-body">
					<div
						className="container-fluid"
						style={{ minHeight: window.screen.height - 45 }}
					>
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Markup;
