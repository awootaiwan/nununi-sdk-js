import React from "react";
import styled from 'styled-components'
import ReactPaginate from 'react-paginate';
import querystring from 'querystring';

const BodyPagination = styled.div`
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;

  .pagination {
    list-style: none;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: stretch;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    
    li {
      margin: 0;
      padding: 0;
      cursor: default;
      text-align: center;
      width: 35px;
      line-height: 35px;
      height: 35px;
      font-size: 13px;
      background: #fff;
      cursor: pointer;
      
      a {
        text-decoration: none;
        transition: 0.3s;
        border-color: #ccc;
        display: block;
        width: 100%;
        height: 100%;
        border-width: 1px;
        border-style: solid;
        outline: none;
        &:hover {
          color: #f63577;
        }
      }
    }
    .active {
      background: #f63577;
      border-color: #f63577;
      color: #fff;

      a {
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .disableBtn {
    display: none;
  }


  .active:hover {
    color: #fff;
  }
`;

const Pagination = ({ productlist, pageInfo }) => {
  const { page, limit } = pageInfo;
  const total = productlist.productsTotal;
  const pageAmount = Math.ceil(total / limit);

  const pageInfoData = {...pageInfo};
  if (pageInfoData.page) {
		delete pageInfoData.page;
  }

  const urlParams = querystring.stringify(pageInfoData);
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}?${urlParams}`;
  
  const handlePageClick = (data) => {
    const selected = data.selected + 1;
    location.replace(`${baseUrl}&page=${selected}`)
  }

  return (
    <BodyPagination>
      <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageAmount}
          forcePage={page-1}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          pageClassName={'page'}
          activeClassName={'active'}
          disabledClassName={'disableBtn'}
        />
    </BodyPagination>
  )
}

export default Pagination;
