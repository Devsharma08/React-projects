import { useState,useEffect } from 'react';
import { getService } from '../services/getService';
import { DeleteService } from '../services/deleteService';
import '../App.css';
import {Form} from './Form'

function Posts() {
  const [data,setData] = useState([]);
  const [updatePost,setUpdatePost] = useState([]) 
  
  const getPost = async() => {
    try{
    let res = await getService();
    console.log(res);
    
    setData(res.data);
    } catch(err){
      console.log(err.message);
    }
  }

  const deletePost = async (id) => {
    try{
      console.log(id);
      
    await DeleteService(id);
    console.log(`deleted: ${id}`);
    
    const newData = data.filter((a)=>{
      if(id != a.id)
        return a;
    })
    setData(newData);
    await getService(data);
    } catch(err){
      console.log(err);
    }
  }

  const handleUpdate = (curr) =>{
    console.log(curr)
    
    setUpdatePost( curr )
  }

  useEffect(()=>{
    getPost();
  },[])
  
  return (
    <>
    <section className='header'>
      <Form 
      data={data} 
      setData={setData}
      updatePost={updatePost}
      setUpdatePost={setUpdatePost}/>
    </section>
    <section className='section-post'>
      <ol>
      {data.map((curr,i)=>{
        const {body,title,id} = curr
        return <div key={id} >
          <p>{`${i+1}`}</p>
          <p>{title}</p>
          <p>{body}</p>
          <div>
            <button 
            type='submit'
            onClick={() => handleUpdate(curr)}
            >edit</button>

            <button type='submit' className='btn-delete' 
            onClick={() => deletePost(id)}>delete</button>
          </div>
          </div>
      })}
      </ol>
      </section>
    </>
  )
}

export default Posts