import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
const querystring = require('querystring');
const sort = {
  defaultRank: '8',
  saleTop: '4',
  newArrive: '12',
  priceLowToTop: '1',
  priceTopToLow: '2',
};

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
  background: #ffffff;
  padding: 10px;
  border: 1.5px solid #d4d4d4;
  border-radius: 8px;
  position: relative;
  outline: none;
`;

const DropdownList = styled.div`
  display: ${(props) => (props.isShowList ? 'block' : 'none')};
  max-width: 100%;
  width: 247px;
  position: absolute;
  z-index: 100;
  border: 1.5px solid #dddddd;
  border-radius: 8px;
  background: #ffffff;
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
  text-decoration: none;

  &:hover {
    background: #eeeeee;
  }
`;

const HeadMenu = ({ pageInfo }) => {
  const { t } = useTranslation();
  const [isDropdownBtnShow, setIsDropdownBtnShow] = useState(false);
  const [dropdownText, setDropdownText] = useState('defaultRank');
  const pageSort = pageInfo['sort'];
  const pageInfoData = { ...pageInfo };
  if (pageInfoData['sort']) {
    delete pageInfoData['sort'];
  }

  const urlParams = querystring.stringify(pageInfoData);
  const baseUrl = `${location.protocol}//${location.host}${location.pathname}?${urlParams}`;
  const handleShowDropdownList = (e) => {
    e.preventDefault();
    setIsDropdownBtnShow((value) => !value);
  };

  useEffect(() => {
    Object.keys(sort).map(function (key) {
      if (pageSort == sort[key]) {
        setDropdownText(key);
      }
    });
  }, [setDropdownText, sort, pageSort]);

  window.onclick = function (event) {
    if (!event.target.matches('#DropdownBtn')) {
      setIsDropdownBtnShow(false);
    }
  };
  return (
    <Orders>
      <DropdownBtn id='DropdownBtn' onClick={handleShowDropdownList}>
        {t(dropdownText)}
      </DropdownBtn>

      <DropdownList id='DropdownList' isShowList={isDropdownBtnShow}>
        {Object.keys(sort).map(function (key) {
          return (
            <DropdownItem key={key} href={`${baseUrl}&sort=${sort[key]}`}>
              <DropdownItemText>{t(key)}</DropdownItemText>
            </DropdownItem>
          );
        })}
      </DropdownList>
    </Orders>
  );
};

export default HeadMenu;
