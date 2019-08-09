import axios from 'axios';

const ERROR_NONE = 0;
const ERROR_REQUEST_FAILED = 10000;
const ERROR_NO_TAGS_PROVIDED = 10001;
const errMap = new Map([
  [ERROR_NONE, 'Success'],
  [ERROR_REQUEST_FAILED, 'Request to cupid API failed.'],
  [ERROR_NO_TAGS_PROVIDED, 'No tags provided.'],
]);

function getPayload(errCode = ERROR_NONE, errMsg = '', result = '') {
  return {
    errcode: errCode,
    errmsg: errMsg || errMap.get(errCode) || 'Undefined error.',
    result,
  };
}

const getApiData = async (
  id = process.env.NUNUNI_ID, token = process.env.NUNUNI_TOKEN, version, data, method = '',
) => {
  if (!data.tags) {
    return getPayload(ERROR_NO_TAGS_PROVIDED);
  }

  const url = `${process.env.NUNUNI_DOMAIN}/nununi/${version}/${id}/${process.env.NUNUNI_APINAME}/${method}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const { status, data: response } = await axios.post(url, data, { headers });
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

export {
  getApiData,
};
