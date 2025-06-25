import React, { useState, useEffect } from 'react';
import { postService } from '../services/PostService';
import { putServices } from '../services/PutService';

export const Form = ({ data, setData, updatePost, setUpdateData }) => {
  const [newData, setNewData] = useState({ title: "", body: "" });
  const [error, setError] = useState("");

  // Check if edit mode is active
  const isEditing = updatePost && updatePost.id;

  // Prefill form on update
  useEffect(() => {
    if (isEditing) {
      setNewData({
        title: updatePost.title || "",
        body: updatePost.body || ""
      });
    } else {
      setNewData({ title: "", body: "" });
    }
  }, [updatePost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isEditing) {
        const id = updatePost.id || updatePost._id;
        res = await putServices(id, newData);

        setData((prevData) =>
          prevData.map((item) =>
            (item.id || item._id) === id ? res.data : item
          )
        );
        setUpdateData(!isEditing);
      } else {
        res = await postService(newData);
        if (res.status === 200 || res.status === 201) {
          setData((prevData) => [...prevData, res.data]);
        }
      }

      setNewData({ title: "", body: "" });
      setError("");

    } catch (err) {
      setError("❌ Error: " + err.message);
      console.error(err);
    }
  };

  const handleCancel = () => {
    setNewData({ title: "", body: "" });
    setUpdateData(()=>!isEditing);
    setError("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="form-container">
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={newData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="body"
        placeholder="Enter body"
        value={newData.body}
        onChange={handleChange}
        required
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button type="submit">
          {isEditing ? "Update Post" : "Add Post"}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
