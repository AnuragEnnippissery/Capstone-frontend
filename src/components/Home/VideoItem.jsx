import './VideoItem.css';
function VideoItem(props){
    function HandleCardCLick(){
        console.log("clicked")
    }
    return(
        <>
            <div >
                <div className="product" onClick={HandleCardCLick}>
                    <h3>{props.detail.title}</h3>
                    <img src={props.detail.thumbnailUrl}alt={props.detail.title} height="300px" width="250px"/>
                    {/* <h3>{props.detail.rating}</h3> */}
                    
                     

                </div>
            </div>
        </>
    )
}
export default VideoItem;