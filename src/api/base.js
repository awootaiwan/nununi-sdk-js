import axios from 'axios';

const getApiData = async(id = process.env.NUNUNI_ID, token = process.env.NUNUNI_TOKEN, pageInfo)=> {
  let url = `${process.env.NUNUNI_DOMAIN}/${process.env.NUNUNI_APIVER}/${id}/${process.env.NUNUNI_APINAME}/`;

  if(pageInfo === undefined ) {
    pageInfo = {
      tags:"口紅, 韓國",
      page:1,
      sort:1,
      limit:10
    }
  }
  
  let tags = pageInfo.tags.split(',');
  let page = pageInfo.page;
  let limit = pageInfo.limit;
  let sort = pageInfo.sort;

  let data = {
    tags,
    page,
    limit,
    sort
  };

  await axios.post(
    url,
    data,
    {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  ).then(result => {
    console.log(result)
    if(result.status == 200){
      response = result.data;
    } else {
      let errmsg = result.data.error_description;
      response = {
        "error" : result.data.error,
        errmsg,
      }
    }
    return response;
  });
}

const reloadTodoDatas = async()=> {
  let response  = await axios.get('https://jsonplaceholder.typicode.com/todos');
  console.log(response)
  return response;
}

export default getApiData