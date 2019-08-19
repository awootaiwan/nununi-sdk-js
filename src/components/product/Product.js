import React from "react";
import styled from 'styled-components'

const PorductContenier = styled.li`
  width: 283px;
  margin: 0 0 15px 11px;
  border: 1px solid transparent;
  text-align: center;
  background: #fff;
  vertical-align: top;
  position: relative;
  display: inline-block;

  a {
    text-decoration: none;
  }

  a:link {
    color: #383838;
  }

  a:visited {
    color: #383838;
  }

  a:hover {
    color: #383838;
  }

  a:active {
    color: #383838;
  }
  .pro-img {
    display: block;
    position: relative;
    padding: 5px;

    img {
      width: 100%;
      display: block;
    }
  }
  .sale-price {
    font-size: 32px;
    position: relative;
    height: 28px;
    color: #ee4d79;
    display: inline-block;
    margin-bottom: 10px;
  }
  .nt {
    font-size: 22px;
    color: #ee4d79;
    font: inherit;
  }

  .product-name {
    display: box;
    height: 40px;
    margin: 0 0 10px;
    line-height: 145%;
    overflow: hidden;
    line-clamp: 2;
    box-orient: vertical;
    text-align: left;
    line-height: 20px;
    padding: 9px;
  }
`;

const Product = ({ product }) => {
  return (
    <PorductContenier>
      <div>
        <a href={product.url}>
          <span className="pro-img" >
            <img className="pro-img" src={product.productImageUrl} title={product.productName} alt={product.productName} />
          </span>
          <div className="product-name">{product.productName}</div>
          <span className="nt">$</span>
          <span className="sale-price">{product.productPrice}</span>
        </a>
      </div>
    </PorductContenier>
  )
}
export default Product;