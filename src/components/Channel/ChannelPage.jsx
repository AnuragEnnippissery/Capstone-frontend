import { useGetMyChannel } from "../../utils/channelData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ChannelPage() {
  const { id } = useParams();
  const channel = useGetMyChannel();
  const navigate=useNavigate()
  function HandleChannel(){
    navigate("/channel/channelForm")
  }

  console.log("channel", channel);

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
              channel.videos.map((video) => (
                <li key={video._id}>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    width="200"
                  />
                  <p>{video.title}</p>
                  <span>{video.views} views</span>
                </li>
              ))
            ) : (
              <p>No videos uploaded yet.</p>
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
