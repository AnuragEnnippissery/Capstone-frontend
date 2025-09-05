import { useParams } from "react-router-dom";
import { useGetSingleVideo } from "../../utils/videoData";
function DisplayPage(){
    const {id}=useParams()
    const video =useGetSingleVideo(id)
    console.log("single data",video)
    return(
        <>
        <div>
            {video?(
                <>
                    <div>
                        <video width="640" height="360" controls>
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                    </div>
                    <div>
                        <section>
                            <p>{video.title}</p>
                            <p>{video.channelId.channelName}</p>
                            <div>
                                <p>{video.subscriber}</p>
                                <p>{video.likes}</p>
                                <p>{video.dislikes}</p>
                            </div>
                            
                        </section>
                    </div>
                    <div>
                        <h4>Comments</h4>
                        {video.comments.map((comment)=>{
                            return(
                                <>
                                    <p>{comment.user.username}</p>
                                    <p>{comment.text}</p>
                                </>
                            )
                        })}
                        
                    </div>
                </>
            ):(<p>Loading Video</p>)}
        </div>
        </>
    )
}
export default DisplayPage;