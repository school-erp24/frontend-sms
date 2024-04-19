import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import ThemeContext from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename="/">
				<ThemeContext>
					<App />
					<React.Fragment>
						<ToastContainer
							position="top-center"
							autoClose={1000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
						/>
					</React.Fragment>
				</ThemeContext>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
reportWebVitals();
