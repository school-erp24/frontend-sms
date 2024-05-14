import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
/// Css
import "./../index.css";
import "./../chart.css";
import "./../step.css";

import Login from "../pages/authentication/Login";

/// Layout
import Nav from "./../layouts/nav";

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
import UpdateAdmissionForm from "../pages/admissions/UpdateAdmissionForm";
import AdmissionList from "../pages/admissions/AdmissionList";

// Student Management
import StudentList from "../pages/students/StudentList";

// Settings
import ClassSetting from "../pages/settings/ClassSetting";
import AdmissionSetting from "../pages/settings/AdmissionSetting";
import StudentSetting from "../pages/settings/StudentSetting";
import TransportSetting from "../pages/settings/TransportSetting";

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
	const USER_TYPES = {
		// SUPER_ADMIN: "Super Admin",
		SCHOOL_ADMIN: "School Admin",
		ACCOUNTANT_1: "Accountant 1",
		ACCOUNTANT_2: "Accountant 2",
		STAFF: "Staff",
	};

	const CURRENT_USER_TYPE = USER_TYPES.SCHOOL_ADMIN;

	const ALL_USERS = [
		USER_TYPES.SCHOOL_ADMIN,
		USER_TYPES.ACCOUNTANT_1,
		USER_TYPES.ACCOUNTANT_2,
		USER_TYPES.STAFF,
	];

	const MAIN_USERS = [USER_TYPES.SCHOOL_ADMIN, USER_TYPES.ACCOUNTANT_1];

	const isUserTypeAllowed = ALL_USERS.includes(CURRENT_USER_TYPE);
	const isMainUserTypeAllowed = MAIN_USERS.includes(CURRENT_USER_TYPE);

	const NoAccess = () => {
		return <div>You have no access to the page</div>;
	};

	const allroutes = [
		/// Dashboard
		{
			url: "",
			component: isUserTypeAllowed ? <Home /> : <NoAccess />,
		},

		{
			url: "dashboard",
			component: isUserTypeAllowed ? <Home /> : <NoAccess />,
		},

		//Enquiry
		{
			url: "add-enquiry",
			component: isUserTypeAllowed ? <AddEnquiry /> : <NoAccess />,
		},
		{
			url: "update-enquiry/:id",
			component: isUserTypeAllowed ? <UpdateEnquiry /> : <NoAccess />,
		},
		{
			url: "enquiry-list",
			component: isUserTypeAllowed ? <EnquiryList /> : <NoAccess />,
		},

		// admissions
		{
			url: "add-admission",
			component: isUserTypeAllowed ? <AdmissionForm /> : <NoAccess />,
		},
		{
			url: "update-admission/:id",
			component: isUserTypeAllowed ? <UpdateAdmissionForm /> : <NoAccess />,
		},
		{
			url: "admission-list",
			component: isUserTypeAllowed ? <AdmissionList /> : <NoAccess />,
		},

		// students
		{
			url: "student-list",
			component: isMainUserTypeAllowed ? <StudentList /> : <NoAccess />,
		},

		// settings
		{ url: "class-setting", component: <ClassSetting /> },
		{ url: "admission-setting", component: <AdmissionSetting /> },
		{ url: "student-setting", component: <StudentSetting /> },
		{ url: "transport-setting", component: <TransportSetting /> },

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
				<Route path="/login" element={<Login />} />

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
				<Route path="*" element={<Error404 />} />
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
						// style={{ minHeight: window.screen.height - 200 }} // initially it was 45
					>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default Markup;
