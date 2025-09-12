import './VideoItem.css';
import { useNavigate } from 'react-router-dom';
function VideoItem(props){
    const navigate = useNavigate();
    function HandleCardClick(){
        navigate(`/VideoPlayer/${props.detail._id}`)
    }
    return(
        <>
            <div >
                <div className="video" onClick={HandleCardClick}>
                    
                    <img  className="thumbnail"src={props.detail.thumbnailUrl}alt={props.detail.title} />
                    <div className='video-info'>
                        <h3 className='title'>{props.detail.title}</h3>
                        <p className='channel'>{props.detail.channelId.channelName}</p>
                        <p className='views'>{props.detail.views} Views</p>
                    </div>
                                                           
                     

                </div>
            </div>
        </>
    )
}
export default VideoItem;