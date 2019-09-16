import React from "react";
import styled from 'styled-components'

const querystring = require('querystring');
const sort = {
  "預設排序": "8",
  "銷量排序": "4",
  "新品上市": "12",
  "價格由低到高": "1",
  "價格由高到低": "2",
}

const Orders = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Menu = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  padding: 0.5px;
`;

const MenuItem = styled.li`
  flex-grow: 1;
  text-align: center;
  padding: 0.5px;

  a {
    text-decoration: none;
  }
`;

const MenuItemClick = styled.li`
  flex-grow: 1;
  text-align: center;
  padding: 0.5px;
  background: #f63577;
  box-shadow: 0 0 0 1px #f63577;
  color: #fff;

  a {
    text-decoration: none;
  }
`;

const ItemText = styled.span`
    background: #fff;
    box-shadow: 0 0 0 1px #ccc;
    color: #383838;
    z-index: 0;
    position: relative;
    font-size: 13px;
    padding: 10px 20px;
    display: block;
`;

const HeadMenu = ({ pageInfo }) => {
  const pageSort = pageInfo['sort'];
  const pageInfoData = { ...pageInfo };
  if (pageInfoData['sort']) {
    delete pageInfoData['sort'];
  }

  const urlParams = querystring.stringify(pageInfoData);
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}?${urlParams}`;

  return (

    <Orders>

      <Menu>
        {
          Object.keys(sort).map(function (key, index) {
            const MenuClase = pageSort == sort[key] ? MenuItemClick : MenuItem;
            return <MenuClase key={index} ><a href={`${baseUrl}&sort=${sort[key]}`}><ItemText>{key}</ItemText></a></MenuClase>
          })
        }
      </Menu>
    </Orders>
  )
}
export default HeadMenu;