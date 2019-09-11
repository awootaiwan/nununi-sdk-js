import React from "react";
import styled from 'styled-components';

const ProductTag = style.a`
display: block;
text-decoration: none;
background: #f47f9d;
border: 1px solid #ee5d84;
border-radius: 8px;
color: #fff;
margin-bottom: 10px;
margin-right: 8px;
padding: 5px 10px;

:hover {
  cursor: pointer;
}
`;

const ProductTag = ({ link, text }) => {
  const baseUrl = `${location.protocol}//${location.host}?tags=${link}`;
  return (
    <a href={baseUrl}>
      <span>{text}</span>
    </a>
  );
};

export default ProductTag;
