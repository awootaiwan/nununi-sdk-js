import React from "react";
import styled from 'styled-components'

const querystring = require('querystring');
let pageAmount;
let currentPage;

const setPageList = (productlist, limit) => {
  const total = productlist.productsTotal;
  pageAmount = Math.ceil(total / limit);
  const pageList = [];
  const pageNumber = [];
  const pageCount = 3;
  for (let i = 1; pageNumber.length < pageCount; i++) {
    
    if (parseInt(currentPage) + i < pageAmount) {
      pageNumber.push(parseInt(currentPage) + i);
    }

    if (parseInt(currentPage) - i > 1) {
      pageNumber.push(parseInt(currentPage) - i);
    }

    if (pageNumber.indexOf(currentPage) < 0) {
      pageNumber.push(currentPage)
    }

    if (pageAmount <= pageCount + 1) {
      break;
    }
 
  }
  pageNumber.sort(function (a, b) {
    return a - b
  });

  pageList.push(1);

  pageNumber.map(function (value, index) {
    if (parseInt(value) != 1 && parseInt(value) != pageAmount) {
      if (index + 1 == 1 && parseInt(value) - 1 != 1) {
        pageList.push('..');
      }
      pageList.push(value);
      if (index + 1 == pageCount && parseInt(value) + 1 != pageAmount) {
        pageList.push('...');
      }
    }

  });
  if (pageAmount != 1) {
    pageList.push(pageAmount);
  }
  return (
    pageList
  )
}

const BodyPagination = styled.div`
  flex-grow: 1;
  margin-top: 10px;
  text-align: center;

  > ul {
    padding: 0px;
    max-width: 100%;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    list-style: none;
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    > li {
      margin: 0.5px 0px;
      padding: 0;
      cursor: default;
      text-align: center;
      width: 35px;
      line-height: 35px;
      height: 35px;
      font-size: 13px;
      > a {
        text-decoration: none;
        transition: 0.3s;
        background: #fff;
        color: #383838;
        border-color: #ccc;
        display: block;
        width: 100%;
        height: 100%;
        border-width: 1px;
        border-style: solid;
        cursor: pointer;
      }
  
      > a:hover {
        color: #f63577;
        background: #ffe0eb;
        border-color: #ffe0eb;
      }
  
      .disabled {
        cursor: default;
        background: #f63577;
        border-color: #f63577;
        color: #fff;
      }
  
      .disabled:hover {
        color: #fff;
      }
    }
  }
`;

const Pagination = ({ productlist, pageInfo }) => {
  currentPage = pageInfo.page;
  const { limit } = pageInfo || 10;

  const pageInfoData = {...pageInfo};

	if (pageInfoData.page) {
		delete pageInfoData.page;
  }

	const urlParams = querystring.stringify(pageInfoData);
  
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}?${urlParams}`;

  return (
    <BodyPagination>
      <ul>
        {
          (currentPage != 1) ? 
        <li>
          <a href={`${baseUrl}&page=${(parseInt(currentPage) - 1)}`}>
            {'<'}
          </a>
        </li> :
        ''
        }
        {
          setPageList(productlist, limit).map((list) => {
            return <li key={list}>
              {!isNaN(list) ? <a className={currentPage == list ? 'disabled' : ""}
                href={currentPage != list ? `${baseUrl}&page=${list}` : "#"}>{list}</a> : list}
            </li>
          })
        }
        {(currentPage != pageAmount) ? <li><a href={`${baseUrl}&page=${(parseInt(currentPage) + 1)}`}>{'>'}</a></li> : ""}
      </ul>
    </BodyPagination>
  )
}

export default Pagination;
