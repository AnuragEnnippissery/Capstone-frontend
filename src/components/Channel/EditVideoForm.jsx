import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateVideo } from "../../utils/videoData"; 
import './EditVideoForm.css'
import { toast } from "react-toastify";

function EditVideoForm() {
  const { id } = useParams(); // get videoId from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);

  // fetch video details
  useEffect(() => {
    async function fetchVideo() {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`https://capstone-backend-xhtk.onrender.com/api/video/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch video");
        const json = await res.json();
        setVideo(json);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVideo(id, video); // send updated video object
      navigate("/channel"); // go back to channel page
      toast.success("video edited successfully", {
                position: "top-right",
                autoClose: 3000,
              });
    } catch (err) {
      console.error("Update error:", err);
      toast.error("video edit has failed");
      //alert("Error updating video");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="video-form-container">
      <h2>Edit Video Details</h2>
      <form onSubmit={handleSubmit} className="channel-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={video.title}
            onChange={(e) => setVideo({ ...video, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={video.description}
            onChange={(e) =>
              setVideo({ ...video, description: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            value={video.thumbnailUrl}
            onChange={(e) =>
              setVideo({ ...video, thumbnailUrl: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Video URL</label>
          <input
            type="text"
            value={video.videoUrl}
            onChange={(e) =>
              setVideo({ ...video, videoUrl: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={video.category}
            onChange={(e) =>
              setVideo({ ...video, category: e.target.value })
            }
          />
        </div>

        <button className="create-btn"type="submit">Update Video</button>
      </form>
    </div>
  );
}

export default EditVideoForm;
