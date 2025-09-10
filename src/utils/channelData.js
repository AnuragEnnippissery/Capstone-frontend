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

