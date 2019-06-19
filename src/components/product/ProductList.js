import React from "react";
import "./Product.css";
import Products from "./Products";
import HeadMenu from "./HeadMenu";

const ProductList = ({ productlist }) => {
	return (
		<div>
			<HeadMenu />
			<h1 className="pageInfo h1 ">{productlist.pageInfo.h1}</h1>
			<div className="body-product ">
				<div className="master-container">
					<section className="wrap-page">
						<ul className="product-container">
							{
								productlist.products.map((list) => {
									return <Products key={list.productId} products={list} />
								})
							}
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

export default ProductList;