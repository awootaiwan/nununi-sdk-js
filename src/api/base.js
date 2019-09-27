import axios from "axios";

const ERROR_NONE = 0;
const ERROR_REQUEST_FAILED = 10000;
const ERROR_NO_TAGS_PROVIDED = 10001;
const errMap = new Map([
  [ERROR_NONE, "Success"],
  [ERROR_REQUEST_FAILED, "Request to cupid API failed."],
  [ERROR_NO_TAGS_PROVIDED, "No tags provided."]
]);

function getPayload(errCode = ERROR_NONE, errMsg = "", result = "") {
  return {
    errcode: errCode,
    errmsg: errMsg || errMap.get(errCode) || "Undefined error.",
    result
  };
}

const getApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  data,
  method = ""
) => {
  if (!data.tags) {
    return getPayload(ERROR_NO_TAGS_PROVIDED);
  }

  const url = `https://awoo.org/nununi/v1.3/${id}/content/${method}`;

  try {
    const { status, data: response } = await axios.post(url, data);
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getProductTagApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productId
) => {
  const url = `https://awoo.org/nununi/${version}/${id}/products/${productId}/tags`;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    const { status, data: response } = await axios.get(url, { headers });
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

const getClassifyApiData = async (
  id = process.env.NUNUNI_ID,
  version,
  productIds
) => {
  const url = `https://awoo.org/nununi/${version}/${id}/products/classify`;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    const { status, data: response } = await axios.post(url, productIds, {
      headers
    });
    if (status !== 200) {
      return getPayload(status, response.error_description, response);
    }
    return response;
  } catch (e) {
    return getPayload(ERROR_REQUEST_FAILED);
  }
};

export { getApiData, getProductTagApiData, getClassifyApiData };
