import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DispayMovieList from "./components/DispayMovieList";
import { useRef } from "react";

function Home() {

    const [searchItem, setSearchItem] = useState(() => {
        if(localStorage.getItem("searchItem")){
            return localStorage.getItem("searchItem")
          }
        else{
            let arr = ["Titanic", "Interstellar","Shawshank Redemption", "Godfather"];
            return arr[(Math.floor(Math.random() * arr.length))];
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

    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(inputRef.current.value === searchItem) {
                fetchSearchResults();
            }
          }, 1200)
          return () => {
            clearTimeout(timer)
          }  
        
    },[searchItem, inputRef])

    const [recentSearches, setRecentSearches] = useState([])

    const fetchRecentResults = async () => {
        const res = await axios.get(`http://localhost:5000/recent-searches?limit=5`);
        setRecentSearches(res.data)
    };

    useEffect(()=>{
        fetchRecentResults()
    }, [])
    

    

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
            
            <input type='text' value={searchItem} ref={inputRef} onChange={(e) => setSearchItem(e.target.value)}></input>
            <DispayMovieList heading={"search results"} movieList={searchResults}></DispayMovieList>
            
            <DispayMovieList heading={"recently searched movies"} movieList={recentSearches}></DispayMovieList>
            
            
            
        </div>
        </>
    );
  }
  
export default Home;