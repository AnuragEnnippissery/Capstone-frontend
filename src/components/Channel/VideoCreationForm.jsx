import { useState, useEffect } from "react";
import "./ChannelCreationForm.css";
//import { createChannel } from "../../utils/channelData";
import { useGetMyChannel } from "../../utils/channelData";
import { createVideo } from "../../utils/videoData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function VideoCreationForm() {
  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [category,setCategory] = useState("");
  const[videoUrl,setVideoUrl]=useState("")

  useEffect(() => {
    const storedUser = sessionStorage.getItem("id");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);
  const myChannel =useGetMyChannel()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVideo = await createVideo({
        title:videoName,
        description,
        thumbnailUrl: thumbnailUrl,
        uploader: userId, // ✅ use userId instead of storedUser
        category,
        videoUrl,
        channelId: myChannel._id   // <-- pass channel id from API
      });
      console.log("Video created:", newVideo);

      navigate("/channel");
      toast.success("video created successfully", {
                position: "top-right",
                autoClose: 3000,
              });
    } catch (err) {
      console.error("Error creating video:", err);
      //alert("Error creating video, check console for details.");
      toast.error( "video creation failed");
    }
  };

  return (
    <div className="channel-form-container">
      <h2>Create a New Video</h2>
      <form onSubmit={handleSubmit} className="channel-form">
        <div className="form-group">
          <label>Video Name</label>
          <input
            type="text"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Video URL</label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="create-btn">
          Create Video
        </button>
      </form>
    </div>
  );
}

export default VideoCreationForm;
