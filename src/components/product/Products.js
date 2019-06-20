import React from "react";

const Products = ({ products }) => {
  return (
    <li>
      <div>
        <a href={products.url}>
          <span className="pro-img" >
            <img className="pro-img" src={products.productImageUrl} title={products.productName} alt={products.productName} />
          </span>
          <div className="product-name">{products.productName}</div>
          <span className="nt">$</span>
          <span className="sale-price">{products.productPrice}</span>
        </a>
      </div>
    </li>
  )
}
export default Products;