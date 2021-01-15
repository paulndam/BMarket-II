/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const RelatedProduct = (props) => {
	const { relatedProduct } = props;

	return (
		<div className="col-4" key={relatedProduct._id}>
			<Link to='#'>
				<img src={relatedProduct.image2} alt="picz" />
			</Link>
			<Link to="details.html">
				<h4>
					<Link to='#'>
						{relatedProduct.name}
					</Link>
				</h4>
			</Link>
			{/* <h4>{relatedProduct.name}</h4> */}
			<Rating rating={relatedProduct.rating} reviews={relatedProduct.reviews} />
			<p className='price' >${relatedProduct.price}</p>
		</div>
	);
};

// {`/relatedProduct/${relatedProduct._id}`}

export default RelatedProduct;
