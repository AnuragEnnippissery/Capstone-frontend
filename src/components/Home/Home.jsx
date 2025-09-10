import { useState,useEffect } from "react";
import useGetData from "../../utils/videoData";
import { useDispatch } from "react-redux";
import VideoItem from "./VideoItem";
import './VideoItem.css';
import './Home.css';
import { useLocation } from "react-router-dom";
function Home(){
    let data=useGetData()
    console.log("video data",data)
    const [filteredVideos,setFilteredVideos] = useState([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");  // "shorts" if clicked from sidebar

    useEffect(() => {
        if (filter) {
        HandleFilterVideos(filter);
        } else {
        setFilteredVideos(data);
        }
    }, [data, filter]);

    function HandleFilterVideos(category){
        const newVideos=data.filter(video=>video.category==category)
        setFilteredVideos(newVideos)
    }


    function handleSearch(e) {
        const query = e.target.value.toLowerCase();
    
        const searched = data.filter(video =>
            video?.title?.toLowerCase().includes(query)
            
           // || product?.brand?.toLowerCase().includes(query)
        );
        setFilteredVideos(searched);
        console.log(searched)
    }
    return(
        <>
        <div className="searchbar">
            <input type="text"placeholder="video name" onChange={handleSearch}/>
        </div>
         <div className="button-group">
                <button onClick={()=>setFilteredVideos(data)}>All</button>
                <button onClick={()=>HandleFilterVideos("videos")}>Videos</button>
                <button onClick={()=>HandleFilterVideos("shorts")}>Shorts</button>
                <button onClick={()=>HandleFilterVideos("ai")}>Ai</button>
                
        </div>
        <div className="video-container">
            {filteredVideos.map((vid)=>{
            return(
                    <VideoItem key={vid.id} detail={vid} />
                
                            )
        })}
        </div>
        </>
    )
}
export default Home;