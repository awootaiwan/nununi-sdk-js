import axios from 'axios';

const getApiData = async(id = process.env.NUNUNI_ID, token = process.env.NUNUNI_TOKEN, version, pageInfo)=> {
  const url = `${process.env.NUNUNI_DOMAIN}/nununi/${version}/${id}/${process.env.NUNUNI_APINAME}/`;
  const tags = pageInfo.tags.split(',');
  const page = pageInfo.page;
  const limit = pageInfo.limit;
  const sort = pageInfo.sort;

  let data = {
    tags,
    page,
    limit,
    sort
  };

  let headers = {
    'Authorization' : `Bearer ${token}`
  }

  let {status,data:response} = await axios.post(url, data, {headers});
  
  if (status != 200 ) {
    response = {
      'errmsg' : response.error_description,
      'errcode' : status,
      ...response
    } 
    delete response.error_description
  }
  return response;
}

export {
  getApiData
}