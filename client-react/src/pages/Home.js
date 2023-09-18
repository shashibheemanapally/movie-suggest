import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DispayMovieList from "./components/DispayMovieList";

function Home() {

    const [searchItem, setSearchItem] = useState(() => {
        if(localStorage.getItem("searchItem")){
            return localStorage.getItem("searchItem")
          }
        else{
            return "";
        }
    });

    useEffect(() => {
        localStorage.setItem("searchItem", searchItem);
    },[searchItem])

    const [searchResults, setSearchResults] = useState([])

    const fetchSearchResults = async () => {
        const res = await axios.get(`http://localhost:5000/search-movies?movie_name=${searchItem}&limit=5`);
        setSearchResults(res.data)
    };

    useEffect(() => {
        fetchSearchResults();
    },[searchItem])

    

    const navigate = useNavigate()
    const openMovie = (id) => {
        navigate('/movie-seggestions', {
            state: {
                id: id
            }
        });
    };
  
    return (
        <>
        <div className="Home">
            
            <input type='text' value={searchItem} onChange={(e) => setSearchItem(e.target.value)}></input>
            <DispayMovieList heading={"search results"} movieList={searchResults}></DispayMovieList>
            
            
            
        </div>
        </>
    );
  }
  
export default Home;