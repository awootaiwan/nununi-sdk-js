import React from "react";
import "./Product.scss";
import HeadMenu from "./HeadMenu";
import Products from "./Products";
import Pagination from "./Pagination"


const ProductList = ({ productlist, pageInfo }) => {
  const { products } = productlist; 
  return (
    <div>
      {pageInfo && pageInfo.length > 0 && 
      <React.Fragment>
        <HeadMenu pageInfo={pageInfo} />
        <h1 className="pageInfo-h1">{productlist.pageInfo.h1}</h1>
      </React.Fragment>
      }
      <div className="body-product ">
        <div className="master-container">
          <section className="wrap-page">
            <ul className="product-container">
              {
                products && products.length > 0 && products.map((list) => {
                  return <Products key={list.productId} products={list} />
                })
              }
            </ul>
          </section>
          {
            (products && products.length > 0 ? <Pagination productlist={productlist} pageInfo={pageInfo} /> : "")
          }

        </div>
      </div>

    </div>
  );
}

export default ProductList;