import axios from 'axios';

module.exports = {
  async reloadTodoDatas() {
    let { data: response } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response;
  }
};