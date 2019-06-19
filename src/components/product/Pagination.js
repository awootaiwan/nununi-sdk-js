import React from "react";

let pageAmount;

const setPageList = ({ productlist, pageInfo }) => {
    const amount = productlist.products.length;
    const total = productlist.productsTotal;

    pageAmount = Math.ceil(total / amount);

    const pageList = [];
    const pageNumber = [];
    const pageCount = 3;
    pageNumber.push(parseInt(pageInfo.page));
    for (let i = 1; pageNumber.length < pageCount; i++) {
        if (parseInt(pageInfo.page) + i < pageAmount) {
            pageNumber.push(parseInt(pageInfo.page) + i);
        }

        if (parseInt(pageInfo.page) - i > 1) {
            pageNumber.push(parseInt(pageInfo.page) - i);

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
    var URLParams = '';
    Object.keys(pageInfo).map(function (key, index) {
        if (key != 'page') {
            URLParams += key + '=' + pageInfo[key] + '&'
        }
    });
    const baseUrl = `${location.protocol}//${location.host}?${URLParams}`;

    return (
        <div className="body-pagination">
            <ul>
            {(pageInfo.page != 1) ? <li><a href={baseUrl + "page=" + (parseInt(pageInfo.page) - 1)}>{'<'}</a></li> : ""}
                {
                    setPageList({ productlist, pageInfo }).map((list) => {
                        return <li key={list}>
                            {!isNaN(list) ? <a className={pageInfo.page == list ? 'disabled' : ""}
                                href={pageInfo.page != list ? baseUrl + "page=" + list : ""}>{list}</a> : list}
                        </li>
                    })
                }
                {(pageInfo.page != pageAmount) ? <li><a href={baseUrl + "page=" + (parseInt(pageInfo.page) + 1)}>{'>'}</a></li> : ""}
            </ul>
        </div>
    )
}

export default Pagination;