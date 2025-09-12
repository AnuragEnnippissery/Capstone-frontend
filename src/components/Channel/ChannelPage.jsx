import { useGetMyChannel } from "../../utils/channelData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {deleteVideo} from "../../utils/videoData";
import {useState,useEffect} from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function ChannelPage() {
  const { id } = useParams();
  const channel = useGetMyChannel();
  const navigate=useNavigate()
  function HandleChannel(){
    navigate("/channel/channelForm")
  }
  function HandleVideo(){
    navigate("/channel/VideoForm")
  }

  //console.log("channel", channel);
  const [videos, setVideos] = useState([]);

    useEffect(() => {
      if (channel?.videos) setVideos(channel.videos);
    }, [channel]);

    async function handleDelete(id) {
      if (!window.confirm("Are you sure you want to delete this video?")) return;

      try {
        await deleteVideo(id);
        setVideos(videos.filter((v) => v._id !== id)); // update local state
      } catch (err) {
        console.error("Delete error:", err);
      }
    }


  return (
    <div>
      {channel ? (
        <div>
          {/* Channel Banner */}
          {channel.channelBanner && (
            <div className="mb-4">
              <img
                src={channel.channelBanner}
                alt={`${channel.channelName} banner`}
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Channel Info */}
          <h1>{channel.channelName}</h1>
          <p>{channel.description}</p>

          {/* Videos Section */}
          <h2>Videos</h2>
          <div>
            {channel.videos && channel.videos.length > 0 ? (
              videos.map((video) => (
                <li key={video._id}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width="200"
                  />
                  <p>{video.title}</p>
                  <span>{video.views} views</span>
                  <button onClick={() => navigate(`/Channel/EditVideoForm/${video._id}`)}>{<MdEdit/>}</button>
                  <button onClick={()=>handleDelete(video._id)}>{<MdDelete/>}</button>
                </li>
              ))
            ) : (
              <>
              <p>No videos uploaded yet.</p>
              <button onClick={HandleVideo}>create a video</button>
              </>
              
            )}
          </div>
        </div>
      ) : (
        <>
        <p>no channel created yet</p>
        <button onClick={HandleChannel}>create a channel</button>
        </>
        
      )}
    </div>
  );
}

export default ChannelPage;
