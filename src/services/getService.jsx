import axios from "axios";

const Services = axios.create({
    baseURL:"http://jsonplaceholder.typicode.com",
  })


export const getService = () =>{
  return Services.get('/posts');
}


