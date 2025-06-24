import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const postService = async (data) => {
  return await axios.post(BASE_URL, data);
};


