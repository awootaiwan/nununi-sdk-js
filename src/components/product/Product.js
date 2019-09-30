import React from "react";
import styled from 'styled-components'

const PorductContenier = styled.li`
  width: 283px;
  min-height: 375px;
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
    width: 100%;
    padding-bottom: 100%;
    cursor: pointer;
    background-image: url('${props => props.imageUrl}');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #fff;
    background-size: 100%;
  }
  .sale-price {
    font-size: 32px;
    position: relative;
    height: 28px;
    color: #ee4d79;
    display: inline-block;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .product-name {
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: left;
    padding: 0 10px;
    height: 40px;
    line-height: 20px;
  }
`;

const Product = ({ product }) => {
  return (
    <PorductContenier imageUrl={product.productImageUrl}>
        <a href={product.url}>
          <div className="pro-img" alt={product.productName}>
          </div>
          <div className="product-name">{product.productName}</div>
          <span className="sale-price">${product.productPrice}</span>
        </a>
    </PorductContenier>
  )
}
export default Product;