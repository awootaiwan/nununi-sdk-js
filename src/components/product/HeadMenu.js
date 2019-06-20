import React from "react";
var querystring = require('querystring');
const sort = {
  "預設排序": "8",
  "銷量排序": "4",
  "新品上市": "12",
  "價格由低到高": "1",
  "價格由高到低": "2",
}

const HeadMenu = ({ pageInfo }) => {
  const pageSort = pageInfo['sort'];
  const pageInfoData = { ...pageInfo };
  if (pageInfoData['sort']) {
    delete pageInfoData['sort'];
  }

  const urlParams = querystring.stringify(pageInfoData);
  const baseUrl = `${location.protocol}//${location.host}?${urlParams}`;


  return (

    <div className="orders">

      <ul className="head-menu">
        {
          Object.keys(sort).map(function (key, index) {
            const menuClase = `head-menu-item ${pageSort == sort[key] ? "menu-click" : ""}`
            return <li key={index} className={menuClase}><a href={`${baseUrl}sort=${sort[key]}`}><span>{key}</span></a></li>
          })
        }
      </ul>
    </div>
  )
}
export default HeadMenu;