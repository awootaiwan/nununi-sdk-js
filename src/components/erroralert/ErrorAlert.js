import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ContactArea = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid transparent;
  border-color: #f5c6cb;
  margin: 1rem;
  padding: .75rem 1.25rem;
  border-radius: .25rem;
`;

const ErrorAlert = ({errmsg}) => {
  const { t } = useTranslation();
  return (
    <ContactArea role="alert">
      {errmsg}  ({t('contactAdmin')})
    </ContactArea>
  );
};

export default ErrorAlert;
