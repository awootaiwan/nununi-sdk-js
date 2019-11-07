import React from "react";
import styled from 'styled-components'
import HeadMenu from "./HeadMenu";
import Product from "./Product";
import Pagination from "./Pagination"

const PageInfoH1 = styled.h1`
  margin-top: 0px;
  margin-bottom: 10px;
  height: 22px;
  color: #ca3575;
  line-height: 22px;
  font-size: 21px;
  padding-left: 6px;
  border-left: solid 6px #ca3577;
`;

const BodyProduct = styled.div`
  margin-top: calc(10px - 7.5px);
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
 
  .master-container {
    min-width: 100%;
    background: #eee;

    .wrap-page {
      max-width: 95%;
      margin: 0 auto;
    }

    .product-container {
      position: relative;
      padding: 0px;
      margin: 15px auto;
      width: 90%;
      text-align: center;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, calc(310px - 3%)));
      justify-content: center;
      align-items: center;
    }

  
  }
`;

const ProductList = ({ productlist, pageInfo }) => {
  const { products } = productlist; 
  return (
    <div>
      {pageInfo.tags && pageInfo.tags.length > 0 && 
      <React.Fragment>
        <HeadMenu pageInfo={pageInfo} />
        <PageInfoH1>{productlist.pageInfo.h1}</PageInfoH1>
      </React.Fragment>
      }
      <BodyProduct>
        <div className="master-container">
          <section className="wrap-page">
            <ul className="product-container">
              {
                products && products.length > 0 && products.map((product) => {
                  return <Product key={product.productId} product={product} />
                })
              }
            </ul>
          </section>
          {
            (products && products.length > 0 ? <Pagination productlist={productlist} pageInfo={pageInfo} /> : "")
          }

        </div>
      </BodyProduct>

    </div>
  );
}

export default ProductList;
