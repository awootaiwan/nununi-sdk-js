import axios from 'axios';

const getApiData = async (
  id = process.env.NUNUNI_ID, token = process.env.NUNUNI_TOKEN, version, data, method = '',
) => {
  if (!data.tags) {
    return {
      errcode: 0,
      errmsg: '',
      result: {},
    };
  }
  const url = `${process.env.NUNUNI_DOMAIN}/nununi/${version}/${id}/${process.env.NUNUNI_APINAME}/${method}`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  let { status, data: response } = await axios.post(url, data, { headers });

  // TODO: Rewrite this nonsense
  if (status !== 200) {
    response = {
      errmsg: response.error_description,
      errcode: status,
      ...response,
    };
    delete response.error_description;
  }

  return response;
};

export {
  getApiData,
};
