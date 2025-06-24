import { useEffect } from 'react';
import {GetServices} from './services/getService';

function App() {
  console.log(GetServices());

  const getPost=async()=>{
    try{
    let res = await GetServices();
    console.log(res);
    } catch(err){
      console.log(err.message);
    }
  }
  useEffect(()=>{
    getPost();
  },[])
  
  return (
    <>
      <h1>axios code</h1>
    </>
  )
}

export default App
