import { Link } from "react-router-dom";
//import useGetData from "../../utils/useGetData";
import useGetData from "./videoData";

function Recommendations({ currentVideoId }) {
  const videos = useGetData();

  return (
    <div className="recommendations">
      {videos
        .filter(video => video._id !== currentVideoId) // exclude current video
        .map(video => (
          <Link key={video._id} to={`/VideoPlayer/${video._id}`}>
            <div className="recommendation-card">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="thumbnail"
              />
              <div className="video-info">
                <p className="title">{video.title}</p>
                <p className="channel">{video.channelId.channelName}</p>
                <p className="views">{video.views} views</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Recommendations;
