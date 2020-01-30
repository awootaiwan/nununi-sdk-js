import React from "react";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
const querystring = require('querystring');
const sort = {
  "defaultRank": "8",
  "saleTop": "4",
  "newArrive": "12",
  "priceLowToTop": "1",
  "priceTopToLow": "2",
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

let DropdownText = 'defaultRank';

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
  padding: 0 !important;
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
  const { t } = useTranslation();
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
        {t(DropdownText)}
      </DropdownBtn>

      <DropdownList id="DropdownList">
        {
          Object.keys(sort).map(function (key) {
            return (
              <DropdownItem key={key} href={`${baseUrl}&sort=${sort[key]}`}>
                <DropdownItemText>
                {t(key)}
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
  if (!document.getElementById("DropdownList")) {
    return;
  }
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
