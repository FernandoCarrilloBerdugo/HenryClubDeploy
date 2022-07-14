import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/Store/Store";
import { Auth0Provider } from "@auth0/auth0-react";

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(

ReactDOM.render(
	<Provider store={store}>
		<Auth0Provider
			domain="dev-j1dj679a.us.auth0.com"
			clientId="2uBWPKZL2JaUb0QZpWAg8CPCrQg2sbtl"
			redirectUri={window.location.origin}
			cacheLocation="localstorage"
		>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Auth0Provider>
	</Provider>,
	document.getElementById("root")
);
