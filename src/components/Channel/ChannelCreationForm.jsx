import { useState, useEffect } from "react";
import "./ChannelCreationForm.css";
import { createChannel } from "../../utils/channelData";
import { useNavigate } from "react-router-dom";

function ChannelCreationForm() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [banner, setBanner] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  

  useEffect(() => {
    const storedUser = sessionStorage.getItem("id");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newChannel = await createChannel({
        channelName,
        description,
        channelBanner: banner,
        owner: userId, // ✅ use userId instead of storedUser
        videoUrl
      });
      console.log("Channel created:", newChannel);

      navigate("/channel");
    } catch (err) {
      console.error("Error creating channel:", err);
      alert("Error creating channel, check console for details.");
    }
  };

  return (
    <div className="channel-form-container">
      <h2>Create a New Channel</h2>
      <form onSubmit={handleSubmit} className="channel-form">
        <div className="form-group">
          <label>Channel Name</label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
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
          <label>Banner URL</label>
          <input
            type="text"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />
        </div>
        
        <button type="submit" className="create-btn">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default ChannelCreationForm;
