import React from "react";
var querystring = require('querystring');
let pageAmount;
let currentPage;

const setPageList = ({ productlist }) => {
  const amount = productlist.products.length;
  const total = productlist.productsTotal;

  pageAmount = Math.ceil(total / amount);

  const pageList = [];
  const pageNumber = [];
  const pageCount = 3;
  pageNumber.push(parseInt(currentPage));
  for (let i = 1; pageNumber.length < pageCount; i++) {
    if (parseInt(currentPage) + i < pageAmount) {
      pageNumber.push(parseInt(currentPage) + i);
    }

    if (parseInt(currentPage) - i > 1) {
      pageNumber.push(parseInt(currentPage) - i);

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
  pageList.push(pageAmount);
  return (
    pageList
  )
}

const Pagination = ({ productlist, pageInfo }) => {

  currentPage = pageInfo['page'];
  const pageInfoData = {... pageInfo};
	if (pageInfoData['page']) {
		delete pageInfoData['page'];
  }
	const urlParams = querystring.stringify(pageInfoData);
  
  const baseUrl = `${location.protocol}//${location.host}?${urlParams}`;
  return (
    <div className="body-pagination">
      <ul>
        {(currentPage != 1) ? <li><a href={`${baseUrl}&page=${(parseInt(currentPage) - 1)}`}>{'<'}</a></li> : ""}
        {
          setPageList({ productlist }).map((list) => {
            
            return <li key={list}>
              {!isNaN(list) ? <a className={currentPage == list ? 'disabled' : ""}
                href={currentPage != list ? `${baseUrl}&page=${list}` : "#"}>{list}</a> : list}
            </li>
          })
        }
        {(currentPage != pageAmount) ? <li><a href={`${baseUrl}&page=${(parseInt(currentPage) + 1)}`}>{'>'}</a></li> : ""}
      </ul>
    </div>
  )
}

export default Pagination;