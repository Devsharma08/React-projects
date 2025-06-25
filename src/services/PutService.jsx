import axios from "axios";

export const putServices = (id, data) => {
  return axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
};
