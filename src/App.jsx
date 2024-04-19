import { lazy, Suspense, useEffect } from "react";

/// Components
import Index from "./jsx/router/index";
import { useSelector, useDispatch } from "react-redux";
import {
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";

// action
import { selectIsAuthenticated } from "./store/features/auth/authSlice";
import { checkIfAuthenticated } from "./store/features/auth/authService";

/// Style
import "rsuite/dist/rsuite-no-reset.min.css";
import "./assets/css/style.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

// custom style
import "./custom.css";

const Login = lazy(() => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(import("./jsx/pages/authentication/Login")), 500);
	});
});

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();

		return <Component {...props} router={{ location, navigate, params }} />;
	}

	return ComponentWithRouterProp;
}

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isAuthenticated = useSelector(selectIsAuthenticated);

	// useEffect(() => {
	// 	dispatch(checkAutoLogin(localStorage.getItem("userDetails")))
	// 		.then((resultAction) => {
	// 			const tokenDetails = resultAction;
	// 			console.log("Auto login successful!", tokenDetails);
	// 			// navigate("/dashboard");
	// 		})
	// 		.catch((errorAction) => {
	// 			const errorMessage = errorAction.error.message;
	// 			console.error("Auto login failed:", errorMessage);
	// 		});
	// }, []);

	useEffect(() => {
		checkIfAuthenticated(
			localStorage.getItem("userDetails"),
			dispatch,
			navigate
		);
	}, []);

	// useEffect(() => {
	// 	console.log(isAuthenticated);
	// }, [isAuthenticated]);

	let routeblog = (
		<Routes>
			<Route path="/login" element={<Login />} />
		</Routes>
	);

	if (isAuthenticated) {
		return (
			<>
				<Suspense
					fallback={
						<div id="preloader">
							<div className="sk-three-bounce">
								<div className="sk-child sk-bounce1"></div>
								<div className="sk-child sk-bounce2"></div>
								<div className="sk-child sk-bounce3"></div>
							</div>
						</div>
					}
				>
					<Index />
				</Suspense>
			</>
		);
	} else {
		return (
			<div className="vh-100">
				<Suspense
					fallback={
						<div id="preloader">
							<div className="sk-three-bounce">
								<div className="sk-child sk-bounce1"></div>
								<div className="sk-child sk-bounce2"></div>
								<div className="sk-child sk-bounce3"></div>
							</div>
						</div>
					}
				>
					{routeblog}
				</Suspense>
			</div>
		);
	}
}

export default withRouter(App);
