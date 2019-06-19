import React from "react";

const sort = {
    "預設排序":"8",
    "銷量排序":"4" ,
    "新品上市":"12" ,
    "價格由低到高":"1" ,
    "價格由高到低":"2" ,
}

const HeadMenu = ( { pageInfo }) => {

    var URLParams = '';
    Object.keys(pageInfo).map(function (key, index) {
        if (key != 'sort') {
            URLParams += key + '=' + pageInfo[key] + '&'
        }
    });
    const baseUrl = `${location.protocol}//${location.host}?${URLParams}`;

    return (
        
        <div className="orders">

            <ul className="head-menu">
            {
                Object.keys(sort).map(function (key, index) {
                   return <li key={index} className={`head-menu-item ${pageInfo.sort == sort[key] ? "menu-click" : ""}`}><a href={baseUrl + "sort=" + sort[key]}><span>{key}</span></a></li>
                })
            }
            </ul>
        </div>
    )
}
export default HeadMenu;