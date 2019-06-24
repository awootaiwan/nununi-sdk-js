import React from 'react'
import "./ErrorAlert.scss";

const ErrorAlert = (data) => (
  <div className="alert alert-danger" role="alert">
    {data.errmsg}  (請與管理者聯絡)
  </div>
)

export default ErrorAlert
  
  