import React from "react";
import "./Product.scss";
import HeadMenu from "./HeadMenu";
import Products from "./Products";
import Pagination from "./Pagination"


const ProductList = ({ productlist, pageInfo }) => {
	return (
		<div>
			<HeadMenu pageInfo={pageInfo} />
			<h1 className="pageInfo h1">{productlist.pageInfo.h1}</h1>
			<div className="body-product ">
				<div className="master-container">
					<section className="wrap-page">
						<ul className="product-container">
							{
								productlist.products && productlist.products.length > 0 && productlist.products.map((list) => {
									return <Products key={list.productId} products={list} />
								})
							}
						</ul>
					</section>
					{
						(productlist.products && productlist.products.length > 0 ? <Pagination productlist={productlist} pageInfo={pageInfo} /> : "")
					}
					
				</div>
			</div>

		</div>
	);
}

export default ProductList;