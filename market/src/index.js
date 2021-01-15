/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, latestStore, relatedStore } from "./Store";
import { Provider } from "react-redux";
//import LatestProductStore from "./LatestProductStore";

ReactDOM.render(
	<Provider
		store={store}
		LatestProductStore={latestStore}
		RelatedProductStore={relatedStore}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
