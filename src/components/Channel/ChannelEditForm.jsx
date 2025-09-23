import { useState, useEffect } from "react";
import "./ChannelCreationForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateChannel } from "../../utils/channelData";

function ChannelEditForm() {
  const [channel, setChannel] = useState({
    channelName: "",
    description: "",
    channelBanner: ""
  });
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("id");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);

  // fetch channel details
  useEffect(() => {
    async function fetchChannel() {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`https://capstone-backend-xhtk.onrender.com/api/channel/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch channel");
        const json = await res.json();
        setChannel(json);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchChannel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChannel(id, channel); // send updated channel object
      navigate("/channel");
      toast.success("Channel edited successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Channel edit has failed");
    }
  };

  return (
    <div className="channel-form-container">
      <h2>Edit Channel</h2>
      <form onSubmit={handleSubmit} className="channel-form">
        <div className="form-group">
          <label>Channel Name</label>
          <input
            type="text"
            value={channel.channelName || ""}
            onChange={(e) =>
              setChannel({ ...channel, channelName: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={channel.description || ""}
            onChange={(e) =>
              setChannel({ ...channel, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Banner URL</label>
          <input
            type="text"
            value={channel.channelBanner || ""}
            onChange={(e) =>
              setChannel({ ...channel, channelBanner: e.target.value })
            }
          />
        </div>

        <button type="submit" className="create-btn">
          Update Channel
        </button>
      </form>
    </div>
  );
}

export default ChannelEditForm;
