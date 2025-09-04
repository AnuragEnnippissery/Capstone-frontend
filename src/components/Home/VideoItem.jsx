import './VideoItem.css';
function VideoItem(props){
    function HandleCardCLick(){
        console.log("clicked")
    }
    return(
        <>
            <div >
                <div className="video" onClick={HandleCardCLick}>
                    
                    <img  className="thumbnail"src={props.detail.thumbnailUrl}alt={props.detail.title} />
                    <div className='video-info'>
                        <h3 className='title'>{props.detail.title}</h3>
                        <p className='channel'>{props.detail.channelId.channelName}</p>
                        <p className='views'>{props.detail.views}</p>
                    </div>
                                                           
                     

                </div>
            </div>
        </>
    )
}
export default VideoItem;