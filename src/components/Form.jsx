import React, { useState,useEffect } from 'react';
import { postService } from '../services/PostService';



export const Form = ({ data, setData, updatePost,setUpdateData }) => {

  const [newData, setNewData] = useState({ title:"", body:"" });
  const [error, setError] = useState("");

  useEffect(()=>{
    console.log("use Effect worked");
    {updatePost &&
    setNewData({ title: updatePost.title || "", body:updatePost.body || "" });
    }},[updatePost])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData(prev => ({ ...prev, [name]: value }));
  };

  const addPostData = async () => {
    try {
      const res = await postService(newData);
      console.log(res);

      if (res.status === 201 || res.status === 200) {
        setData([...data, res.data]);
        setNewData({ title: "", body: "" });
        setError(""); // clear error
      } else {
        setError("Failed to post data.");
      }
    } catch (err) {
      setError("❌ Posting error: " + err.message);
      console.error(err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className='form-container'>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          onChange={handleChange}
          value={newData.title}
          required
        />
        <input
          type="text"
          name="body"
          placeholder="Enter body"
          onChange={handleChange}
          value={newData.body}
          required
        />
        <button type="submit">Add Post</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};
