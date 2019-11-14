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
  max-width: 100%;
  width: 250px;
  height: 50px;

  @media (min-width: 1050px) {
    margin: 15px 5vw 15px auto;
  }
  @media (max-width: 1050px) {
    margin: 15px auto;
  }
`;

const DropdownBtn = styled.button`
  max-width: 100%;
  width: 250px;
  font-size: 16px;
  text-align: center;
  background: #FFFFFF;
  padding: 10px;
  border: 1.5px solid #D4D4D4;
  border-radius: 8px;
  position: relative;
  outline: none;
`;

let DropdownText = '預設排序';

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #666666;
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 40%;
  left: 80%;
`;

const DropdownList = styled.div`
  display: none;
  max-width: 100%;
  width: 247px;
  position: absolute;
  z-index: 100;
  border: 1.5px solid #DDDDDD;
  border-radius: 8px;
  background: #FFFFFF;
`;

const DropdownItem = styled.a`
  text-decoration: none;
`;

const DropdownItemText = styled.span`
  color: #383838;
  z-index: 0;
  position: relative;
  font-size: 16px;
  padding: 10px 20px;
  display: block;
  font-size: 14px;
  border-radius: 7px;
  text-align: center;
  text-decoration:none;

  &:hover {
    background: #EEEEEE;
  }
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

      <DropdownBtn id="DropdownBtn">
        {
          Object.keys(sort).map(function (key, index) {
          if (pageSort == sort[key]) {
            DropdownText = key;
          }
          })
        }
        {DropdownText}
        <ArrowDown></ArrowDown>
      </DropdownBtn>

      <DropdownList id="DropdownList">
        {
          Object.keys(sort).map(function (key, index) {
            return (
              <DropdownItem key={index} href={`${baseUrl}&sort=${sort[key]}`}>
                <DropdownItemText>
                {key}
                </DropdownItemText>
              </DropdownItem>
            )
          })
        }
      </DropdownList>

    </Orders>
  )

}

window.onclick = function(event) {
  if (event.target.matches('#DropdownBtn')) {
    if (document.getElementById("DropdownList").style.display != 'block') {
      document.getElementById("DropdownList").style.display = 'block';
    }
    else {
      document.getElementById("DropdownList").style.display = 'none';
    }
  }
  else {
    // Close the DropdownList if the user clicks outside of it
    document.getElementById("DropdownList").style.display = 'none';
  }
}
export default HeadMenu;
