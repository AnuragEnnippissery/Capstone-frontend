import { useGetMyChannel } from "../../utils/channelData";
import { useParams } from "react-router-dom";
import ChannelCreationForm from "./ChannelCreationForm";

function ChannelPage() {
  const { id } = useParams();
  const channel = useGetMyChannel(); // assuming this returns null or undefined if no channel exists

  console.log("channel", channel);

  return (
    <div>
      <div>
        {channel ? (
          <div>
            <h1>{channel.channelName}</h1>
            <p>{channel.description}</p>

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
          <ChannelCreationForm/>
          
        )}
      </div>
    </div>
  );
}

export default ChannelPage;
