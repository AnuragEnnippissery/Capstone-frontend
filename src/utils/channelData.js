import { useState,useEffect } from "react";
// export function useGetSingleChannel(id) {
//   const [channel, setChannel] = useState(null);

//   useEffect(() => {
//     async function fetchChannel() {
//       try {
//         const token = sessionStorage.getItem("token"); 
//         const res = await fetch(`http://localhost:3100/api/channel/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const json = await res.json();
//         console.log("api data",json)
//         setChannel(json);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     }

//     if (id) fetchChannel();
//   }, [id]);

//   return channel;
// }
export function useGetMyChannel() {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function fetchChannel() {
      try {
        const token = sessionStorage.getItem("token");
        console.log("token",token)

        const res = await fetch("http://localhost:3100/api/channel/mychannel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const json = await res.json();
        setChannel(json);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchChannel();
  }, []);

  return channel;
}

// add channel
export async function createChannel(channelData) {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch("http://localhost:3100/api/channel/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // protect endpoint
      },
      body: JSON.stringify(channelData),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Create channel error:", err);
    throw err;
  }
}

//edit channel
export async function updateChannel(id, updatedData) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`http://localhost:3100/api/channel/update/${id}`, {
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

// delete channel
export async function deleteChannel(id) {
  const token = sessionStorage.getItem("token");
  const res = await fetch(`http://localhost:3100/api/channel/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return await res.json();
}

