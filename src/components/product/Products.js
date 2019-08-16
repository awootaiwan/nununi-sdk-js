import React from "react";
import styled from 'styled-components'

const Porduct = styled.li`
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

const Products = ({ products }) => {
  return (
    <Porduct>
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
    </Porduct>
  )
}
export default Products;