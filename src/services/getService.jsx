import axios from "axios";

const Services = axios.create({
    baseURL:"http://jsonplaceholder.typicode.com",
  })


export const GetServices = async() =>{
  return await Services.get('/posts');
}

