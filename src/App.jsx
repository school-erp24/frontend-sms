import { lazy, Suspense, useEffect } from "react";

/// Components
import Index from "./jsx/router/index";
import Login from "./jsx/pages/authentication/Login";
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
import globalRouter from "./globalRouter";

/// Style
import "./assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

// custom style
import "./custom.css";

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
	globalRouter.navigate = navigate;

	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		checkIfAuthenticated(
			localStorage.getItem("userDetails"),
			dispatch,
			navigate
		);
	}, []);

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
}

export default withRouter(App);
