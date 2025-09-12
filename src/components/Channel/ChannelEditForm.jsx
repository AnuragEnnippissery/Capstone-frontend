import { useState, useEffect } from "react";
import "./ChannelCreationForm.css";
//import { use } from "../../utils/channelData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateChannel } from "../../utils/channelData";


function ChannelEditForm() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const[channel,setChannel]=useState(null)
  //const myChannel =useGetMyChannel()
  

  useEffect(() => {
    const storedUser = sessionStorage.getItem("id");
    if (storedUser) {
      setUserId(storedUser);
    }
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateChannel(id, channel); // send updated channel object
        navigate("/channel"); // go back to channel page
        toast.success("channel edited successfully", {
                  position: "top-right",
                  autoClose: 3000,
                });
      } catch (err) {
        console.error("Update error:", err);
        toast.error("channel edit has failed");
        //alert("Error updating video");
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
            onChange={(e) => setChannelName({...channel,channelName:e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription({...channel,description:e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Banner URL</label>
          <input
            type="text"
            value={channelBanner}
            onChange={(e) => setChannelBanner({...channel,channelBanner:e.target.value})}
          />
        </div>
        
        <button type="submit" className="create-btn">
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default ChannelEditForm;
