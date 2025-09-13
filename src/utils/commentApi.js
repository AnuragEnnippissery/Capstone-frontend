import axios from "axios";

const API_URL = "http://localhost:3100/api/comment";

// Get token from sessionStorage (or wherever you store it)
const getAuthConfig = () => {
  const token = sessionStorage.getItem("token"); // or localStorage
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Add Comment
export const addComment = async (commentData) => {
  const res = await axios.post(`${API_URL}/add`, commentData, getAuthConfig());
  return res.data.comment;
};

// Edit Comment
export const editComment = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/update/${id}`, updatedData, getAuthConfig());
  return res.data.populatedComment;
};

// Delete Comment
export const removeComment = async (id) => {
  const res = await axios.delete(`${API_URL}/delete/${id}`, getAuthConfig());
  return res.data.deletedComment;
};
