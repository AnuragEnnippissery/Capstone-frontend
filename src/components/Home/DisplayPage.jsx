import { useParams } from "react-router-dom";
import { useGetSingleVideo } from "../../utils/videoData";
import "./DisplayPage.css";
import { BiLike, BiDislike } from "react-icons/bi";
import Recommendations from "../../utils/recommendation";
import { useDispatch, useSelector } from "react-redux";
import { setComments,createComment,updateComment, deleteComment } from "../../utils/commentSlice";
import { useEffect,useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { likeVideo,dislikeVideo } from "../../utils/videoData";

function DisplayPage() {
  const { id } = useParams();
  const video = useGetSingleVideo(id);
  //console.log("single data", video);
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);
  //const state = useSelector((state) => state);
  //console.log(state);


  // When video changes, load its comments into Redux
useEffect(() => {
  if (video?.comments) {
    dispatch(setComments(video.comments));
  }
}, [video?._id]);


  const [user, setUser] = useState("");
  const [newComment, setNewComment] = useState("");

  
      useEffect(() => {
          const storedUser = sessionStorage.getItem("id");
          if (storedUser) {
              setUser(storedUser);
          }
      }, []);
  async function HandleAdd(){
    if (!newComment.trim()) return; // avoid empty comments

    const commentData = {
      text: newComment,
      user: user,   // username from sessionStorage
      videoId: id,  // from useParams
    };

     await dispatch(createComment(commentData));
    //const updatedVideo = await useGetSingleVideo(id);
    //dispatch(setComments(updatedVideo.comments));
    setNewComment(""); // clear input
    //useGetSingleVideo(id);
  }
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [likes, setLikes] = useState(video?.likes || 0);
  const [dislikes, setDislikes] = useState(video?.dislikes || 0);

  useEffect(() => {
    if (video) {
      setLikes(video.likes);
      setDislikes(video.dislikes);
    }
  }, [video]);

  async function handleLike() {
  try {
    const updated = await likeVideo(id);
    setLikes(updated.likes ?? 0);
    setDislikes(updated.dislikes ?? 0);
  } catch (err) {
    console.error("Failed to like", err);
  }
}

async function handleDislike() {
  try {
    const updated = await dislikeVideo(id);
    setLikes(updated.likes ?? 0);
    setDislikes(updated.dislikes ?? 0);
  } catch (err) {
    console.error("Failed to dislike", err);
  }
}

  async function HandleEdit(commentId) {
  if (!editText.trim()) return;

  const resultAction = await dispatch(
      updateComment({ id: commentId, updatedData: { text: editText } }))

  if (updateComment.fulfilled.match(resultAction)) {
      // ✅ Only clear form if server confirmed
      setEditingId(null);
      setEditText("");
    } else {
      alert("Failed to update comment");
    }
}
  async function HandleDelete(commentId){
    const deleteAction = await dispatch(
      deleteComment({id:commentId}))
      if(deleteComment.fulfilled.match(deleteAction)){
        console.log("comment deleted")
      }
      else{
        alert("failed to delete");
      }
  }

  return (
    <div className="display-container">
      {video ? (
        <>
          {/* Left Section */}
          <div className="main-video-section">
            {/* Video Player */}
            <div className="video-player">
                {video.videoUrl.includes("youtube.com") ? (
                  <iframe
                    key={id}
                    src={`https://www.youtube.com/embed/${new URL(video.videoUrl).searchParams.get("v")}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                ) : (
                  <video key={id} controls>
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
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
                  <button onClick={handleLike}>
                    <BiLike /> {likes}
                  </button>
                  <button onClick={handleDislike}>
                    <BiDislike /> {dislikes}
                  </button>
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
                <input
                  className="comment-input"
                  type="text"
                  placeholder="add a new comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />

                <button onClick={HandleAdd}>Upload</button>
              </div>
              {/* {video.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <h4>{comment.user.username}</h4>
                  <div className="comment-display">
                      <p className="comment-input">{comment.text}</p>
                      <button>Edit</button>
                  </div>
                  
                </div>
              ))} */}
              {comments?.map((com) => (
                <div key={com?._id} className="comment">
                  <h4>{com?.user?.username || "Unknown User"}</h4>
                  {editingId === com._id ? (
                    <div className="comment-edit">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button onClick={() => HandleEdit(com._id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div className="comment-display">
                      <p>{com.text}</p>
                      <button onClick={() => {
                        setEditingId(com._id);
                        setEditText(com.text);
                      }}>
                        {<MdEdit/>}
                      </button>
                      <button onClick={() => HandleDelete(com._id)}>{<MdDelete/>}</button>
                    </div>
                  )}
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
