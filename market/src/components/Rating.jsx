/** @format */

import React from "react";

const Rating = (props) => {
	const { rating, reviews, caption } = props;

	return (
		<div>
			<div className="rating">
				<i
					className={
						rating >= 1
							? "fa fa-star"
							: rating >= 0.5
							? "fa fa-star-half-o"
							: "fa fa-star-o"
					}
					aria-hidden="true"></i>
				<i
					className={
						rating >= 2
							? "fa fa-star"
							: rating >= 1.5
							? "fa fa-star-half-o"
							: "fa fa-star-o"
					}
					aria-hidden="true"></i>
				<i
					className={
						rating >= 3
							? "fa fa-star"
							: rating >= 2.5
							? "fa fa-star-half-o"
							: "fa fa-star-o"
					}
					aria-hidden="true"></i>
				<i
					className={
						rating >= 4
							? "fa fa-star"
							: rating >= 3.5
							? "fa fa-star-half-o"
							: "fa fa-star-o"
					}
					aria-hidden="true"></i>
				<i
					className={
						rating >= 5
							? "fa fa-star"
							: rating >= 4.5
							? "fa fa-star-half-o"
							: "fa fa-star-o"
					}
					aria-hidden="true"></i>
				{caption ? <span>{caption}</span> : 
				<p>{`${reviews} reviews`}</p>
				}
				
			</div>
		</div>
	);
};

export default Rating;
