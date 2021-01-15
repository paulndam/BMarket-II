/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const LatestProduct = (props) => {
	const { latestProduct } = props;

	return (
		<div className="col-4" key={latestProduct._id}>
			<Link to={`/latestProduct/${latestProduct._id}`}>
				<img src={latestProduct.image1} alt='pics' />
			</Link>
			<Link to="details.html">
				<h4>
					<Link to={`/latestProduct/${latestProduct._id}`}>
						{latestProduct.nameX}
					</Link>
				</h4>
			</Link>
			{/* <h4>{latestProduct.name}</h4> */}
			<Rating rating={latestProduct.rating} reviews={latestProduct.reviews} />
			<p className='price' >${latestProduct.price}</p>
			<h4>
				<Link className='p-test' to={`/Sellers/${latestProduct.seller._id}`} >
					{/* {latestProduct.seller.seller.name} */}
				</Link>
			</h4>
		</div>
	);
};

export default LatestProduct;
