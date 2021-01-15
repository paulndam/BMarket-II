/** @format */

import React from "react";

const Errormessage = (props) => {
	return (
		<div className={`alert alert-${props.variant || "info"}`}>
			{props.children}
		</div>
	);
};

export default Errormessage;
