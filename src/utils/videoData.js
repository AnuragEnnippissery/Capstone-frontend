import { useState, useEffect } from "react";

function useGetData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://localhost:3100/api/videos", {
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
        const res = await fetch(`http://localhost:3100/api/video/${id}`, {
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

export default useGetData;
