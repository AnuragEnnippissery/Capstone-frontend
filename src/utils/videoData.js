import { useState, useEffect } from "react";

function useGetData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("https://capstone-backend-xhtk.onrender.com/api/videos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        console.log("data", json);
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, []);

  return data;
}
export function useGetSingleVideo(id) {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`https://capstone-backend-xhtk.onrender.com/api/video/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        console.log("api data",json)
        setVideo(json);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    if (id) fetchVideo();
  }, [id]);

  return video;
}

// add video
export async function createVideo(videoData) {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch("https://capstone-backend-xhtk.onrender.com/api/videos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // protect endpoint
      },
      body: JSON.stringify(videoData),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Create video error:", err);
    throw err;
  }
}

//edit video 
export async function updateVideo(id, updatedData) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`https://capstone-backend-xhtk.onrender.com/api/videos/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return await res.json();
}

// videoData.js
export async function deleteVideo(id) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`https://capstone-backend-xhtk.onrender.com/api/videos/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return await res.json();
}

export async function likeVideo(id) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`hhttps://capstone-backend-xhtk.onrender.com/api/videos/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ likes: 1 }),  // ✅ FIXED
  });
  if (!res.ok) throw new Error("Failed to like");
  return await res.json();
}

export async function dislikeVideo(id) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`https://capstone-backend-xhtk.onrender.com/api/videos/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dislikes: 1 }),  // ✅ FIXED
  });
  if (!res.ok) throw new Error("Failed to dislike");
  return await res.json();
}





export default useGetData;
