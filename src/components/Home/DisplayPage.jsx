import { useParams } from "react-router-dom";
import { useGetSingleVideo } from "../../utils/videoData";
import "./DisplayPage.css";
import { BiLike, BiDislike } from "react-icons/bi";
import Recommendations from "../../utils/recommendation";

function DisplayPage() {
  const { id } = useParams();
  const video = useGetSingleVideo(id);
  console.log("single data", video);

  return (
    <div className="display-container">
      {video ? (
        <>
          {/* Left Section */}
          <div className="main-video-section">
            {/* Video Player */}
            <div className="video-player">
              <video key={id}  controls>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Info */}
            <section>
              <p className="title">{video.title}</p>

              <div className="data-section">
                <div>
                  <p className="channel">{video.channelId.channelName}</p>
                  <p>
                    {video.channelId.subscribers} <span>Subscribers</span>
                  </p>
                </div>

                <div className="likes-section">
                  <p >
                    <BiLike /> {video.likes}
                  </p>
                  <p>
                    <BiDislike /> {video.dislikes}
                  </p>
                </div>
              </div>

              <div className="video-description">
                <p>{video.views} Views</p>
                <p>{video.description}</p>
              </div>
            </section>

            {/* Comments */}
            <div className="comments-container">
              <h4>Comments</h4>
              <div className="comment-section">
                <input type="text" placeholder="add a new comment" />
                <button>Upload</button>
              </div>
              {video.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <h4>{comment.user.username}</h4>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section (Recommendations) */}
          <div className="recommendations-section">
            <Recommendations currentVideoId={id} />
          </div>
        </>
      ) : (
        <p>Loading Video...</p>
      )}
    </div>
  );
}

export default DisplayPage;
