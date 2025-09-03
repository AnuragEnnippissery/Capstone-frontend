import { useState,useEffect } from "react";
import useGetData from "../../utils/videoData";
import { useDispatch } from "react-redux";
import VideoItem from "./VideoItem";
import './VideoItem.css';
function Home(){
    let data=useGetData()
    console.log("video data",data)
    const [filteredVideos,setFilteredVideos] = useState([]);
    useEffect(() => {
        setFilteredVideos(data); // set initial filtered list when data is loaded
        console.log("filter",filteredVideos)
    }, [data]);

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
        <div className="product-container">
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