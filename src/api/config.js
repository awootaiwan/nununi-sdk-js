import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.NUNUNI_DOMAIN}/nununi`,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});
