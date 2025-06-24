import axios from "axios";

const Services = axios.create({
    baseURL:"http://jsonplaceholder.typicode.com",
  });

export const  DeleteService = (id) => 
  Services.delete(`/posts/${id}`)