import axios from "axios";

const API_URL = "http://localhost:3100/api/comment"; // change to your backend route

export const addComment = async (commentData) => {
  const res = await axios.post(`${API_URL}/add`, commentData);
  return res.data.comment;
};

export const editComment = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/update/${id}`, updatedData);
  return res.data.populatedComment;
};

export const removeComment =async(id) => {
  const res =await axios.delete(`${API_URL}/delete/${id}`);
  return res.data.deletedComment;
}
