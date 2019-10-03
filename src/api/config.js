import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.NUNUNI_DOMAIN}/nununi`,
  headers: {
    'Content-Type': 'application/json'
  }
});
